import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/views/frontBundle/index.vue')), 'main-pages')

Vue.use(Router)

export default new Router({
	// mode:'history',
	// base: '/hot/', //加上这一行
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		// {
		// 	path: '*',
		// 	redirect: '/404'
		// }
	]
})