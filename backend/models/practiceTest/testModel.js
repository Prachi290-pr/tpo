// src/models/testModel.js
const db = require('../../config/dbConfig');

class Test {
  static create(userId, subcategoryId, questions, callback) {
    db.query(
      'INSERT INTO generated_tests (user_id, subcategory_id, questions) VALUES (?, ?, ?)',
      [userId, subcategoryId, JSON.stringify(questions)],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
      }
    );
  }

  static getByUserId(userId, callback) {
    db.query(
      'SELECT * FROM generated_tests WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
      callback
    );
  }
}

module.exports = Test;