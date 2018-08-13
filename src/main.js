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


router.beforeEach((to, from, next) => {//to 正要去的路由 from正要离开的路由
  if (to.matched.length === 0) {//如果未匹配到路由
    from.name ? next({ path: from.fullPath }) : next({ path: '/' });
  } else {//如果匹配到正确跳转
    next();
  }
});


new Vue({
  el: '#app',
  router: router,
  store,
  template: '<App/>',
  components: { App }
})
