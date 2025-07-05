// const OpenAI = require("openai");
// const db = require('../config/dbConfig');
// const dotenv = require("dotenv");
// const expressAsyncHandler = require("express-async-handler");
// dotenv.config();

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
// });

// const updateans = expressAsyncHandler(async (req, res) => {
//   const questionId = req.params.questionId;
//   const { answer, timeTaken } = req.body;
//   console.log(questionId, answer, timeTaken);
//   const sql = `UPDATE mcqs SET user_ans = ?, user_time = ? WHERE id = ?`;

//   db.query(sql, [answer, timeTaken, questionId], (err, result) => {
//     if (err) {
//       console.error("Error updating answer:", err);
//       res.status(500).json({ message: "Failed to update answer" });
//       return;
//     }
//     console.log("Answer updated successfully");
//     res.json({ message: "Answer updated successfully" });
//   });
// });

// const submittest = expressAsyncHandler(async (req, res) => {
//   const { answers } = req.body;

//   try {
//     // Example implementation: Iterate through answers and update database
//     for (const answerObj of answers) {
//       const { questionId, answer } = answerObj;
//       const sql = `UPDATE mcqs SET user_ans = ? WHERE id = ?`;

//       await new Promise((resolve, reject) => {
//         db.query(sql, [answer, questionId], (err, result) => {
//           if (err) {
//             console.error("Error updating answer:", err);
//             reject(err);
//           } else {
//             console.log("Answer updated successfully");
//             resolve(result);
//           }
//         });
//       });
//     }

//     res.json({ message: "Test submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting test:", error);
//     res.status(500).json({ message: "Error submitting test" });
//   }
// });

// const ans = expressAsyncHandler(async (req, res) => {
//   const { userUid } = req.body; // Assuming userUid is sent in the request body
//   console.log(userUid); // Logging to check if userUid is received correctly

//   const sql = "SELECT * FROM mcqs WHERE user_uid = ?";

//   db.query(sql, [userUid], (err, result) => {
//     if (err) {
//       console.error("Error fetching answers:", err);
//       res.status(500).json({ message: "Failed to fetch answers" });
//       return;
//     }

//     console.log("Answers successfully fetched");
//     res.json(result);
//   });
// });

// const aptitudeTest = expressAsyncHandler(async (req, res) => {
//   const { userUid } = req.body; // Assuming userUid is sent in the request body
//   console.log(userUid); // Logging to check if userUid is received correctly

//   const sql = "SELECT * FROM aptitude";

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching answers:", err);
//       res.status(500).json({ message: "Failed to fetch answers" });
//       return;
//     }

//     console.log("Answers successfully fetched");
//     res.json(result);
//   });
// });

// const GenerateAptitudeTest = expressAsyncHandler(async (req, res) => {
//   const testid = req.params.testid;
//   const uid = req.body.uid;

//   const sql = "select * from aptitude where aid = ?";
//   db.query(sql, [testid], async (err, result) => {
//     // Make the callback function async
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: "Failed to fetch aptitude data" });
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).json({ message: "Aptitude test not found" });
//       return;
//     }

//     const aptitudeData = result[0];
//     const aptitudeType = aptitudeData.aptitudetype;
//     const noq = aptitudeData.noq;
//     const level = aptitudeData.level;

//     const currenttime = new Date().toISOString().slice(0, 19).replace("T", " ");
//     const uk = `${uid} ${currenttime}`;

//     const q = "insert into student_mcq (stu_mcq_key, sid, aid) values (?,?,?)";
//     db.query(q, [uk, uid, testid], async (err, result) => {
//       // Make the nested callback function async
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to insert aptitude data" });
//         return;
//       }
//       // const promt =`Generate ${noq} multiple choice questions and answers on ${aptitudeType} Aptitude and Difficulty level is ${level} the response should be in json format such that my question will as key of 'question'and same for options and answer also in key value pair for option keys are A,B,C,D and give proper json format with accurate commas and single quotes`;
//       // console.log(promt)

//       console.log("result inserted");
//     });

//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "user",
//             content: `Generate ${noq} multiple choice questions and answers on ${aptitudeType} Aptitude and Difficulty level is ${level} the response should be in json format such that my question will as key of 'question'and same for options and answer also in key value pair for option keys are A,B,C,D and give proper json format with accurate commas and single quotes`,
//           },
//         ],
//         temperature: 0.1,
//         max_tokens: 4096,
//         top_p: 1,
//         // frequency_penalty: 0.1,
//         // presence_penalty: 2,
//       });

