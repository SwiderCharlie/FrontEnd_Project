<template>
  <div class="comments">
    <!-- 标题栏 -->
    <div class="title">
      <h3>评论</h3>
      <span class="sub">共{{ tolComments }}条评论</span>
    </div>

    <div class="mainer">
      <!-- 发表评论 -->
      <div class="iptarea clearfix">
        <div class="head">
          <img :src="userImg" />
        </div>
        <div class="txt">
          <textarea
            class="u-txt"
            cols="30"
            rows="10"
            placeholder="评论"
          ></textarea>
          <em class="arrline">◆</em>
          <em class="arrline-shadow">◆</em>
          <div class="shadow"></div>
        </div>
        <div class="btns">
          <i class="emjoy"></i>
          <i class="at"></i>
          <a>评论</a>
          <span>140</span>
        </div>
      </div>

      <!-- 最新评论 -->
      <div class="new" v-if="tolComments > 0">
        <h3 class="hd">最新评论({{ tolComments }})</h3>
        <ul class="cmt-list">
          <li
            class="cmt-item clearfix"
            v-for="item in commentsList"
            :key="item.commentId"
          >
            <div class="head">
              <a href="javascript:;">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </a>
            </div>
            <div class="cntwrap">
              <div class="cnt">
                <a>{{ item.user.nickname }}</a>
                <span class="cmt-content"> ：{{ item.content }}</span>
                <div class="que" v-show="item.beReplied[0]">
                  <a class="fc" v-if="item.beReplied[0]">{{
                    item.beReplied[0].user.nickname
                  }}</a>
                  <span v-if="item.beReplied[0]"
                    >：{{ item.beReplied[0].content }}</span
                  >
                </div>
              </div>
              <div class="rp">
                <span class="time">{{ item.timeStr }}</span>
                <a class="fc">回复</a>
                <span class="sep">|</span>
                <a class="like">
                  <i class="zan"></i>
                  <span v-show="item.likedCount != 0"
                    >({{ item.likedCount }})</span
                  >
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 分页器 -->
      <pagination :pageNo="pageNo" :pageSize="pageSize" :total="tolComments" :continues="5" @getPageNo="getPageNo"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Comments',
  components: { Pagination },
  data() {
    return {
      commentsList: [], // 评论列表
      tolComments: 0, // 评论总数
      pageSize: 20, // 每页评论数
      pageNo: 1, // 当前展示的是第几页
      userImg: '@/assets/images/default_avatar.jpg',  // 用户头像
    }
  },

  computed: {
    id() {
      if (!this.$route.query.id) return '19723756'
      else return this.$route.query.id
    },
  },

  watch: {
    id() {
      // 重新请求评论数据
      this.pageNo = 1
      this.getCommentsList()
    },
  },

  mounted() {
    this.getCommentsList()  // 获取评论
    if (Object.keys(this.$store.state.user.userInfo).length > 0){
      this.userImg = this.$store.state.user.userInfo.avatarUrl
    }
  },

  methods: {
    // 获取评论
    async getCommentsList() {
      let result = await this.$api.reqPlayListComments(
        this.id,
        this.pageSize,
        (this.pageNo - 1) * this.pageSize
      )
      this.tolComments = result.total
      this.commentsList = result.comments
    },

    // 获取当前页数
    getPageNo(pageNo) {
      this.pageNo = pageNo
      this.getCommentsList()
    }
  },
}
</script>

<style lang="less" scoped>
.comments {
  margin-top: 40px;
  padding: 0 30px 0 40px;
  .title {
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      float: left;
      font-size: 20px;
      line-height: 28px;
      font-weight: normal;
    }
    .sub {
      float: left;
      margin: 9px 0 0 20px;
      color: #666;
    }
  }
  .mainer {
    margin-top: 20px;
    .iptarea {
      margin-bottom: 20px;
      .head {
        width: 50px;
        height: 50px;
        float: left;
        img {
          width: 100%;
        }
      }
      .txt {
        float: left;
        width: 608px;
        height: 63px;
        margin-left: 12px;
        position: relative;
        .u-txt {
          font-size: 12px;
          color: #333;
          font-family: Arial, Helvetica, sans-serif;
          -webkit-text-size-adjust: none;
          width: 100%;
          height: 63px;
          padding: 5px 6px 6px;
          border: 1px solid #cdcdcd;
          border-radius: 2px;
          line-height: 19px;
          resize: none;
          outline: none;
        }
        .arrline {
          position: absolute;
          left: -9px;
          top: -6px;
          font-size: 30px;
          color: #cdcdcd;
        }
        .arrline-shadow {
          position: absolute;
          left: -7px;
          top: -3.5px;
          font-size: 27px;
          color: #fff;
        }
        .shadow {
          width: 7px;
          height: 18px;
          position: absolute;
          left: 1px;
          top: 8px;
          background: #fff;
          z-index: 10;
        }
      }
      .btns {
        float: left;
        width: 608px;
        height: 35px;
        padding-top: 10px;
        margin-left: 62px;
        i {
          display: block;
          float: left;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          background: url('@/assets/images/icon.png') no-repeat;
        }
        .emjoy {
          background-position: -40px -490px;
        }
        .at {
          background-position: -60px -490px;
        }
        span {
          float: right;
          margin-right: 10px;
          line-height: 25px;
        }
        a {
          float: right;
          width: 46px;
          height: 25px;
          text-align: center;
          line-height: 24px;
          background: url('@/assets/images/button.png') no-repeat -84px -94px;
          color: #fff;

          &:hover {
            background-position: -84px -64px;
            cursor: pointer;
          }
        }
      }
    }
    .new {
      h3 {
        font-size: 12px;
        height: 21px;
        line-height: 20px;
        border-bottom: 1px solid #cfcfcf;
      }
      .cmt-list {
        .cmt-item {
          padding: 15px 0;
          border-top: 1px dotted #ccc;
          .head {
            float: left;
            width: 50px;
            height: 50px;
            img {
              width: 100%;
            }
          }
          .cntwrap {
            margin-left: 60px;
            .cmt-content {
              line-height: 20px;
            }
            .cnt > a {
              color: #0c73c2;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
            .que {
              padding: 8px 19px;
              margin-top: 10px;
              line-height: 20px;
              background: #f4f4f4;
              border: 1px solid #dedede;

              a {
                color: #0c73c2;
                &:hover {
                  cursor: pointer;
                  text-decoration: underline;
                }
              }
            }

            .rp {
              margin-top: 15px;

              .time {
                float: left;
                color: #999;
              }
              .like,
              .sep,
              .fc {
                float: right;
              }
              .sep {
                margin: 0 8px;
              }

              .fc {
                color: #666;

                &:hover {
                  color: #666;
                  cursor: pointer;
                  text-decoration: underline;
                }
              }
              .like {
                .zan {
                  margin-right: 5px;
                  vertical-align: -2px;
                  margin-top: -4px;
                  width: 15px;
                  height: 14px;
                  display: inline-block;
                  background: url('@/assets/images/icons2.png') no-repeat;
                  background-position: -150px 0;
                }
                &:hover {
                  color: #666;
                  cursor: pointer;
                  text-decoration: underline;
                }
              }
            }
          }
        }
        .cmt-item:nth-child(1) {
          border: none;
        }
      }
    }
  }
}
</style>
