// // import express, { Router } from "express";
// const express = require("express");
// // import { barchart, getcountofcomformcompanies, getcountofcompanies, register_students, reminder, resetReminder } from "../controller/AdminDashboard.js";
// const {
//     barchart,
//     getcountofcomformcompanies,
//     getcountofcompanies,
//     register_students,
//     reminder,
//     resetReminder
// } = require("../controllers/adminDashboard.js");

// const router = express.Router();

// router.get("/companies",getcountofcompanies);
// router.get("/conformcompanies",getcountofcomformcompanies);

// router.get("/reminder",reminder)
// router.put("/reminder/:id",resetReminder)

// // router.post("/register/students",registerstudents);
// router.get("/register/student",register_students);

// router.get("/barchart-data",barchart);
// // router.put("/:id",EditCompany);

// // router.delete("/delete/:id",DeleteCompany);

// // router.post("/create",AddCompany);

// // router.post("/remark/conform",ConformCompany);


// export default router;


const express = require("express");
const { 
    barchart, 
    getcountofcomformcompanies, 
    getcountofcompanies, 
    register_students, 
    registerstudents, 
    reminder, 
    resetReminder, 
    batchWiseCount,
    interest,
    getDriveDates
} = require('../controllers/adminDashboard');

const router = express.Router();


router.get("/companies",getcountofcompanies);
router.get("/conformcompanies",getcountofcomformcompanies);
router.get('/getDriveDates',getDriveDates);

router.get("/reminder",reminder)
router.put("/reminder/:id",resetReminder)

router.get("/register/students",registerstudents);
router.get("/register/student",register_students);

router.get("/barchart-data",barchart);
router.get("/interest-data",interest);
router.get("/batchWiseChart-data",batchWiseCount);

module.exports = router;