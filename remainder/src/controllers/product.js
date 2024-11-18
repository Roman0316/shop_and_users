const { BadRequest } = require('http-errors');

const { Product } = require('../services/sequelize');
const ErrorMessages = require('../constants/ErrorMessages');

async function createProduct({ PLU, name }) {
  const result = await Product.findOne({ where: { PLU } });
  if (result) throw new BadRequest(ErrorMessages.product_already_exists);
  const product = await Product.create({
    PLU,
    name,
  });

  try {
    const body = {
      PLU: product.PLU,
      action: 'CREATE_PRODUCT',
    };
    const response = await (await fetch('http://localhost:5001/api/history', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })).json();
    // eslint-disable-next-line no-console
    console.log('response', response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write action history with id ${product.PLU}, error: ${error}`);
  }

  return product;
}

async function getProduct({ PLU, name }) {
  const where = {};
  if (PLU) {
    where.PLU = PLU;
  }
  if (name) {
    where.name = name;
  }
  const product = await Product.findOne({ where });
  if (!product) throw new BadRequest(ErrorMessages.product_not_found);
  return product;
}

module.exports = {
  createProduct,
  getProduct,
};
