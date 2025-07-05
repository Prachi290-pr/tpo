// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();
// import bcrypt from 'bcrypt';
const bcrypt = require('bcryptjs');
// import { StudentDetail } from '../models/studentDetailSchema.js';
const StudentDetail = require('../models/studentDetailSchema.js');  
const db = require("../config/dbConfig.js")
// import upload from '../config/multerConfig';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resume/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

exports.upload = multer({ storage: storage, fileFilter: fileFilter }).single('resume');
// export const upload = upload.

// Register a new user
exports.register = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const existingUser = await StudentDetail.findOne({ where: { email_id: email } });
    if (existingUser) {
      return res.status(409).json('User already exists!');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    await StudentDetail.create({ email_id: email, pass: hash });
    return res.status(201).json({"message": "User has been created"});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update form1 details
// exports.form1 = async (req, res) => {
//   const { email } = req.params;
//   const {
//     firstname, middleName, lastName, tpoId, clgId, mobile, gender, dob, branch, ay, loc
//   } = req.body;
//   try {
//     const existingUser = await StudentDetail.findOne({
//       where: { tpo_id: tpoId, clg_id: clgId, mobile: mobile }
//     });

//     if (existingUser) {
//       return res.status(409).json('TPO ID, College ID or Mobile already exists!');
//     }

//     await StudentDetail.update(
//       {
//         first_name: firstname, middle_name: middleName, last_name: lastName, tpo_id: tpoId, clg_id: clgId,
//         mobile: mobile, gender: gender, dob: dob, branch: branch, degree: ay, loc: loc,
//       },
//       { where: { email_id: email } }
//     );

//     return res.status(200).json({"message": 'User form1 has been updated'});
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

exports.form1 = async (req, res) => {
  const { email } = req.params;
  const {
    firstname,
    middleName,
    lastName,
    clgId,
    mobile,
    gender,
    dob,
    branch,
    ay,
    loc,
  } = req.body;

  try {
    const existingStudent = await StudentDetail.findOne({
      where: {
        [Op.or]: [
          { clg_id: clgId },
          { mobile: mobile }
        ],
        email_id: {
          [Op.ne]: email
        }
      }
    });

    if (existingStudent) {
      return res.status(409).json("clgId or mobile already exists for a different email!");
    }

    await StudentDetail.update({
      first_name: firstname,
      middle_name: middleName,
      last_name: lastName,
      clg_id: clgId,
      mobile: mobile,
      gender: gender,
      dob: dob,
      branch: branch,
      degree: ay,
      loc: loc
    }, {
      where: {
        email_id: email
      }
    });

    return res.status(200).json("User form1 has been updated.");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


// Update form2 details
exports.form2 = async (req, res) => {
  const { email } = req.params;
  const {
    ssc_per,
    ssc_year,
    hsc_per, 
    hsc_year,  
    diploma_per, 
    diploma_year, 
    degree_per, 
    degree_cgpa, 
    degree_year, 
  } = req.body;
  try {
    const parsedData = {
      ssc_per: parseFloat(ssc_per),
      ssc_year: parseInt(ssc_year),
      hsc_per: isNaN(parseFloat(hsc_per)) ? null : parseFloat(hsc_per),
      hsc_year: isNaN(parseInt(hsc_year)) ? null : parseInt(hsc_year),
      diploma_per: isNaN(parseFloat(diploma_per)) ? null : parseFloat(diploma_per),
      diploma_year: isNaN(parseInt(diploma_year)) ? null : parseInt(diploma_year),
      degree_per: parseFloat(degree_per),
      degree_cgpa: parseInt(degree_cgpa),
      degree_year: parseInt(degree_year),
    };

    await StudentDetail.update(
      parsedData,
      { where: { email_id: email } }
    );

    return res.status(200).json({"message": 'User form2 has been updated'});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  const { email } = req.params;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!req.file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return res.status(400).json({ message: 'Only PDF files are allowed!' });
    }

    const filename = req.file.filename;

    await StudentDetail.update(
      { resume: filename },
      { where: { email_id: email } }
    );

    return res.status(200).json({ message: 'PDF file uploaded and saved in database' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const allStudents = await StudentDetail.findAll();
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await StudentDetail.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.stud_details = (req, res) => {
  const { email } = req.params;
  const query = `select * from student_details where id = ?;`;
  db.query(query, email, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

exports.getdata = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year,interested_in, resume FROM student_details where id = ?`;
  db.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

exports.getemail = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, email_id from student_details where id = ?`;
  db.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};


exports.getAllStudentsFOrEligible = (req,res) =>{
  db.query(`
   select 
      clg_id, 
      concat(first_name,' ',last_name) as name,
      branch
    from student_details
    where trim(degree_year) in (select batch from current_batch) and
    trim(clg_id) not in (select trim(stud_clg_id) from eligible_students_for_drive)
    ;
  `,(err,data)=>{
    if(err) console.log(err);
    db.query(`
        select 
          clg_id, 
          concat(first_name,' ',last_name) as name,
          branch
        from student_details
        where trim(degree_year) in (select batch from current_batch) and
        trim(clg_id) in (select trim(stud_clg_id) from eligible_students_for_drive) 
      `,(err,data2)=>{
        if(err) console.log(err);
        return res.json({AvailableStudents:data,eligible:data2});
        
      })
  })
}

exports.addStudentsTooeligible = (req, res) => {
  const { studentIds } = req.body;
  console.log(studentIds);

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ message: 'No student IDs provided' });
  }

  db.query('BEGIN', (err) => {
    if (err) {
      console.error('BEGIN failed:', err);
      db.query('ROLLBACK', () => {
        res.status(500).json({ message: 'Transaction begin failed' });
      });
      return;
    }

    const insertQuery = `
      INSERT INTO eligible_students_for_drive (stud_clg_id)
      VALUES (?)
    `;

    let completed = 0;
    let hasError = false;

    studentIds.forEach((studentId, index) => {
      if (hasError) return;

      db.query(insertQuery, [studentId], (err) => {
        if (err) {
          hasError = true;
          console.error('Insert failed for studentId:', studentId, err);
          db.query('ROLLBACK', () => {
            res.status(500).json({ message: 'Insert failed, transaction rolled back' });
          });
          return;
        }

        completed++;

        if (completed === studentIds.length) {
          db.query('COMMIT', (err) => {
            if (err) {
              console.error('COMMIT failed:', err);
              db.query('ROLLBACK', () => {
                res.status(500).json({ message: 'Commit failed, transaction rolled back' });
              });
              return;
            }

            res.json({
              message: `Successfully added ${studentIds.length} student(s) to eligible list`,
              studentIds
            });
          });
        }
      });
    });
  });
};


exports.deleteStudentsTooeligible = (req, res) => {
  const { studentIds } = req.body;
  console.log(studentIds);

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ message: 'No student IDs provided' });
  }

  db.query('BEGIN', (err) => {
    if (err) {
      console.error('BEGIN failed:', err);
      db.query('ROLLBACK', () => {
        res.status(500).json({ message: 'Transaction begin failed' });
      });
      return;
    }

    const insertQuery = `
      delete from eligible_students_for_drive where stud_clg_id = ?
    `;

    let completed = 0;
    let hasError = false;

    studentIds.forEach((studentId, index) => {
      if (hasError) return;

      db.query(insertQuery, [studentId], (err) => {
        if (err) {
          hasError = true;
          console.error('Insert failed for studentId:', studentId, err);
          db.query('ROLLBACK', () => {
            res.status(500).json({ message: 'Insert failed, transaction rolled back' });
          });
          return;
        }

        completed++;

        if (completed === studentIds.length) {
          db.query('COMMIT', (err) => {
            if (err) {
              console.error('COMMIT failed:', err);
              db.query('ROLLBACK', () => {
                res.status(500).json({ message: 'Commit failed, transaction rolled back' });
              });
              return;
            }

            res.json({
              message: `Successfully added ${studentIds.length} student(s) to eligible list`,
              studentIds
            });
          });
        }
      });
    });
  });
};