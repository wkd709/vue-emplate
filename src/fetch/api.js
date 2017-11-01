import axios from 'axios'
import qs from 'qs'

// import * as _ from '../util/tool'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
//本地环境
axios.defaults.baseURL = 'http://192.168.2.224:8080/'
//生产环境
// axios.defaults.baseURL = 'http://www.dev.com/'

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     Message.error('参数错误');
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status !== 200){
        // Message.error(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // Message.error('异常');
    return Promise.reject(error);
});
var self = this;
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
        return fetch('post','indexData', params);
    }
}