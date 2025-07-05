const express = require("express");
const CompanywisePlaced = require("../../controllers/reports/CompanywisePLacedController.js");

const router = express.Router();

router.get("/getplacedbycompany", CompanywisePlaced.CompanywisePlaced);

module.exports = router;
