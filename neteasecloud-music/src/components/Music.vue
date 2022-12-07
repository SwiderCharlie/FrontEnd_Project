<template>
  <div class="music-container" @mouseover="show" @mouseout="hide" ref="player">
    <!-- 音频标签 -->
    <audio :src="audio" ref="audio"></audio>
    <!-- 音乐播放器锁定按钮 -->
    <div class="btn">
      <a
        href="javascript:;"
        class="lock"
        @click="locked = false"
        v-show="locked"
      ></a>
      <a
        href="javascript:;"
        class="unlock"
        @click="locked = true"
        v-show="!locked"
      ></a>
    </div>
    <div class="wrap-content">
      <!-- 开始暂停和上一首下一首控件 -->
      <div class="btns">
        <a
          href="javascript:;"
          title="上一首(ctrl+←)"
          class="prev"
          @click="prev"
        ></a>
        <a
          href="javascript:;"
          title="播放/暂停(p)"
          class="play"
          @click="playMusic"
          v-show="!play"
        ></a>
        <a
          href="javascript:;"
          title="播放/暂停(p)"
          class="pause"
          @click="pauseMusic"
          v-show="play"
        ></a>
        <a
          href="javascript:;"
          title="下一首(ctrl+→)"
          class="next"
          @click="next"
        ></a>
      </div>
      <!-- 封面 -->
      <div class="head">
        <img :src="musicDetail.al.picUrl" v-if="musicDetail.al" />
        <img src="../assets/images/default_album.jpg" v-else />
        <a href="JavaScript:;" class="mask"></a>
      </div>
      <!-- 进度条 -->
      <div class="play-bar">
        <div class="words" v-if="Object.keys(musicDetail).length !== 0">
          <router-link to="/" class="name" :title="musicDetail.name">{{
            musicDetail.name
          }}</router-link>
          <router-link to="/" class="mv" title="MV"></router-link>
          <router-link to="/" class="al" :title="musicDetail.ar[0].name">{{
            musicDetail.ar[0].name
          }}</router-link>
          <router-link to="/" class="rank" title="来自听歌排行榜"></router-link>
        </div>
        <div class="words" v-else></div>
        <div class="bar" ref="bar">
          <div class="barbg" @click="changeBar">
            <div class="rdy"></div>
            <div class="cur" :style="'width: ' + `${width}` + '%'">
              <div
                class="curBtn"
                @mousedown="isDragBar = true"
                @mousemove="dragBar"
                @mouseup="changeBar"
              ></div>
            </div>
          </div>
          <span class="time">
            <em>{{ nowTime }}</em> / {{ duration }}
          </span>
        </div>
      </div>
      <!-- 右侧控件 -->
      <div class="ctrl">
        <div class="left">
          <a href="javscript:;" title="画中画歌词" class="lyric"></a>
          <a href="javscript:;" title="收藏" class="collect"></a>
          <a href="javscript:;" title="分享" class="share"></a>
        </div>
        <div class="right">
          <a
            href="javascript:;"
            class="controls volume"
            @click="isShowVolume = !isShowVolume"
          ></a>
          <div class="volume-box" v-show="isShowVolume">
            <div class="volume-box-bg" @click="changeVolume">
              <div class="cur" :style="'height:' + `${volumeHeight}` + '%'">
                <div
                  class="curBtn"
                  @mousedown="isDragVolume = true"
                  @mousemove="dragVolume"
                  @mouseup="changeVolume"
                ></div>
              </div>
            </div>
          </div>
          <a
            href="javascript:;"
            title="循环"
            class="controls loop1"
            v-show="loopMode === 0"
            @click="changeLoopMode"
          ></a>
          <a
            href="javascript:;"
            title="随机"
            class="controls loop2"
            v-show="loopMode === 1"
            @click="changeLoopMode"
          ></a>
          <a
            href="javascript:;"
            title="单曲循环"
            class="controls loop3"
            v-show="loopMode === 2"
            @click="changeLoopMode"
          ></a>
          <span>
            <a
              href="javascript:;"
              title="播放列表"
              class="controls list-btn"
              @click="isShowList = !isShowList"
              >{{ musicList.length }}</a
            >
          </span>
          <!-- 播放列表 -->
          <div class="list" v-show="isShowList">
            <div class="list-hd">
              <h4>播放列表({{ this.musicList.length }})</h4>
              <a href="javascript:;" class="addall">
                <span class="icon-add"></span>
                收藏全部
              </a>
              <span class="line"></span>
              <a href="javascript:;" class="clear" @click="clearList">
                <span class="icon-del"></span>
                清除
              </a>
              <span class="close" @click="isShowList = !isShowList"></span>
            </div>
            <div class="list-bd">
              <div class="list-left">
                <div class="no-content" v-if="musicList.length === 0">
                  <i class="icon-no-content"></i>你还没有添加任何歌曲
                  <br />
                  去首页
                  <router-link to="/discovery">发现音乐</router-link
                  >，或在<router-link to="/my">我的音乐</router-link
                  >收听自己收藏的歌单。
                </div>
                <ul class="music-list" v-else>
                  <li
                    v-for="item in musicList"
                    :key="item.id"
                    @dblclick="dbMusic(item.id)"
                  >
                    <div class="col col1">
                      <i class="playicn" v-show="musicNow.id === item.id"></i>
                    </div>
                    <div class="col col2 ellipsis">{{ item.name }}</div>
                    <div class="col col3">
                      <div class="icons">
                        <i class="del" @click="delMusic(item.id)"></i>
                        <i class="download"></i>
                        <i class="share"></i>
                        <i class="add"></i>
                      </div>
                    </div>
                    <div class="col col4">
                      <span
                        v-for="(artist, index) in item.ar"
                        :key="artist.id"
                        class="ellipsis"
                      >
                        <router-link to="/" class="artist">{{
                          artist.name
                        }}</router-link>
                        <span v-if="index !== item.ar.length - 1"> / </span>
                      </span>
                    </div>
                    <div class="col col5">{{ toTime(item.dt) }}</div>
                    <div class="col col6">
                      <i class="link"></i>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="bline" v-if="musicList.length === 0"></div>
              <div class="list-right">
                <div class="ask">
                  <a href="javascript:;" class="icon-ask"></a>
                </div>
                <div class="lyric" ref="lyric">
                  <div class="lyric-container">
                    <p
                      v-for="(line, index) in currentLyric.lines"
                      :key="index"
                      :class="[lyricIndex === index ? 'highlight' : '']"
                      @dblclick="lyricPosition(line.time)"
                    >
                      {{ line.txt }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
export default {
  name: 'Music',
  data() {
    return {
      audio: '', // 音频文件url
      musicId: '', // 音频id
      musicDetail: {}, // 歌曲详情
      duration: '00:00', // 总时长
      nowTime: '00:00', // 歌曲已播放时长
      isShowVolume: false, // 是否展示音量状态栏
      locked: true, // 是否锁定播放器
      play: false, // 当前是否正在播放歌曲
      isDragBar: false, // 是否正在拖拽进度条
      isDragVolume: false, // 是否正在拖拽音量条
      width: 0, // 当前歌曲播放比例
      loopMode: 0, // 循环模式：0循环，1随机，2单曲循环
      volumeHeight: 60, //当前设置音量百分比
      timer: null, // 定时器
      isShowList: false, // 是否展示播放列表
      currentLyric: {}, // 歌词
      curIndex: 0, // 当前播放歌曲在播放队列中的序号
      lyricIndex: 0, // 当前播放歌词序号
    }
  },
  computed: {
    // 当前播放歌曲
    musicNow() {
      return this.$store.state.music.musicNow
    },
    // 当前的播放列表
    musicList() {
      return this.$store.state.music.musicList
    },
  },
  created() {
    this.$store.dispatch('music/getMusicNow') // 从本地获取当前播放歌曲
    this.$store.dispatch('music/getMusicList') // 从本地获取播放列表
  },
  watch: {
    // 当前播放歌曲
    musicNow() {
      this.audio = ''
      this.musicDetail = {}
      this.duration = '00:00'
      if (Object.keys(this.musicNow).length !== 0) {
        this.musicId = this.musicNow.id
        this.init().then(() => {
          if (this.play) this.playMusic()
        })
      }
    },
    // 当前播放的歌词序号
    lyricIndex() {
      this.$refs.lyric.scrollTop = (this.lyricIndex - 3) * 32
    },
  },
  methods: {
    // 展示音乐播放器
    show() {
      this.$refs.player.style.height = '53px'
    },
    // 隐藏音乐播放器
    hide() {
      if (!this.locked) {
        this.$refs.player.style.height = '7px'
        this.isShowVolume = false
      }
    },
    // 改变循环模式
    changeLoopMode() {
      this.loopMode = (this.loopMode + 1) % 3
    },
    // 拖拽进度条
    dragBar(e) {
      if (this.isDragBar) {
        this.width = ((e.clientX - this.$refs.bar.offsetLeft) / 466) * 100
        this.width = Math.max(0, Math.min(this.width, 100))
        this.$refs.audio.currentTime =
          (this.width / 100) * this.$refs.audio.duration
      }
    },
    // 点击进度条定位
    changeBar(e) {
      this.isDragBar = true
      this.dragBar(e)
      this.isDragBar = false
    },
    // 拖拽音量
    dragVolume(e) {
      if (this.isDragVolume) {
        let height = ((window.innerHeight - e.clientY - 63) / 93) * 100
        this.volumeHeight = Math.max(0, Math.min(height, 100))
        this.$refs.audio.volume = this.volumeHeight / 100
      }
    },
    // 点击定位音量
    changeVolume(e) {
      this.isDragVolume = true
      this.dragVolume(e)
      this.isDragVolume = false
    },
    // 获取音频文件
    async getMusicUrl() {
      let result = await this.$api.reqSongUrl(this.musicId)
      this.audio = result.data[0].url
      this.$refs.audio.volume = this.volumeHeight / 100
    },
    // 获取歌曲详情
    async getMusicDetail() {
      let result = await this.$api.reqSongDetail(this.musicId)
      this.musicDetail = result.songs[0]
      // 歌曲总时长
      this.duration = this.toTime(this.musicDetail.dt)
    },
    // 获取歌词
    async getLyric() {
      let result = await this.$api.reqLyric(this.musicId)
      this.currentLyric = new Lyric(result.lrc.lyric, this.handler)
    },
    // 初始化歌曲相关内容
    async init() {
      await this.getMusicUrl()
      await this.getMusicDetail()
      await this.getLyric()
    },
    // 毫秒转换为mm:ss格式
    toTime(ms) {
      let m = Math.floor(ms / 1000 / 60)
      let s = Math.floor(ms / 1000 - m * 60)
      return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
    },

    // 开始播放音乐
    playMusic() {
      this.play = true
      this.$refs.audio.play()
      this.watchMusic()
      this.show()
    },
    // 暂停播放音乐
    pauseMusic() {
      this.play = false
      this.$refs.audio.pause()
      clearInterval(this.timer)
    },
    // 监视歌曲播放进度
    watchMusic() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.width =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        this.duration = this.toTime(this.$refs.audio.duration * 1000)
        this.nowTime = this.toTime(this.$refs.audio.currentTime * 1000)
        for (let i = 0; i < this.currentLyric.lines.length; i++) {
          if (
            this.currentLyric.lines[i].time / 1000 >
            this.$refs.audio.currentTime
          ) {
            this.lyricIndex = i - 1
            break
          }
        }
        if (this.$refs.audio.ended) {
          if (this.loopMode === 2) {
            this.$refs.audio.currentTime = 0
            this.playMusic()
            return
          } else {
            this.next()
          }
          clearInterval(this.timer)
        }
      }, 50)
    },

    // 切换上一首歌曲
    prev() {
      if (this.loopMode === 0 || this.loopMode === 2) {
        // 列表循环或单曲循环模式
        this.curIndex =
          this.curIndex - 1 < 0 ? this.musicList.length - 1 : this.curIndex - 1
      } else {
        // 随机播放模式
        this.curIndex = Math.floor(Math.random() * this.musicList.length)
      }
      setTimeout(() => {
        this.setMusic(this.musicList[this.curIndex].id)
      }, 500)
    },
    // 切换下一首歌曲
    next() {
      if (this.loopMode === 0 || this.loopMode === 2) {
        // 列表循环或单曲循环模式
        this.curIndex =
          this.curIndex + 1 >= this.musicList.length ? 0 : this.curIndex + 1
      } else {
        // 随机播放模式
        this.curIndex = Math.floor(Math.random() * this.musicList.length)
      }
      setTimeout(() => {
        this.setMusic(this.musicList[this.curIndex].id)
      }, 500)
    },
    // 切换当前播放歌曲
    setMusic(id) {
      this.$store.dispatch('music/setMusicNow', id)
    },
    // 双击歌曲播放
    dbMusic(id) {
      this.play = true
      this.setMusic(id)
    },
    // 双击歌词跳转播放位置
    lyricPosition(time) {
      this.$refs.audio.currentTime = time / 1000
      this.width =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
    },
    // 删除歌曲
    delMusic(id) {
      if (this.musicList.length === 1) {
        this.$store.dispatch('music/clearList')
      } else {
        this.$store.dispatch('music/delMusic', id)
      }
    },
    // 清空播放列表
    clearList() {
      clearInterval(this.timer)
      this.$store.dispatch('music/clearList')
    },
  },
}
</script>

