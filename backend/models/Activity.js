module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'Activity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activity_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      activity_type: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      activity_time: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: 'activities',
    }
  );

  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Activity.hasMany(models.Connection, {
      foreignKey: 'activity_id',
      onDelete: 'CASCADE',
    });

    Activity.hasMany(models.Notification, {
      foreignKey: 'activity_id',
      onDelete: 'CASCADE',
    });
  };

  return Activity;
};
