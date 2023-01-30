<template>
  <div class="detail">
    <!-- 优秀新电台 -->
    <div class="new">
      <div class="tit">
        <h3>优秀新电台</h3>
      </div>
      <ul class="new-list clearfix">
        <li v-for="item in newList" :key="item.id">
          <a href="javascript:;" class="cover">
            <img v-lazy="item.picUrl" />
          </a>
          <h3>{{ item.name }}</h3>
          <p class="dec">{{ item.rcmdtext }}</p>
        </li>
      </ul>
    </div>

    <!-- 电台排行榜 -->
    <div class="all">
      <div class="tit">
        <h3>电台排行榜</h3>
        <div class="tab">
          <a
            href="javascript:;"
            class="order"
            :class="[type === 'new' ? 'selected' : '']"
            @click="type = 'new'"
            >上升最快</a
          >
          <span class="line">|</span>
          <a
            href="javascript:;"
            class="order"
            :class="[type === 'hot' ? 'selected' : '']"
            @click="type = 'hot'"
            >最热电台</a
          >
        </div>
      </div>
      <ul class="all-list clearfix">
        <li v-for="item in allList" :key="item.id">
          <a href="javascript:;" class="cover">
            <img v-lazy="item.picUrl" alt="" />
          </a>
          <div class="cnt">
            <h3 :title="item.name">{{ item.name }}</h3>
            <p class="note">
              <i class="dj-icn"></i>
              <a href="javascript:;" class="nickname" :title="item.dj.nickname">{{item.dj.nickname}}</a>
              <img :src="item.dj.avatarDetail.identityIconUrl" class="icn" v-if="item.dj.avatarDetail">
            </p>
            <p class="info">共{{item.programCount}}期&nbsp;&nbsp;&nbsp;订阅{{item.subCount}}次</p>
          </div>
        </li>
      </ul>
      <!-- 分页器 -->
      <Pagination :pageNo="pageNo" :pageSize="pageSize" :continues="7" :total="total" @getPageNo="getPageNo" v-if="total > pageSize"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Detail',
  components: {Pagination},
  data() {
    return {
      newList: [], // 优秀电台列表
      type: 'new', // 电台排行榜类型 [ 'new', 'hot' ]
      allList: [], // 电台排行榜列表
      pageNo: 1,
      pageSize: 24,
      total: 0,
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    },
  },

  watch: {
    id() {
      this.total = 0
      this.pageNo = 1
      this.getNewRadios()
      this.getHotRadios()
    }
  },

  mounted() {
    this.getNewRadios() // 获取优秀电台列表
    this.getHotRadios() // 获取电台排行榜
  },

  methods: {
    // 获取优秀电台列表
    async getNewRadios() {
      let result = await this.$api.reqCategoryRecommend(this.id)
      this.newList = result.djRadios.slice(0, 5)
    },

    // 获取电台排行榜
    async getHotRadios() {
      let result = await this.$api.reqRadioHot(
        this.id,
        this.pageSize,
        (this.pageNo - 1) * this.pageSize
      )
      this.total = result.count
      this.allList = result.djRadios
    },

    // 获取当前页数
    getPageNo(pageNo) {
      this.pageNo = pageNo
      this.allList = this.getHotRadios()
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  .tit {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .tab {
      float: right;
      margin: 12px 0 0 20px;
      .order {
        &.selected {
          color: #c20c0c;
        }
      }
      .line {
        margin: 0 10px;
        color: #c7c7c7;
      }
    }
  }
  .new {
    .new-list {
      margin: 16px 0 0 -37px;
      li {
        float: left;
        width: 150px;
        margin-left: 37px;
        .cover {
          width: 150px;
          height: 150px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h3 {
          margin: 13px 0 6px;
          line-height: 16px;
          font-size: 14px;
          font-weight: normal;
        }
        .dec {
          line-height: 18px;
          color: #999;
        }
      }
    }
  }
  .all {
      margin-top: 35px;
    .all-list {
      margin-left: -30px;
      li {
        float: left;
        width: 435px;
        height: 160px;
        margin-left: 30px;
        padding: 20px 0;
        border-bottom: 1px solid rgb(231, 231, 231);
        .cover {
          float: left;
          width: 120px;
          height: 120px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cnt {
          margin-left: 140px;
          h3 {
            height: 64px;
            margin: 0;
            line-height: 64px;
            font-size: 18px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .note {
            margin-bottom: 6px;
            line-height: 20px;
            .dj-icn {
              display: inline-block;
              width: 14px;
              height: 15px;
              vertical-align: middle;
              background: url('@/assets/images/icon.png') -50px -300px;
            }
            .nickname {
              margin-left: 5px;
              vertical-align: middle;
              &:hover {
                text-decoration: underline;
              }
            }
            .icn {
              height: 13px;
              width: 13px;
              margin-left: 3px;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .info {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
