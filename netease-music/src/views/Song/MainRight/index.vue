<template>
  <div class="mainright">
    <!-- 相似歌曲 -->
    <div class="simi">
      <h3><span>相似歌曲</span></h3>
      <ul class="list">
        <li v-for="item in simiSongs" :key="item.id" class="clearfix">
          <div class="txt">
            <div class="tit ellipsis">
              <router-link
                :to="{ path: '/song', query: { id: `${item.id}` } }"
                :title="item.name"
                >{{ item.name }}</router-link
              >
            </div>
            <div class="artist ellipsis">
              <span v-for="(ar, index) in item.artists" :key="ar.id">
                <router-link
                  :to="{ path: '/artist', query: { id: `${ar.id}` } }"
                  :title="ar.name"
                  >{{ ar.name }}</router-link
                >
                <span v-if="index < item.artists.length - 1">/</span>
              </span>
            </div>
          </div>
          <div class="opr">
            <a href="javascript:;" class="play"></a>
            <a href="javascript:;" class="add"></a>
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
  name: 'MainRight',
  data() {
    return {
      simiSongs: [], // 相似歌曲列表
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
    this.getSimiSongs()
  },

  methods: {
    // 获取相似歌曲
    async getSimiSongs() {
      let result = await this.$api.reqSimiSongs(this.id)
      this.simiSongs = result.songs
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
    h3 {
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgb(204, 204, 204);
      color: rgb(51, 51, 51);
      span {
        float: left;
        font-size: 12px;
      }
    }
    .list {
      li {
        margin-top: 10px;
        .txt {
          float: left;
          width: 156px;
          line-height: 16px;
          .tit {
            a {
              color: rgb(51, 51, 51);
            }
          }
          .artist {
            a {
              color: rgb(153, 153, 153);
            }
          }
        }
        .opr {
          float: right;
          position: relative;
          top: 10px;
          line-height: 32px;
          a {
            float: left;
            width: 10px;
            height: 11px;
            background: url('@/assets/images/icons2.png') no-repeat;
            opacity: 0.9;
          }
          .play {
            margin-right: 16px;
    background-position: -69px -455px;
          }
          .add {
            background-position: -87px -454px;
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
