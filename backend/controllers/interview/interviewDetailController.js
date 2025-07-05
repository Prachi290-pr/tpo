const db = require('../../config/dbConfig');

exports.createInterviewDetail = (req, res) => {
  const { role, difficulty, language, deadline,title } = req.body;

  db.query(
    'INSERT INTO interview_details (role, difficulty, language, deadline,title) VALUES (?, ?, ?, ?,?)',
    [role, difficulty, language, deadline,title],
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
      };

      res.status(201).json(newInterviewDetail);
    }
  );
};

exports.getInterviewDetails = (req, res) => {
  const currentDate = new Date();

  db.query(
    'SELECT * FROM interview_details WHERE deadline > ?',
    [currentDate],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
      }

      res.json(results);
    }
  );
};
