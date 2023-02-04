import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置
const routes = [
  { path: '/', redirect: '/home/discover' },
  // "发现音乐"页面（主页）
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
  // "我的音乐"页面
  {
    path: '/my', component: () => import('@/views/My'), redirect: '/my/playlist',
    children: [
      { path: 'artist', component: () => import('@/views/My/Logged/Artist') },
      { path: 'mv', component: () => import('@/views/My/Logged/Mv') },
      { path: 'radio', component: () => import('@/views/My/Logged/DjRadio') },
      { path: 'playlist/:id?', component: () => import('@/views/My/Logged/PlayList') },
    ]
  },
  // "关注"页面
  { path: '/friend', component: () => import('@/views/Friend') },
  // 歌单页面
  { path: '/playlist/:id?', component: () => import('@/views/PlayList')},
  // 歌曲页面
  { path: '/song/:id?', component: () => import('@/views/Song') },
  // 歌手页面
  {
    path: '/artist', component: () => import('@/views/Artist'),
    redirect: '/artist/song',
    children: [
      { path: 'song', component: () => import('@/views/Artist/MainLeft/Song.vue') },
      { path: 'album', component: () => import('@/views/Artist/MainLeft/Album.vue') },
      { path: 'mv', component: () => import('@/views/Artist/MainLeft/Mv.vue') },
      { path: 'desc', component: () => import('@/views/Artist/MainLeft/Desc.vue') },
    ]
  },
  // 专辑页面
  { path: '/album/:id?', component: () => import('@/views/Album')}
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
