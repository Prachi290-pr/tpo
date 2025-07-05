const express = require("express");
const path = require("path");

const router = express.Router();
// const eventMiddleware = require("../middleware/eventMiddleware")
const eventMiddleware = require("../middleware/eventMiddleware")
const eventController = require("../controllers/eventController/eventController")
const userController = require("../controllers/eventController/userController")
const adminController = require("../controllers/eventController/adminController")
const qrCodeController = require("../controllers/eventController/qrCodeController")
const setupController = require("../controllers/eventController/setupController")

//test
const jobPostingController = require("../controllers/jobPostingController");



//event handlersa
router.post('/event', eventController.createEvent)

// router.post('/event', eventMiddleware,eventController.createEvent)
router.get('/event', eventController.getAllEvents)
router.put('/event/:eventId', eventController.updateEvent)
router.delete('/event/:eventId', eventController.deleteEvent) // this delete removes the event permanently
router.delete('/removeEvent/:eventId', eventController.removeEvent) // this movese the event to the event history
router.post('/undoEvent/:eventId', eventController.undoEvent) // this moves the event back to the events tab

//get all events from the table
router.get('/allEvents', eventController.getEventHistory)
//get dead events
router.get('/getDeadEvents', eventController.getDeadEvents)

//event photos upload
router.post('/uploadPhotos/:eventId', eventController.uploadEventPhotos)


// event status
router.get('/eventStatus/:eventId', adminController.getStatus)
//user handlers
router.get('/getEligibleEvents/:student_id', eventController.getEligibleEvents)
router.post('/userEventReg/:event_id', userController.registerForEvent ) //registers the user for a event

//admin handlers
router.get('/getAllRegistrations/:eventId', adminController.getAllRegistrations)
router.get('/getApprovedRegistrations/:eventId', adminController.getApprovedRegistrations)
router.put('/approveStudent/:eventId', adminController.approveStudent)
router.delete('/deleteRegistration/:eventId', adminController.deleteRegistration)
router.put('/markAsAttended', adminController.markAsAttended)
router.get('/getAttendance/:eventId', adminController.getAttendance) //get a particular events attendance list
router.get('/getAllAttendance', adminController.getAllAttendance) //for the all events attendance sheet
router.get('/getStudentDetail/:student_id', adminController.getStudentData)
router.get('/getAllActiveEvents/', adminController.getAllActiveEvents)


//qrcode send handler
router.post('/sendAttendanceQrcode',qrCodeController.sendAttendanceQrcode)
//test routes:


router.get('/event-doc/:folder/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const folder = req.params.folder;
    const filePath = path.join(__dirname, '../public/assets/',folder, fileName);
  
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(404).json({ message: "File not found" });
      }
    });
  });


//event history uploads:
router.post('/uploadSignedLOA/:eventId', eventController.uploadSignedLOA)
router.delete('/deleteSignedLOA/:eventId', eventController.deleteSignedLOA)

router.post('/uploadAttendanceReport/:eventId', eventController.uploadAttendanceReport)
router.delete('/deleteAttendanceReport/:eventId', eventController.deleteAttendanceReport)

router.delete('/deletePhotos/:eventId', eventController.deleteEventPhotos)
router.get('/getFile/:fileName', eventController.downloadEventDoc)

router.get('/getEventById/:eventId', eventController.getAEvent)

router.put('/resetEventAttendance', adminController.resetAllAttendance)

module.exports = router