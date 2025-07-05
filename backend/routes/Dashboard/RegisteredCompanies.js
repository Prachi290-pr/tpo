const express = require('express');
const router = express.Router();
const RegisteredCompanies = require("../../controllers/Dashboard/RegisteredCompanies");

router.get('/registeredCompanies', RegisteredCompanies);

module.exports = router;
