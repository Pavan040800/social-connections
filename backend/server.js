const express = require('express');
const cors = require('cors');
const app = express();
const hobbyRoutes = require('./routes/userHobbies.js');
const db = require('./models');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());


app.use('/api/user/hobbies', hobbyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ Start server after syncing DB
db.sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});
