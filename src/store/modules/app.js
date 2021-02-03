const app = {
  state: {
    includePages: ["Home", "Cart", "User", "LibraryGoods"],
    dataListHeight: 667,
  },
  mutations: {
    ADD_INCLUDE_PAGE: (state, page) => {
      state.includePages.push(page);
    },
    DEL_INCLUDE_PAGE: (state, page) => {
      let index;
      state.includePages.forEach((item, i) => {
        if (item == page) {
          index = i;
        }
      });
      state.includePages.splice(index, 1);
    },
    SET_DATALISTHEIGHT: (state, h) => {
      state.dataListHeight = h - 150;
    },
  },
  actions: {},
};

export default app;
