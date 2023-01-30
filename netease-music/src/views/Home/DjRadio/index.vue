<template>
  <div class="dj-radio">
    <!-- 电台分类 -->
    <Category/>
    <!-- 推荐页面 -->
    <Recommend v-if="!isDetail"/>
    <!-- 详情页面 -->
    <Detail v-else/>
  </div>
</template>

<script>
import Category from './Category'
import Recommend from './Recommend'
import Detail from './Detail'

export default {
  name: 'DjRadio',
  components: { Category, Recommend, Detail },
  data() {
    return {
      isDetail: false  // 是否是详情页面
    }
  },

  computed: {
    // 获取电台分类ID
    id () {
      return this.$route.query.id
    } 
  },

  watch: {
    id() {
      if(this.$route.query.id != undefined) {
        this.isDetail = true
      } else {
        this.isDetail = false
      }
    }
  },

  mounted() {
    if (this.$route.query.id != undefined) {
      this.isDetail = true
    }
  }

}
</script>

<style lang="less" scoped>
.dj-radio {
  width: 982px;
  padding: 40px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

}
</style>