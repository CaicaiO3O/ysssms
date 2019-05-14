<template>
  <div class="vipActivity-wrapper">
    <el-form :model="form" ref="form" label-width="120px" size="mini" :inline-message='true'>
      <el-form-item label="用户ID">
        <el-input v-model="form.id" style="width: 400px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户活跃度" >
        <el-radio-group v-model="form.memberFizz">
          <el-radio :label="1">休眠用户</el-radio>
          <el-radio :label="2">边缘</el-radio>
          <el-radio :label="3">活跃</el-radio>
          <el-radio :label="4">忠诚</el-radio>
        </el-radio-group>        
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="onsubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: Number(sessionStorage.getItem("userid")),
          memberFizz: null,
        },
      };
    },
    mounted(){
      this.getMemberInfoForEdit();
    },
    methods: {
      getMemberInfoForEdit(){
        var id = sessionStorage.getItem("userid");
        this.axios.get(this.common.getApi() + '/sys/api/member/getMemberInfoForEdit',{
          params:{
            params:{
              id: Number(id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.memberFizz = res.data.obj.memberFizz;
          }
        })                 
      },
      onsubmit(){
        this.axios.post(this.common.getApi() + '/sys/api/member/setMemberFizz',{
          params:{
            id: Number(sessionStorage.getItem('userid')),
            memberFizz: Number(this.form.memberFizz)
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.$message({
              type: 'success',
              message: '提交成功'
            })
          }else{
            this.$message.error(res.data.msg)
          }
        })             
      }
    }
  }    
</script>

<style>
</style>