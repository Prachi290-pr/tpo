const dotenv = require("dotenv");
dotenv.config();
const asyncHand = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const multer = require("multer");
const path = require("path");


exports.getBlackListedStudents = async (req, res) => {
    try {
      const query = 'SELECT clg_id, concat(first_name," ",last_name) as name,blackListedCount FROM student_details WHERE isblacklisted = 1';
      db.query(query,(err,rows)=>{
      
      if(err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching blacklisted students' });
      }
        else{
            res.status(200).json(rows);
        }
      });
    } catch (error) {
      console.error("Error fetching blacklisted students:", error);
      res.status(500).json({ message: 'Error fetching blacklisted students' });
    }
}

// const db = require('../config/db'); // Replace with the path to your db connection
exports.addBlacklisted = (req, res) => {
    const { clgId,blacklistCount } = req.body;
    db.query(
        'UPDATE student_details SET isBlacklisted = 1, blackListedCount = ? WHERE trim(clg_id) = trim(?)',
        [blacklistCount,clgId],
        (err, result) => {
            if (err) {
                console.error('Error blacklisting student:', err);
                res.status(500).json({ success: false, message: 'An error occurred while blacklisting the student.' });
            } else if (result.affectedRows > 0) {
                res.status(200).json({ success: true, message: 'Student blacklisted successfully.' });
            } else {
                res.status(404).json({ success: false, message: 'Student not found.' });
            }
        }
    );
};

exports.removeBlacklisted = (req, res) => {
    const { clgId } = req.body;

    db.query(
        'UPDATE student_details SET isBlacklisted = 0,blackListedCount=0 WHERE clg_id = ?',
        [clgId],
        (err, result) => {
            if (err) {
                console.error('Error unblocking student:', err);
                res.status(500).json({ success: false, message: 'An error occurred while unblocking the student.' });
            } else if (result.affectedRows > 0) {
                res.status(200).json({ success: true, message: 'Student unblocked successfully.' });
            } else {
                res.status(404).json({ success: false, message: 'Student not found.' });
            }
        }
    );
};
