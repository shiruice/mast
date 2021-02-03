/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-10-26 15:59:37
 */
export default [
  {
      path: '/ReportForm',
      name: 'ReportForm',
      meta: {
          title: '采购报表',
          index: 2,y:0
      },
      component:
          () => import('@/views/ReportForm/ReportForm'),
  },
]