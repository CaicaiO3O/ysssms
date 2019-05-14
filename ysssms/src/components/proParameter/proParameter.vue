<template>
  <div class="proParameter-wrapper">
    <el-form ref="form" :model="form" label-width="170px" size="mini" label-position="left">
      <el-form-item label="文件格式">
        TXT格式-参数随机
      </el-form-item>
      <el-form-item label="项目id">
        <el-input v-model="form.pro_id" class="inputlength" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.pro_name" class="inputlength" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目参数文本">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="123"
          :auto-upload=false
          :before-upload="beforeUpload"
          :on-change="newhandleChange"
          :on-success="newhandlesuccess"
          :on-exceed="handleExceed"
          :limit="1"
          accept=".csv">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="download">下载参数文本</el-button>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <el-select v-model="form.choose_param">
            <el-option label="删除未使用的参数" value="0"></el-option>
            <el-option label="删除使用过的参数" value="1"></el-option>
            <el-option label="删除所有的参数" value="2"></el-option>
          </el-select>
        </template>
        <el-button type="primary" @click="deleteParam">删除</el-button>
      </el-form-item>      
    </el-form>    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          pro_id: '',
          pro_name: '',
          choose_param: null,
        },
        fileList:[],
        fileParam:'',
        uploadForm: new FormData(),
      }
    },
    mounted(){
      this.getProject();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload(file){
        
      },
      newhandlesuccess(file){
        console.log(file);
      },
      newhandleChange(response,file,filelist){
        this.fileParam = file;
        console.log(this.fileParam);
      },
      submitUpload(){
        console.log(this.fileParam);
        console.log(sessionStorage.getItem('id'));
        this.uploadForm.append('file', this.fileParam[0].raw);
        this.uploadForm.append('id', sessionStorage.getItem('id'));
        console.log(this.uploadForm.get('file'));
        console.log(this.uploadForm.get('id'));
        this.axios.post(this.common.getApi() + '/sys/api/projectPara/uploadParam',this.uploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success){
            this.$message({
              message: '上传成功',
              type: 'success'
            });
          }else{
            this.$message.error(res.data.msg);
            this.fileList = [];
            this.fileParam = '';
            this.uploadForm = new FormData()
          }
        })
      },
      deleteParam(){
        this.axios.get(this.common.getApi() + '/sys/api/projectPara/deletePara',{
          params:{
            params:{
              id: Number(sessionStorage.getItem("id")),
              state: this.form.choose_param
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      download(){
        location.href = this.common.getApi() + "/sys/api/projectPara/downloadParam";
      },
      getProject(){
        this.axios.get(this.common.getApi() + '/sys/api/project/getProject',{
          params: {
            params:{
              id: Number(sessionStorage.getItem("id"))
//            id: Number(this.$route.query.id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.form.pro_id = res.data.obj.projectId;
            this.form.pro_name = res.data.obj.projectName;            
          }else{
            this.$message.error(res.data.msg);
          }
        })
      }, 
    }
  }
</script>

<style>
  .proParameter-wrapper .inputlength{
    width: 200px;
  }
  
  .proParameter-wrapper .upload-demo{
    width: 30%;
  }
</style>