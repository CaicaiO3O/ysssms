<template>
  <div class="login">
    <div class="login-wrapper">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div> 
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        form: {
          username:'',
          password:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' }
          ],
        }        
      }
    },
    methods:{
      login(){
        this.$router.push({ path: '/main' })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/main')
//          var params = new URLSearchParams();
//          params.append('account', this.form.username);
//          params.append('password', this.form.password);
//          this.axios({
//            url:this.common.getApi() + 'api/login/adminLogin',
//            method:'post',
//            data: params,
//          }).then((res) => {
//            console.log(res);
//            if(res.data.code == '0'){
////              localStorage.clear()
//              this.$store.commit('changeLogin', res.data.data.token);
//              this.$store.commit('checkQx', 'admin');
//              this.$router.push('/main');
//            }else{
//              this.$message.error(res.data.message)
//            }
//          })            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },      
    }
  }
</script>

<style>
  .login{
    background: #409EFF;
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .login-wrapper{
    margin: 0 auto;
    width: 360px;
    padding: 45px;
    text-align: center;
    background: #FFF;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.2), 0 5px 5px 0 rgba(0,0,0,0.24);
    padding-top: 65px;
  }  
  
  .login-wrapper .el-input input{
    height: 50px;
  }
  
  .login-wrapper .el-button{
    height: 50px;
  }
</style>