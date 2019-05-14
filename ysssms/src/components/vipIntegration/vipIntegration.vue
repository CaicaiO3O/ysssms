<template>
  <div class="vipIntegration-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i><span>积分文本上传</span>
    </div>
    <el-form ref="integrationForm" label-width="150px" size="mini">
      <el-form-item label="积分参数文本：">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="123"
          :limit="1"
          accept=".csv">
          <el-button size="small" type="success">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>            
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary">上传参数文本</el-button>
      </el-form-item>
    </el-form>
    <div class="intr-txt">
      <p>上传参数文本说明：上传的文本需是.txt文本格式的文件，上传的参数必须统一为会员数字ID或者会员手机号</p>
      <p>1.每个参数文本可包含N条参数，参数与参数之间用","（半角）分隔；</p>
      <p>2.每条参数应包含三种数据，会员ID（需要统一数字ID或者会员手机号）|积分数量|积分明细，两种数据之间用"|"（半角）分隔；</p>
      <p>3.积分明细中，如果出现标点符号，必须是中文状态下的标点符合，否则会出错。</p>
      <p>4.参数文本实例：<span style="color: red;font-weight: bold;">(注意：如果写的是负分，那么就是扣除积分)</span></p>
      <div style="margin-left: 40px;">
        <p style="color: #000000;">15365095178<span style="color: red;">|</span>10<span style="color: red;">|</span>参加商业调查系统奖励10积分<span style="color: red;">,</span></p>
        <p style="color: #000000;">15365095178<span style="color: red;">|</span>30<span style="color: red;">|</span>8月份推荐10名医生系统奖励300积分<span style="color: red;">,</span></p>
        <p style="color: #000000;">15365095178<span style="color: red;">|</span>10<span style="color: red;">|</span>参与活动系统奖励10积分<span style="color: red;">,</span></p>
        <p style="color: #000000;">15365095178<span style="color: red;">|</span>20<span style="color: red;">|</span>参与论坛系统奖励20积分<span style="color: red;">,</span></p>
      </div>
      <p>请注意以上红色符号！</p>
    </div>
    <!--:auto-upload=false
    :before-upload="beforeUpload"
    :on-change="newhandleChange"
    :on-success="newhandlesuccess"
    :on-exceed="handleExceed"-->
  </div>
</template>

<script>
</script>

<style>
  .vipIntegration-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipIntegration-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipIntegration-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }  
  
  .vipIntegration-wrapper .intr-txt{
    font-size: 14px;
    line-height: 15px;
    margin-top: 40px;
    padding-left: 40px;
  }
  
  .vipIntegration-wrapper .intr-txt p{
    color: blue;
  }  
</style>