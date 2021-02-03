/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-02 09:41:30
 */
export default [
    {
        path: '/',
        name: 'Home',

        meta: {
            title: '商城',
            // auth: '',
            index: 0, y: 0
        },
        component:
            () => import('@/views/Home/Home'),
    },
    {
        path: '/activitypage',
        name: 'ActivityPage',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPage'),
    },
    {
        path: '/activitypaget',
        name: 'ActivityPageT',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPageT'),
    },
    {
        path: '/activitypagetwo',
        name: 'ActivityPageTwo',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPageTwo'),
    },
    {
        path: '/activitypagethree',
        name: 'ActivityPagethree',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPagethree'),
    },
    {
        path: '/activitypageone',
        name: 'ActivityPageOne',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPageOne'),
    },
    {
        path: '/activity',
        name: 'Activity',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/Activity'),
    },
    {
        path: '/activitypagefour',
        name: 'ActivityPageFour',

        meta: {
            title: '商城活动',
            index: 1, y: 0
        },
        component:
            () => import('@/views/Home/ActivityPageFour'),
    },

]