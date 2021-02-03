/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-10-10 13:41:58
 */
export default [
    {
        path: '/approval',
        name: 'approval',
        meta: {
            title: '审批列表',
            auth:'OrderReviewList',
            index: 1,y:0
        },
        component:
            () => import('@/views/Approval/list'),
    },
    {
        path: '/approvalDetail',
        name: 'approvalDetail',
        meta: {
            title: '审批详情',
            index: 2,y:0
        },
        component:
            () => import('@/views/Approval/detail'),
    },
    {
        path: '/approvalSearch',
        name: 'approvalSearch',
        meta: {
            title: '搜索',
            index: 1,y:0
        },
        component:
            () => import('@/views/Approval/search'),
    }

]