import axios from 'axios'
import store from '../store/index'
import auth from '@/utils/auth'
import router from '@/router'
import sign from "@/utils/sign";
import Vue from 'vue';
import {
    Toast,
    Notify,
} from 'vant';

Vue.use(Toast);
Vue.use(Notify);
// 创建axios实例
const service = axios.create({
    timeout: 15000
})

service.all = axios.all;
service.spread = axios.spread;
let apiHost = process.env.VUE_APP_BASE_API;
console.log("api:", apiHost);

function getNewToken() {

}


// request 拦截器
service.interceptors.request.use(
    config => {
        sign.creatSign(config);
        if (auth.token) {
            config.headers['Authorization'] = "Bearer " + auth.token // 让每个请求携带自定义token 请根据实际情况自行修改
        } else {
            config.headers['Authorization'] = "Basic V0VCQVBQOldFQkFQUA=="
        }
        !config.unloading && store.commit("loading", true)
        // console.log(config.unloading,config, 'config')
        //    !config.unloading
        if (auth.os.lxapp) {
            if (config.url.indexOf("version/latest") > 0) {
                config.headers['Authorization'] = "";
            }
            else if (config.url.indexOf("oauth/token") > 0) {//app端登录状态失效设为15天
                config.headers['Authorization'] = "Basic QU5EUk9JRDpBTkRST0lE";
            }
            config.url = apiHost + config.url
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        store.commit("loading", false)
        if (res.code) {
            if (res.code != '000000' && res.code != '000000000' && /^98/.test(res.code) && !response.config.exception) { //自定义异常处理不走默认异常处理

                Toast.fail({
                    message: err.response.data.message.split(":")[1],
                    className: 'toastClass'
                });

                return response.data
            } else {
                return response.data
            }
        } else {
            return response.data
        }
    },
    error => {
        // debugger;
        //98开头的code吗 或者 自定义异常处理不走默认异常处理 010090066的code是参数模板状态发生变化的状态码
        store.commit("loading", false)
        if (error.response == undefined) {
            Toast.fail({
                message: '网络不佳，请重试',
                className: 'toastClass'
            });
            return;
        }
        if ((error.response.data && /^98/.test(error.response.data.code)) || (error.response.config && error.response.config.exception)) {
            return error.response.data;
        }
        if (error.response.data && /^999999/.test(error.response.data.code)) {
            Toast.fail({
                message: '服务器异常，请稍后重试',
                className: 'toastClass'
            });
            return error.response.data;

        }
        const {
            status
        } = error.response
        if (status == 401) {
            // getNewToken(error.response.config);
            router.push('/login')
        }
        // getNewToken(error.response.config);
        // Notify({ message: error.response.data.message, className: 'allNotify', duration: 1000 });
        // Toast(error.response.data.message);
        Toast.fail({
            message: error.response.data.message,
            className: 'toastClass'
        });
        return Promise.reject(error)

    }
)


export function getFunction(url, unloading) {
    return service({
        url: url,
        method: 'get',
        unloading: unloading
    })
}
export function postFunction(url, data, unloading) {
    return service({
        url: url,
        method: 'post',
        data: data,
        unloading: unloading
    })
}
export function putFunction(url, data) {
    return service({
        url: url,
        method: 'put',
        data: data
    })
}
export function deleteFunction(url, data) {
    return service({
        url: url,
        method: 'delete',
        data: data
    })
}

export function putParamsFunction(url, data, unloading) {
    return service({
        url: url,
        method: 'put',
        params: data,
        unloading: unloading

    })
}

export default service