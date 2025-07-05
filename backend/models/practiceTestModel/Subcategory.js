// const pool = require('../../config/dbConfig');

// class Subcategory {
//   static async findWithCategory(subcategoryId) {
//     const [rows] = await pool.query(
//       `SELECT s.name as subcategory, c.name as category 
//        FROM subcategories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.id = ?`,
//       [subcategoryId]
//     );
//     return rows[0];
//   }
// }

// module.exports = Subcategory;




const pool = require('../../config/dbConfig');

class Subcategory {
  static findWithCategory(subcategoryId, callback) {
    const query = `
      SELECT s.name as subcategory, c.name as category 
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
      WHERE s.id = ?
    `;
    
    pool.query(query, [subcategoryId], (error, results) => {
      if (error) return callback(error);
      if (!results || results.length === 0) {
        return callback(new Error('Subcategory not found'));
      }
      callback(null, results[0]);
    });
  }
}

module.exports = Subcategory;