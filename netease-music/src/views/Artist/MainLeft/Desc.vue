<template>
  <div class="desc">
    <div class="title">
      <h2><i>&nbsp;</i>歌手简介</h2>
    </div>
    <p class="txt">{{desc}}</p>
  </div>
</template>

<script>
export default {
  name: 'Desc',
  data() {
    return {
      desc: '',  // 歌手描述
    }
  },

  computed: {
    id() {
    return this.$route.query.id
    }
  },

  mounted() {
    this.getArtistDesc()
  },

  methods: {
    // 获取歌手描述
    async getArtistDesc() {
      let result = await this.$api.reqArtistDesc(this.id)
      this.desc = result.briefDesc.replace(/\n/g, '')
    }
  }
}
</script>

<style lang="less" scoped>
.desc {
  margin-top: 30px;
  .title {
    h2 {
      margin: 28px 0 8px 0;
      color: #333;
      font-size: 14px;
      i {
        height: 14px;
    width: 3px;
    margin-right: 7px;
    background: #c10d0c;
      }
    }
  }
  .txt {
    line-height: 25px;
    color: #666;
    text-indent: 2em;
  }
}
</style>