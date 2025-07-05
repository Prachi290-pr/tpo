const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const remarkController = require('../controllers/remarkController');
const questionController = require('../controllers/questionController');
const jobPostingController = require("../controllers/jobPostingController");

router.get('/getCompaniesWithJobPostings', jobPostingController.getCompaniesWithJobPostings);
router.get('/getCompaniesWithInterPostings', jobPostingController.getCompaniesWithInterPostings);
router.post('/create', companyController.createCompany);
router.get('/getAll', companyController.getAllCompanies);
router.put('/:companyId', companyController.updateCompany);
router.delete('/:companyId', companyController.deleteCompany);
router.get('/:companyId', companyController.getCompanyById);
router.get('/:companyName/years', companyController.getAcademicYearsByCompanyName);
// router.get('/flaggedRemarks', companyController.getCompaniesWithOldRemarks);
// router.get('/test', companyController.testQuery);

router.get('/intership/getAll', companyController.IntershipgetAllCompanies);
router.post('/intership/create', companyController.IntershipcreateCompany);
router.put('/intership/:companyId', companyController.IntershipupdateCompany);
router.get('/intership/:companyId', companyController.IntershipgetCompanyById);
router.get('/intership/:companyName/years', companyController.IntershipgetAcademicYearsByCompanyName);


// Remarks shouldnt be updated 
// Nested remark routes
router.post('/:companyId/remarks', remarkController.createRemark);
router.get('/:companyId/remarks', remarkController.getAllRemarksForEachCompany);
router.get('/:companyId/remarks/:remarkId', remarkController.getRemark);
router.put('/:companyId/remarks/:remarkId', remarkController.updateRemark);
router.delete('/:companyId/remarks/:remarkId', remarkController.deleteRemark);

router.post('/intership/:companyId/remarks', remarkController.IntershipcreateRemark);
router.get('/intership/:companyId/remarks', remarkController.IntershipgetAllRemarksForEachCompany);
router.get('/intership/:companyId/remarks/:remarkId', remarkController.IntershipgetRemark);
router.put('/intership/:companyId/remarks/:remarkId', remarkController.IntershipupdateRemark);
router.delete('/intership/:companyId/remarks/:remarkId', remarkController.IntershipdeleteRemark);

//Nested question routes
router.post('/:companyId/remarks/:remarkId/addQuestions', questionController.addQuestion);
router.get('/:companyId/remarks/:remarkId/getQuestions', questionController.getQuestions);
router.delete('/:companyId/remarks/:remarkId/:questionId', questionController.deleteQuestion);

//Nested JobPosting routes
router.get("/:companyId/job-postings", jobPostingController.getJobPostingsByCompanyId);

module.exports = router;