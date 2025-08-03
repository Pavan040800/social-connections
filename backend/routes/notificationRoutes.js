const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, controller.getUserNotifications);
router.put('/read/:id', auth, controller.markAsRead);
router.put('/read-all', auth, controller.markAllAsRead);

module.exports = router;
