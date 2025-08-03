module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    sender_id: DataTypes.INTEGER,
    recipient_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'notifications'
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'sender_id'
    });
    Notification.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipient_id'
    });
    Notification.belongsTo(models.Activity, {
      foreignKey: 'activity_id'
    });
  };

  return Notification;
};
