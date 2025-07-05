// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

exports.CompanywisePlaced = (req, res) => {
  const query = `
    SELECT 
      s.tpo_id,
      s.clg_id,
      s.first_name,
      s.middle_name,
      s.last_name,
      s.branch,
      s.mobile,
      s.email_id,
      GROUP_CONCAT(c.name SEPARATOR '/ ') AS company_name,
      GROUP_CONCAT(j.company_type SEPARATOR '/ ') AS company_type,
      GROUP_CONCAT(j.roles SEPARATOR '/ ') AS roles,
      GROUP_CONCAT(j.package_details SEPARATOR '/ ') AS package_details,
      COUNT(c.id) AS placed_count
    FROM 
      student_details AS s
    INNER JOIN 
      drive_status AS d ON s.id = d.s_id
    INNER JOIN 
      job_postings AS j ON d.p_id = j.id
    INNER JOIN  
      companies AS c ON j.companyId = c.id
    WHERE d.placedStudent = 1
    GROUP BY 
      s.tpo_id, s.clg_id, s.first_name, s.middle_name, s.last_name, s.branch, s.mobile, s.email_id
    
      union all

      select
		'' as tpo_id,
      'Total' as clg_id,
      '' as first_name,
      '' as middle_name,
      '' as last_name,
      '' as branch,
      '' as mobile,
      '' as email_id,
      '' AS company_name,
      '' AS company_type,
      '' AS roles,
      '' AS package_details,
sum(placed_count) as placed_count from 
(SELECT 
      s.tpo_id,
      s.clg_id,
      s.first_name,
      s.middle_name,
      s.last_name,
      s.branch,
      s.mobile,
      s.email_id,
      GROUP_CONCAT(c.name SEPARATOR '/ ') AS company_name,
      GROUP_CONCAT(j.company_type SEPARATOR '/ ') AS company_type,
      GROUP_CONCAT(j.roles SEPARATOR '/ ') AS roles,
      GROUP_CONCAT(j.package_details SEPARATOR '/ ') AS package_details,
      COUNT(c.id) AS placed_count
    FROM 
      student_details AS s
    INNER JOIN 
      drive_status AS d ON s.id = d.s_id
    INNER JOIN 
      job_postings AS j ON d.p_id = j.id
    INNER JOIN  
      companies AS c ON j.companyId = c.id
    WHERE d.placedStudent = 1
    GROUP BY 
      s.tpo_id, s.clg_id, s.first_name, s.middle_name, s.last_name, s.branch, s.mobile, s.email_id) as a
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};