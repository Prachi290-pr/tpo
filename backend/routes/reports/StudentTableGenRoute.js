const express = require("express");
const { StudentTableGen, getTestReportByQuesTitle, getQuesTitle, getAllBatch, getAllInter, getAllBranch, getRegisteredByBatch, getRegisteredByBranch, getRegisteredbyInter, getStudentListAll, getInterViewTitle, getInterViewReportByTitle, getAllTestReportByTitle, getEventsByBatch, getAllTestReportByEventId, StudentTableGenUp } = require("../../controllers/reports/StudentTableGenController");

const router = express.Router();

router.get("/getTestTitle", getQuesTitle);
router.get("/getInterViewTitle", getInterViewTitle);
router.get("/getstudentgen", StudentTableGen);
router.post("/getstudentgen/:branch/:batch", StudentTableGenUp);
router.get("/getAllBranch", getAllBranch);
router.post("/getEventsByBatch", getEventsByBatch);
router.get("/getAllinter", getAllInter);
router.get("/getAallBatch", getAllBatch);
router.post("/getTestReportByTitle", getTestReportByQuesTitle);
router.post("/getInterViewReportByTitle", getInterViewReportByTitle);
router.post("/getStudentListByBatch", getRegisteredByBatch);
router.post("/getStudentListByBranch", getRegisteredByBranch);
router.post("/getStudentListByIinter", getRegisteredbyInter);
router.post("/getStudentListAll", getStudentListAll);
router.post("/getAllTestReportByTitle", getAllTestReportByTitle);
router.post("/getAllTestReportByEventId", getAllTestReportByEventId);

module.exports = router;
