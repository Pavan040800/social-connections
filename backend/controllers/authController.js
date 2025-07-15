const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  res.status(201).json({
    id: user.id,
    name: user.name,
    role: user.role,
    token: generateToken(user),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    id: user.id,
    name: user.name,
    role: user.role,
    token: generateToken(user),
  });
};

