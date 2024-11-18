const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/dotenv');

const {
  Product, Shop, Remainder, ActionHistory,
} = require('../models/index');

const {
  host, user, database, password, port, dialect,
} = dbConfig;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
});

// initialize models
Product.initialize(sequelize);
Shop.initialize(sequelize);
Remainder.initialize(sequelize);
ActionHistory.initialize(sequelize);

// associate models
Shop.associate(sequelize.models);
Product.associate(sequelize.models);
Remainder.associate(sequelize.models);

module.exports = {
  Sequelize,
  sequelize,
  Product,
  Shop,
  Remainder,
  ActionHistory,
};
