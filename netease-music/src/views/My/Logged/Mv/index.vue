<template>
  <div class="mv">
    <div class="title">
      <h3>我的视频（{{count}}）</h3>
    </div>
    <ul class="mv-list clearfix">
      <li v-for="item in mvList" :key="item.vid">
        <div class="cover">
          <img v-lazy="item.coverUrl">
          <p class="playtime">
            <i class="icn"></i>{{item.playTime > 10000? (item.playTime / 10000).toFixed(1)+'万': playTime}}
          </p>
          <p class="duration">{{toTime(item.durationms)}}</p>
        </div>
        <h4 class="tit ellipsis">
          <i class="mv-icn"></i>
          <a href="javascript:;" :title="item.title">{{item.title}}</a>
        </h4>
        <h5 class="artist ellipsis">
          <span v-for="(ar, index) in item.creator" :key="ar.userId">
            <a href="javascript:;" class="ar" :title="ar.userName">{{ar.userName}}</a>
            <span v-if="index < item.creator.length - 1" class="line"> / </span>
          </span>
        </h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Mv',
  data() {
    return {
      mvList: [],  // 收藏MV列表
      count: 0
    }
  },

  mounted() {
    this.getMvList()
  },

  methods: {
    // 获取收藏MV列表
    async getMvList() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqMvSublist(cookie)
      this.mvList = result.data
      this.count = result.count
    },

    // 毫秒转换为mm:ss格式
    toTime(ms) {
      let m = Math.floor(ms / 1000 / 60)
      let s = Math.floor(ms / 1000 - m * 60)
      return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
    },
  }
}
</script>

<style lang="less" scoped>
.mv {
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
  .mv-list {
    margin-left: -8px;
    padding-top: 11px;
    li {
      float: left;
      width: 167px;
      padding: 0 0 25px 8px;
      .cover {
        position: relative;
        width: 159px;
        height: 90px;
        overflow: hidden;
        img {
          width: 100%;
        }
        .playtime {
          position: absolute;
          top: 0;
          right: 0;
          padding-right: 5px;
          width: 90px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-align: right;
          text-shadow: -2px 2px rgba(0, 0, 0, .4);
          background: url('@/assets/images/mask.png') 0 0 no-repeat;
          .icn {
            display: inline-block;
            margin: -2px 2px 0 0;
            width: 15px;
            height: 10px;
            vertical-align: middle;
            background: url('@/assets/images/icons2.png') -60px -310px no-repeat;
          }
        }
        .duration {
          position: absolute;
          bottom: 0;
          left: 0;
          padding-left: 5px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-shadow: -2px 1px rgba(0, 0, 0, .4);
          background: url('@/assets/images/mask.png') 0 -25px no-repeat;
        }
      }
      .tit {
        width: 100%;
        height: auto;
        margin: 7px 0 1px;
        font-size: 14px;
        font-weight: normal;

        .mv-icn {
          display: inline-block;
          margin-right: 4px;
          width: 26px;
          height: 16px;
          vertical-align: middle;
          background: url('@/assets/images/icons2.png') -270px -480px no-repeat;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .artist {
        width: 100%;
        font-weight: normal;
        .ar {
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
        .line {
          color: #666;
        }
      }
    }
  }
}
</style>