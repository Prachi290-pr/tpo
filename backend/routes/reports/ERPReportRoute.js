const express = require("express");
const {
  ERPDetails,
  ERPCompanies,
  ERPRegistered,
  ERPPlaced,
  ERPEligibility,
  ERPDetailsApti,
  ERPCompaniesApti,
  ERPEligibilityApti,
  ERPPlacedApti,
  ERPDetailsInter,
  ERPCompaniesInter,
  ERPEligibilityInter,
  ERPPlacedInter,
  ERPCompaniesMachine,
  ERPEligibilityMachine,
  ERPPlacedMachine
} = require("../../controllers/reports/ERPReportController.js");

const router = express.Router();

router.get("/geterpdetails", ERPDetails);
router.get("/geterpdetailsApti", ERPDetailsApti);
router.get("/geterpdetailsInter", ERPDetailsInter);
router.get("/geterpcompanyreport", ERPCompanies);
router.get("/geterpcompanyreportApi", ERPCompaniesApti);
router.get("/geterpcompanyreportInter", ERPCompaniesInter);
router.get("/geterpcompanyreportMachine", ERPCompaniesMachine);
router.get("/geterpeligibility", ERPEligibility);
router.get("/geterpeligibilityApti", ERPEligibilityApti);
router.get("/geterpeligibilityInter", ERPEligibilityInter);
router.get("/geterpeligibilityMachine", ERPEligibilityMachine);
router.get("/geterpregistered", ERPRegistered);
router.get("/geterpplaced", ERPPlaced);
router.get("/geterpplacedApti", ERPPlacedApti);
router.get("/geterpplacedInter", ERPPlacedInter);
router.get("/geterpplacedMachine", ERPPlacedMachine);

module.exports = router;