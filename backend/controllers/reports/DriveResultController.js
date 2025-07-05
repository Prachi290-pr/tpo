// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

exports.PlacedStudents = (req,res)=>{
    const id = req.params.companyId;
    const query = `SELECT 
    CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
    c.name AS company_name,
    j.package_details,
    s.tpo_id,
	  s.branch,
    s.clg_id,
    s.ac_yr,
    j.batch_date,
    j.roles,
    case when j.drive_status = 1 then date_format(j.updatedAt,'%d-%m-%Y') else ''  end as placedDate,
    j.company_type
    FROM 
    student_details AS s
    INNER JOIN 
    drive_status AS d ON s.id = d.s_id
    INNER JOIN 
    job_postings AS j ON d.p_id = j.id
    INNER JOIN  
    companies AS c ON j.companyId = c.id where placedStudent=1`;// and j.id = ?`;
    db.query(query,id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });
}

// exports.UnPlacedStudents = (req,res)=>{
//   const id = req.params.companyId;
//   const query = `SELECT 
//   CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
//   s.branch,
//   s.clg_id,
//   s.tpo_id,
//   s.ssc_per,
//   s.hsc_per,
//   s.diploma_per,
//   s.degree_per,
//   s.ac_yr
//   FROM 
//   student_details AS s
//   INNER JOIN 
//   drive_status AS d ON s.id = d.s_id
//   INNER JOIN 
//   job_postings AS j ON d.p_id = j.id
//   INNER JOIN  
//   companies AS c ON j.companyId = c.id where placedStudent=0`;// and j.id = ?`;
//   db.query(query,id, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     res.status(200).json(results);
//   });
// }



exports.UnPlacedStudents = (req, res) => {
  const query = `
    SELECT DISTINCT
      CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
      s.branch,
      s.clg_id,
      s.tpo_id,
      s.ssc_per,
      s.hsc_per,
      s.diploma_per,
      s.degree_per,
      s.ac_yr
    FROM 
      student_details AS s
      INNER JOIN 
      (select s_id,max(placedStudent) as placedStudent from drive_status group by s_id) AS d ON s.id = d.s_id
    WHERE 
      placedStudent = 0`;
  
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};