export default [
    {
        path: '/cart',
        name: 'Cart',
        meta: {
            title: '购物车',
            index: 0,y:0
        },
        component:
            () => import('@/views/Cart/Cart'),
    },
    {
        path: '/confirmorder',
        name: 'ConfirmOrder',
        meta: {
            title: '确认订单',
            index: 2,y:0
        },
        component:
            () => import('@/views/Cart/ConfirmOrder'),
    },
    {
        path: '/submittedsuccessfully',
        name: 'SubmittedSuccessfully',
        meta: {
            title: '提交成功',
            index: 3,y:0
        },
        component:
            () => import('@/views/Cart/SubmittedSuccessfully'),
    },
    {
        path: '/invoice',
        name: 'Invoice',
        meta: {
            title: '填写发票',
            index: 4,y:0
        },
        component:
            () => import('@/views/Cart/Invoice'),
    },
]