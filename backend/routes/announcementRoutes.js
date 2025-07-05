const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController.js');
const { authenticateTokenStudents, authenticateToken } = require('../middleware/authMid.js');

// Route to get all announcements
router.get('/', authenticateTokenStudents,announcementController.getAllAnnouncements);
router.get('/intership', authenticateTokenStudents,announcementController.getAllAnnouncementsIntership);

// Route to insert a new announcement
router.post('/', authenticateToken,announcementController.insertAnnouncement);
router.post('/intership', authenticateToken,announcementController.insertAnnouncementInter);

// Route to update an announcement by ID
router.put('/:id', authenticateToken,announcementController.updateAnnouncement);
router.put('/intership/:id', authenticateToken,announcementController.updateAnnouncementInter);

// Route to delete an announcement by ID
router.delete('/:id', authenticateToken,announcementController.deleteAnnouncement);
router.delete('/intership/:id', authenticateToken,announcementController.deleteAnnouncementInter);

// Route to get company announcements
router.get('/company-announce', authenticateTokenStudents,announcementController.getCompanyAnnouncements);
router.get('/:post_id', authenticateTokenStudents,announcementController.getAnnouncementsByPostId);
router.get('/intership/:post_id', authenticateTokenStudents,announcementController.getAnnouncementsByPostIdInter);

module.exports = router;