<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="pageNo===1" @click="$emit('getPageNo', pageNo - 1)" class="prev-page">上一页</button>

    <!-- 页码 -->
    <button v-if="startAndEndPage.start > 1" @click="$emit('getPageNo',1)" class="page">1</button>
    <span v-if="startAndEndPage.start > 2" class="point">...</span>

    <button class="page" v-for="(page, index) in parseInt(startAndEndPage.end)" :key="index" v-show="page >= startAndEndPage.start" :class="{active:isPage(page)}" @click="$emit('getPageNo',page)">{{page}}</button>

    <span v-if="startAndEndPage.end < tolPage-1" class="point">...</span>
    <button v-if="startAndEndPage.end < tolPage" @click="$emit('getPageNo',tolPage)" class="page">{{tolPage}}</button>

    <!-- 下一页 -->
    <button :disabled="pageNo===tolPage" @click="$emit('getPageNo', pageNo + 1)" class="next-page">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],

  computed: {
    // 评论总页数
    tolPage() {
      return Math.ceil(this.total / this.pageSize)
    },

    // 展示按钮的起始和终止页序号
    startAndEndPage() {
      let start = Math.max(1, this.pageNo - Math.floor(this.continues / 2))
      let end = Math.min(this.tolPage, this.pageNo + Math.floor(this.continues / 2))
      if (end - start < this.continues) {
        if (start === 1) {
          end = Math.min(Math.max(end, start + this.continues), this.tolPage)
        } else if (end === this.tolPage) {
          start = Math.max(1, Math.min(end - this.continues, start))
        }
      }
      return { start, end }
    }
  },

  methods: {
    // 判断是否是当前页面
    isPage(page) {  
      return page === this.pageNo
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin: 20px 0;
  text-align: center;
  .prev-page, .next-page {
    display: inline-block;
    width: 69px;
    height: 24px;
    line-height: 24px;
    padding-left: 22px;
    margin: 0 1px 0 2px;
    color: #333;
    text-align: left;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: url('@/assets/images/button.png') 0 -560px no-repeat;
    vertical-align: middle;
    &[disabled] {
      background-position: 0 -620px;
      color: #cacaca;
      cursor: default;
    }
    &:hover {
      background-position: 0 -590px;
    }
  }
  .next-page {
    padding: 0;
    padding-left: 10px;
    background-position: -75px -560px;
    &[disabled] {
      background-position: -75px -620px;
    }
    &:hover {
      background-position: -75px -590px;
    }
  }
  .page {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    padding: 0 8px;
    margin: 0 1px 0 2px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: #fff;
    vertical-align: middle;
    &:hover {
      border-color: #000;
    }
    &.active {
      background: url('@/assets/images/button.png') 0 -650px no-repeat;
      border-color: #a2161b;
      color: #fff;
      cursor: default;
    }
  }
}
</style>