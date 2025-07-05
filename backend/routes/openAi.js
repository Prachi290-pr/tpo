const express = require("express");
const { Router } = express;
const { 
  ans, 
  aptitudeTest, 
  GenerateAptitudeTest, 
  mcqs, 
  UserHistory,
  updateans,
  submittest,
  getStudentWithAptitudeTests
} = require("../controllers/openAiController");

const router = express.Router();

// router.post("/create/:uid",verbal);
router.get("/getStudentsWithAptitude", getStudentWithAptitudeTests);
router.post("/updateAnswer/:questionId", updateans);
router.post("/submitTestAnswers", submittest);
router.post("/ans", ans);
router.get("/aptitude", aptitudeTest);
router.post("/aptitude-test/:testid", GenerateAptitudeTest);
router.post("/history/:uid", UserHistory);
router.post("/result/:mcqkey", mcqs);

module.exports = router;
