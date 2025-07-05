// import { connection as db } from "../config/dbConfig.js";
// const { connection: db } = require("../../config/dbConfig.js");
const db = require('../../config/dbConfig');

exports.CompanyTableGen = (req, res) => {
  const query = `
  SELECT 
      c.id AS company_id,
      c.name AS company_name,
      j.job_description,
      j.package_details,
      j.roles,
      j.criteria_10th,
      j.criteria_12th,
      j.diploma_criteria,
      j.deg_criteria,
      c.academic_year,
      j.eligible_branches
    FROM 
      job_postings AS j
    INNER JOIN 
      companies AS c ON j.companyId = c.id
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.CompanyTableGenIntern = (req, res) => {
  const query = `
    SELECT 
      c.id AS company_id,
      c.name AS company_name,
      j.job_description,
      j.package_details,
      j.roles,
      j.criteria_10th,
      j.criteria_12th,
      j.diploma_criteria,
      j.deg_criteria,
      c.academic_year,
      j.eligible_branches
    FROM 
      intership_postings AS j
    INNER JOIN 
      intershiip_companies AS c ON j.companyId = c.id
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};