<style lang="less" scoped>
.music-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 53px;
  zoom: 1;
  margin-right: 67px;
  background: url('../assets/images/controls.png') 0 0 repeat-x;
  transition: all 0.5s;
  .btn {
    position: absolute;
    right: 15px;
    top: -14px;
    width: 52px;
    height: 67px;
    z-index: -1;
    background: url('../assets/images/controls.png') 0 -380px no-repeat;
    .lock,
    .unlock {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      background: url('../assets/images/controls.png') -100px -380px;
      &:hover {
        background-position: -100px -400px;
      }
    }
    .unlock {
      background-position: -80px -380px;
      &:hover {
        background-position: -80px -400px;
      }
    }
  }
  .wrap-content {
    height: 53px;
    margin: 5px auto;
    .btns {
      float: left;
      width: 137px;
      padding: 6px 0 0;
      a {
        display: block;
        float: left;
        width: 28px;
        height: 28px;
        margin-right: 8px;
        margin-top: 5px;
        background: url('../assets/images/controls.png');
      }
      .prev {
        background-position: 0 -130px;
        &:hover {
          background-position: -30px -130px;
        }
      }
      .play,
      .pause {
        width: 36px;
        height: 36px;
        margin-top: 0;
        background-position: 0 -204px;
        &:hover {
          background-position: -40px -204px;
        }
      }
      .pause {
        background-position: 0 -165px;
        &:hover {
          background-position: -40px -165px;
        }
      }
      .next {
        background-position: -80px -130px;
        &:hover {
          background-position: -110px -130px;
        }
      }
    }
    .head {
      float: left;
      position: relative;
      margin: 6px 15px 0 0;
      img {
        width: 34px;
        height: 34px;
      }
      .mask {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        background: url('../assets/images/controls.png') 0 -80px;
      }
    }
    .play-bar {
      float: left;
      width: 581px;
      .words {
        height: 28px;
        overflow: hidden;
        color: #e8e8e8;
        text-shadow: 0 1px 0 #171717;
        line-height: 28px;
        .name {
          float: left;
          color: #e8e8e8;
          &:hover {
            text-decoration: underline;
          }
        }
        .mv {
          float: left;
          width: 19px;
          height: 17px;
          margin: 6px 0 0 3px;
          background: url('../assets/images/controls.png') 0 -57px no-repeat;
          &:hover {
            background-position: -20px -57px;
          }
        }
        .al {
          float: left;
          margin-left: 15px;
          color: #9b9b9b;
          &:hover {
            text-decoration: underline;
          }
        }
        .rank {
          float: left;
          width: 14px;
          height: 15px;
          margin: 7px 0 0 13px;
          background: url('../assets/images/controls.png') -110px -103px
            no-repeat;
          &:hover {
            background-position: -130px -103px;
          }
        }
      }
      .bar {
        width: 581px;
        height: 9px;
        position: relative;
        .barbg {
          position: relative;
          height: 9px;
          width: 466px;
          background: url('../assets/images/bars.png') right 0 no-repeat;
          .rdy {
            position: absolute;
            width: 466px;
            height: 9px;
            background: url('../assets/images/bars.png') right -30px no-repeat;
          }
          .cur {
            height: 9px;
            position: absolute;
            background: url('../assets/images/bars.png') 0 -66px no-repeat;
            .curBtn {
              position: absolute;
              top: -7px;
              right: -10px;
              width: 22px;
              height: 24px;
              border-radius: 18px;
              margin-left: -11px;
              background: url('../assets/images/btns.png') 0 -250px;
              &:hover {
                cursor: pointer;
                background-position: 0 -280px;
              }
            }
          }
        }
        .time {
          position: absolute;
          top: -6px;
          right: 30px;
          color: #797979;
          text-shadow: 0 1px 0 #121212;
          em {
            color: #a1a1a1;
          }
        }
      }
    }
    .ctrl {
      float: left;
      .left {
        float: left;
        width: 87px;
        height: 36px;
        a {
          float: left;
          width: 25px;
          height: 25px;
          margin: 11px 2px 0 0;
          background: url('../assets/images/controls.png') 0 0;
        }
        .lyric {
          background: url('../assets/images/lyric.png') 0 0 no-repeat;
          &:hover {
            background-position: 0 -25px;
          }
        }
        .collect {
          background-position: -88px -163px;
          &:hover {
            background-position: -88px -189px;
          }
        }
        .share {
          background-position: -114px -163px;
          &:hover {
            background-position: -114px -189px;
          }
        }
      }
      .right {
        position: relative;
        float: left;
        width: 126px;
        height: 36px;
        padding-left: 13px;
        .controls {
          float: left;
          width: 25px;
          height: 25px;
          margin: 11px 2px 0 0;
          background: url('../assets/images/controls.png') no-repeat;
        }
        .volume {
          background-position: -2px -248px;
          &:hover {
            background-position: -31px -248px;
          }
        }
        .volume-box {
          position: absolute;
          z-index: 1;
          top: -112px;
          left: 9px;
          clear: both;
          width: 32px;
          height: 113px;
          background: url('../assets/images/controls.png') 0 -503px no-repeat;
          .volume-box-bg {
            position: absolute;
            left: 14px;
            width: 4px;
            height: 93px;
            bottom: 10px;
            .cur {
              position: absolute;
              width: 4px;
              bottom: 0;
              background: url('../assets/images/controls.png') -40px bottom no-repeat;
            }
            .curBtn {
              position: absolute;
              top: -9px;
              left: -7px;
              width: 18px;
              height: 20px;
              background: url('../assets/images/btns.png') -40px -250px;
              &:hover {
                cursor: pointer;
                background-position: -40px -280px;
              }
            }
          }
        }
        .loop1 {
          background-position: -3px -344px;
          &:hover {
            background-position: -33px -344px;
          }
        }
        .loop2 {
          background-position: -66px -248px;
          &:hover {
            background-position: -93px -248px;
          }
        }
        .loop3 {
          background-position: -66px -344px;
          &:hover {
            background-position: -93px -344px;
          }
        }
        span {
          float: left;
          width: 59px;
          height: 36px;
          .list-btn {
            display: block;
            float: none;
            width: 59px;
            padding-left: 21px;
            line-height: 27px;
            text-align: center;
            color: #666;
            background-position: -42px -68px;
            &:hover {
              background-position: -42px -98px;
            }
          }
        }
        .list {
          position: absolute;
          width: 986px;
          height: 301px;
          top: -300px;
          left: -842px;
          .list-hd {
            position: relative;
            height: 41px;
            background: url('../assets/images/playlist_bg.png') 0 0 no-repeat;
            padding: 0 5px;
            color: #ccc;
            h4 {
              position: absolute;
              left: 25px;
              height: 39px;
              line-height: 39px;
              font-size: 14px;
              color: #e2e2e2;
            }
            .addall,
            .clear {
              position: absolute;
              top: 12px;
              height: 15px;
              line-height: 15px;
              color: #ccc;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
                .icon-add {
                  background-position: -24px -20px;
                }
                .icon-del {
                  background-position: -51px -20px;
                }
              }
              .icon-add,
              .icon-del {
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background: url('../assets/images/playlist.png');
              }
            }
            .addall {
              left: 398px;
              .icon-add {
                background-position: -24px 0;
              }
            }
            .clear {
              left: 490px;
              .icon-del {
                background-position: -51px 0;
              }
            }
            .line {
              position: absolute;
              top: 13px;
              left: 477px;
              width: 0;
              height: 15px;
              border-left: 1px solid #000;
              border-right: 1px solid #2c2c2c;
            }
            .close {
              position: absolute;
              top: 6px;
              right: 8px;
              width: 30px;
              height: 30px;
              cursor: pointer;
              background: url('../assets/images/playlist.png') -195px 9px;
              &:hover {
                background-position: -195px -21px;
              }
            }
          }
          .list-bd {
            position: relative;
            height: 260px;
            padding: 0 5px;
            overflow: hidden;
            background: url('../assets/images/playlist_bg.png') -1014px 0 repeat-y;
            .list-left {
              position: absolute;
              left: 2px;
              top: 0;
              height: 260px;
              width: 559px;
              .no-content {
                padding-top: 85px;
                text-align: center;
                line-height: 43px;
                color: #aaa;
              }
              .music-list {
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 6px;
                }
                &::-webkit-scrollbar-thumb {
                  background: #868686;
                  border-radius: 15px;
                }
                li {
                  float: left;
                  margin-right: 6px;
                  width: 100%;
                  &:hover {
                    .col {
                      color: #fff;
                    }
                    .artist {
                      color: #fff;
                    }
                  }
                  .col {
                    float: left;
                    padding-left: 10px;
                    height: 28px;
                    line-height: 28px;
                    overflow: hidden;
                    color: #ccc;
                  }
                  .col1 {
                    width: 20px;
                    .playicn {
                      display: block;
                      width: 10px;
                      height: 13px;
                      margin-top: 8px;
                      background: url('../assets/images/playlist.png') -182px 0;
                    }
                  }
                  .col2 {
                    width: 266px;
                  }
                  .col3 {
                    width: 88px;
                    position: relative;
                    .icons {
                      position: absolute;
                      display: none;
                      right: 0;
                      top: 0;
                      width: 100px;
                      height: 23px;
                      i {
                        float: right;
                        height: 16px;
                        overflow: hidden;
                        margin: 7px 0 0 10px;
                        background: url('../assets/images/playlist.png');
                      }
                      .del {
                        width: 13px;
                        background-position: -51px 0;
                        &:hover {
                          background-position: -51px -20px;
                        }
                      }
                      .download {
                        width: 14px;
                        background-position: -57px -50px;
                        &:hover {
                          background-position: -80px -50px;
                        }
                      }
                      .share {
                        width: 14px;
                        background-position: 0 0;
                        &:hover {
                          background-position: 0px -20px;
                        }
                      }
                      .add {
                        width: 16px;
                        background-position: -24px 0;
                        &:hover {
                          background-position: -24px -20px;
                        }
                      }
                    }
                  }
                  .col4 {
                    width: 80px;
                    a {
                      text-decoration: none;
                    }
                  }
                  .col5 {
                    width: 45px;
                  }
                  .col6 {
                    width: 53px;
                    padding-left: 6px;
                    .link {
                      display: block;
                      width: 14px;
                      height: 16px;
                      margin: 7px 0 0 10px;
                      background: url('../assets/images/playlist.png') -80px 0;
                      &:hover {
                        background-position: -80px -20px;
                      }
                    }
                  }
                  &.cur-music,
                  &:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                    .icons {
                      display: block;
                    }
                  }
                }
              }
              .icon-no-content {
                float: none;
                display: inline-block;
                top: -4px;
                width: 36px;
                height: 29px;
                margin-right: 3px;
                vertical-align: middle;
                background: url('../assets/images/playlist.png') -138px 0;
              }
              a {
                color: #aaa;
                text-decoration: underline;
              }
            }
            .bline {
              position: absolute;
              left: 555px;
              top: -1px;
              width: 6px;
              height: 260px;
              background: #000;
              opacity: 0.5;
            }
            .list-right {
              position: relative;
              left: 561px;
              height: 260px;
              width: 415px;
              .ask {
                position: absolute;
                right: 25px;
                top: 12px;
                .icon-ask {
                  display: inline-block;
                  width: 21px;
                  height: 21px;
                  background: url('../assets/images/playlist.png') 0 -50px;
                  &:hover {
                    background-position: -24px -50px;
                  }
                }
              }
              .lyric {
                position: relative;
                margin: 21px 0 20px 0;
                height: 219px;
                width: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 6px;
                }
                &::-webkit-scrollbar-thumb {
                  background: #868686;
                  border-radius: 15px;
                }
                .lyric-container {
                  position: absolute;
                  top: 0;
                  right: 40px;
                  width: 354px;
                  p {
                    color: #989898;
                    word-wrap: break-word;
                    text-align: center;
                    line-height: 32px;
                    height: auto !important;
                    min-height: 32px;
                    transition: color 0.3s linear;
                  }
                  .highlight {
                    color: #fff;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
