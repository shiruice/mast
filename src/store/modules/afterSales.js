const afterSales = {
  state: {
    goodsInfo: {},
    formInfo: {},
    getAddress: {},
    sendAddress: {},
  },
  mutations: {
    SET_GOODSINFO: (state, payload) => {
      state.goodsInfo = payload;
    },
    SET_FORMINFO: (state, payload) => {
      state.formInfo = payload;
    },
    SET_GETADDRESS: (state, payload) => {
      state.getAddress = payload;
    },
    SET_SENDADDRESS: (state, payload) => {
      state.sendAddress = payload;
    },
  },
  actions: {},
};

export default afterSales;
