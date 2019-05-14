<template>
  <div class="pro-wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" size="mini" :inline-message='true'>
      <el-form-item label="调查类别" prop="type">
        <el-select v-model="ruleForm.type" class="inputlength">
          <el-option :value="item.id" :label="item.sysname" v-for="item in typeSelect" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目id" prop="pro_id">
        <el-input v-model.number="ruleForm.pro_id" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目编号" prop="pro_num">
        <el-input v-model="ruleForm.pro_num" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目标题" prop="pro_title">
        <el-input v-model="ruleForm.pro_title" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="ruleForm.name" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="加分类别" prop="add_type">
        <el-select v-model="ruleForm.add_type" class="inputlength">
          <el-option label="统一加分" value="0"></el-option>
          <el-option label="即时加分" value="1"></el-option>
        </el-select>
      </el-form-item>    
      <el-form-item label="记录人" prop="jlr_name">
        <el-input v-model="ruleForm.jlr_name" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="完成奖励" required>
        <el-col :span="5">
          <el-form-item prop="jf_value" style="margin-bottom: 0;">
            <el-input v-model.number="ruleForm.jf_value" class="inputlength"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="ruleForm.add_type == 1">
          <el-form-item label="S加分" prop="s_value" style="margin-bottom: 0;">
            <el-input v-model.number="ruleForm.s_value" class=""></el-input>
          </el-form-item>
        </el-col>        
        <el-col :span="4" v-if="ruleForm.add_type == 1">
          <el-form-item label="Q加分" prop="q_value" style="margin-bottom: 0;">
            <el-input v-model.number="ruleForm.q_value" class=""></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="发布时间" prop="start_date">
        <el-date-picker
          v-model="ruleForm.start_date"
          type="date"
          class="inputlength"
          value-format="yyyy-MM-dd">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="结束时间" prop="end_date">
        <el-date-picker
          v-model="ruleForm.end_date"
          type="date"
          class="inputlength"
          value-format="yyyy-MM-dd">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="样本数" prop="ybs">
        <el-input v-model.number="ruleForm.ybs" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item prop="add_jf">
        <template slot="label">
          <el-checkbox v-model="checked" style="margin-right: 5px;" @change="ischecked"></el-checkbox>被推荐者是否有加分
        </template>
        <el-input v-model.number="ruleForm.add_jf" type="number" class="inputlength" :disabled="checked == false"></el-input>
      </el-form-item>      
      <el-form-item label="返回参数hdopid" prop="hdopid">
        <el-input v-model="ruleForm.hdopid" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="问卷时长" prop="time">
        <el-input v-model.number="ruleForm.time" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="欢迎词" prop="welcome_txt">
        <quill-editor ref="myTextEditor" v-model="ruleForm.welcome_txt"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="isload">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>    
  </div>
</template>

