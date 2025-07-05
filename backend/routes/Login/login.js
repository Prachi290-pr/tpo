const express = require("express");
const login = require("../../controllers/auth/login").login;

const router = express.Router();

router.post("/logedin", login);

module.exports = router;