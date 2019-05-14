<template>
  <div class="settingFeedback-wrapper">
    <el-table
      :data="tableData"
      border
      style="">
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="customName"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="email"
        label="用户邮箱">
      </el-table-column>
      <el-table-column
        prop="linkMobile"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="position"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="projectDetail"
        label="项目细节">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
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
        pageIndex: 1,
        pageSize: 12,
        pageTotal: null,
      }
    },
    mounted(){
      this.getBusinessList(this.pageIndex,this.pageSize);
    },
    methods:{
      getBusinessList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/business/getBusinessList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize
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
        this.getBusinessList(currentPage,this.pageSize);
      },
    }
  }  
</script>

<style>
  .settingFeedback-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>