const express = require('express');
const router = express.Router();
const TestGenerationController = require('../../controllers/practiceTest/testGenerationController');

// Practice test routes
router.get('/categories', TestGenerationController.getCategories);
router.get('/categories/:categoryId/subcategories', TestGenerationController.getSubcategories);
router.get('/subcategories/:subcategoryId/prompt', TestGenerationController.getPrompt);
router.post('/generate-test/:subcategoryId', TestGenerationController.generateTest);

module.exports = router;