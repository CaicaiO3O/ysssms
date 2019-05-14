<template>
  <div class="vipRecommendRecord-wrapper">
    <div class="title">
      <i class="el-icon-search"></i><span>会员推荐搜索结果</span>
    </div>    
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="memberRealname"
        label="推荐人姓名">
      </el-table-column>
      <el-table-column
        prop="memberState"
        label="推荐人激活状态">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="推荐人注册时间">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="获取奖励">
      </el-table-column>
      <el-table-column
        prop="isblackname"
        label="医生认证状态">
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
      pageSize:12,
      tableData:[],
    }
  },
  mounted(){
    this.getMemberRecommendRecord(this.pageIndex,this.pageSize);
  },
  methods:{
    getMemberRecommendRecord(pageIndex,pageSize){
      this.axios.get(this.common.getApi() + '/sys/api/member/getMemberRecommendRecord',{
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
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].memberState == 0){
            this.tableData[i].memberState = '未激活'
          }else if(this.tableData[i].memberState == 1){
            this.tableData[i].memberState = '激活'
          }
          if(this.tableData[i].isblackname == 0){
            this.tableData[i].isblackname = "未审核";
          }else if(this.tableData[i].isblackname == 2){
            this.tableData[i].isblackname = "审核通过";
          }else if(this.tableData[i].isblackname == 3){
            this.tableData[i].isblackname = "ID审核";
          }else if(this.tableData[i].isblackname == 4){
            this.tableData[i].isblackname = "待定";
          }else if(this.tableData[i].isblackname == 5){
            this.tableData[i].isblackname = "未审核通过";
          }else if(this.tableData[i].isblackname == 6){
            this.tableData[i].isblackname = "信息填写错误";
          }else if(this.tableData[i].isblackname == 7){
            this.tableData[i].isblackname = "科室电话错误";
          }else if(this.tableData[i].isblackname == 8){
            this.tableData[i].isblackname = "未联系到本人";
          }else if(this.tableData[i].isblackname == 9){
            this.tableData[i].isblackname = "兼职";
          }else if(this.tableData[i].isblackname == 10){
            this.tableData[i].isblackname = "测试";
          }
        }
        this.pageTotal = res.data.obj.pager.total;
        console.log(this.pageTotal);
      })
    },
    go(currentPage){
      this.getMemberRecommendRecord(currentPage,this.pageSize);
    },
  }
}
</script>

<style>
  .vipRecommendRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipRecommendRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipRecommendRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }    
  
  .vipRecommendRecord-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }    
</style>