<template>
  <div class="mainright">
    <!-- 头部：榜单信息 -->
    <div class="header">
      <div class="info">
        <!-- 封面 -->
        <div class="cover">
          <img v-lazy="listInfo.coverImgUrl" />
          <span class="msk"></span>
        </div>

        <!-- 信息 -->
        <div class="cnt">
          <div class="hd">
            <h2>{{ listInfo.name }}</h2>
          </div>
          <div class="user">
            <i class="icn"></i>
            <span class="sep"
              >最近更新：{{ updateDate(listInfo.updateTime) }}（{{
                freq
              }}）</span
            >
          </div>
          <div class="btns">
            <a href="javascript:;" class="play" @click="setPlaylist(id)">
              <i class="ply"></i>
              <span>播放</span>
            </a>
            <a href="javascript:;" class="add"></a>
            <a href="javascript:;" class="sub">
              <span>({{ listInfo.subscribedCount }})</span>
            </a>
            <a href="javascript:;" class="share">
              <span>({{ listInfo.shareCount }})</span>
            </a>
            <a class="download">
              <span>下载</span>
            </a>
            <a class="comment">
              <span>({{ listInfo.commentCount }})</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <SongList :songList="songList" :playCount="listInfo.playCount" />

    <!-- 评论 -->
    <Comments />
  </div>
</template>

<script>
import SongList from './SongList.vue'
import Comments from './Comments.vue'

export default {
  name: 'MainRight',
  components: { SongList, Comments },
  data() {
    return {
      listInfo: {}, // 榜单信息
      songList: {}, // 歌单列表
      freq: '每天更新', // 当前榜单更新频率
    }
  },

  computed: {
    id() {
      // 当前展示的榜单id
      if (this.$route.query.id == undefined) return '19723756'
      return this.$route.query.id
    },
  },

  watch: {
    id() {
      this.getPlayList()
      this.$bus.$on('getFreq', (freq) => {
        this.freq = freq
      })
    },
  },

  mounted() {
    this.getPlayList() // 获取榜单信息和歌单列表
    this.$bus.$on('getFreq', (freq) => {
      this.freq = freq
    })
  },

  methods: {
    // 获取榜单信息歌单列表
    async getPlayList() {
      let result = await this.$api.reqPlayList(this.id)
      if (result.code === 200) {
        this.listInfo = result.playlist
        let list = []
        for (let i = 0; i < result.privileges.length; i++) {
          list.push(result.privileges[i].id)
        }
        let s = list.join(',')
        let result2 = await this.$api.reqSongDetail(s)
        if (result2.code === 200) {
          this.songList = result2.songs
        }
      }
    },

    // 计算更新日期
    updateDate(updateTime) {
      let date = new Date(updateTime)
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : '' + month
      let day = date.getDate()
      day = day < 10 ? '0' + day : '' + day
      return month + '月' + day + '日'
    },

    // 播放歌单
    async setPlaylist(id) {
      let result = await this.$api.reqPlayList(id, localStorage.getItem('CCOKIE'))
      let ids = [];
      result.playlist.trackIds.forEach(item => {
        ids.push(item.id)
      })
      await this.$store.dispatch('music/setMusicNow', ids[0])
      ids = ids.join(',')
      await this.$store.dispatch('music/setMusicList', ids)
      this.$bus.$emit('play')
    }
  },
}
</script>

<style lang="less" scoped>
.mainright {
  float: right;
  width: 741px;
  padding-bottom: 50px;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  .header {
    width: 100%;
    height: 238px;
    padding: 40px;
    .info {
      width: 100%;
      height: 100%;
      display: flex;
      .cover {
        position: relative;
        width: 158px;
        height: 158px;
        padding: 3px;
        border: 1px solid #ccc;
        img {
          width: 150px;
          height: 150px;
        }
        .msk {
          position: absolute;
          width: 150px;
          height: 150px;
          top: 3px;
          left: 3px;
          background: url('@/assets/images/coverall.png') -230px -380px;
        }
      }
      .cnt {
        height: 114px;
        margin-left: 29px;
        .hd {
          margin: 16px 0 4px;
          h2 {
            font-size: 20px;
            font-weight: normal;
            color: #333;
          }
        }
        .user {
          margin: 0 0 20px;
          line-height: 35px;
          .icn {
            float: left;
            margin: 9px 0 0 3px;
            width: 13px;
            height: 13px;
            background: url('@/assets/images/icon.png') -18px -682px;
          }
          .sep {
            margin-left: 5px;
            color: #666;
          }
        }
        .btns {
          height: 31px;
          display: flex;

          .play {
            width: 66px;
            padding-left: 5px;
            background: url('@/assets/images/btnBg.png') no-repeat 0 -1652px;
            text-align: center;
            line-height: 31px;
            height: 31px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            i {
              width: 20px;
              height: 18px;
              margin: 6px 2px 2px 0;
              float: left;
              background: url('@/assets/images/btnBg.png') no-repeat 0 -1622px;
            }

            span {
              color: #fff;
            }
            &:hover {
              cursor: pointer;
            }
          }

          .add {
            width: 31px;
            height: 31px;
            margin-right: 5px;
            background: url('@/assets/images/btnBg.png') no-repeat 0 -1588px;

            &:hover {
              cursor: pointer;
              background-position: -40px -1588px;
            }
            &:active {
              background-position: -80px -1588px;
            }
          }

          .sub {
            width: 92.6px;
            // padding-right: 5px;
            margin-right: 6px;
            height: 100%;
            background: url('@/assets/images/btnBg.png') no-repeat;
            background-position: 0px -1063px;
            span {
              display: inline-block;
              height: 100%;
              width: 100%;
              background: url('@/assets/images/btnBg.png') no-repeat right -1106px;
              line-height: 30px;
              padding-left: 30px;
            }
            &:hover {
              color: #666;
              cursor: pointer;
            }
          }

          .share {
            width: 79.8px;
            height: 31px;
            margin-right: 6px;
            float: left;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url('@/assets/images/btnBg.png') no-repeat;
            background-position: 0 -1225px;

            span {
              width: 100%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url('@/assets/images/btnBg.png') no-repeat;
              background-position: right -1020px;
            }

            &:hover {
              color: #666;
              cursor: pointer;
            }
          }

          .download {
            margin-right: 5px;
            width: 60px;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url('@/assets/images/btnBg.png') no-repeat;
            background-position: 0 -2761px;

            span {
              width: 100%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url('@/assets/images/btnBg.png') no-repeat;
              background-position: right -1020px;
            }
            &:hover {
              color: #666;
              cursor: pointer;
            }
          }

          .comment {
            margin-right: 5px;
            width: 90px;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url('@/assets/images/btnBg.png') no-repeat;
            background-position: 0 -1465px;

            span {
              width: 100%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url('@/assets/images/btnBg.png') no-repeat;
              background-position: right -1020px;
            }
            &:hover {
              color: #666;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
