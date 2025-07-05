const JobPosting = require('../models/jobPostingSchema');
const Questions = require('../models/questionSchema');
const Company = require('../models/companySchema');
const QuestionController = require("./questionController");
const sequelize = require('../config/config');
const connection = require('../config/dbConfig');
const multer = require('multer');
const path = require('path');
const { transporter } = require('../config/mailConfig');
const IntershipPost = require('../models/intershipPost');
const IntershipQuestions = require('../models/intershipQuetions');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/docs/');
  },
  filename: function (req, file, cb) {
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
// const upload = multer({ storage: storage });

exports.upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: 'docs1', maxCount: 1 },
  { name: 'docs2', maxCount: 1 },
  { name: 'docs3', maxCount: 1 }
  // { name: 'docs', maxCount: 1 },
]);

exports.getAllJobPostings = async (req, res) => {
  try {
    const query = `
      SELECT 
        jp.*, 
        c.*
      FROM job_postings jp
      JOIN companies c ON jp.companyId = c.id
    `;
    const [results] = await sequelize.query(query);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { question, data_type, response, remarkId, companyId } = req.body;

  try {
    const newQuestion = await Questions.create({
      question,
      data_type,
      response,
      remarkId,
      companyId,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

exports.createJobPosting = async (req, res) => {
  const newJobPosting = req.body;
  console.log("Job Posting:", req.body);

  let { company_type,companyId, remarkId, job_description, package_details, roles, criteria_10th, criteria_12th, deg_criteria, diploma_criteria, eligible_branches, tracker, questions, deadline, batch_date,extLink,salad_id,onoff,send_mail  } = req.body;
  let docs1 = null;
  let docs2 = null;
  let docs3 = null;

  // console.log("Testing for deadline",deadline);

  if(salad_id==""){
    salad_id = 0;
  }

  // Check if file exists
  console.log("Files",req.file);
  console.log("File",req.files);
  if (req.files['docs1']) {
    docs1 = req.files['docs1'][0].filename;
  }

  if (req.files['docs2']) {
    docs2 = req.files['docs2'][0].filename;
  }
  if (req.files['docs3']) {
    docs3 = req.files['docs3'][0].filename;
  }
  console.log(questions);

  if (tracker == 'yes' && questions.length > 0) {
    try {
      questions = JSON.parse(questions);
    } catch (error) {
      console.log("Questions parsing error:", error);
      return res.status(400).json({ message: 'Invalid format for questions' });
    }

    if (!Array.isArray(questions)) {
      questions = [];
    }
  }

  try {
    const jobPosting = await JobPosting.create({
      companyId: companyId,
      remarkId: remarkId,
      job_description: job_description,
      package_details: package_details,
      roles: roles,
      criteria_10th: criteria_10th,
      criteria_12th: criteria_12th,
      deg_criteria: deg_criteria,
      diploma_criteria: diploma_criteria,
      eligible_branches: eligible_branches,
      docs: docs1, 
      docs2: docs2, 
      docs3: docs3, 
      tracker: tracker,
      deadline: deadline,
      batch_date: batch_date,
      extLink:extLink=='null'?null:extLink,
      salad_id:salad_id,
      onoff:onoff,
      company_type:company_type
    });

    if (tracker === 'yes' && questions.length > 0) {
      const createdQuestion = await Questions.create({
        question: questions,
        // data_type: 'text',
        companyId: jobPosting.id,
      });
      console.log(createdQuestion);
    }

    if(send_mail==true || send_mail=='true'){
      let query_for_mail = `
    SELECT 
      count(sd.clg_id) as count,
      group_concat(sd.email_id) as emails
    FROM 
      student_details sd
    left join (
          select max(salad_id) as salad_id,s_id,first_name from drive_status as ds
          left join job_postings as jp on ds.p_id = jp.id
          left join companies as c on jp.companyId = c.id
          left join student_details as sd on ds.s_id = sd.id
          where placedStudent = 1
          group by ds.s_id,first_name
    ) as plac on plac.s_id = sd.id
    WHERE 
      sd.ssc_per >= ?
          AND (sd.hsc_per >= ? OR sd.diploma_per >= ?)
          AND sd.degree_cgpa >= ?
          And sd.interested_in = 'Placement' and
      sd.isblacklisted = 0 and 
      (? > coalesce(plac.salad_id,-1) or plac.salad_id is null ) 
      and instr(trim(?),trim(sd.degree_year))
    `
    connection.query(query_for_mail,[criteria_10th,criteria_12th,diploma_criteria,deg_criteria,salad_id,batch_date],async(err,email_data)=>{
      if(err){
        console.log(err);
        return res.status(201).json({ message: "Successful But mail has been not sent" });
      }else{
        // console.log(email_data[0].emails);
        try{
          
          for(let i=0;i<=email_data.length;i=i+90){
            
            let emailArray = email_data.map(item => item.emails);
            let emailString = emailArray.splice(i,i+90).join(', ');
            
          const mailOptions = {
            from: 'technologies.getfly@gmail.com',
            to: 'tpo@pvppcoe.ac.in',
            cc:"technologies.getfly@gmail.com, tpo@pvppcoe.ac.in",
            bcc:emailString, 
            subject: 'New Job Alert',
            text: `
            `,
            html:`
            <!DOCTYPE html>
            <html lang="en">
    
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Job Post</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f9fafb;
                  margin: 0;
                  padding: 0;
                }
    
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
    
                .heading {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 20px;
                }
    
                .content {
                  font-size: 12px;
                  color: #4b5563;
                  line-height: 1.5;
                }
    
                .content p {
                  margin-bottom: 10px;
                }
    
                .strong {
                  font-weight: bold;
                  color: #1f2937;
                }
    
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #2563eb;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  margin-top: 20px;
                }
    
                .button:hover {
                  background-color: #1d4ed8;
                }
              </style>
            </head>
    
            <body>
              <div class="container">
                <div class="heading">New Job Posting</div>
                <div class="content">
                  <p>${job_description}</p>
    
                  <p><span class="strong">10th Criteria:</span> ${criteria_10th} %</p>
                  <p><span class="strong">12th Criteria:</span> ${criteria_12th} %</p>
                  <p><span class="strong">Diploma Criteria:</span> ${diploma_criteria} %</p>
                  <p><span class="strong">Degree Criteria:</span> ${deg_criteria} CGPA</p>
                  <p><span class="strong">CTC:</span> ${package_details} LPA</p>
                  <p><span class="strong">Deadline To Register:</span> ${new Date(deadline)}</p>
                  <br>
                  <br>
                  <p>Visit Tpo Portal to apply for the above drive</p>
                </div>
              </div>
            </body>
            </html>
            `
          };
        
          await transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              }
              console.log('Email sent: ' + info.response);
              res.status(201).json({ message: `Successful Email has been sent to ${email_data[0].count}`});
              return res.end();
          });

        }
        setTimeout(()=>{
          res.status(200).json("Announcement inserted");
          return res.end();
        },3000)

        }
        catch(err){
          console.log(err);
        }
      
      }
    })
    }
    else{
      res.status(201).json({ message: `Successful`});
      return res.end();
    }    
    
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.intershipcreateJobPosting = async (req, res) => {
  const newJobPosting = req.body;
  console.log("Job Posting:", req.body);

  let { companyId, remarkId, job_description, package_details, roles, criteria_10th, criteria_12th, deg_criteria, diploma_criteria, eligible_branches, tracker, questions, deadline, batch_date,extLink  } = req.body;
  let docs1 = null;
  let docs2 = null;
  let docs3 = null;

 
  // Check if file exists
  console.log("Files",req.file);
  console.log("File",req.files);
  if (req.files['docs1']) {
    docs1 = req.files['docs1'][0].filename;
  }

  if (req.files['docs2']) {
    docs2 = req.files['docs2'][0].filename;
  }
  if (req.files['docs3']) {
    docs3 = req.files['docs3'][0].filename;
  }
  console.log(questions);

  if (tracker == 'yes' && questions.length > 0) {
    try {
      questions = JSON.parse(questions);
    } catch (error) {
      console.log("Questions parsing error:", error);
      return res.status(400).json({ message: 'Invalid format for questions' });
    }

    if (!Array.isArray(questions)) {
      questions = [];
    }
  }

  try {
    const jobPosting = await IntershipPost.create({
      companyId: companyId,
      remarkId: remarkId,
      job_description: job_description,
      package_details: package_details,
      roles: roles,
      criteria_10th: criteria_10th,
      criteria_12th: criteria_12th,
      deg_criteria: deg_criteria,
      diploma_criteria: diploma_criteria,
      eligible_branches: eligible_branches,
      docs: docs1, 
      docs2: docs2, 
      docs3: docs3, 
      tracker: tracker,
      deadline: deadline,
      batch_date: batch_date,
      extLink:extLink
      // salad_id:salad_id
    });

    if (tracker === 'yes' && questions.length > 0) {
      const createdQuestion = await IntershipQuestions.create({
        question: questions,
        // data_type: 'text',
        companyId: jobPosting.id,
      });
      console.log(createdQuestion);
    }

    let query_for_mail = `
    SELECT 
      sd.email_id as emails
    FROM 
      student_details sd
    WHERE degree_year = ?
    `

    connection.query(query_for_mail,[batch_date],async(err,email_data)=>{
      if(err){
        console.log(err);
        return res.status(201).json({ message: "Successful But mail has been not sent" });
      }else{
        console.log(email_data[0].emails);

        // let emails_to_send = email_data[0].emails;
        try{
          
          for(let i=0;i<=email_data.length;i=i+90){
            
            let emailArray = email_data.map(item => item.emails);
            let emailString = emailArray.splice(i,i+90).join(', ');
            
          const mailOptions = {
            from: 'technologies.getfly@gmail.com',
            to: 'tpo@pvppcoe.ac.in',
            cc:"technologies.getfly@gmail.com, tpo@pvppcoe.ac.in",
            bcc:emailString, 
            subject: 'New Internship Alert',
            text: `
            `,
            html:`
            <!DOCTYPE html>
            <html lang="en">
    
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Job Post</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f9fafb;
                  margin: 0;
                  padding: 0;
                }
    
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
    
                .heading {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 20px;
                }
    
                .content {
                  font-size: 12px;
                  color: #4b5563;
                  line-height: 1.5;
                }
    
                .content p {
                  margin-bottom: 10px;
                }
    
                .strong {
                  font-weight: bold;
                  color: #1f2937;
                }
    
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #2563eb;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  margin-top: 20px;
                }
    
                .button:hover {
                  background-color: #1d4ed8;
                }
              </style>
            </head>
    
            <body>
              <div class="container">
                <div class="heading">New Internship Posting</div>
                <div class="content">
                  <p>${job_description}</p>
    
                  <p><span class="strong">10th Criteria:</span> ${criteria_10th} %</p>
                  <p><span class="strong">12th Criteria:</span> ${criteria_12th} %</p>
                  <p><span class="strong">Diploma Criteria:</span> ${diploma_criteria} %</p>
                  <p><span class="strong">Degree Criteria:</span> ${deg_criteria} CGPA</p>
                  <p><span class="strong">CTC:</span> ${package_details} LPA</p>
                  <p><span class="strong">Deadline To Register:</span> ${new Date(deadline)}</p>
                  <br>
                  <br>
                  <p>Visit Tpo Portal to apply for the above drive</p>
                </div>
              </div>
            </body>
            </html>
            `
          };
        
          await transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              }
              console.log('Email sent: ' + info.response);
              res.status(201).json({ message: `Successful Email has been sent to ${email_data[0].count}`});
              return res.end();
          });

        }
        setTimeout(()=>{
          res.status(200).json("Announcement inserted");
          return res.end();
        },3000)

        }
        catch(err){
          console.log(err);
        }
      }
    })
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// exports.getJobPosstingsByCompanyId = async (req, res) => {
//   const companyId = req.params.companyId;
//   try {
//     const jobPostings = await JobPosting.findAll({ where: { companyId } });
//     res.json(jobPostings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getJobPostingsByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const jobPostings = await JobPosting.findAll({
      where: { companyId: companyId },
      include: [
        {
          model: Company,
          as: 'companies',
          attributes: ['name'],
        },
      ],
    });

    if (!jobPostings.length) {
      return res.status(404).json({ error: 'No job postings found for this company.' });
    }

    res.json(jobPostings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getCompaniesWithJobPostings = async (req, res) => {
//   try {
// //     const query = `
// //     SELECT DISTINCT c.name
// // FROM tpo.companies c
// // JOIN tpo.job_postings j ON c.id = j.companyId;
// //     `;

// //     const companies = await sequelize.query(
// //       `SELECT DISTINCT c.name
// // FROM tpo.companies c
// // JOIN tpo.job_postings j ON c.id = j.companyId;`,
// //       {
// //         type: sequelize.QueryTypes.SELECT,
// //       }
// //     );

//     // if (!companies || companies.length === 0) {
//     //   return res.status(404).json({ error: 'No companies with job postings found.' });
//     // }
//     // console.log(companies);
//     res.status(200).json({
//       "ahsd": 123
//     });
//   } catch (error) {
//     console.error('Error executing SQL query:', error);
//     res.status(500).json({ error: 'Error executing SQL query' });
//   }
// };


exports.getCompaniesWithJobPostings = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT c.id AS companyId, c.name AS companyName, j.id AS jobPostingId, j.createdAt AS jobPostDate
      FROM companies c
      JOIN job_postings j ON c.id = j.companyId;
    `;

    const companiesWithJobPostings = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (companiesWithJobPostings.length === 0) {
      return res.status(404).json({ error: 'No companies with job postings found.' });
    }

    res.status(200).json(companiesWithJobPostings);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Error executing SQL query' });
  }
};

exports.getCompaniesWithInterPostings = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT c.id AS companyId, c.name AS companyName, j.id AS jobPostingId, j.createdAt AS jobPostDate
      FROM intershiip_companies c
      JOIN intership_postings j ON c.id = j.companyId;
    `;

    const companiesWithJobPostings = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (companiesWithJobPostings.length === 0) {
      return res.status(404).json({ error: 'No companies with job postings found.' });
    }

    res.status(200).json(companiesWithJobPostings);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Error executing SQL query' });
  }
};

exports.job_postingCompanies = (req,res)=>{
  // const id = req.body.id;
  //   const query = `SELECT 
  //   c.id,
  //   c.name,
  //   j.job_description,
  //   j.package_details,
  //   j.roles,
  //   j.tracker,
  //   j.criteria_10th,
  //   j.criteria_12th,
  //   j.deg_criteria,
  //   j.diploma_criteria,
  //   j.eligible_branches
  // FROM 
  //   companies c
  // JOIN 
  //   job_postings j ON c.id = j.companyId`;
    const studentId = req.params.studentId;
    const query = `SELECT 
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
    jp.eligible_branches
  FROM 
    companies c
  JOIN 
    job_postings jp ON c.id = jp.companyId
  JOIN 
    student_details sd ON (
        sd.ssc_per >= jp.criteria_10th
        AND (sd.hsc_per >= jp.criteria_12th OR sd.diploma_per >= jp.diploma_criteria)
        AND sd.degree_cgpa >= jp.deg_criteria
    )
  WHERE 
    sd.id = ?`;
    connection.query(query,[studentId],(error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(results);
    });
}