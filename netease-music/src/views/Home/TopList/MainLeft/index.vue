<template>
  <div class="mainleft">
    <!-- 云音乐特色榜 -->
    <h2 class="list-title">云音乐特色榜</h2>
    <ul class="list-content">
      <li
        class="list-item"
        :class="[item.id == id ? 'selected' : '']"
        v-for="item in featureList"
        :key="item.id"
        @click="goto(item)"
      >
        <img v-lazy="item.coverImgUrl" class="cover" />
        <div class="right-info">
          <p class="name">{{ item.name }}</p>
          <p class="updatefreq">{{ item.updateFrequency }}</p>
        </div>
      </li>
    </ul>

    <!-- 全球媒体榜 -->
    <h2 class="list-title title2">全球媒体榜</h2>
    <ul class="list-content">
      <li
        class="list-item"
        :class="[item.id == id ? 'selected' : '']"
        v-for="item in globalList"
        :key="item.id"
        @click="goto(item)"
      >
        <img v-lazy="item.coverImgUrl" class="cover" />
        <div class="right-info">
          <p class="name ellipsis">{{ item.name }}</p>
          <p class="updatefreq">{{ item.updateFrequency }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainLeft',
  data() {
    return {
      featureList: [], // 云音乐特色榜单
      globalList: [], // 全球媒体榜单
    }
  },

  computed: {
    id() {  // 当前展示的榜单id
      if (!this.$route.query.id) return '19723756'
      return this.$route.query.id
    },
  },

  mounted() {
    this.getTopList() // 获取榜单信息
  },

  methods: {
    // 获取所有榜单信息
    async getTopList() {
      let result = await this.$api.reqTopList()
      if (result.code === 200) {
        this.featureList = result.list.slice(0, 4)
        this.globalList = result.list.slice(4)
      }
    },

    // 榜单跳转
    goto(item) {
      this.$router.push({
        path: '/home/toplist',
        query: {
          id: item.id,
        },
      })
      console.log(item.updateFrequency)
      this.$bus.$emit('getFreq',item.updateFrequency)  // 传递当前展示榜单的更新频率
    },
  },
}
</script>

<style lang="less" scoped>
.mainleft {
  float: left;
  width: 240px;
  padding-top: 40px;
  background-color: rgb(249, 249, 249);
  .list-title {
    padding: 0 10px 12px 15px;
    font-size: 14px;
    color: #000;
    &.title2 {
      margin-top: 20px;
    }
  }
  .list-content {
    .list-item {
      width: 240px;
      height: 62px;
      padding: 10px 0 10px 20px;
      &:hover {
        background-color: rgb(242, 242, 242);
        cursor: pointer;
      }
      &.selected {
        background-color: #e6e6e6;
      }
      .cover {
        float: left;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .right-info {
        .name {
          margin: 1px 0 4px;
          color: #000;
        }
        .updatefreq {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
