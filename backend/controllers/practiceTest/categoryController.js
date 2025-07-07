// src/controllers/categoryController.js
const Category = require('../../models/practiceTest/categoryModel');

class CategoryController {
  static getAllCategories(req, res) {
    console.log('➡️ Attempting to fetch all categories...'); // Log initiation
    
    Category.getAll((err, results) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      console.log('✅ Retrieved categories:', {
        count: results.length,
        sample: results.length > 0 ? results[0] : 'No categories found'
      });
      
      res.json(results);
    });
  }

  static getCategoryById(req, res) {
    const categoryId = req.params.id;
    console.log(`➡️ Fetching category with ID: ${categoryId}`);
    
    Category.getById(categoryId, (err, category) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!category) {
        console.log(`⚠️ Category not found for ID: ${categoryId}`);
        return res.status(404).json({ error: 'Category not found' });
      }
      
      console.log('✅ Retrieved category:', category);
      res.json(category);
    });
  }
}

module.exports = CategoryController;