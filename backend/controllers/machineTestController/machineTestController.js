const connection = require("../../config/dbConfig");

exports.getProgrammingLanguages=async(req,res)=>{
    try {
      // Run the SQL query to fetch programming languages
      connection.query(
        "SELECT * FROM programming_languages"
      ,(err,rows)=>{
        if(err){
            console.log(err);
            return res.status(500);
        }else{
            res.status(200).json({data:rows});
        }
      });
    } catch (error) {
      // Handle any errors
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        next(error); // Pass error to next middleware
      }
    }
  }


exports.createPractical=(req, res)=> {
    const practicalData = req.body; // Assuming you use a body parser like express.json()
    const { prac_io: pracIoData, prac_language: pracLanguageData, ...practicalInfo } = practicalData;

    connection.beginTransaction((err) => {
        if (err) {  
            return res.status(500).json({ error: 'Transaction initiation failed', details: err });
        }

        connection.query('INSERT INTO machinetest_data SET ?', practicalInfo, (insertErr, result) => {
            if (insertErr) {
                return connection.rollback(() => {
                    console.log(insertErr)
                    return res.status(500).json({ error: 'Failed to insert practical', details: insertErr });
                });
            }

            const newPracticalId = result.insertId;

            connection.query('SELECT * FROM machinetest_data WHERE practical_id = ? LIMIT 1', [newPracticalId], (selectErr, newPractical) => {
                if (selectErr) {
                    return connection.rollback(() => {
                        console.log(selectErr)
                        return res.status(500).json({ error: 'Failed to retrieve new practical', details: selectErr });
                    });
                }

                const practicalId = newPractical[0].practical_id;

                const ioInsertQueries = pracIoData ? pracIoData.map(io => {
                    return new Promise((resolve, reject) => {
                        connection.query('INSERT INTO machinetest_io SET ?', { ...io, practical_id: practicalId }, (ioErr) => {
                            if (ioErr) return reject(ioErr);
                            resolve();
                        });
                    });
                }) : [];

                Promise.all(ioInsertQueries)
                    .then(() => {
                        const langInsertQueries = pracLanguageData ? pracLanguageData.map(lang => {
                            return new Promise((resolve, reject) => {
                                connection.query('INSERT INTO machinetest_lan SET ?', { ...lang, practical_id: practicalId }, (langErr) => {
                                    console.log(langErr)
                                    if (langErr) return reject(langErr);
                                    resolve();
                                });
                            });
                        }) : [];

                        return Promise.all(langInsertQueries);
                    })
                    .then(() => {
                        connection.commit((commitErr) => {
                            if (commitErr) {
                                return connection.rollback(() => {
                                    return res.status(500).json({ error: 'Transaction commit failed', details: commitErr });
                                });
                            }
                            return res.status(201).json(newPractical[0]); // Respond with the created practical
                        });
                    })
                    .catch(err => {
                        connection.rollback(() => {
                            return res.status(500).json({ error: 'Failed to insert related data', details: err });
                        });
                    });
            });
        });
    });
}


