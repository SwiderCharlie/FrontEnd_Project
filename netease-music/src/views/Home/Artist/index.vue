<template>
  <div class="artist clearfix">
    <MainLeft/>
    <MainRight/>
  </div>
</template>

<script>
import MainLeft from './MainLeft'
import MainRight from './MainRight'

export default {
  name: 'Artist',
  components: { MainLeft, MainRight},
  created() {
    window.addEventListener('load', () => {
      this.$router.replace({
        path: '/home/artist',
        query: {
          area: undefined,
          type: undefined
        }
      })
    })
  }
}
</script>

<style lang='less' scoped>
.artist {
  width: 982px;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>