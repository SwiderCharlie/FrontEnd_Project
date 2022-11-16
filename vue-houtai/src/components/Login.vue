<template>
  <div class="login">

    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>通用后台管理系统</span>
      </div>

      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>

      </el-form>

    </el-card>

  </div>
</template>

<script>
import { nameRule, passwordRule } from '@/utils/validate.js'
import { login } from '@/api/api'
import { setToken } from '@/utils/setToken'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      // 表单校验规则
      rules: {
        username: [{ validator: nameRule, trigger: 'blur' }],
        password: [{ validator: passwordRule, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(form) {
      this.$refs[form].validate((valid => {
        if (valid) {
          login(this.form).then(res => {
            if (res.data.status === 200) {
              setToken('username', res.data.username);
              setToken('token', res.data.token);
              this.$message({message: res.data.message, type: 'success'});
              this.$router.push('/home');
            } else {
              this.$message({message: res.data.message, type: 'error'});
            }
          })
        } else {
          console.error(this.form);
        }
      }))
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../assets/bg.jpg') center no-repeat;
  .el-card {
    background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
        color: #fff;
    }
    .el-card__header {
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
