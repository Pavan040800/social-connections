const { User, UserHobbies } = require('../models');

// Save or update user hobbies
exports.saveUserHobbies = async (req, res) => {
  const { hobby1, hobby2, hobby3, hobby4, hobby5 } = req.body;

  if (!hobby1 || !hobby2) {
    return res.status(400).json({ message: 'hobby1 and hobby2 are required' });
  }

  try {
    // Upsert: insert or update based on user_id
    await UserHobbies.upsert({
      user_id: req.user.id,
      hobby1,
      hobby2,
      hobby3: hobby3 || null,
      hobby4: hobby4 || null,
      hobby5: hobby5 || null,
    });

    res.status(201).json({ message: 'Hobbies saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save hobbies', error: err.message });
  }
};

// Get user name and hobbies
exports.getUserHobbies = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['name'] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hobbies = await UserHobbies.findOne({
      where: { user_id: req.user.id },
      attributes: ['hobby1', 'hobby2', 'hobby3', 'hobby4', 'hobby5']
    });

    res.json({
      name: user.name,
      ...(hobbies?.dataValues || {})
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hobbies', error: err.message });
  }
};
