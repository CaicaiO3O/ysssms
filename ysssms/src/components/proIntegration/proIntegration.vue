<template>
  <div class="proIntegration-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i><span>项目积分信息文本上传</span>
    </div>
    
    <el-form :model="integrationForm" ref="integrationForm" label-width="100px" size="mini">
      <el-form-item label="项目ID " prop="pro_id">
        <el-input v-model="integrationForm.pro_id" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目编号 " prop="pro_num">
        <el-input v-model="integrationForm.pro_num" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目名称 " prop="pro_name">
        <el-input v-model="integrationForm.pro_name" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目积分文本">
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
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" @click="submitUpload">上传积分文本并加分</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="download">下载积分文本</el-button>
      </el-form-item>      
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        integrationForm: {
          pro_id: '222222',
          pro_num: 'sadasdsad',
          pro_name: 'sdasd',
          add_type: '',
        },
        fileList:[],
        fileParam:'',
        uploadForm: new FormData(),
      };
    },
    mounted(){
      this.getProject();
    },
    methods:{
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
        this.uploadForm.append('projectId', sessionStorage.getItem('id'));
        console.log(this.uploadForm.get('file'));
        console.log(this.uploadForm.get('id'));
        this.axios.post(this.common.getApi() + '/sys/api/projectIntegral/uploadIntegral',this.uploadForm,{
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
      getProject(){
        this.axios.get(this.common.getApi() + '/sys/api/project/getProject',{
          params: {
            params:{
              id: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.integrationForm.pro_id = res.data.obj.id;
            this.integrationForm.pro_name = res.data.obj.projectName;      
            this.integrationForm.pro_num = res.data.obj.projectId;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },       
      download(){
        location.href = this.common.getApi() + "/sys/api/projectIntegral/downloadProjectIntegral?projectId="+Number(sessionStorage.getItem("id"));
      },      
    }
  }
</script>

<style>
  .proIntegration-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .proIntegration-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .proIntegration-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }  
  
  .proIntegration-wrapper .inputlength{
    width: 200px;
  }
</style>