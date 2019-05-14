<template>
  <div class="settingQuestion-wrapper">
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
        prop="ruleName"
        label="规则名称">
      </el-table-column>

      <el-table-column
        label="规则说明">
        <template slot-scope="scope">
          <div v-html="scope.row.ruleExplain"></div>
        </template>
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
      title="新增兑换规则"
      :visible.sync="adddialogVisible"
      width="50%"
      center>
      <div>
        <el-form label-width="120px" ref="addform" :model="addform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="规则名称： " prop="ruleName">
            <el-input v-model="addform.ruleName"></el-input>
          </el-form-item>
          <el-form-item label="规则说明：" prop="ruleExplain">
            <quill-editor ref="myTextEditor" v-model="addform.ruleExplain"></quill-editor>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm('addform')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑兑换工作"
      :visible.sync="editdialogVisible"
      width="50%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="规则名称： " prop="ruleName">
            <el-input v-model="editform.ruleName"></el-input>
          </el-form-item>
          <el-form-item label="规则说明：" prop="ruleExplain">
            <quill-editor ref="myTextEditor" v-model="editform.ruleExplain"></quill-editor>
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
        suredialogVisible:false,
        ruleId: null,
        fileList:[],
        addform:{
          ruleName:null,
          ruleExplain:null
        },
        editform:{
          ruleName:null,
          ruleExplain:null,
          id:null
        },
        tableData: [],
        uploadForm: new FormData(),
        rules: {
          ruleName: [
            { required: true, message: '请填写规则名称', trigger: 'blur' },
          ],
          ruleExplain:[
            { required: true, message: '请填写规则说明', trigger: 'blur' },
          ],
        },
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        baseurl:null,
      }
    },
    mounted(){
      this.getExchangeRuleList(this.pageIndex,this.pageSize);
    },
    methods: {
      showSureDialog(row){
        this.ruleId = row.id;
        this.suredialogVisible = true;
      },
      editshow(row){
        this.axios.get(this.common.getApi() + '/sys/api/rule/getExchangeRule',{
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
            this.editform.ruleName = res.data.obj.ruleName;
            this.editform.ruleExplain = res.data.obj.ruleExplain;
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
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.axios.post(this.common.getApi() + '/sys/api/rule/addExchangeRule',{
                    params:{
                      ruleName: this.addform.ruleName,
                      ruleExplain: this.addform.ruleExplain
                    }
                  }).then((res) => {
                    if(res.data.success){
                      this.$message({
                        type: 'success',
                        message: '添加成功'
                      })
                      this.adddialogVisible = false;
                      this.getExchangeRuleList(this.pageIndex,this.pageSize);
                    }else{
                      this.$message.error(res.data.msg)
                    }
                  })              
                  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else if(formName == "editform"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.axios.post(this.common.getApi() + '/sys/api/rule/editExchangeRule',{
                    params:{
                      id: this.editform.id,
                      ruleName: this.editform.ruleName,
                      ruleExplain: this.editform.ruleExplain
                    }
                  }).then((res) => {
                    if(res.data.success){
                      this.$message({
                        type: 'success',
                        message: '修改成功'
                      })
                      this.editdialogVisible = false;
                      this.getExchangeRuleList(this.pageIndex,this.pageSize);
                    }else{
                      this.$message.error(res.data.msg)
                    }
                  })              
                  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });              
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });          
        }        
      },
      getExchangeRuleList(pageIndex,pageSize){
        this.axios.get(this.common.getApi() + '/sys/api/rule/getExchangeRuleList',{
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
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
        this.getExchangeRuleList(currentPage,this.pageSize);
      },
      del(row){
        this.axios.get(this.common.getApi() + '/sys/api/rule/delExchangeRule',{
          params:{
            params:{
              id: this.ruleId
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
            this.getExchangeRuleList(this.pageIndex,this.pageSize);
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
  .settingQuestion-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }    
</style>