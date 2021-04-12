import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import './assets/main.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.prototype.$base_url = 'http://localhost:8888';
//默认配置端口
axios.defaults.baseURL='http://localhost:8888/';
Vue.axios = Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
