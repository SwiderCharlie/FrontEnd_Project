<template>
  <div class="left-content">
    <!-- 热门推荐 -->
    <Title :title="'热门推荐'" :showNav="true" :type="'playlist'" />
    <ul class="recommend clearfix">
      <li v-for="item in recommendList" :key="item.id">
        <div class="cover">
          <img v-lazy="item.coverUrl" />
          <router-link :to="{path:'/playlist',query:{id:`${item.id}`}}" class="msk ellipsis-2" :title="item.name"></router-link>
          <div class="bottom">
            <a href="javascript:;" class="icn-play" @click="setPlaylist(item.id)"></a>
            <span class="icn-headset"></span>
            <span class="count">{{ Math.floor(item.count / 10000) }}万</span>
          </div>
        </div>
        <p class="dec">
          <router-link :to="{path:'/playlist',query:{id:`${item.id}`}}">{{ item.name }}</router-link>
        </p>
      </li>
    </ul>

    <!-- 新碟上架 -->
    <Title :title="'新碟上架'" :showNav="false" :type="'album'" />
    <div class="albums">
      <div class="inner">
        <!-- 向左翻页 -->
        <a href="javascript:;" class="prev-page" @click="prevPage"></a>
        <div class="album-content">
          <ul ref="albumsList">
            <li v-for="(item, index) in newAlbumsList" :key="index">
              <div class="album-cover">
                <img :src="item.picUrl" alt="" />
                <router-link :to="{path: '/album', query:{id: `${item.id}`}}" :title="item.name" class="cover"></router-link>
              </div>
              <p>
                <router-link :to="{path: '/album', query: {id: `${item.id}`}}" class="name ellipsis">{{ item.name }}</router-link>
              </p>
              <p>
                <router-link :to="{path: '/artist', query: {id: `${item.artist.id}`}}" class="name ellipsis">{{ item.artist.name }}</router-link>
              </p>
            </li>
          </ul>
        </div>
        <!-- 向右翻页 -->
        <a href="javascript:;" class="next-page" @click="nextPage"></a>
      </div>
    </div>

    <!-- 榜单 -->
    <Title :title="'榜单'" :showNav="false" :type="'toplist'" />
    <div class="top-list">
      <dl class="blk" v-for="list in billList" :key="list.id">
        <dt class="top">
          <div class="top-cover">
            <router-link :to="{path: '/home/toplist', query: {id: `${list.id}`}}">
            <img v-lazy="list.coverUrl" alt="" />
            </router-link>
          </div>
          <div class="tit">
            <router-link :to="{path: '/home/toplist', query: {id: `${list.id}`}}"
              ><h3>{{ list.name }}</h3></router-link
            >
            <div class="btn">
              <a href="javascript:;" title="播放" class="play" @click="setPlaylist(list.id)"></a>
              <a href="javascript:;" title="收藏" class="star"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol class="lists">
            <li v-for="(item, idx) in list.list" :key="item.id">
              <span class="number" :class="[idx < 3 ? 'top' : '']">{{
                idx + 1
              }}</span>
              <router-link :to="{path: '/song', query: {id: `${item.id}`}}" class="song-name ellipsis">{{
                item.name
              }}</router-link>
              <div class="line-btn">
                <a href="javascript:;" class="play" title="播放" @click="playMusic(item.id)"></a>
                <a href="javascript:;" class="add" title="添加到播放列表" @click="$store.dispatch('music/addMusic', item.id)"></a>
                <a href="javascript:;" class="star" title="收藏"></a>
              </div>
            </li>
          </ol>
          <div class="more">
            <a href="javascript:;">查看全部&gt;</a>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Title from './Title.vue'
