const express = require("express");
const GenderwisePlaced = require("../../controllers/reports/GenderwisePlacedController.js").GenderwisePlaced;

const router = express.Router();

router.get("/getplacedbygender", GenderwisePlaced);

module.exports = router;
