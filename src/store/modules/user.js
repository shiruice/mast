/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-08-21 13:28:46
 */
import auth from '@/utils/auth';
import Vue from 'vue';
import { getToken, getUserInfo, logout } from '@/api/login/login';
import {
    Toast,
    Notify,
} from 'vant';

Vue.use(Toast);
Vue.use(Notify);
const user = {
    state: {
        token: auth.token,
        userInfo: null
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        getToken({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                getToken(userInfo).then((res) => {
                    if (res.code == '000000'||res.access_token) {
                        const access_token = res.access_token;
                        commit('SET_TOKEN', access_token);
                        auth.token = access_token;
                        resolve(access_token);
                    }else{
                        Toast.fail({
                            message: res.message,
                            className: 'toastClass'
                        });
                    }

                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getUserInfo({ commit }, token) {
            return new Promise((resolve, reject) => {
                getUserInfo(token).then((res) => {
                    commit('SET_USERINFO', res.data);
                    auth.user = res.data;
                    resolve(res);
                }).catch((error) => {
                    auth.token = null
                    reject(error);
                })
            })
        },
        logOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    auth.token = null;
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user;