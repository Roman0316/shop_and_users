const { DataTypes } = require('sequelize');

const BaseModel = require('./BaseModel');

module.exports = class Remainder extends BaseModel {
  static modelName = 'remainder';

  static tableName = 'remainders';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productsOnShelf: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    productsInOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  };

  static associate(models) {
    Remainder.belongsTo(models.product, {
      foreignKey: 'PLU',
      allowNull: false,
      onDelete: 'CASCADE',
    });

    Remainder.belongsTo(models.shop, {
      foreignKey: 'shopId',
      allowNull: true,
      onDelete: 'CASCADE',
    });
  }
};
