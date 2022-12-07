<template>
  <div class="goto-top" @click="gotoTop" v-show="isShow"></div>
</template>

<script>
export default {
  name: 'GotoTop',
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
    // 控制回到顶部按钮的显示和隐藏
    scrollListener() {
      if (window.pageYOffset >= 30) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // 回到顶部
    gotoTop() {
      let timer = requestAnimationFrame(function fn() {
        console.log(window.pageYOffset)
        let top = window.pageYOffset
        if (top > 0) {
          document.documentElement.scrollTop -= top / 10
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    },
  },
}
</script>

<style lang="less">
.goto-top {
  position: fixed;
  left: 50%;
  margin-left: 500px;
  bottom: 160px;
  width: 49px;
  height: 44px;
  background: url('../assets/images/sprite.png') -265px -47px;
  &:hover {
    background-position: -325px -47px;
    cursor: pointer;
  }
}
</style>
