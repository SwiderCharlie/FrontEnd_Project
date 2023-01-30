<template>
  <div class="my clearfix">
    <div class="top-line"></div>
    <Logged v-if="cookie"/>
    <NotLogged v-else/>
  </div>
</template>

<script>
import NotLogged from './NotLogged'
import Logged from './Logged'

export default {
  name: 'My',
  components: { NotLogged, Logged },
  computed: {
    cookie() {
      return localStorage.getItem('COOKIE')
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  margin-top: 75px;
  .top-line {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    height: 5px;
    background-color: #c20c0c;
    z-index: 100;
  }
}
</style>