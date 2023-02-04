<template>
  <div class="mainleft">
    <!-- 专辑信息 -->
    <div class="title clearfix">
      <!-- 封面 -->
      <div class="cover">
        <img v-lazy="albumInfo.blurPicUrl" alt="" />
        <span class="msk"></span>
      </div>
      <!-- 信息 -->
      <div class="cnt">
        <div class="hd">
          <i class="playlist-icn"></i>
          <h2 class="ellipsis">{{ albumInfo.name }}</h2>
        </div>
        <div class="intr">
          <p>
            歌手：<router-link
              :to="{ path: '/artist', query: { id: `${albumInfo.artist.id}` } }"
              class="ar"
              >{{ albumInfo.artist.name }}</router-link
            >
          </p>
          <p>发行时间：{{ toDate(albumInfo.publishTime) }}</p>
          <p>发行公司：{{ albumInfo.company }}</p>
        </div>
        <!-- 按钮 -->
        <div class="btns">
          <a href="javascript:;" class="play" @click="setAlbum">
            <i> <em class="ply-icn"></em>播放 </i>
          </a>
          <a href="javascript:;" class="add"></a>
          <a href="javascript:;" class="like">
            <i
              >({{
                albumInfo.info.likeCount > 0
                  ? albumInfo.info.likeCount > 10000
                    ? (albumInfo.info.likeCount / 10000).toFixed(1) + '万'
                    : albumInfo.info.likeCount
                  : '收藏'
              }})</i
            >
          </a>
          <a href="javascript:;" class="share">
            <i
              >({{
                albumInfo.info.shareCount > 0
                  ? albumInfo.info.shareCount > 10000
                    ? (albumInfo.info.shareCount / 10000).toFixed(1) + '万'
                    : albumInfo.info.shareCount
                  : '分享'
              }})</i
            >
          </a>
          <a href="javascript:;" class="download">
            <i>下载</i>
          </a>
          <a href="javascript:;" class="comment">
            <i
              >({{
                albumInfo.info.commentCount > 0
                  ? albumInfo.info.commentCount > 10000
                    ? (albumInfo.info.commentCount / 10000).toFixed(1) + '万'
                    : albumInfo.info.commentCount
                  : '评论'
              }})</i
            >
          </a>
        </div>
      </div>
    </div>

    <!-- 专辑介绍 -->
    <div class="desc clearfix">
      <h3>专辑介绍：</h3>
      <div
        class="desc-dot"
        v-show="!isUnfold"
        v-html="albumInfo.shortDescription"
      ></div>
      <div
        class="desc-more"
        v-show="isUnfold"
        v-html="albumInfo.description"
      ></div>
      <a href="javascript:;" class="spread" @click="isUnfold = !isUnfold">
        {{ isUnfold ? '收起' : '展开' }}
        <i class="spread-icn" :class="[isUnfold ? 'unfold' : '']"></i>
      </a>
    </div>

    <!-- 歌单 -->
    <div class="songlist">
      <!-- 标题栏 -->
      <div class="title">
        <h3>包含歌曲列表</h3>
        <span class="sub">{{ songList.length }}首歌</span>
        <span class="out">
          <i></i>
          <a href="javascript:;" class="outchain">生成外链播放器</a>
        </span>
      </div>

      <!-- 歌单列表 -->
      <table class="list">
        <thead>
          <tr>
            <th class="col1"></th>
            <th class="col2"><div class="wp">歌曲标题</div></th>
            <th class="col3"><div class="wp">时长</div></th>
            <th class="col4"><div class="wp">歌手</div></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in songList"
            :key="item.id"
            :class="[index % 2 === 0 ? 'even' : '']"
          >
            <!-- 序号+排名 -->
            <td>
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
                    <router-link :to="{path: '/song', query: {id: `${item.id}`}}" class="song-name">{{ item.name }}</router-link>
                    <span class="ailas" v-if="item.alia.length"
                      >- ({{ item.alia[0] }})</span
                    >
                  </span>
                </div>
              </div>
            </td>

            <!-- 时长 -->
            <td>
              <div class="dur">{{ toTime(item.dt) }}</div>
              <div class="show">
                <a href="javascript:;" title="添加到播放列表" class="a1" @click="$store.dispatch('music/addMusic', item.id)"></a>
                <a href="javascript:;" title="收藏" class="a2"></a>
                <a href="javascript:;" title="分享" class="a3"></a>
                <a href="javascript:;" title="下载" class="a4"></a>
              </div>
            </td>

            <!-- 歌手 -->
            <td>
              <div class="artists ellipsis">
                <span
                  class="ar"
                  v-for="(artist, index) in item.ar"
                  :key="artist.id"
                >
                  <router-link
                    :to="{ path: '/artist', query: { id: `${artist.id}` } }"
                    :title="artist.name"
                    >{{ artist.name }}</router-link
                  >
                  <span v-if="index < item.ar.length - 1">/</span>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 评论 -->
    <Comments/>
  </div>
