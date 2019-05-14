<template>
  <div class="vipZyzAudit-wrapper">
    <div class="query-wrapper">
      <el-form label-width="120px" :inline="true" size="mini">
        <el-form-item label="会员流水号：">
          <el-input style="width: 200px;" v-model="memberId"></el-input>
        </el-form-item>
        <el-form-item label="会员账号：">
          <el-input style="width: 200px;" v-model="memberMobile"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名：">
          <el-input style="width: 200px;" v-model="memberName"></el-input>
        </el-form-item>
        <br />
        <el-form-item style="padding-left: 30px;">          
          <el-button size="mini" type="primary" @click="getCertificateMemberList(1,6)">立即查询</el-button>        
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="mini">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="recommendcode"
        label="推荐码">
      </el-table-column>
      <el-table-column
        label="执业证书">
         <template slot-scope="scope">
            <img :src="baseurl + scope.row.filename" alt="" />
            <img :src="baseurl + scope.row.secondfilename" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="isblackname"
        label="审核结果">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doCertificateAudit(scope.row,2)">通过</el-button>
          <el-button type="text" size="small" @click="doCertificateAudit(scope.row,3)">不通过</el-button>
        </template>
      </el-table-column>      
    </el-table>      
    <el-pagination
      small
      layout="prev, pager, next"
      :total="pageTotal"
      :page-size="pageSize"
      @current-change="go">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:6,
        pageTotal:null,
        memberName:null,
        memberMobile:null,
        memberId:null,
        state:null,
        baseurl: baseurl
      }
    },
    mounted(){
      this.getCertificateMemberList(this.pageIndex,this.pageSize);
    },
    methods: {
      resetForm(){
        this.memberId = null;
        this.memberMobile = null;
        this.memberName = null;
      },
      getCertificateMemberList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/audit/getCertificateMemberList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              memberId: this.memberId,
              memberMobile: this.memberMobile,
              memberName: this.memberName,
            }            
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.tableData = res.data.obj.list;
            this.pageTotal = res.data.obj.pager.total;
            for(var i = 0; i < this.tableData.length; i++){
              if(this.tableData[i].isblackname == 0){
                this.tableData[i].isblackname = "未审核"
              }else if(this.tableData[i].isblackname == 2){
                this.tableData[i].isblackname = "审核通过"
              }else if(this.tableData[i].isblackname == 3){
                this.tableData[i].isblackname = "ID审核"
              }else if(this.tableData[i].isblackname == 4){
                this.tableData[i].isblackname = "未审核"
              }else if(this.tableData[i].isblackname == 5){
                this.tableData[i].isblackname = "未审核通过"
              }else if(this.tableData[i].isblackname == 6){
                this.tableData[i].isblackname = "信息填写错误"
              }else if(this.tableData[i].isblackname == 7){
                this.tableData[i].isblackname = "科室电话错误"
              }else if(this.tableData[i].isblackname == 8){
                this.tableData[i].isblackname = "未联系到本人"
              }else if(this.tableData[i].isblackname == 9){
                this.tableData[i].isblackname = "兼职"
              }else if(this.tableData[i].isblackname == 10){
                this.tableData[i].isblackname = "测试"
              }
            }
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      go(currentPage){
        this.getCertificateMemberList(currentPage,this.pageSize);
      },
      doCertificateAudit(row,state){
//      console.log(this.state);
//      var state = null;
//      if(this.state == true){
//        this.state = 2
//      }else{
//        this.state = 3
//      }
        this.axios.post(this.common.getApi() + '/sys/api/audit/doCertificateAudit',{
          params:{
            id: row.id,
            state: state
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.getCertificateMemberList(this.pageIndex,this.pageSize);
          }else{
            this.$message.error(res.data.msg);
          }
        })          
      },
    }
  }  
</script>

<style>
  .vipZyzAudit-wrapper .query-wrapper{
    min-height: 50px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }   
 
  
  .vipZyzAudit-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }   
</style>