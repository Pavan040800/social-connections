module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define(
    'Connection',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      timestamps: false,
      tableName: 'connections',
    }
  );

  Connection.associate = (models) => {
    Connection.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Connection.belongsTo(models.Activity, {
      foreignKey: 'activity_id',
    });
  };

  return Connection;
};