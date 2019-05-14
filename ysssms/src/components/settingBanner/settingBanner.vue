<template>
  <div class="settingBanner-wrapper">
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
          <img :src="baseurl + scope.row.picUrl" alt="" width="100%"/>
        </template>
      </el-table-column> 
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <!--<el-button type="text" size="small" @click="del(scope.row)">删除</el-button>-->
          <el-button type="text" size="small" @click="showSureDialog(scope.row)">删除</el-button>
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
    <el-dialog
      title="添加banner"
      :visible.sync="adddialogVisible"
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="addform" :model="addform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="banner名称： " prop="name">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="banner类型： " prop="bannerType">
            <el-radio-group v-model="addform.bannerType">
              <el-radio :label="0">仅展示</el-radio>
              <el-radio :label="1">跳转</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="链接：" prop="link" v-if="addform.bannerType == 1">
            <el-input v-model="addform.link">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-form-item>
          <el-form-item label="图片：" required>
            <el-upload
              class="upload-demo"
              ref="upload1"
              action="123"
              :auto-upload=false
              :before-upload="beforeUpload1"
              :on-change="newhandleChange1"
              :on-success="newhandlesuccess1"
              :on-exceed="handleExceed1"
              :limit="1"
              accept="image/jpeg,image/png" >
              <el-button size="small" type="primary">点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <!--<el-button @click="cancel('classform')">取消</el-button>-->
        <el-button type="primary" @click="submitForm('addform')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑banner"
      :visible.sync="editdialogVisible"
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="banner名称： " prop="name">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="banner类型： " prop="bannerType">
            <el-radio-group v-model="editform.bannerType">
              <el-radio :label="0">仅展示</el-radio>
              <el-radio :label="1">跳转</el-radio>
            </el-radio-group>
          </el-form-item>          
          <el-form-item label="链接： " prop="link" v-if="editform.bannerType == 1">
            <el-input v-model="editform.link">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-form-item>
          <el-form-item label="图片： " required>
            <el-upload
              class="upload-demo"
              ref="upload2"
              action="123"
              :auto-upload=false
              :before-upload="beforeUpload2"
              :on-change="newhandleChange2"
              :on-success="newhandlesuccess2"
              :on-exceed="handleExceed2"
              :limit="1"
              accept="image/jpeg,image/png" >
              <el-button size="small" type="primary">点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <!--<el-button @click="cancel('classform')">取消</el-button>-->
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
        tableData: [],
        adddialogVisible: false,
        editdialogVisible: false,
        suredialogVisible: false,
        bannerId: null,
        fileList:[],
        addform:{
          name:null,
          link:null,
          fileParam:null,
          filelist:[],
          bannerType:null,
        },
        editform:{
          id:null,
          name:null,
          link:null,
          fileParam:null,
          filelist:[],
          bannerType:null,
        },
        tableData: [],
        uploadForm: new FormData(),
        uploadForm1: new FormData(),
        rules: {
          name: [
            { required: true, message: '请填写banner名称', trigger: 'blur' },
          ],
          bannerType:[
          { required: true, message: '请选择banner类型', trigger: 'change' },
          ],
          link: [
            { required: true, message: '请填写链接', trigger: 'blur' },
          ],
        },
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        picUrl:null,
        baseurl: null
      }
    },
    mounted(){
      this.getBannerList(this.pageIndex,this.pageSize);
      this.baseurl = this.common.getBaseurl();
    },
    methods: {
      showSureDialog(row){
        this.bannerId = row.id;
        this.suredialogVisible = true;
      },
      editshow(row){
        this.axios.get(this.common.getApi() + '/sys/api/banner/getBanner',{
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
            this.editform.name = res.data.obj.bannerName;
            this.editform.bannerType = res.data.obj.bannerType;
            this.editform.link = this.editform.bannerType == 0 ? null: res.data.obj.skipUrl
            this.editdialogVisible = true;
            this.editform.id = row.id;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      submitForm(formName) {
        if(formName == "addform"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.addform.fileParam){
                this.uploadForm.append('file', this.addform.fileParam[0].raw);      
                this.uploadForm.append('bannerName', this.addform.name);
                this.uploadForm.append('bannerType', this.addform.bannerType);
                if(this.addform.link){
                  this.uploadForm.append('skipUrl', "http://"+this.addform.link);                  
                }
                this.axios.post(this.common.getApi() + '/sys/api/banner/addBanner',this.uploadForm,{
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then((res) => {
                  console.log(res)
                  if(res.data.success){
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                    this.uploadForm = new FormData()
                    this.adddialogVisible = false;
                    this.getBannerList(this.pageIndex,this.pageSize);
                  }else{
                    this.$message.error(res.data.msg);
                    this.fileList = [];
                    this.uploadForm = new FormData()
                  }
                })            
              }else{
                this.$message.error('请上传图片');
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else if(formName == "editform"){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.uploadForm1.append('id', this.editform.id);
              this.uploadForm1.append('bannerName', this.editform.name);
              this.uploadForm1.append('bannerType', this.editform.bannerType);
              this.editform.link = this.editform.bannerType == 0 ? null: this.editform.link
              if(this.editform.link){
                this.uploadForm1.append('skipUrl', "http://"+this.editform.link);                  
              }
              if(this.editform.fileParam){
                this.uploadForm1.append('file', this.editform.fileParam[0].raw);              
              }
              this.axios.post(this.common.getApi() + '/sys/api/banner/editBanner',this.uploadForm1,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then((res) => {
                console.log(res)
                if(res.data.success){
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.uploadForm1 = new FormData()
                  this.editdialogVisible = false;
                  this.getBannerList(this.pageIndex,this.pageSize);
                }else{
                  this.$message.error(res.data.msg);
                  this.editform.fileParam = '';
                  this.uploadForm1 = new FormData()
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });          
        }
      },
      move(row,type){
        this.axios.post(this.common.getApi() + '/sys/api/banner/orderBanner',{
          params:{
            id: Number(row.id),
            type: type
          }
        }).then((res) => {
          if(res.data.success){
            this.$message({
              message: '移动成功',
              type: 'success'
            });
            this.getBannerList(this.pageIndex,this.pageSize)
          }else{
            this.$message.error(res.data.msg);
          }
        })            
      },
      getBanner(){
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
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })           
      },
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
      del(){
        this.axios.get(this.common.getApi() + '/sys/api/banner/delBanner',{
          params:{
            params:{
              id: this.bannerId
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
            this.getBannerList(this.pageIndex,this.pageSize);
            this.suredialogVisible = false;
          }else{
            this.$message.error(res.data.msg);
          }
        })            
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload1(file){
        console.log(1)
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG || !isPNG) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M && isPNG;        
      },
      newhandlesuccess1(file){
        console.log(file);
      },
      newhandleChange1(response,file,filelist){
        this.addform.fileParam = file;
        console.log(this.addform.fileParam);
      },
      handleExceed2(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload2(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG || !isPNG) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M && isPNG;          
      },
      newhandlesuccess2(file){
        console.log(file);
      },
      newhandleChange2(response,file,filelist){
        this.editform.fileParam = file;
//      console.log(this.form.fileParam);
      },     
      go(currentPage){
        this.getBannerList(currentPage,this.pageSize);
      },      
    }    
  }  
</script>

<style>
  .settingBanner-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>