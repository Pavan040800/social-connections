const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Register models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.UserHobbies = require('./userHobbies')(sequelize, Sequelize.DataTypes);
db.Activity = require('./Activity')(sequelize, Sequelize.DataTypes);
db.Connection = require('./Connection')(sequelize, Sequelize.DataTypes);
db.Notification = require('./Notification')(sequelize, Sequelize.DataTypes);

// ✅ Automatically run associate() if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ✅ Optional manual fallback for legacy relations
db.User.hasOne(db.UserHobbies, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
db.UserHobbies.belongsTo(db.User, {
  foreignKey: 'user_id'
});

module.exports = db;
