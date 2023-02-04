<template>
  <div class="playlist">
    <!-- 顶部 -->
    <div class="header">
      <h3>
        <span>{{ category }}</span>
        <a class="menu" @click="isShowList = !isShowList">
          <i>选择分类</i>
          <em class="u-icn"></em>
        </a>
      </h3>
      <a class="hot">热门</a>
    </div>

    <!-- 弹出框 -->
    <div class="cateListBox" v-show="isShowList">
      <div class="hd">
        <i class="icn"></i>
      </div>
      <div class="bd">
        <h3><a @click="changeCategory('全部')">全部风格</a></h3>

        <dl class="dl1">
          <dt><i></i>语种</dt>
          <dd>
            <span
              class="item"
              v-for="(item, index) in catList[0].sub"
              :key="index"
            >
              <a href="javscript:;" @click="changeCategory(item)" :class="[item===category? 'cur': '']">{{ item }}</a>
              <span class="line">|</span>
            </span>
          </dd>
        </dl>

        <dl class="dl2">
          <dt><i></i>风格</dt>
          <dd>
            <span
              class="item"
              v-for="(item, index) in catList[1].sub"
              :key="index"
            >
              <a href="javscript:;" @click="changeCategory(item)" :class="[item===category? 'cur': '']">{{ item }}</a>
              <span class="line">|</span>
            </span>
          </dd>
        </dl>

        <dl class="dl3">
          <dt><i></i>场景</dt>
          <dd>
            <span
              class="item"
              v-for="(item, index) in catList[2].sub"
              :key="index"
            >
              <a href="javscript:;" @click="changeCategory(item)" :class="[item===category? 'cur': '']">{{ item }}</a>
              <span class="line">|</span>
            </span>
          </dd>
        </dl>

        <dl class="dl4">
          <dt><i></i>情感</dt>
          <dd>
            <span
              class="item"
              v-for="(item, index) in catList[3].sub"
              :key="index"
            >
              <a href="javscript:;" @click="changeCategory(item)" :class="[item===category? 'cur': '']">{{ item }}</a>
              <span class="line">|</span>
            </span>
          </dd>
        </dl>

        <dl class="dl5">
          <dt><i></i>主题</dt>
          <dd>
            <span
              class="item"
              v-for="(item, index) in catList[4].sub"
              :key="index"
            >
              <a href="javscript:;" @click="changeCategory(item)" :class="[item===category? 'cur': '']">{{ item }}</a>
              <span class="line">|</span>
            </span>
          </dd>
        </dl>

      </div>
      <div class="ft"></div>
    </div>

    <!-- 主体内容 -->
    <ul class="mainer clearfix">
      <li v-for="item in playlists" :key="item.id">
        <div class="cover">
          <img v-lazy="item.coverImgUrl" />
          <router-link :to="{path:'/playlist',query:{id:`${item.id}`}}" class="mask" :title="item.name"></router-link>
          <div class="bottom">
            <a href="javascript:;" class="icn-play" title="播放" @click="setPlaylist(item.id)"></a>
            <span class="icn-headset"></span>
            <span class="nb">{{
              item.playCount >= 10000
                ? parseInt(item.playCount / 10000) + '万'
                : item.playCount
            }}</span>
          </div>
        </div>
        <p class="dec">
          <router-link :to="{path:'/playlist',query:{id:`${item.id}`}}" :title="item.name" class="title ellipsis">{{
            item.name
          }}</router-link>
        </p>
        <p class="creator">
          <span class="by">by</span>&nbsp;
          <a
            href="javascript:;"
            :title="item.creator.nickname"
            class="nickname ellipsis"
            >{{ item.creator.nickname }}</a
          >&nbsp;
          <img
            v-lazy="item.creator.avatarDetail.identityIconUrl"
            class="detail"
            v-if="item.creator.avatarDetail"
          />
        </p>
      </li>
    </ul>
    <!-- 分页器 -->
      <Pagination :pageNo='pageNo' :pageSize='pageSize' :total='tolPlaylists' :continues='7' @getPageNo="getPageNo"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'PlayList',
  components: { Pagination },
  data() {
    return {
      category: '全部', // 当前展示歌单类别
      isShowList: false, // 是否展示类别弹窗
      catList: [
        // 歌单分类信息
        { name: '语种', sub: [] },
        { name: '风格', sub: [] },
        { name: '场景', sub: [] },
        { name: '情感', sub: [] },
        { name: '主题', sub: [] },
      ],
      playlists: [], // 歌单列表
      tolPlaylists: 0, // 歌单总数
      pageSize: 35, // 每页歌单数
      pageNo: 1, // 当前展示的是第几页
    }
  },

  mounted() {
    this.getCatList() // 获取歌单分类
    this.getPlayLists() // 获取歌单列表
  },

  methods: {
    // 获取歌单分类
    async getCatList() {
      let result = await this.$api.reqCatList()
      result.sub.forEach((item) => {
        this.catList[item.category].sub.push(item.name)
      })
    },

    // 获取歌单列表
    async getPlayLists() {
      let result = await this.$api.reqTopPlaylist(
        'hot',
        this.category,
        this.pageSize,
        (this.pageNo - 1) * this.pageSize
      )
      this.tolPlaylists = result.total
      this.playlists = result.playlists
    },

    // 获取当前页数
    getPageNo(pageNo) {
      this.pageNo = pageNo
      document.body.scrollTop = document.documentElement.scrollTop = 0  // 回到顶部
      this.playlists = this.getPlayLists()
    },

    // 切换歌单分类
    changeCategory(cat) {
      this.category = cat
      this.getPlayLists()
      this.isShowList = false
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
    },
  },
}
</script>