export default {
  name: 'MainLeft',
  components: { Title },
  data() {
    return {
      recommendList: [], // 热门推荐列表
      newAlbumsList: [], // 新碟上架列表
      page: 0,  // 新碟上架列表当前展示的是第几页
      timer: '',  // 定时器
      billList: [
        // 榜单
        { coverUrl: '', id: '', list: [] }, // 飙升榜列表
        { coverUrl: '', id: '', list: [] }, // 新歌榜列表
        { coverUrl: '', id: '', list: [] }, // 原创榜列表
      ],
    }
  },

  mounted() {
    // 获取热门推荐列表
    this.getRecommendList()
    // 获取新碟上架列表
    this.getNewAblums()
    // 获取所有榜单列表
    this.getTopList()
  },

  methods: {
    // 获取热门推荐列表
    async getRecommendList() {
      let result = await this.$api.reqTopPlaylist()
      result.playlists.forEach((item) => {
        this.recommendList.push({
          name: item.name,
          id: item.id,
          coverUrl: item.coverImgUrl,
          count: item.playCount,
        })
      })
    },

    // 获取新碟上架列表
    async getNewAblums() {
      let result = await this.$api.reqNewAlbums()
      result.albums.forEach((item) => {
        this.newAlbumsList.push({
          name: item.name,
          id: item.id,
          picUrl: item.picUrl,
          artist: { name: item.artist.name, id: item.artist.id },
        })
      })
      this.newAlbumsList = this.newAlbumsList.slice(0, 10)
      this.newAlbumsList = this.newAlbumsList.concat(
        this.newAlbumsList.slice(0, 5)
      )
    },

    // 上一页
    prevPage() {
      let albumlist = this.$refs.albumsList;
      if (this.page === 0) {
        albumlist.style.transition = 'none'
        albumlist.style.left = '-1290px'  // 回到page2
        this.page = 2
      }
      this.timer = setTimeout(() => {
        albumlist.style.transition = 'left 1s'
        this.page -= 1
        albumlist.style.left = -645 * this.page + 'px'
      }, 1100)
      
    },

    // 下一页
    nextPage() {
      let albumlist = this.$refs.albumsList;
      if (this.page === 2) {
        albumlist.style.transition = 'none'
        albumlist.style.left = '0px'
        this.page = 0
      }
      this.timer = setTimeout(() => {
        albumlist.style.transition = 'left 1s'
        this.page += 1
        albumlist.style.left = -645 * this.page + 'px'
      }, 1100)
    },

    // 获取所有榜单信息
    async getTopList() {
      let result = await this.$api.reqTopList()
      result = result.list.slice(0, 3)
      result.forEach(async (item, idx) => {
        this.billList[idx].coverUrl = item.coverImgUrl
        this.billList[idx].id = item.id
        this.billList[idx].name = item.name
        let result2 = await this.$api.reqPlayList(item.id)
        result2 = result2.privileges.slice(0, 10)
        let ids = []
        result2.forEach((song) => {
          ids.push(song.id)
        })
        ids = ids.join(',')
        let result3 = await this.$api.reqSongDetail(ids)
        result3.songs.forEach((song) => {
          this.billList[idx].list.push({
            id: song.id,
            name: song.name,
          })
        })
      })
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
.left-content {
  float: left;
  width: 731px;
  border-right: 1px solid #d3d3d3;
  padding: 20px 20px 40px;
  .recommend {
    margin: 20px 0 0 -42px;
    li {
      float: left;
      padding: 0 0 30px 50px;
      width: 182px;
      height: 234px;
      padding-left: 42px;
      .cover {
        position: relative;
        width: 140px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
        .msk {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('@/assets/images/coverall.png') 0 0;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 27px;
          color: #ccc;
          background: url('@/assets/images/coverall.png') 0 -537px;
          .icn-play {
            position: absolute;
            right: 10px;
            bottom: 5px;
            width: 16px;
            height: 17px;
            background: url('@/assets/images/iconall.png') 0 0;
          }
          .icn-headset {
            float: left;
            width: 14px;
            height: 11px;
            margin: 9px 5px 9px 10px;
            background: url('@/assets/images/iconall.png') 0 -24px;
          }
          .count {
            float: left;
            margin-top: 7px;
          }
        }
      }
      .dec {
        margin: 8px 0 3px;
        font-size: 14px;
        a {
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .albums {
    position: relative;
    height: 186px;
    margin: 20px 0 37px;
    border: 1px solid #d3d3d3;
    .inner {
      height: 184px;
      padding-left: 16px;
      background-color: #f5f5f5;
      border: 1px solid #fff;
      .prev-page,
      .next-page {
        position: absolute;
        top: 71px;
        width: 17px;
        height: 17px;
        background: url('@/assets/images/index.png') no-repeat;
      }
      .prev-page {
        left: 4px;
        background-position: -260px -75px;
      }
      .next-page {
        background-position: -300px -75px;
      }
      .album-content {
        position: relative;
        float: left;
        width: 645px;
        height: 180px;
        overflow: hidden;
        ul {
          position: absolute;
          left: 0;
          top: 0;
          width: 1935px;
          margin-top: 28px;
          transition: left 1s;
          li {
            overflow: hidden;
            float: left;
            width: 118px;
            height: 150px;
            margin-left: 11px;
            background: url('@/assets/images/index.png') no-repeat -260px 100px;
            .album-cover {
              position: relative;
              width: 100px;
              height: 100px;
              margin-bottom: 7px;
              img {
                width: 100%;
                height: 100%;
              }
              .cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 118px;
                height: 100px;
                background: url('@/assets/images/coverall.png') 0 -570px;
              }
            }
            .name {
              display: inline-block;
              width: 100px;
              line-height: 18px;
              color: #666;
            }
          }
        }
      }
    }
  }
  .top-list {
    height: 472px;
    margin-top: 20px;
    background: url('@/assets/images/index_bill.png');
    .blk {
      float: left;
      width: 230px;
      .top {
        height: 120px;
        padding: 20px 0 0 19px;
        .top-cover {
          float: left;
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .tit {
          float: left;
          width: 116px;
          margin: 6px 0 0 10px;
          a {
            color: #666;
          }
          .btn {
            margin-top: 10px;
            .play,
            .star {
              float: left;
              width: 22px;
              height: 22px;
              margin-right: 10px;
              background: url('@/assets/images/index.png') -267px -205px;
            }
            .star {
              background-position: -300px -205px;
            }
          }
        }
      }
      .lists {
        height: 319px;
        margin-left: 50px;
        line-height: 32px;
        li {
          height: 32px;
          &:hover {
            .song-name {
              width: 91px;
              text-decoration: underline;
            }
            .line-btn {
              display: block;
            }
          }
          .number {
            float: left;
            position: relative;
            width: 35px;
            height: 32px;
            margin-left: -35px;
            text-align: center;
            color: #666;
            font-size: 16px;
            padding: 0;
            &.top {
              color: #c10d0c;
            }
          }
          .song-name {
            float: left;
            width: 170px;
            height: 32px;
            vertical-align: middle;
            color: #000;
          }
          .line-btn {
            display: none;
            float: right;
            width: 82px;
            margin-top: 7px;
            .play,
            .add,
            .star {
              float: left;
              height: 17px;
              width: 17px;
              margin-right: 10px;
              vertical-align: middle;
              background: url('@/assets/images/index.png') -267px -268px;
            }
            .add {
              margin: 2px 6px 0 0;
              background: url('@/assets/images/icon.png') 0 -700px;
            }
            .star {
              background-position: -297px -268px;
            }
          }
        }
      }
      .more {
        height: 32px;
        margin-right: 32px;
        text-align: right;
        line-height: 32px;
        a {
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