//       const content1 = response?.choices[0]?.message?.content;
//       console.log(content1);

//       if (!content1) {
//         throw new Error("No valid content found in OpenAI response.");
//       }

//       const parsedContent = JSON.parse(content1);

//       if (!Array.isArray(parsedContent.questions)) {
//         throw new Error(
//           "Expected 'questions' array not found in parsed content."
//         );
//       }

//       const questions = parsedContent.questions;
//       console.log(questions);

//       // Step 2: Insert questions into the database
//       const sql1 =
//         "INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer) VALUES ?";

//       const values = questions.map((q) => [
//         q.question,
//         uid,
//         uk, // Assuming user_uid should be same as uid based on your logic
//         q.options.A,
//         q.options.B,
//         q.options.C,
//         q.options.D,
//         q.answer,
//       ]);

//       db.query(sql1, [values], (err, results) => {
//         if (err) {
//           console.log(err);
//           console.error("Error inserting questions into database:", err);
//           res
//             .status(500)
//             .json({ message: "Error inserting questions into database" });
//         } else {
//           console.log(`${results.affectedRows} questions inserted.`);
//           if (results.affectedRows == noq) {
//             const selectSql =
//               "SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?";
//             db.query(selectSql, [uk, uid], (err, data) => {
//               if (err) {
//                 console.error("Error retrieving questions from database:", err);
//                 res.status(500).json({
//                   message: "Error retrieving questions from database",
//                 });
//               } else {
//                 res.status(200).json(data);
//               }
//             });
//           } else {
//             res
//               .status(500)
//               .json({ message: "Mismatch in number of questions inserted" });
//           }
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching and inserting questions:", error);
//       res
//         .status(500)
//         .json({ message: "Error retrieving questions from database" });
//     }
//   });
// });

// const UserHistory = (req, res) => {
//   const uid = req.params.uid;
//   const sql = `SELECT DISTINCT 
//     s.stu_mcq_key,
//     s.sid,
//     s.aid,
//     a.aptitudetype,
//     a.level AS aptitude_level,
//     a.noq,
//     a.time AS aptitude_time,
//     (SELECT COUNT(*) 
//      FROM mcqs 
//      WHERE user_ans = answer 
//        AND user_uid = s.stu_mcq_key) AS correct_answers
// FROM 
//     student_mcq AS s
// INNER JOIN 
//     aptitude AS a ON s.aid = a.aid
// INNER JOIN 
//     mcqs AS m ON s.stu_mcq_key = m.user_uid
// WHERE 
//     s.sid = ?
// ORDER BY 
//     s.stu_mcq_key desc`;

//   db.query(sql, [uid], (err, results) => {
//     if (err) {
//       console.error("Error retrieving data from database:", err);
//       res.status(500).json({ message: "Error retrieving data from database" });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };

// const mcqs = (req, res) => {
//   const mcqkey = req.params.mcqkey;
//   console.log(mcqkey);
//   const sql = `select * from mcqs where user_uid= ?`;
//   db.query(sql, [mcqkey], (err, results) => {
//     if (err) {
//       console.error("Error retrieving data from database:", err);
//       res.status(500).json({ message: "Error retrieving data from database" });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };

// module.exports = {
//   updateans,
//   submittest,
//   ans,
//   aptitudeTest,
//   GenerateAptitudeTest,
//   UserHistory,
//   mcqs
// };


// import OpenAI from "openai";
// import { connection as db } from "../config/dbConfig.js";
// import dotenv from "dotenv";
// import expressAsyncHandler from "express-async-handler";
const OpenAI = require("openai");
const db = require('../config/dbConfig');
const dotenv = require("dotenv");
const expressAsyncHandler = require("express-async-handler");
dotenv.config();
// dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// exports.verbal = expressAsyncHandler(async (req, res) => {
//   const uid = req.params.uid;
//   const aptitudeType = req.body.aptitudeTypes;
//   const noofquestions = req.body.no;
//   const level = req.body.level;
//   const user_uid = req.body.user_uid;
//   const time = req.body.time;

