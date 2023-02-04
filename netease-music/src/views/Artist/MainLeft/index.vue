<template>
  <div class="mainleft">
    <!-- 歌手封面 -->
    <div class="cover">
      <div class="btm">
        <h2 class="name ellipsis">{{ artistInfo.artist.name }}</h2>
        <h3 class="alias ellipsis" v-if="artistInfo.artist.alias.length">
          {{ artistInfo.artist.alias[0] }}
        </h3>
      </div>
      <div class="image">
        <img :src="artistInfo.artist.cover" alt="" />
      </div>
      <div class="mask"></div>
      <a
        href="javascript:;"
        class="not-subscribe"
        v-show="!isSubscribed"
        @click="subscribe"
      ></a>
      <a
        href="javascript:;"
        class="subscribe"
        v-show="isSubscribed"
        @click="unSubscribe"
      ></a>
    </div>

    <!-- 导航栏 -->
    <ul class="tabs">
      <li :class="[active === 1 ? 'active' : '']">
        <router-link
          :to="{ path: '/artist/song', query: { id: `${id}` } }"
          class="tab-link"
        >
          <em>热门作品</em>
        </router-link>
      </li>
      <li :class="[active === 2 ? 'active' : '']">
        <router-link
          :to="{ path: '/artist/album', query: { id: `${id}` } }"
          class="tab-link"
        >
          <em>所有专辑</em>
        </router-link>
      </li>
      <li :class="[active === 3 ? 'active' : '']">
        <router-link
          :to="{ path: '/artist/mv', query: { id: `${id}` } }"
          class="tab-link"
        >
          <em>相关MV</em>
        </router-link>
      </li>
      <li :class="[active === 4 ? 'active' : '']">
        <router-link
          :to="{ path: '/artist/desc', query: { id: `${id}` } }"
          class="tab-link"
        >
          <em>艺人介绍</em>
        </router-link>
      </li>
    </ul>

    <!-- 导航栏对应子模块内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainLeft',
  data() {
    return {
      artistInfo: {}, // 歌手信息
      active: -1, // 当前所在的tab
      isSubscribed: false, // 是否关注当前歌手
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },

    path() {
      return this.$route.path
    },
  },

  watch: {
    path() {
      if (this.path == '/artist/song') this.active = 1
      if (this.path == '/artist/album') this.active = 2
      if (this.path == '/artist/mv') this.active = 3
      if (this.path == '/artist/desc') this.active = 4
    },
  },

  mounted() {
    this.getArtistDetail() // 获取歌手详情
    // 当前所在导航项
    if (this.path == '/artist/song') this.active = 1
    if (this.path == '/artist/album') this.active = 2
    if (this.path == '/artist/mv') this.active = 3
    if (this.path == '/artist/desc') this.active = 4
    // 判断是否关注当前歌手
    this.isSub()
  },

  methods: {
    // 获取歌手详情
    async getArtistDetail() {
      let result = await this.$api.reqArtistDetail(this.id)
      this.artistInfo = result.data
    },

    // 判断是否关注了当前歌手
    async isSub() {
      let cookie = localStorage.getItem('COOKIE')
      if (cookie) {
        let result = await this.$api.reqArtistSublist(cookie)
        for (let item of result.data) {
          if (item.id == this.id) {
            this.isSubscribed = true
            return
          }
        }
      }
      this.isSubscribed = false
    },

    // 关注当前歌手
    async subscribe() {
      let cookie = localStorage.getItem('COOKIE')
      if (cookie) {
        let result = await this.$api.artistSub(this.id, 1, cookie)
        if (result.code === 200) {
          this.isSubscribed = true
          this.$message.success('收藏成功')
        } else {
          this.$message.error('收藏失败')
        }
      } else {
        this.$bus.$emit('appear')
      }
    },

    // 取消关注当前歌手
    async unSubscribe() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.artistSub(this.id, 2, cookie)
      if (result.code === 200) {
        this.isSubscribed = false
        this.$message.success('取消收藏成功')
      } else {
        this.$message.error('取消收藏失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.mainleft {
  float: left;
  width: 710px;
  border-right: 1px solid #d3d3d3;
  padding: 47px 30px 40px 39px;
  .cover {
    position: relative;
    height: 333px;
    margin-top: -20px;
    .btm {
      .name {
        max-width: 75%;
        float: left;
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
        color: #333;
      }
      .alias {
        float: left;
        max-width: 25%;
        padding-left: 10px;
        font-size: 14px;
        line-height: 32px;
        color: #999;
        font-weight: normal;
      }
    }
    .image {
      width: 640px;
      height: 300px;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        top: -110px;
        width: 100%;
      }
    }
    .mask {
      position: absolute;
      top: 34px;
      left: 0;
      width: 640px;
      height: 300px;
      background: url('@/assets/images/ban_mask.png') no-repeat;
    }
    .subscribe,
    .not-subscribe {
      display: block;
      position: absolute;
      bottom: 18px;
      right: 20px;
      width: 76px;
      height: 32px;
      background: url('@/assets/images/iconall.png') 0 -500px no-repeat;
      &:hover {
        background-position: 0 -540px;
      }
    }
    .subscribe {
      background-position: 0 -735px;
      &:hover {
        background-position: 0 -781px;
      }
    }
  }
  .tabs {
    height: 39px;
    border: 1px solid #ccc;
    border-width: 0 1px;
    background: url('@/assets/images/tab.png') 0 0 repeat-x;
    li {
      float: left;
      height: 39px;
      font-size: 14px;
      position: relative;
      left: -1px;
      &:hover {
        border-top: 2px solid #c20c0c;
        em {
          margin-top: -2px;
        }
      }
      &.active {
        &:hover {
          border-top: 0;
          em {
            margin-top: 0;
          }
        }
        .tab-link {
          background: url('@/assets/images/tab.png') left -90px;
          border-right: 1px solid #ccc;
          margin-right: -1px;
        }
      }
      .tab-link {
        float: left;
        height: 39px;
        font-size: 14px;
        padding-left: 2px;
        em {
          float: left;
          height: 39px;
          width: 136px;
          padding: 2px 2px 0 0;
          line-height: 37px;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
}
</style>
