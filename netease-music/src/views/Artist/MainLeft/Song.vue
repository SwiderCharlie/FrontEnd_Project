<template>
  <div class="song">
    <!-- 按钮 -->
    <div class="operations clearfix">
      <a href="javascript:;" class="play" title="播放" @click="setPlaylist">
        <i> <em class="ply-icn"></em>播放 </i>
      </a>
      <a href="javascript:;" class="add" title="添加到播放列表"></a>
      <a href="javascript:;" class="fav"><i>收藏热门50</i></a>
      <div class="hot">
        <a href="javascript:;" class="btn"
          ><i>热门单曲<em class="sel-icn"></em></i
        ></a>
        <ul class="filter-list">
          <li class="active">热门单曲</li>
          <li>作词作品</li>
          <li>作曲作品</li>
        </ul>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <table class="song-list">
      <tbody>
        <tr
          v-for="(item, index) in hotSongs"
          :key="item.id"
          :class="[index % 2 === 0 ? 'even' : '']"
        >
          <!-- 序号 -->
          <td class="col1">
            <div class="hd">
              <span class="num">{{ index + 1 }}</span>
              <span class="play" @click="playMusic(item.id)"></span>
            </div>
          </td>

          <!-- 标题 -->
          <td>
            <div class="tt">
              <div class="ttc">
                <span class="txt ellipsis">
                  <router-link :to="{path: '/song', query: {id: `${item.id}`}}" class="song-name" :title="item.name">{{ item.name }}</router-link>
                  <span class="ailas" v-if="item.alia.length"
                    >- ({{ item.alia[0] }})</span
                  >
                  <span class="mv" title="播放MV" v-if="item.mv != '0'"></span>
                </span>
              </div>
            </div>
          </td>

          <!-- 时长 -->
          <td class="col3">
            <div class="dur">{{ toTime(item.dt) }}</div>
            <div class="show">
              <a href="javascript:;" title="添加到播放列表" class="a1" @click="$store.dispatch('music/addMusic', item.id)"></a>
              <a href="javascript:;" title="收藏" class="a2"></a>
              <a href="javascript:;" title="分享" class="a3"></a>
              <a href="javascript:;" title="下载" class="a4"></a>
            </div>
          </td>


          <!-- 专辑 -->
          <td class="col4">
            <div class="album ellipsis">
              <router-link  :to="{path: '/album', query:{id: `${item.al.id}`}}" :title="item.al.name">{{ item.al.name }}</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Song',
  data() {
    return {
      hotSongs: [],  // 歌手top50热门歌曲
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  mounted() {
    this.getArtistTop50Song()
  },

  methods: {
    // 获取歌手top50热门歌曲
    async getArtistTop50Song() {
      let result = await this.$api.reqArtistTop50Song(this.id)
      this.hotSongs = result.songs
    },

    // 毫秒转换为mm:ss格式
    toTime(ms) {
      let m = Math.floor(ms / 1000 / 60)
      let s = Math.floor(ms / 1000 - m * 60)
      return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
    },

    // 播放歌单
    async setPlaylist() {
      let ids = [];
      this.hotSongs.forEach(item => {
        ids.push(item.id)
      })
      await this.$store.dispatch('music/setMusicNow', ids[0])
      ids = ids.join(',')
      await this.$store.dispatch('music/setMusicList', ids)
      this.$bus.$emit('play')
    },

    // 播放歌曲
    async playMusic(id) {
      await this.$store.dispatch('music/setMusicNow', id)
      await this.$store.dispatch('music/addMusic', id)
      this.$bus.$emit('play')
    },
  }
}
</script>

<style lang="less" scoped>
.song {
  .operations {
    margin: 20px 0 10px;
    .play {
      float: left;
      height: 31px;
      line-height: 31px;
      overflow: hidden;
      vertical-align: top;
      text-align: center;
      color: #fff;
      padding-right: 5px;
      white-space: nowrap;
      background: url('@/assets/images/btnBg.png') right -428px no-repeat;
      i {
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        padding: 0 7px 0 8px;
        color: #fff;
        background: url('@/assets/images/btnBg.png') 0 -387px no-repeat;
        .ply-icn {
          float: left;
          width: 20px;
          height: 18px;
          margin: 6px 2px 2px 0;
          overflow: hidden;
          background: url('@/assets/images/btnBg.png') 0 -1622px no-repeat;
        }
      }
    }
    .add {
      float: left;
      height: 31px;
      line-height: 31px;
      min-width: 23px;
      margin-right: 5px;
      width: 31px;
      margin-left: -3px;
      padding-right: 0;
      background: url('@/assets/images/btnBg.png') 0 -1588px no-repeat;
    }
    .fav {
      float: left;
      height: 31px;
      line-height: 30px;
      min-width: 23px;
      margin-right: 6px;
      padding-right: 5px;
      white-space: nowrap;
      background: url('@/assets/images/btnBg.png') right -1020px no-repeat;
      i {
        float: left;
        height: 31px;
        line-height: 30px;
        min-width: 23px;
        padding-right: 2px;
        padding-left: 28px;
        background: url('@/assets/images/btnBg.png') 0 -977px no-repeat;
      }
    }
    .hot {
      float: right;
      position: relative;
      &:hover {
        .filter-list {
          display: block;
        }
      }
      .btn {
        display: inline-block;
        padding-right: 5px;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        background: url('@/assets/images/btnBg.png') right -100px;
        i {
          display: inline-block;
          padding: 0 15px 0 20px;
          height: 31px;
          line-height: 31px;
          overflow: hidden;
          vertical-align: top;
          text-align: center;
          background: url('@/assets/images/btnBg.png') 0 -59px no-repeat;
          .sel-icn {
            display: inline-block;
            margin-left: 6px;
            width: 8px;
            height: 5px;
            background: url('@/assets/images/icon3.png') 0 0 no-repeat;
          }
        }
      }
      .filter-list {
        position: absolute;
        z-index: 1;
        display: none;
        width: 102px;
        height: 95px;
        margin-top: -2px;
        line-height: 30px;
        border: 1px solid #c3c3c3;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%);
        background-color: #fff;
        li {
          padding-left: 20px;
          text-align: left;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          color: #999;
          &.active {
            color: #333;
                background-color: rgba(0,0,0,0.1);
          }
        }
      }
    }
  }
  .song-list {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    
    tbody {
      .col1 {
        width: 94px;
      }
      .col3 {
        width: 89px;
      }
      .col4 {
        width: 23%;
      }
      tr {
        &.even {
          background-color: #f7f7f7;
        }
        &:hover {
          .dur {
            display: none;
          }
          .show {
            display: block;
          }
        }
        td {
          padding: 6px 10px;
          line-height: 18px;
          text-align: left;
          .hd {
            height: 18px;
            .num {
              float: left;
              width: 25px;
              margin-left: 0;
              text-align: center;
              color: #999;
            }
            .play {
              float: right;
              width: 17px;
              height: 17px;
              cursor: pointer;
              background: url('@/assets/images/table.png') 0 -103px;
              &:hover {
                background-position: 0 -128px;
              }
            }
          }
          .tt {
            float: left;
            width: 100%;
            .ttc {
              height: 18px;
              margin-right: 20px;
              overflow: hidden;
              .txt {
                position: relative;
                display: inline-block;
                max-width: 99%;
                height: 20px;
                padding-right: 25px;
                margin-right: -25px;
                .song-name:hover {
                  text-decoration: underline;
                }
                .ailas {
                  color: #aeaeae;
                }
                .mv {
                  float: left;
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 23px;
                  height: 17px;
                  margin-top: 1px;
                  cursor: pointer;
                  background: url('@/assets/images/table.png') 0 -151px no-repeat;
                }
              }
            }
          }
          .dur {
            color: #666;
          }
          .show {
            display: none;
            width: 79px;
            height: 18px;
            a {
              margin: 2px 0 0 4px;
              width: 18px;
              height: 16px;
              display: block;
              float: left;
              background: url('@/assets/images/table.png') no-repeat;
              &:hover {
                cursor: pointer;
              }
            }
            .a1 {
              width: 13px;
              height: 13px;
              margin-top: 2px;
              margin-left: 0;
              background: url('@/assets/images/icon.png') no-repeat;
              background-position: 0 -700px;

              &:hover {
                background-position: -22px -700px;
              }
            }

            .a2 {
              background-position: 0 -174px;
              &:hover {
                background-position: -20px -174px;
              }
            }
            .a3 {
              background-position: 0 -195px;
              &:hover {
                background-position: -20px -195px;
              }
            }
            .a4 {
              background-position: -81px -174px;
              &:hover {
                background-position: -104px -174px;
              }
            }
          }
          .album {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