//   console.log(noofquestions);
//   try {
//     // console.log(aptitudeType,noofquestions,level)
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `Generate ${noofquestions} multiple choice questions and answers on ${aptitudeType} Aptitude and Difficulty level is ${level} the response should be in json format such that my question will as key of 'question'and same for options and answer also in key value pair for option keys are A,B,C,D and give proper json format with accurate commas and single quotes`,
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 4096,
//       top_p: 1,
//       // frequency_penalty: 0.1,
//       // presence_penalty: 2,
//     });

//     const content = response?.choices[0]?.message?.content;
//     console.log(content);

//     if (!content) {
//       throw new Error("No valid content found in OpenAI response.");
//     }
//     typeof content;

//     const parsedContent = JSON.parse(content);

//     if (!Array.isArray(parsedContent.questions)) {
//       throw new Error(
//         "Expected 'questions' array not found in parsed content."
//       );
//     }

//     const questions = parsedContent.questions;
//     console.log(questions);
//     // Step 2: Insert questions into the database
//     const sql =
//       "INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer) VALUES ?";

//     const values = questions.map((q) => [
//       q.question,
//       uid,
//       user_uid,
//       q.options.A,
//       q.options.B,
//       q.options.C,
//       q.options.D,
//       q.answer,
//     ]);

//     db.query(sql, [values], (err, results) => {
//       if (err) {
//         console.log(err);
//         console.error("Error inserting questions into database:", err);
//       } else {
//         console.log(`${results.affectedRows} questions inserted.`);
//         if (results.affectedRows == noofquestions) {
//           const selectSql = `SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?`;
//           db.query(selectSql, [user_uid, uid], (err, data) => {
//             if (err) {
//               console.error("Error retrieving questions from database:", err);
//               res
//                 .status(500)
//                 .json({ message: "Error retrieving questions from database" });
//             } else {
//               res.status(200).json(data);
//             }
//           });
//         } else {
//           res
//             .status(500)
//             .json({ message: "Mismatch in number of questions inserted" });
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching and inserting questions:", error);
//     res
//       .status(500)
//       .json({ message: "Error retrieving questions from database" });
//   }
// });

exports.updateans = expressAsyncHandler(async (req, res) => {
  const questionId = req.params.questionId;
  const { answer, timeTaken } = req.body;
  console.log(questionId, answer, timeTaken);
  const sql = `UPDATE mcqs SET user_ans = ?, user_time = ? WHERE id = ?`;

  db.query(sql, [answer, timeTaken, questionId], (err, result) => {
    if (err) {
      console.error("Error updating answer:", err);
      res.status(500).json({ message: "Failed to update answer" });
      return;
    }
    console.log("Answer updated successfully");
    res.json({ message: "Answer updated successfully" });
  });
});

exports.submittest = expressAsyncHandler(async (req, res) => {
  const { answers } = req.body;

  try {
    // Example implementation: Iterate through answers and update database
    for (const answerObj of answers) {
      const { questionId, answer } = answerObj;
      const sql = `UPDATE mcqs SET user_ans = ? WHERE id = ?`;

      await new Promise((resolve, reject) => {
        db.query(sql, [answer, questionId], (err, result) => {
          if (err) {
            console.error("Error updating answer:", err);
            reject(err);
          } else {
            console.log("Answer updated successfully");
            resolve(result);
          }
        });
      });
    }

    res.json({ message: "Test submitted successfully" });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: "Error submitting test" });
  }
});

exports.ans = expressAsyncHandler(async (req, res) => {
  const { userUid } = req.body; // Assuming userUid is sent in the request body
  console.log(userUid); // Logging to check if userUid is received correctly

  const sql = "SELECT * FROM mcqs WHERE user_uid = ?";

  db.query(sql, [userUid], (err, result) => {
    if (err) {
      console.error("Error fetching answers:", err);
      res.status(500).json({ message: "Failed to fetch answers" });
      return;
    }

    console.log("Answers successfully fetched");
    res.json(result);
  });
});

exports.aptitudeTest = expressAsyncHandler(async (req, res) => {
  const { userUid } = req.body; // Assuming userUid is sent in the request body
  console.log(userUid); // Logging to check if userUid is received correctly

  const sql = `SELECT 
                md.* 
              FROM aptitude as md
              join student_details as sd
              where status = 1 and INSTR(md.batch,sd.degree_year) and sd.id = ?`;

  db.query(sql,[req.user.uid], (err, result) => {
    if (err) {
      console.error("Error fetching answers:", err);
      res.status(500).json({ message: "Failed to fetch answers" });
      return;
    }

    console.log("Answers successfully fetched");
    res.json(result);
  });
});

