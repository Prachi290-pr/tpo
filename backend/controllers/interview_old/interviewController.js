const db = require('../../config/dbConfig');
const openaiServices = require('./openaiServices');
const mysql = require('mysql2');

const startInterview = async (req, res) => {
  const { userId, title, complexity, language, numQuestions, role } = req.body;

  try {
    const questionsWithIdealAnswers = await openaiServices.generateQuestions(complexity, language, numQuestions, role);

    db.beginTransaction(async (transactionErr) => {
      if (transactionErr) {
        throw transactionErr;
      }

      try {
        const interviewInsertQuery = 'INSERT INTO interviews (userId, title, role, complexity, language) VALUES (?, ?, ?, ?, ?)';
        const interviewInsertParams = [userId, title, role, complexity, language];

        // Insert interview
        db.query(interviewInsertQuery, interviewInsertParams, (insertInterviewErr, interviewResult) => {
          if (insertInterviewErr) {
            return db.rollback(() => {
              throw insertInterviewErr;
            });
          }

          const interviewId = interviewResult.insertId;

          const promises = questionsWithIdealAnswers.map((q, index) => {
            const contentInsertQuery = 'INSERT INTO interview_contents (content, ideal_answer, interviewId) VALUES (?, ?, ?)';
            const contentInsertParams = [q.content, q.ideal_answer, interviewId];

            return new Promise((resolve, reject) => {
              // Insert interview content
              db.query(contentInsertQuery, contentInsertParams, (insertContentErr, contentResult) => {
                if (insertContentErr) {
                  return reject(insertContentErr);
                }

                const questionId = contentResult.insertId;
                resolve({ questionId, ...q });
              });
            });
          });

          Promise.all(promises)
            .then((insertedQuestions) => {
              db.commit((commitErr) => {
                if (commitErr) {
                  return db.rollback(() => {
                    throw commitErr;
                  });
                }

                res.status(201).json({
                  interviewId,
                  questions: insertedQuestions,
                });
              });
            })
            .catch((error) => {
              db.rollback(() => {
                throw error;
              });
            });
        });

      } catch (error) {
        db.rollback(() => {
          throw error;
        });
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInterviewHistory = (req, res) => {
  const { userId } = req.params;

  db.query('SELECT * FROM interviews WHERE userId = ?', [userId], (err, interviews) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const interviewIds = interviews.map((interview) => interview.id);

    if (interviewIds.length > 0) {
      db.query(
        'SELECT * FROM interview_contents WHERE interviewId IN (?)',
        [interviewIds],
        (contentErr, interviewContents) => {
          if (contentErr) {
            console.error(contentErr);
            return res.status(500).json({ error: contentErr.message });
          }

          interviews.forEach((interview) => {
            interview.contents = interviewContents.filter(
              (content) => content.interviewId === interview.id
            );
          });

          res.status(200).json(interviews);
        }
      );
    } else {
      res.status(200).json(interviews);
    }
  });
};

const submitInterview = (req, res) => {
  const { interviewId, answers } = req.body;

  // Create MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
  });

  // Connect to MySQL
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return res.status(500).json({ error: 'Failed to connect to database' });
    }

    let totalAccuracy = 0;

    // Fetch interview details
    connection.promise().query('SELECT * FROM interviews WHERE id = ?', [interviewId])
      .then(([interviewRows]) => {
        const interview = interviewRows[0];

        if (!interview) {
          throw new Error('Interview not found');
        }

        // Process each answer
        const promises = answers.map(a => {
          // Fetch question details
          console.log(a.questionId);
          return connection.promise().query('SELECT * FROM interview_contents WHERE id = ?', [a.questionId])
            .then(([questionRows]) => {
              const question = questionRows[0];
              

              if (!question) {
                throw new Error(`Question with ID ${a.questionId} not found`);
              }

              // Evaluate answer accuracy using external service (openaiServices.evaluateAnswer)
              return openaiServices.evaluateAnswer(a.content, question.ideal_answer)
                .then(accuracy => {
                  // Update interview content with answer and accuracy
                  return connection.promise().query('UPDATE interview_contents SET answer = ?, score = ? WHERE id = ?', [a.content, accuracy, a.questionId])
                    .then(() => {
                      totalAccuracy += accuracy;
                      return { questionId: a.questionId, accuracy };
                    });
                });
            })
            .catch(error => {
              console.error('Error evaluating answer for question:', a.questionId, error);
              throw error;
            });
        });

        // Wait for all promises to resolve
        return Promise.all(promises)
          .then(updatedAnswers => {
            // Calculate performance
            const performance = totalAccuracy / answers.length;

            // Update interview score and performance
            return connection.promise().query('UPDATE interviews SET score = ?, performance = ? WHERE id = ?', [performance, performance, interviewId])
              .then(() => {
                // Send success response with updated data
                res.status(200).json({ message: 'Interview submitted successfully', score: performance, answers: updatedAnswers });
              });
          });
      })
      .catch(error => {
        console.error('Error submitting interview:', error);
        res.status(500).json({ error: error.message });
      })
      .finally(() => {
        // Close connection after operation
        connection.end();
      });
  });
};

