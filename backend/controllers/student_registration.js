const dotenv = require("dotenv");
dotenv.config();
const asyncHand = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require('../config/dbConfig');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads"); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     ); // File naming convention
//   },
// });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const register = asyncHand(async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const q = "SELECT * FROM student_details where email_id = (?)";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exist!");

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
//       return res.status(409).json("tpoId or clgid or mobile already exist!");
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

const form1 = (req, res) => {
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
  // console.log(req.body);
  // First query to check if there are any conflicting records
  const checkQuery = `
    SELECT * FROM student_details 
    WHERE (  clg_id = ? OR mobile = ?) 
    AND email_id != ?
  `;
  db.query(checkQuery, [clgId, mobile, email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res
        .status(409)
        .json("clgId, or mobile already exists for a different email!");
    }

    // Proceed with the update if no conflicts are found
    const updateQuery = `
      UPDATE student_details 
      SET 
        first_name = ?, 
        middle_name = ?, 
        last_name = ?, 
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
      clgId,
      mobile,
      gender,
      dob,
      branch,
      ay,
      loc,
      email,
    ];

    db.query(updateQuery, values, (err, data) => {
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
    interested
  } = req.body;

  const parsedData = {
    ssc_per: parseFloat(sscPercentage),
    sscYear: parseInt(sscYear),
    hsc_per: isNaN(parseFloat(hscPercentage))
      ? null
      : parseFloat(hscPercentage),
    hsc_year: isNaN(parseInt(hscYear)) ? null : parseInt(hscYear),
    diploma_per: isNaN(parseFloat(diplomaPercentage))
      ? null
      : parseFloat(diplomaPercentage),
    diploma_year: isNaN(parseInt(diplomaYear)) ? null : parseInt(diplomaYear),
    degree_per: parseFloat(degreePercentage),
    degree_cgpa: parseFloat(degreeCgpa),
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
     degree_year = ?,
     interested_in = ?
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
    interested,
    email
 
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("User form2 has been updated;");
  });
};

const uploadFile = (req, res) => {
  const { email } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  if (!req.file.originalname.match(/\.(pdf|doc|docx)$/)) {
    res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
  }

  const filename = req.file.filename;

  // console.log(email, filename);
  // Save the file information to your database (adjust this part based on your database schema)
  const sql = ` UPDATE  student_details  SET  resume = ? where email_id=? `;

  db.query(sql, [filename, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(200)
      .json({ message: "PDF file uploaded and saved in database" });
  });
};

const stud_details = (req, res) => {
  const { email } = req.params;
  const query = `select * from student_details where id = ?;`;
  db.query(query, email, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const getdata = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, email_id, first_name, middle_name, last_name, clg_id, mobile, gender, dob, branch, degree, loc, ssc_per, ssc_year, hsc_per, hsc_year, diploma_per, diploma_year, degree_per, degree_cgpa, degree_year,interested_in, resume FROM student_details where id = ?`;
  db.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const getemail = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, email_id from student_details where id = ?`;
  db.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

module.exports = {
  upload,
  register,
  form1,
  form2,
  uploadFile,
  stud_details,
  getdata,
  getemail
};