<script>
  export default {
    data() {
      var validateaddjf = (rule, value, callback) => {
        if (value === '' && this.checked != false) {
          callback(new Error('请输入加分数值'));
        } else {
          callback();
        }
      };      
      return {
        isload:false,
        ruleForm: {
          type: '',//调查类别
          pro_id: '',//项目id
          pro_num: '',//项目编号
          pro_title: '',//项目标题
          name: '',//客户名称
          add_type: '',//加分类别
          jlr_name: '',//记录人
          jf_value: '',//完成奖励
          s_value: '',//s加分
          q_value: '',//q加分
          start_date: '',//发布时间
          end_date: '',//结束时间
          ybs: '',//样本数
          hdopid:'',//hdopid
          time: '',//问卷时长
          add_jf:'',//加分
          welcome_txt:''
        },
        typeSelect: [

        ],
        checked:false,//
        is_disabled:true,
        rules: {
          type: [
            { required: true, message: '请选择调查类别', trigger: 'change' }
          ],
          pro_id:[
            { required: true, message: '请输入项目id', trigger: 'blur' },
            { type: 'number', message: '完成奖励必须为数字值'}
          ],
          pro_num:[
            { required: true, message: '请输入项目编号', trigger: 'blur' },
          ],
          pro_title:[
            { required: true, message: '请输入项目标题', trigger: 'blur' },
          ],
          name:[
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ],
          add_type: [
            { required: true, message: '请选择加分类别', trigger: 'change' }
          ],
          jlr_name:[
            { required: true, message: '请输入记录人', trigger: 'blur' }
          ],
          jf_value:[
            { required: true, message: '请输入完成奖励', trigger: 'blur' },
            { type: 'number', message: '完成奖励必须为数字值'}
          ],
          s_value:[
            { required: true, message: '请输入S加分', trigger: 'blur' },
            { type: 'number', message: '完成奖励必须为数字值'}
          ],
          q_value:[
            { required: true, message: '请输入Q加分', trigger: 'blur' },
            { type: 'number', message: '完成奖励必须为数字值'}
          ],
          start_date:[
            { required: true, message: '请选择发布时间', trigger: 'change' }
          ],
          end_date:[
            { required: true, message: '请选择结束时间', trigger: 'change' }
          ],
          ybs: [
            { required: true, message: '请输入样本数', trigger: 'blur' },
            { type: 'number', message: '样本数必须为数字值'}
          ],
          hdopid:[
            { required: true, message: '请输入返回参数hdopid', trigger: 'blur' },
          ],
          time: [
            { required: true, message: '请输入问卷时长', trigger: 'blur' },
            { type: 'number', message: '问卷时长必须为数字值'}
          ],
          add_jf:[
            { validator: validateaddjf, trigger: 'change' },
          ],
        }
      };
    },
    computed: {
    },    
    mounted(){
      this.getPtype();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.isload = true;
          console.log(this.checked);
          var ischecked;
          if(this.checked){
            ischecked = 1
          }else{
            ischecked = 0
          }
          if (valid) {
            this.axios.post(this.common.getApi() + '/sys/api/project/add',{
              params:{
                ptype: Number(this.ruleForm.type),
                id: Number(this.ruleForm.pro_id),
                projectId: this.ruleForm.pro_num,
                projectName: this.ruleForm.pro_title,
                customer: this.ruleForm.name,
                projecttype: Number(this.ruleForm.add_type),
                projectPerson: this.ruleForm.jlr_name,
                projectIntegral: Number(this.ruleForm.jf_value),
                qreward: Number(this.ruleForm.q_value),
                sreward: Number(this.ruleForm.s_value),
                projectPutTime: this.ruleForm.start_date,
                projectEndTime: this.ruleForm.end_date,
                projectSampleTotal: Number(this.ruleForm.ybs),
                recompointflg: ischecked,
                recompointnum: Number(this.ruleForm.add_jf),
                hdopid: this.ruleForm.hdopid,
                surveylenth: Number(this.ruleForm.time),
                welcomecontent: this.ruleForm.welcome_txt
              }
            }).then((res) => {
              this.isload = false;
              if(res.data.success){
                this.$message({
                  message:'提交成功',
                  type:'success'
                })
                this.$refs[formName].resetFields();
                this.checked = false;
              }else{
                this.$message.error(res.data.msg);
              }
            })               
            
          } else {
            console.log('error submit!!');
            this.isload = false;
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ischecked(){
        this.ruleForm.add_jf = "";
      },
      //1. 获取项目类型
      getPtype(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getPtype','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.typeSelect = res.data.obj;
          console.log(this.typeSelect);
        })        
      },
    }
  }
</script>

<style>
  .pro-wrapper .inputlength{
    width: 200px;
  }
  
  .pro-wrapper .el-form-item--mini .el-form-item__content{
    /*display: flex;*/
    
  }
  
  .pro-wrapper .quill-editor{
    width: 70%;
  }
  
  .pro-wrapper .quill-editor .ql-container{
    height: 200px;
  }
</style>