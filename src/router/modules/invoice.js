/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-12-31 10:37:30
 */
export default [
    {
        path: '/invoiceadmin',
        name: 'InvoiceAdmin',
        meta: {
            title: '发票管理',
            auth:'InvoiceManagement',
            index: 1,y:0
        },
        component:
            () => import('@/views/Invoice/Invoice'),
    },
    {
        path: '/searchpage',
        name: 'SearchPage',
        meta: {
            title: '搜索',
            index: 1,y:0
        },
        component:
            () => import('@/views/Invoice/SearchPage'),
    },
    {
        path: '/listdetail',
        name: 'ListDetail',
        meta: {
            title: '发票搜索列表',
            index: 1,y:0
        },
        component:
            () => import('@/views/Invoice/ListDetail'),
    },

    {
        path: '/invoicedetail',
        name: 'InvoiceDetail',
        meta: {
            title: '发票详情',
            index: 2,y:0
        },
        component:
            () => import('@/views/Invoice/InvoiceDetail'),
    },
    {
        path: '/invoicetitle',
        name: 'InvoiceTitle',
        meta: {
            title: '发票抬头',
            // auth:'FinanceInvoiceTitle',
            index: 1,y:0
        },
        component:
            () => import('@/views/Invoice/InvoiceTitle'),
    },
    {
        path: '/pushtitle',
        name: 'PushTitle',
        meta: {
            title: '添加发票抬头',
            index: 2,y:0
        },
        component:
            () => import('@/views/Invoice/Child/PushTitle'),
    },
       {
        path: '/editertitle',
        name: 'EditerTitle',
        meta: {
            title: '编辑发票抬头',
            index: 2,y:0
        },
        component:
            () => import('@/views/Invoice/Child/EditerTitle'),
    },
]