export default [
    {
        path: '/bill',
        name: 'Bill',
        meta: {
            title: '对账单',
            auth:'FinanceStatement',
            index: 1,y:0
        },
        component:
            () => import('@/views/Bill/BillList'),
    },
    {
        path: '/billsearch',
        name: 'BillSearch',
        meta: {
            title: '搜索',
            index: 1,y:0
        },
        component:
            () => import('@/views/Bill/BillSearch'),
    },
    {
        path: '/billdeteil',
        name: 'BillDetail',
        meta: {
            title: '对账单详情',
            index: 1,y:0
        },
        component:
            () => import('@/views/Bill/BillDetail'),
    },
    {
        path: '/billapply',
        name: 'BillApply',
        meta: {
            title: '对账单申请开票',
            index: 1,y:0
        },
        component:
            () => import('@/views/Bill/BillApply'),
    },
    
]