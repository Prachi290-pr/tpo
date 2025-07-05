// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');


// main my code
// Fetch student details with basic information
exports.ERPDetails = (req, res) => {
  const query = `SELECT * FROM student_details`;
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

// //fetch eligibility
exports.getEligibleCompaniesCount = (req, res) => {
  const { studentId } = req.query;
  const query = `
    SELECT COUNT(*) AS eligible_count
    FROM job_postings jp
    JOIN student_details sd ON (
      sd.ssc_per >= jp.criteria_10th
      AND (sd.hsc_per >= jp.criteria_12th OR sd.diploma_per >= jp.diploma_criteria)
      AND sd.degree_cgpa >= jp.deg_criteria
    )
    WHERE sd.id = ?;
  `;
  db.query(query, [studentId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const eligibleCount = results[0]?.eligible_count || 0;
    res.status(200).json({ eligible_count: eligibleCount });
  });
};

// Fetch registered students for all companies
exports.ERPRegistered = (req, res) => {
  const { studentId } = req.query;
  const query = `
    select 
	    distinct c.name
    from drive_status as ds
    left join job_postings as jp on jp.id = ds.p_id
    left join companies as c on c.id = jp.companyId
    where s_id = ?;
  `;
  db.query(query, [studentId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

// // Fetch registered students for all companies
exports.ERPPlaced = (req, res) => {
  const { studentId } = req.query;
  const query = `
    select 
	    c.name
    from drive_status as ds
    left join job_postings as jp on jp.id = ds.p_id
    left join companies as c on c.id = jp.companyId
    where s_id = ? and ds.placedStudent = 1;
  `;
  db.query(query, [studentId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}