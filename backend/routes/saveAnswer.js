const express = require('express');
const router = express.Router();
const { submitAnswers } = require('../controllers/saveAnswer'); // Adjust the path to your controller file

router.post('/submit-answers', submitAnswers);

module.exports = router;
