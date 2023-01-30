<template>
  <div class="artist">
    <div class="title"><h3>我的歌手（{{count}}）</h3></div>
    <div class="artist-list">
      <div class="item clearfix" v-for="item in artistList" :key="item.id">
        <a href="javascript:;" class="cover">
          <img v-lazy="item.picUrl" alt="">
        </a>
        <div class="cnt">
          <h4>{{item.name}}</h4>
          <p>{{item.albumSize}}个专辑&nbsp;&nbsp;&nbsp;&nbsp;{{item.mvSize}}个MV</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artist',
  data() {
    return {
      artistList: [],  // 收藏歌手列表
      count: 0  // 收藏歌手个数
    }
  },

  mounted() {
    this.getArtistSublist()  // 获取收藏歌手列表
  },

  methods: {
    // 获取收藏歌手列表
    async getArtistSublist() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqArtistSublist(cookie)
      this.artistList = result.data
      this.count = result.count
    }
  }
}
</script>

<style lang="less" scoped>
.artist {
  margin-left: 239px;
  min-height: 900px;
  width: 741px;
  border-left: 1px solid #d3d3d3;
  padding: 40px;
  background-color: #fff;
  .title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
  }
  .artist-list {
    margin-bottom: 50px;
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      .cover {
        float: left;
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cnt {
        margin-left: 95px;
        h4 {
          height: 21px;
          margin: 10px 0;
          line-height: 24px;
          font-size: 16px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          color: #666;
        }
      }
    }
  }
}
</style>