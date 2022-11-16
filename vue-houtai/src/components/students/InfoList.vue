<template>
  <div class="infoList">
    <!-- 新增按钮 -->
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲姓名" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲姓名" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <!-- 修改 -->
            <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增学生信息弹窗 -->
    <el-dialog width="500px" :title="state? '添加学生信息': '修改学生信息'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mother">
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
          <el-date-picker v-model="form.time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { info, getInfo, infoDel } from '@/api/api.js'
export default {
  name: 'InfoList',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,  // 控制弹窗显示隐藏
      form: {
        id: 0,
        name: '',
        sex: '1',
        age: '',
        father: '',
        mother: '',
        address: '',
        time: '',
        phone: ''
      },
      formLabelWidth: '80px',
      rules: {  // 校验规则
        name: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true}],
        age: [{ required: true, message: '请输入年龄' }],
        address: [{ required: true, message: '请输入地址' }],
        time: [{ required: true, message: '请输入入学时间' }],
        phone: [{ required: true, message: '请输入联系方式' }],
      },
      total: '',  // 数据总条数
      state: true,  // 动态展示添加/修改学生信息
    }
  },

  methods: {
    addStudent() {
      this.state = true;
      this.dialogFormVisible = true;
      this.form = {
        name: '',
        sex: '1',
        age: '',
        father: '',
        mother: '',
        address: '',
        time: '',
        phone: ''
      };
    },

    getData () {
      getInfo().then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      })
    },

    edit(row) {
      this.form = {...row};  // 防止表格中同步改变数据
      this.state = false;
      this.dialogFormVisible = true;
    },

    del(row) {
      this.$alert('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          infoDel(row.id).then(res => {
            if (res.data.status === 200) {
              this.getData();
              this.$message({message: res.data.message, type: 'success'})
            }
          })
        }
      })
    },

    sure(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if(this.state) {  // 新增操作
            this.form.id = this.total;
            info('post', this.form).then(res => {
              if(res.data.status === 200) {
                this.getData();
                this.dialogFormVisible = false;
                this.$message({type: 'success', message: res.data.message});
              }
            });
          } else {  // 修改操作
            info('put', this.form).then(res => {
              if(res.data.status === 200) {
                this.getData();
                this.dialogFormVisible = false;
                this.$message({type: 'success', message: res.data.message});
              }
            })
          }
        }
      })
    },

    closeInfo(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    }

  },
  created() {
    this.getData();
  }
}
</script>

<style lang="less">
.infoList {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
}
</style>