<style lang="less" scoped>
.playlist {
  padding: 40px;
  width: 982px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #d3d3d3;
  border-bottom: 0;
  border-top: 0;
  position: relative;
  min-height: 700px;
  .header {
    width: 900px;
    height: 42px;
    border-bottom: 2px solid #c20c0c;

    > h3 {
      height: 33px;
      float: left;
      font-size: 24px;
      font-weight: normal;
      span {
        float: left;
        margin-top: -3px;
        font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
        color: #333;
      }
      .menu {
        margin: 2px 0 0 12px;
        padding-left: 5px;
        display: inline-block;
        position: relative;
        width: 96px;
        background: url('@/assets/images/btnBg.png') no-repeat right -100px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &:hover {
          background-position: right -182px;
          cursor: pointer;
        }
        &:active {
          background-position: right -264px;
        }
        i {
          padding: 0 10px 0 10px;
          height: 31px;
          line-height: 31px;
          color: #0c73c2;
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          font-size: 12px;
          text-align: center;
          width: 86px;
          background: url('@/assets/images/btnBg.png') no-repeat 0 -59px;
          &:hover {
            background-position: 0 -141px;
          }
          &:active {
            background-position: 0 -223px;
          }
        }
        .u-icn {
          position: absolute;
          top: 13px;
          right: 10px;
          width: 8px;
          height: 5px;
          background: url('@/assets/images/icon.png') no-repeat;
          background-position: -70px -543px;
        }
      }
    }
    .hot {
      float: right;
      display: block;
      color: #fff;
      width: 46px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      font-size: 12px;
      border-radius: 3px;
      background: url('@/assets/images/button.png') no-repeat 0 0;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .cateListBox {
    width: 720px;
    height: 413px;
    position: absolute;
    top: 75px;
    left: 0;
    z-index: 1;
    width: 720px;

    .hd {
      width: 100%;
      height: 32px;
      background: url('@/assets/images/sltlyr.png') no-repeat;

      .icn {
        position: absolute;
        top: 2px;
        left: 132px;
        display: inline-block;
        width: 24px;
        height: 11px;
        background: url('@/assets/images/iconall.png') no-repeat;
        background-position: -48px 0;
      }
    }
    .bd {
      width: 100%;
      padding: 0 10px;
      background: url('@/assets/images/sltlyr.png') repeat-y -720px 0;
      h3 {
        height: 38px;
        padding-left: 26px;
        border-bottom: 1px solid #e6e6e6;
        font-weight: normal;
        display: block;
        color: #333;
        border-bottom: 1px solid #e6e6e6;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-text-size-adjust: none;

        a {
          width: 75px;
          height: 26px;
          text-align: center;
          display: inline-block;
          line-height: 26px;
          background: url('@/assets/images/button.png') no-repeat 0 -64px;
          font-size: 12px;
          color: #333;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #333;
          }
        }
      }
      dl {
        dt {
          float: left;
          display: inline;
          width: 70px;
          margin: 0 -100px 0 26px;
          padding-top: 15px;
          font-weight: bold;
          i {
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 4px;
            width: 23px;
            height: 23px;
            background: url('@/assets/images/icon.png') no-repeat;
            vertical-align: middle;
          }
        }
        dd {
          margin-left: 96px;
          padding: 16px 15px 0 15px;
          border-left: 1px solid #e6e6e6;
          line-height: 24px;
          .item {
            a {
              white-space: nowrap;
              &.cur {
                background-color: #a7a7a7;
                color: #fff;
                padding: 2px 6px;
              }
            }
            .line {
              margin: 0 8px 0 10px;
              color: #d8d8d8;
            }
          }
        }
      }
      .dl1 {
        dt {
          i {
            background-position: -20px -735px;
          }
        }
      }
      .dl2 {
        dt {
          i {
            background-position: 0 -60px;
          }
        }
      }
      .dl3 {
        dt {
          i {
            background-position: 0 -88px;
          }
        }
      }
      .dl4 {
        dt {
          i {
            background-position: 0 -117px;
          }
        }
      }
      .dl5 {
        dd {
          padding-bottom: 25px;
        }
        dt {
          i {
            background-position: 0 -141px;
          }
        }
      }
    }
    .ft {
      width: 100%;
      height: 20px;
      background: url('@/assets/images/sltlyr.png') repeat-y -1440px -12px;
    }
  }
  .mainer {
    margin: 30px 0 0 -50px;
    li {
      float: left;
      width: 190px;
      height: 218px;
      overflow: hidden;
      padding: 0 0 30px 50px;
      line-height: 1.4;
      .cover {
        position: relative;
        width: 140px;
        height: 140px;
        img {
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('@/assets/images/coverall.png') no-repeat;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 27px;
          background: url('@/assets/images/coverall.png') 0 -537px no-repeat;
          .icn-play {
            display: inline-block;
            position: absolute;
            right: 10px;
            bottom: 5px;
            width: 16px;
            height: 17px;
            background: url('@/assets/images/iconall.png') no-repeat;
            &:hover {
              background-position: 0px -60px;
              cursor: pointer;
            }
          }
          .icn-headset {
            float: left;
            width: 14px;
            height: 11px;
            background: url('@/assets/images/iconall.png') 0 -24px;
            margin: 9px 5px 9px 10px;
          }
          .nb {
            float: left;
            margin-top: 7px;
            color: #ccc;
          }
        }
      }
      .dec {
        width: 100%;
        margin: 8px 0 3px;
        font-size: 14px;
        .title {
          display: inline-block;
          max-width: 100%;
          vertical-align: middle;
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .creator {
        width: 100%;
        .by {
          color: #999;
        }
        .nickname {
          display: inline-block;
          max-width: 67%;
          vertical-align: middle;
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
        .detail {
          height: 13px;
          width: 13px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