</template>

<script>
import Comments from './Comments.vue'

export default {
  name: 'MainLeft',
  components: { Comments },
  data() {
    return {
      albumInfo: {}, // 专辑信息
      songList: [], // 专辑歌曲列表
      isUnfold: false, // 专辑介绍信息是否展开
    }
  },

  computed: {
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
      this.albumInfo = result.album
      this.songList = result.songs
      this.albumInfo.shortDescription =
        this.albumInfo.description.slice(
          0,
          this.albumInfo.description.length / 5
        ) + '...'
      this.albumInfo.description =
        '<p>' + this.albumInfo.description.replace(/\n/g, '</p><p>') + '</p>'
      this.albumInfo.shortDescription =
        '<p>' +
        this.albumInfo.shortDescription.replace(/\n/g, '</p><p>') +
        '</p>'
    },

    // 发行日期
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

    // 毫秒转换为mm:ss格式
    toTime(ms) {
      let m = Math.floor(ms / 1000 / 60)
      let s = Math.floor(ms / 1000 - m * 60)
      return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
    },
    
    // 播放专辑
    async setAlbum() {
      let ids = [];
      this.songList.forEach(item => {
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
  },
}
</script>

<style lang="less" scoped>
.mainleft {
  float: left;
  width: 710px;
  border-right: 1px solid #d3d3d3;
  padding: 47px 30px 40px 39px;
  .title {
    .cover {
      float: left;
      position: relative;
      width: 177px;
      height: 177px;
      img {
        width: 100%;
        height: 100%;
      }
      .msk {
        position: absolute;
        top: 0;
        left: 0;
        width: 209px;
        height: 177px;
        background: url('@/assets/images/coverall.png') 0 -986px no-repeat;
      }
    }
    .cnt {
      margin-left: 230px;
      .hd {
        position: relative;
        margin: 0 0 12px;
        line-height: 24px;
        .playlist-icn {
          float: left;
          position: relative;
          top: 3px;
          margin-right: 6px;
          width: 54px;
          height: 24px;
          background: url('@/assets/images/icon.png') 0 -186px no-repeat;
        }
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .intr {
        margin-bottom: 20px;
        p {
          margin-top: 4px;
          line-height: 18px;
          color: #666;
          .ar {
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .btns {
        height: 31px;
        margin-bottom: 25px;
        .play {
          float: left;
          height: 31px;
          line-height: 31px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          color: #fff;
          background: url('@/assets/images/btnBg.png') right -428px no-repeat;
          i {
            display: inline-block;
            height: 31px;
            line-height: 31px;
            text-align: center;
            padding: 0 7px 0 8px;
            color: #fff;
            background: url('@/assets/images/btnBg.png') 0 -387px no-repeat;
            .ply-icn {
              float: left;
              width: 20px;
              height: 18px;
              margin: 6px 2px 2px 0;
              background: url('@/assets/images/btnBg.png') 0 -1622px no-repeat;
            }
          }
        }
        .add {
          float: left;
          margin-right: 5px;
          width: 31px;
          height: 31px;
          line-height: 31px;
          margin-left: -3px;
          margin-left: -3px;
          padding-right: 0;
          background: url('@/assets/images/btnBg.png') 0 -1588px no-repeat;
        }
        .like {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          padding-right: 5px;
          margin-right: 6px;
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
          &.disabled {
            cursor: default;
            background-position: right -1192px;
            i {
              color: #bebebe;
              background-position: 0 -1149px;
            }
          }
        }
        .share {
          float: left;
          height: 31px;
          line-height: 31px;
          min-width: 23px;
          margin-right: 6px;
          padding-right: 5px;
          background: url('@/assets/images/btnBg.png') right -1020px no-repeat;
          i {
            float: left;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            padding-right: 2px;
            padding-left: 28px;
            background: url('@/assets/images/btnBg.png') 0 -1225px no-repeat;
          }
        }
        .download {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          margin-right: 6px;
          padding-right: 5px;
          background: url('@/assets/images/btnBg.png') right -1020px no-repeat;
          i {
            float: left;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            padding-right: 2px;
            padding-left: 28px;
            background: url('@/assets/images/btnBg.png') 0 -2761px no-repeat;
          }
        }
        .comment {
          float: left;
          height: 31px;
          line-height: 30px;
          min-width: 23px;
          margin-right: 6px;
          padding-right: 5px;
          background: url('@/assets/images/btnBg.png') right -1020px no-repeat;
          i {
            float: left;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            padding-right: 2px;
            padding-left: 28px;
            background: url('@/assets/images/btnBg.png') 0 -1465px no-repeat;
          }
        }
      }
      .desc-dot {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        b {
          font-weight: normal;
          color: #666;
        }
      }
      .desc-more {
        margin-top: 4px;
        line-height: 18px;
        color: #666;
        b {
          font-weight: normal;
          color: #666;
        }
      }
      .spread {
        color: #0c73c2;
        float: right;
        .spread-icn {
          display: inline-block;
          width: 11px;
          height: 8px;
          background: url('@/assets/images/icon.png') -65px -520px no-repeat;
          &.unfold {
            background-position: -45px -520px;
          }
        }
      }
    }
  }
  .desc {
    margin-top: 20px;
    .desc-dot,
    .desc-more {
      ::v-deep p {
        color: #666;
        text-indent: 2em;
        line-height: 24px;
        margin-top: 4px;
      }
    }
    .spread {
      color: #0c73c2;
      float: right;
      .spread-icn {
        display: inline-block;
        width: 11px;
        height: 8px;
        background: url('@/assets/images/icon.png') -65px -520px no-repeat;
        &.unfold {
          background-position: -45px -520px;
        }
      }
    }
  }
  .songlist {
    margin-top: 27px;
    width: 100%;
    .title {
      height: 35px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 20px;
        line-height: 28px;
        font-weight: normal;
      }
      .sub {
        float: left;
        margin: 9px 0 0 20px;
        color: #666;
      }
      .out {
        margin-right: 20px;
        margin-top: 5px;
        float: right;
        i {
          float: left;
          width: 16px;
          height: 16px;
          overflow: hidden;
          vertical-align: middle;
          background: url('@/assets/images/icon.png') -34px -863px no-repeat;
        }
        .outchain {
          color: #4996d1;
          text-decoration: underline;
        }
      }
    }
    .list {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      thead {
        th {
          height: 38px;
          background-color: #f7f7f7;
          color: #666;
          font-weight: normal;
          text-align: left;
          background: url('@/assets/images/table.png') 0 0 repeat-x;
          .wp {
            height: 34px;
            line-height: 18px;
            padding: 8px 10px;
            background: url('@/assets/images/table.png') 0 -56px no-repeat;
          }
        }
        .col1 {
          width: 74px;
        }
        .col3 {
          width: 91px;
        }
        .col4 {
          width: 20%;
        }
      }
      tbody {
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
                  display: inline-block;
                  max-width: 99%;
                  height: 20px;
                  .song-name:hover {
                    text-decoration: underline;
                  }
                  .ailas {
                    color: #aeaeae;
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
            .artists {
              width: 100%;
              a:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
