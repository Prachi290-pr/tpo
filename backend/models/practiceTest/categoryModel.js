// src/models/practiceTest/categoryModel.js
const db = require('../../config/dbConfig');

class Category {
  static getAll(callback) {
    db.query('SELECT * FROM categories', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

module.exports = Category;