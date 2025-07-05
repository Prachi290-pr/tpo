const express = require('express');
const router = express.Router();
const driveStatusController = require('../controllers/driveStatusController.js');
// import { update,deleteplaced,driveresultplaced,driveresultround2,driveresultround3,driveresultround4,selectedcompanylist,updateplaced, companyvisited, companyname, companyacyear, selecteddrive, driveround2ids,driveround3ids,driveround4ids, driveplacedids } from "../controller/Drivestatus.js";

router.get("/getvisited", driveStatusController.companyvisited);
router.get("/getcompany", driveStatusController.companyname);
router.get("/getyear", driveStatusController.companyacyear);
router.get("/getselectedcomp", driveStatusController.selectedcompanylist);

// router.get("/getstudents/:id",selecteddrive);
router.get("/getstudents/:companyId", driveStatusController.selecteddrive);
router.get("/getround2students/:companyId", driveStatusController.driveresultround2);
router.get("/getround3students/:companyId", driveStatusController.driveresultround3);
router.get("/getround4students/:companyId", driveStatusController.driveresultround4);
router.get("/getplacedstudents/:companyId", driveStatusController.driveresultplaced);
router.get("/getround2ids/:companyId", driveStatusController.driveround2ids);
router.get("/getround3ids/:companyId", driveStatusController.driveround3ids);
router.get("/getround4ids/:companyId", driveStatusController.driveround4ids);
router.get("/getplacedids/:companyId", driveStatusController.driveplacedids);

router.get("/manualStudent/:jobPostingId", driveStatusController.manualStudentAdd);
router.post("/manualStudent/:jobPostingId", driveStatusController.manualStudentAddPost);

router.put("/updatetooneround/:id", driveStatusController.update);
router.put("/addtoplaced/:id", driveStatusController.updateplaced);
router.put("/deletefromplaced/:id", driveStatusController.deleteplaced);
router.put("/updateStatus/:id", driveStatusController.updateStatus);

module.exports = router;