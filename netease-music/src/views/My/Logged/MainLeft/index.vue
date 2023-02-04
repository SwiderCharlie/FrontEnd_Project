<template>
  <div class="mainleft">
    <div class="container">
      <!-- 我的歌手 -->
      <h2
        class="tit"
        @click="gotoArtist"
        :class="[$route.path === '/my/artist' ? 'selected' : '']"
      >
        我的歌手（{{ artistCount }}）
      </h2>

      <!-- 我的视频 -->
      <h2
        class="tit"
        @click="gotoMv"
        :class="[$route.path === '/my/mv' ? 'selected' : '']"
      >
        我的视频（{{ mvCount }}）
      </h2>

      <!-- 我的电台 -->
      <h2
        class="tit"
        @click="gotoRadio"
        :class="[$route.path === '/my/radio' ? 'selected' : '']"
      >
        我的电台（{{ radioCount }}）
      </h2>

      <!-- 创建的歌单 -->
      <div class="playlist">
        <h2>
          <a href="javascript:;" class="create"><i>新建</i></a>
          <span class="title">
            <i
              class="hide-tri"
              v-show="!isShowCreatedPlaylist"
              @click="isShowCreatedPlaylist = !isShowCreatedPlaylist"
            ></i
            ><i
              class="show-tri"
              v-show="isShowCreatedPlaylist"
              @click="isShowCreatedPlaylist = !isShowCreatedPlaylist"
            ></i
            >创建的歌单（{{ createdPlaylistCount }}）
          </span>
        </h2>

        <ul v-show="isShowCreatedPlaylist">
          <li
            v-for="(item, index) in createdPlaylists"
            :key="item.id"
            @click="gotoPlaylist(item.id)"
            :class="[
              $route.query.id && $route.query.id == item.id ? 'selected' : '',
            ]"
          >
            <a href="javascript:;" class="atar">
              <img v-lazy="item.coverImgUrl" alt="" />
            </a>
            <div class="cnt">
              <p class="name ellipsis" v-if="index === 0">我喜欢的音乐</p>
              <p class="name ellipsis" v-else>{{ item.name }}</p>
              <p class="info">{{ item.trackCount }}首</p>
            </div>
            <div class="btns" v-if="index > 0">
              <a href="javascript:;" class="edit-icon"></a>
              <a href="javascript:;" class="del-icon"></a>
            </div>
          </li>
        </ul>
      </div>

      <!-- 收藏的歌单 -->
      <div class="playlist">
        <h2>
          <span class="title">
            <i
              class="hide-tri"
              v-show="!isShowSubPlaylist"
              @click="isShowSubPlaylist = !isShowSubPlaylist"
            ></i
            ><i
              class="show-tri"
              v-show="isShowSubPlaylist"
              @click="isShowSubPlaylist = !isShowSubPlaylist"
            ></i
            >收藏的歌单（{{ subPlaylistCount }}）
          </span>
        </h2>

        <ul v-show="isShowSubPlaylist">
          <li
            v-for="item in subPlaylists"
            :key="item.id"
            @click="gotoPlaylist(item.id)"
            :class="[
              $route.query.id && $route.query.id == item.id ? 'selected' : '',
            ]"
          >
            <a href="javascript:;" class="atar">
              <img v-lazy="item.coverImgUrl" alt="" />
            </a>
            <div class="cnt">
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="info">
                {{ item.trackCount }}首 by {{ item.creator.nickname }}
              </p>
            </div>
            <div class="btns">
              <a
                href="javascript:;"
                class="del-icon"
                @click.stop="unsubscribe(item.id)"
              ></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeft',
  data() {
    return {
      artistCount: 0, // 收藏歌手数量
      mvCount: 0, // 收藏mv数量
      radioCount: 0, // 收藏电台数量
      createdPlaylistCount: 0, // 创建歌单数量
      createdPlaylists: [], // 创建歌单列表
      subPlaylistCount: 0, // 收藏歌单数量
      subPlaylists: [], // 收藏歌单列表
      isShowCreatedPlaylist: true, // 是否展开创建的歌单列表
      isShowSubPlaylist: true, // 是否展开收藏的歌单列表
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
    this.getSubCount()
    this.getUserPlaylist()
  },

  methods: {
    // 获取收藏歌手、mv、电台、歌单数量
    async getSubCount() {
      let cookie = this.$store.state.user.cookie
      let result = await this.$api.reqSubcount(cookie)
      this.artistCount = result.artistCount
      this.mvCount = result.mvCount
      this.radioCount = result.djRadioCount
      this.createdPlaylistCount = result.createdPlaylistCount
      this.subPlaylistCount = result.subPlaylistCount
    },

    // 获取用户创建和收藏的歌单
    async getUserPlaylist() {
      this.createdPlaylists = []
      this.subPlaylists = []
      let uid = this.$store.state.user.userId
      let cookie = this.$store.state.user.cookie
      let result = await this.$api.reqUserPlaylist(uid, cookie)
      result.playlist.forEach((item) => {
        if (item.subscribed == true) {
          // 收藏的歌单
          this.subPlaylists.push(item)
        } else {
          // 创建的歌单
          this.createdPlaylists.push(item)
        }
      })
      if (this.$route.path === '/my/playlist' && !this.$route.query.id) {
        this.$router.push({
          path: '/my/playlist',
          query: { id: this.createdPlaylists[0].id },
        })
      }
    },

    // 跳转到我的歌手
    gotoArtist() {
      this.$router.push({
        path: '/my/artist',
      })
    },

    // 跳转到我的视频
    gotoMv() {
      this.$router.push({
        path: '/my/mv',
      })
    },

    // 跳转到我的电台
    gotoRadio() {
      this.$router.push({
        path: '/my/radio',
      })
    },

    // 跳转到某个歌单
    gotoPlaylist(pid) {
      this.$router.push({
        path: '/my/playlist',
        query: {
          id: pid,
        },
      })
    },

    // 取消订阅歌单
    unsubscribe(id) {
      this.$confirm('确定删除歌单？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        let cookie = localStorage.getItem('COOKIE')
        if (this.id == id) {
          await this.$api.subscribePlaylist(2, id, cookie)
          this.$router.replace({
            query: {
              id: this.createdPlaylists[0].id,
            },
          })
        } else {
          await this.$api.subscribePlaylist(2, id, cookie)
        }
        this.getUserPlaylist()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.mainleft {
  float: left;
  position: fixed;
  width: 239px;
  .container {
    width: 239px;
    position: fixed;
    top: 75px;
    bottom: 0;
    overflow: hidden auto;
    padding-bottom: 50px;
    padding-top: 40px;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 10px;
    }
    .tit {
      height: 36px;
      line-height: 36px;
      padding: 0 5px 2px 35px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #f2f2f2;
      }
      &.selected {
        background-color: #e6e6e6;
      }
    }
    .playlist {
      margin-top: 8px;
      h2 {
        padding: 0 10px 12px 15px;
        font-size: 14px;
        color: #000;
        .create {
          float: right;
          width: 52px;
          height: 22px;
          background: url('@/assets/images/button.png') 0 -96px no-repeat;
          &:hover {
            background-position: -94px -39px;
          }
          i {
            line-height: 22px;
            overflow: hidden;
            padding-left: 20px;
            color: #515151;
            font-size: 12px;
            font-weight: normal;
          }
        }
        .title {
          position: relative;
          font-size: 14px;
          color: #000;
          cursor: pointer;
          .show-tri,
          .hide-tri {
            display: inline-block;
            vertical-align: middle;
            margin: 0 2px 0 5px;
            cursor: pointer;
            font-size: 0;
            height: 0;
            line-height: 0;
          }
          .show-tri {
            border-color: #ccc transparent transparent;
            border-style: solid dashed dashed;
            border-width: 8px 7px 0;
          }
          .hide-tri {
            border: 8px solid #ccc;
            border-color: transparent transparent transparent #ccc;
            border-style: dashed dashed dashed solid;
            margin-right: 0;
          }
        }
      }
      ul {
        li {
          position: relative;
          height: 54px;
          padding: 6px 0 6px 20px;
          vertical-align: middle;
          cursor: pointer;
          &:hover {
            background-color: #f2f2f2;
            .btns {
              display: block;
            }
          }
          &.selected {
            background-color: #e6e6e6;
          }
          .atar {
            float: left;
            width: 40px;
            height: 40px;
            vertical-align: middle;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .cnt {
            margin-left: 50px;
            .name {
              width: 150px;
              margin-top: 2px;
              margin-bottom: 8px;
            }
            .info {
              width: 130px;
              color: #999;
            }
          }
          .btns {
            display: none;
            position: absolute;
            bottom: 7px;
            right: 0;
            .edit-icon,
            .del-icon {
              float: left;
              margin-right: 10px;
              width: 13px;
              height: 13px;
              background: url('@/assets/images/icon.png') no-repeat;
            }
            .edit-icon {
              background-position: 0 -270px;
              &:hover {
                background-position: -20px -270px;
              }
            }
            .del-icon {
              height: 14px;
              background-position: 0 -284px;
              &:hover {
                background-position: -20px -284px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
