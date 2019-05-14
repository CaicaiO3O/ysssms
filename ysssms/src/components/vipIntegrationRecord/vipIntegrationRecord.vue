<template>
  <div class="vipIntegrationRecord-wrapper">
    <div class="title">
      <i class="el-icon-search"></i><span>会员积分记录</span>
    </div> 
    <div style="margin-bottom: 15px;padding-left:20px ;">总计{{total_num}}分</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="integralrecordid"
        label="记录编号">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="分数">
      </el-table-column>
      <el-table-column
        prop="integralrecordmsg"
        label="积分描述">
      </el-table-column>
      <el-table-column
        prop="integralrecordtime"
        label="时间">
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
  name: 'slider',
  data(){
    return {
      pageTotal:0,
      pageIndex: 1,
      pageSize:5,
      tableData:[],
      total_num:null,
    }
  },
  mounted(){
    this.getMemberIngretalRecord(this.pageIndex,this.pageSize);
    this.getMemberIngretalRecordCount();
  },
  methods:{
    getMemberIngretalRecord(pageIndex,pageSize){
      this.axios.get(this.common.getApi() + '/sys/api/member/getMemberIngretalRecord',{
        params:{
          pageIndex: pageIndex,
          pageSize: pageSize,
          params:{
            id: Number(sessionStorage.getItem('userid'))
          }
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.tableData = res.data.obj.list;
        this.pageTotal = res.data.obj.pager.total;
        console.log(this.pageTotal);
      })
    },
    go(currentPage){
      this.getMemberIngretalRecord(currentPage,this.pageSize);
    },
    getMemberIngretalRecordCount(){
      this.axios.get(this.common.getApi() + '/sys/api/member/getMemberIngretalRecordCount',{
        params:{
          params:{
            id: Number(sessionStorage.getItem('userid'))
          }
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res);
        this.total_num = res.data.obj == null? 0 : res.data.obj;
      })      
    }
  }
}  
</script>

<style>
  .vipIntegrationRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipIntegrationRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipIntegrationRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
  
  .vipIntegrationRecord-wrapper .el-pagination{
    text-align: center;
    margin-top: 2%;
  }
</style>