// import { connection as db } from "../config/dbConfig.js";
const sequelize = require('../config/config');
// const { connection: db } = require('../config/dbConfig');
const db = require('../config/dbConfig');
const { updateCompany } = require('./companyController');

// export const driveresult = (req,res)=>{

//         const query = `SELECT 
//     CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
//     s.tpo_id as student_id,
//     s.clg_id,
//     s.mobile,
//     s.branch,
//     d.round1,
//     d.round2,
//     d.round3,
//     d.round4,
//     d.placedStudent,
//     c.name AS company_name,
//     c.id AS company_id,
//     j.id AS job_posting_id
// FROM 
//     student_details AS s
// INNER JOIN 
//     drive_status AS d ON s.id = d.s_id
// INNER JOIN 
//     job_postings AS j ON d.p_id = j.id
// INNER JOIN 
//     companies AS c ON j.companyId = c.id`;
//         db.query(query, (error, results) => {
//           if (error) {
//             return res.status(500).json({ error: error.message });
//           }
//           res.json(results);
//         });

// }


const selecteddrive = (req,res)=>{
   
    const jid=req.params.companyId;
    const query = `SELECT 
    CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
    d.id AS driveid,
    s.tpo_id,
    s.clg_id,
    s.mobile,
    s.branch,
    d.round1,
    d.round2,
    d.round3,
    d.round4,
    d.placedStudent,
    c.name AS company_name,
    c.id AS company_id,
    j.id AS job_posting_id
FROM 
    student_details AS s
INNER JOIN 
    drive_status AS d ON s.id = d.s_id
INNER JOIN 
    job_postings AS j ON d.p_id = j.id
INNER JOIN 
    companies AS c ON j.companyId = c.id
WHERE  
    d.round1 = 1 AND j.id = ?`;
    db.query(query,jid,(error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });



}


const selectedcompanylist = (req,res)=>{
  // const  cname=req.body.cname;
  // const  academic_year=req.body.academic_year;
  // const  visited =req.body.visited;
  //const query = `select j.id, c.name,c.academic_year,c.visited,j.job_description from job_postings as j inner join companies as c on j.companyId = c.id WHERE c.name = ? and c.academic_year = ? and c.visited = ?;`;
  const query = `select j.id, c.name,c.academic_year,c.visited,j.job_description from job_postings as j inner join companies as c on j.companyId = c.id`;
  //const values =[ cname,academic_year,visited]
    db.query(query,(error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });
}

// export const companylist = (req,res)=>{
//    const query = `select j.id, c.name ,c.academic_year,c.visited,j.job_description from job_postings as j inner join companies as c on j.companyId = c.id`;
//       db.query(query, (error, results) => {
//         if (error) {
//           return res.status(500).json({ error: error.message });
//         }
//         res.json(results);
//       });
  
//   }


const companyname = (req,res)=>{
    const query = `SELECT DISTINCT name FROM companies;`;
       db.query(query, (error, results) => {
         if (error) {
           return res.status(500).json({ error: error.message });
         }
         res.status(200).json(results);
       });
   
   }

const companyacyear = (req,res)=>{
    const query = `SELECT DISTINCT academic_year FROM companies;`;
       db.query(query, (error, results) => {
         if (error) {
           return res.status(500).json({ error: error.message });
         }
         res.status(200).json(results);
       });
   
   }

const companyvisited = (req,res)=>{
    const query = `SELECT DISTINCT visited FROM companies;`;
       db.query(query, (error, results) => {
         if (error) {
           return res.status(500).json({ error: error.message });
         }
         res.status(200).json(results);
       });
   
   }

const driveresultround2 = (req,res)=>{
  const jid=req.params.companyId;
    const query = `SELECT 
    CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
    d.id as driveid,
    s.tpo_id,
    s.clg_id,
    s.mobile,
    s.branch,
    d.round1,
    d.round2,
    d.round3,
    d.round4,
    d.placedStudent,
    c.name AS company_name,
    c.id AS company_id,
    j.id AS job_posting_id
    FROM 
    student_details AS s
    INNER JOIN 
    drive_status AS d ON s.id = d.s_id
    INNER JOIN 
    job_postings AS j ON d.p_id = j.id
    INNER JOIN  
companies AS c ON j.companyId = c.id where round2=1 and j.id=? `; // `;
    db.query(query,jid, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });

}


