const express = require('express');
const router = express.Router();
const studentDetailController = require('../controllers/studentDetailController');

router.post('/register', studentDetailController.register);
router.put('/register/form1/:email', studentDetailController.form1);
router.put('/register/form2/:email', studentDetailController.form2);
router.put('/register/upload/:email', studentDetailController.upload, studentDetailController.uploadFile);
router.get('/getAll', studentDetailController.getAllStudents);
router.get('/:studentId', studentDetailController.getStudentById);
router.get("/get-stu-data/:email", studentDetailController.stud_details);
router.post("/getdata/:id", studentDetailController.getdata);
router.post("/getemail/:id", studentDetailController.getemail);

module.exports = router;