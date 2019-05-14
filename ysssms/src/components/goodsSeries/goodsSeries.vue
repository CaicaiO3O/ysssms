<template>
  <div class="goodsSeries-wrapper">
    <el-table
      :data="tableData"
      border
      style="width: 400px">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="系列">
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
        pageSize: 6,
        pageTotal: null,
      }
    },
    mounted(){
      this.getGiftCategoryList(this.pageIndex,this.pageSize);
    },
    methods:{
      getGiftCategoryList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/giftcategory/getGiftCategoryList',{
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
        this.getGiftCategoryList(currentPage,this.pageSize);
      },
    }
  }
</script>

<style>
  .goodsSeries-wrapper .el-pagination{
    width: 400px;
    text-align: center;
    margin-top: 20px;
  }
</style>