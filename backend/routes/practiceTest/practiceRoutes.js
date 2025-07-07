// src/routes/mcqRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById
} = require('../../controllers/practiceTest/categoryController');
const {
  getSubcategoriesByCategory
} = require('../../controllers/practiceTest/subcategoryController');
const {
  getPromptsBySubcategory
} = require('../../controllers/practiceTest/promptController');
const {
  generateTest,
  getUserTests
} = require('../../controllers/practiceTest/testController');

// Categories
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);

// Subcategories
router.get('/categories/:categoryId/subcategories', getSubcategoriesByCategory);

// Prompts
router.get('/subcategories/:subcategoryId/prompts', getPromptsBySubcategory);

// Tests
router.post('/tests/generate', generateTest);
router.get('/users/:userId/tests', getUserTests);

module.exports = router;