<template>
  <div class="mainright">
    <!-- 相似歌手 -->
    <div class="simi" v-if="simiArtists.length > 0">
      <h3><span>相似歌手</span></h3>
      <ul class="piclist clearfix">
        <li v-for="item in simiArtists" :key="item.id">
          <div class="hd">
            <router-link :to="{query:{id:`${item.id}`}}">
              <img v-lazy="item.img1v1Url" alt="">
            </router-link>
          </div>
          <p class="ellipsis">
            <router-link :to="{query:{id:`${item.id}`}}">{{item.name}}</router-link>
          </p>
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
  name: 'MainRight',
  data() {
    return {
      simiArtists: [], // 相似歌手列表
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
      this.getSimiArtist()
  },

  methods: {
    // 获取相似歌手
    async getSimiArtist() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqSimiArtist(this.id, cookie)
      this.simiArtists = result.artists.slice(0, 6)
    },
  },
}
</script>

<style lang="less" scoped>
.mainright {
  float: right;
  width: 270px;
  padding: 20px 40px 40px 30px;
  .simi {
    width: 100%;
    h3 {
      width: 100%;
      height: 24px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .piclist {
      margin-left: -25px;
      li {
        float: left;
        width: 75px;
        height: 92px;
        padding-left: 25px;
        .hd {
          width: 50px;
          height: 50px;
          a {
            display: block;
            height: 100%;
            width: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        p {
          margin-top: 7px;
          text-align: center;
          a:hover {
            text-decoration: underline;
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
