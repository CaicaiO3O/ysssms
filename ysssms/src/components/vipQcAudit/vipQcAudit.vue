<template>
  <div class="vipQcAudit-wrapper">
    <el-dialog
      title="电话QC审核"
      :visible.sync="dialogVisible"
      width="35%"
      center>
      <div>
        <el-form label-width="150px" size="mini">
          <el-form-item label="拨打科室电话次数：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="拨打手机电话次数：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="QC结果：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="下次访问时间：">
            <el-select style="width: 200px;"></el-select>
            <el-select style="width: 200px;"></el-select>
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea"
               style="width: 200px;">
            </el-input>
            <div style="color:red">备注信息请不要太长</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>    
    <div class="title">
      <i class="el-icon-search"></i><span>电话QC记录</span>
    </div>
    <div class="query-wrapper">
      <el-form ref="form" :inline="true" size="mini" label-width="120px">
        <el-form-item label="用户ID：">
          <el-input style="width: 200px;" v-model="userId"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input style="width: 200px;" v-model="mobile"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input style="width: 200px;" v-model="realName"></el-input>
        </el-form-item>
        <el-form-item label="拨科电数 ：" title="拨打科室电话次数">
          <el-select style="width: 76px;" v-model="roomtype">
            <el-option label=">=" value=0></el-option>
            <el-option label="<=" value=1></el-option>
          </el-select>
          <el-input style="width: 120px;" v-model="roomenum"></el-input>
        </el-form-item>
        <el-form-item label="拨手机数  ：" title="拨打手机电话次数">
          <el-select style="width: 76px;" v-model="mobiletype">
            <el-option label=">=" value=0></el-option>
            <el-option label="<=" value=1></el-option>
          </el-select>
          <el-input style="width: 120px;" v-model="mobilenum"></el-input>
        </el-form-item>
        <el-form-item label="上传证书  ：">
          <el-select style="width: 200px;" placeholder="是否上传证书" v-model="isCertificate">
            <el-option label="否" value=0></el-option>
            <el-option label="是" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨打电话时间：">
            <el-time-select
              placeholder="请选择起始时间"
              class="startTime"
              v-model="beginTime"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
              }">
            </el-time-select>
            <span style="margin: 0 12px;">到</span>
            <el-time-select
              placeholder="请选择结束时间"
              class="endTime"
              v-model="endTime"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
                minTime: beginTime
              }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker
            v-model="registerTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>          
        </el-form-item>
        <!--<el-form-item >
          <el-button type="success" plain>待释放人数：0</el-button>
        </el-form-item>        -->
        <el-form-item >
          <el-button type="primary" @click="getQcMemberList(1,6)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="el-icon-search"></i><span>会员搜索结果</span>
    </div>
    <el-table
    :data="tableData"
    border
    size="mini"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="会员id">
    </el-table-column>
    <el-table-column
      prop="memberRealname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="memberZone"
      label="地区">
    </el-table-column>
    <el-table-column
      prop="teltime"
      label="拨打电话时段">
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="已拨打科室电话次数">
    </el-table-column>
    <el-table-column
      prop="mobileNum"
      label="已拨打过手机次数">
    </el-table-column>
    <el-table-column
      prop="recommendcode"
      label="推荐人">
    </el-table-column>
    <el-table-column
      prop="filename"
      label="是否提交过执业证书">
    </el-table-column>
    <el-table-column
      prop="station"
      label="职称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="audit(scope.row)">点击审核</el-button>
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
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        teltime:null,
        userId:null,
        mobile:null,
        realName:null,
        studioPhone:null,
        mobilePhone:null,
        isCertificate:null,
        registTimeBegin:null,
        registTimeEnd:null,
        beginTime:null,
        endTime:null,
        registerTime:null,
        roomtype: null,
        roomenum:null,
        mobiletype:null,
        mobilenum:null,
        pageIndex:1,
        pageSize:6,
        pageTotal:null,        
      };
    },
    mounted(){
      this.getQcMemberList(this.pageIndex,this.pageSize)
    },
    methods: {
      resetForm(){
        this.userId = null;
        this.mobile = null;
        this.realName = null;
        this.roomtype = null;
        this.roomenum = null;
        this.mobiletype = null;
        this.mobilenum = null;
        this.isCertificate = null;
        this.beginTime = null;
        this.endTime = null;
        this.registerTime = null; 
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      audit(row){
        sessionStorage.setItem('id',row.id);
        this.axios.get(this.common.getApi() + '/sys/api/audit/goQcMemberAudit',{
          params:{
            params:{
              id: Number(row.id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            sessionStorage.setItem('qcinfo',JSON.stringify(res.data.obj));
            this.$router.push({ path: 'vipTelVerify'})            
          }else{
            this.$message.error(res.data.msg);
          }
        })          
      },
      getQcMemberList(pageIndex,pageSize){
        this.userId = this.userId?Number(this.userId):null;
        this.mobile = this.mobile?this.mobile:null;
        this.realName = this.realName?this.realName:null;
        this.studioPhone = this.roomtype && this.roomenum?{type: this.roomtype ,number: this.roomenum }:null;
        this.mobilePhone = this.mobiletype && this.mobilenum?{type: this.mobiletype ,number: this.mobilenum }:null;
        this.isCertificate = this.isCertificate?this.isCertificate:null; 
        this.registTimeBegin = this.registerTime?this.registerTime[0]:null;
        this.registTimeEnd = this.registerTime?this.registerTime[1]:null;
        this.beginTime = this.beginTime?Number(this.beginTime.slice(0,2)):null;
        this.endTime = this.endTime?Number(this.endTime.slice(0,2)):null;
        this.axios.get(this.common.getApi() + '/sys/api/audit/getQcMemberList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              userId: this.userId,
              mobile: this.mobile,
              realName: this.realName,
              studioPhone: this.studioPhone,
              mobilePhone: this.mobilePhone,
              isCertificate: this.isCertificate,
              registTimeBegin: this.registTimeBegin,
              registTimeEnd: this.registTimeEnd,
              beginTime: this.beginTime,
              endTime: this.endTime,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.pageTotal = res.data.obj.pager.total;
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            this.teltime = this.tableData[i].beginTime + "时 至" + this.tableData[i].endTime + "时";
            this.tableData[i].teltime = this.teltime;
            this.tableData[i].filename = this.tableData[i].filename?'已上传': '未上传';
            this.tableData[i].phoneNum = this.tableData[i].phoneNum?this.tableData[i].phoneNum:0;
            this.tableData[i].mobileNum = this.tableData[i].mobileNum?this.tableData[i].mobileNum:0;
          }
        })
      },
      goQcMemberAudit(){
        var id = sessionStorage.getItem("id");
        this.axios.get(this.common.getApi() + '/sys/api/audit/goQcMemberAudit',{
          params:{
            params:{
              id: Number(id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            console.log(res.data.obj);
            sessionStorage.setItem('qcinfo',JSON.stringify(res.data.obj));
          }else{
            this.$message.error(res.data.msg);
          }
        })           
      },      
      go(currentPage){
        this.getQcMemberList(currentPage,this.pageSize);
      }      
    }    
  }  
</script>

<style>
  .vipQcAudit-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipQcAudit-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipQcAudit-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  } 
  
  .vipQcAudit-wrapper .query-wrapper{
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 20px;
  }  
  
  .vipQcAudit-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }     
</style>