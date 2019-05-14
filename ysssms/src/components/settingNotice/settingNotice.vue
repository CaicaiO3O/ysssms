<template>
  <div class="settingNotice-wrapper">
    <el-button type="primary" @click="adddialogVisible = true" style="margin-bottom: 20px;">增加</el-button>
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
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="内容">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>      
      <el-table-column
        prop="click"
        label="点击次数">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="showSureDialog(scope.row)">删除</el-button>
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
    
    <el-dialog
      title="新增网站公告"
      :visible.sync="adddialogVisible"
      width="50%"
      center>
      <div>
        <el-form label-width="120px" ref="addform" :model="addform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="公告名称： " prop="title">
            <el-input v-model="addform.title"></el-input>
          </el-form-item>
          <el-form-item label="公告内容：" prop="content">
            <quill-editor ref="myTextEditor" v-model="addform.content"></quill-editor>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm('addform')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑网站公告"
      :visible.sync="editdialogVisible"
      width="50%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="公告名称： " prop="title">
            <el-input v-model="editform.title"></el-input>
          </el-form-item>
          <el-form-item label="公告内容：" prop="content">
            <quill-editor ref="myTextEditor" v-model="editform.content"></quill-editor>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm('editform')">保存</el-button>
      </span>
    </el-dialog>    
    <el-dialog
      title="提示"
      :visible.sync="suredialogVisible"
      width="30%">
      <span>是否确认删除此条记录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="suredialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
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
        suredialogVisible: false,
        noticeId:null,
        fileList:[],
        addform:{
          title:null,
          content:null
        },
        editform:{
          title:null,
          content:null,
          id:null
        },
        tableData: [],
        uploadForm: new FormData(),
        rules: {
          title: [
            { required: true, message: '请填写公告名称', trigger: 'blur' },
          ],
          content:[
            { required: true, message: '请填写公告内容', trigger: 'blur' },
          ],
        },
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        baseurl:null,
      }
    },
    mounted(){
      this.getMessageList(this.pageIndex,this.pageSize);
    },
    methods: {
      showSureDialog(row){
        this.noticeId = row.id;
        this.suredialogVisible = true;
      },      
      editshow(row){
        this.axios.get(this.common.getApi() + '/sys/api/message/getMessage',{
          params:{
            params:{
              id: row.id
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.editform.title = res.data.obj.title;
            this.editform.content = res.data.obj.content;
            this.editdialogVisible = true;
            this.editform.id = row.id;
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      submitForm(formName){
        if(formName == "addform"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post(this.common.getApi() + '/sys/api/message/addMessage',{
                params:{
                  title: this.addform.title,
                  content: this.addform.content
                }
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  })
                  this.adddialogVisible = false;
                  this.getMessageList(this.pageIndex,this.pageSize);
                }else{
                  this.$message.error(res.data.msg)
                }
              })              
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else if(formName == "editform"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post(this.common.getApi() + '/sys/api/message/editMessage',{
                params:{
                  id: this.editform.id,
                  title: this.editform.title,
                  content: this.editform.content
                }
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.editdialogVisible = false;
                  this.getMessageList(this.pageIndex,this.pageSize);
                }else{
                  this.$message.error(res.data.msg)
                }
              })                  
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });          
        }        
      },
      getMessageList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/message/getMessageList',{
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
//        for(var i = 0; i < this.tableData.length; i++){
//          if(this.tableData[i].bannerType == 0){
//            this.tableData[i].skipUrl = '/'
//          }
//        }
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
        this.getMessageList(currentPage,this.pageSize);
      },
      del(){
        this.axios.get(this.common.getApi() + '/sys/api/message/delMessage',{
          params:{
            params:{
              id: this.noticeId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getMessageList(this.pageIndex,this.pageSize)
            this.suredialogVisible = false;
          }else{
            this.$message.error(res.data.msg);
          }
        })            
      },      
    }    
  }      
</script>

<style>
  .settingNotice-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }    
</style>