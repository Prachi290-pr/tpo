// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

// main my code
// Fetch student details with basic information
exports.ERPDetails = (req, res) => {
  const query = `SELECT 
    id,
    tpo_id,
    clg_id,
    first_name,
    middle_name, 
    last_name,
    branch,
    mobile,
    email_id,
    ssc_per,
    hsc_per,
    diploma_per,
    degree_per,
    degree_cgpa
    FROM student_details
    where degree_year in (select batch from current_batch)
    `;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


exports.ERPDetailsApti = (req, res) => {
  let {id} = req.query
  if(id=='' || id == undefined || id == 'undefined'){
    id = null;
  }
  
  const query = `SELECT 
    id,
    tpo_id,
    clg_id,
    first_name,
    middle_name, 
    last_name,
    branch,
    mobile,
    email_id,
    ssc_per,
    hsc_per,
    diploma_per,
    degree_per,
    degree_cgpa
    FROM student_details
    where degree_year in (coalesce(?,(select batch from current_batch)))
    `;
  db.query(query,[id], (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


exports.ERPDetailsInter = (req, res) => {
  let {id} = req.query
  if(id=='' || id == undefined || id == 'undefined'){
    id = null;
  }
  

  const query = `SELECT 
    id,
    tpo_id,
    clg_id,
    first_name,
    middle_name, 
    last_name,
    branch,
    mobile,
    email_id,
    ssc_per,
    hsc_per,
    diploma_per,
    degree_per,
    degree_cgpa
    FROM student_details
    where degree_year in (coalesce(?,(select batch from current_batch)))

    `;
  db.query(query,[id], (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


//fetch eligibility
exports.ERPEligibility = (req, res) => {
  const query = `SELECT sd.id AS student_id, jp.id AS company_id
    FROM student_details sd
    JOIN job_postings jp ON (
      sd.ssc_per >= jp.criteria_10th
      AND (sd.hsc_per >= jp.criteria_12th OR sd.diploma_per >= jp.diploma_criteria)
      AND sd.degree_cgpa >= jp.deg_criteria
  )`;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPEligibilityApti = (req, res) => {
  const query = `
    select 
        s.id AS student_id,
        a.aid as company_id
    from student_details as s
    inner join aptitude as a on INSTR(a.batch , trim(s.degree_year))
    `;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPEligibilityInter = (req, res) => {
  const query = `
    select 
        s.id AS student_id,
        a.id as company_id
    from student_details as s
    inner join interview_details as a on INSTR(a.batch , trim(s.degree_year))`;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPEligibilityMachine = (req, res) => {
  const query = `
    select 
        s.id AS student_id,
        a.practical_id as company_id
    from student_details as s
    inner join machinetest_data as a on INSTR(a.batch , trim(s.degree_year))`;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPCompanies = (req, res) => {
  const query = `SELECT jp.id, c.name , jp.batch_date
  FROM 
    companies as c
  JOIN
    job_postings jp ON c.id = jp.companyId`;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPCompaniesApti = (req, res) => {
  let {id} = req.query
  console.log(id);
  if(id=='' || id == undefined || id == 'undefined'){
    id = null;
  }
  console.log(id);

  // console.log();
  const query = `
  SELECT 
      c.aid as id, 
      c.title as name
  FROM 
    aptitude as c
  where instr(trim(batch),(coalesce('2025',(select batch from current_batch))))
    `;
  db.query(query,[id], (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    console.log(results);
    res.status(200).json(results);
  });
}

exports.ERPCompaniesInter = (req, res) => {
  let {id} = req.query
  if(id=='' || id == undefined || id == 'undefined'){
    id = null;
  }

  const query = `
  SELECT 
      c.id as id, 
      c.title as name
  FROM 
    interview_details as c
  where instr(trim(batch),(coalesce('2025',(select batch from current_batch))))
    
    `;
  db.query(query, [id],(error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPCompaniesMachine = (req, res) => {
  let {id} = req.query
  if(id=='' || id == undefined || id == 'undefined'){
    id = null;
  }

  const query = `
  SELECT 
      c.practical_id as id, 
      c.practical_name as name
  FROM 
    machinetest_data as c
  where instr(trim(batch),(coalesce('2025',(select batch from current_batch))))
    
    `;
  db.query(query,[id], (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPRegistered = (req, res) => {
  const query = `SELECT s_id, p_id,round2,round3,round4 FROM drive_status WHERE round1 =1`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying registered students:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPPlaced = (req, res) => {
  const query = `SELECT s_id, p_id FROM drive_status WHERE placedStudent =1`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying registered students:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


exports.ERPPlacedApti = (req, res) => {
  const query = `  select
      s.id as s_id,
      a.aid as p_id
  from student_mcq as sm
  inner join student_details as s on s.id = sm.sid
  inner join aptitude as a on sm.aid = a.aid and instr(a.batch,s.degree_year)
  inner join (
    SELECT COUNT(*) as correct_ans, user_uid FROM mcqs 
      WHERE user_ans = answer group by user_uid) as ans on ans.user_uid = sm.stu_mcq_key`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying registered students:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPPlacedInter = (req, res) => {
  const query = `   select
    s.id as s_id,
      a.id as p_id
  from interviews as sm
  inner join student_details as s on s.id = sm.userId
  inner join interview_details as a on sm.title = a.title
  inner join (
    SELECT sum(coalesce(score,0)) as correct_ans, interviewId FROM interview_contents 
    group by interviewId) as ans on ans.interviewId = a.id
;`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying registered students:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.ERPPlacedMachine = (req, res) => {
  const query = `  select
	        sd.id as s_id,
          d.practical_id as p_id
        from machinetest_data as d
        left join machine_submissions as s
        on s.prac_id = d.practical_id
        left join student_details as sd
        on sd.id = s.student_id
        where sd.clg_id is not null
;`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying registered students:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}