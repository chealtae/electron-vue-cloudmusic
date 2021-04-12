// 暂时为用到
/*引入Vue框架*/


import Vue from 'vue';
/*引入资源请求插件*/
import axios from 'axios';
import qs from 'qs'
import {
	Message
} from 'element-ui';

// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置请求头
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 配置接口地址
axios.defaults.baseURL = 'http://localhost:8888'
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    config => {
      loadingInstance = Loading.service({
        lock: true,
        text: '数据加载中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      return config
    },
    err => {
      loadingInstance.close()
      Message.error('请求错误')
      return Promise.reject(err)
    }
  )
  // 返回状态判断(添加响应拦截器)
  axios.interceptors.response.use(
    res => {
      if (res.data.code === 200) {
        loadingInstance.close()
        return res
      } else {
        loadingInstance.close()
        Message.error(res.data.msg)
      }
    },
    err => {
      loadingInstance.close()
      Message.error('请求失败，请稍后再试')
      return Promise.reject(err)
    }
  )

  /*使用axios插件*/
Vue.prototype.$axios = axios;