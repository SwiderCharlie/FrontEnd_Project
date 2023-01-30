<template>
  <div class="category">
    <!-- 上一页 -->
    <span
      class="turn-left"
      :class="[page === 1 ? 'disabled' : '']"
      @click="prevPage"
    ></span>
    <!-- 下一页 -->
    <span
      class="turn-right"
      :class="[page === 2 ? 'disabled' : '']"
      @click="nextPage"
    ></span>

    <!-- 电台分类列表 -->
    <ul class="box">
      <li
        class="box-item"
        v-for="item in categoryList.slice(0, 18)"
        :key="item.id"
        v-show="page === 1"
      >
        <a
          class="bg"
          @click="changeCategory(item.id)"
          :class="{ active: id == item.id }"
        >
          <div class="icon" :style="`background:url(${item.picWebUrl})`"></div>
          <em>{{ item.name }}</em>
        </a>
      </li>
      <li
        class="box-item"
        v-for="item in categoryList.slice(18)"
        :key="item.id"
        v-show="page === 2"
      >
        <a
          class="bg"
          @click="changeCategory(item.id)"
          :class="{ active: id == item.id }"
        >
          <div class="icon" :style="`background:url(${item.picWebUrl})`"></div>
          <em>{{ item.name }}</em>
        </a>
      </li>
    </ul>

    <!-- 下方小圆点 -->
    <div class="dotpage">
      <span
        class="dot"
        :class="[page === 1 ? 'a' : '']"
        @click="page = 1"
      ></span>
      <span
        class="dot"
        :class="[page === 2 ? 'a' : '']"
        @click="page = 2"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      categoryList: [], // 电台分类
      page: 1, // 当前展示页数
    }
  },

  computed: {
    id() {
      if (!this.$route.query.id) return -1
      else return this.$route.query.id
    },
  },

  mounted() {
    this.getDjCategoryList()
  },

  methods: {
    // 获取电台分类信息
    async getDjCategoryList() {
      let result = await this.$api.reqDjCategoryList()
      this.categoryList = result.categories
    },

    // 切换上一页
    prevPage() {
      if (this.page === 1) return
      this.page = 1
    },

    // 切换下一页
    nextPage() {
      if (this.page === 2) return
      this.page = 2
    },

    // 选择电台分类
    changeCategory(cate) {
      this.$router.push({
        path: '/home/djradio',
        query: {
          id: cate
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.category {
  position: relative;
  height: 194px;
  margin-bottom: 20px;
  .turn-left,
  .turn-right {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 30px;
    margin-top: -15px;
    cursor: pointer;
    background: url('@/assets/images/radio_slide.png') no-repeat;
    opacity: 0.25;
    &.disabled {
      opacity: 0.08;
    }
    &:hover {
      opacity: 0.5;
    }
  }
  .turn-left {
    left: -26px;
    background-position: 0 -30px;
  }
  .turn-right {
    right: -26px;
    background-position: -30px -30px;
  }
  .box {
    margin-left: -33px;
    .box-item {
      float: left;
      margin: 0 0 25px 33px;
      .bg {
        display: block;
        width: 70px;
        height: 70px;
        color: #888;
        text-align: center;
        &.active {
          color: #d35757;
          background: url('@/assets/images/radio_bg.png') -70px 0 no-repeat;
          .icon {
            background-position: -48px 0!important;
          }
          &:hover {
            background-position: -70px 0;
          }
        }
        &:hover {
          background: url('@/assets/images/radio_bg.png') 0 0 no-repeat;
        }
        .icon {
          width: 48px;
          height: 48px;
          margin: 2px auto 0;
          cursor: pointer;
          background-position: 0 0;
        }
        em {
          margin-top: -3px;
          font-style: normal;
        }
      }
    }
  }
  .dotpage {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    .dot {
      display: inline-block;
      width: 20px;
      height: 20px;
      cursor: pointer;
      background: url('@/assets/images/radio_slide.png') no-repeat;
      &.a {
        background-position: -30px 0;
      }
    }
  }
}
</style>
