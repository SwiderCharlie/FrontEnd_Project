import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/views/Discovery.vue') },
  { path: '/discovery', component: () => import('@/views/Discovery.vue') },
  { path: '/toplist', component: () => import('@/views/TopList.vue') },
  { path: '/playlist', component: () => import('@/views/PlayList.vue') },
  { path: '/djradio', component: () => import('@/views/DJRadio.vue') },
  { path: '/artist', component: () => import('@/views/Artist.vue') },
  { path: '/album', component: () => import('@/views/Album.vue') },
]

const router = new VueRouter({
  routes
})

export default router