// Fetch all practicals
exports.getPracticals = (req, res) => {
    let q =  `select 
                md.* 
              from machinetest_data as md
              join student_details as sd
              where INSTR(md.batch,sd.degree_year) and sd.id = ? and status=0`

    if(parseInt(req.user.uid)==15){
        q = 'SELECT * FROM machinetest_data';
    } 
    connection.query(q,[req.user.uid],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Failed to fetch machinetest_data' });
        }else{
            return res.status(200).json(data);
        }
    })
  };
  
  // Get practical by ID
  exports.getPracticalById = (req, res) => {
    const practicalId = parseInt(req.params.id, 10);
  
    // Query for practical data
    connection.query(
      'SELECT * FROM machinetest_data WHERE practical_id = ? LIMIT 1',
      [practicalId],
      (err, practical) => {
        if (err) {
          console.error('Error fetching practical data:', err);
          return res.status(500).json({ error: 'Failed to fetch practical data' });
        }
  
        if (!practical.length) {
          return res.status(404).json({ error: 'Practical not found' });
        }
  
        const practicalData = practical[0];
  
        // Query for test cases
        connection.query(
          'SELECT * FROM machinetest_io WHERE practical_id = ?',
          [practicalId],
          (err, pracIoRows) => {
            if (err) {
              console.error('Error fetching prac_io:', err);
              return res.status(500).json({ error: 'Failed to fetch test cases' });
            }
  
            // Query for languages
            connection.query(
              'SELECT * FROM machinetest_lan WHERE practical_id = ?',
              [practicalId],
              (err, pracLanguageRows) => {
                if (err) {
                  console.error('Error fetching prac_language:', err);
                  return res.status(500).json({ error: 'Failed to fetch practical languages' });
                }
  
                // Send response
                return res.status(200).json({
                  ...practicalData,
                  prac_io: pracIoRows, // Assuming first result
                  prac_language: pracLanguageRows, // Assuming first result
                });
              }
            );
          }
        );
      }
    );
  };
  
  
  // Get practical languages
  exports.getPracticalLanguages = (req, res) => {
    const practicalId = parseInt(req.params.id, 10);
  
    connection.query(
      `
      SELECT pl.*, plg.language_name 
      FROM machinetest_lan pl
      INNER JOIN programming_languages plg ON pl.programming_language_id = plg.programming_language
      WHERE pl.practical_id = ?
      `,
      [practicalId],
      (err, rows) => {
        if (err) {
          console.error('Error fetching practical languages:', err);
          return res.status(500).json({ error: 'Failed to fetch practical languages' });
        }

        console.log(rows)
  
        return res.status(200).json(rows);
      }
    );
  };



  exports.Codesubmission=(req, res) => {
    const { submitedCode, languages, total_testCase, passed_cases, prac_id, output,runTime } = req.body;
    const student_id = req.user.uid;

    console.log(student_id);
    // Insert query
    const query = `
        INSERT INTO machine_submissions (submited_code, language, total_test_cases, passed_cases, prac_id, student_id, output,runTime)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [submitedCode, languages, total_testCase, passed_cases, prac_id, student_id, JSON.stringify(output),runTime]; // Stringify output

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error inserting submission:", err);
            return res.status(500).json({ success: false, message: "Failed to insert submission" });
        }

        return res.status(201).json({ success: true, message: "Submission inserted successfully", submissionId: results.insertId });
    });
}
  

exports.AllSubmissions=(req, res) => {
    const { id } = req.body;
   
    // Insert query
    const query = `
        select
	        concat(sd.first_name," ",sd.last_name) as name,
	        sd.clg_id,
            sd.branch,
            sd.degree_year,
            s.total_test_cases,
            max(case when s.total_test_cases < s.passed_cases then s.total_test_cases  else s.passed_cases end) as passed_cases,
            max(s.runTime) as runTime,
            max(case when s.total_test_cases <= s.passed_cases then "Accepted" else "Rejected" end) as status
        from machinetest_data as d
        left join machine_submissions as s
        on s.prac_id = d.practical_id
        left join student_details as sd
        on sd.id = s.student_id
        where sd.clg_id is not null and d.practical_id = ?
        group by name,sd.clg_id,
            sd.branch,
            sd.degree_year,
            s.total_test_cases 
        ;
    `;

    connection.query(query,id, (err, results) => {
        if (err) {
            console.error("Error inserting submission:", err);
            return res.status(500).json({ success: false, message: "Failed to insert submission" });
        }

        return res.status(201).json({ data:results });
    });
}


exports.AllSubmissionsStudents=(req, res) => {
    const { id } = req.body;
   
    // Insert query
    const query = `
        select
	        concat(sd.first_name," ",sd.last_name) as name,
	        sd.clg_id,
            sd.branch,
            sd.degree_year,
            s.total_test_cases,
            max(case when s.total_test_cases < s.passed_cases then s.total_test_cases  else s.passed_cases end) as passed_cases,
            max(s.runTime) as runTime,
            max(case when s.total_test_cases <= s.passed_cases then "Accepted" else "Rejected" end) as status
        from machinetest_data as d
        left join machine_submissions as s
        on s.prac_id = d.practical_id
        left join student_details as sd
        on sd.id = s.student_id
        where sd.clg_id is not null and d.practical_id = ? and sd.id = ?
        group by name,sd.clg_id,
            sd.branch,
            sd.degree_year,
            s.total_test_cases 
        ;
    `;

    connection.query(query,[id,req.user.uid], (err, results) => {
        if (err) {
            console.error("Error inserting submission:", err);
            return res.status(500).json({ success: false, message: "Failed to insert submission" });
        }

        return res.status(201).json({ data:results });
    });
}

exports.UpdateStatus=(req, res) => {
    const { id } = req.body;
   
    console.log(id);
    // Insert query
    const query = `
        update machinetest_data set status = (not status) where practical_id = ?
    `;

    connection.query(query,[id], (err, results) => {
        if (err) {
            console.error("Error inserting submission:", err);
            return res.status(500).json({ success: false, message: "Failed to insert submission" });
        }

        return res.status(201).json({success:true });
    });
}