const driveresultround3 = (req,res)=>{
  const jid=req.params.companyId;
    const query = `SELECT CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
    d.id as driveid,
    s.tpo_id,
    s.clg_id,
    s.mobile,
    s.branch,
    d.round1,
    d.round2,
    d.round3,
    d.round4,
    d.placedStudent,
    c.name AS company_name,
    c.id AS company_id,
    j.id AS job_posting_id
    FROM 
    student_details AS s
    INNER JOIN 
    drive_status AS d ON s.id = d.s_id
    INNER JOIN 
    job_postings AS j ON d.p_id = j.id
    INNER JOIN  
    companies AS c ON j.companyId = c.id where round3=1 and j.id=?`;// and j.id=?`;
    db.query(query,jid, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });

}

const driveresultround4 = (req,res)=>{
  const jid=req.params.companyId;
    const query = `SELECT 
CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
d.id as driveid,
s.tpo_id,
s.clg_id,
s.mobile,
s.branch,
d.round1,
d.round2,
d.round3,
d.round4,
d.placedStudent,
c.name AS company_name,
c.id AS company_id,
j.id AS job_posting_id
FROM 
student_details AS s
INNER JOIN 
drive_status AS d ON s.id = d.s_id
INNER JOIN 
job_postings AS j ON d.p_id = j.id
INNER JOIN  
companies AS c ON j.companyId = c.id where round4=1 and j.id = ?`;// and  j.id = ?`;
    db.query(query,jid, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });

}

const driveresultplaced = (req,res)=>{
    const id = req.params.companyId;
    const query = `SELECT 
    CONCAT(s.first_name, " ", s.middle_name, " ", s.last_name) AS full_name,
    d.id as driveid,
    s.tpo_id,
    s.clg_id,
    s.mobile,
    s.branch,
    d.round1,
    d.round2,
    d.round3,
    d.round4,
    d.placedStudent,
    c.name AS company_name,
    c.id AS company_id,
    j.id AS job_posting_id
    FROM 
    student_details AS s
    INNER JOIN 
    drive_status AS d ON s.id = d.s_id
    INNER JOIN 
    job_postings AS j ON d.p_id = j.id
    INNER JOIN  
    companies AS c ON j.companyId = c.id where placedStudent=1 and j.id = ? `;// and j.id = ?`;
    db.query(query,id, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });

}


const update = (req,res) => {
    const id = req.params.id;
    const { round } = req.body; // round can be 1, 2, 3, or 4
    let updateQuery = '';
  
    switch(round) {
      case 1:
        updateQuery = 'UPDATE drive_status SET round1 = 1, round2 = 0, round3 = 0, round4 = 0 WHERE id = ?';
        break;
      case 2:
        updateQuery = 'UPDATE drive_status SET round1 = 1, round2 = 1, round3 = 0, round4 = 0 WHERE id = ?';
        break;
      case 3:
        updateQuery = 'UPDATE drive_status SET round1 = 1, round2 = 1, round3 = 1, round4 = 0 WHERE id = ?';
        break;
      case 4:
        updateQuery = 'UPDATE drive_status SET round1 = 1, round2 = 1, round3 = 1, round4 = 1 WHERE id = ?';
        break;
      default:
        res.status(400).json({ error: 'Invalid round value' });
        return;
    }
    db.query(updateQuery, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error updating round statuses' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'No student found with the provided id' });
        return;
      }
      res.status(200).json({ message: 'Round statuses updated successfully' });
    });
  };



const updateplaced = (req,res) => {
    const id = req.params.id;
    const { placed_students } = req.body;
    const sql = 'UPDATE drive_status SET placedStudent = 1 WHERE id IN (?)';
    //console.log(req.body,"data added to placed students");
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error updating placed statuses' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'No student found with the provided id' });
        return;
      }
      res.status(200).json({ message: 'Placed statuses updated successfully' });
    }); 
  };


