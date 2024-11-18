const { BadRequest } = require('http-errors');

const { Shop } = require('../services/sequelize');
const ErrorMessages = require('../constants/ErrorMessages');

async function createShop({ name, adress }) {
  const result = await Shop.findOne({ where: { name } });
  if (result) throw new BadRequest(ErrorMessages.shop_already_exists);
  return Shop.create({
    name,
    adress,
  });
}

module.exports = {
  createShop,
};
