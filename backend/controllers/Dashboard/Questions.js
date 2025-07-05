const db = require("../../config/dbConfig");
require("dotenv").config();

const getQuestions = (req,res)=>{
  const companyId = req.params.companyId;
  console.log(companyId);
  const query = `SELECT question, companyId FROM questions WHERE companyId = ?`;
  db.query(query,[companyId], (error, results) => {
    console.log(results);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

const getAnswers = (req,res)=>{
  const companyId = req.params.companyId;
  console.log(companyId);
  const query = `SELECT s_id, p_id, que_answers FROM drive_status WHERE p_id = ?`;
  db.query(query,[companyId], (error, results) => {
    console.log(results);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

module.exports = {
  getQuestions,
  getAnswers,
};