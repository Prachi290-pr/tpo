require("dotenv").config();
const db = require("../../config/dbConfig");

// Fetch registered students for all companies
const RegisteredCompanies = (req, res) => {
  const { studentId } = req.query;
  const query = `
SELECT jp.id AS job_posting_id, c.id AS company_id, c.name, jp.roles, jp.batch_date
FROM job_postings jp
JOIN companies c ON jp.companyId = c.id
JOIN (
    SELECT p_id 
    FROM drive_status 
    WHERE round1 = 1 AND s_id = ?
) ds ON jp.id = ds.p_id;
  `;
  console.log(studentId);
  db.query(query, [studentId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

module.exports = RegisteredCompanies;