// exports.GenerateAptitudeTest = expressAsyncHandler(async (req, res) => {
//   const testid = req.params.testid;
//   const uid = req.body.uid;

//   const sql = "select * from aptitude where aid = ?";
//   db.query(sql, [testid], async (err, result) => {
//     // Make the callback function async
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: "Failed to fetch aptitude data" });
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).json({ message: "Aptitude test not found" });
//       return;
//     }

//     const aptitudeData = result[0];
//     const aptitudeType = aptitudeData.aptitudetype;
//     const noq = aptitudeData.noq;
//     const level = aptitudeData.level;
//     const time =aptitudeData.time;

//     const currenttime = new Date().toISOString().slice(0, 19).replace("T", " ");
//     const uk = `${uid} ${currenttime}`;

//     const q = "insert into student_mcq (stu_mcq_key, sid, aid) values (?,?,?)";
//     db.query(q, [uk, uid, testid], async (err, result) => {
//       // Make the nested callback function async
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to insert aptitude data" });
//         return;
//       }
//       // const promt =`Generate ${noq} multiple choice questions and answers on ${aptitudeType} Aptitude and Difficulty level is ${level} the response should be in json format such that my question will as key of 'question'and same for options and answer also in key value pair for option keys are A,B,C,D and give proper json format with accurate commas and single quotes`;
//       // console.log(promt)

//       console.log("result inserted");
//     });

//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "user",
//             content: `Generate ${noq} multiple choice questions and answers on ${aptitudeType} Aptitude and Difficulty level is ${level} the response should be in json format such that my question will as key of 'question'and same for options and answer also in key value pair for option keys are A,B,C,D and give proper json format with accurate commas and single quotes`,
//           },
//         ],
//         temperature: 0.1,
//         max_tokens: 4096,
//         top_p: 1,
//         // frequency_penalty: 0.1,
//         // presence_penalty: 2,
//       });

//       const content1 = response?.choices[0]?.message?.content;
//       console.log(content1);

//       if (!content1) {
//         throw new Error("No valid content found in OpenAI response.");
//       }

//       const parsedContent = JSON.parse(content1);

//       if (!Array.isArray(parsedContent.questions)) {
//         throw new Error(
//           "Expected 'questions' array not found in parsed content."
//         );
//       }

//       const questions = parsedContent.questions;
//       console.log(questions);

//       // Step 2: Insert questions into the database
//       const sql1 =
//         "INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer,time_req) VALUES ?";

//       const values = questions.map((q) => [
//         q.question,
//         uid,
//         uk, // Assuming user_uid should be same as uid based on your logic
//         q.options.A,
//         q.options.B,
//         q.options.C,
//         q.options.D,
//         q.answer,
//         time
//       ]);

//       db.query(sql1, [values], (err, results) => {
//         if (err) {
//           console.log(err);
//           console.error("Error inserting questions into database:", err);
//           res
//             .status(500)
//             .json({ message: "Error inserting questions into database" });
//         } else {
//           console.log(`${results.affectedRows} questions inserted.`);
//           if (results.affectedRows == noq) {
//             const selectSql =
//               "SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?";
//             db.query(selectSql, [uk, uid], (err, data) => {
//               if (err) {
//                 console.error("Error retrieving questions from database:", err);
//                 res.status(500).json({
//                   message: "Error retrieving questions from database",
//                 });
//               } else {
//                 res.status(200).json(data);
//               }
//             });
//           } else {
//             res
//               .status(500)
//               .json({ message: "Mismatch in number of questions inserted" });
//           }
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching and inserting questions:", error);
//       res
//         .status(500)
//         .json({ message: "Error retrieving questions from database" });
//     }
//   });
// });


async function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

// async function insertQuestion(q, uid, uk, time) {
//   try {
//     const sql1 =  "INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer,time_req,sol) VALUES (?)";
//     const new_res = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `solve the problem "${q.question}". The response should be in JSON format and contains solution as "sol" key and the value should be detailed solution of the problem and also include the 'answer' key and final answer as the value of it and if there are multiple solutions then add and/or and make it a single string. Ensure the JSON format is properly structured with accurate commas and double quotes. Do not include any additional text, only the JSON object.`,
//         },
//       ],

