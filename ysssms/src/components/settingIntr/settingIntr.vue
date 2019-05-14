<template>
  <div class="settingIntr-wrapper">
    <el-button type="primary" @click="adddialogVisible = true" style="margin-bottom: 20px;" v-if="tableData.length==0">增加</el-button>
    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="bannerName"
        label="banner名称">
      </el-table-column>
      <el-table-column
        type="index"
        label="层级">
      </el-table-column>
      <el-table-column
        prop="skipUrl"
        label="链接">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        label="缩略图">
        <template slot-scope="scope">
          <img :src="baseurl + scope.row.picUrl" alt="" />
        </template>
      </el-table-column> 
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="move(scope.row,0)">上移</el-button>
          <el-button type="text" size="small" @click="move(scope.row,1)">下移</el-button>
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
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        adddialogVisible: false,
        editdialogVisible: false,
        fileList:[],
        addform:{
          
        },
        editform:{

        },
        tableData: [],
        uploadForm: new FormData(),
        rules: {
//        name: [
//          { required: true, message: '请填写banner名称', trigger: 'blur' },
//        ],
//        bannerType:[
//        { required: true, message: '请选择banner类型', trigger: 'change' },
//        ],
//        link: [
//          { required: true, message: '请填写链接', trigger: 'blur' },
//        ],
        },
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        baseurl:null,
      }
    },
    mounted(){
      this.getBannerList(this.pageIndex,this.pageSize);
    },
    methods: {
      getBannerList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/banner/getBannerList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].bannerType == 0){
              this.tableData[i].skipUrl = '/'
            }
          }
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
//      this.getBannerList(currentPage,this.pageSize);
      },      
    }    
  }    
</script>

<style>
  .settingIntr-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
</style>