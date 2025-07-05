// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

// Fetch company details
const RSLCompanies = (req, res) => {
  const query = `SELECT jp.id, c.name , jp.tracker, jp.roles, jp.batch_date
  FROM 
    companies as c
  JOIN
    job_postings jp ON c.id = jp.companyId`;
  // const query = `
  // SELECT c.id, c.name, jp.tracker
  // FROM 
  //   tpo_final_database.companies as c
  // JOIN
  //  tpo_final_database.job_postings jp ON c.id = jp.companyId
  //  `;
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


const RSLCompaniesIntership = (req, res) => {
  const query = `SELECT jp.id, c.name , jp.tracker, jp.roles, jp.batch_date
  FROM 
    intershiip_companies as c
  JOIN
    intership_postings jp ON c.id = jp.companyId`;
  // const query = `
  // SELECT c.id, c.name, jp.tracker
  // FROM 
  //   tpo_final_database.companies as c
  // JOIN
  //  tpo_final_database.job_postings jp ON c.id = jp.companyId
  //  `;
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

// Fetch registered students for all companies
const RSLRegistered = (req, res) => {
  const companyId = req.params.companyId; // Correct extraction
  const query = `
    SELECT 
      *
    FROM 
      student_details s
    JOIN 
      drive_status ds ON s.id = ds.s_id
    WHERE 
      ds.round1 = 1 
      AND ds.p_id = ?
  `;
  console.log(companyId);
  db.query(query, [companyId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};


const RSLRegisteredIntership = (req, res) => {
  const companyId = req.params.companyId; // Correct extraction
  const query = `
    SELECT 
      *
    FROM 
      student_details s
    JOIN 
      intership_status ds ON s.id = ds.s_id
    WHERE 
      ds.round1 = 1 
      AND ds.p_id = ?
  `;
  console.log(companyId);
  db.query(query, [companyId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};


module.exports = {
  RSLCompanies,
  RSLRegistered,
  RSLCompaniesIntership,
  RSLRegisteredIntership
}