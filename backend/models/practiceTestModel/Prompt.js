// class Prompt {
//   static findBySubcategory(subcategoryId, callback) {
//     const query = 'SELECT * FROM prompts WHERE subcategory_id = ?';
//     pool.query(query, [subcategoryId], (error, results) => {
//       if (error) return callback(error);
//       if (!results || results.length === 0) {
//         return callback(null, null); // No prompt found
//       }
//       callback(null, results[0]);
//     });
//   }
// }

// module.exports = Prompt;



const pool = require('../../config/dbConfig');

class Prompt {
  static findBySubcategory(subcategoryId, callback) {
    const query = 'SELECT * FROM prompts WHERE subcategory_id = ?';
    pool.query(query, [subcategoryId], (error, results) => {
      if (error) return callback(error);
      if (!results || results.length === 0) {
        return callback(new Error('No prompts found for this subcategory'));
      }
      
      try {
        const prompt = results[0];
        // Ensure parameters is a string before parsing
        if (prompt.parameters && typeof prompt.parameters !== 'string') {
          prompt.parameters = JSON.stringify(prompt.parameters);
        }
        callback(null, prompt);
      } catch (err) {
        callback(err);
      }
    });
  }
}

module.exports = Prompt;