<template>
  <div class="proStatistics-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i><span>项目进度</span>
    </div>
    
    <div class="statistics-content">
      <div class="head">
        会员回复统计
      </div>
      <div class="list">
        <span>参与人数：</span>
        <span>{{projectJoinNum}}</span>
      </div>
      <div class="list">
        <span>邮件参与：</span>
        <span>{{mailJoinNum}}</span>
      </div>
      <div class="list">
        <span>回复率：</span>
        <span>{{responseRate}}</span>
      </div>
      <div class="list">
        <span>渗透率：<br>C / ( C + S )</span>
        <span>{{permeability}}</span>
      </div>
      <div class="list">
        <span>难易度：<br>C / ( C + S + Q )</span>
        <span>{{facilityValue}}</span>
      </div>
      <div class="list">
        <span>丢失率：</span>
        <span>{{lossRate}}</span>
      </div>
      <div class="list">
        <span>S状态：</span>
        <span>{{sNum}}</span>
      </div>
      <div class="list">
        <span>Q状态：</span>
        <span>{{qNum}}</span>
      </div>
      <div class="list">
        <span>C状态：</span>
        <span>{{cNum}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        projectJoinNum:'',
        mailJoinNum:'',
        responseRate:'',
        permeability:'',
        facilityValue:'',
        lossRate:'',
        sNum:'',
        qNum:'',
        cNum:''
      }
    },
    mounted(){
      this.getProjectProgress();
    },
    methods:{
      getProjectProgress(index, rows){
        this.axios.get(this.common.getApi() + '/sys/api/project/getProjectProgress',{
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
          if(res.data.success){
            this.projectJoinNum = res.data.obj.projectJoinNum;
            this.mailJoinNum = res.data.obj.projectJoinNum;
            this.responseRate = res.data.obj.projectJoinNum;
            this.permeability = res.data.obj.projectJoinNum;
            this.facilityValue = res.data.obj.projectJoinNum;
            this.lossRate = res.data.obj.projectJoinNum;
            this.sNum = res.data.obj.projectJoinNum;
            this.qNum = res.data.obj.projectJoinNum;
            this.cNum = res.data.obj.projectJoinNum;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
    }
  }  
</script>

<style>
  .proStatistics-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .proStatistics-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .proStatistics-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }  
  
  .proStatistics-wrapper .inputlength{
    width: 200px;
  }  
  
  .proStatistics-wrapper .statistics-content{
    width: 60%;
    margin: 0 auto;
  }
  
  .proStatistics-wrapper .statistics-content .head{
    text-align: center;
    font-weight: bold;
    line-height: 48px;
    font-size: 20px;
    border-bottom: 2px solid #98ACD5;
  }
  
  .proStatistics-wrapper .statistics-content .list{
/*    min-height: 50px;*/
    border-bottom: 1px dashed #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px;
  }
  
  .proStatistics-wrapper .statistics-content .list span{
    text-align: center;
    width: 50%;
  }
  
  .proStatistics-wrapper .statistics-content .list span:nth-child(1){
    margin-right: 20%;
    text-align: right;
  }
  
  .proStatistics-wrapper .statistics-content .list span:nth-child(2){
    text-align: left;
  }  
</style>