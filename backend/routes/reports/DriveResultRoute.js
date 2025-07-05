const express = require("express");
const { PlacedStudents, UnPlacedStudents } = require("../../controllers/reports/DriveResultController.js");

const router = express.Router();

router.get("/getplacedstudents", PlacedStudents);
router.get("/getunplacedstudents", UnPlacedStudents);

module.exports = router;
