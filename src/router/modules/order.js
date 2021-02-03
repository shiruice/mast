export default [
    {
        path: '/order',
        name: 'Order',
        meta: {
            title: '订单管理',
            index: 1,y:0
        },
        component:
            () => import('@/views/Order/Order'),
    },
    // {
    //     path: '/examineorder',
    //     name: 'ExamineOrder',
    //     meta: {
    //         title: '订单管理',
    //         index: 3
    //     },
    //     component:
    //         () => import('@/views/Order/ExamineOrder'),
    // },
    {
        path: '/order/orderdetail',
        name: 'OrderDetail',
        meta: {
            title: '订单详情',
            index: 5,y:0
        },
        component:
            () => import('@/views/Order/OrderDetail'),
    },
    {
        path: '/order/queryorder',
        name: 'QueryOrder',
        meta: {
            title: '订单管理',
            index: 1,y:0
        },
        component:
            () => import('@/views/Order/QueryOrder'),
    },
    {
        path: '/order/quirydeteil',
        name: 'QuiryDeteil',
        meta: {
            title: '订单列表',
            index: 1,y:0
        },
        component:
            () => import('@/views/Order/QuiryDeteil'),
    },
    {
        path: '/order/calendar',
        name: 'Calendar',
        meta: {
            title: '订单管理',y:0
        },
        component:
            () => import('@/views/Order/Child/Calendar'),
    },
    {
        path: '/order/logistics',
        name: 'Logistics',
        meta: {
            title: '物流信息',y:0
        },
        component:
            () => import('@/views/Order/Child/Logistics'),
    },

]