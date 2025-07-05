const dotenv = require("dotenv");
dotenv.config();
const asyncHand = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const register = asyncHand(async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const q = "SELECT * FROM student_details where email_id = (?)";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user allready exist!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    const q = "INSERT INTO student_details (`email_id`,`pass`) VALUES (?)";
    const values = [email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
});

const form1 = (req, res) => {
  const { email } = req.params;
  const {
    firstname,
    middleName,
    lastName,
    tpoId,
    clgId,
    mobile,
    gender,
    dob,
    branch,
    ay,
    loc,
  } = req.body;
  const q =
    "SELECT * FROM student_details where tpo_id = (?) OR clg_id =(?) OR mobile=(?)";
  db.query(q, [tpoId, clgId, mobile], (err, data) => {
    if (err) return res.json(err);
    if (data.length)
      return res.status(409).json("tpoId or clgid or mobile all ready exist!");
    const q = `
    UPDATE student_details 
    SET 
      first_name = ?, 
      middle_name = ?, 
      last_name = ?, 
      tpo_id = ?, 
      clg_id = ?, 
      mobile = ?, 
      gender = ?, 
      dob = ?, 
      branch = ?, 
      degree = ?, 
      loc = ? 
    WHERE 
      email_id = ?
  `;
    const values = [
      firstname,
      middleName,
      lastName,
      tpoId,
      clgId,
      mobile,
      gender,
      dob,
      branch,
      ay,
      loc,
      email,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User form1 has been updated;");
    });
  });
};

const form2 = (req, res) => {
  const { email } = req.params;
  const {
   degreeCgpa, 
   degreePercentage,
   degreeYear,
   diplomaPercentage,
   diplomaYear,
   hscPercentage,
   hscYear,
   sscPercentage,
   sscYear,
  } = req.body;

  const parsedData = {
    ssc_per: parseFloat(sscPercentage),
    sscYear: parseInt(sscYear),
    hsc_per: isNaN(parseFloat(hscPercentage)) ? null : parseFloat(hscPercentage),
    hsc_year: isNaN(parseInt(hscYear)) ? null : parseInt(hscYear),
    diploma_per: isNaN(parseFloat(diplomaPercentage)) ? null : parseFloat(diplomaPercentage),
    diploma_year: isNaN(parseInt(diplomaYear)) ? null : parseInt(diplomaYear),
    degree_per: parseFloat(degreePercentage),
    degree_cgpa: parseInt(degreeCgpa),
    degree_year: parseInt(degreeYear),
  };
  
  const q = `
    UPDATE student_details 
    SET 
     ssc_per = ?,
     ssc_year = ?,
     hsc_per = ?,
     hsc_year = ?,
     diploma_per = ?,
     diploma_year = ?,
     degree_per = ?,
     degree_cgpa = ?,
     degree_year = ?
    WHERE 
      email_id = ?
  `;
  
  const values = [
    parsedData.ssc_per,
    parsedData.sscYear,
    parsedData.hsc_per,
    parsedData.hsc_year,
    parsedData.diploma_per,
    parsedData.diploma_year,
    parsedData.degree_per,
    parsedData.degree_cgpa,
    parsedData.degree_year,
    email,
  ];
  
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("User form2 has been updated;");
  });
};

const uploadFile = (req, res) => {
  const { email } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  if (!req.file.originalname.match(/\.(pdf|doc|docx)$/)) {
    res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};
    
  const filename = req.file.filename;

  console.log(email, filename);
  // Save the file information to your database (adjust this part based on your database schema)
  const sql = ` UPDATE student_details SET resume = ? where email_id = ? `;
  
  db.query(sql, [filename, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'PDF file uploaded and saved in database' });
  });
};

module.exports = {
  upload,
  form1,
  form2,
  uploadFile
};

// import dotenv from "dotenv";
// dotenv.config();
// import asyncHand from "express-async-handler";
// import bcrypt from "bcrypt";
// import { connection as db } from "../config/dbConfig.js";
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
//   },
// });


// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./uploads"); // Destination folder for uploaded files
// //   },
// //   filename: function (req, file, cb) {
// //     cb(
// //       null,
// //       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
// //     ); // File naming convention
// //   },
// // });


// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed'));
//   }
// };

