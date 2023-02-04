<template>
  <div id="app">
    <!-- 头部导航 -->
    <Header />
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 返回顶部组件 -->
    <GoTop />
    <!-- 音乐播放器组件 -->
    <Music />
    <!-- 底部组件 -->
    <Footer v-show="isShowFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import GoTop from '@/components/GoTop.vue'
import Music from '@/components/Music.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: { Header, GoTop, Music, Footer },
  data() {
    return {
      isShowFooter: true
    }
  },

  computed: {
    path() {
      return this.$route.path
    }
  },

  watch: {
    path() {
      if (this.$route.path.indexOf('/my') !== -1 && localStorage.getItem('COOKIE')) this.isShowFooter = false
      else this.isShowFooter = true
    }
  }
}
</script>