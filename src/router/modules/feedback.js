/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-02 09:41:30
 */
export default [
    {
        path: '/Feedback',
        name: 'Feedback',

        meta: {
            title: '意见反馈',
            index: 1,y:0
        },
        component:
            () => import('@/views/Feedback/Feedback'),
    },

]