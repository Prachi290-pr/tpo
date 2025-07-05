const bcrypt = require('bcrypt');
const connection = require('../../config/dbConfig'); // Adjust the path accordingly
const asyncHandler = require('express-async-handler'); // If not installed, run `npm install express-async-handler`
const StudentDetail = require("../../models/studentDetailSchema");
const {Op} = require('sequelize');
const db = require('../../config/dbConfig');

const getAcademicYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Academic year starts in the middle of the year (e.g., August)
  const startMonth = 6; // August (0-indexed, so 7 is August)

  if (currentMonth >= startMonth) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};

const register = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
 const year = getAcademicYear();
  const q = "SELECT * FROM student_details where email_id = (?)";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user allready exist!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    const q = "INSERT INTO student_details (email_id,pass,ac_yr) VALUES (?)";
    const values = [email, hash,year];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
});

// const register = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const pass = req.body.pass;
//   console.log("Reg Data:", req.body);

//   const selectQuery = "SELECT * FROM student_details WHERE email_id = ?";
//   connection.query(selectQuery, [email], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) return res.status(409).json("User already exists!");

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(pass, salt);

//     const insertQuery = "INSERT INTO student_details (email_id, pass) VALUES (?, ?)";
//     connection.query(insertQuery, [email, hash], (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// });

const form1 = async (req, res) => {
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

  const specialChars = /[^A-Za-z0-9]/;

  if (specialChars.test(clgId.trim())) {
    return res.status(409).json("Invalid College Id");
  }

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
      first_name: String(firstname).toUpperCase(),
      middle_name: String(middleName).toUpperCase(),
      last_name: String(lastName).toUpperCase(),
      clg_id: String(clgId).toUpperCase(),
      mobile: String(mobile).toUpperCase(),
      gender: String(gender).toUpperCase(),
      dob: String(dob).toUpperCase(),
      branch: String(branch).toUpperCase(),
      degree: String(ay).toUpperCase(),
      loc: String(loc).toUpperCase()
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

// const form1 =asyncHandler(async (req, res) => {
//     const { email } = req.params;
//     console.log(req.body);
//     const {
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
//     } = req.body;
//     const q =
//       "SELECT * FROM student_details where tpo_id = (?) OR clg_id =(?) OR mobile=(?)";
//     connection.query(q, [tpoId, clgId, mobile], (err, data) => {
//       if (err) return res.json(err);
//       if (data.length)
//         return res.status(409).json("tpoId or clgid or mobile all ready exist!");
//       const q = `
//       UPDATE student_details 
//       SET 
//         first_name = ?, 
//         middle_name = ?, 
//         last_name = ?, 
//         tpo_id = ?, 
//         clg_id = ?, 
//         mobile = ?, 
//         gender = ?, 
//         dob = ?, 
//         branch = ?, 
//         degree = ?, 
//         loc = ? 
//       WHERE 
//         email_id = ?
//     `;
//       const values = [
//         firstname,
//         middleName,
//         lastName,
//         tpoId,
//         clgId,
//         mobile,
//         gender,
//         dob,
//         branch,
//         ay,
//         loc,
//         email,
//       ];
  
//       connection.query(q, values, (err, data) => {
//         if (err) return res.json(err);
//         return res.status(200).json("User form1 has been updated;");
//       });
//     });
//   });

  const form2 =asyncHandler(async (req, res) => {
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
     interested,
    } = req.body;
  
    const parsedData = {
      ssc_per: parseFloat(sscPercentage),
      sscYear: parseInt(sscYear),
      hsc_per: isNaN(parseFloat(hscPercentage)) ? null : parseFloat(hscPercentage),
      hsc_year: isNaN(parseInt(hscYear)) ? null : parseInt(hscYear),
      diploma_per: isNaN(parseFloat(diplomaPercentage)) ? null : parseFloat(diplomaPercentage),
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
      email,
    ];
    
    connection.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User form2 has been updated;");
    });


  })


  const uploadFile =asyncHandler(async (req, res) => {
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
    
    connection.query(sql, [filename, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'PDF file uploaded and saved in database' });
    });
  });



  const registerStudent = asyncHandler((req, res) => {
    const { studentId, companyId } = req.body;
    console.log('Received data:', { studentId, companyId });
  
    const checkQuery = `SELECT * FROM drive_status WHERE s_id = ? AND p_id = ?`;
    connection.query(checkQuery, [studentId, companyId], (checkError, rows) => {
      if (checkError) {
        console.error('Error checking existing registrations:', checkError);
        return res.status(500).json({ error: 'Error checking existing registrations.' });
      }
  
      if (rows.length > 0) {
        // Entry already exists
        return res.status(400).json({ error: 'Already registered for this company.' });
      }
  
      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          console.error('Transaction error: ', transactionError);
          return res.status(500).json({ error: 'Error starting transaction.' });
        }
  
        const insertQuery = `INSERT INTO drive_status (s_id, p_id, round1) VALUES (?, ?, 1)`;
        connection.query(insertQuery, [studentId, companyId], (insertError, result) => {
          if (insertError) {
            return connection.rollback(() => {
              console.error('Transaction error: ', insertError);
              res.status(500).json({ error: 'Error inserting round record.' });
            });
          }
  
          connection.commit((commitError) => {
            if (commitError) {
              return connection.rollback(() => {
                console.error('Transaction commit error: ', commitError);
                res.status(500).json({ error: 'Error committing transaction.' });
              });
            }
  
            res.status(200).json({ message: 'Registered successfully!' });
          });
        });
      });
    });
  });
  
module.exports = { register,form1,form2,uploadFile,registerStudent };
