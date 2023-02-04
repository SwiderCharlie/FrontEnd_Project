<template>
  <div class="songlist">
    <!-- 标题栏 -->
    <div class="title">
      <h3>歌曲列表</h3>
      <span class="sub">{{ songList.length }}首歌</span>
      <div class="count">
        播放：<em>{{ playCount }}</em
        >次
      </div>
    </div>

    <!-- 歌单列表 -->
    <table class="list">
      <thead>
        <tr>
          <th class="col1"></th>
          <th class="col2"><div class="wp">标题</div></th>
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
              <div class="rk">
                <span class="new" v-if="rkChange[index] === length"></span>
                <span class="icn up" v-else-if="rkChange[index] > 0">{{
                  rkChange[index]
                }}</span>
                <span class="icn nochange" v-else-if="rkChange[index] === 0"
                  >0</span
                >
                <span class="icn down" v-else-if="rkChange[index] < 0">{{
                  -rkChange[index]
                }}</span>
              </div>
            </div>
          </td>

          <!-- 标题 -->
          <td>
            <div class="tt">
              <router-link :to="{path: '/song', query: {id: `${item.id}`}}" v-if="index < 3">
                <img v-lazy="item.al.picUrl" class="rpic" />
              </router-link>
              <span class="play" :class="[index < 3 ? 'top3' : '']" @click="playMusic(item.id)"></span>
              <div class="ttc" :class="[index < 3 ? 'top3' : '']">
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
              <span class="ar" v-for="(artist, index) in item.ar"
                :key="artist.id">
                <router-link :to="{path:'/artist',query:{id:`${artist.id}`}}" :title="artist.name">{{artist.name}}</router-link>
                <span v-if="index < item.ar.length - 1">/</span>
                </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { rk_simulation } from '@/utils/rank_simulation.js'

export default {
  name: 'SongList',
  props: ['songList', 'playCount'],
  data() {
    return {
      length: 0, // 歌单列表长度
      rkChange: [], // 歌曲排名变化情况
    }
  },

  mounted() {
    this.length = this.songList.length // 歌单列表长度
    this.rkChange = rk_simulation(this.songList.length) // 计算模拟排名变化
  },

  watch: {
    songList() {
      // 重新计算歌曲排名变化情况和歌单列表长度
      this.length = this.songList.length
      this.rkChange = rk_simulation(this.length)
    },
  },

  methods: {
    // 毫秒转换为mm:ss格式
    toTime(ms) {
      let m = Math.floor(ms / 1000 / 60)
      let s = Math.floor(ms / 1000 - m * 60)
      return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
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
.songlist {
  width: 100%;
  padding: 0 30px 0 40px;
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
    .count {
      margin-top: 5px;
      float: right;
      color: #666;
      em {
        color: #c20c0c;
        font-weight: bold;
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
        width: 77px;
      }
      .col3 {
        width: 91px;
      }
      .col4 {
        width: 26%;
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
            .rk {
              float: right;
              width: 32px;
              margin-right: -5px;
              text-align: center;
              color: #bb2128;
              .icn {
                padding-left: 8px;
                line-height: 17px;
                font-size: 10px;
                background: url('@/assets/images/icon.png') no-repeat;
                &.up {
                  background-position: -74px -299px;
                }
                &.nochange {
                  background-position: -74px -268px;
                  color: #999;
                }
                &.down {
                  background-position: -74px -318px;
                }
              }
              .new {
                display: block;
                width: 16px;
                height: 17px;
                padding-left: 0;
                margin: 0 auto;
                background: url('@/assets/images/icon.png') -67px -283px;
              }
            }
          }
          .tt {
            float: left;
            width: 100%;
            .rpic {
              float: left;
              width: 50px;
              height: 50px;
              margin-right: 14px;
            }
            .play {
              float: left;
              margin-right: 8px;
              width: 17px;
              height: 17px;
              cursor: pointer;
              background: url('@/assets/images/table.png') 0 -103px;
              &:hover {
                background-position: 0 -128px;
              }
            }
            .ttc {
              height: 18px;
              margin-right: 20px;
              overflow: hidden;
              .txt {
                display: inline-block;
                max-width: 88%;
                height: 20px;
                .song-name:hover {
                  text-decoration: underline;
                }
                .ailas {
                  color: #aeaeae;
                }
              }
            }
            .top3 {
              margin-top: 16px;
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
</style>
