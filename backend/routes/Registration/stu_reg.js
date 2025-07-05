// import express, { Router } from "express";
// const router =express.Router();
// import {form1, form2, register, upload, uploadFile} from "../controllers/stu_reg.js"
// import multer from "multer";

// // router.post("/",register);
// router.put("/:email",form1);
// router.put("/form2/:email",form2);
// router.put('/upload/:email', upload.single('file'), uploadFile);

// export default router;

const express = require("express");
const router = express.Router();
const {upload} = require("../../controllers/Registration/stu_reg");
const register=require('../../controllers/Registration/register').register;
const form1=require('../../controllers/Registration/register').form1;
const form2=require('../../controllers/Registration/register').form2;
const uploadFile=require('../../controllers/Registration/register').uploadFile;

const multer = require("multer");
const { forgetPass } = require("../../controllers/auth/forgetPass");
const { getRegistartionStatus, toggleRegistrationStatus } = require("../../controllers/auth/startRegi");

router.post("/", register);
router.put("/:email", form1);
router.put("/form2/:email", form2);
router.put('/upload/:email', upload.single('file'), uploadFile);
router.post('/change-password',forgetPass);
router.get('/toggle-registration-status',toggleRegistrationStatus);
router.get('/registrationStatus',getRegistartionStatus);

module.exports = router;
