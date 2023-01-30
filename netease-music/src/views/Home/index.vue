<template>
  <div class="home">
    <div class="nav-container">
    <div class="wrap-header">
      <ul class="nav">
        <li :class="[listIndex === 1 ? 'active' : '']">
          <router-link to="/home/discover">
            <em>推荐</em>
          </router-link>
        </li>
        <li :class="[listIndex === 2 ? 'active' : '']">
          <router-link to="/home/toplist">
            <em>排行榜</em>
          </router-link>
        </li>
        <li :class="[listIndex === 3 ? 'active' : '']">
          <router-link to="/home/playlist">
            <em>歌单</em>
          </router-link>
        </li>
        <li :class="[listIndex === 4 ? 'active' : '']">
          <router-link to="/home/djradio">
            <em>主播电台</em>
          </router-link>
        </li>
        <li :class="[listIndex === 5 ? 'active' : '']">
          <router-link to="/home/artist">
            <em>歌手</em>
          </router-link>
        </li>
        <li :class="[listIndex === 6 ? 'active' : '']">
          <router-link to="/home/album">
            <em>新碟上架</em>
          </router-link>
        </li>
      </ul>
    </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      listIndex: -1, // nav当前展示item的序号
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
  },
  watch: {
    path() {
      if (this.path.indexOf('home/discover') != -1) this.listIndex = 1
      else if (this.path.indexOf('home/toplist') != -1) this.listIndex = 2
      else if (this.path.indexOf('home/playlist') != -1) this.listIndex = 3
      else if (this.path.indexOf('home/djradio') != -1) this.listIndex = 4
      else if (this.path.indexOf('home/artist') != -1) this.listIndex = 5
      else if (this.path.indexOf('home/album') != -1) this.listIndex = 6
    },
  },
  mounted() {
    let path = this.$route.path
    if (path.indexOf('home/discover') != -1) this.listIndex = 1
    else if (path.indexOf('home/toplist') != -1) this.listIndex = 2
    else if (path.indexOf('home/playlist') != -1) this.listIndex = 3
    else if (path.indexOf('home/djradio') != -1) this.listIndex = 4
    else if (path.indexOf('home/artist') != -1) this.listIndex = 5
    else if (path.indexOf('home/album') != -1) this.listIndex = 6
  },
}
</script>

<style lang="less" scoped>
.home {
  .nav-container {
  height: 34px;
  background-color: #c20c0c;
  .wrap-header {
    height: 34px;
    .nav {
      float: left;
      padding-left: 180px;
      li {
        float: left;
        &.active {
          a {
            em {
              background-color: #9b0909;
            }
          }
        }
        a {
          color: #fff;

          em {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            padding: 0 13px;
            margin: 7px 17px 0;
            border-radius: 20px;
          }
        }
      }
    }
  }
  }
}
</style>
