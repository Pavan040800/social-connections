const { Connection, Activity, Notification, User } = require('../models');

exports.create = async (req, res) => {
  const userId = req.user.id;
  const { activity_id } = req.body;

  try {
    const [connection, created] = await Connection.findOrCreate({
      where: { user_id: userId, activity_id }
    });

    if (!created) return res.status(400).json({ message: 'Already connected' });

    // Notify the owner
    const activity = await Activity.findByPk(activity_id);
    if (activity && activity.user_id !== userId) {
      await Notification.create({
        sender_id: userId,
        recipient_id: activity.user_id,
        activity_id,
        message: `User ${userId} connected to your activity.`
      });
    }

    res.status(201).json({ message: 'Connected successfully' });
  } catch (err) {
    console.error('Connection error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getMyConnections = async (req, res) => {
  try {
    const connections = await Connection.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Activity,
          include: [
            {
              model: User,
              as: 'user', // ✅ use the alias you defined in Activity.js
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(connections);
  } catch (err) {
    console.error('Error fetching connections:', err);
    res.status(500).json({ message: 'Server error' });
  }
};