const deleteplaced = (req,res) => {
    const id = req.params.id;
    const { placed_students } = req.body;
    const sql = 'UPDATE drive_status SET placedStudent = 0 WHERE id IN (?)';
    //console.log(req.body,"data added to placed students");
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error updating placed statuses' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'No student found with the provided id' });
        return;
      }
      res.status(200).json({ message: 'Placed statuses updated successfully' });
    }); 
  };


 const driveround2ids = (req, res) => {
    const jid=req.params.companyId;
    const query = 'SELECT id as driveid FROM drive_status WHERE round2 = 1 and p_id=?';
    db.query(query,jid, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }
      console.log("Result Round 2:",results)
      res.json(results);
    });
  };

const driveround3ids = (req, res) => {
    const jid=req.params.companyId;
    const query = 'SELECT id as driveid FROM drive_status WHERE round3 = 1 and p_id=?';
    db.query(query,jid, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }
      res.json(results);
    });
  };

const driveround4ids = (req, res) => {
    const jid=req.params.companyId;
    const query = 'SELECT id as driveid FROM drive_status WHERE round4 = 1 and p_id=?';
    db.query(query,jid, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }
      res.json(results);
    });
  };

const driveplacedids = (req, res) => {
    const jid=req.params.companyId;
    const query = 'SELECT id as driveid FROM drive_status WHERE placedStudent = 1 and p_id=?';
    db.query(query,jid, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }
      res.json(results);
    });
  };


  const updateStatus = (req,res) => {
    const id = req.params.id;
    
    console.log(id)
    db.query("update job_postings set drive_status = 1 where id = ?", [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error updating round statuses' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Something Went Wronge' });
        return;
      }
      res.status(200).json({ message: 'Statuses updated successfully' });
    });
  };

  const manualStudentAdd = (req,res)=>{
    const {jobPostingId}=req.params;

    const query = `select 
      clg_id,
      concat(first_name," ",last_name) as name, 
      branch 
      from student_details 
      where trim(degree_year) in (select batch from current_batch)
      and id not in (select s_id from drive_status where p_id = ?)
    `;

    const query1 = `select 
      clg_id,
      concat(first_name," ",last_name) as name, 
      branch 
      from student_details 
      where trim(degree_year) in (select batch from current_batch)
      and id in (select s_id from drive_status where p_id = ?)
    `;
    db.query(query,[jobPostingId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }
      db.query(query1,[jobPostingId], (err, results1) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Error retrieving students' });
          return;
        }
        res.json({left:results,right:results1});
        return res.end();
      });
      
    });
  }

  const manualStudentAddPost = (req,res)=>{
    const {jobPostingId}=req.params;
    const {studentList} = req.body;

    if (!Array.isArray(studentList) || studentList.length === 0) {
      return res.status(400).json({ error: "Invalid or empty student list provided" });
    }

    const data_to = studentList.map(id => `"${id.trim()}"`).join(',').trim();

    const query = `
    insert into drive_status (s_id,p_id,round1) 
    select 
      id as s_id,
      ? as p_id, 
      1 as round1
    from student_details 
    where trim(clg_id) in (${data_to}) and 
    id not in (select s_id from drive_status where p_id = ?)
      `;
    db.query(query,[Number(jobPostingId),Number(jobPostingId)], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        console.log(err);
        res.status(500).json({ error: 'Error retrieving students' });
        return;
      }else{
        console.log('Done',results);
        res.status(200).json({message:"Success"});
        return res.end();
      }
    });
  }

  module.exports = {
    selecteddrive,
    selectedcompanylist,
    companyname,
    companyacyear,
    companyvisited,
    driveresultplaced,
    driveresultround2,
    driveresultround3,
    driveresultround4,
    driveround2ids,
    driveround3ids,
    driveround4ids,
    driveplacedids,
    update,
    updateplaced,
    updateCompany,
    deleteplaced,
    updateStatus,
    manualStudentAdd,
    manualStudentAddPost
  }