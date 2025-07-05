const express = require("express");
const { RSLCompanies, RSLRegistered, RSLCompaniesIntership, RSLRegisteredIntership } = require('../../controllers/reports/RSLReportController');

const router = express.Router();

router.get("/getcompanies", RSLCompanies);
router.get("/intership/getcompanies", RSLCompaniesIntership);
router.get("/getregistered/:companyId", RSLRegistered);
router.get("/intership/getregistered/:companyId", RSLRegisteredIntership);

module.exports = router;