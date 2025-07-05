const express = require('express');
const router = express.Router();
const { getBlackListedStudents, addBlacklisted, removeBlacklisted } = require('../controllers/blackListController');

// Fetch all blacklisted students
router.get('/blacklisted-students',getBlackListedStudents);
router.post('/add',addBlacklisted);
router.post('/remove',removeBlacklisted);

module.exports = router;