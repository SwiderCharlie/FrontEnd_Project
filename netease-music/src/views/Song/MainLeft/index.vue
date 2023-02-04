<template>
  <div class="mainleft">
    <!-- 歌曲信息 -->
    <div class="title">
      <div class="main-cnt clearfix">
        <div class="cover">
          <div class="cvr">
            <img :src="songDetail.al.picUrl" alt="" />
            <span class="mask"></span>
          </div>
          <div class="out">
            <i></i>
            <a href="javascript:;" class="outchain">生成外链播放器</a>
          </div>
        </div>

        <div class="cnt clearfix">
          <div class="hd clearfix">
            <i class="playlist-icn"></i>
            <h2 class="ellipsis">{{ songDetail.name }}</h2>
            <a
              class="mv"
              href="javascript:;"
              title="播放MV"
              v-if="songDetail.mv != 0"
              ><i></i
            ></a>
          </div>
          <div class="intr">
            <p>
              歌手：<span
                v-for="(artist, index) in songDetail.ar"
                :key="artist.id"
              >
                <router-link
                  :to="{ path: '/artist', query: { id: `${artist.id}` } }"
                  class="link"
                  >{{ artist.name }}</router-link
                >
                <span v-if="index < songDetail.ar.length - 1">/</span>
              </span>
            </p>
            <p>
              所属专辑：<router-link
                :to="{ path: '/album', query: { id: `${songDetail.al.id}` } }"
                class="link"
                >{{ songDetail.al.name }}</router-link
              >
            </p>
          </div>

          <!-- 按钮 -->
          <div class="btns">
            <a href="javascript:;" class="play" @click="playMusic(id)">
              <i> <em class="ply-icn"></em>播放 </i>
            </a>
            <a href="javascript:;" class="add"></a>
            <a href="javascript:;" class="like">
              <i>收藏</i>
            </a>
            <a href="javascript:;" class="share">
              <i>分享</i>
            </a>
            <a href="javascript:;" class="download">
              <i>下载</i>
            </a>
            <a href="javascript:;" class="comment">
              <i>({{
                commentsCount > 0
                  ? commentsCount > 10000
                    ? (commentsCount / 10000).toFixed(1) + '万'
                    : commentsCount
                  : '评论'
              }})</i>
            </a>
          </div>

          <!-- 歌词 -->
          <div class="lyric">
            <p v-html="this.lyric" v-show="isUnfold"></p>
            <p v-html="this.halfLyric" v-show="!isUnfold"></p>
            <a href="javascript:;" class="spread" @click="isUnfold = !isUnfold" v-show="halfLyric != lyric">
              {{ isUnfold ? '收起' : '展开' }}
              <i class="spread-icn" :class="[isUnfold ? 'unfold' : '']"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="lrc-err">
        <p><a href="javascript:;">报错</a></p>
      </div>
    </div>

    <!-- 评论 -->
    <Comments @getCommentsCount="getCommentsCount"/>
  </div>
</template>

<script>
import Comments from './Comments.vue'

export default {
  name: 'MainLeft',
  components: {Comments},
  data() {
    return {
      songDetail: {}, // 歌曲详情
      lyric: '', // 歌词
      halfLyric: '', // 部分歌词
      isUnfold: false, // 歌词是否展开
      commentsCount: 0,  // 评论数
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
    this.getSongDetail()
    this.getSongLyric()
  },

  methods: {
    // 获取歌曲详情
    async getSongDetail() {
      let result = await this.$api.reqSongDetail(this.id)
      this.songDetail = result.songs[0]
    },

    // 获取歌词
    async getSongLyric() {
      let result = await this.$api.reqLyric(this.id)
      this.lyric = result.lrc.lyric
        .replace(/\[[0-9:.]+\]/g, '')
        .replace(/\n/g, '<br>')
      this.halfLyric = result.lrc.lyric
        .replace(/\[[0-9:.]+\]/g, '')
        .split('\n')
        .slice(0, 13)
        .join('\n')
        .replace(/\n/g, '<br>')
    },

    // 获取评论数
    getCommentsCount(count) {
      this.commentsCount = count
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
    margin-top: -10px;
    .main-cnt {
      .cover {
        float: left;
        width: 206px;
        margin-right: -226px;
        .cvr {
          position: relative;
          width: 198px;
          height: 198px;
          img {
            width: 130px;
            height: 130px;
            margin: 34px;
          }
          .mask {
            position: absolute;
            width: 206px;
            height: 205px;
            top: -4px;
            left: -4px;
            background: url('@/assets/images/coverall.png') -140px -580px
              no-repeat;
          }
        }
        .out {
          float: left;
          margin: 20px 0 0 46px;
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
      .cnt {
        float: right;
        width: 414px;
        .hd {
          position: relative;
          margin: 0 0 12px;
          line-height: 24px;
          .playlist-icn {
            float: left;
            position: relative;
            top: 3px;
            margin-right: 10px;
            width: 54px;
            height: 24px;
            background: url('@/assets/images/icon.png') 0 -463px no-repeat;
          }
          h2 {
            float: left;
            margin-right: 10px;
            font-size: 24px;
            font-weight: normal;
            vertical-align: middle;
          }
          .mv {
            vertical-align: middle;
            i {
              display: inline-block;
              width: 21px;
              height: 18px;
              vertical-align: middle;
              background: url('@/assets/images/icon.png') 0 -18px no-repeat;
            }
          }
        }
        .intr {
          margin-bottom: 20px;
          p {
            margin: 10px 0;
            color: #666;
            .link {
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
        .lyric {
          margin-top: 13px;
          line-height: 23px;
          
      .spread {
        color: #0c73c2;
        float: left;
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
    }
    .lrc-err {
      text-align: right;
      margin-top: 48px;
      line-height: 30px;
      p {
        a {
          text-decoration: underline;
          color: #999;
        }
      }
    }
  }
}
</style>
