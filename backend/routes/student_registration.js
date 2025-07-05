// import express, { Router } from "express";
// const router =express.Router();
// import {form1, form2,  getdata,  getemail,  register, stud_details, upload, uploadFile} from "../../controllers/Profile/student_registration.js";

// router.post("/",register);
// router.put("/:email",form1);
// router.put("/form2/:email",form2);
// router.put('/upload/:email', upload.single('file'), uploadFile);
// router.get('/get-stu-data/:email',stud_details);
// router.post('/getdata/:id',getdata);
// router.post('/getemail/:id',getemail);
// export default router;

const express = require("express");
const router = express.Router();
const {
  form1,
  form2,
  getdata,
  getemail,
  register,
  stud_details,
  upload,
  uploadFile,
} = require("../controllers/student_registration.js");

router.post("/", register);
router.put("/:email", form1);
router.put("/form2/:email", form2);
router.put("/upload/:email", upload.single("file"), uploadFile);
router.get("/get-stu-data/:email", stud_details);
router.post("/getdata/:id", getdata);
router.post("/getemail/:id", getemail);

module.exports = router;
