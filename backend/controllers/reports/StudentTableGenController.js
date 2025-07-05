// import { connection as db } from "../config/dbConfig.js";
const db = require('../../config/dbConfig');

exports.StudentTableGen = (req, res) => {
  const query = `
  SELECT * FROM student_details
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.StudentTableGenUp = (req, res) => {
  let {batch,branch} = req.params;
  let {ssc,hsc,deg,dip} = req.body;

  console.log(batch,branch)
  if(batch=='ALL'){
    batch = null
  }

  if(branch=='ALL'){
    branch = null
  }

  if(ssc=='' || ssc==undefined || ssc=='undefined' || ssc==null || ssc=='null'){
    ssc = null
  }

  if(hsc=='' || hsc==undefined || hsc=='undefined' || hsc==null || hsc=='null'){
    hsc = null
  }
  
  if(dip=='' || dip==undefined || dip=='undefined' || dip==null || dip=='null'){
    dip = null
  }

  if(deg=='' || deg==undefined || deg=='undefined' || deg==null || deg=='null'){
    deg = null
  }

  const query = `
  SELECT * FROM student_details
  where branch = coalesce(?,branch) and degree_year = coalesce(?,degree_year) and
  (
    ssc_per >= coalesce(?,ssc_per) and
    (
     (coalesce(hsc_per,0) = 0 and diploma_per >= coalesce(?,diploma_per))
     or
     (coalesce(diploma_per,0) = 0 and hsc_per >= coalesce(?,hsc_per))
     or
     (
        coalesce(hsc_per,0) > 0 and coalesce(diploma_per,0) > 0
        and
        (
          diploma_per >= coalesce(?,diploma_per)
          or 
          hsc_per >= coalesce(?,hsc_per)
        )
      )
    ) and
    degree_cgpa >= coalesce(?,degree_cgpa)
  )
  `;

  db.query(query, [branch,batch,ssc,dip,hsc,dip,hsc,deg],(error, results) => {
    if (error) {
      console.log((error));
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.getQuesTitle = (req,res)=>{
  const query = `
    select title from aptitude
  `
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });

}

exports.getInterViewTitle = (req,res)=>{
  const query = `
    select title from interview_details
  `

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });

}

exports.getTestReportByQuesTitle= (req,res)=>{
  const {ques_title} = req.body;
  console.log("in a funcri",ques_title)
  const query = `
  select
	first_name, last_name, branch, title, clg_id, noq, aptitudetype, max(correct_ans) as correct_ans
from
(select
    s.first_name,
      s.last_name,
      s.branch,
      a.title,
      s.clg_id,
      a.noq,
      a.aptitudetype,
      coalesce(ans.correct_ans,0) as correct_ans
  from student_mcq as sm
  left join student_details as s on s.id = sm.sid
  left join aptitude as a on sm.aid = a.aid
  left join (
    SELECT COUNT(*) as correct_ans, user_uid FROM mcqs 
      WHERE user_ans = answer group by user_uid) as ans on ans.user_uid = sm.stu_mcq_key
  where a.title = ?) as a
group by first_name, last_name, branch, title, clg_id, noq, aptitudetype
;
  `
  db.query(query, [ques_title], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getInterViewReportByTitle= (req,res)=>{
  const {ques_title} = req.body;
  console.log("in a funcri",ques_title)
  const query = `
  select
	first_name, last_name, branch, title, clg_id, noq,  max(correct_ans) as correct_ans
from
(
  select
      s.first_name,
      s.last_name,
      s.branch,
      a.title,
      s.clg_id,
      100 as noq,
      a.language,
      coalesce(sm.score,0) as correct_ans
  from interviews as sm
  left join student_details as s on s.id = sm.userId
  left join interview_details as a on sm.title = a.title
  left join (
    SELECT sum(coalesce(score,0)) as correct_ans, interviewId FROM interview_contents 
    group by interviewId) as ans on ans.interviewId = a.id
where a.title = ?) as a
group by first_name, last_name, branch, title, clg_id, noq
;
  `
  db.query(query, [ques_title], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getAllTestReportByTitle= (req,res)=>{
  const {ques_title} = req.body;
  console.log("in a funcri",ques_title)
  const query = `
 SELECT 
        s.first_name,
        s.last_name,
        s.branch,
        a.title,
        s.clg_id,
        100 AS noq,
        COALESCE(MAX(sm.score), 'A') AS correct_ans,
        'inter' as type
    FROM 
        student_details AS s
	inner JOIN interview_details AS a
    left JOIN interviews AS sm ON s.id = sm.userId and trim(a.title) = trim(sm.title)
    left JOIN (
        SELECT 
            SUM(COALESCE(score, 0)) AS correct_ans, 
            interviewId 
        FROM 
            interview_contents 
        GROUP BY 
            interviewId
    ) AS ans ON ans.interviewId = a.id
    where s.degree_year = ? and instr(a.batch,s.degree_year)>0
    group by first_name,
        last_name,
        branch,
        title,
        clg_id,
        noq,type

union all

SELECT 
        s.first_name,
        s.last_name,
        s.branch,
        a.title,
        s.clg_id,
        a.noq,
        COALESCE(max(ans.correct_ans), 'A') AS correct_ans,
        'apti' as type
    FROM 
        student_details AS s 
	inner JOIN aptitude AS a 
    left JOIN student_mcq AS sm ON s.id = sm.sid and a.aid = sm.aid
    left JOIN (
        SELECT 
            COUNT(*) AS correct_ans, 
            user_uid 
        FROM 
            mcqs 
        WHERE 
            user_ans = answer 
        GROUP BY 
            user_uid
    ) AS ans ON ans.user_uid = sm.stu_mcq_key
    where degree_year = ? and instr(a.batch,s.degree_year)>0
    group by first_name,
        last_name,
        branch,
        title,
        clg_id,
        noq,type

union all


select
	sd.first_name,
	sd.last_name,
	sd.branch,
	md.practical_name as title,
	sd.clg_id,
	ms.passed_cases AS noq,
	CASE 
        when ms.total_test_cases is null then 'A' 
        WHEN ms.total_test_cases = ms.passed_cases THEN 'Accepted'
        ELSE 'Rejected'
    END AS correct_ans,
	'machine' as type
from student_details as sd
inner JOIN machinetest_data AS md 
left join
(
    SELECT 
        student_id,
        prac_id,
        MAX(passed_cases) AS passed_cases,
        MAX(total_test_cases) AS total_test_cases
    FROM 
        machine_submissions 
    GROUP BY 
        student_id, prac_id
) AS ms ON ms.student_id = sd.id and md.practical_id = ms.prac_id
where sd.degree_year = ? and instr(md.batch,sd.degree_year)>0
;
  `
  db.query(query, [ques_title,ques_title,ques_title],(error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getAllBranch = (req,res) =>{
  db.query("select distinct branch as branch from student_details", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getEventsByBatch = (req,res) =>{
  const batch = req.body.batch;

  db.query("select * from tpo_events where batch = ?",[batch], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getAllInter = (req,res) =>{
  db.query("select distinct interested_in as inter from student_details", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getAllBatch = (req,res) =>{
  db.query("select distinct degree_year as batch from student_details order by trim(degree_year) ", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getRegisteredByBatch= (req,res)=>{
  const {ques_title} = req.body;

  const query = `
  SELECT 
    email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, tpo_id, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year, resume, comp_id, post_id, createdAt, updatedAt, usertype, interested_in, ac_yr
FROM student_details
WHERE degree_year = ?;
;
  `

  db.query(query, [ques_title], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getRegisteredByBranch= (req,res)=>{
  const {ques_title} = req.body;

  const query = `
  SELECT 
    email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, tpo_id, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year, resume, comp_id, post_id, createdAt, updatedAt, usertype, interested_in, ac_yr
FROM student_details
WHERE  branch = ?;
;
  `
  db.query(query, [ques_title], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getRegisteredbyInter= (req,res)=>{
  const {ques_title} = req.body;

  const query = `
  SELECT 
    email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, tpo_id, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year, resume, comp_id, post_id, createdAt, updatedAt, usertype, interested_in, ac_yr
FROM student_details
WHERE  interested_in = ?;
;
  `

  db.query(query, [ques_title], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}

exports.getStudentListAll = (req,res)=>{
  const {branch,batch,inter} = req.body;

  
  const query = `
  SELECT 
    email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, tpo_id, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year, resume, comp_id, post_id, createdAt, updatedAt, usertype, interested_in, ac_yr
FROM student_details
WHERE  interested_in = coalesce(?,interested_in) and branch = coalesce(?,branch) and degree_year = coalesce(?,degree_year);
;
  `

  db.query(query, [inter,branch,batch], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
}


exports.getAllTestReportByEventId= (req,res)=>{
  const {event_id} = req.body;
  const query = `
 select
	concat(s.first_name,  ' ', s.last_name) as name,
	s.branch,
	s.degree_year,
	a.title,
	s.clg_id,
	100 as inter_noq,
	COALESCE(sum(ans.correct_ans), 'A') AS inter_correct_ans,
  COALESCE(sum(ansa.correct_ans), 'A') AS apti_correct_ans,
	ap.noq as apti_noq,
    coalesce(ms.total_test_cases,'A') as machine_test
from student_details AS s
inner JOIN interview_details AS a
left JOIN interviews AS sm ON s.id = sm.userId and trim(a.title) = trim(sm.title)
left JOIN (
        SELECT 
            SUM(COALESCE(score, 0)) AS correct_ans, 
            interviewId 
        FROM 
            interview_contents 
        GROUP BY 
            interviewId
) AS ans ON ans.interviewId = a.id
inner JOIN aptitude AS ap on ap.event_id = a.event_id
left JOIN student_mcq AS sma ON s.id = sma.sid and ap.aid = sma.aid
left JOIN (
	SELECT 
		COUNT(*) AS correct_ans, 
		user_uid 
	FROM 
		mcqs 
	WHERE 
		user_ans = answer 
	GROUP BY 
		user_uid
) AS ansa ON ansa.user_uid = sma.stu_mcq_key
inner JOIN machinetest_data AS md on md.event_id = a.event_id
left join
(
    SELECT 
        student_id,
        prac_id,
        MAX(passed_cases) AS passed_cases,
        MAX(total_test_cases) AS total_test_cases
    FROM 
        machine_submissions 
    GROUP BY 
        student_id, prac_id
) AS ms ON ms.student_id = s.id and md.practical_id = ms.prac_id
where 
	 
    instr(a.batch,s.degree_year)>0 and 
    a.event_id = ?
group by
	first_name,
	last_name,
	branch,
	title,
	clg_id,
    noq,
    total_test_cases,
    degree_year
;
  `
  db.query(query, [event_id],(error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
    console.log(event_id);
    res.status(200).json(results);
  });
}