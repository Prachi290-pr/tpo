const db = require('../../config/dbConfig');

exports.createInterviewDetail = (req, res) => {
  const { role, difficulty, language, deadline,title,batch,event_id} = req.body;

  db.query(
    'INSERT INTO interview_details (role, difficulty, language, deadline,title,batch,event_id) VALUES (?, ?, ?, ?,?,?,?)',
    [role, difficulty, language, deadline,title,String(batch).trim(),event_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
      }

      const newInterviewDetail = {
        id: result.insertId,
        role,
        difficulty,
        language,
        deadline,
        batch
      };

      res.status(201).json(newInterviewDetail);
    }
  );
};

exports.getInterviewDetails = (req, res) => {
  const currentDate = new Date();

  db.query(
    `SELECT 
      md.* 
    FROM interview_details as md
    join student_details as sd
    where INSTR(md.batch,sd.degree_year) and deadline>? and sd.id = ?;`,
    [currentDate,req.user.uid],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
      }

      res.json(results);
    }
  );
};
