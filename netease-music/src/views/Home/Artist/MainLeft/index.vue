<template>
  <div class="mainleft">
    <h2 class="tit">推荐</h2>
    <ul class="nav">
      <li v-for="(item, index) in recommendList" :key="index">
        <a
          href="javascript:;"
          class="cat"
          :class="[item.type == type && item.area == area ? 'active' : '']"
          @click="changeArtist(item.area, item.type)"
          >{{ item.name }}</a
        >
      </li>
    </ul>
    <div class="blk" v-for="(item1, index) in artistList" :key="index">
      <h2 class="tit">{{ item1.name }}</h2>
      <ul class="nav">
        <li
          v-for="(item2, index) in artistType"
          :key="index"
          @click="changeArtist(item1.area, item2.type)"
        >
          <a
            href="javascript:;"
            class="cat"
            :class="[item1.area == area && item2.type == type ? 'active' : '']"
            >{{ item1.name }}{{ item2.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLeft',

  data() {
    return {
      recommendList: [
        // 推荐歌手分类
        { name: '推荐歌手', area: undefined, type: undefined },
        { name: '入驻歌手', area: -1, type: -1 },
      ],
      artistList: [
        // 歌手分类
        { name: '华语', area: 7 },
        { name: '欧美', area: 96 },
        { name: '日本', area: 8 },
        { name: '韩国', area: 16 },
        { name: '其他', area: 0 },
      ],
      artistType: [
        // 歌手类型
        { name: '男歌手', type: 1 },
        { name: '女歌手', type: 2 },
        { name: '组合/乐队', type: 3 },
      ],
    }
  },

  computed: {
    // 歌手分类
    area() {
      return this.$route.query.area
    },

    // 歌手类型
    type() {
      return this.$route.query.type
    },

    title() {
      if (this.area == undefined && this.type == undefined) return '推荐歌手'
      else if (this.area == -1 && this.type == -1) return '入驻歌手'
      else {
        let tit = ''
        for (let itm1 of this.artistList) {
          if (itm1.area == this.area) tit += itm1.name
        }
        for (let itm2 of this.artistType) {
          if (itm2.type == this.type) tit += itm2.name
        }
      return tit
      }
    }
  }, 

  methods: {
    // 改变歌手分类选项
    changeArtist(area, type) {
      this.$router.push({
        path: '/home/artist',
        query: {
          area,
          type,
        },
      })
      if (area !== undefined) {
        this.$bus.$emit('getTitle', this.title)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.mainleft {
  width: 180px;
  height: 100%;
  float: left;
  margin-top: 51px;
  padding: 0 10px 40px;
  .tit {
    height: 25px;
    padding-left: 14px;
    font-size: 16px;
  }
  .nav {
    li {
      width: 160px;
      height: 29px;
      line-height: 29px;
      margin-bottom: 2px;
      .cat {
        float: left;
        width: 160px;
        height: 29px;
        line-height: 29px;
        padding-left: 27px;
        background: url('@/assets/images/singer.png') 0 -30px no-repeat;
        &.active {
          background-position: 0 0;
          color: #c20c0c;
          &:hover {
            text-decoration: none;
          }
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .blk {
    margin: 5px 0 0;
    padding-top: 16px;
    border-top: 1px solid #d3d3d3;
  }
}
</style>
