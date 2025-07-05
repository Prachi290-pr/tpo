const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController.js');

router.get('/', forumController.getAllForum);
router.get('/:postid', forumController.getAllForumUser);
router.put('/:forumId', forumController.updateForumUser);
router.post('/', forumController.createForum);

module.exports = router;