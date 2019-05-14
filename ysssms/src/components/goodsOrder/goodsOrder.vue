<template>
  <div class="goodsOrder-wrapper">
    <div class="query-wrapper">
      <el-form label-width="120px" size="mini" :inline="true">
        <el-form-item label="所属系列：" >
            <el-select style="width: 200px;" v-model="categoryName">
              <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="订单ID：">
          <el-input style="width: 200px;" v-model="id"></el-input>
        </el-form-item>
        <el-form-item label="会员ID：">
          <el-input style="width: 200px;" v-model="userid"></el-input>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select style="width: 200px;" v-model="deliverstatus">
            <el-option label="审核中" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="无效订单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑换时间：">
          <!--<el-input style="width: 200px;" v-model="converttime"></el-input>-->
          <el-date-picker
            v-model="converttime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>        
        <br />
        <el-form-item style="padding-left: 50px;">
          <el-button type="primary" @click="getConvertGifsList(pageIndex,pageSize);">查询</el-button>
          <el-button type="primary" @click="downloadConvertGifs">导出</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="订单ID">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="会员ID">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        label="会员账号">
      </el-table-column>
      <el-table-column
        prop="deliverstatus"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="adress"
        label="兑换联系信息">
      </el-table-column>
      <el-table-column
        prop="giftname"
        label="礼品名称">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="价格（积分）">
      </el-table-column>
      <el-table-column
        prop="converttime"
        label="兑换时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showdialog(scope.row)">审核</el-button>
          <!--<el-button type="text" size="small" @click="del(scope.row)">删除</el-button>-->
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
      title="订单审核"
      :visible.sync="editdialogVisible"
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="审核状态： " prop="auditType">
            <el-select v-model="editform.auditType" style="width: 80%;">
              <el-option value='1' label='审核通过'></el-option>
              <el-option value='3' label='无效订单'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题说明：" prop="remark">
            <el-input type="textarea" v-model="editform.remark" style="width: 80%;"></el-input>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm('editform')">保存</el-button>
      </span>
    </el-dialog>        
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        categoryList:[],
        multipleSelection: [],
        pageIndex: 1,
        pageSize: 6,
        pageTotal: null,
        rules: {
          giftname: [
            { required: true, message: '请填写商品名称', trigger: 'blur' },
          ],
        },
        categoryName:null,
        id:null,
        userid:null,
        deliverstatus: null,
        converttime: null,
        editdialogVisible:false,
        editform:{
          auditType:null,
          remark:null,
          id:null,
        },
        rules: {
          auditType: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
          remark:[
            { required: true, message: '请填写备注', trigger: 'blur' },
          ],
        },
        ids:null,
      }
    },
    mounted(){
      this.getGiftCategoryList();
      this.getConvertGifsList(this.pageIndex,this.pageSize);
    },
    methods:{
      resetForm(){
        this.categoryName = null;
        this.id = null;
        this.userid = null;
        this.deliverstatus = null;
        this.converttime = null;
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.ids = [];
        for(var i = 0; i < this.multipleSelection.length;i++){
          this.ids.push(this.multipleSelection[i].id)
        }
        this.ids = this.ids.join(',');
        console.log(this.ids);        
      },
      downloadConvertGifs(){
        if(this.ids){
          this.axios({
            url:this.common.getApi() + '/sys/api/convertgifs/downloadConvertGifs',
            method:'get',
            params: {
              ids: this.ids
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            const fileName = '订单导出.csv'
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          })
        }else{
          this.axios({
            url:this.common.getApi() + '/sys/api/convertgifs/downloadConvertGifs',
            method:'get',
            params: {
              categoryName: this.categoryName,
              id: this.id,
              userid: this.userid,
              deliverstatus: this.deliverstatus,
              converttime: this.converttime
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            const fileName = '订单导出.csv'
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          })          
        }
      },      
      getConvertGifsList(pageIndex,pageSize){
        this.id = this.id?Number(this.id): null;
        this.userid = this.userid?Number(this.userid): null;
        this.deliverstatus = this.deliverstatus?Number(this.deliverstatus): null;
        this.axios.get(this.common.getApi() + '/sys/api/convertgifs/getConvertGifsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              categoryName: this.categoryName,
              id: this.id,
              userid: this.userid,
              deliverstatus: this.deliverstatus,
              converttime: this.converttime
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].deliverstatus == 0){
              this.tableData[i].deliverstatus = '审核中';
            }else if(this.tableData[i].deliverstatus == 1){
              this.tableData[i].deliverstatus = '审核通过';
            }else if(this.tableData[i].deliverstatus == 3){
              this.tableData[i].deliverstatus = '无效订单';
            }
          }
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
        this.getConvertGifsList(currentPage,this.pageSize);
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(this.common.getApi() + '/sys/api/convertgifs/auditConvertGifs',{
              params:{
                id: Number(this.editform.id),
                auditType: Number(this.editform.auditType),
                remark: this.editform.remark
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.editdialogVisible = false;
                this.getConvertGifsList(this.pageIndex,this.pageSize);
              }else{
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });       
      },      
      del(row){
//      this.axios.get(this.common.getApi() + '/sys/api/rule/delExchangeRule',{
//        params:{
//          params:{
//            id: row.id
//          }
//        }
//      },{
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded'
//        }
//      }).then((res) => {
//        if(res.data.success){
//          this.$message({
//            message: '删除成功',
//            type: 'success'
//          });
//          this.getExchangeRuleList(this.pageIndex,this.pageSize)
//        }else{
//          this.$message.error(res.data.msg);
//        }
//      })        
      },
      showdialog(row){
        this.editform.id = row.id;
        this.editdialogVisible = true;
      },
      getGiftCategoryList(){
        this.axios.get(this.common.getApi() + '/sys/api/giftcategory/getGiftCategoryList',{
          params:{
//          pageIndex: pageIndex,
//          pageSize: pageSize
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.categoryList = res.data.obj.list;
//        this.pageTotal = res.data.obj.pager.total;
//        console.log(this.pageTotal);
        })
      },        
    }
  }    
</script>

<style>
  .goodsOrder-wrapper .query-wrapper {
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }  
  
  .goodsOrder-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
</style>