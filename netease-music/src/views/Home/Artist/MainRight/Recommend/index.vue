<template>
  <div class="recommend">
    <!-- 入驻歌手 -->
    <div class="rec">
      <div class="tit">
        <h3>入驻歌手</h3>
        <a href="javascript:;" class="more" @click="more">更多 ></a>
      </div>
      <ul class="singer-list clearfix">
        <li class="singer" v-for="item in artist1" :key="item.id">
          <div class="cover">
            <img v-lazy="item.img1v1Url" />
            <a
              href="javascript:;"
              class="mask"
              :title="item.name + '的音乐'"
            ></a>
          </div>
          <p class="dec">
            <a
              href="javascript:;"
              class="clearfix"
              :title="item.name + '的音乐'"
              >{{ item.name }}</a
            >
            <i class="pointer"></i>
          </p>
        </li>
      </ul>
    </div>

    <!-- 热门歌手 -->
    <div class="rec">
      <div class="tit">
        <h3>热门歌手</h3>
      </div>
      <ul class="singer-list clearfix">
        <li class="singer" v-for="item in artist2" :key="item.id">
          <div class="cover">
            <img v-lazy="item.img1v1Url" />
            <a
              href="javascript:;"
              class="mask"
              :title="item.name + '的音乐'"
            ></a>
          </div>
          <p class="dec">
            <a
              href="javascript:;"
              class="clearfix"
              :title="item.name + '的音乐'"
              >{{ item.name }}</a
            >
            <i class="pointer"></i>
          </p>
        </li>
      </ul>
    </div>

    <!-- 其他热门歌手 -->
    <ul class="other clearfix">
      <li class="sml" v-for="item in artist3" :key="item.id">
        <a href="javascript:;" :title="item.name + '的音乐'" class="ellipsis">{{ item.name }}</a>
        &nbsp;
        <i class="pointer"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data() {
    return {
      artist1: [], // 入驻歌手
      artist2: [], // 热门歌手
      artist3: [], // 其他热门歌手
    }
  },

  mounted() {
    this.getTopArtists() // 获取歌手列表
  },

  methods: {
    // 获取歌手列表
    async getTopArtists() {
      let result = await this.$api.reqTopArtists(110, 0)
      this.artist1 = result.artists.slice(0, 10)
      this.artist2 = result.artists.slice(10, 20)
      this.artist3 = result.artists.slice(20)
    },

    // 前往入驻歌手模块
    more() {
      this.$router.push({
        path: '/home/artist',
        query: {
          area: -1,
          type: -1
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.recommend {
  width: 800px;
  border-left: 1px solid #d3d3d3;
  float: left;
  background-color: #fff;
  padding: 40px;
  .rec {
    width: 100%;
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
    .singer-list {
      margin: 20px 0 0 -17px;
      .singer {
        float: left;
        width: 147px;
        height: 184px;
        padding: 0 0 30px 17px;
        line-height: 1.4;
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
            width: 100%;
            height: 100%;
            background: url('@/assets/images/coverall.png') 0 -680px;
          }
        }
        .dec {
          margin-top: 8px;
          width: 100%;
          a {
            float: left;
            max-width: 80%;
            &:hover {
              text-decoration: underline;
            }
          }
          .pointer {
            float: right;
            margin-top: -1px;
            width: 17px;
            height: 18px;
            background: url('@/assets/images/icon.png') 0 -740px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .other {
    margin-left: -17px;
    padding-top: 10px;
    border-top: 1px dotted #999;
    .sml {
      float: left;
      padding-left: 17px;
      height: 30px;
      width: 147px;
      line-height: 23px;
      a {
        float: left;
        max-width: 105px;
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
      .pointer {
        float: left;
        margin: 4px 0 0 2px;
        width: 17px;
        height: 18px;
        background: url('@/assets/images/icon.png') 0 -740px;
        cursor: pointer;
      }
    }
  }
}
</style>
