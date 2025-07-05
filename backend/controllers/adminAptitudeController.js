// // import { connection as db } from "../config/dbConfig.js";
// const db = require('../config/dbConfig');

// exports.AptitudeTestGenerate = (req, res) => {
//   const aptitudeType = req.body.aptitudeTypes;
//   const noofquestions = req.body.no;
//   const level = req.body.level;
//   const time = req.body.time;
//   const values = [aptitudeType, level, noofquestions, time];
//   const sql =
//     "insert into aptitude (aptitudetype,level,noq,time) values (?,?,?,?)";
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.log(err);
//       console.error("Error inserting questions into database:", err);
//       res.status(500).json({ message: "Failed to fetch aptitude data" });
//       return;
//     }
//     console.log(`template generated`);
//     res.status(200).json(result);
//   });
// };

// import { connection as db } from "../config/dbConfig.js";
const db = require("../config/dbConfig");

exports.AptitudeTestGenerate = (req, res) => {
  const aptitudeType = req.body.aptitudeTypes;
  const noofquestions = req.body.no;
  const level = req.body.level;
  const time = req.body.time;
  const title = req.body.title;
  const event_id = req.body.event_id;
  const batch = String(req.body.batch).trim();
  const values = [aptitudeType, level, noofquestions, time,title,batch,event_id];
  const sql =
    "insert into aptitude (aptitudetype,level,noq,time,title,batch,event_id) values (?,?,?,?,?,?,?)";
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      console.error("Error inserting questions into database:", err);
      res.status(500).json({ message: "Failed to fetch aptitude data" });
      return;
    }
    console.log(`template generated`);
    res.status(200).json(result);
  });
};
