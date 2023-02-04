<template>
  <div class="mainright">
    <!-- Ta的其他热门专辑 -->
    <div class="hot" v-show="albumList.length !== 0">
      <h3>
        <span>Ta的其他热门专辑</span>
        <router-link
          :to="{ path: '/artist/album', query: { id: `${artistId}` } }"
          class="more"
          >全部 ></router-link
        >
      </h3>
      <ul class="list clearfix">
        <li v-for="item in albumList" :key="item.id">
          <div class="cover">
            <router-link :to="{path: '/album', query: {id: `${item.id}`}}" :title="item.name">
              <img v-lazy="item.picUrl" alt="">
            </router-link>
          </div>
          <div class="info">
            <p class=" tit ellipsis">
              <router-link :to="{path: '/album', query: {id: `${item.id}`}}" :title="item.name">{{item.name}}</router-link>
            </p>
            <p class="time">{{toDate(item.publishTime)}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 网易云音乐多端下载 -->
    <div class="download">
      <h3>
        <span>网易云音乐多端下载</span>
      </h3>
      <ul class="bg">
        <li>
          <a href="javascript:;" class="ios"></a>
        </li>
        <li>
          <a href="javascript:;" class="pc"></a>
        </li>
        <li>
          <a href="javascript:;" class="android"></a>
        </li>
      </ul>
      <p>同步歌单，随时畅享320k好音乐</p>
    </div>

    <!-- 用户wiki -->
    <div class="wiki">
      <h3><span>用户wiki</span></h3>
      <a href="javascript:;" class="edit" style="margin-top: -6px">
        <img src="@/assets/images/wiki-edit1.png" alt="" />
        <span>补充或修改艺人资料</span>
      </a>
      <a href="javascript:;" class="edit" style="margin-top: 5px">
        <img src="@/assets/images/wiki-edit2.png" alt="" />
        <span>用户wiki任务中心</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainright',
  data() {
    return {
      albumList: [], // 专辑列表
      artistId: null, // 歌手Id
    }
  },

  computed: {
    // 专辑Id
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
    this.getAlbum()
  },

  methods: {
    // 获取专辑内容
    async getAlbum() {
      let result = await this.$api.reqAlbum(this.id)
      this.artistId = result.album.artist.id
      this.getAlbumList()
    },

    // 获取热门专辑列表
    async getAlbumList() {
      let result = await this.$api.reqArtistAlbums(this.artistId, 5, 0)
      this.albumList = result.hotAlbums
    },

    // 发布日期
    toDate(ms) {
      let date = new Date(ms)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return (
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day)
      )
    },
  },
}
</script>

<style lang="less" scoped>
.mainright {
  float: right;
  width: 270px;
  padding: 20px 40px 40px 30px;
  .hot {
    h3 {
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      span {
        float: left;
      }
      .more {
        float: right;
        font-weight: normal;
        color: #666;
      }
    }
    .list {
      margin-bottom: 25px;
      li {
        float: left;
        width: 200px;
        height: 50px;
        margin-bottom: 15px;
        line-height: 24px;
        .cover {
          float: left;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          margin-left: 60px;
          line-height: 24px;
          .tit {
            width: 140px;
            a {
              color: #000;
            }
          }
          .time {
            width: 140px;
            color: #666;
          }
        }
      }
    }
  }
  .download {
    margin: 20px 0;
    padding-bottom: 20px;
    h3 {
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      span {
        float: left;
        font-size: 12px;
      }
    }
    .bg {
      height: 65px;
      margin-bottom: 10px;
      background: url('@/assets/images/sprite.png') 0 -392px no-repeat;
      li {
        float: left;
        a {
          display: block;
          width: 42px;
          height: 48px;
        }
        .ios {
          &:hover {
            background: url('@/assets/images/sprite.png') 0 -472px no-repeat;
          }
        }
        .pc {
          width: 60px;
          margin: 0 26px 0 30px;
          &:hover {
            background: url('@/assets/images/sprite.png') -72px -472px no-repeat;
          }
        }
        .android {
          &:hover {
            background: url('@/assets/images/sprite.png') -158px -472px
              no-repeat;
          }
        }
      }
    }
    p {
      color: #999;
    }
  }
  .wiki {
    h3 {
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      span {
        float: left;
        font-size: 12px;
      }
    }
    .edit {
      display: block;
      margin-left: -4px;
      line-height: 12px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