// export const upload = multer({ storage: storage, fileFilter: fileFilter });

// export const register = asyncHand(async (req, res) => {
//   const email = req.body.email;
//   const pass = req.body.pass;
//   const q = "SELECT * FROM student_details where email_id = (?)";
//   db.query(q, [email], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) return res.status(409).json("user allready exist!");

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(pass, salt);

//     const q = "INSERT INTO student_details (`email_id`,`pass`) VALUES (?)";
//     const values = [email, hash];
//     db.query(q, [values], (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// });

// export const form1 = (req, res) => {
//   const { email } = req.params;
//   const {
//     firstname,
//     middleName,
//     lastName,
//     tpoId,
//     clgId,
//     mobile,
//     gender,
//     dob,
//     branch,
//     ay,
//     loc,
//   } = req.body;
//   const q =
//     "SELECT * FROM student_details where tpo_id = (?) OR clg_id =(?) OR mobile=(?)";
//   db.query(q, [tpoId, clgId, mobile], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length)
//       return res.status(409).json("tpoId or clgid or mobile all ready exist!");
//     const q = `
//     UPDATE student_details 
//     SET 
//       first_name = ?, 
//       middle_name = ?, 
//       last_name = ?, 
//       tpo_id = ?, 
//       clg_id = ?, 
//       mobile = ?, 
//       gender = ?, 
//       dob = ?, 
//       branch = ?, 
//       degree = ?, 
//       loc = ? 
//     WHERE 
//       email_id = ?
//   `;
//     const values = [
//       firstname,
//       middleName,
//       lastName,
//       tpoId,
//       clgId,
//       mobile,
//       gender,
//       dob,
//       branch,
//       ay,
//       loc,
//       email,
//     ];

//     db.query(q, values, (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User form1 has been updated;");
//     });
//   });
// };


// export const form2 = (req, res) => {
//   const { email } = req.params;
//   const {
//    degreeCgpa, 
//    degreePercentage,
//    degreeYear,
//    diplomaPercentage,
//    diplomaYear,
//    hscPercentage,
//    hscYear,
//    sscPercentage,
//    sscYear,
//   } = req.body;



  
//   const parsedData = {
//     ssc_per: parseFloat(sscPercentage),
//     sscYear: parseInt(sscYear),
//     hsc_per: isNaN(parseFloat(hscPercentage)) ? null : parseFloat(hscPercentage),
//     hsc_year: isNaN(parseInt(hscYear)) ? null : parseInt(hscYear),
//     diploma_per: isNaN(parseFloat(diplomaPercentage)) ? null : parseFloat(diplomaPercentage),
//     diploma_year: isNaN(parseInt(diplomaYear)) ? null : parseInt(diplomaYear),
//     degree_per: parseFloat(degreePercentage),
//     degree_cgpa: parseInt(degreeCgpa),
//     degree_year: parseInt(degreeYear),
//   };
//     const q = `
//     UPDATE student_details 
//     SET 
//      ssc_per = ?,
//      ssc_year = ?,
//      hsc_per = ?,
//      hsc_year = ?,
//      diploma_per = ?,
//      diploma_year = ?,
//      degree_per = ?,
//      degree_cgpa = ?,
//      degree_year = ?
//     WHERE 
//       email_id = ?
//   `;
//   const values = [
//     parsedData.ssc_per,
//     parsedData.sscYear,
//     parsedData.hsc_per,
//     parsedData.hsc_year,
//     parsedData.diploma_per,
//     parsedData.diploma_year,
//     parsedData.degree_per,
//     parsedData.degree_cgpa,
//     parsedData.degree_year,
//     email,
//   ];
//     db.query(q, values, (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User form2 has been updated;");
//     });
 
// };



// export const uploadFile = (req, res) => {
//   const { email } = req.params;


//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }
//   if (!req.file.originalname.match(/\.(pdf|doc|docx)$/)) {
//     res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};


    
//     const filename = req.file.filename;

//  console.log(email,filename)
//   // Save the file information to your database (adjust this part based on your database schema)
//   const sql = ` UPDATE  student_details  SET  resume = ? where email_id=? `;
 
//   db.query(sql, [filename, email], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'PDF file uploaded and saved in database' });
//   });
// };