const express = require("express");
const { AptitudeTestGenerate } = require("../controllers/adminAptitudeController.js");
const router = express.Router();

router.post("/create", AptitudeTestGenerate);

module.exports = router;
