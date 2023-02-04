<template>
  <div class="mainright">
    <!-- 喜欢这个歌单的人 -->
    <div class="like" v-show="likeList.length !== 0">
      <h3>
              <span>喜欢这个歌单的人</span>
          </h3>
          <ul class="piclist">
              <li v-for="item in likeList" :key="item.id">
                  <a class="f pointer" :title="item.nickname">
                      <img v-lazy="item.avatarUrl">
                  </a>
              </li>
          </ul>
    </div>

    <!-- 热门歌单 -->
    <div class="related" v-show="relatedList.length !== 0">
      <h3>
            <span>热门歌单</span>
        </h3>
        <ul class="rctlist">
            <li v-for="item in relatedList" :key="item.id">
                <div class="cover">
                    <router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">
                        <img v-lazy="item.coverImgUrl">
                    </router-link>
                </div>
                <div class="info">
                    <p class="ellipsis over">
                        <router-link :title="item.name" class="underline" :to="{path:'/playlist',query:{id:`${item.id}`}}">{{item.name}}</router-link>
                    </p>
                    <p class="by over">
                        <span>by</span>
                        <a :title="item.creator.nickname" class="underline">{{item.creator.nickname}}</a>
                    </p>
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
  </div>
</template>

<script>
export default {
  name: 'MainRight',
  data() {
    return {
      likeList: [], // 喜欢这个歌单的用户列表
      relatedList: [], // 相关热门歌单推荐
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  watch: {
    id() {
      this.getPlaylistDetail()
      this.getRelatedPlaylist()
    },
  },

  mounted() {
    this.getPlaylistDetail()
    this.getRelatedPlaylist()
  },

  methods: {
    // 获取喜欢这个歌单的用户列表
    async getPlaylistDetail() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqPlayList(this.id, cookie)
      this.likeList = result.playlist.subscribers
    },

    // 获取推荐歌单
    async getRelatedPlaylist() {
      let result = await this.$api.reqRelatedPlaylist(this.id)
      this.relatedList = result.playlists
    },
  },
}
</script>

<style lang="less" scoped>
.mainright {
  float: right;
  width: 270px;
  padding: 20px 40px 40px 30px;
  .like {
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
      width: 213px;
      height: 131px;
      margin-left: -13px;
      padding-bottom: 25px;
      li {
        float: left;
        display: block;
        width: 53px;
        height: 53px;
        padding: 0 0 13px 13px;
        .f {
          width: 100%;
          height: 100%;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
  .related {
    h3 {
      width: 100%;
      height: 24px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .rctlist {
      width: 100%;
      li {
        display: block;
        width: 100%;
        height: 50px;
        margin-bottom: 15px;
        line-height: 24px;

        .cover {
          width: 50px;
          height: 50px;
          float: left;
          a {
            width: 50px;
            height: 50px;
            img {
              width: 50px;
            }
          }
        }
        .info {
          float: left;
          width: 139px;
          height: 50px;
          margin-left: 10px;
          .thide {
            font-size: 14px;
            a {
              color: #000;
              &:hover {
                color: #000;
              }
            }
          }
          .by {
            span {
              color: #999;
            }
            a {
              margin-left: 5px;
              color: #000;
              &:hover {
                color: #000;
              }
            }
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
            background: url('@/assets/images/sprite.png') -158px -472px no-repeat;
          }
        }
      }
    }
    p {
      color: #999;
    }
  }
}
</style>
