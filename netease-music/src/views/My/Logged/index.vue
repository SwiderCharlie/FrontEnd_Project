<template>
  <div class="logged clearfix">
    <MainLeft/>
    <router-view></router-view>
  </div>
</template>

<script>
import MainLeft from './MainLeft'

export default {
  name: 'Logged',
  components: { MainLeft }
}
</script>

<style lang="less" scoped>
.logged {
  width: 982px;
  min-height: 900px;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>