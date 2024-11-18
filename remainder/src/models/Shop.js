const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Shop extends BaseModel {
  static modelName = 'shop';

  static tableName = 'shops';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  static associate(models) {
    Shop.belongsToMany(models.product, {
      foreignKey: {
        name: 'shopId',
        allowNull: false,
      },
      through: models.remainder,
    });
  }
};
