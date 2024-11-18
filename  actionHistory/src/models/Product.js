const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Product extends BaseModel {
  static modelName = 'product';

  static tableName = 'products';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    PLU: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  static associate(models) {
    Product.belongsToMany(models.shop, {
      foreignKey: {
        name: 'shopId',
        allowNull: false,
      },
      through: models.remainder,
    });
  }
};
