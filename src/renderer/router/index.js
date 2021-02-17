import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home/BasicLayout').default
    },
    {
      path: '/message',
      name: 'Message',
      component: require('@/components/BasicHeader/Message').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
