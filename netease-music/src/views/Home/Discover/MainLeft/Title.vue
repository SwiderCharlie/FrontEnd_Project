<template>
  <div class="title-content">
    <a href="javascript:;" class="title">{{title}}</a>
    <div class="tab" v-if="showNav">
      <a href="javascript:;">华语</a>
      <span class="line">|</span>
      <a href="javascript:;">流行</a>
      <span class="line">|</span>
      <a href="javascript:;">摇滚</a>
      <span class="line">|</span>
      <a href="javascript:;">民谣</a>
      <span class="line">|</span>
      <a href="javascript:;">电子</a>
      <span class="line">|</span>
    </div>
    <span class="more">
      <a href="javascript:;">更多</a>
      <i class="icn-more"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: [ 'title', 'showNav' ]
}
</script>

<style lang="less" scoped>
.title-content {
  width: 100%;
  height: 33px;
  padding: 0 10px 0 34px;
  background: url('@/assets/images/index.png') no-repeat -225px -156px;
  border-bottom: 2px solid #c10d0c;
  .title {
    float: left;
    font-size: 20px;
    line-height: 28px;
  }
  a {
    color: #666;
  }
  .tab {
    float: left;
    margin: 7px 0 0 20px;
    .line {
      margin: 0 10px;
      color: #ccc;
    }
    a {
      color: #666;
    }
  }
  .more {
    float: right;
    margin-top: 9px;
    .icn-more {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
      background: url('@/assets/images/index.png') 0 -240px;
    }
  }
}
</style>