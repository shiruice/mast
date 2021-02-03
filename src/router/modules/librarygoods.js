/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2021-01-28 09:12:12
 */
export default [
    {
        path: '/librarygoods',
        name: 'LibraryGoods',
        meta: {
            title: '商城',
            index: 0,y:0
        },
        component:
            () => import('@/views/LibraryGoods/LibraryGoods'),
    },
    {
        path: '/productlist',
        name: 'ProductList',
        meta: {
            title: '商品列表',
            index: 2,y:0
        },
        component:
            () => import('@/views/LibraryGoods/ProductList'),
    },
    {
        path: '/morelist',
        name: 'MoreList',
        meta: {
            title: '商品列表',
            index: 2,y:0
        },
        component:
            () => import('@/views/LibraryGoods/MoreList'),
    },
    {
        path: '/productdetails',
        name: 'ProductDetails',
        meta: {
            title: '商品详情',
            index: 9,y:0
        },
        component:
            () => import('@/views/LibraryGoods/ProductDetails'),
    },
    {
        path: '/queryLibrarygoods',
        name: 'QueryLibrarygoods',
        meta: {
            title: '商品搜索',
            index: 4,y:0
        },
        component:
            () => import('@/views/LibraryGoods/QueryLibrarygoods'),
    },
    {
        path: '/history',
        name: 'History',
        meta: {
            title: '商品搜索',
            index: 5,y:0
        },
        component:
            () => import('@/views/LibraryGoods/History'),
    },
]