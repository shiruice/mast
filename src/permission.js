/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2021-01-20 17:29:38
 */
import Vue from 'vue';
import router from './router/index';
import auth from './utils/auth';
import store from './store'
import {
    Toast,
} from 'vant';

const whitelist = ['/login'];
const whitelist1 = ['/privacypolicy'];//隐私政策
const whitelist2 = ['/serviceagreement'];//服务协议

router.beforeEach((to, from, next) => {
    console.log(to, !to.meta.auth, from, 'to, from,')
    let authorities = JSON.parse(window.localStorage.getItem('jurisdiction'))
    if (whitelist.indexOf(to.path) !== -1 || whitelist1.indexOf(to.path) !== -1 || whitelist2.indexOf(to.path) !== -1) {
        next();
    } else {
        if (auth.token) {
            if (!auth.user) {
                store.dispatch('getUserInfo').then((res) => {
                    next()
                }).catch((rej) => {
                    auth.token = null;
                    next({ path: '/login' });
                })
            } else {
                if (!to.meta.auth) {
                    next();
                } else if (to.meta.auth&&authorities[to.meta.auth]) {
                    next();
                } else {
                    Toast.fail({
                        message: '权限不足',
                        className: 'toastClass'
                    });
                }
            }
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }

    }
});