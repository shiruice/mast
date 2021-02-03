export default [
  {
    path: "/afterSale",
    name: "afterSale",
    meta: {
      title: "售后",
      index: 0,
      auth:'AfterSales',
      y: 0,
    },
    component: () => import("@/views/AfterSale"),
  },
  {
    path: "/typeSelect",
    name: "typeSelect",
    meta: {
      title: "选择售后类型",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/typeSelect"),
  },
  {
    path: "/returnRequest",
    name: "returnRequest",
    meta: {
      title: "退货申请",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/returnRequest"),
  },
  {
    path: "/exchangeRequest",
    name: "exchangeRequest",
    meta: {
      title: "换货申请",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/exchangeRequest"),
  },
  {
    path: "/afterSalesDetail",
    name: "afterSalesDetail",
    meta: {
      title: "售后详情单",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/afterSalesDetail"),
  },
  {
    path: "/addressEdit",
    name: "addressEdit",
    meta: {
      title: "编辑地址",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/addressEdit"),
  },
  {
    path: "/submitionSuccess",
    name: "submitionSuccess",
    meta: {
      title: "提交成功",
      index: 0,
      y: 0,
    },
    component: () => import("@/views/AfterSale/submitionSuccess"),
  },
  {
    path: "/addAddress",
    name: "addAddress",
    meta: {
      title: "添加地址",
      index: 2,
      y: 0,
    },
    component: () => import("@/views/AfterSale/PushAddlist"),
  },
  {
    path: "/addressDetailEdit",
    name: "addressDetailEdit",
    meta: {
      title: "编辑地址",
      index: 2,
      y: 0,
    },
    component: () => import("@/views/AfterSale/addressDetailEdit"),
  },
];
