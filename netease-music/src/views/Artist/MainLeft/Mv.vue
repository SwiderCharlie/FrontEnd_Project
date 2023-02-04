<template>
  <div class="mv">
    <!-- MV列表 -->
    <ul class="list clearfix">
      <li v-for="item in mvList" :key="item.id">
        <div class="cover">
          <img v-lazy="item.imgurl" alt="">
          <a href="javascript:;" class="mask"></a>
          <a href="javascript:;" class="ply-icn"></a>
        </div>
        <p class="dec">
          <a href="javascript:;" class="tit ellipsis">{{item.name}}</a>
        </p>
      </li>
    </ul>

    <!-- 分页器 -->
    <Pagination :pageNo="pageNo" :pageSize="pageSize" :continues="7" :total="total" @getPageNo="getPageNo" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: "Mv",
  components: { Pagination },
  data() {
    return {
      mvList: [],  // 歌手MV列表
      pageSize: 12,
      pageNo: 1,
      total: 0
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  mounted() {
    this.getMvCount()
    this.getArtistMvs()
  },

  methods: {
    // 获取歌手MV列表
    async getArtistMvs() {
      let result = await this.$api.reqArtistMv(this.id, this.pageSize, (this.pageNo - 1) * this.pageSize)
      this.mvList = result.mvs
    },

    // 获取MV总数
    async getMvCount() {
      let result = await this.$api.reqArtistDetail(this.id)
      this.total = result.data.artist.mvSize
    },

    getPageNo(pageNo) {
      this.pageNo = pageNo
      this.getArtistMvs()
    }
  }
}
</script>

<style lang="less" scoped>
.mv {
  .list {
    margin: 20px 0 0 -29px;
    li {
      float: left;
      width: 166px;
      height: 170px;
      padding: 0 0 30px 29px;
      line-height: 1.4;
      .cover {
        position: relative;
        width: 137px;
        height: 103px;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('@/assets/images/coverall.png') 0 -1170px no-repeat;
        }
        .ply-icn {
          position: absolute;
          width: 44px;
          height: 44px;
          top: 50%;
          left: 50%;
          margin: -22px 0 0 -22px;
          background: url('@/assets/images/iconall.png') -30px -135px no-repeat;
          &:hover {
            background-position: -30px -85px;
          }
        } 
      }
      .dec {
        width: 100%;
        margin: 8px 0 3px;
        font-size: 14px;
        .tit {
          display: inline-block;
          max-width: 100%;
          color: #000;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>