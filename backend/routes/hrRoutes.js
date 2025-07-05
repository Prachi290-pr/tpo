const express = require('express');
const router = express.Router();
const HRController = require("../controllers/hrController");

router.get('/hrlist/:companyId', HRController.getHrsByCompanyId);
router.get('/hrlists/allCompany', HRController.getHrsByCompanyAll);
router.post('/addhr', HRController.AddHrs);
router.put('/EditHR/:hrid', HRController.updateHr);
router.get('/test', HRController.testQuery);
router.delete('/:id', HRController.deleteHr);

module.exports = router;