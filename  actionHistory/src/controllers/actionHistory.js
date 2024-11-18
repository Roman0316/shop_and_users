const { ActionHistory, Shop, Product } = require('../services/sequelize');

async function getActionHistorys({
  shopId, PLU, orderBy = 'createdAt', isAsc = false, limit = 20, offset = 0,
}) {
  const where = {};

  if (shopId) {
    const shop = await Shop.findOneOrFail({ where: { id: shopId } });
    where.shopId = shop.id;
  }
  if (PLU) {
    const product = await Product.findOneOrFail({ where: { PLU } });
    where.PLU = product.PLU;
  }

  const order = [[orderBy, isAsc ? 'ASC' : 'DESC']];

  const historys = await ActionHistory.findAll({
    where,
    order,
    limit,
    offset,
  });
  return historys;
}

async function createActionHistory({ shopId, PLU, action }) {
  return ActionHistory.create({
    shopId,
    PLU,
    action,
  });
}

module.exports = {
  createActionHistory,
  getActionHistorys,
};
