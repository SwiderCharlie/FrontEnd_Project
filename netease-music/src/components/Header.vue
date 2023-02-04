<template>
  <div class="header" :class="[isFixed? 'fixed': '']">
    <div class="wrap-header">
      <!-- Logo -->
      <h1 class="logo">
        <router-link to="/">网易云音乐</router-link>
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
        <li class="nav-item">
          <a href="https://music.163.com/store/product" target="_blank">商城</a>
        </li>
        <li class="nav-item">
          <a href="https://music.163.com/st/musician" target="_blank">音乐人</a>
        </li>
        <li class="nav-item">
          <a href="https://music.163.com/#/download">下载客户端</a>
          <sup class="hot"></sup>
        </li>
      </ul>

      <!-- 登录按钮 -->
      <div class="login" v-if="!isLogin" @click="openLoginBox">
        <a href="javascript:;">登录</a>
      </div>
      <!-- 用户头像 -->
      <div class="user" v-if="isLogin">
        <img :src="userImg" @mouseenter="isShowUserBox = true" />
      </div>

      <!-- 用户属性框 -->
      <div class="user-box" v-show="isShowUserBox" @mouseleave="isShowUserBox = false">
        <i class="arrow"></i>
        <ul>
          <li>
            <a href="javascript:;"><i class="icon-user"></i>我的主页</a>
          </li>
          <li>
            <a href="javascript:;"><i class="icon-message"></i>我的消息</a>
          </li>
          <li>
            <a href="javascript:;"><i class="icon-level"></i>我的等级</a>
          </li>
          <li>
            <a href="javascript:;"><i class="icon-vip"></i>VIP会员</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="javascript:;"><i class="icon-settings"></i>个人设置</a>
          </li>
          <li>
            <a href="javascript:;"><i class="icon-validation"></i>实名认证</a>
          </li>
        </ul>
        <ul>
          <li @click="logout">
            <a href="javascript:;"><i class="icon-logout"></i>退出登录</a>
          </li>
        </ul>
      </div>

      <!-- 创作者中心 -->
      <a href="javascript:;" class="creator">创作者中心</a>

      <!-- 搜索栏 -->
      <div class="search">
        <i class="el-icon-search"></i>
        <input
          v-model="searchText"
          type="text"
          placeholder="音乐/视频/电台/用户"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='音乐/视频/电台/用户'"
          @focus="isOpenSearch = true"
          @blur="searchBlur"
        />
      </div>

      <!-- 搜索建议列表 -->
      <div class="searchList" v-show="isOpenSearch && searchText">
        <p class="note">
          <a href="javascript:;">搜"{{ searchText }}" 相关用户</a>&gt;
        </p>
        <div class="rap">
          <div class="songs" v-if="suggestList.songs">
            <h3 class="hd">
              <i class="icn"></i>
              单曲
            </h3>
            <ul class="bd">
              <li v-for="item in suggestList.songs" :key="item.id">
                <router-link :to="{path: '/song', query: {id: `${item.id}`}}" class="ellipsis">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="artists" v-if="suggestList.artists">
            <h3 class="hd">
              <i class="icn"></i>
              歌手
            </h3>
            <ul class="bd odd">
              <li v-for="item in suggestList.artists" :key="item.id">
                <router-link :to="{path: '/artist', query: {id: `${item.id}`}}" class="ellipsis">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="albums" v-if="suggestList.albums">
            <h3 class="hd">
              <i class="icn"></i>
              专辑
            </h3>
            <ul class="bd">
              <li v-for="item in suggestList.albums" :key="item.id">
                <router-link :to="{path: '/album', query: {id: `${item.id}`}}" class="ellipsis">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="playlists" v-if="suggestList.playlists">
            <h3 class="hd">
              <i class="icn"></i>
              歌单
            </h3>
            <ul class="bd odd">
              <li v-for="item in suggestList.playlists" :key="item.id">
                <router-link :to="{path: '/playlist', query: {id: `${item.id}`}}" class="ellipsis">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" v-show="isShowLogin"></div>

    <!-- 登录窗口 -->
    <div class="login-container" v-if="isShowLogin">
      <div class="login-box">
        <div class="topbar">
          <span v-if="phoneLoginOrRegister === 'login'">手机号登录</span>
          <span v-else-if="phoneLoginOrRegister === 'register'">手机号注册</span>
          <span v-else>登录</span>
          <i class="close" @click="closeLoginBox">x</i>
        </div>

        <div class="login-body">
          <!-- 二维码登录 -->
          <div class="login-with-qr" v-if="loginMethod === 'QR' && phoneLoginOrRegister === ''">
            <div class="qr-login">
              <img src="@/assets/images/loginWithQR.png" alt="" />
              <div class="qr">
                <h3>扫码登录</h3>
                <div class="code">
                  <img :src="qrUrl" alt="" />
                  <div class="update" v-show="isUpdate">
                    <p>二维码已失效</p>
                    <button @click="getQRCode">点击刷新</button>
                  </div>
                </div>
                <p>使用 <a href="javascript:;">网易云音乐APP</a> 扫码登录</p>
              </div>
            </div>
            <a class="button" href="javascript:;" @click="changeLoginMethod">选择其他方式登录</a>
          </div>

          <!-- 手机号登录或注册 -->
          <div
            class="logreg-with-phone"
            v-else-if="loginMethod === 'phone' && phoneLoginOrRegister === ''"
          >
            <div class="phone-container">
              <div class="phone-left">
                <img src="../assets/images/loginWithPhone.png" alt="" />
                <a href="javascript:;" class="btn1" @click="loginWithPhone"
                  >手机号登录</a
                >
                <a href="javascript:;" class="btn2" @click="registerWithPhone"
                  >手机号注册</a
                >
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
            <img
              src="../assets/images/qrRightDown.png"
              class="rightdown"
              @click="changeLoginMethod"
            />
          </div>

          <!-- 手机号注册 -->
          <div
            class="register-with-phone"
            v-else-if="
              loginMethod === 'phone' && phoneLoginOrRegister === 'register'
            "
          >
            <section>
              <div class="phone-number">
                <div class="content">
                  <a
                    href="javascript:;"
                    @click="isShowCountriesCodeList = !isShowCountriesCodeList"
                    >+{{ countryCode }}</a
                  >
                  <input type="text" placeholder="请输入手机号" />
                </div>

                <ul v-show="isShowCountriesCodeList">
                  <li
                    v-for="(item, index) in countriesCodeList"
                    :key="index"
                    @click="chooseCountryCode(index)"
                  >
                    <span>{{ item.zh }}</span>
                    <span>+{{ item.code }}</span>
                  </li>
                </ul>
              </div>
              <div class="password">
                <input type="text" placeholder="设置登录密码，不少于8位" />
              </div>
              <a href="javascript:;" class="next-step"> 下一步 </a>
            </section>
            <div class="btm">
              <a
                class="left"
                href="javascript:;"
                @click="phoneLoginOrRegister = ''"
                >&lt;&nbsp;&nbsp;返回登录</a
              >
            </div>
          </div>

          <!-- 手机号登录 -->
          <div class="login-with-phone" v-else>
            <!-- 使用密码登录 -->
            <section class="pwd" v-if="loginwithPassword">
              <div class="phone-number">
                <div class="content">
                  <a
                    href="javascript:;"
                    @click="isShowCountriesCodeList = !isShowCountriesCodeList"
                    >+{{ countryCode }}</a
                  >
                  <input
                    v-model="phone"
                    type="text"
                    placeholder="请输入手机号"
                  />
                </div>

                <ul v-show="isShowCountriesCodeList">
                  <li
                    v-for="(item, index) in countriesCodeList"
                    :key="index"
                    @click="chooseCountryCode(index)"
                  >
                    <span>{{ item.zh }}</span>
                    <span>+{{ item.code }}</span>
                  </li>
                </ul>
              </div>
              <div class="password">
                <input
                  v-model="password"
                  type="password"
                  placeholder="请输入密码"
                />
                <a href="javascript:;">忘记密码？</a>
              </div>
              <div class="warn" v-if="message !== ''">
                <i></i>
                <span>{{message}}</span>
              </div>
              <div class="btns">
                <a href="javascript:;" @click="loginwithPassword = false">
                  短信登录</a
                >
                <label>
                  <input type="checkbox" checked />
                  自动登录
                </label>
              </div>
              <a
                href="javascript:;"
                class="next-step"
                @click="loginCellphoneByPassword"
              >
                登录
              </a>
            </section>

            <!-- 使用验证码登录 -->
            <section class="phone-code" v-else>
              <form id="login-form">
                <div class="phone-number">
                  <a
                    href="javascript:;"
                    @click="isShowCountriesCodeList = !isShowCountriesCodeList"
                    >+{{ countryCode }}</a
                  >
                  <input
                    v-model="phone"
                    type="text"
                    placeholder="请输入手机号"
                  />
                  <ul v-show="isShowCountriesCodeList">
                    <li
                      v-for="(item, index) in countriesCodeList"
                      :key="index"
                      @click="chooseCountryCode(index)"
                    >
                      <span>{{ item.zh }}</span>
                      <span>+{{ item.code }}</span>
                    </li>
                  </ul>
                </div>
                <div class="code">
                  <input
                    v-model="captcha"
                    type="text"
                    placeholder="请输入短信验证码"
                  />
                  <button
                    :class="[countDown < 60 ? 'count-down' : '']"
                    @click="sendCode"
                    ref="captchaButton"
                  >
                    获取验证码
                  </button>
                </div>
                <div class="err-msg" v-if="message !== ''">
                  <i class="err-icon"></i>
                  <div class="msg">{{message}}</div>
                </div>
                <button @click="loginCellphoneByCaptcha">登录</button>
              </form>
              <div class="change">
                <a href="javascript:;" @click="changePasswordOrCaptcha"
                  >密码登录</a
                >
              </div>
            </section>

            <div class="btm">
              <a
                class="left"
                href="javascript:;"
                @click="phoneLoginOrRegister = ''"
                >&lt;&nbsp;&nbsp;其他登录方式</a
              >
              <a
                class="right"
                href="javascript:;"
                @click="phoneLoginOrRegister = 'register'"
                >&lt;&nbsp;&nbsp;没有账号？免费注册</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      curIndex: 0, // 导航栏当前展示的item序号
      isLogin: false, // 是否登录
      userImg: '', // 用户头像
      searchText: '', // 搜索内容
      isOpenSearch: true, // 是否展示搜索建议列表
      suggestList: {}, // 搜索建议

      isShowLogin: false, // 是否展示登录框
      loginMethod: 'QR', // 登录方法 ['QR', 'phone']
      phoneLoginOrRegister: '', // 手机号登录或注册 ['', 'login', 'register']
      loginwithPassword: false, // 使用密码还是验证码登录

      qrUrl: '', // 二维码
      isUpdate: false, // 是否需要更新二维码
      timer: null, // 定时器用来检查二维码状态

      agree: false, // 是否勾选协议
      countryCode: '86', // 手机号国家编码
      countriesCodeList: [], // 国家编码列表
      isShowCountriesCodeList: false, // 是否展示国家编码列表

      phone: '', // 手机号
      password: '', // 密码
      captcha: '', // 验证码
      message: '', // 提示信息（手机号、验证码、密码校验错误信息）
      countDown: 60, // 获取验证码的倒计时
      countdownTimer: null,  // 倒计时计时器
      checkPassword: true, // 验证手机号和密码是否正确

      isShowUserBox: false, // 是否展示用户属性框
      isFixed: false
    }
  },

  computed: {
    path() {
      return this.$route.path // 获取当前路径
    },
  },

  watch: {
    path() {
      // 当前url
      this.getCurIndex() // path改变时，更新导航栏item序号
      // Header在'我的音乐'页面固定
      if (this.$route.path.indexOf('/my') !== -1) this.isFixed = true
      else this.isFixed = false
    },
    searchText() {
      // 搜索栏搜索内容
      if (this.searchText !== '') {
        this.getSearchSuggest()
      }
    },
  },

  mounted() {
    this.getCurIndex()  // 获取导航栏当前展示的item序号
    // Header在'我的音乐'页面固定
      if (this.$route.path.indexOf('/my') !== -1) this.isFixed = true
      else this.isFixed = false
    // 获取用户信息
    try {
      if(this.$store.state.user.cookie) {
        this.$store.dispatch('user/getUserInfo', this.$store.state.user.cookie).then(() => {
          this.userImg = this.$store.state.user.userInfo.avatarUrl
          this.isLogin = true
        })
      }
    } catch(err) {
      console.log(err)
      this.isLogin = false
    }
    this.$bus.$on('appear', () => {this.openLoginBox()})
  },

  methods: {
    // 获取导航栏当前展示的item序号
    getCurIndex() {
      let path = this.$route.path
      if (path.indexOf('/home') != -1) this.curIndex = 0
      else if (path.indexOf('/my') != -1) this.curIndex = 1
      else if (path.indexOf('/friend') != -1) this.curIndex = 2
      else this.curIndex = 0
    },

    // 获取搜索建议
    async getSearchSuggest() {
      let result = await this.$api.reqSearchSuggest(this.searchText)
      this.suggestList = result.result
    },
    
    searchBlur() {
      setTimeout(() => {
        this.isOpenSearch = false
      }, 100)
    },

    // 打开登录窗口
    openLoginBox() {
      this.isShowLogin = true
      this.loginMethod = 'QR'  // 默认打开是二维码登录方式
      this.getQRCode()  // 获取二维码
    },

    // 关闭登录窗口
    closeLoginBox() {
      this.isShowLogin = false
      this.loginMethod = 'QR'
      this.phoneLoginOrRegister = ''
      this.agree = false
      this.countryCode = '86'
      this.phone = ''
      this.password = ''
      this.captcha = ''
      this.message = ''
      this.countDown = 60
      clearInterval(this.timer)
      clearInterval(this.countdownTimer)

    },

    // 生成二维码
    async getQRCode() {
      let result1 = await this.$api.reqLoginQRKey()
      let key = result1.data.unikey
      let result2 = await this.$api.reqLoginQRCreate(key)
      this.qrUrl = result2.data.qrimg
      this.isUpdate = false
      this.checkQRState(key)  // 检查二维码状态
    },

    // 检查二维码状态
    checkQRState(key) {
      this.timer = setInterval(async () => {
        try {
          let result = await this.$api.reqLoginQRCheck(key)
          if (result.code === 800) {
            // 二维码过期
            this.isUpdate = true
            clearInterval(this.timer)
          } else if (result.code === 803) {
            // 授权登录成功
            this.$store.dispatch('user/setCookie', result.cookie)
            // 根据cookie获取账号信息
            let result2 = await this.$api.reqUserAccount(result.cookie)
            if (result2.code === 200) {
              this.userImg = result2.profile.avatarUrl
              this.$store.dispatch('user/setUserId', result2.account.id)
              this.$store.dispatch('user/setUserInfo', result2.profile)
            }
            this.isLogin = true
            this.closeLoginBox()  // 关闭登录窗口
            location.reload()
          }
        } catch (err) {
          this.$message.error(err.message)
        }
      }, 5000)
    },

    // 切换登录方式
    changeLoginMethod() {
      this.loginMethod = this.loginMethod === 'QR' ? 'phone' : 'QR'
      if (this.loginMethod === 'QR') {  // 二维码登录
        this.getQRCode()
      } else {  // 其他方式登录
        clearInterval(this.timer)
        if (this.countriesCodeList.length === 0) {  // 获取国家编码列表
          this.getCountriesCodeList()
        }
      }
    },

    // 获取国家编码列表
    async getCountriesCodeList() {
      let result = await this.$api.reqCountriesCodeList()
      for (let item of result.data) {
        this.countriesCodeList = [
          ...this.countriesCodeList,
          ...item.countryList,
        ]
      }
    },

    // 修改手机号国家编码
    chooseCountryCode(index) {
      this.countryCode = this.countriesCodeList[index].code
      this.isShowCountriesCodeList = false
    },

    // 点击手机号登录按钮
    loginWithPhone() {
      if (this.agree) {
        this.phoneLoginOrRegister = 'login'  // 切换到手机号登录页面
        this.countryCode = '86'
      } else {  // 没有勾选协议
        this.$message.warning({
          message: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》',
        })
      }
    },

    // 点击手机号注册按钮
    registerWithPhone() {
      if (this.agree) {
        this.phoneLoginOrRegister = 'register'  // 切换到手机号注册页面
        this.countryCode = '86'
      } else {  // 没有勾选协议
        this.$message.warning({
          message: '请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》',
        })
      }
    },

    // 手机号密码登录或验证码登录切换
    changePasswordOrCaptcha() {
      this.loginwithPassword = !this.loginwithPassword
      this.message = ''
    },

    // 检查手机号格式是否正确
    checkPhone() {
      let re = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
      return re.test(this.phone)
    },

    // 检查验证码格式是否正确
    checkCaptcha() {
      let re = /^[0-9]{4}$/
      return re.test(this.captcha)
    },

    // 获取验证码
    async sendCode() {
      // 手机号为空
      if (this.phone === '') {
        this.message = '请输入手机号'
        return
      }
      // 手机号格式错误
      if (!this.checkPhone()) {
        this.message = '手机号码格式错误，请更换后重试'
        return
      }
      let result = await this.$api.reqCaptcha(this.phone, this.countryCode)
      if (result.code !== 200) {
        this.$message.error('验证码发送失败，请稍后重试')
      } else {
        // 获取验证码倒计时
        this.countdownTimer = setInterval(() => {
          if (this.countDown === 0) {
            this.countDown = 60
            this.$refs.captchaButton.innerHTML = '获取验证码'
            clearInterval(this.countdownTimer)
          } else {
            this.countDown--
            this.$refs.captchaButton.innerHTML = this.countDown + '秒后重试'
          }
        }, 1000)
      }
    },

    // 验证手机号和验证码
    async loginCellphoneByCaptcha() {
      if (this.phone === '') {
        this.message = '请输入手机号'
        return
      } else {
        if (!this.checkPhone()) {
          this.message = '请输入正确的手机号'
          return
        }
      }
      if(this.captcha === '') {
        this.message = '请输入验证码'
        return
      } else {
        if (!this.checkCaptcha()) {
          this.message = '短信验证码格式错误'
          return
        }
      }
      let result = await this.$api.verifyCaptcha(
        this.phone,
        this.captcha,
        this.countryCode
      )
      if (result.code !== 200) {
        this.message = '请输入正确的短信验证码'
      } else {
        try {
          let result2 = await this.$api.loginCellphoneByCaptcha(this.phone, this.captcha)
          if (result2.code === 200) {
            this.$store.dispatch('user/setCookie', result2.cookie)
            this.$store.dispatch('user/setUserInfo', result2.profile)
            this.$store.dispatch('user/setUserId', result2.account.id)
            this.userImg = result2.profile.avatarUrl
            this.isLogin = true
            this.closeLoginBox()
            location.reload()
          }
        } catch(err) {
          this.$message.error(err)
        }
        
      }
    },

    // 手机号+密码登录
    async loginCellphoneByPassword() {
      if (this.phone === '') {
        this.message = '请输入手机号'
        return
      } else{
        if (!this.checkPhone(this.phone)) {
          this.message = '请输入正确的手机号'
          return
        }
      }
      if (this.password === '') {
        this.message = '请输入密码'
        return
      }
      let result = await this.$api.loginCellphoneByPassword(
        this.phone,
        this.password
      )
      if (result.code === 200) {
        this.message = ''
        // 成功登录
        this.$store.dispatch('user/setCookie', result.cookie)
        this.$store.dispatch('user/setUserInfo', result.profile)
        this.$store.dispatch('user/setUserId', result.account.id)
        this.userImg = result.profile.avatarUrl
        this.isLogin = true
        this.closeLoginBox()
        location.reload()
      } else {
        this.message = '手机号或密码错误'
      }
    },

    // 退出登录
    logout() {
      this.isLogin = false
      this.isShowUserBox = false
      this.$store.dispatch("user/logout").then(() => {
        location.reload()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  background-color: #242424;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .wrap-header {
    height: 70px;
    position: relative;
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
    .user {
      float: right;
      height: 45px;
      margin: 19px 0 0 20px;
      padding: 0 22px 0 0;
      img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
      }
    }
    .user-box {
    position: absolute;
    top: 58px;
    right: -43px;
    width: 158px;
    background-color: #2b2b2b;
    border: 1px solid #202020;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    z-index: 300;
    .arrow {
      position: absolute;
      top: -8px;
      left: 50%;
      margin-left: -8px;
      width: 14px;
      height: 8px;
      background: url('../assets/images/toplist.png') -20px 0;
    }
    ul {
      border-bottom: 1px solid #232323;
      &:last-child {
        border: none;
      }
      li {
        height: 34px;
        width: 100%;
        &:hover {
          background-color: #353535;
          a {
            color: #fff;
          }
        }
        a {
          display: block;
          height: 34px;
          line-height: 34px;
          padding-left: 24px;
          color: #ccc;
          i {
            display: inline-block;
            background: url('../assets/images/toplist.png');
            margin-right: 10px;
            vertical-align: middle;
            width: 18px;
            height: 18px;
          }
          .icon-user {
            background-position: 0 -80px;
          }
          .icon-message {
            background-position: -20px -120px;
          }
          .icon-level {
            background-position: 0 -100px;
          }
          .icon-vip {
            background-position: 0 -221px;
          }
          .icon-settings {
            background-position: 0 -140px;
          }
          .icon-validation {
            background-position: -20px -142px;
          }
          .icon-logout {
            background-position: 0 -200px;
          }
        }
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
    .searchList {
      position: absolute;
      top: 59px;
      left: 790px;
      width: 240px;
      z-index: 1;
      border: 1px solid #bebebe;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 4px 7px #555;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
      a {
        color: #333;
      }
      .note {
        height: 40px;
        padding: 11px 10px;
        border-bottom: 1px solid #e2e2e2;
        a:hover {
          background: #e3e5e7;
        }
      }
      .rap {
        .hd {
          float: left;
          width: 63px;
          padding: 10px 0 0 10px;
          border-right: 1px solid #e2e2e2;
          font-weight: normal;
          font-size: 12px;
          .icn {
            float: left;
            width: 14px;
            height: 15px;
            margin: 2px 4px 0 0;
            vertical-align: middle;
            background: url('../assets/images/icon.png');
          }
        }
        .bd {
          margin-left: 62px;
          margin-top: -1px;
          padding: 6px 0 5px;
          border-left: 1px solid #e2e2e2;
          border-top: 1px solid #e2e2e2;
          li {
            a {
              display: block;
              width: 100%;
              text-indent: 12px;
              line-height: 24px;
            }
            &:hover {
              background-color: #e3e5e7;
            }
          }
        }
        .odd {
          background-color: #f9f8f8;
        }
        .songs {
          .icn {
            background-position: -35px -300px;
          }
        }
        .artists {
          .icn {
            background-position: -50px -300px;
          }
        }
        .albums {
          .icn {
            background-position: -35px -320px;
          }
        }
        .playlists {
          .icn {
            background-position: -50px -320px;
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
    z-index: 100;
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
    z-index: 201;
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
                      background: url('../assets/images/icons.png') -150px -670px
                        no-repeat;
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
        .btm {
          display: flex;
          padding: 0 19px;
          height: 48px;
          line-height: 48px;
          background-color: #f7f7f7;
          border-top: 1px solid #c6c6c6;
          border-radius: 0 0 4px 4px;
          .left {
            color: #0c73c2;
            font-size: 12px;
          }
          .right {
            color: #999;
            font-size: 12px;
          }
        }
        .register-with-phone {
          margin: -28px 0;
          section {
            margin: 0 auto;
            padding: 30px 0 43px;
            width: 220px;
            .phone-number {
              position: relative;
              .content {
                display: flex;
                margin: 0;
                height: 30px;
                line-height: 30px;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                overflow: hidden;
                a {
                  position: relative;
                  height: 30px;
                  padding: 0 18px 0 5px;
                  border-right: 1px solid #cdcdcd;
                  &::after {
                    content: '';
                    position: absolute;
                    top: 14px;
                    right: 7px;
                    width: 7px;
                    height: 4px;
                    background: url('../assets/images/icons2.png') -260px -450px;
                  }
                }
                input {
                  border: none;
                  outline: none;
                  padding: 0 8px;
                  height: 100%;
                  flex: 1;
                }
              }

              ul {
                position: absolute;
                top: 31px;
                left: 0;
                width: 100%;
                height: 128px;
                border: 1px solid #cdcdcd;
                border-top: none;
                overflow: auto;
                background-color: #fff;
                li {
                  display: flex;
                  justify-content: space-between;
                  padding: 0 7px;
                  height: 32px;
                  line-height: 32px;
                  &:hover {
                    background-color: #f7f7f7;
                  }
                }
              }
            }
            .password {
              border: 1px solid #cdcdcd;
              border-radius: 2px;
              overflow: hidden;
              margin-top: 10px;
              height: 30px;
              input {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                padding: 0 8px;
              }
            }
            .next-step {
              display: block;
              margin-top: 20px;
              width: 220px;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              text-align: center;
              color: #fff;
              background: url('../assets/images/btnBg.png') 0 -387px;
            }
          }
        }
        .login-with-phone {
          margin: -28px 0;
          .phone-code {
            width: 420px;
            margin: 0 auto;
            padding: 80px 50px 43px;
            #login-form {
              .phone-number {
                position: relative;
                display: flex;
                height: 36px;
                width: 100%;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 20px;
                a {
                  position: relative;
                  display: block;
                  width: 54px;
                  height: 34px;
                  line-height: 34px;
                  border-radius: 20px;
                  text-align: center;
                  &::after {
                    content: '';
                    position: absolute;
                    top: 15px;
                    right: 5px;
                    width: 7px;
                    height: 4px;
                    background: url('../assets/images/icons2.png') -260px -450px;
                  }
                }
                input {
                  border: none;
                  outline: none;
                  height: 100%;
                }
              }
              ul {
                position: absolute;
                height: 120px;
                width: 100%;
                top: 40px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                overflow: auto;
                background-color: #fff;
                li {
                  display: flex;
                  justify-content: space-between;
                  padding: 0 7px;
                  height: 32px;
                  line-height: 32px;
                  &:hover {
                    background-color: #f7f7f7;
                  }
                }
              }
              .code {
                margin-top: 20px;
                input {
                  height: 36px;
                  width: 193px;
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  border-radius: 20px;
                  outline: none;
                  padding-left: 15px;
                }
                button {
                  width: 119px;
                  height: 36px;
                  line-height: 36px;
                  margin: 0;
                  margin-left: 8px;
                  font-size: 14px;
                  color: #fff;
                  background-color: #ff3a3a;
                  border: none;
                  border-radius: 20px;
                  &.count-down {
                    background-color: #ddd;
                    color: #999;
                  }
                }
              }
              .err-msg {
                margin-bottom: -8px;
                margin-top: 16px;
                height: 20px;
                line-height: 20px;
                .err-icon {
                  display: inline-block;
                  vertical-align: middle;
                  height: 15px;
                  width: 18px;
                  background: url('@/assets/images/icons3.png') -217px -34px;
                }
                .msg {
                  display: inline-block;
                  width: 300px;
                  height: 20px;
                  color: #fa5b5b;
                  font-size: 12px;
                  line-height: 20px;
                }
              }
              button {
                margin-top: 24px;
                margin-bottom: 45px;
                border: none;
                border-radius: 20px;
                line-height: 36px;
                width: 100%;
                height: 36px;
                font-size: 14px;
                color: #fff;
                background-color: #ff3a3a;
              }
            }
            .change {
              margin: 0 auto -43px;
              padding-bottom: 30px;
              width: 320px;
              a {
                color: #666;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
          .pwd {
            margin: 0 auto;
            padding: 30px 0 43px;
            width: 220px;
            .phone-number {
              position: relative;
              .content {
                display: flex;
                margin: 0;
                height: 30px;
                line-height: 30px;
                border: 1px solid #cdcdcd;
                border-radius: 2px;
                overflow: hidden;
                a {
                  position: relative;
                  height: 30px;
                  padding: 0 18px 0 5px;
                  border-right: 1px solid #cdcdcd;
                  &::after {
                    content: '';
                    position: absolute;
                    top: 14px;
                    right: 7px;
                    width: 7px;
                    height: 4px;
                    background: url('../assets/images/icons2.png') -260px -450px;
                  }
                }
                input {
                  border: none;
                  outline: none;
                  padding: 0 8px;
                  height: 100%;
                  flex: 1;
                }
              }

              ul {
                position: absolute;
                top: 31px;
                left: 0;
                width: 100%;
                height: 128px;
                border: 1px solid #cdcdcd;
                border-top: none;
                overflow: auto;
                background-color: #fff;
                li {
                  display: flex;
                  justify-content: space-between;
                  padding: 0 7px;
                  height: 32px;
                  line-height: 32px;
                  &:hover {
                    background-color: #f7f7f7;
                  }
                }
              }
            }
            .password {
              position: relative;
              border: 1px solid #cdcdcd;
              border-radius: 2px;
              overflow: hidden;
              margin-top: 10px;
              height: 30px;
              line-height: 30px;
              input {
                height: 100%;
                border: none;
                outline: none;
                padding: 0 8px;
              }
              a {
                position: absolute;
                top: 0;
                right: 0;
                color: #666;
              }
            }
            .warn {
              margin-top: 5px;
              color: #e33232;
              i {
                display: inline-block;
                height: 14px;
                width: 14px;
                margin-right: 8px;
                vertical-align: middle;
                background: url('../assets/images/icon.png') -50px -270px;
              }
            }
            .btns {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              a {
                &:hover {
                  text-decoration: underline;
                }
              }
              label {
                input {
                  vertical-align: middle;
                }
              }
            }
            .next-step {
              display: block;
              margin-top: 20px;
              width: 220px;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              text-align: center;
              color: #fff;
              background: url('../assets/images/btnBg.png') 0 -387px;
            }
          }
          .btm {
            justify-content: space-between;
          }
        }
      }
    }
  }
  
}
</style>
