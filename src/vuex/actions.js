import router from '../router'
import api from '../fetch/api';
import * as _ from '../util/tool'

import {
    GET_TITLE,
} from './mutation-types.js'

export default {
    // 获取用户信息
    getTitle: function(context) {
        context.commit('GET_TITLE', 'index_首页');
    },
}