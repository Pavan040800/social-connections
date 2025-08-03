const { Activity } = require('../models');

// GET all activities for the logged-in user
exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
    });
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create a new activity
exports.create = async (req, res) => {
  const { activity_text, activity_type, location, activity_time } = req.body;
  try {
    const activity = await Activity.create({
      user_id: req.user.id,
      activity_text,
      activity_type,
      location,
      activity_time,
    });
    res.status(201).json({ message: 'Activity shared successfully', activity });
  } catch (err) {
    console.error('Error creating activity:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update an existing activity
exports.update = async (req, res) => {
  const { activity_text, activity_type, location, activity_time } = req.body;
  try {
    const activity = await Activity.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found or unauthorized' });
    }

    await activity.update({ activity_text, activity_type, location, activity_time });
    res.json({ message: 'Activity updated successfully', activity });
  } catch (err) {
    console.error('Error updating activity:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE remove an activity
exports.remove = async (req, res) => {
  try {
    const deleted = await Activity.destroy({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Activity not found or unauthorized' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error('Error deleting activity:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPublic = async (req, res) => {
  try {
    const { Activity, User } = require('../models');

    const activities = await Activity.findAll({
      include: {
        model: User,
        as: 'user',  // ✅ match alias in Activity.js
        attributes: ['name', 'email'],
      },
      order: [['created_at', 'DESC']],
    });

    res.json(activities);
  } catch (err) {
    console.error('Error fetching public activities:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