//       temperature: .1,
//       max_tokens: 15000, // Adjusted to a reasonable number
//       top_p: 1,
//     });

//     let new_op = new_res?.choices[0]?.message?.content;
//     let data_op = JSON.parse(new_op.replace("```json", "").replace("\n```", ""));

//     const new_res1 = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `add some options with ("${String(data_op.answer).replace(' and ', ' ')}") as a single value and also that is similar to the provided option so that i can make them as options for some mcq.Make sure the other options to be diffrent from the provided answers. The response should be in JSON format and contains solution as an "options" key with an object of answer choices labeled as A, B, C, and D. Ensure the JSON format is properly structured with accurate commas and double quotes. Do not include any additional text, only the JSON object.`,
//         },
//       ],

//       temperature: 0.1,
//       max_tokens: 1500, // Adjusted to a reasonable number
//       top_p: 1,
//     });

//     let new_op1 = new_res1?.choices[0]?.message?.content;
//     let data_op1 = JSON.parse(new_op1.replace("```json", "").replace("\n```", ""));

//     console.log(data_op)
//     console.log(data_op1)

//     let op_arr = [data_op1.options.A,data_op1.options.B,data_op1.options.C,data_op1.options.D]
//     let final_op = await shuffleArray(op_arr);



//     let value = [q.question.replace("'", "''"), uid, uk, final_op[0], final_op[1], final_op[2], final_op[3], String(data_op.answer).replace(' and ', ' '), time, data_op.sol];



//     return new Promise((resolve, reject) => {
//       db.query(sql1, [value], (err, results) => {
//         if (err) {
//           console.error("Error inserting questions into database:", err);
//           reject(err);
//         } else {
//           console.log(`${results.affectedRows} questions inserted.`);
//           resolve();
//         }
//       });
//       resolve()
//     });
//   } catch (error) {
//     console.error("Error during OpenAI API request:", error);
//     throw error;
//   }
// }


// async function insertQuestion(question, uid, uk, time) {
//   try {
//     // SQL query to fetch random 60 questions
//     const fetchQuestionsQuery = `
//       SELECT * 
//       FROM mcqs_b
//       ORDER BY RAND()
//       LIMIT 60;
//     `;

//     const [randomQuestions] = await db.query(fetchQuestionsQuery);

//     // Shuffle options and insert into database
//     for (const q of randomQuestions) {
//       const options = [q.optionA, q.optionB, q.optionC, q.optionD];
//       const shuffledOptions = shuffleArray(options);

//       const insertQuery = `
//         INSERT INTO mcqs 
//         (question, uid, user_uid, optionA, optionB, optionC, optionD, answer, time_req, sol) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//       `;

//       const values = [
//         q.question.replace("'", "''"),
//         uid,
//         uk,
//         shuffledOptions[0],
//         shuffledOptions[1],
//         shuffledOptions[2],
//         shuffledOptions[3],
//         q.answer,
//         time,
//         q.sol,
//       ];

//       // Execute the query
//       await new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, results) => {
//           if (err) {
//             console.error("Error inserting question into database:", err);
//             reject(err);
//           } else {
//             console.log(`${results.affectedRows} question inserted.`);
//             resolve();
//           }
//         });
//       });
//     }

//     console.log("All questions inserted successfully.");
//   } catch (error) {
//     console.error("Error during question insertion:", error);
//     throw error;
//   }
// }


// exports.GenerateAptitudeTest = expressAsyncHandler(async (req, res) => {
//   const testid = req.params.testid;
//   const uid = req.body.uid;

//   const sql = "select * from aptitude where aid = ?";
//   db.query(sql, [testid], async (err, result) => {
//     // Make the callback function async
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: "Failed to fetch aptitude data" });
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).json({ message: "Aptitude test not found" });
//       return;
//     }

//     const aptitudeData = result[0];
//     const aptitudeType = aptitudeData.aptitudetype;
//     const noq = aptitudeData.noq;
//     const level = aptitudeData.level;
//     const time =aptitudeData.time;

//     const currenttime = new Date().toISOString().slice(0, 19).replace("T", " ");
//     const uk = `${uid} ${currenttime}`;

//     const q = "insert into student_mcq (stu_mcq_key, sid, aid) values (?,?,?)";
//     db.query(q, [uk, uid, testid], async (err, result) => {
//       // Make the nested callback function async
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to insert aptitude data" });
//         return;
//       }
//     });

