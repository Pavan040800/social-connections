const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No Bearer token provided');
    return res.status(401).json({ message: 'Not authorized - no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('✅ Token verified:', decoded); // Debug
    next();
  } catch (err) {
    console.log('❌ Invalid token:', err.message); // Debug
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
