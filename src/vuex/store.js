import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const CHANGE_ACTIVE = "CHANGE_ACTIVE"

const state = {
	toast: false,
    isFooterOne: true,
    title: '',
    show: true,
}

const mutations = {
    [CHANGE_ACTIVE](state) {
    	state.active = !state.active
    	if(state.active) {
    		Toast('夜间模式');
    	}else {
    		Toast('白天模式');
    	}
    },
}

const actions = {
    changeActive: function(context) {
    	context.commit('CHANGE_ACTIVE')
    },
}

const getters = {
	// loading: state => state.loading
}
//导出vuex的实例，其中包含state，mutations，getters，actions

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
