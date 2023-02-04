<template>
  <div class="album">
    <!-- 专辑列表 -->
    <ul class="list clearfix">
      <li v-for="item in albumList" :key="item.id">
        <div class="cover" :title="item.name">
          <img v-lazy="item.picUrl" alt="" />
          <router-link :to="{path: '/album', query:{id: `${item.id}`}}" class="mask"></router-link>
          <a href="javascript:;" class="ply-icn" title="播放" @click="setAlbum(item.id)"></a>
        </div>
        <p class="dec ellipsis-2" :title="item.name">
          <router-link :to="{path: '/album', query:{id: `${item.id}`}}" class="tit">{{item.name}}</router-link>
        </p>
        <p>
          <span class="date">{{toDate(item.publishTime)}}</span>
        </p>
      </li>
    </ul>
    <!-- 分页器 -->
    <Pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="7" @getPageNo="getPageNo" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Album',
  components: { Pagination },
  data() {
    return {
      albumList: [], // 歌手专辑列表
      pageSize: 12,
      pageNo: 1,
      total: 0,
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  mounted() {
    this.getArtistAlbums()
  },

  methods: {
    // 获取歌手专辑列表
    async getArtistAlbums() {
      let result = await this.$api.reqArtistAlbums(
        this.id,
        this.pageSize,
        (this.pageNo - 1) * this.pageSize
      )
      this.total = result.artist.albumSize
      this.albumList = result.hotAlbums
    },

    // 发布日期
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

    getPageNo(pageNo) {
      this.pageNo = pageNo
      this.getArtistAlbums()
    },

    // 播放专辑
    async setAlbum(id) {
      let result = await this.$api.reqAlbum(id)
      let ids = [];
      result.songs.forEach(item => {
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
.album {
  .list {
    margin: 20px 0 0 -18px;
    li {
      float: left;
      padding: 0 0 30px 18px;
      width: 163px;
      height: 205px;
      line-height: 1.4;
      .cover {
        position: relative;
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 145px;
          height: 120px;
          background: url('@/assets/images/coverall.png') -170px -850px
            no-repeat;
        }
        .ply-icn {
          display: none;
          position: absolute;
          right: 10px;
          bottom: 5px;
          width: 28px;
          height: 28px;
          background: url('@/assets/images/iconall.png') 0 -140px;
          &:hover{
            background-position: 0 -170px;
          }
        }
        &:hover {
          .ply-icn {
            display: block;
          }
        }
      }
      .dec {
        width: 100%;
        line-height: 19px;
        max-height: 39px;
        margin: 8px 0 3px;
        font-size: 14px;
        .tit {
          max-width: 100%;
          vertical-align: middle;
          color: #000;
        }
      }
      .date {
        color: #666;
      }
    }
  }
}
</style>
