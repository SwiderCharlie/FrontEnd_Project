<template>
  <div class="other">
    <!-- 入驻歌手 -->
    <div class="all" v-if="area == -1 && type == -1">
      <div class="tit"><h3>入驻歌手</h3></div>
      <ul class="singer-list clearfix">
        <li class="singer" v-for="item in artistList" :key="item.id">
          <div class="cover">
            <img v-lazy="item.img1v1Url" />
            <router-link
               :to="{path:'/artist',query:{id:`${item.id}`}}"
              class="mask"
              :title="item.name + '的音乐'"
            ></router-link>
          </div>
          <p class="dec">
            <router-link
               :to="{path:'/artist',query:{id:`${item.id}`}}"
              class="clearfix"
              :title="item.name + '的音乐'"
              >{{ item.name }}</router-link
            >
            <i class="pointer"></i>
          </p>
        </li>
      </ul>
    </div>

    <!-- 分类歌手 -->
    <div class="category" v-else>
      <div class="tit">
        <h3>{{ title }}</h3>
      </div>
      <!-- 字母索引 -->
      <ul class="initial-list clearfix">
        <li
          v-for="(item, index) in initialList"
          :key="index"
          @click="changeInitial(item)"
        >
          <a
            href="javascript:;"
            :class="[initialName == item ? 'active' : '']"
            >{{ item }}</a
          >
        </li>
      </ul>

      <ul class="singer-list clearfix">
        <li
          class="singer"
          v-for="item in artistList.slice(0, 10)"
          :key="item.id"
        >
          <div class="cover">
            <img v-lazy="item.img1v1Url" />
            <router-link
               :to="{path:'/artist',query:{id:`${item.id}`}}"
              class="mask"
              :title="item.name + '的音乐'"
            ></router-link>
          </div>
          <p class="dec">
            <router-link
               :to="{path:'/artist',query:{id:`${item.id}`}}"
              class="clearfix"
              :title="item.name + '的音乐'"
              >{{ item.name }}</router-link
            >
            <i class="pointer"></i>
          </p>
        </li>
      </ul>

      <ul class="oth clearfix">
        <li class="sml" v-for="item in artistList.slice(10)" :key="item.id">
          <router-link
             :to="{path:'/artist',query:{id:`${item.id}`}}"
            :title="item.name + '的音乐'"
            class="ellipsis"
            >{{ item.name }}</router-link
          >
          &nbsp;
          <i class="pointer"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Other',
  props: ['title'],

  data() {
    return {
      artistList: [], // 歌手列表
      initialList: [], // 字母索引列表
      initialName: '热门',
    }
  },

  computed: {
    area() {
      return this.$route.query.area
    },

    type() {
      return this.$route.query.type
    },

    initial() {
      if (!this.$route.query.initial) return '-1'
      else return this.$route.query.initial
    },
  },

  watch: {
    area() {
      this.getArtistList()
    },
    type() {
      this.getArtistList()
    },
    initial() {
      if (this.initial == -1) this.initialName = '热门'
      else if (this.initial == 0) this.initialName = '其他'
      else this.initialName = this.initial
      this.getArtistList()
    },
  },

  mounted() {
    // 生成字母索引列表
    this.initialList.push('热门')
    for (let i = 0; i < 26; i++) {
      this.initialList.push(String.fromCharCode(65 + i))
    }
    this.initialList.push('其他')

    this.getArtistList() // 获取歌手列表
  },

  methods: {
    // 获取歌手列表
    async getArtistList() {
      let result = await this.$api.reqArtistList(
        100,
        0,
        this.initial,
        this.type,
        this.area
      )
      this.artistList = result.artists
    },

    //  改变initial值
    changeInitial(init) {
      if (init === '热门') init = '-1'
      else if (init === '其他') init = '0'
      this.$router.push({
        path: '/home/artist',
        query: {
          type: this.type,
          area: this.area,
          initial: init,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.other {
  width: 800px;
  border-left: 1px solid #d3d3d3;
  float: left;
  background-color: #fff;
  padding: 40px;
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
  .initial-list {
    margin-top: 20px;
    margin-left: -3px;
    li {
      float: left;
      margin-left: 3px;
      font-size: 14px;
      a {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 0 6px;
        &:hover {
          text-decoration: underline;
        }
        &.active {
          background-color: #c20c0c;
          border-radius: 2px;
          color: #fff;
        }
      }
    }
  }
  .oth {
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
