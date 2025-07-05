const express = require("express");
const { getProgrammingLanguages, createPractical, getPracticals, getPracticalById, getPracticalLanguages, Codesubmission, AllSubmissions, AllSubmissionsStudents, UpdateStatus } = require("../../controllers/machineTestController/machineTestController");
const router = express.Router();

router.get('/programming-languages',getProgrammingLanguages);
router.post('/practicals',createPractical);


router.get('/practicals', getPracticals);
router.get('/practicals/:id', getPracticalById);
// router.get('/practicals/course/:courseId', getPracticalByCourse);
// router.put('/practicals/:id', updatePractical);
router.get('/practicals/:id/languages', getPracticalLanguages);

router.post('/submissions',Codesubmission);
router.post('/AllSubmissions',AllSubmissions);
router.post('/AllSubmissionsStudent',AllSubmissionsStudents);
router.post('/updatesStatus',UpdateStatus);

module.exports = router;