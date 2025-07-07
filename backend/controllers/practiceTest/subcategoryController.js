// src/controllers/subcategoryController.js
const Subcategory = require('../../models/practiceTest/subcategoryModel');

class SubcategoryController {
  static getSubcategoriesByCategory(req, res) {
    Subcategory.getByCategoryId(req.params.categoryId, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  }

  static getSubcategoryById(req, res) {
    Subcategory.getById(req.params.id, (err, subcategory) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.json(subcategory);
    });
  }
}

module.exports = SubcategoryController;