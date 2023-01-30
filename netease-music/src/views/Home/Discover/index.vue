<template>
  <div>
    <!-- 轮播图 -->
    <Banner/>
    <div class="main">
      <MainLeft/>
      <MainRight/>
    </div>
  </div>
</template>

<script>
import Banner from './Banner'
import MainLeft from './MainLeft'
import MainRight from './MainRight'
export default {
  name: 'Discover',
  components: { Banner, MainLeft, MainRight },
}
</script>

<style lang="less" scoped>
.main {
  width: 982px;
  display: flex;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
}
</style>