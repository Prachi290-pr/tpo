// src/models/promptModel.js
const db = require('../../config/dbConfig');

class Prompt {
  static getBySubcategoryId(subcategoryId, difficulty, callback) {
    let query = 'SELECT * FROM prompts WHERE subcategory_id = ?';
    const params = [subcategoryId];
    
    if (difficulty) {
      query += ' AND difficulty_level = ?';
      params.push(difficulty);
    }
    
    db.query(query, params, callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM prompts WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

module.exports = Prompt;