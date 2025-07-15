const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/userHobbiesController');

// GET user's hobbies
router.get('/me', auth, controller.getUserHobbies);

// POST or update 5 hobbies
router.post('/', auth, controller.saveUserHobbies);

module.exports = router;
