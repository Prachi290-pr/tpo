const connection = require("../../config/dbConfig");
const asyncHandler = require("express-async-handler");
const { submitAnswers, submitAnswersIntership } = require('../saveAnswer'); // Adjust the path to your driveStatusController

const getRegisteredCompanies = asyncHandler((req, res) => {
  const studentId = req.params.studentId;

  const query = `
    SELECT p_id AS companyId
    FROM drive_status 
    WHERE s_id = ?
  `;

  connection.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching registered companies:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results.map(result => result.companyId));
  });
});

const getRegisteredInternshipCompanies = asyncHandler((req, res) => {
  const studentId = req.params.studentId;

  const query = `
    SELECT p_id AS companyId
    FROM intership_status 
    WHERE s_id = ?
  `;

  connection.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching registered companies:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results.map(result => result.companyId));
  });
});


const registerStudent = asyncHandler((req, res) => {
  const { studentId, companyId, que_answers } = req.body;
  console.log('Received data:ddd', { studentId, companyId, que_answers });

  const checkCompanyQuery = `SELECT tracker FROM companies WHERE jobId = ?`;
  connection.query(checkCompanyQuery, [companyId], (checkCompanyError, companyResults) => {
    if (checkCompanyError) {
      console.error('Error checking company tracker status:', checkCompanyError);
      return res.status(500).json({ error: 'Error checking company tracker status.' });
    }

    if (companyResults.length === 0) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    const isTracker = companyResults[0].tracker === 'yes';

    const checkQuery = `SELECT * FROM drive_status WHERE s_id = ? AND p_id = ?`;
    connection.query(checkQuery, [studentId, companyId], (checkError, rows) => {
      if (checkError) {
        console.error('Error checking existing registrations:', checkError);
        return res.status(500).json({ error: 'Error checking existing registrations.' });
      }

      if (rows.length > 0) {
        // Entry already exists
        return res.status(400).json({ error: 'Already registered for this company.' });
      }

      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          console.error('Transaction error: ', transactionError);
          return res.status(500).json({ error: 'Error starting transaction.' });
        }

        const insertQuery = `INSERT INTO drive_status (s_id, p_id, round1) VALUES (?, ?, 1)`;

        connection.query(insertQuery, [studentId, companyId], (insertError, result) => {
          if (insertError) {
            return connection.rollback(() => {
              console.error('Transaction error: ', insertError);
              res.status(500).json({ error: 'Error inserting round record.' });
            });
          }

          if (isTracker && que_answers) {
            // Call submitAnswers to save the tracker questions answers
            submitAnswers({ body: { studentId, companyId, answers: que_answers } }, {
              status: (code) => ({ json: (data) => res.status(code).json(data) }),
              json: (data) => res.json(data),
            }).then(() => {
              connection.commit((commitError) => {
                if (commitError) {
                  return connection.rollback(() => {
                    console.error('Transaction commit error: ', commitError);
                    res.status(500).json({ error: 'Error committing transaction.' });
                  });
                }

                res.status(200).json({ message: 'Registered successfully!' });
              });
            }).catch((error) => {
              connection.rollback(() => {
                console.error('Error during answer submission:', error);
                res.status(500).json({ error: 'Error during answer submission.' });
              });
            });
          } else {
            connection.commit((commitError) => {
              if (commitError) {
                return connection.rollback(() => {
                  console.error('Transaction commit error: ', commitError);
                  res.status(500).json({ error: 'Error committing transaction.' });
                });
              }

              res.status(200).json({ message: 'Registered successfully!' });
            });
          }
        });
      });
    });
  });
});


