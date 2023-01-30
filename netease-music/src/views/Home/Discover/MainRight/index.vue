<template>
  <div class="right-content">
          <!-- 入驻歌手 -->
          <div class="singer">
            <h3 class="singer-title">
              <span>入驻歌手</span>
              <a href="javascript:;" class="more">查看全部 ></a>
            </h3>
            <ul class="singer-list">
              <li v-for="item in artists" :key="item.id">
                <a href="javascript:;">
                  <div class="head">
                    <img v-lazy="item.picUrl" alt="">
                  </div>
                  <div class="info">
                    <h4>{{item.name}}</h4>
                    <p class="ellipsis">{{item.briefDesc}}</p>
                  </div>
                </a>
              </li>
            </ul>
            <a href="javascript:;" class="btn">申请成为网易音乐人</a>
          </div>

          <!-- 热门主播 -->
          <div class="dj">
            <h3>热门主播</h3>
            <ul class="dj-list">
              <li v-for="item in popularDJ" :key="item.id">
                <a href="javascript:;" class="cver">
                  <img v-lazy="item.imgUrl" alt="">
                </a>
                <div class="info">
                  <p>{{item.name}}</p>
                  <p>{{item.score}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
</template>

<script>
export default {
  name: 'MainRight',
  data() {
    return {
      artists: [],  // 入驻歌手列表
      popularDJ: [],  // 热门主播列表
    }
  },
  mounted() {
    // 获取入驻歌手列表
    this.getSingers()
    // 获取热门主播列表
    this.getPopularDJ()
  },
  methods: {
    // 获取入驻歌手列表
    async getSingers() {
      let result = await this.$api.reqTopArtists(5, 0);
      result.artists.forEach(async (item) => {
        let result2 = await this.$api.reqArtistDetail(item.id);
        this.artists.push({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          briefDesc: result2.data.artist.briefDesc
        })
      })
    },

    // 获取热门主播列表
    async getPopularDJ() {
      let result = await this.$api.reqTopDJ(5);
      result.data.list.forEach((item) => {
        this.popularDJ.push({
          id: item.id,
          name: item.nickName,
          imgUrl: item.avatarUrl,
          score: parseInt(item.score/10000)+'万'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.right-content {
      float: left;
      width: 247px;
      .singer {
        margin-top: 15px;
        .singer-title {
          position: relative;
          height: 23px;
          margin: 0 20px;
          border-bottom: 1px solid rgb(204, 204, 204);
          color: rgb(51, 51, 51);
          font-size: 12px;
          span {
            float: left;
          }
          .more {
            float: right;
            font-weight: normal;
            color: #666;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .singer-list {
          margin: 6px 0 14px 20px;
          li {
            margin-top: 14px;
            width: 210px;
            height: 62px;
            background-color: rgb(250, 250, 250);
            .head {
              float: left;
              width: 62px;
              height: 62px;
              img {
                float: left;
                width: 100%;
                height: 100%;
              }
            }
            .info {
              float: left;
              width: 148px;
              height: 62px;
              padding-left: 14px;
              border: 1px solid rgb(233, 233, 233);
              border-left: none;
              h4 {
                margin-top: 8px;
                color: #000;
              }
              p {
                margin-top: 8px;
                color: rgb(102, 102, 102);
              }
            }
          }
        }
        .btn{
          margin: 0 20px;
          border-radius: 4px;
          color: rgb(51, 51, 51);
          padding-right: 5px;
          display: block;
          height: 31px;
          line-height: 31px;
          text-align: center;
          font-weight: bold;
          border: 1px solid rgb(154, 154, 154);
        }
      }
      .dj {
        margin-top: 30px;
        h3 {
          position: relative;
          height: 23px;
          margin: 0 20px;
          border-bottom: 1px solid rgb(204, 204, 204);
          color: rgb(51, 51, 51);
          font-size: 12px;
        }
        .dj-list {
          margin: 20px 0 0 20px;
          li {
            float: left;
            width: 210px;
            height: 50px;
            .cver {
              float: left;
              width: 40px;
              margin-right: 10px;
              img {
                width: 40px;
                height: 40px;
                box-shadow: rgb(51, 51, 51) 0px 0px 1px inherit;
              }
            }
            .info {
              float: left;
              width: 160px;
              line-height: 21px;
            }
          }
        }
      }
    }
</style>