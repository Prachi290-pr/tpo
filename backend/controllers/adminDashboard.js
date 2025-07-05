// import { connection as db } from "../config/dbConfig.js";
// import expressAsyncHandler from "express-async-handler";

const db = require("../config/dbConfig.js");
const expressAsyncHandler = require("express-async-handler");

exports.getcountofplacedstudent = (req, res) => {
  const sql =
    "SELECT COUNT(DISTINCT s_id) AS count_of_students FROM drive_status WHERE placedStudent = 1";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.getcountofregisteredStudents = (req, res) => {
  const sql =
    "SELECT COUNT(DISTINCT d_id) AS count_of_students FROM drive_status ";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.getcountofunplacedstudent = async (req, res) => {
  const sql =
    "SELECT COUNT(DISTINCT s_id) AS count_of_students FROM drive_status WHERE placedStudent = 0";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.getcountofcompanies = async (req, res) => {
  const sql = "select COUNT(id) as count from companies";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.getcountofcomformcompanies = async (req, res) => {
  const conform = "Confirmed";
  const sql =
    "select count(r.id) as count from remarks as r inner join companies as c on r.companyid = c.id where r.status = ?";
  db.query(sql, [conform], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

exports.reminder = expressAsyncHandler(async(req, res) => {
  const sql = `SELECT r.id as rid, r.reminder_date,r.createdAt, c.name as company_name, r.drive_date 
FROM remarks as r 
INNER JOIN companies as c 
ON r.companyId = c.id 
WHERE r.reminder_date <= current_date()`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    console.log(results);
    return res.status(200).json(results);
  });
});

exports.resetReminder = expressAsyncHandler(async(req, res) => {
  const rid = req.params.id;
  const sql = `UPDATE remarks SET reminder_date = NULL WHERE id = ?`;
  db.query(sql, [rid], (err, results) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.status(200).json(results);
  });
});





// exports.registerstudents =(req,res)=>{

// //   create view v1 as SELECT
// //     s.id,
// //     s.first_name AS student_name,
// //     c.name AS company_name,
// //     s.branch,
// //     c.academic_year
// // FROM
// //     (SELECT DISTINCT s_id, p_id FROM drive_status) AS d
// //     INNER JOIN student_details AS s ON d.s_id = s.id
// //     INNER JOIN job_postings AS j ON d.p_id = j.id
// //     INNER JOIN companies AS c ON j.companyId = c.id;

// const branch=req.body.selectedBranch;
// const academic_year=req.body.selectedyear;
// console.log(branch,academic_year)
//    const sql =`SELECT COUNT(DISTINCT id) as count FROM v1 where branch=? and academic_year=?`
//    const values=[branch,academic_year]
//    db.query(sql,values,(err,results)=>{
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.status(200).json(results);
//    })
// }


// exports.registerstudents = (req, res) => {
//   const branch = req.body.selectedBranch;
//   const academic_year = req.body.selectedYear;
// // console.log(branch,academic_year)
//   let sql;
//   let values;

//   if (!branch && !academic_year) {
//     // Get count for all branches and all academic years
//     sql = `SELECT  COUNT(DISTINCT id) as count FROM v1`;
//     values = [];
//   } else if (!branch) {
//     // Get count for all branches in a specific academic year
//     sql = `SELECT  COUNT(DISTINCT id) as count FROM v1 WHERE academic_year=? `;
//     values = [academic_year];
//   } else if (!academic_year) {
//     // Get count for a specific branch across all academic years
//     sql = `SELECT COUNT(DISTINCT id) as count FROM v1 WHERE branch=? `;
//     values = [branch];
//   } else {
//     // Get count for a specific branch and academic year
//     sql = `SELECT COUNT(DISTINCT id) as count FROM v1 WHERE branch=? AND academic_year=?`;
//     values = [branch, academic_year];
//   }

//   db.query(sql, values, (err, results) => {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.status(200).json(results);
//   });
// };

exports.barchart =(req,res)=>{
  const sql=`SELECT
    sd.ac_yr as academic_year,
    COUNT(*) AS total_students,
    SUM(CASE WHEN ds.placedStudent = 1 THEN 1 ELSE 0 END) AS placed_students,
    COUNT(*) - SUM(CASE WHEN ds.placedStudent = 1 THEN 1 ELSE 0 END) AS unplaced_students
FROM (
    SELECT s_id, MAX(placedStudent) AS placedStudent
    FROM drive_status
    GROUP BY s_id
) AS ds
right JOIN student_details sd ON ds.s_id = sd.id
where interested_in = 'Placement' and degree_year in (select batch from current_batch)
GROUP BY sd.ac_yr
order by sd.ac_yr`

  db.query(sql,(err,results)=>{
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.status(200).json(results);
  })
}


exports.register_students = (req,res)=>{
  const sql = `SELECT
  c.academic_year,
  s.branch,
  COUNT(DISTINCT s.id) AS regester_students
FROM
  drive_status ds
  INNER JOIN student_details s ON ds.s_id = s.id
  INNER JOIN job_postings jp ON ds.p_id = jp.id
  INNER JOIN companies c ON jp.companyId = c.id
GROUP BY
  c.academic_year,
  s.branch
ORDER BY
  c.academic_year, s.branch`

  db.query(sql,(err,results)=>{
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.status(200).json(results);
  })
}


exports.registerstudents =(req,res)=>{
  const sql =`SELECT branch,ac_yr, COUNT(*) as student_count
FROM student_details
GROUP BY branch,ac_yr`;
db.query(sql,(err,results)=>{
  if (err){
    return res.status(500).json({ err: err.message });
  }
  res.status(200).json(results);
})
}


exports.interest =(req,res)=>{
  const sql =`SELECT 
    trim(interested_in) as inter,
    trim(degree_year) as batch, 
    COUNT(*) as student_count
FROM student_details
where interested_in is not null
GROUP BY interested_in,trim(degree_year)
order by trim(degree_year);`;
db.query(sql,(err,results)=>{
  if (err){
    return res.status(500).json({ err: err.message });
  }
  res.status(200).json(results);
})
}

exports.batchWiseCount =(req,res)=>{
  const sql =`SELECT 
    trim(degree_year) as batch, 
    COUNT(*) as student_count
FROM student_details
where interested_in is not null
GROUP BY trim(degree_year)
order by trim(degree_year)
;`;
db.query(sql,(err,results)=>{
  if (err){
    return res.status(500).json({ err: err.message });
  }
  res.status(200).json(results);
})
}

exports.getDriveDates =(req,res)=>{
  const sql =`select 
  c.name as title,
  drive_date as start_date,
  drive_date as end_date,
  case when coalesce(jp.drive_status,0) = 0 then "Pending" else "Completed" end as status
  from remarks as r
  left join companies as c on c.id = r.companyId
  left join (
    select jp.* 
    from job_postings jp
    inner join (select companyId,max(id) as cid from job_postings group by companyId) as a on   jp.companyId = a.companyId and jp.id = a.cid
    ) as jp on jp.companyId = c.id 
where drive_date is not null`;
db.query(sql,(err,results)=>{
  if (err){
    console.log(err)
    return res.status(500).json({ err: err.message });
  }
  res.status(200).json(results);
})
}