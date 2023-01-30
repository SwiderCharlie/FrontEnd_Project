<template>
  <div class="playlist">
    <!-- 歌单信息 -->
    <div class="title clearfix">
      <div class="cover">
        <img v-lazy="playlistInfo.coverImgUrl" alt="" />
        <span class="msk"></span>
      </div>
      <div class="cnt">
        <div class="hd">
          <i class="playlist-icn"></i>
          <h2 class="ellipsis">{{ playlistInfo.name }}</h2>
        </div>
        <div class="user">
          <a href="javascript:;" class="face">
            <img v-lazy="playlistInfo.creator.avatarUrl" alt="" />
          </a>
          <span class="name ellipsis">
            <a href="javascript:;" :title="playlistInfo.creator.nickname">{{
              playlistInfo.creator.nickname
            }}</a>
          </span>
          <span class="time"
            >{{ toDate(playlistInfo.createTime) }}&nbsp;创建</span
          >
        </div>
        <div class="btns">
          <a href="javascript:;" class="play">
            <i> <em class="ply-icn"></em>播放 </i>
          </a>
          <a href="javascript:;" class="add"></a>
          <a href="javascript:;" class="share">
            <i>（{{ playlistInfo.shareCount > 0?  playlistInfo.shareCount: '分享'}}）</i>
          </a>
          <a href="javascript:;" class="download">
            <i>下载</i>
          </a>
          <a href="javascript:;" class="comment">
            <i>（{{ playlistInfo.commentCount > 0? playlistInfo.commentCount: '评论' }}）</i>
          </a>
        </div>
        <div class="tags" v-if="playlistInfo.tags.length">
          <b>标签：</b>
          <a
            href="javascript:;"
            class="tag"
            v-for="(item, index) in playlistInfo.tags"
            :key="index"
          >
            <i>{{ item }}</i>
          </a>
        </div>
        <div class="desc" v-if="playlistInfo.description">
          <p class="desc-dot ellipsis-3" v-show="!isUnfold">
          <b>介绍：</b>{{ playlistInfo.description }}
        </p>
        <p class="desc-more" v-show="isUnfold">
          <b>介绍：</b>{{ playlistInfo.description }}
        </p>
        <a href="javascript:;" class="spread" @click="isUnfold = !isUnfold">
          {{ isUnfold ? '收起' : '展开' }}
          <i class="spread-icn" :class="[isUnfold ? 'unfold' : '']"></i>
        </a>
        </div>
        
      </div>
    </div>

    <!-- 歌单列表标题 -->
    <div class="list-tit">
      <h3>歌曲列表</h3>
      <span class="sub">{{playlistInfo.trackCount}}首歌</span>
      <span class="more">
        播放：<strong>{{playlistInfo.playCount}}</strong> 次
      </span>
    </div>

    <!-- 歌单 -->
    <table class="list">
      <thead>
        <tr>
          <th class="col1"></th>
          <th class="col2"><div class="wp">歌曲标题</div></th>
          <th class="col3"><div class="wp">时长</div></th>
          <th class="col4"><div class="wp">歌手</div></th>
          <th class="col5"><div class="wp">专辑</div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in playlistInfo.tracks" :key="item.id" :class="[index % 2 === 0 ? 'even' : '']">
          <!-- 序号 -->
          <td>
            <div class="hd">
              <span class="num">{{index + 1}}</span>
              <span class="play"></span>
            </div>
            
          </td>

          <!-- 标题 -->
          <td>
            <div class="tt">
               <div class="ttc">
                <span class="txt ellipsis">
                  <a href="javascript:;" class="song-name">{{ item.name }}</a>
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
              <a href="javascript:;" title="添加到播放列表" class="a1"></a>
              <a href="javascript:;" title="收藏" class="a2"></a>
              <a href="javascript:;" title="分享" class="a3"></a>
              <a href="javascript:;" title="下载" class="a4"></a>
            </div>
          </td>

          <!-- 歌手 -->
          <td>
            <div class="artists ellipsis">
              <a href="javascript:;" v-for="(artist, index) in item.ar" :key="artist.id">
                {{artist.name}}<span v-if="index < item.ar.length - 1">/</span>
                </a>
            </div>
          </td>

          <!-- 专辑 -->
          <td>
            <div class="album ellipsis">
              <a href="javascript:;">{{item.al.name}}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 评论 -->
    <Comments/>
  </div>
</template>

<script>
import Comments from '@/views/Home/TopList/MainRight/Comments.vue'
export default {
  name: 'PlayList',
  components: {Comments},
  data() {
    return {
      playlistInfo: {}, // 歌单信息
      isUnfold: false, // 歌单介绍信息是否展开
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
    },
  },

  mounted() {
    this.getPlaylistDetail()
  },

  methods: {
    // 获取歌单详情
    async getPlaylistDetail() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqPlayList(this.id, cookie)
      this.playlistInfo = result.playlist
    },

    // 歌单创建时间
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
  },
}
</script>

<style lang="less" scoped>
.playlist {
  margin-left: 239px;
  min-height: 900px;
  width: 741px;
  border-left: 1px solid #d3d3d3;
  background-color: #fff;
  .title {
    padding: 40px;
    .cover {
      float: left;
      position: relative;
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
      .msk {
        position: absolute;
        top: -4px;
        left: -4px;
        width: 208px;
        height: 208px;
        background: url('@/assets/images/coverall.png') 0 -1285px no-repeat;
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
          background: url('@/assets/images/icon.png') 0 -243px no-repeat;
        }
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .user {
        margin: 0 0 20px;
        line-height: 35px;
        .face {
          float: left;
          margin-right: 10px;
          width: 35px;
          height: 35px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          float: left;
          max-width: 210px;
          a {
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .time {
          margin-left: 15px;
          color: #999;
          line-height: 35px;
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
      .tags {
        height: 22px;
        margin: 25px 0 5px;
        line-height: 22px;
        b {
          float: left;
          color: #666;
          font-weight: normal;
        }
        .tag {
          float: left;
          margin: 0 10px 3px 0;
          padding-right: 10px;
          text-shadow: 0 1px #fdfdfd;
          color: #777;
          height: 22px;
          line-height: 22px;
          background: url('@/assets/images/btnBg.png') right -27px no-repeat;
          i {
            float: left;
            height: 22px;
            line-height: 22px;
            padding: 0 3px 0 13px;
            background: url('@/assets/images/btnBg.png') 0 0 no-repeat;
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
  .list-tit {
    padding: 0 10px 0 32px;
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
    }
      .sub {
        float: left;
        margin: 9px 0 0 20px;
        color: #666;
      }
      .more {
        float: right;
        margin-top: 5px;
        color: #666;
        strong {
          color: #c20c0c;
        }
      }
  }
  .list{
    width: 100%;
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
        width: 111px;
      }
      .col4 {
        width: 14%;
      }
      .col5 {
        width: 20%;
      }
    }
    tbody {
      tr {
        &.even{
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
          .album {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
