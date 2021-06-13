import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home/Home').default,
      children:[
        {
          path: '/findMusic',
          name: 'findMusic',
          component: require('@/components/routerPage/findMusic').default,
          children:[
            {
              path: '/recommend',
              name: 'recommend',
              component: require('@/components/FindMusicContent/recommend').default,
            },
            {
              path: '/playList',
              name: 'playList',
              component: require('@/components/FindMusicContent/playList').default,
            },
            {
              path: '/rank',
              name: 'rank',
              component: require('@/components/FindMusicContent/rank').default,
            },
            {
              path: '/radio',
              name: 'radio',
              component: require('@/components/FindMusicContent/radio').default,
            },
            {
              path: '/singer',
              name: 'singer',
              component: require('@/components/FindMusicContent/singer').default,
            },
            {
              path: '/lastestMusic',
              name: 'lastestMusic',
              component: require('@/components/FindMusicContent/lastestMusic').default,
            },
          ]
        },
        {
          path: '/musicVedio',
          name: 'musicVedio',
          component: require('@/components/routerPage/musicVedio').default
        },
        {
          path: '/friendsCircle',
          name: 'friendsCircle',
          component: require('@/components/routerPage/friendsCircle').default
        },
        {
          path: '/personalFM',
          name: 'personalFM',
          component: require('@/components/routerPage/personalFM').default
        },
        {
          path: '/localMusic',
          name: 'localMusic',
          component: require('@/components/routerPage/localMusic').default
        },
        {
          path: '/download',
          name: 'download',
          component: require('@/components/routerPage/download').default
        },
        {
          path: '/myCloudMusic',
          name: 'myCloudMusic',
          component: require('@/components/routerPage/myCloudMusic').default
        },
        {
          path: '/radioStation',
          name: 'radioStation',
          component: require('@/components/routerPage/radioStation').default
        },
        {
          path: '/myCollect',
          name: 'myCollect',
          component: require('@/components/routerPage/myCollect').default
        },
        {
          path: '/playlistItem',
          name: 'playlistItem',
          component: require('@/components/routerPage/playlistItem').default
        },
        {
          path: '/UserInfo',
          name: 'UserInfo',
          component: require('@/components/routerPage/UserInfo').default
        },
        {
          path: '/editInfo',
          name: 'editInfo',
          component: require('@/components/routerPage/editInfo').default
        },
        {
          path: '/searchResult',
          name: 'searchResult',
          component: require('@/components/routerPage/searchResult').default
        },
        {
          path: '/singerInfo',
          name: 'singerInfo',
          component: require('@/components/routerPage/singerInfo').default
        },
        {
          path: '/editList',
          name: 'editList',
          component: require('@/components/routerPage/editList').default
        },
        {
          path: '/albumListItem',
          name: 'albumListItem',
          component: require('@/components/routerPage/albumListItem').default
        },
        {
          path: '/fansDetail',
          name: 'fansDetail',
          component: require('@/components/routerPage/fansDetail').default
        },
        {
          path: '/followDetail',
          name: 'followDetail',
          component: require('@/components/routerPage/followDetail').default
        },
        {
          path: '/shareDetail',
          name: 'shareDetail',
          component: require('@/components/routerPage/shareDetail').default
        },
    ]
    },
    {
      path: '/playDetails',
      name: 'playDetalis',
      component: require('@/components/Home/playDetails').default
    },
    {
      path: '/LyricsWin',
      name: 'LyricsWin',
      component: require('@/components/Common/LyricsWin').default
    },
    {
      path: '/LoginWin',
      name: 'LoginWin',
      component: require('@/components/Common/login').default
    },
    {
      path: '/LogonWin',
      name: 'LogonWin',
      component: require('@/components/Common/logon').default
    },
    {
      path: '/createListWin',
      name: 'createListWin',
      component: require('@/components/Common/createListWin').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
