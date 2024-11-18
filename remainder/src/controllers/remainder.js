const { BadRequest } = require('http-errors');
const fetch = require('node-fetch');

const { Remainder, Shop, Product } = require('../services/sequelize');
const ErrorMessages = require('../constants/ErrorMessages');

async function getRemainders({
  PLU, shopId, orderBy = 'productsOnShelf', isAsc = false,
}) {
  const where = {};

  if (PLU) {
    const product = await Product.findOneOrFail({ where: { PLU } });
    where.PLU = product.PLU;
  }

  if (shopId) {
    const shop = await Shop.findOneOrFail({ where: { id: shopId } });
    where.shopId = shop.id;
  }

  const order = [[orderBy, isAsc ? 'ASC' : 'DESC']];

  const remainders = await Remainder.findAll({
    where,
    order,
  });

  return remainders;
}

async function createRemainder({
  shopId, PLU, productsOnShelf, productsInOrder,
}) {
  const [shop, product] = await Promise.all([
    Shop.findOne({ where: { id: shopId } }),
    Product.findOne({ where: { PLU } }),
  ]);

  if (!shop || !product) throw new BadRequest(ErrorMessages.product_or_shop_not_found);

  const existing = await Remainder.findOne({
    where: {
      shopId: shop.id,
      PLU: product.PLU,
    },
  });

  if (existing) {
    throw new BadRequest(ErrorMessages.remainder_alredy_exists);
  }

  const remainder = await Remainder.create({
    shopId: shop.id,
    PLU,
    productsOnShelf,
    productsInOrder,
  });

  try {
    const body = {
      shopId: remainder.shopId,
      PLU: remainder.PLU,
      action: 'CREATE_REMINDER',
    };
    const response = await (await fetch('http://localhost:5001/api/history', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write action history with id ${remainder.id}, error: ${error}`);
  }

  return remainder;
}

async function updateRemainder({ id }, { productsOnShelf, productsInOrder }) {
  const remainder = await Remainder.findOneOrFail({
    where: {
      id,
    },
  });
  if (productsOnShelf >= 0) {
    remainder.productsOnShelf = +productsOnShelf;
  }

  if (productsInOrder >= 0) {
    remainder.productsInOrder = +productsInOrder;
  }

  await remainder.save();

  try {
    const body = {
      shopId: remainder.shopId,
      PLU: remainder.PLU,
      action: 'UPDATE_REMINDER',
    };
    const response = await (await fetch('http://localhost:5001/api/history', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write action history with id ${remainder.id}, error: ${error}`);
  }

  return remainder;
}

module.exports = {
  getRemainders,
  createRemainder,
  updateRemainder,
};
