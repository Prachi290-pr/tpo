const Announcement = require('../models/announcementSchema.js');
const  JobPostings = require('../models/jobPostingSchema.js');
const  Company = require('../models/companySchema.js');
const sequelize = require('../config/config');
const { transporter } = require('../config/mailConfig.js');
const connection = require('../config/dbConfig.js');
// import Announcement from '../models/announcementSchema.js';
// import Company from '../models/companySchema.js';
// import JobPostings from '../models/jobPostingSchema.js'

exports.getAllAnnouncements = async (req, res) => {
  const query = `
    SELECT a.id, c.name, c.id AS companyId, j.id AS jobPostingId, a.announcement, a.createdAt
    FROM  tpo_final_database.announcements AS a 
    INNER JOIN  tpo_final_database.job_postings AS j ON a.post_id = j.id
    INNER JOIN  tpo_final_database.companies AS c ON j.companyId = c.id
    order by a.id desc
  `;

//   const query2 = `
//   SELECT 
//     c.id,
//     c.name, 
//     GROUP_CONCAT(a.id) as id, 
//     GROUP_CONCAT(a.announcement) as announcement, 
//     MAX(a.createdAt) as createdAt
// FROM announcements AS a 
// INNER JOIN job_postings AS j ON a.post_id = j.id 
// INNER JOIN companies AS c ON j.companyId = c.id
// GROUP BY c.id, c.name;
// `;

  try {
    const [results] = await sequelize.query(query);
    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAnnouncementsIntership = async (req, res) => {
  const query = `
    SELECT a.id, c.name, c.id AS companyId, j.id AS jobPostingId, a.announcement, a.createdAt
    FROM  tpo_final_database.intership_announcements AS a 
    INNER JOIN  tpo_final_database.intership_postings AS j ON a.post_id = j.id
    INNER JOIN  tpo_final_database.intershiip_companies AS c ON j.companyId = c.id
    order by a.id desc
    ;
  `;

  try {
    const [results] = await sequelize.query(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insertAnnouncement = async (req, res) => {
  const query = `
    INSERT INTO announcements (post_id, announcement, createdAt) 
    VALUES (?, ?, ?)
  `;

  const post = req.body.postid;
  const msg = req.body.msg;
  const time = new Date();

  const values = [post, msg, time];

  try {
    await sequelize.query(query, { replacements: values });

    let query_for_mail = `
   SELECT 
      sd.clg_id,
      sd.email_id as emails
    FROM 
      student_details sd
    WHERE sd.degree_year in (select batch from current_batch) and (email_id like "%pvppcoe.ac.in" or email_id like "%gmail.com")
    `

    connection.query(query_for_mail,async(err,email_data)=>{
      if(err){
        console.log(err);
        return res.status(201).json({ message: "Successful But mail has been not sent" });
      }else{
        try{
          for(let i=0;i<=email_data.length;i=i+90){
            
            let emailArray = email_data.map(item => item.emails);
            let emailString = emailArray.splice(i,i+90).join(', ');

            // console.log(i,=,emailString)
            const mailOptions = {
              from: 'technologies.getfly@gmail.com',
              to: 'tpo@pvppcoe.ac.in',
              cc:"technologies.getfly@gmail.com, tpo@pvppcoe.ac.in",
              bcc:emailString, 
              subject: 'Announcement Alert',
              text: ``,
              html:`
             <!DOCTYPE html>
              <html lang="en">
  
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>TPO Announcement</title>
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
                    font-size: 16px;
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
  
                  .footer {
                    margin-top: 30px;
                    font-size: 14px;
                    color: #9ca3af;
                  }
                </style>
              </head>
  
              <body>
                <div class="container">
                  <div class="heading">Important Announcement from TPO</div>
                  <div class="content">
                    <p>Dear Students,</p>
  
                    <p>We would like to inform you that the TPO has made an important announcement regarding the upcoming placements and training sessions.</p>
  
                    <p>Please visit the TPO portal for more information and to stay updated with the latest announcements.</p>
  
                    <a href="https://tpo.getflytechnologies.com/" class="button">Visit TPO Portal</a>
  
                    <div class="footer">
                      <p>This is an automated message, please do not reply directly to this email.</p>
                      <p>If you have any questions, please contact the TPO office.</p>
                    </div>
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
    console.log(error);
    // res.status(500).json({ error: error.message });
  }
};

exports.insertAnnouncementInter = async (req, res) => {
  const query = `
    INSERT INTO intership_announcements (post_id, announcement, createdAt) 
    VALUES (?, ?, ?)
  `;

  const post = req.body.postid;
  const msg = req.body.msg;
  const time = new Date();

  const values = [post, msg, time];

  try {
    await sequelize.query(query, { replacements: values });

    let query_for_mail = `
   SELECT 
      sd.clg_id,
      sd.email_id as emails
    FROM 
      student_details sd
    WHERE sd.degree_year in (select batch from current_batch) and (email_id like "%pvppcoe.ac.in" or email_id like "%gmail.com")
    `

    connection.query(query_for_mail,async(err,email_data)=>{
      if(err){
        console.log(err);
        return res.status(201).json({ message: "Successful But mail has been not sent" });
      }else{
        try{
          for(let i=0;i<=email_data.length;i=i+90){
            
            let emailArray = email_data.map(item => item.emails);
            let emailString = emailArray.splice(i,i+90).join(', ');

            // console.log(i,=,emailString)
            const mailOptions = {
              from: 'technologies.getfly@gmail.com',
              to: 'tpo@pvppcoe.ac.in',
              cc:"technologies.getfly@gmail.com, tpo@pvppcoe.ac.in",
              bcc:emailString, 
              subject: 'Announcement Alert',
              text: ``,
              html:`
             <!DOCTYPE html>
              <html lang="en">
  
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>TPO Announcement</title>
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
                    font-size: 16px;
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
  
                  .footer {
                    margin-top: 30px;
                    font-size: 14px;
                    color: #9ca3af;
                  }
                </style>
              </head>
  
              <body>
                <div class="container">
                  <div class="heading">Important Announcement from TPO</div>
                  <div class="content">
                    <p>Dear Students,</p>
  
                    <p>We would like to inform you that the TPO has made an important announcement regarding the upcoming placements and training sessions.</p>
  
                    <p>Please visit the TPO portal for more information and to stay updated with the latest announcements.</p>
  
                    <a href="https://tpo.getflytechnologies.com/" class="button">Visit TPO Portal</a>
  
                    <div class="footer">
                      <p>This is an automated message, please do not reply directly to this email.</p>
                      <p>If you have any questions, please contact the TPO office.</p>
                    </div>
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
    console.log(error);
    // res.status(500).json({ error: error.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  const query = `
    UPDATE announcements 
    SET announcement = ?, createdAt = ? 
    WHERE id = ?
  `;

  const id = req.params.id;
  const msg = req.body.msg;
  const time = new Date();

  const values = [msg, time, id];

  try {
    const [results, metadata] = await sequelize.query(query, { replacements: values });
    if (metadata.affectedRows === 0) {
      return res.status(404).json("Announcement not found");
    }
    res.status(200).json("Announcement updated");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnnouncementInter = async (req, res) => {
  const query = `
    UPDATE intership_announcements 
    SET announcement = ?, createdAt = ? 
    WHERE id = ?
  `;

  const id = req.params.id;
  const msg = req.body.msg;
  const time = new Date();

  const values = [msg, time, id];

  try {
    const [results, metadata] = await sequelize.query(query, { replacements: values });
    if (metadata.affectedRows === 0) {
      return res.status(404).json("Announcement not found");
    }
    res.status(200).json("Announcement updated");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const query = `
    DELETE FROM announcements 
    WHERE id = ?
  `;

  const id = req.params.id;

  try {
    const [results, metadata] = await sequelize.query(query, { replacements: [id] });
    if (metadata.affectedRows === 0) {
      return res.status(404).json("Announcement not found");
    }
    res.status(200).json("Announcement deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnnouncementInter = async (req, res) => {
  const query = `
    DELETE FROM intership_announcements 
    WHERE id = ?
  `;

  const id = req.params.id;

  try {
    const [results, metadata] = await sequelize.query(query, { replacements: [id] });
    if (metadata.affectedRows === 0) {
      return res.status(404).json("Announcement not found");
    }
    res.status(200).json("Announcement deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.companyAnnouncement = async (req, res) => {
  const query = `
    SELECT j.id, j.companyId, c.name, j.job_description 
    FROM job_postings AS j 
    INNER JOIN companies AS c ON j.id = c.id
  `;

  try {
    const [results] = await sequelize.query(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.getAllAnnouncements = async (req, res) => {
//   try {
//     const announcements = await Announcement.findAll({
//       attributes: ['id', 'announcement', 'createdAt'],
//       include: [{
//         model: JobPostings,
//         as: 'job_postings',
//         attributes: ['id'],
//         include: [{
//           model: Company,
//           as: 'companies',
//           attributes: ['name', 'id']
//         }]
//       }]
//     });

//     res.json(announcements);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.insertAnnouncement = async (req, res) => {
//   try {
//     const { post_id, msg } = req.body;
//     // const time = new Date();

//     const announcement = await Announcement.create({
//       post_id: post_id,
//       announcement: msg,
//     //   createdAt: time
//     });

//     res.status(200).json({ message: 'Announcement inserted', announcement });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateAnnouncement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { postid, msg } = req.body;
//     const time = new Date();

//     await Announcement.update(
//       {
//         post_id: postid,
//         announcement: msg,
//         createdAt: time
//       },
//       { where: { id: id } }
//     );

//     res.status(200).json({ message: 'Announcement updated' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteAnnouncement = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Announcement.destroy({ where: { id: id } });

//     res.status(200).json({ message: 'Announcement deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getCompanyAnnouncements = async (req, res) => {
  try {
    const companyAnnouncements = await JobPostings.findAll({
      attributes: ['id', 'companyId', 'job_description'],
      include: [{
        model: Company,
        as: 'companies',
        attributes: ['name', 'id']
      }]
    });

    res.json(companyAnnouncements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnnouncementsByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;

    const announcements = await Announcement.findAll({
      where: { post_id },
      attributes: ['id', 'announcement', 'createdAt'],
      include: [{
        model: JobPostings,
        as: 'job_postings',
        attributes: ['id'],
        include: [{
          model: Company,
          as: 'companies',
          attributes: ['name', 'id']
        }]
      }]
    });

    if (announcements.length === 0) {
      return res.status(404).json({ error: 'No announcements found for the given post_id' });
    }

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnnouncementsByPostIdInter = async (req, res) => {
  try {
    const { post_id } = req.params;

    connection.query(`select * from intership_announcements where post_id = ?`,[post_id],(err,announcements)=>{
      if (announcements.length === 0) {
        return res.status(404).json({ error: 'No announcements found for the given post_id' });
      }

      res.json(announcements);
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};