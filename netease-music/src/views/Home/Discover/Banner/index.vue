<template>
  <div class="banner">
    <div class="wrap-content">
      <div class="banner-box">
        <!-- 轮播图图片框 -->
        <div
          class="banner-frame"
          @mouseenter="stopPlay"
          @mouseleave="startPlay"
        >
          <!-- 图片 -->
          <div class="images">
            <transition name="show">
              <img v-lazy="imgUrl" v-show="isShow" />
            </transition>
          </div>
          <!-- 底部小圆点 -->
          <ul class="points">
            <li
              v-for="(point, index) in imgList"
              :key="index"
              :class="[imgIndex === index ? 'active' : '']"
              @click="changeImg(index)"
            ></li>
          </ul>
          <!-- 两侧箭头 -->
          <div class="prev-arrow" @click="prev"></div>
          <div class="next-arrow" @click="next"></div>
        </div>
        <!-- 下载 -->
        <div class="download">
          <a href="javascript:;" class="download-btn"></a>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
    </div>
    <div class="img-blur">
      <img v-lazy="imgUrl" class="blur" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      imgList: [], // 所有轮播图图片
      imgUrl: '', // 轮播图当前展示的图片
      imgIndex: 0, // 当前展示的图片在图片列表中的序号
      autoPlay: true, // 是否自动播放轮播图
      timer: null, // 定时器
      isShow: true,
    }
  },
  mounted() {
    // 获取轮播图图片
    this.getBanner()

    // 启动轮播图自动播放定时器
    this.startPlay()
  },
  methods: {
    // 获取轮播图资源
    async getBanner() {
      let result = await this.$api.reqBanner()
      result.banners.forEach((item) => {
        this.imgList.push({ id: item.targetId, url: item.imageUrl })
      })
      this.imgUrl = this.imgList[0].url
    },

    // 切换图片
    changeImg(index) {
      this.imgIndex = index
      this.imgUrl = this.imgList[index].url
    },

    // 自动播放轮播图
    startPlay() {
      this.timer = setInterval(() => {
        this.next()
      }, 4000)
    },

    // 停止自动播放轮播图
    stopPlay() {
      clearInterval(this.timer)
    },

    // 切换上一张图片
    prev() {
      this.imgIndex =
        (this.imgIndex > 0 ? this.imgIndex : this.imgList.length) - 1
      this.imgUrl = this.imgList[this.imgIndex].url
    },

    // 切换下一张图片
    next() {
      this.imgIndex = (this.imgIndex + 1) % this.imgList.length
      this.imgUrl = this.imgList[this.imgIndex].url
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  .banner-box {
    position: relative;
    height: 285px;
    width: 100%;
    .banner-frame {
      position: relative;
      height: 100%;
      width: 100%;
      .images {
        width: 730px;
        height: 100%;
        img {
          width: 730px;
          height: 285px;
        }
      }
      .points {
        position: absolute;
        top: 259px;
        left: 0;
        width: 730px;
        height: 20px;
        text-align: center;
        li {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('@/assets/images/banner.png') 3px -343px;
          &.active {
            background-position: -16px -343px;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
      .prev-arrow,
      .next-arrow {
        position: absolute;
        top: 50%;
        margin-top: -31px;
        width: 37px;
        height: 63px;
        background: url('@/assets/images/banner.png') 0 -360px;
      }
      .prev-arrow {
        left: -68px;
        &:hover {
          background-position: 0 -430px;
        }
      }
      .next-arrow {
        right: -68px;
        background-position: 0 -508px;
        &:hover {
          background-position: 0 -578px;
        }
      }
    }
    .download {
      position: absolute;
      top: 0;
      right: 0;
      width: 254px;
      height: 100%;
      background: url('@/assets/images/download.png') 0 0;
      .download-btn {
        display: block;
        width: 215px;
        height: 56px;
        margin: 185px 0 0 19px;
        background: url('@/assets/images/download.png') -19px -185px;
        &:hover {
          background-position: 0 -289px;
        }
      }
      p {
        margin: 10px auto;
        text-align: center;
        color: #8d8d8d;
      }
    }
  }
  .img-blur {
    width: 100%;
    height: 285px;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: -1;
    .blur {
      width: 100%;
      height: 100%;
      filter: blur(100px);
    }
  }
  // 图片切换进入动画
  .show-enter-active {
    animation: showImg 1.5s;
  }
  // 图片切换离开动画
  .show-leave-active {
    animation: showImg 1.5s reverse;
  }
  @keyframes showImg {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
