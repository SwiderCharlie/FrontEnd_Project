<template>
  <div class="home">
    <HomeHeader/>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  name: 'Home',
 components: { HomeHeader },
}
</script>

