const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class ActionHistory extends BaseModel {
  static modelName = 'actionHistory';

  static tableName = 'actionHistorys';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    PLU: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
};
