<template>
  <div class="recommend">
    <!-- 电台排行榜 -->
    <div class="radio-top clearfix">
      <!-- 推荐节目 -->
      <div class="blk fl">
        <!-- 标题 -->
        <div class="tit">
          <h3>推荐节目</h3>
          <a href="javascript:;" class="more">更多 ></a>
        </div>

        <!-- 内容 -->
        <ul class="dj-list">
          <li class="itm" v-for="item in recommendPrograms" :key="item.id">
            <a href="javascript:;" class="cover" title="播放">
              <img v-lazy="item.coverUrl" />
              <i class="ply"></i>
            </a>
            <div class="cnt">
              <h3 class="ellipsis">{{ item.name }}</h3>
              <p class="ellipsis">{{ item.dj.brand }}</p>
            </div>
            <a href="javascript:;" class="tag">{{ item.radio.category }}</a>
          </li>
        </ul>
      </div>

      <!-- 节目排行榜 -->
      <div class="blk fr">
        <!-- 标题 -->
        <div class="tit">
          <h3>节目排行榜</h3>
          <a href="javascript:;" class="more">更多 ></a>
        </div>

        <!-- 内容 -->
        <ul class="top-list">
          <li
            class="itm"
            v-for="item in programsToplist"
            :key="item.program.id"
          >
            <div class="rank">
              <em :class="[item.rank < 4 ? 'red' : '']">{{
                item.rank < 10 ? '0' + item.rank : item.rank
              }}</em>
              <span class="new" v-if="item.lastRank == -1">
                <i class="icn"></i>
              </span>
              <span
                :class="{
                  up: item.lastRank - item.rank > 0,
                  down: item.lastRank - item.rank < 0,
                  'no-change': item.lastRank - item.rank === 0,
                }"
                v-else
              >
                <i class="icn"></i>{{ Math.abs(item.lastRank - item.rank) }}
              </span>
            </div>
            <a href="javascript:;" class="cover" title="播放">
              <img v-lazy="item.program.coverUrl" />
              <i class="ply"></i>
            </a>
            <div class="cnt">
              <h3 class="ellipsis">{{ item.program.name }}</h3>
              <p class="ellipsis">{{ item.program.dj.brand }}</p>
            </div>
            <div class="hot">
              <i
                :style="
                  'width: ' +
                  `${(item.score / programsToplist[0].score) * 100}` +
                  '%'
                "
              >
                <i></i>
              </i>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 类别热门电台 -->
    <div class="radio-more clearfix" v-for="item in hotRadios" :key="item.id">
      <div class="tit">
        <h3>{{ item.name }} · 电台</h3>
        <a href="javascript:;" class="more">更多 ></a>
      </div>
      <ul class="rd-list">
        <li
          class="rd-item"
          v-for="(rdItem, index) in item.list"
          :key="rdItem.id"
          :class="[index > 1 ? 'no-border' : '']"
        >
          <a href="javascript:;" class="cover">
            <img v-lazy="rdItem.picUrl" />
          </a>
          <div class="cnt">
            <h3 :title="rdItem.name">{{ rdItem.name }}</h3>
            <div class="note">{{ rdItem.rcmdtext }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data() {
    return {
      recommendPrograms: [], // 电台推荐节目
      programsToplist: [], // 电台节目榜
      hotRadios: [
        // 类别热门电台
        { name: '音乐推荐', id: '2', list: [] },
        { name: '生活', id: '6', list: [] },
        { name: '情感', id: '3', list: [] },
        { name: '创作翻唱', id: '2001', list: [] },
        { name: '知识', id: '11', list: [] },
      ],
    }
  },

  mounted() {
    this.getRecommendPrograms() // 获取电台推荐节目
    this.getProgramsTopList() // 获取电台节目榜
    this.getCategoryRecommend() // 获取分类推荐电台
  },

  methods: {
    // 获取电台推荐节目
    async getRecommendPrograms() {
      let result = await this.$api.reqRecommendPrograms()
      this.recommendPrograms = result.programs
    },

    // 获取电台节目榜
    async getProgramsTopList() {
      let result = await this.$api.reqProgramsTopList(10, 0)
      this.programsToplist = result.toplist
    },

    // 获取分类推荐电台
    async getCategoryRecommend() {
      for (let itm of this.hotRadios) {
        let result = await this.$api.reqCategoryRecommend(itm.id)
        itm.list = result.djRadios.slice(0, 4)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.recommend {
  .radio-top {
    margin-top: 10px;
    .blk {
      width: 426px;
      .tit {
        height: 40px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 24px;
          font-weight: normal;
        }
        .more {
          float: right;
          margin-top: 14px;
          color: #666;
        }
      }
      .dj-list,
      .top-list {
        height: 601px;
        border: 1px solid #e2e2e2;
        border-top: none;
      }
      .itm {
        width: 424px;
        height: 60px;
        line-height: 40px;
        padding: 10px 0;
        background-color: #fff;
        &:nth-child(2n) {
          background-color: #f7f7f7;
        }
        &:hover {
          .ply {
            display: block !important;
          }
        }
        .cover {
          position: relative;
          float: left;
          width: 40px;
          height: 40px;
          margin-left: 20px;
          img {
            width: 100%;
            height: 100%;
          }
          .ply {
            position: absolute;
            display: none;
            width: 22px;
            height: 22px;
            top: 50%;
            left: 50%;
            margin: -11px 0 0 -11px;
            background: url('@/assets/images/iconall.png') 0 -85px no-repeat;
          }
        }
        .cnt {
          float: left;
          width: 254px;
          margin: 1px 0 0 10px;
          line-height: 20px;
          h3 {
            font-size: 12px;
            font-weight: normal;
            color: #333;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
          p {
            color: #999;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .tag {
          margin: 1px 0 0 10px;
          display: inline-block;
          position: relative;
          top: -1px;
          height: 18px;
          padding: 0 6px;
          border: 1px solid #999;
          line-height: 16px;
          color: #999;
          font-size: 12px;
          vertical-align: middle;
        }
      }
      .top-list {
        .itm {
          .rank {
            float: left;
            width: 47px;
            margin-top: 6px;
            text-align: center;
            line-height: normal;
            color: #999;
            em {
              display: block;
              font-size: 14px;
              &.red {
                color: #da4545;
              }
            }
            span {
              font-size: 10px;
              line-height: normal;
              .icn {
                display: inline-block;
              }
            }
            .new {
              .icn {
                width: 16px;
                height: 17px;
                background: url('@/assets/images/icon.png') -67px -283px
                  no-repeat;
              }
            }
            .up {
              color: #ba2226;
              .icn {
                margin: -1px 2px 0 0;
                width: 6px;
                height: 6px;
                vertical-align: middle;
                background: url('@/assets/images/icon.png') -74px -304px
                  no-repeat;
              }
            }
            .down {
              color: #4abbeb;
              .icn {
                margin: -1px 2px 0 0;
                width: 6px;
                height: 6px;
                vertical-align: middle;
                background: url('@/assets/images/icon.png') -74px -324px
                  no-repeat;
              }
            }
            .no-change {
              .icn {
                margin: -1px 2px 0 0;
                width: 6px;
                height: 6px;
                vertical-align: middle;
                background: url('@/assets/images/icon.png') -74px -274px
                  no-repeat;
              }
            }
          }
          .cover {
            margin-left: 0;
          }
          .cnt {
            width: 208px;
          }
          .hot {
            float: left;
            position: relative;
            margin-top: 16px;
            height: 8px;
            width: 100px;
            background: url('@/assets/images/table.png') 0 -240px no-repeat;
            i {
              display: block;
              height: 8px;
              overflow: hidden;
              padding: 0 4px;
              background: url('@/assets/images/table.png') right -318px;
              i {
                margin-left: -4px;
                padding: 0 0 0 4px;
                background-position: 0 -304px;
              }
            }
          }
        }
      }
    }
  }
  .radio-more {
    margin-top: 35px;
    .tit {
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: normal;
      }
      .more {
        float: right;
        margin-top: 14px;
        color: #666;
        cursor: pointer;
      }
    }
    .rd-list {
      margin-left: -30px;
      .rd-item {
        float: left;
        width: 435px;
        height: 161px;
        margin-left: 30px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;
        &.no-border {
          border-color: #fff;
        }
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
            margin: 16px 0 20px;
            font-size: 18px;
            color: #333;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .note {
            margin-bottom: 6px;
            line-height: 20px;
            color: #999;
          }
        }
      }
    }
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