//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "user",
//             content: `Act as a question paper setter for a company that ensures no questions are repeated and provides accurate answers. Generate ${noq} on ${aptitudeType} for interview preparation. Ensure the question is designed for a super hard level of difficulty suitable for an advanced technical interview. The question should test both conceptual understanding and practical application. The response should be in JSON format, where each question is an object within an array under the key "questions." Each object should contain a "question" key for the question text. Ensure the JSON format is properly structured with accurate commas and double quotes. Do not include any additional text, only the JSON object.`,
//           },
//         ],
//         temperature: 1,
//         max_tokens: 15000,
//         top_p: 1,
//         // frequency_penalty: 0.1,
//         // presence_penalty: 2,
//       });

//       const content1 = response?.choices[0]?.message?.content;
//       console.log(content1);

//       if (!content1) {
//         throw new Error("No valid content found in OpenAI response.");
//       }

//       console.log(" newstring" ,content1)

//       const parsedContent = JSON.parse(content1.replace("```json","").replace("\n```",""));

//       if (!Array.isArray(parsedContent.questions)) {
//         throw new Error(
//           "Expected 'questions' array not found in parsed content."
//         );
//       }

//       const questions = parsedContent.questions;
//       console.log(questions);

//       // Step 2: Insert questions into the database
      
//       const sql1 =  "INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer,time_req) VALUES ?";

//       // const values = questions.map((q) => [
//       //   q.question,
//       //   uid,
//       //   uk, // Assuming user_uid should be same as uid based on your logic
//       //   q.options.A,
//       //   q.options.B,
//       //   q.options.C,
//       //   q.options.D,
//       //   q.answer,
//       //   time
//       // ]);

//       // db.query(sql1, [values], (err, results) => {
//       //   if (err) {
//       //     console.log(err);
//       //     console.error("Error inserting questions into database:", err);
//       //     res
//       //       .status(500)
//       //       .json({ message: "Error inserting questions into database" });
//       //   } else {
//       //     console.log(`${results.affectedRows} questions inserted.`);
//       //     if (results.affectedRows == noq) {
//       //       const selectSql =
//       //         "SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?";
//       //       db.query(selectSql, [uk, uid], (err, data) => {
//       //         if (err) {
//       //           console.error("Error retrieving questions from database:", err);
//       //           res.status(500).json({
//       //             message: "Error retrieving questions from database",
//       //           });
//       //         } else {
//       //           res.status(200).json(data);
//       //         }
//       //       });
//       //     } else {
//       //       res
//       //         .status(500)
//       //         .json({ message: "Mismatch in number of questions inserted" });
//       //     }
//       //   }
//       // });

//       const insertionPromises = questions.map(q => insertQuestion(q, uid, uk, time));

//       await Promise.all(insertionPromises);

      
//       const selectSql =
//           "SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?";
//         db.query(selectSql, [uk, uid], (err, data) => {
//           if (err) {
//             console.error("Error retrieving questions from database:", err);
//             res.status(500).json({
//               message: "Error retrieving questions from database",
//             });
//           } else {
//               res.status(200).json(data);
//           }
//         });
      
      
//     } catch (error) {
//       console.error("Error fetching and inserting questions:", error);
//       res
//         .status(500)
//         .json({ message: "Error retrieving questions from database" });
//     }
//   });
// });

