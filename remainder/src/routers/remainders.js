const { Router } = require('express');

const wrap = require('../utils/wrap');
const { remainderController } = require('../controllers/index');

const remainderRouter = Router();

remainderRouter.get(
  '/',
  wrap(async (req, res) => {
    const remainder = await remainderController.getRemainders(req.query);
    res.json(remainder);
  }),
);

remainderRouter.post(
  '/',
  wrap(async (req, res) => {
    const remainder = await remainderController.createRemainder(req.body);
    res.json(remainder);
  }),
);

remainderRouter.patch(
  '/:id',
  wrap(async (req, res) => {
    const remainder = await remainderController.updateRemainder(req.params, req.body);
    res.json(remainder);
  }),
);

module.exports = remainderRouter;
