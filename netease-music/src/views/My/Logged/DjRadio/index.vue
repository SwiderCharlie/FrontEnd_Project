<template>
  <div class="dj-radio">
    <div class="title"><h3>我订阅的电台（{{count}}）</h3></div>
    <ul class="dj-list">
      <li v-for="item in radioList" :key="item.id">
        <a href="javascript:;" class="cover">
          <img v-lazy="item.picUrl" alt="">
        </a>
        <div class="cnt">
          <h3><a href="javascipt:;">{{item.name}}</a></h3>
          <p>by&nbsp;{{item.dj.nickname}}</p>
          <div class="btns">
            <span class="share"></span>
            <span class="del"></span>
          </div>
        </div>
        <div class="program-count">{{item.programCount}}期</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DjRadio',
  data() {
    return {
      radioList: [],  // 订阅的电台列表
      count: 0  // 订阅电台数量
    }
  },

  mounted() {
    this.getRadioList()
  },

  methods: {
    // 获取订阅的电台列表
    async getRadioList() {
      let cookie = localStorage.getItem('COOKIE')
      let result = await this.$api.reqDjSublist(cookie)
      this.radioList = result.djRadios
      this.count = result.count
    }
  }
}
</script>

<style lang="less" scoped>
.dj-radio {
  margin-left: 239px;
  min-height: 900px;
  width: 741px;
  border-left: 1px solid #d3d3d3;
  padding: 40px;
  background-color: #fff;
  .title {
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
  }
  .dj-list {
    margin-bottom: 24px;
    li {
      width: 100%;
      height: 71px;
      padding: 10px 0;
      border-bottom: 1px solid #e7e7e7;
      line-height: 50px;
      &:hover {
        .btns {
          display: block!important;
        }
      }
      .cover {
        float: left;
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cnt {
        position: relative;
        float: left;
        margin-left: 10px;
        width: 545px;
        padding-right: 57px;
        line-height: 24px;
        h3 {
          font-weight: normal;
          a:hover {
            text-decoration: underline;
          }
        }
        p {
          float: left;
          color: #999;
        }
        .btns {
          display: none;
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -6px;
          .share, .del {
            float: right;
            width: 16px;
            height: 14px;
            margin-right: 10px;
            cursor: pointer;
            background: url('@/assets/images/icons2.png') no-repeat;
          }
          .share {
            background-position: -90px 0;
            &:hover {
            background-position: -90px -20px;
            }
          }
          .del {
            background-position: -130px 0;
            &:hover {
              background-position: -130px -20px;
            }
          }
        }
      }
      .program-count {
        float: left;
        margin-left: 10px;
        max-width: 40px;
        color: #999;
        overflow: visible;
        white-space: nowrap;
      }
    }
  }
}
</style>