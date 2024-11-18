const { Router } = require('express');

const wrap = require('../utils/wrap');
const { shopController } = require('../controllers/index');

const shopRouter = Router();

shopRouter.post(
  '/',
  wrap(async (req, res) => {
    const shop = await shopController.createShop(req.body);
    res.json(shop);
  }),
);

module.exports = shopRouter;
