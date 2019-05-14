<template>
  <div class="sampleRecord-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i>
      <span>项目抽样记录</span>抽样总人数 {{cy_number}}
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="sampleTime"
        label="抽样时间">
      </el-table-column>
      <!--<el-table-column
        prop="samplename"
        label="抽样名称">
      </el-table-column>-->
      <el-table-column
        prop="sampleContent"
        label="抽样条件">
      </el-table-column>
      <el-table-column
        prop="sampleNumber"
        label="抽样人数">
      </el-table-column>
      <el-table-column
        prop="sampleno"
        label="批次">
      </el-table-column>
      <el-table-column
        prop="smsno"
        label="短信次数">
      </el-table-column>
      <el-table-column
        prop="emailno"
        label="邮件次数">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">发送邮件</el-button>
          <el-button type="text" size="small">发送短信</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>
</template>

<script>
  export default {
    mounted(){
      this.getSampleRecord();
      this.getSampleTotal();
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      
      getSampleTotal(){
        this.axios.get(this.common.getApi() + '/sys/api/projectSample/getSampleTotal',{
          params:{
            params:{
              projectId: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.cy_number = res.data.obj;

          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      
      getSampleRecord(index, rows){
        this.axios.get(this.common.getApi() + '/sys/api/projectSample/getSampleRecord',{
          params:{
            params:{
              projectId: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.tableData = res.data.obj.list;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },      
    },

    data() {
      return {
        tableData: [],
        cy_number:''
      }
    }
  }
</script>

<style>
  .sampleRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .sampleRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .sampleRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
</style>