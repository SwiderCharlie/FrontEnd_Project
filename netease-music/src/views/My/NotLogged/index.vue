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
    width: 807px;
    height: 372px;
    margin: 0 auto 0;
    padding-top: 104px;
    background: url('@/assets/images/mymusic.png') 0 104px no-repeat;
    .btn {
      display: block;
      width: 167px;
      height: 45px;
      margin: 202px 0 0 482px;
      &:hover {
        background: url('@/assets/images/mymusic.png') 0 -278px no-repeat;
      }
    }
  }
}
</style>