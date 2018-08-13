import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'


const state = {
    token: '1',
    title: '',
}


//导出vuex的实例，其中包含state，mutations，getters，actions

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
