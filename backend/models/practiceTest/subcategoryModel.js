// src/models/subcategoryModel.js
const db = require('../../config/dbConfig');

class Subcategory {
  static getByCategoryId(categoryId, callback) {
    db.query(
      'SELECT * FROM subcategories WHERE category_id = ?', 
      [categoryId],
      callback
    );
  }

  static getById(id, callback) {
    db.query('SELECT * FROM subcategories WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

module.exports = Subcategory;