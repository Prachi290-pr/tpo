const express = require('express');
const router = express.Router();
const remarkController = require('../controllers/remarkController');

router.get('/confirmed', remarkController.getAllConfirmedRemarks);
router.get('/intership/confirmed', remarkController.IntershipgetAllConfirmedRemarks);
router.get('/all', remarkController.getAllRemarks);
// router.get('/test', remarkController.testQuery);
router.get('/flag', remarkController.getCompaniesWithOldRemarks);

module.exports = router;