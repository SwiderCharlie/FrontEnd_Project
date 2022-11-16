import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name:'首页', redirect: '/login', hidden: true, component: () => import('@/components/Login.vue') },
  { path: '/login', name: 'Login', hidden: true, component: () => import('@/components/Login.vue') },
  { path: '*', name: 'NotFound', hidden: true, component: () => import('@/components/NotFound.vue') },
  {
    path: '/home',
    name: '学生管理',
    iconClass: 'iconfont icon-study-fill',
    redirect: '/home/student',
    component: () => import('@/components/Home.vue'),
    children: [
      { path: '/home/student', name: '学生列表', component: () => import('@/components/students/StudentList.vue') },
      { path: '/home/info', name: '信息列表', component: () => import('@/components/students/InfoList.vue') },
      { path: '/home/infos', name: '信息管理', component: () => import('@/components/students/InfoMent.vue') },
      { path: '/home/work', name: '作业列表', component: () => import('@/components/students/WorkList.vue') },
      { path: '/home/works', name: '作业管理', component: () => import('@/components/students/WorkMent.vue') }
    ]
  },
  {
    path: '/home',
    name: '数据分析',
    iconClass: 'iconfont icon-maps',
    component: () => import('@/components/Home.vue'),
    children: [
      { path: '/home/dataview', name: '数据概览', component: () => import('@/components/dataAnalysis/DataView.vue') },
      { path: '/home/mapview', name: '地图概览', component: () => import('@/components/dataAnalysis/MapView.vue') },
      { path: '/home/travel', name: '旅游地图', component: () => import('@/components/dataAnalysis/TravalMap.vue') },
      { path: '/home/score', name: '分数地图', component: () => import('@/components/dataAnalysis/ScoreMap.vue') }
    ]
  },
  {
    path: '/users',
    name: '用户中心',
    iconClass: 'iconfont icon-user',
    component: () => import('@/components/Home.vue'),
    children: [
      { path: '/users/user', name: '权限管理', iconClass: 'iconfont icon-user', component: () => import('@/components/users/User.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
