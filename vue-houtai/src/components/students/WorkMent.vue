<template>
  <div class="workMent">
    <!-- 表格 -->
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pageing :total="total" :url="url"/>
  </div>
</template>

<script>
import Pageing from '../common/Pageing.vue'
export default {
  name: 'WorkMent',
  components: { Pageing },
  data() {
    return {
      tableData: [],  // 表格数据
      total: 0,  // 数据总条数
      loading: true, // 是否显示加载动画,
      url: '/works'  // 传入到分页组件的url地址
    }
  }
}
</script>

<style lang="less">
.workMent {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>