const getInterviewDetails = (req, res) => {
  const { interviewId } = req.params;

  // Fetch interview details
  console.log(interviewId);
  db.query(`SELECT 
	i.*,
    sd.email_id,
    concat(sd.first_name, " ", sd.last_name) as name,
    sd.clg_id

FROM tpo_final_database.interviews i 

JOIN tpo_final_database.student_details sd

ON i.userId = sd.id

where i.id = ?;`, [interviewId], (err, interview) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (!interview.length) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    // Fetch interview contents
    db.query('SELECT * FROM interview_contents WHERE interviewId = ?', [interviewId], (contentErr, interviewContents) => {
      if (contentErr) {
        console.error(contentErr);
        return res.status(500).json({ error: contentErr.message });
      }

      interview[0].contents = interviewContents;
      res.status(200).json(interview[0]);
    });
  });
};

const testQuery = (req, res) => {
  console.log("HELLLLO");

  res.status(200).json({message: "hello"});
};

// const getStudentsWithInterviews = (req, res) => {
//   console.log("HELLLLO");

//   res.status(200).json({message: "hello"});
// }

const getStudentsWithInterviews = (req, res) => {
  console.log("called");
  const query = `
    SELECT sd.id AS studentId, CONCAT(sd.first_name, ' ', sd.last_name) AS name, sd.email_id, sd.clg_id
    FROM student_details sd
    INNER JOIN interviews i ON sd.id = i.userId
    GROUP BY sd.id;
  `;
  // const query = `
  // SELECT sd.id AS studentId, sd.first_name, sd.email_id, sd.clg_id
  // FROM student_details sd
  // INNER JOIN interviews i ON sd.id = i.userId
  // GROUP BY sd.id;
  // `;

  // const query = `Select * from student_details;`;


  console.log("Executing query:", query);

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students with interviews:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!results.length) {
      console.log("No student details found.");
      return res.status(404).json({ message: 'No student details found.' });
    }

    console.log("Query results:", results);
    res.status(200).json(results);
    // res.status(200).json({results});
    // res.status(200).json(results.data);
  });
};

// const getStudentsWithInterviews = (req, res) => {
//   console.log("getStudentsWithInterviews function called");

//   // SQL query to retrieve all student details
//   const query = `SELECT 
//     sd.id AS studentId, 
//     CONCAT(sd.first_name, ' ', sd.last_name) AS name, 
//     sd.email_id, 
//     sd.clg_id
// FROM 
//     tpo_final_database.student_details sd
// JOIN 
//     tpo_final_database.interviews i 
// ON 
//     sd.id = i.userId
// GROUP BY 
//     sd.id, sd.first_name, sd.last_name, sd.email_id, sd.clg_id;`;

//   // Log the query being executed
//   console.log("Executing query:", query);

//   // Execute the query using the database connection
//   db.query("SELECT sd.id AS studentId, CONCAT(sd.first_name, ' ', sd.last_name) AS name, sd.email_id, sd.clg_id FROM tpo_final_database.student_details sd JOIN tpo_final_database.interviews i ON sd.id = i.userId GROUP BY sd.id, sd.first_name, sd.last_name, sd.email_id, sd.clg_id;", 
//     (err, results) => {
//     if (err) {
//       // Log and send an error response if there's an issue with the query
//       console.error('Error fetching student details:', err);
//       return res.status(500).json({ error: err.message });
//     }

//     // Check if results are empty
//     if (!results.length) {
//       console.log("No student details found.");
//       return res.status(404).json({ message: 'No student details found.' });
//     }

//     // Log the query results
//     console.log("Query results:", results);

//     // Send the results in the response
//     res.status(200).json(results);
//   });
// };

module.exports = {
  startInterview,
  getInterviewHistory,
  submitInterview,
  getInterviewDetails,
  testQuery,
  getStudentsWithInterviews,
}
