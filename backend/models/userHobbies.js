module.exports = (sequelize, DataTypes) => {
  const UserHobbies = sequelize.define('UserHobbies', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    hobby1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hobby2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hobby3: DataTypes.STRING,
    hobby4: DataTypes.STRING,
    hobby5: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'User_hobbies'
  });

  return UserHobbies;
};
