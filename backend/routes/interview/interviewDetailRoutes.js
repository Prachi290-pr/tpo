const express = require('express');
const interviewDetailController = require("../../controllers/interview_old/interviewDetailController");

const router = express.Router();

router.post('/create', interviewDetailController.createInterviewDetail);
router.get('/get', interviewDetailController.getInterviewDetails);

module.exports = router;
