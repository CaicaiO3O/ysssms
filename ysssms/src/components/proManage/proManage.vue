<template>
	<div class="proManage-wrapper">
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="项目类型： " prop="type">
            <el-select v-model="editform.type">
              <el-option label="全部" value="0"></el-option>
              <el-option label="已参与" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </span>
    </el-dialog>	  
    <div class="query-wrapper">
      <el-form :inline="true" :model="formInline" size="mini">
        <el-form-item label="项目编号">
          <el-input v-model="formInline.pro_id" placeholder="" size=""></el-input>
        </el-form-item>
        <el-form-item label="项目标题">
          <el-input v-model="formInline.pro_title" placeholder="" size=""></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="formInline.pro_state" size="">
            <el-option label="正在进行" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="等待积分处理" value="2"></el-option>
            <el-option label="暂停" value="3"></el-option>
            <el-option label="尚未开始" value="5"></el-option>
            <el-option label="项目撤销" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>      
      <el-button type="primary" size="mini" @click="querylist">查询</el-button>
      <el-button type="primary" size="mini" @click="toAdd">增加</el-button>
      <el-button type="primary" size="mini" @click="resetForm">重置</el-button>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData3"
        border
        style="width: 100%"
        size="mini">
        <el-table-column
          prop="id"
          label="项目ID">
        </el-table-column>
        <el-table-column
          prop="projectId"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目标题"
          width="130">
        </el-table-column>
        <el-table-column
          prop="projectState"
          label="项目状态">
        </el-table-column>
        <el-table-column
          prop="projectPerson"
          label="记录人">
        </el-table-column>
        <el-table-column
          prop="projectIntegral"
          label="完成奖励">
        </el-table-column>
        <el-table-column
          prop="projectPutTime"
          label="发布时间"
          width="130">
        </el-table-column>
        <el-table-column
          prop="projectEndTime"
          label="结束时间"
          width="130">
        </el-table-column>
        <el-table-column
          prop="projectJoinNum"
          label="已参与数">
        </el-table-column>
        <el-table-column
          prop="finishNum"
          label="完成量">
        </el-table-column>
        <el-table-column
          prop="projectSampleTotal"
          label="样本数">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button @click="" type="text" size="small" @click="toStat(scope.row)">项目进度</el-button>
            <el-button @click="" type="text" size="small" @click="toParam(scope.row)">项目参数</el-button>
            <el-button @click="" type="text" size="small" @click="toSample(scope.row)">项目抽样</el-button>
            <el-button @click="" type="text" size="small" @click="toSampleRecord(scope.row)">项目抽样记录</el-button>
            <el-button @click="" type="text" size="small" @click="toIntegration(scope.row)">项目积分</el-button>
            <el-button @click="" type="text" size="small" @click="showdialog(scope.row)">导出</el-button>
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
	</div>
</template>

<script>
  export default {
  name: 'slider',
  data(){
    return {
      formInline: {
        pro_id: null,
        pro_title: null,
        pro_state:null,
      },
      pageTotal:0,
      pageIndex: 1,
      pageSize:12,
      tableData3:[],
      dialogVisible:false,
      editform:{
        id: null,
        type:null
      },
      rules: {
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' },
        ],
      },
    }
  },
  mounted(){
    this.getList(this.pageIndex,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
  },
  methods:{
    resetForm(){
      this.formInline.pro_id = null;
      this.formInline.pro_title = null;
      this.formInline.pro_state = null;
    },
    toAdd(){
      this.$router.push({ path: 'proAdd'})
    },
    toEdit(row){
      console.log(row.id)
      sessionStorage.setItem('id',row.id);
//    this.$router.push({ path: 'proEdit',query:{id:row.id}})
      this.$router.push({ path: 'proEdit' })
    },
    toParam(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proParameter'})
    },
    toSample(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proSample'})
    },
    toSampleRecord(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'sampleRecord'})
    },
    toStat(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proStatistics'})
    },
    toIntegration(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proIntegration'})
    },
    onSubmit() {
      console.log('submit!');
    },
    getList(pageIndex,pageSize,id,projectName,projectState){
      this.axios.get(this.common.getApi() + '/sys/api/project/getList',{
        params:{
          pageIndex: pageIndex,
          pageSize: pageSize,
          params:{
            id: id,
            projectName: projectName,
            projectState: projectState
          }
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.tableData3 = res.data.obj.list;
        for(var i = 0;i < this.tableData3.length;i++){
          if(this.tableData3[i].projectState == 0){
            this.tableData3[i].projectState = '正在进行'
          }else if(this.tableData3[i].projectState == 1){
            this.tableData3[i].projectState = '已完成'
          }else if(this.tableData3[i].projectState == 2){
            this.tableData3[i].projectState = '等待积分处理'
          }else if(this.tableData3[i].projectState == 3){
            this.tableData3[i].projectState = '暂停'
          }else if(this.tableData3[i].projectState == 5){
            this.tableData3[i].projectState = '尚未开始'
          }else if(this.tableData3[i].projectState == 6){
            this.tableData3[i].projectState = '项目撤销'
          }
        }
        this.pageTotal = res.data.obj.pager.total;
        console.log(this.pageTotal);
      })
    },
    go(currentPage){
      this.getList(currentPage,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
    },
    querylist(){
      this.getList(this.pageIndex,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
    },
    showdialog(row){
      this.dialogVisible = true;
      this.editform.id = row.id;
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            url:this.common.getApi() + '/sys/api/project/downloadSample',
            method:'get',
            params: {
              id: Number(this.editform.id),
              type: Number(this.editform.type)
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            const fileName = '项目导出.csv'
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          })
        }
      })
    },    
    downloadSample(){
//    this.axios({
//      url:this.common.getApi() + '/sys/api/member/downloadMember',
//      method:'get',
//      params: {
//        id: this.editform.id,
//        type: this.editform.type
//      },
//      responseType: 'blob',
//    }).then((res) => {
//      let data = res.data
//      const blob = data
//      const fileName = '会员信息.csv'
//      const elink = document.createElement('a')
//      elink.download = fileName
//      elink.style.display = 'none'
//      elink.href = URL.createObjectURL(blob)
//      document.body.appendChild(elink)
//      elink.click()
//      URL.revokeObjectURL(elink.href) // 释放URL 对象
//      document.body.removeChild(elink)
//    })      
    }
  }
}
</script>

<style>
  .proManage-wrapper .query-wrapper{
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  
  .proManage-wrapper .el-button+.el-button {
     margin-left: 0px; 
  }
  
  .proManage-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>