const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const restrictTo = require('../middleware/roleMiddleware');

router.get('/profile', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.id}` });
});

router.get('/admin-only', protect, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard access granted' });
});

module.exports = router;
