require("dotenv").config();
const connection = require("../../config/dbConfig");

const job_postingCompanies = (req,res)=>{
    // const id = req.body.id;  
    const studentId = req.params.studentId;
    const query = `SELECT 
    jp.id AS jobId,
    c.id,
    c.name,
    jp.job_description,
    jp.package_details,
    jp.roles,
    jp.tracker,
    jp.criteria_10th,
    jp.criteria_12th,
    jp.deg_criteria,
    jp.diploma_criteria,
    jp.eligible_branches,
    jp.docs,
    jp.docs2,
    jp.docs3,
    jp.extLink,
    DATE_FORMAT( jp.deadline, '%d-%m-%Y') as deadline,
    time( jp.deadline) as deadlineTime
  FROM 
    companies c
  JOIN 
    job_postings jp ON c.id = jp.companyId
  JOIN 
    student_details sd ON (
        sd.ssc_per >= jp.criteria_10th
        AND (sd.hsc_per >= jp.criteria_12th OR sd.diploma_per >= jp.diploma_criteria)
        AND sd.degree_cgpa >= jp.deg_criteria
        And sd.interested_in = 'Placement'
        and  INSTR(trim(jp.eligible_branches) , trim(sd.branch))
    )
  left join (
        select max(salad_id) as salad_id,s_id,first_name from drive_status as ds
        left join job_postings as jp on ds.p_id = jp.id
        left join companies as c on jp.companyId = c.id
        left join student_details as sd on ds.s_id = sd.id
        where placedStudent = 1
        group by ds.s_id,first_name
  ) as plac on plac.s_id = sd.id
  WHERE 
    sd.id = ? and instr(trim(jp.batch_date),trim(sd.degree_year))>0 and jp.deadline >= now() and sd.isblacklisted = 0 and (jp.salad_id > plac.salad_id or plac.salad_id is null )
    and
  sd.clg_id in (
  select stud_clg_id from eligible_students_for_drive
  )  
    
    `;
    connection.query(query,[studentId], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });
}

const getintership_post = (req,res)=>{
  // const id = req.body.id;  
  const studentId = req.params.studentId;
  console.log(req.user.uid);
  console.log("studentId",studentId);


  const query = `SELECT 
    jp.id AS jobId,
    c.id,
    c.name,
    jp.job_description,
    jp.package_details,
    jp.roles,
    jp.tracker,
    jp.criteria_10th,
    jp.criteria_12th,
    jp.deg_criteria,
    jp.diploma_criteria,
    jp.eligible_branches,
    jp.docs,
    jp.docs2,
    jp.docs3,
    jp.extLink,
    DATE_FORMAT( jp.deadline, '%d-%m-%Y') as deadline,
    time( jp.deadline) as deadlineTime
FROM 
  intershiip_companies c
JOIN 
  intership_postings jp ON c.id = jp.companyId
JOIN 
  student_details sd ON (
      sd.ssc_per >= jp.criteria_10th
      AND (sd.hsc_per >= jp.criteria_12th OR sd.diploma_per >= jp.diploma_criteria)
      AND sd.degree_cgpa >= jp.deg_criteria
  )
WHERE 
  sd.id = ? and trim(sd.degree_year) = trim(jp.batch_date) and jp.deadline >= now() and sd.isblacklisted = 0 
  and
  sd.clg_id in (
  select stud_clg_id from eligible_students_for_drive
  )  
  `;
  connection.query(query,[studentId], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
    console.log(results);
    res.status(200).json(results);
  });
}

module.exports = { job_postingCompanies,getintership_post };