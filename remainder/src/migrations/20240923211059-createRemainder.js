const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('remainders', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      shopId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'shops' },
          key: 'id',
        },
      },
      PLU: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'products' },
          key: 'PLU',
        },
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
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('remainders');
  },
};
