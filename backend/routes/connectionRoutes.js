const express = require('express');
const router = express.Router();
const controller = require('../controllers/connectionController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, controller.create);
router.get('/mine', auth, controller.getMyConnections);

module.exports = router;
