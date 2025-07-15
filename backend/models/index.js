const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Register models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.UserHobbies = require('./userHobbies')(sequelize, Sequelize.DataTypes);

// Associations
db.User.hasOne(db.UserHobbies, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

db.UserHobbies.belongsTo(db.User, {
  foreignKey: 'user_id'
});

module.exports = db;
