const JobPosting = require('../models/jobPostingSchema.js');
const Company = require('../models/companySchema.js');
const StudentDetail = require('../models/studentDetailSchema.js');
const Forum = require('../models/forumSchema.js');
const sequelize = require('../config/config.js');
// import asyncHand from "express-async-handler";
const asyncHand = require("express-async-handler");

// import asyncHandler from 'express-async-handler';
// import { Forum } from '../models/forumSchema';
// import { JobPostings } from '../models/jobPostingSchema';
// import { Company } from '../models/companySchema';
// import { StudentDetail } from '../models/studentDetailSchema';

// Get all forums with job postings and company details
// exports.getAllForum = async (req, res) => {
//   try {
//     const forums = await Forum.findAll({
//       include: [
//         {
//           model: JobPosting,
//           as: 'job_postings',
//           include: [
//             {
//               model: Company,
//               as: 'companies',
//             },
//           ],
//         },
//       ],
//     });
//     res.json(forums);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all forum users by post id
// exports.getAllForumUser = async (req, res) => {
//   try {
//     const postId = req.params.postid;
//     const forums = await Forum.findAll({
//       where: { post_id: postId },
//       include: [
//         {
//           model: StudentDetail,
//           as: 'student_details',
//           attributes: [
//             [sequelize.fn('CONCAT', sequelize.col('first_name'), ' ', sequelize.col('middle_name'), ' ', sequelize.col('last_name')), 'full_name'],
//             'email_id',
//           ],
//         },
//       ],
//     });
//     if (forums.length === 0) {
//       return res.status(404).json("Data not found");
//     }
//     res.json(forums);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update forum user by post id
// exports.updateForumUser = async (req, res) => {
//   try {
//     const forumId = req.params.forumId;
//     const { answer } = req.body;
//     const answer_time = new Date();

//     const [updated] = await Forum.update(
//       { answer, answer_time },
//       { where: { id: forumId } }
//     );

//     if (updated === 0) {
//       return res.status(404).json("Data not found");
//     }
//     res.json("Update successful");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const { sequelize } = require('../config/config');

exports.getAllForum = async (req, res) => {
  const query = `
    SELECT j.id, c.name, c.location, j.job_description, j.package_details, j.roles, j.createdAt 
    FROM companies AS c 
    INNER JOIN job_postings AS j 
    ON c.id = j.id
    order by j.id desc
  `;
  try {
    const [results, metadata] = await sequelize.query(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllForumUser = async (req, res) => {
  const post = req.params.postid;
  const query = `
    SELECT CONCAT(s.first_name, ' ', s.middle_name, ' ', s.last_name) AS full_name, 
           s.email_id, f.question, f.question_time, f.answer, f.answer_time, f.id 
    FROM student_details AS s 
    INNER JOIN forums AS f 
    ON f.id = s.id 
    WHERE f.post_id = ?
  `;
  try {
    const [results, metadata] = await sequelize.query(query, { replacements: [post] });
    if (results.length === 0) {
      return res.status(404).json("data not found");
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateForumUser = async (req, res) => {
  const post = req.params.forumId;
  const answer = req.body.answer;
  const answer_date = new Date();
  console.log(answer_date);
  console.log('post:', post);
  console.log('answer:', answer);
  console.log('answer_date:', answer_date);
  const values = [answer, answer_date, post];
  const query = `
    UPDATE forums 
    SET answer = ?, answer_time = ? 
    WHERE id = ?
  `;
  try {
    const [results, metadata] = await sequelize.query(query, { replacements: values });
    if (metadata.affectedRows === 0) {
      return res.status(404).json("data not found");
    }
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


// // Get all forums with job postings and companies
// exports.getAllForum = async (req, res) => {
//   try {
//     const forums = await Forum.findAll({
//       include: [
//         {
//           model: JobPosting,
//           as: 'job_postings',
//           include: [{model: Company, as: 'companies',}],
//         },
//       ],
//     });
//     res.json(forums);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all forum posts by post ID
// exports.getAllForumUser = async (req, res) => {
//   try {
//     const postId = req.params.postid;
//     const forums = await Forum.findAll({
//       where: { post_id: postId },
//       include: [
//         {
//           model: StudentDetail,
//           as: 'student_details',
//           attributes: [
//             [sequelize.fn('CONCAT', sequelize.col('first_name'), ' ', sequelize.col('middle_name'), ' ', sequelize.col('last_name')), 'full_name'],
//             'email_id',
//           ],
//         },
//       ],
//     });

//     if (forums.length === 0) {
//       return res.status(404).json("data not found");
//     }

//     res.json(forums);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a forum post
// exports.updateForumUser = async (req, res) => {
//   try {
//     const postId = req.params.postid;
//     const { answer } = req.body;
//     const answerTime = new Date();

//     const [updated] = await Forum.update(
//       { answer, answer_time: answerTime },
//       { where: { id: postId } }
//     );

//     if (updated === 0) {
//       return res.status(404).json("data not found");
//     }

//     res.json("announcement updated");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createForum = asyncHand(async (req, res) => {
  const { post_id, stud_id, question } = req.body;

  try {
      const newForum = await Forum.create({
          post_id,
          stud_id,
          question,
          question_time: new Date()
      });

      res.status(201).json({ message: "Forum created successfully", forumId: newForum.id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Create a forum post
// exports.createForum = async (req, res) => {
//     try {
//       const { post_id, stud_id, question } = req.body;
//       const question_time = new Date();
  
//       const newForum = await Forum.create({
//         post_id,
//         stud_id,
//         question,
//         question_time,
//       });
  
//       res.status(201).json(newForum);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// };