// src/controllers/promptController.js
const db = require('../../config/dbConfig');

exports.getPromptsBySubcategory = (req, res) => {
  const { subcategoryId } = req.params;
  const { difficulty } = req.query;
  
  let query = 'SELECT * FROM prompts WHERE subcategory_id = ?';
  const params = [subcategoryId];
  
  if (difficulty) {
    query += ' AND difficulty_level = ?';
    params.push(difficulty);
  }
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};