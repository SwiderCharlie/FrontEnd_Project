<template>
  <div class="toplist clearfix">
    <MainLeft />
    <MainRight />
  </div>
</template>

<script>
import MainLeft from './MainLeft'
import MainRight from './MainRight'

export default {
  name: 'TopList',
  components: { MainLeft, MainRight },
  created() {
    window.addEventListener('load', () => {
      this.$router.replace({
        path: '/home/toplist',
        query: {
          area: undefined,
          type: undefined
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.toplist {
  margin: 0 auto;
  width: 983px;
  border: 1px solid #d3d3d3;
  border-top: none;
  border-bottom: none;
}
</style>
