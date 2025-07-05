// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

exports.GenderwisePlaced = (req,res)=>{
  const id = req.params.companyId;
  const query = `SELECT 
  s.tpo_id,
  s.clg_id,
  s.first_name,
  s.middle_name,
  s.last_name,
  s.branch,
  s.gender,
  c.name AS company_name,
  j.package_details,
  j.roles,
  j.company_type
  FROM 
    student_details AS s
  INNER JOIN 
    drive_status AS d ON s.id = d.s_id
  INNER JOIN 
    job_postings AS j ON d.p_id = j.id
  INNER JOIN  
  companies AS c ON j.companyId = c.id where placedStudent=1`;
  db.query(query,id, (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


// import { connection as db } from "../config/dbConfig.js";

// export const drivePlacedResult = (req, res) => {
//   const { gender } = req.query; // Get the gender filter from the query parameters

//   // Corrected SQL query to fetch the required details
//   const query = `
//     SELECT 
//       s.tpo_id,
//       s.clg_id,
//       s.first_name,
//       s.middle_name,
//       s.last_name,
//       s.branch,
//       s.gender,
//       c.id AS companyId,
//       c.name AS company_name,
//       j.package_details
//     FROM 
//       student_details AS s
//     INNER JOIN 
//       drive_status AS d ON s.id = d.s_id
//     INNER JOIN 
//       job_postings AS j ON d.p_id = j.id
//     INNER JOIN  
//       companies AS c ON j.companyId = c.id
//     WHERE d.placedStudent = 1
//     ${gender ? 'AND s.gender = ?' : ''}
//   `;

//   const queryParams = gender ? [gender] : [];
  
//   db.query(query, queryParams, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     res.status(200).json(results);
//   });
// };
