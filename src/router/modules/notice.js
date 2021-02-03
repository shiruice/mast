/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-02 09:41:30
 */
export default [
    {
        path: '/NoticDetails',
        name: 'NoticDetails',

        meta: {
            title: '公告详情',
            index: 1,y:0
        },
        component:
            () => import('@/views/Notice/NoticDetails'),
    },
    {
        path: '/NoticList',
        name: 'NoticList',

        meta: {
            title: '公告列表',
            index: 1,y:0
        },
        component:
            () => import('@/views/Notice/NoticList'),
    },
    {
        path: '/QueryNotice',
        name: 'QueryNotice',
        meta: {
            title: '公告搜索',
            index: 1,y:0
        },
        component:
            () => import('@/views/Notice/QueryNotice'),
    },
    {
        path: '/SearchNoticList',
        name: 'SearchNoticList',
        meta: {
            title: '搜索结果',
            index: 1,y:0
        },
        component:
            () => import('@/views/Notice/SearchNoticList'),
    },

]