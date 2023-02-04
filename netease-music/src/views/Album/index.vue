<template>
  <div class="album">
    <HomeHeader/>
    <div class="wrap clearfix">
      <MainLeft/>
      <MainRight/>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import MainLeft from './MainLeft'
import MainRight from './MainRight'

export default {
  name: 'Album',
  components: { HomeHeader, MainLeft, MainRight },
  computed:{
    id () {
      return this.$route.query.id
    }
  },

  watch: {
    id() {
      location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.album {
  .wrap {
    width: 982px;
    margin: 0 auto;
    min-height: 900px;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
    background-color: #fff;
  }
}
</style>