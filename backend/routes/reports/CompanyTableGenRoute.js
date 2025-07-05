const express = require('express');
const { CompanyTableGen, CompanyTableGenIntern } = require('../../controllers/reports/CompanyTableGenController.js');

const router = express.Router();

router.get('/getcompanygen', CompanyTableGen);
router.get('/getcompanygenIntership', CompanyTableGenIntern);

module.exports = router;