exports.GenerateAptitudeTest = expressAsyncHandler(async (req, res) => {
  const testid = req.params.testid;
  const uid = req.body.uid;

  try {
    // Step 1: Fetch aptitude test details
    const aptitudeSql = "SELECT * FROM aptitude WHERE aid = ?";
    const [aptitudeData] = await new Promise((resolve, reject) => {
      db.query(aptitudeSql, [testid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    console.log(aptitudeData)

    if (aptitudeData.length === 0) {
      return res.status(404).json({ message: "Aptitude test not found" });
    }

    const { aptitudetype, noq, level, time } = aptitudeData;
    const currenttime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const uk = `${uid} ${currenttime}`;

    // Step 2: Insert student_mcq entry
    const studentMcqSql = "INSERT INTO student_mcq (stu_mcq_key, sid, aid) VALUES (?, ?, ?)";
    await new Promise((resolve, reject) => {
      db.query(studentMcqSql, [uk, uid, testid], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    let fetchQuestionsSql = ''
    // Step 3: Fetch random questions for the test
    if(String(aptitudetype).toLowerCase().includes('quant')){
      fetchQuestionsSql = `
      SELECT * FROM mcqs_b
      where user_uid in 
      (select stu_mcq_key from student_mcq where aid in (30,38,40,35,36))
      ORDER BY RAND() 
      LIMIT ?;
    `;
    }
    else{
      fetchQuestionsSql = `
      SELECT * FROM mcqs_b
      where user_uid in 
      (select stu_mcq_key from student_mcq where aid in (31,32,34,37,39))
      ORDER BY RAND() 
      LIMIT ?;
    `;
    }
    
    const questions = await new Promise((resolve, reject) => {
      db.query(fetchQuestionsSql, [Number(noq)], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (questions.length !== Number(noq)) {
      return res.status(500).json({
        message: `Mismatch: Expected ${noq} questions but fetched ${questions.length}.`,
      });
    }

    // Step 4: Insert fetched questions into the student's test
    const insertMcqsSql = `
      INSERT INTO mcqs (question, uid, user_uid, optionA, optionB, optionC, optionD, answer, time_req, sol) 
      VALUES ?;
    `;
    const questionValues = questions.map((q) => [
      q.question,
      uid,
      uk,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.answer,
      time,
      q.sol,
    ]);

    await new Promise((resolve, reject) => {
      db.query(insertMcqsSql, [questionValues], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Step 5: Retrieve inserted questions for response
    const retrieveSql = "SELECT * FROM mcqs WHERE user_uid = ? AND uid = ?";
    db.query(retrieveSql, [uk, uid], (err, data) => {
      if (err) {
        console.error("Error retrieving questions from database:", err);
        return res
          .status(500)
          .json({ message: "Error retrieving questions from database" });
      }
      res.status(200).json(data);
    });
  } catch (error) {
    console.error("Error generating aptitude test:", error);
    res.status(500).json({ message: "Error generating aptitude test" });
  }
});


exports.UserHistory = (req, res) => {
  const uid = req.params.uid;
  const sql = `SELECT DISTINCT 
    s.stu_mcq_key,
    s.sid,
    s.aid,
    a.aptitudetype,
    a.level AS aptitude_level,
    a.noq,
    a.time AS aptitude_time,
    (SELECT COUNT(*) 
     FROM mcqs 
     WHERE user_ans = answer 
       AND user_uid = s.stu_mcq_key) AS correct_answers
FROM 
    student_mcq AS s
INNER JOIN 
    aptitude AS a ON s.aid = a.aid
INNER JOIN 
    mcqs AS m ON s.stu_mcq_key = m.user_uid
WHERE 
    s.sid = ?
ORDER BY 
    s.stu_mcq_key desc`;

  db.query(sql, [uid], (err, results) => {
    if (err) {
      console.error("Error retrieving data from database:", err);
      res.status(500).json({ message: "Error retrieving data from database" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.mcqs = (req, res) => {
  const  mcqkey  = req.params.mcqkey;
  console.log(mcqkey)
  const sql = `SELECT 
    m.*, 
    sd.email_id,
    concat(sd.first_name, " ", sd.last_name) as name,
    sd.clg_id
FROM 
    tpo_final_database.mcqs m
JOIN 
    student_details sd
ON 
    m.user_uid = sd.id
WHERE 
    m.user_uid = ?;`;
  db.query(sql, [mcqkey], (err, results) => {
    if (err) {
      console.error("Error retrieving data from database:", err);
      res.status(500).json({ message: "Error retrieving data from database" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getStudentWithAptitudeTests = (req, res) => {
  const query = `    SELECT sd.id AS studentId, CONCAT(sd.first_name, ' ', sd.last_name) AS name, sd.email_id, sd.clg_id
    FROM student_details sd
    INNER JOIN student_mcq sm ON sd.id = sm.sid
    GROUP BY sd.id;`;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching students with interviews:', err);
        return res.status(500).json({ error: err.message });
      }
  
      if (!results.length) {
        console.log("No student details found.");
        return res.status(404).json({ message: 'No student details found.' });
      }
  
      console.log("Query results:", results);
      res.status(200).json(results);
      // res.status(200).json({results});
      // res.status(200).json(results.data);
    });
}