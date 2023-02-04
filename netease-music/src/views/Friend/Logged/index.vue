<template>
  <div class="logged clearfix">
    <!-- 左侧内容 -->
    <div class="mainleft">
      <div class="title">
        <h3>动态</h3>
        <span class="pub-video" title="发布视频"></span>
        <span class="pub-event" title="发动态"></span>
      </div>

      <ul class="m-list">
        <li class="item clearfix" v-for="item in eventList" :key="item.id">
          <!-- 头像 -->
          <div class="user-face">
            <a href="javascript:;" class="face">
              <img v-lazy="item.avatarUrl" alt="">
            </a>
          </div>
          <div class="cnt">
            <!-- 用户名 -->
            <div class="type">
              <a href="javascript:;" class="username">{{item.nickname}}</a>
              <span class="icon">
                <img :src="item.identityIconUrl" alt="">
              </span>
              <span class="sep" v-show="item.song">分享单曲</span>
              <span class="sep" v-show="item.mv">分享MV</span>
            </div>
            <!-- 发布时间 -->
            <div class="time">{{item.eventTime}}</div>
            <!-- 文案 -->
            <div class="text">{{item.msg}}</div>
            <!-- MV -->
            <div class="mv" v-if="item.mv">
              <div class="video">
                <div class="info">
                  <div class="tit">
                    <p class="ellipsis-2">
                      <i class="mv-icn"></i>
                      <span class="name">{{item.mv.name}}</span>
                    </p>
                  </div>
                  <div class="bottom">
                    <span class="playcount">
                      <i class="ply-icn"></i>{{item.mv.playCount > 10000? (item.mv.playCount / 10000).toFixed(1) + '万': item.mv.playCount}}
                    </span>
                  </div>
                  <i class="play"></i>
                </div>
                <img v-lazy="item.mv.imgUrl" alt="">
              </div>
            </div>
            <!-- 单曲 -->
            <div class="song clearfix" v-if="item.song">
              <div class="cvr">
                <img v-lazy="item.song.coverUrl" alt="">
                <a href="javascript:;" class="ply"></a>
              </div>
              <div class="song-cnt">
                <h3 class="tit ellipsis"><router-link :to="{path: '/song', query: {id: `${item.song.id}`}}">{{item.song.name}}</router-link></h3>
                <h4 class="from ellipsis">
                  <router-link :to="{path: '/artist', query:{id: `${item.song.artist.id}`}}">{{item.song.artist.name}}</router-link>
                </h4>
              </div>
            </div>
            <!-- 图片 -->
            <ul class="pics clearfix" v-if="item.pics.length > 0">
              <li v-for="(pic, index) in item.pics" :key="index">
                <img v-lazy="pic.pcSquareUrl" >
              </li>
            </ul>
            <!-- 点赞转发评论 -->
            <div class="doper">
              <a href="javascript:;" class="like">
                <i class="icn-like"></i>({{item.likedCount}})
              </a>
              <span class="line">|</span>
              <a href="javascript:;" class="share">转发 ({{item.shareCount}})</a>
              <span class="line">|</span>
              <a href="javascript:;" class="comment">评论 ({{item.commentCount}})</a>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div class="mainright">
      <div class="user">
        <a class="face">
          <img :src="userInfo.avatarUrl" />
        </a>
        <h5 class="ellipsis">{{ userInfo.nickname }}</h5>
        <ul class="info ellipsis">
          <li>
            <a href="javascript:;">
              <em>{{ userInfo.eventCount }}</em>
              <i>动态</i>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em>{{ userInfo.follows }}</em>
              <i>关注</i>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em>{{ userInfo.followeds }}</em>
              <i>粉丝</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logged',
  data() {
    return {
      userInfo: {}, // 用户信息
      lastTime: -1, // 上一次请求动态数据
      pageSize: 20,
      eventList: [], // 动态列表
      flag: true, // 是否能够发起请求获取动态内容
      height: 10000, // 页面高度
      timer: null, // 定时器
    }
  },

  mounted() {
    this.getUserInfo() // 获取用户信息
    this.getEvent() // 获取动态
    // 监听当前页面的rolly
    window.addEventListener('scroll', this.handleScrollx, true)
    // 开启定时器保证2s内只发一次请求
    this.timer = setInterval(() => {
      this.flag = true
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    // 获取用户信息
    async getUserInfo() {
      let cookie = localStorage.getItem('COOKIE')
      let userId = localStorage.getItem('USERID')
      let result = await this.$api.reqUserDetail(userId, cookie)
      this.userInfo = result.profile
    },

    // 获取动态消息
    async getEvent() {
      if (!this.flag) return
      this.flag = false
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqEvent(this.pageSize, this.lastTime, cookie)
      this.lastTime = result.lasttime
      result.event.forEach((item) => {
        let eventItem = {} // 单条动态的内容
        eventItem.id = item.id  // id
        eventItem.nickname = item.user.nickname // 用户名
        eventItem.avatarUrl = item.user.avatarUrl // 头像
        eventItem.identityIconUrl = item.user.avatarDetail.identityIconUrl // 身份标识
        item.data = JSON.parse(item.json) // 动态内容
        eventItem.msg = item.data.msg // 动态文案
        eventItem.pics = item.pics // 动态中的图片
        // 动态中的单曲
        if (item.data.song) {
          eventItem.song = {}
          eventItem.song.coverUrl = item.data.song.album.blurPicUrl // 封面
          eventItem.song.id = item.data.song.id // 歌曲id
          eventItem.song.name = item.data.song.name // 歌曲名
          eventItem.song.artist = {}
          eventItem.song.artist.name = item.data.song.artists[0].name // 歌手名
          eventItem.song.artist.id = item.data.song.artists[0].id  // 歌手id
        }
        // 动态中的视频
        if (item.data.mv) {
          eventItem.mv = {}
          eventItem.mv.imgUrl = item.data.mv.imgurl // 封面
          eventItem.mv.id = item.data.mv.id // id
          eventItem.mv.name = item.data.mv.name // 视频名
          eventItem.mv.playCount = item.data.mv.playCount // 播放量
        }
        eventItem.shareCount = item.info.shareCount // 转发量
        eventItem.commentCount = item.info.commentCount // 评论量
        eventItem.likedCount = item.info.likedCount // 点赞量
        let time = new Date(item.eventTime)
        eventItem.eventTime =
          time.toLocaleDateString().replace(/\//g, '-') +
          ' ' +
          time.toTimeString().substr(0, 5) // 发布时间
        this.eventList.push(eventItem)
      })
    },

    // 监听页面滚动
    handleScroll() {
      let h = window.pageYOffset
      if (h > this.height - 2500) {
        this.getEvent()
      }
      this.height = document.body.scrollHeight
    },
  },
}
</script>

<style lang="less" scoped>
.logged {
  width: 982px;
  margin: 0 auto;
  min-height: 700px;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .mainleft {
    width: 681px;
    padding: 20px 30px;
    float: left;
    background-color: #fff;
    border-right: 1px solid #d3d3d3;
    .title {
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: normal;
      }
      .pub-video,
      .pub-event {
        float: right;
        margin: 6px 0 0 10px;
        background: url('@/assets/images/frd_dyn_sprite.png') no-repeat;
        cursor: pointer;
      }
      .pub-video {
        width: 84px;
        height: 24px;
        background-position: -100px -452px;
        &:hover {
          background-position: -100px -480px;
        }
      }
      .pub-event {
        width: 71px;
        height: 24px;
        background-position: 0 -452px;
        &:hover {
          background-position: 0 -480px;
        }
      }
    }
    .m-list {
      margin-top: 20px;
      .item {
        position: relative;
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e9;
        .user-face {
          float: left;
          width: 54px;
          .face {
            display: block;
            width: 45px;
            height: 45px;
            img {
              width: 100%;
            }
          }
        }
        .cnt {
          margin-left: 55px;
          padding-top: 4px;
          .type {
            font-size: 14px;
            .username {
              color: #0c73c2;
            }
            .icon {
              display: inline-block;
              width: 15px;
              height: 15px;
              margin: 2px 0 0 2px;
              vertical-align: top;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .sep {
              margin-left: 5px;
              color: #666;
              font-size: 14px;
            }
          }
          .time {
            margin-top: 7px;
            color: #999;
          }
          .text {
            margin-top: 10px;
            line-height: 24px;
            font-size: 14px;
            word-break: break-word;
          }
          .mv {
            margin: 4px 0 5px;
            .video {
              position: relative;
              width: 338px;
              height: 189px;
              cursor: pointer;
              .info {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
                color: #fff;
                background-color: rgba(0,0,0,.1);
                .tit {
                  width: 100%;
                  font-size: 12px;
                  line-height: 15px;
                  padding: 10px;
                  height: 120px;
                  vertical-align: top;
                  background: url('@/assets/images/frd_cover_mask.png') 0 -184px repeat-x;
                  p {
                    max-height: 30px;
                    .mv-icn {
                      display: inline-block;
                      width: 21px;
                      height: 12px;
                      margin-right: 4px;
                      background: url('@/assets/images/frd_dyn_sprite.png') 0 -210px no-repeat;
                    }
                    .name {
                      word-wrap: break-word;
                      word-break: break-all;
                      font-size: 12px;
                      line-height: 15px;
                    }
                  }
                }
                .bottom {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  padding: 33px 10px 10px;
                  height: 53px;
                  font-size: 14px;
                  background: url('@/assets/images/frd_cover_mask.png') 0 -285px repeat-x;
                  .playcount {
                    float: left;
                    line-height: 10px;
                    .ply-icn {
                      display: inline-block;
                      vertical-align: top;
                      margin-right: 4px;
                      width: 8px;
                      height: 10px;
                      background: url('@/assets/images/frd_dyn_sprite.png') -50px -510px no-repeat;
                    }
                  }
                }
                  .play {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -20px 0 0 -20px;
                    width: 40px;
                    height: 40px;
                    background: url('@/assets/images/frd_dyn_sprite.png') 0 -510px no-repeat;
                    opacity: 0.8;
                  }
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .song {
            padding: 10px;
            margin: 4px 0 5px;
            background-color: #f5f5f5;
            .cvr {
              float: left;
              position: relative;
              width: 40px;
              height: 40px;
              img {
              width: 100%;
              height: 100%;
              }
              .ply {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                background: url('@/assets/images/frd_dyn_sprite.png') -100px -70px no-repeat;
              }
            }
            .song-cnt {
              margin-left: 60px;
              height: 40px;
              line-height: 22px;
              .tit {
                font-weight: normal;
              }
              .from {
                font-weight: normal;
                color: #666;
              }
            }
          }
          .pics {
            li {
              float: left;
              width: 224px;
              height: 224px;
              margin-left: 4px;
              margin-top: 4px;
              background-color: #e5e5e5;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .doper {
            margin: 18px 0 -2px;
            text-align: right;
            line-height: normal;
            .like, .share, .comment {
              color: #0c73c2;
            }
            .like {
              .icn-like {
                display: inline-block;
                vertical-align: top;
                width: 14px;
                height: 14px;
                margin: 0 3px 0 0;
                background: url('@/assets/images/frd_dyn_sprite.png') 0 -20px no-repeat;
              }
            }
            .line {
              color: #c7c7c7;
              margin: 0 10px 0 12px;
            }
          }
        }
      }
    }
  }
  .mainright {
    width: 299px;
    float: left;
    .user {
      position: relative;
      height: 193px;
      background: url('@/assets/images/frduser.png') 0 0 repeat-x;
      .face {
        position: absolute;
        top: 38px;
        left: 30px;
        width: 70px;
        height: 70px;
        img {
          width: 68px;
          height: 68px;
          padding: 2px;
          background-color: #fff;
          border: 1px solid #dadada;
        }
      }
      h5 {
        position: absolute;
        top: 40px;
        left: 112px;
        width: 180px;
        font-size: 14px;
      }
      .info {
        position: absolute;
        top: 134px;
        left: 13px;
        li {
          float: left;
          margin: 0 2px 0 -2px;
          border-left: 1px solid #c2c2c2;
          a {
            display: block;
            padding: 0 20px;
            color: #666;
            em {
              display: block;
              padding: 0 0 9px;
              font-size: 20px;
              line-height: 20px;
            }
            i {
              display: block;
              padding: 0 0 2px;
            }
          }
        }
      }
    }
  }
}
</style>
