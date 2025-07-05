const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");

router.get("/", jobPostingController.getAllJobPostings);
router.post("/", jobPostingController.upload, jobPostingController.createJobPosting);
router.get("/:companyId/remark/:remarkId/", jobPostingController.upload, jobPostingController.getJobPostingsByCompanyId);
router.get('/company-name-jobpost', jobPostingController.getCompaniesWithJobPostings);
router.get('/company-name-inter',jobPostingController.getCompaniesWithInterPostings);
router.get("/getjobpostingcompanies/:studentId", jobPostingController.job_postingCompanies);

router.get("/intership", jobPostingController.getAllJobPostings);
router.post("/intership", jobPostingController.upload, jobPostingController.intershipcreateJobPosting);


module.exports = router;