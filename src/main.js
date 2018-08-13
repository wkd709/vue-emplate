// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import "babel-polyfill";

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
/* eslint-disable no-new */


router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {//如果未匹配到路由
    from.name ? next({ name:from.name }) : next({ path: '/' });//如果上级也未匹配到路由则跳转首页页面，如果上级能匹配到则转上级路由
  } else {
    next();//如果匹配到正确跳转
  }
});


new Vue({
  el: '#app',
  router: router,
  store,
  template: '<App/>',
  components: { App }
})
