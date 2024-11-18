const { Router } = require('express');

const wrap = require('../utils/wrap');
const { actionHistoryController } = require('../controllers/index');

const actionHistoryRouter = Router();

actionHistoryRouter.get(
  '/',
  wrap(async (req, res) => {
    const historys = await actionHistoryController.getActionHistorys(req.query);
    res.json(historys);
  }),
);

actionHistoryRouter.post(
  '/',
  wrap(async (req, res) => {
    const history = await actionHistoryController.createActionHistory(req.body);
    res.json(history);
  }),
);

module.exports = actionHistoryRouter;
