const express = require("express");
const {getRegisteredCompanies, registerStudentInternship, getRegisteredInternshipCompanies } = require("../../controllers/Dashboard/RegisterStudent");
const registerStudent=require('../../controllers/Registration/register').registerStudent
const router = express.Router();

router.post("/setregister", registerStudent);
router.post("/intership/setregister", registerStudentInternship);
router.get('/students/:studentId/registeredcompanies', getRegisteredCompanies);
router.get('/students/internship/:studentId/registeredcompanies', getRegisteredInternshipCompanies);

module.exports = router;
