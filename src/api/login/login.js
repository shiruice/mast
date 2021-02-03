/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-08-31 09:10:57
 */
import auth from '@/utils/auth'
import request from '@/utils/request'

// 获取Token
export function getToken(data) {
  // console.log(data);
  return request({
    url: '/api/user-service/oauth/token',
    method: 'post',
    headers: {
      'system-tag': 1
    },
    data: data.user,
    unloading: true
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: `/api/shoppe-api-service/mobile/user/detail`,
    method: 'get',
  })
}

// 获取用户权限
export function getUserAuthorities() {
  return request({
    url: `/api/shoppe-api-service/mobile/user/user-common-info`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: `/api/user-service/user/logout`,
    method: 'get',
  })
}

