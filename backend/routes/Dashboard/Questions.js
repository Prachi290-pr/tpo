const express = require("express");
const getQuestions = require("../../controllers/Dashboard/Questions").getQuestions;
const getAnswers = require("../../controllers/Dashboard/Questions").getAnswers;

const router = express.Router();

router.get("/getquestions/:companyId",getQuestions);
router.get("/getanswers/:companyId",getAnswers);

module.exports = router;
