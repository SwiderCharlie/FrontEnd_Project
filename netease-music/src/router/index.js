import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    path: '/my', component: () => import('@/views/My'), redirect: '/my/playlist',
    children: [
      { path: 'artist', component: () => import('@/views/My/Logged/Artist') },
      { path: 'mv', component: () => import('@/views/My/Logged/Mv') },
      { path: 'radio', component: () => import('@/views/My/Logged/DjRadio') },
      { path: 'playlist/:id?', component: () => import('@/views/My/Logged/PlayList') },
    ]
  },
  { path: '/friend', component: () => import('@/views/Friend') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: 'discover', component: () => import('@/views/Home/Discover') },
      { path: 'toplist/:id?', component: () => import('@/views/Home/TopList') },
      { path: 'playlist', component: () => import('@/views/Home/PlayList') },
      { path: 'djradio', component: () => import('@/views/Home/DjRadio') },
      { path: 'artist', component: () => import('@/views/Home/Artist') },
      { path: 'album', component: () => import('@/views/Home/Album') },
    ]
  },
  { path: '/', redirect: '/home/discover'}
]

const router = new VueRouter({
  routes,
  // 切换路由时，将滚动条复位到最顶部和最左侧
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
