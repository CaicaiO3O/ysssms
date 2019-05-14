<template>
  <div class="vipJoinRecord-wrapper">
    <div class="title">
      <i class="el-icon-search"></i><span>会员参与项目搜索结果    </span>
    </div>    
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="projectId"
        label="项目id">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="projectState"
        label="项目状态">
      </el-table-column>
      <el-table-column
        prop="joinTime"
        label="参与时间">
      </el-table-column>
      <el-table-column
        prop="state"
        label="会员完成状态">
      </el-table-column>
      <el-table-column
        prop="paraS"
        label="使用参数">
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
    }
  },
  mounted(){
    this.getMemberIngretalRecord(this.pageIndex,this.pageSize);
  },
  methods:{
    getMemberIngretalRecord(pageIndex,pageSize){
      this.axios.get(this.common.getApi() + '/sys/api/member/getMemberJoinRecord',{
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
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].projectState == 0){
            this.tableData[i].projectState = "正在进行";
          }else if(this.tableData[i].projectState == 1){
            this.tableData[i].projectState = "已完成";
          }else if(this.tableData[i].projectState == 2){
            this.tableData[i].projectState = "等待积分处理";
          }else if(this.tableData[i].projectState == 3){
            this.tableData[i].projectState = "暂停";
          }else if(this.tableData[i].projectState == 5){
            this.tableData[i].projectState = "尚未开始";
          }else if(this.tableData[i].projectState == 6){
            this.tableData[i].projectState = "项目撤销";
          }
          if(this.tableData[i].state == 0){
            this.tableData[i].state = "中途退出";
          }else if(this.tableData[i].state == 1){
            this.tableData[i].state = "被甄别";
          }else if(this.tableData[i].state == 2){
            this.tableData[i].state = "配额满";
          }else if(this.tableData[i].state == 3){
            this.tableData[i].state = "完成";
          }else if(this.tableData[i].state == 4){
            this.tableData[i].state = "审核拒绝";
          }else{
            this.tableData[i].state = "无状态";
          }
          if(!this.tableData[i].paraS){
            this.tableData[i].paraS = "未参与";
          }
        }
      })
    },
    go(currentPage){
      this.getMemberIngretalRecord(currentPage,this.pageSize);
    },
  }
}
</script>

<style>
  .vipJoinRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipJoinRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipJoinRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
  
  .vipJoinRecord-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
</style>