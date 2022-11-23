<template>
  <div class="header">
    <div class="top">
      <div class="wrap-header">
        <!-- Logo -->
        <h1 class="logo">
          <router-link to="/home">网易云音乐</router-link>
        </h1>

        <!-- 导航栏 -->
        <ul class="nav">
          <li
            class="nav-item"
            :class="[curIndex === 0 ? 'is-active' : '']"
            @click="curIndex = 0"
          >
            <router-link to="/">发现音乐</router-link>
            <sub :class="[curIndex === 0 ? 'cur' : '']"></sub>
          </li>
          <li
            class="nav-item"
            :class="[curIndex === 1 ? 'is-active' : '']"
            @click="curIndex = 1"
          >
            <router-link to="/my">我的音乐</router-link>
            <sub :class="[curIndex === 1 ? 'cur' : '']"></sub>
          </li>
          <li
            class="nav-item"
            :class="[curIndex === 2 ? 'is-active' : '']"
            @click="curIndex = 2"
          >
            <router-link to="/friend">关注</router-link>
            <sub :class="[curIndex === 2 ? 'cur' : '']"></sub>
          </li>
          <li
            class="nav-item"
            :class="[curIndex === 3 ? 'is-active' : '']"
            @click="curIndex = 3"
          >
            <a href="javascript:;">商城</a>
            <sub :class="[curIndex === 3 ? 'cur' : '']"></sub>
          </li>
          <li
            class="nav-item"
            :class="[curIndex === 4 ? 'is-active' : '']"
            @click="curIndex = 4"
          >
            <a href="javascript:;">音乐人</a>
            <sub :class="[curIndex === 4 ? 'cur' : '']"></sub>
          </li>
          <li
            class="nav-item"
            :class="[curIndex === 5 ? 'is-active' : '']"
            @click="curIndex = 5"
          >
            <a href="javascript:;">下载客户端</a>
            <sub :class="[curIndex === 5 ? 'cur' : '']"></sub>
            <sup class="hot"></sup>
          </li>
        </ul>
        <!-- 登录 -->
        <div class="login" v-if="!isLogin" @click="login">
          <router-link to="/login">登录</router-link>
        </div>
        <div class="user" v-else></div>
        <!-- 创作者中心 -->
        <a href="javascript:;" class="creator">创作者中心</a>
        <!-- 搜索栏 -->
        <div class="search">
          <i class="el-icon-search"></i>
          <input
            type="text"
            placeholder="音乐/视频/电台/用户"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='音乐/视频/电台/用户'"
          />
        </div>
      </div>
    </div>

    <div class="bottom1" v-if="curIndex === 0">
      <div class="wrap-header">
        <ul class="nav2">
          <li :class="[listIndex === 1? 'active': '']" @click="listIndex = 1">
            <router-link to="/discovery"><em>推荐</em></router-link>
          </li>
          <li :class="[listIndex === 2? 'active': '']" @click="listIndex = 2">
            <router-link to="/toplist"><em>排行榜</em></router-link>
          </li>
          <li :class="[listIndex === 3? 'active': '']" @click="listIndex = 3">
            <router-link to="/playlist"><em>歌单</em></router-link>
          </li>
          <li :class="[listIndex === 4? 'active': '']" @click="listIndex = 4">
            <router-link to="/djradio"><em>主播电台</em></router-link>
          </li>
          <li :class="[listIndex === 5? 'active': '']" @click="listIndex = 5">
            <router-link to="/artist"><em>歌手</em></router-link>
          </li>
          <li :class="[listIndex === 6? 'active': '']" @click="listIndex = 6">
            <router-link to="/album"><em>新碟上架</em></router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom2" v-else></div>
    <!-- 登录弹窗 -->
    <div class="login-container" v-if="isShowLogin">
    <div class="login-box">
      <div class="topbar">
        <span v-if="phoneLoginOrRegister === 'login'">手机号登录</span>
        <span v-else-if="phoneLoginOrRegister === 'register'">手机号注册</span>
        <span v-else>登录</span>
        <i class="close" @click="close">x</i>
      </div>
      <div class="login-body">
        <!-- 二维码登录 -->
        <div class="login-with-qr" v-if="this.loginMethod === 'QR' && this.phoneLoginOrRegister === ''">
          <div class="qr-login">
            <img src="../assets/images/loginWithQR.png" alt="" />
            <div class="qr">
              <h3>扫码登录</h3>
              <div class="code">
                <!-- <img :src="this.qrUrl" alt=""> -->
                <img src="../assets/images/qrcode.png" alt="" />
                <div class="update" v-show="isUpdate">
                  <p>二维码已失效</p>
                  <button>点击刷新</button>
                </div>
              </div>
              <p>使用 <a href="javascript:;">网易云音乐APP</a> 扫码登录</p>
            </div>
          </div>
          <a class="button" href="javascript:;" @click="changeLoginMethod"
            >选择其他方式登录</a
          >
        </div>
        <!-- 手机号登录或注册 -->
        <div class="logreg-with-phone" v-else-if="this.loginMethod === 'phone' && this.phoneLoginOrRegister === ''">
          <div class="phone-container">
            <div class="phone-left">
              <img src="../assets/images/loginWithPhone.png" alt="" />
              <a href="javascript:;" class="btn1" @click="phoneLoginOrRegister = 'login'">手机号登录</a>
              <a href="javascript:;" class="btn2" @click="phoneLoginOrRegister = 'register'">手机号注册</a>
            </div>
            <div class="phone-right">
              <ul>
                <li>
                  <a href="javascript:;">
                    <i></i>
                    <p>微信登录</p>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <i></i>
                    <p>QQ登录</p>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <i></i>
                    <p>微博登录</p>
                  </a>
                </li>
                <li>
                  <a href="javascript:;">
                    <i></i>
                    <p>网易邮箱账号登录</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="phone-bottom">
            <input type="checkbox" id="agree" v-model="agree" />
            <label for="agree"
              >同意
              <a href="javascript:;">《服务条款》</a>
              <a href="javascript:;">《隐私政策》</a>
              <a href="javascript:;">《儿童隐私政策》</a>
            </label>
          </div>
          <img src="../assets/images/qrRightDown.png" class="rightdown" @click="changeLoginMethod" />
        </div>
        <!-- 手机号注册 -->
        <div class="register-with-phone" v-else-if="this.loginMethod === 'phone' && this.phoneLoginOrRegister === 'register'">
          
        </div>
        <!-- 手机号登录 -->
        <div class="login-with-phone" v-else>手机号登录</div>
      </div>
    </div>
  </div>
    <!-- 遮罩 -->
    <div class="mask" v-show="isShowLogin"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      curIndex: 0, // top nav 当前展示的item序号
      listIndex: 1, // bottom nav当前展示item的序号
      isLogin: false, // 是否登录
      isShowLogin: false, // 是否展示登录框
      isUpdate: false, // 是否需要更新二维码
      qrUrl: '', // 二维码
      loginMethod: 'QR', // 登录方法
      phoneLoginOrRegister: '', // 手机号注登录或注册
      agree: false, // 是否勾选协议
    }
  },
  methods: {
    login() {
      this.isShowLogin = true;
      this.loginMethod = 'QR';
    },
    close() {
      this.isShowLogin = false;
      this.loginMethod = 'QR';
      this.phoneLoginOrRegister = '';
    },
    changeLoginMethod() {
      this.loginMethod = this.loginMethod === 'QR'? 'phone': 'QR';
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  .top {
    height: 70px;
    background-color: #242424;
    .logo {
      width: 176px;
      height: 69px;
      float: left;
      background: url('@/assets/images/topbar.png') 0 0 no-repeat;
      a {
        width: 176px;
        height: 69px;
        float: left;
        text-indent: -9999px;
        color: #fff;
      }
    }
    .nav {
      float: left;
      display: flex;
      align-items: center;
      .nav-item {
        position: relative;
        a {
          display: block;
          height: 70px;
          line-height: 70px;
          padding: 0 19px;
          color: #fff;
          font-size: 14px;
          &:hover {
            background: #000;
          }
        }
        .cur {
          display: block;
          width: 12px;
          height: 7px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: url('@/assets/images/topbar.png') -226px 1px no-repeat;
        }
        .hot {
          position: absolute;
          display: block;
          width: 28px;
          height: 19px;
          left: 100px;
          top: 21px;
          background: url('@/assets/images/topbar.png') -190px 0 no-repeat;
        }
        &.is-active {
          a {
            background: #000;
          }
        }
      }
    }
    .login {
      float: right;
      width: 50px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      a {
        color: #787878;
        &:hover {
          color: #999;
          text-decoration: underline;
        }
      }
    }
    .creator {
      display: block;
      float: right;
      width: 90px;
      height: 32px;
      line-height: 32px;
      margin: 19px 0 0 12px;
      padding-left: 16px;
      border: 1px solid #4f4f4f;
      border-radius: 20px;
      color: #ccc;
      &:hover {
        border-color: #fff;
        color: #fff;
      }
    }
    .search {
      float: right;
      position: relative;
      width: 158px;
      height: 32px;
      line-height: 32px;
      margin-top: 19px;
      border-radius: 32px;
      background-color: #fff;
      i {
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: 700;
      }
      input {
        width: 80%;
        border: 0;
        background-color: transparent;
        margin-left: 30px;
      }
    }
  }
  .bottom1 {
    height: 34px;
    background-color: @main;
    .nav2 {
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
  .bottom2 {
    height: 5px;
    background-color: @main;
  }
  .login-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .login-box {
      width: 530px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
      .topbar {
        position: relative;
        height: 38px;
        line-height: 38px;
        padding: 0 45px 0 18px;
        background-color: #2d2d2d;
        border-bottom: 1px solid #191919;
        border-radius: 4px 4px 0 0;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        .close {
          position: absolute;
          height: 10px;
          line-height: 10px;
          width: 10px;
          top: 16px;
          right: 20px;
          cursor: pointer;
        }
      }
      .login-body {
        padding: 28px 0;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        .login-with-qr {
          .qr-login {
            display: flex;
            justify-content: center;
            img {
              width: 125px;
              height: 220px;
            }
            .qr {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-left: 25px;
              h3 {
                font-size: 18px;
                font-weight: 500;
              }
              .code {
                position: relative;
                width: 138px;
                height: 138px;
                margin: 13px auto;
                img {
                  width: 100%;
                  height: 100%;
                }
                .update {
                  position: absolute;
                  top: 0;
                  width: 138px;
                  height: 138px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  background-color: rgba(255, 255, 255, 0.9);
                  p {
                    margin: 45px 0 6px;
                  }
                  button {
                    width: 64px;
                    height: 24px;
                    line-height: 24px;
                    border: 1px solid #5baf5b;
                    border-radius: 4px;
                    color: #fff;
                    background: linear-gradient(
                      180deg,
                      #81dd81 0%,
                      #55a055 100%
                    );
                  }
                }
              }
              p {
                width: 200px;
                text-align: center;
                a {
                  color: #0c73c2;
                }
              }
            }
          }
          .button {
            display: block;
            width: 118px;
            height: 28px;
            line-height: 28px;
            margin: 20px auto 0;
            border: 1px solid #979797;
            border-radius: 15px;
            text-align: center;
            color: rgba(0, 0, 0, 0.8);
          }
        }
        .logreg-with-phone {
          position: relative;
          .phone-container {
            display: flex;
            .phone-left {
              width: 300px;
              padding: 0 35px 3px 40px;
              border-right: 1px dotted #ccc;
              img {
                width: 100%;
              }
              .btn1,
              .btn2 {
                display: block;
                width: 100%;
                height: 31px;
                line-height: 31px;
                margin-top: 10px;
                border-radius: 4px;
                text-align: center;
                background-color: transparent;
                background: url('../assets/images/btnBg.png') right -387px no-repeat;
              }
              .btn1 {
                color: #fff;
              }
              .btn2 {
                background-position: 0 -59px;
                border-radius: 4px;
                border-right: 1px solid #ccc;
              }
            }
            .phone-right {
              padding: 3px 0 3px 39px;
              ul {
                li {
                  a {
                    display: flex;
                    margin-top: 15px;
                    align-items: center;
                    i {
                      display: block;
                      width: 38px;
                      height: 38px;
                      margin-right: 14px;
                      background: url('../assets/images/icons.png') -150px -670px no-repeat;
                    }
                  }
                  &:first-child {
                    a {
                      margin: 0;
                    }
                  }
                  &:nth-child(2) {
                    a {
                      i {
                        background-position: -190px -670px;
                      }
                    }
                  }
                  &:nth-child(3) {
                    a {
                      i {
                        background-position: -231px -670px;
                      }
                    }
                  } 
                  &:nth-child(4) {
                    a {
                      i {
                        background-position: -271px -670px;
                      }
                    }
                  }
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
          .phone-bottom {
            margin: 30px 0 0 40px;
            label {
              margin-left: 2px;
              color: rgba(0, 0, 0, 0.4);
              a {
                color: #507daf;
              }
            }
          }
          .rightdown {
            position: absolute;
            width: 52px;
            height: 52px;
            right: 0;
            bottom: -28px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }
}
</style>
