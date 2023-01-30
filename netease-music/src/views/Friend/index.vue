<template>
  <div class="friend">
    <div class="top-line"></div>
    <Logged v-if="cookie"/>
    <NotLogged v-else/>
  </div>
</template>

<script>
import NotLogged from './NotLogged'
import Logged from './Logged'

export default {
  name: 'Friend',
  components: { NotLogged, Logged},
  computed: {
    cookie() {
      return localStorage.getItem('COOKIE')
    }
  }
}
</script>

<style lang="less" scoped>
.friend {
  .top-line {
    height: 5px;
    background-color: #c20c0c;
  }
}
</style>