<template>
  <div class="not-logged">
    <div class="n-pglg">
      <a href="javascript:;" class="btn" @click="$bus.$emit('appear')"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotLogged',
}
</script>

<style lang="less" scoped>
.not-logged {
  width: 982px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .n-pglg {
    width: 902px;
    height: 484px;
    margin: 0 auto 0;
    padding-top: 70px;
    background: url('@/assets/images/notlogin.jpg') 0 70px no-repeat;
    .btn {
      display: block;
      width: 157px;
      height: 48px;
      margin: 260px 0 0 535px;
      &:hover {
        background: url('@/assets/images/notlogin.jpg') 0 -430px no-repeat;
      }
    }
  }
}
</style>