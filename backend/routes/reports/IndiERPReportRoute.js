const express = require("express");
const {
  ERPDetails,
  ERPRegistered,
  ERPPlaced,
  getEligibleCompaniesCount
} = require("../../controllers/reports/IndiERPReportController.js");

const router = express.Router();

router.get("/geterpdetails", ERPDetails);
router.get("/geterpeligiblecount", getEligibleCompaniesCount);
router.get("/geterpregistered", ERPRegistered);
router.get("/geterpplaced", ERPPlaced);

module.exports = router;
