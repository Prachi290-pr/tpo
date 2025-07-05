const express = require('express');
const interviewController = require('../../controllers/interview_old/interviewController.js');

const router = express.Router();

router.get('/test', interviewController.testQuery);
router.get('/getStudentInterviews', interviewController.getStudentsWithInterviews);
router.post('/start', interviewController.startInterview);
router.post('/submit', interviewController.submitInterview);
router.get('/:userId', interviewController.getInterviewHistory);
router.get('/details/:interviewId', interviewController.getInterviewDetails);

module.exports = router;