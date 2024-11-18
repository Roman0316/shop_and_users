const { Router } = require('express');

const wrap = require('../utils/wrap');
const { productController } = require('../controllers/index');

const productRouter = Router();

productRouter.post(
  '/',
  wrap(async (req, res) => {
    const product = await productController.createProduct(req.body);
    res.json(product);
  }),
);

productRouter.get(
  '/',
  wrap(async (req, res) => {
    const product = await productController.getProduct(req.query);
    res.json(product);
  }),
);

module.exports = productRouter;
