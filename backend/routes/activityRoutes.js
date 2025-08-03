const express = require('express');
const router = express.Router();
const controller = require('../controllers/activityController');
const auth = require('../middleware/authMiddleware'); // protect middleware

// All routes require login
router.get('/', auth, controller.getAll);             // Get all user's activities
router.post('/', auth, controller.create);            // Create new activity
router.put('/:id', auth, controller.update);          // Update activity by ID
router.delete('/:id', auth, controller.remove);       // Delete activity by ID
router.get('/public', controller.getAllPublic);

module.exports = router;
