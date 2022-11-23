<template>
  <div class="footer-container">
    <div class="wrap-content">
      <ul class="icons">
        <li class="item">
          <a href="javascript:;"></a>
          <span>音乐播放平台</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>云村交易所</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>Amped Studio</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>用户认证</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>独立音乐人</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>赞赏</span>
        </li>
        <li class="item">
          <a href="javascript:;"></a>
          <span>视频激励</span>
        </li>
      </ul>

      <div class="links">
        <p class="line">
          <a href="javascript:;">服务条款</a>
          <i>|</i>
          <a href="javascript:;">隐私政策</a>
          <i>|</i>
          <a href="javascript:;">儿童隐私政策</a>
          <i>|</i>
          <a href="javascript:;">版权投诉</a>
          <i>|</i>
          <a href="javascript:;">投资者关系</a>
          <i>|</i>
          <a href="javascript:;">广告合作</a>
          <i>|</i>
          <a href="javascript:;">联系我们</a>
        </p>
        <p class="line">
          <a href="javascript:;" class="sep">廉政举报</a>
          <span class="sep">不良信息举报邮箱：51jubao@service.netease.com</span>
          <span>客服热线：95163298</span>
        </p>
        <p class="line">
          <span class="sep">互联网宗教信息服务许可证：浙（2022）0000120</span>
          <a href="javascript:;" class="sep">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
          <a href="javascript:;">
            <img src="../assets/images/police.png" alt="">
            浙公网安备 33010902002564
          </a>
        </p>
        <p class="line">
          <span class="sep">网易公司版权所有@1997-2022</span>
          <span class="sep">杭州乐读科技有限公司运营：</span>
          <a href="javascript:;">浙网文[2021] 1186-054号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="less" scoped>
.footer-container {
  height: 325px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background-color: #f2f2f2;
  .wrap-content {
    .icons {
      display: flex;
      justify-content: center;
      margin-top: 33px;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 80px;
        a {
          width: 45px;
          height: 45px;
          background: url('../assets/images/footer_enters.png') no-repeat;
          background-size: 220px 220px;
        }
        span {
          margin-top: 10px;
          color: rgba(0, 0, 0, 0.5);
        }
        &:first-child {
          margin-left: 0;
        }
        &:nth-child(1) {
          a {
            background-position: -170px -5px;
            &:hover {
              background-position: -5px -115px;
            }
          }
        }
        &:nth-child(2) {
          a {
            background-position: -5px -170px;
            &:hover {
              background-position: -60px -170px;
            }
          }
        }
        &:nth-child(3) {
          a {
            background-position: -5px -60px;
            &:hover {
              background-position: -60px -5px;
            }
          }
        }
        &:nth-child(4) {
          a {
            background-position: -60px -60px;
            &:hover {
              background-position: -115px -5px;
            }
          }
        }
        &:nth-child(5) {
          a {
            background-position: -115px -115px;
            &:hover {
              background-position: -5px -5px;
            }
          }
        }
        &:nth-child(6) {
          a {
            background-position: -170px -115px;
            &:hover {
              background-position: -60px -115px;
            }
          }
        }
        &:nth-child(7) {
          a {
            background-position: -170px -60px;
            &:hover {
              background-position: -115px -60px;
            }
          }
        }
      }
    }
    .links {
      padding-top: 60px;
      .line {
        height: 24px;
        line-height: 24px;
        text-align: center;
        a {
          color: #666;
          &:hover {
            text-decoration: underline;
          }
          img {
            width: 14px;
            height: 14px;
            margin-right: 2px;
            vertical-align: -2px;
          }
        }
        i {
          margin: 0 8px;
          color: #d9d9d9;
        }
        span{
          color: #666;
        }
      }
    }
  }
}
.sep {
  margin-right: 14px;
}
</style>
