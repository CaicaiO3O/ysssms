<template>
  <div class="proSample-wrapper">
    <div class="title">
      已定义项目抽样条件列表（当前项目参数使用量：{{hasSampleCount}}/{{total}}）
      <el-button type="primary" size="mini" @click="toaddParam">添加抽样条件</el-button>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData3"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>        
        <el-table-column
          prop="sampleName"
          label="条件名称"
          width="90">
        </el-table-column>
        <el-table-column
          prop="sampleContent"
          label="条件定义"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click='deleteParam(scope.$index, tableData3)'>删除</el-button>
          </template>
        </el-table-column>        
      </el-table>
    </div>
    <div class="title">
      项目抽样
    </div>
    <el-form ref="form" label-width="150px">
      <el-form-item label="抽样时间：">
        <el-date-picker
          v-model="time_range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="margin-right: 8px">
        </el-date-picker>
        <el-radio v-model="isjoin_radio" label="0">未被抽样过的会员</el-radio>
        <el-radio v-model="isjoin_radio" label="1">被抽样过的会员</el-radio>
        <span class="error" style="color: red;" v-if="is_choose_join">请选择条件</span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="in_checked">指定项目ID：</el-checkbox>
        <el-input v-model="inid_input" placeholder="多个项目使用“,”分隔" style="width: 228px;margin-right: 10px;"></el-input>
        <el-radio v-model="in_radio" label="0">未参与指定项目</el-radio>
        <el-radio v-model="in_radio" label="1">已参与指定项目</el-radio>
        <el-checkbox-group v-model="in_checkList" style="padding-left: 518px;" v-if="in_radio == 1">
          <el-checkbox v-for="(item,index) in state_options" :label="item.name" :key="item.value" @change="getInType(item,index)"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="not_checked">排他项目ID：</el-checkbox>
        <el-input v-model="notid_input" placeholder="多个项目使用“,”分隔" style="width: 228px;margin-right: 10px;"></el-input>
        <el-radio v-model="not_radio" label="0">未参与指定项目</el-radio>
        <el-radio v-model="not_radio" label="1">已参与指定项目</el-radio>
        <el-checkbox-group v-model="not_checkList" style="padding-left: 518px;" v-if="not_radio == 1">
          <el-checkbox v-for="(item,index) in state_options" :label="item.name" :key="item.value" @change="getNotType(item,index)"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getSampleTotal" :loading="isload1">检索可抽样人数</el-button>
        <span v-if="isshownum">可抽样人数{{sampleNumber}}人</span>
      </el-form-item>
      <el-form-item label="本次可抽样人数：">
        <el-input v-model="can_sample" style="width: 228px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSampleQuestion" :loading="isload2">对选中条件开始抽样</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isload1: false,
        isload2: false,
        tableData3: [],
        multipleSelection: [],
        hasSampleCount:0,//已抽样数量
        total: 0,//目标样本总数
        time_range:'',
        in_checked: false,
        not_checked: false,
        inid_input:'',
        notid_input:'',
        in_radio:'',
        not_radio: '',
        in_checkList:[],
        not_checkList:[],
        can_sample:'',
        isjoin_radio: '',
        is_choose_join:false,
        questionIdList:[],
        sampleTimeEntity:null,
        memberProjectIdNot:null,
        memberProjectIdIn:null,
        
        state_options:[
          {name:"S状态", value: 1},
          {name:"Q状态", value: 2},
          {name:"C状态", value: 3},
          {name:"未返回状态", value: 0}
        ],
        in_state_list:[],
        not_state_list:[],
        sampleNumber:'',
        isshownum:false
      }
    },
    mounted(){
      this.getSampleQuestionList();
      this.getSampleCount();
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        this.questionIdList = [];
        for(var i = 0; i < this.multipleSelection.length; i++){
          this.questionIdList.push(this.multipleSelection[i].id);
        }
        console.log(this.questionIdList);
      },
      toaddParam(){
        this.$router.push({ path: 'addParam'})
      },
      getInType(){
        this.in_state_list = [];
        for(var i = 0; i < this.in_checkList.length; i++){
          if(this.in_checkList[i] == 'S状态'){
            this.in_state_list.push(1);
          }else if(this.in_checkList[i] == 'Q状态'){
            this.in_state_list.push(2);
          }else if(this.in_checkList[i] == 'C状态'){
            this.in_state_list.push(3);
          }else{
            this.in_state_list.push(0);
          }
        }
      },
      getNotType(){
        this.not_state_list = [];
        for(var i = 0; i < this.not_checkList.length; i++){
          if(this.not_checkList[i] == 'S状态'){
            this.not_state_list.push(1);
          }else if(this.not_checkList[i] == 'Q状态'){
            this.not_state_list.push(2);
          }else if(this.not_checkList[i] == 'C状态'){
            this.not_state_list.push(3);
          }else{
            this.not_state_list.push(0);
          }
        }
        console.log(this.not_state_list);
      },
      //对选中条件开始抽样
      doSampleQuestion(){
        this.isload2 = true;
        if(this.time_range){
          if(this.isjoin_radio){
            this.is_choose_join = false;
            this.sampleTimeEntity = {
              StartDate: this.time_range[0],
              endDate: this.time_range[1],
              type: this.isjoin_radio
            }            
          }else{
            this.is_choose_join = true;
          }
        }
        if(this.in_checked){
          if(this.inid_input){//
            var b = this.inid_input.split(",");
            var c = [];
            for(var i=0;i<b.length;i++){
              c.push(Number(b[i]))
            }
            console.log(this.in_radio);
            if(this.in_radio == ""){
              this.$message.error("请选择是否参与过指定项目");
            }else if(this.in_radio == 0){
              this.memberProjectIdIn = {
                projectId: c,
                joinType: Number(this.in_radio)
              }
            }else if(this.in_radio == 1){
              if(this.in_checkList.length != 0){
                this.memberProjectIdIn = {
                  projectId: c,
                  joinType: Number(this.in_radio),
                  returnType: this.in_state_list
                }
              }else{
                this.$message.error("请选择参与项目状态");
              }
            }
          }else{
            this.$message.error("请填写指定项目ID");
          }
          console.log(this.memberProjectIdIn);
        }else{
          this.memberProjectIdIn = null;
        }
        if(this.not_checked){
          if(this.notid_input){//
            var b = this.notid_input.split(",");
            var c = [];
            for(var i=0;i<b.length;i++){
              c.push(Number(b[i]))
            }
            console.log(this.not_radio);
            if(this.not_radio == ""){
              this.$message.error("请选择是否参与过指定项目");
            }else if(this.not_radio == 0){
              this.memberProjectIdNot = {
                projectId: c,
                joinType: Number(this.not_radio)
              }
            }else if(this.not_radio == 1){
              if(this.not_checkList.length != 0){
                this.memberProjectIdNot = {
                  projectId: c,
                  joinType: Number(this.not_radio),
                  returnType: this.not_state_list
                }
              }else{
                this.$message.error("请选择参与项目状态");
              }
            }
          }else{
            this.$message.error("请填写排他项目ID");
          }
          console.log(this.memberProjectIdNot);
        }else{
          this.memberProjectIdNot = null;
        }
        this.axios.post(this.common.getApi() + '/sys/api/projectSample/doSampleQuestion',{
          params:{
            questionIdList:this.questionIdList,
            sampleTimeEntity: this.sampleTimeEntity,
            memberProjectIdNot: this.memberProjectIdNot,
            memberProjectIdIn: this.memberProjectIdIn,
            projectId: Number(sessionStorage.getItem("id")),
            sampleNumber: Number(this.can_sample)
          }
        }).then((res) => {
          this.isload2 = false;
          if(res.data.success){
            this.$message({
              type: 'success',
              message: '抽样成功'
            })
          }else{
            this.$message.error(res.data.msg);
          }
        })                
      },
      //检索可抽样人数
      getSampleTotal(){
        this.isload1 = true;
        if(this.time_range){
          if(this.isjoin_radio){
            this.is_choose_join = false;
            this.sampleTimeEntity = {
              StartDate: this.time_range[0],
              endDate: this.time_range[1],
              type: this.isjoin_radio
            }            
          }else{
            this.is_choose_join = true;
          }
        }
        if(this.in_checked){
          if(this.inid_input){//
            var b = this.inid_input.split(",");
            var c = [];
            console.log(b);
            
            for(var i=0;i<b.length;i++){
              c.push(Number(b[i]))
            }
            if(this.in_radio == ""){
              this.$message.error("请选择是否参与过指定项目");
            }else if(this.in_radio == 0){
              this.memberProjectIdIn = {
                projectId: c,
                joinType: Number(this.in_radio)
              }
            }else if(this.in_radio == 1){
              if(this.in_checkList.length != 0){
                this.memberProjectIdIn = {
                  projectId: c,
                  joinType: Number(this.in_radio),
                  returnType: this.in_state_list
                }
              }else{
                this.$message.error("请选择参与项目状态");
              }
            }
          }else{
            this.$message.error("请填写指定项目ID");
          }
          console.log(this.memberProjectIdIn);
        }else{
          this.memberProjectIdIn = null;
        }
        if(this.not_checked){
          if(this.notid_input){//
            var b = this.notid_input.split(",");
            var c = [];
            for(var i=0;i<b.length;i++){
              c.push(Number(b[i]))
            }
            console.log(this.not_radio);
            if(this.not_radio == ""){
              this.$message.error("请选择是否参与过指定项目");
            }else if(this.not_radio == 0){
              this.memberProjectIdNot = {
                projectId: c,
                joinType: Number(this.not_radio)
              }
            }else if(this.not_radio == 1){
              if(this.not_checkList.length != 0){
                this.memberProjectIdNot = {
                  projectId: c,
                  joinType: Number(this.not_radio),
                  returnType: this.not_state_list
                }
              }else{
                this.$message.error("请选择参与项目状态");
              }
            }
          }else{
            this.$message.error("请填写排他项目ID");
          }
          console.log(this.memberProjectIdNot);
        }else{
          this.memberProjectIdNot = null;
        }
        this.axios.post(this.common.getApi() + '/sys/api/projectSample/countSampleQuestion',{
          params:{
            questionIdList:this.questionIdList,
            sampleTimeEntity: this.sampleTimeEntity,
            memberProjectIdNot: this.memberProjectIdNot,
            memberProjectIdIn: this.memberProjectIdIn,
            projectId: Number(sessionStorage.getItem("id"))
          }
        }).then((res) => {
          this.isload1 = false;
          if(res.data.success){
            this.sampleNumber = res.data.obj;
            this.isshownum = true;
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      deleteParam(index, rows){
        this.axios.get(this.common.getApi() + '/sys/api/projectQuestion/deleteSampleQuestion',{
          params:{
            params:{
              id: Number(rows[index].id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.$message({
              message: '删除条件成功',
              type: 'success'
            });
            this.getSampleQuestionList();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      getSampleQuestionList(){
        this.axios.get(this.common.getApi() + '/sys/api/projectQuestion/getSampleQuestionList',{
          params:{
            params:{
              id: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.tableData3 = res.data.obj;
        })
      },
      getSampleCount(){
        this.axios.get(this.common.getApi() + '/sys/api/projectSample/getSampleCount',{
          params:{
            params:{
              projectId: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res);
          if(res.data.success){
            this.hasSampleCount = res.data.obj.hasSampleCount;
            this.total = res.data.obj.total;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
    }
  }  
</script>

<style>
  .proSample-wrapper .title{
    width: 100%;
    padding: 15px 20px;
    box-sizing: border-box;
    background: #E9EEF3;
    border-radius: 13px;
    font-size: 14px;
  }
  
  .proSample-wrapper .table-wrapper{
    margin-top: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .proSample-wrapper .el-table{
    width: 66%;
    margin: 0 auto;
  }
  
  .proSample-wrapper .el-form{
    margin-top: 20px;
  }
  
  .proSample-wrapper .el-checkbox {
    margin-right: 8px;
  }
</style>