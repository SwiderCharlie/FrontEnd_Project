<template>
  <div class="album">
    <!-- 热门新碟 -->
    <div class="header">
      <h3>热门新碟</h3>
    </div>
    <ul class="hot clearfix">
      <li class="al-item" v-for="item in hotAlbums" :key="item.id">
        <div class="cover">
          <img v-lazy="item.picUrl">
          <a href="javascript:;" class="mask" :title="item.name"></a>
          <a href="javascript;;" class="icn-play"></a>
        </div>
        <p class="dec">
          <a href="javascript:;" class="title ellipsis" :title="item.name">{{item.name}}</a>
        </p>
        <p class="artist ellipsis">
          <span class="ar" v-for="(ar, index) in item.artists" :key="ar.id">
            <a href="javascript:;" :title="ar.name">{{ar.name}}</a>
            <span v-if="index < item.artists.length - 1">&nbsp;/&nbsp;</span>
          </span>
        </p>
      </li>
    </ul>
    
    <!-- 全部新碟 -->
    <div class="header">
      <h3>全部新碟</h3>
      <div class="tab">
        <div class="tab-item" v-for="(item, index) in categories" :key="item.area">
          <a href="javascript:;" @click="changeArea(item.area)">{{item.name}}</a>
          <span class="line" v-if="index < 4">|</span>
        </div>
      </div>
    </div>
    <ul class="all clearfix">
      <li class="al-item" v-for="item in allAlbums" :key="item.id">
        <div class="cover">
          <img v-lazy="item.picUrl">
          <a href="javascript:;" class="mask" :title="item.name"></a>
          <a href="javascript:;" class="icn-play"></a>
        </div>
        <p class="dec">
          <a href="javascript:;" class="title ellipsis" :title="item.name">{{item.name}}</a>
        </p>
        <p class="artist ellipsis">
          <span class="ar" v-for="(ar, index) in item.artists" :key="ar.id">
            <a href="javascript:;" :title="ar.name">{{ar.name}}</a>
            <span v-if="index < item.artists.length - 1">&nbsp;/&nbsp;</span>
          </span>
        </p>
      </li>
    </ul>

    <!-- 分页器 -->
    <Pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="5" @getPageNo="getPageNo" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Album',
  components: { Pagination },
  data() {
    return {
      categories: [  // 全部新碟分类
        { name: '全部', area: 'ALL' },
        { name: '华语', area: 'ZH' },
        { name: '欧美', area: 'EA' },
        { name: '韩国', area: 'KR' },
        { name: '日本', area: 'JP' },
      ],
      hotAlbums: [],  // 热门新碟列表
      allAlbums: [],  // 全部新碟列表
      pageSize: 35,
      pageNo: 1,
      area: 'ALL',
      total: 0
    }
  },

  mounted() {
    this.getNewAlbums()  // 获取热门新碟
    this.getAllAlbums()  // 获取全部新碟
  },

  methods: {
    // 获取热门新碟
    async getNewAlbums() {
      let result = await this.$api.reqNewAlbums()
      this.hotAlbums = result.albums.slice(0, 10)
    },

    // 获取全部新碟
    async getAllAlbums() {
      let result = await this.$api.reqAlbums(this.pageSize, (this.pageNo - 1) * this.pageSize, this.area)
      this.allAlbums = result.albums
      this.total = result.total
    },

    // 切换全部新碟分类
    changeArea(area) {
      this.area = area
      this.pageNo = 1
      this.getAllAlbums()
    },

    getPageNo(pageNo) {
      this.pageNo = pageNo
      this.getAllAlbums()
    }
  }
}
</script>

<style lang="less" scoped>
.album {
  width: 982px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .header {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .tab {
      float: left;
      margin: 12px 0 0 20px;
      .tab-item {
        float: left;
        a {
          color: #666;
        }
        .line {
          margin: 0 10px;
          color: #c7c7c7;
        }
      }
    }
  }
  .hot, .all {
    margin: 20px 0 0 -33px;
    .al-item {
      float: left;
      width: 186px;
      height: 208px;
      padding: 0 0 30px 33px;
      .cover {
        position: relative;
        width: 130px;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 153px;
          height: 130px;
          background: url('@/assets/images/coverall.png') 0 -845px;
        }
        .icn-play {
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
          .icn-play {
            display: block;
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
          color: #000;
          vertical-align: middle;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .artist {
        width: 100%;
        .ar {
          display: inline-block;
          max-width: 85%;
          vertical-align: middle;
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
}

</style>