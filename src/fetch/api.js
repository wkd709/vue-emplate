import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/vuex/store';
import router from '@/router'
import {storageUtil} from '@/util/storage'

// axios 配置
axios.defaults.timeout = 10000;//请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

// 环境配置
if (process.env.NODE_ENV == 'development') {//本地环境

    axios.defaults.baseURL = 'http://192.168.2.5:4422'

} else if (process.env.NODE_ENV == 'production') {//生产环境

    axios.defaults.baseURL = 'http://www.dev.com/'
}

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // console.log(config);
        // token && (config.headers.Authorization = token);

        if(config.method  === 'post'){
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    error => {
        return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
    res =>{
        if(res.status !== 200){
            return Promise.reject(res);
        }
        return res;
    }, 
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。     
                case 401:
                    router.replace({
                        path: '/login',
                        query: { 
                            redirect: router.currentRoute.fullPath 
                        }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Message({
                        type: 'error',
                        message: '登录过期，请重新登录',
                        duration: 2000,
                    });

                    // 清除token
                    storageUtil.removeSession('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Message({
                        type: 'error',
                        message: '网络请求不存在',
                        duration: 1500,
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        type: 'error',
                        message: error.response.data.message,
                        duration: 1500,
                    });
                    break;
            }
        }
        return Promise.reject(error);
});

/**
 * @param {String} method [请求方法]
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function fetch(method, url, params) {
    return new Promise((resolve, reject) => {
        switch (method){
            case 'post' :
                axios.post(url, params)
                    .then(response => {
                        resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                })
                break;
            case 'get' :
                axios.get(url)
                    .then(response => {
                        resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                })
                break;
            default :
                Message.error('method出错！');
                break;
        }
    })
}

export default {
    /**
     * 首页
     */
    index(params) {
        return fetch('post','/api/JWT/CreateToken', params);
    }
}