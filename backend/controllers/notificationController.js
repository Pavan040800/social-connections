const { Notification, Activity, User } = require('../models');

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { recipient_id: req.user.id },
      include: [
        { model: User, as: 'sender', attributes: ['name'] },
        { model: Activity }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    console.error('Fetch notifications failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, {
      where: { id: req.params.id, recipient_id: req.user.id }
    });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, {
      where: { recipient_id: req.user.id }
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
