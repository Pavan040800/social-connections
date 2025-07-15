const restrictTo = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
  }
  next();
};

module.exports = restrictTo;
