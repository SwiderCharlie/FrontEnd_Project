<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <GotoTop/>
    <Music/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Music from '@/components/Music.vue'
import Footer from '@/components/Footer.vue'
import GotoTop from '@/components/GotoTop.vue'
export default {
  components: { Header, Music, Footer, GotoTop }
}
</script>

<style lang="less">

</style>
