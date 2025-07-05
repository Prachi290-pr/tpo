const express = require("express");
const { getintership_post } = require("../../controllers/Dashboard/JobPostingCompanies");
const job_postingCompanies = require("../../controllers/Dashboard/JobPostingCompanies").job_postingCompanies;

const router = express.Router();

router.get("/getjobpostingcompanies/:studentId", job_postingCompanies);
router.get("/intership/getjobpostingcompanies/:studentId", getintership_post);

module.exports = router;