const registerStudentInternship = asyncHandler((req, res) => {
  const { studentId, companyId, que_answers } = req.body;
  console.log('Received data:', { studentId, companyId, que_answers });

  const checkCompanyQuery = `SELECT tracker FROM intership_postings WHERE Id = ?`;
  connection.query(checkCompanyQuery, [companyId], (checkCompanyError, companyResults) => {
    if (checkCompanyError) {
      console.error('Error checking company tracker status:', checkCompanyError);
      return res.status(500).json({ error: 'Error checking company tracker status.' });
    }

    if (companyResults.length === 0) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    const isTracker = companyResults[0].tracker === 'yes';

    const checkQuery = `SELECT * FROM intership_status WHERE s_id = ? AND p_id = ?`;
    connection.query(checkQuery, [studentId, companyId], (checkError, rows) => {
      if (checkError) {
        console.error('Error checking existing registrations:', checkError);
        return res.status(500).json({ error: 'Error checking existing registrations.' });
      }

      if (rows.length > 0) {
        // Entry already exists
        return res.status(400).json({ error: 'Already registered for this company.' });
      }

      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          console.error('Transaction error: ', transactionError);
          return res.status(500).json({ error: 'Error starting transaction.' });
        }

        const insertQuery = `INSERT INTO intership_status (s_id, p_id, round1) VALUES (?, ?, 1)`;

        connection.query(insertQuery, [studentId, companyId], (insertError, result) => {
          if (insertError) {
            return connection.rollback(() => {
              console.error('Transaction error: ', insertError);
              res.status(500).json({ error: 'Error inserting round record.' });
            });
          }

          if (isTracker && que_answers) {
            // Call submitAnswers to save the tracker questions answers
            submitAnswersIntership({ body: { studentId, companyId, answers: que_answers } }, {
              status: (code) => ({ json: (data) => res.status(code).json(data) }),
              json: (data) => res.json(data),
            }).then(() => {
              connection.commit((commitError) => {
                if (commitError) {
                  return connection.rollback(() => {
                    console.error('Transaction commit error: ', commitError);
                    res.status(500).json({ error: 'Error committing transaction.' });
                  });
                }

                res.status(200).json({ message: 'Registered successfully!' });
              });
            }).catch((error) => {
              connection.rollback(() => {
                console.error('Error during answer submission:', error);
                res.status(500).json({ error: 'Error during answer submission.' });
              });
            });
          } else {
            connection.commit((commitError) => {
              if (commitError) {
                return connection.rollback(() => {
                  console.error('Transaction commit error: ', commitError);
                  res.status(500).json({ error: 'Error committing transaction.' });
                });
              }

              res.status(200).json({ message: 'Registered successfully!' });
            });
          }
        });
      });
    });
  });
});



module.exports = { registerStudent, getRegisteredCompanies,getRegisteredInternshipCompanies,registerStudentInternship };


// require("dotenv").config();
// const connection  = require("../../config/dbConfig");
// const asyncHandler = require("express-async-handler");

// const getRegisteredCompanies = asyncHandler((req, res) => {

//   const studentId = req.params.studentId;

//   const query = `
//     SELECT p_id AS companyId
//     FROM drive_status 
//     WHERE s_id = ?
//   `;
  
//   connection.query(query, [studentId], (err, results) => {
//     if (err) {
//       console.error("Error fetching registered companies:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     res.status(200).json(results.map(result => result.companyId));
//   });
// });

// const registerStudent = asyncHandler((req, res) => {
//   const { studentId, companyId } = req.body;
//   console.log('Received data:', { studentId, companyId });

//   const checkQuery = `SELECT * FROM drive_status WHERE s_id = ? AND p_id = ?`;
//   connection.query(checkQuery, [studentId, companyId], (checkError, rows) => {
//     if (checkError) {
//       console.error('Error checking existing registrations:', checkError);
//       return res.status(500).json({ error: 'Error checking existing registrations.' });
//     }

//     if (rows.length > 0) {
//       // Entry already exists
//       return res.status(400).json({ error: 'Already registered for this company.' });
//     }

//     connection.beginTransaction((transactionError) => {
//       if (transactionError) {
//         console.error('Transaction error: ', transactionError);
//         return res.status(500).json({ error: 'Error starting transaction.' });
//       }

//       const insertQuery = `INSERT INTO drive_status (s_id, p_id, round1) VALUES (?, ?, 1)`;
//       connection.query(insertQuery, [studentId, companyId], (insertError, result) => {
//         if (insertError) {
//           return connection.rollback(() => {
//             console.error('Transaction error: ', insertError);
//             res.status(500).json({ error: 'Error inserting round record.' });
//           });
//         }

//         connection.commit((commitError) => {
//           if (commitError) {
//             return connection.rollback(() => {
//               console.error('Transaction commit error: ', commitError);
//               res.status(500).json({ error: 'Error committing transaction.' });
//             });
//           }

//           res.status(200).json({ message: 'Registered successfully!' });
//         });
//       });
//     });
//   });
// });

// module.exports = { registerStudent, getRegisteredCompanies };
