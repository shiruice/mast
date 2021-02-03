const getters = {
  token: (state) => state.userInfo.token,
  userInfo: (state) => state.userInfo,
  includePages: (state) => state.app.includePages,
  count: (state) => state.shoppingCart.count,
  goodsInfo: (state) => state.afterSales.goodsInfo,
  formInfo: (state) => state.afterSales.formInfo,
  getAddress: (state) => state.afterSales.getAddress,
  sendAddress: (state) => state.afterSales.sendAddress,
};
export default getters;
