<template>
  <div class="goodAdmin-wrapper">
    <el-dialog
      title="新增商品"
      :visible.sync="dialogAddVisible"
      width="30%"
      center>
      <div>
        <el-form ref="addform" :model="addform" label-width="120px" :rules="rules" size="mini">
          <el-form-item label="商品名称：" prop="giftname" required>
            <el-input v-model="addform.giftname"></el-input>
          </el-form-item>
          <el-form-item label="商品编号：" prop="giftsidcode" required>
            <el-input v-model="addform.giftsidcode"></el-input>
          </el-form-item>
          <el-form-item label="所属系列：" prop="giftsecondkind" required>
            <el-select style="width: 100%;" v-model="addform.giftsecondkind">
              <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
            </el-select>
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
              accept="image/jpeg,image/png">
              <el-button size="small" type="primary" class="btn-upload">选取文件</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>-->
            </el-upload>
          </el-form-item>          
          <el-form-item label="商品价格：" prop="giftprize" required>
            <el-input v-model="addform.giftprize"></el-input>
          </el-form-item>
          <el-form-item label="商品状态：" prop="giftstaus" required>
            <el-select style="width: 100%;" v-model="addform.giftstaus">
              <el-option label="正常商品" value="0"></el-option>
              <el-option label="热门奖品" value="1"></el-option>
              <el-option label="下架奖品" value="2"></el-option>
              <el-option label="待审核商品" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提供商：" prop="supplierid" required>
            <el-select style="width: 100%;" v-model="addform.supplierid">
              <el-option label="大家说" value="0"></el-option>
              <el-option label="一点通" value="1"></el-option>
              <el-option label="一点通录入" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="addform.giftdiscribe"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('addform')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEditVisible"
      width="30%"
      center>
      <div>
        <el-form ref="editform" :model="editform" label-width="120px" :rules="rules" size="mini">
          <el-form-item label="商品名称：" prop="giftname" required>
            <el-input v-model="editform.giftname"></el-input>
          </el-form-item>
          <el-form-item label="商品编号：" prop="giftsidcode" required>
            <el-input v-model="editform.giftsidcode"></el-input>
          </el-form-item>
          <el-form-item label="所属系列：" prop="giftsecondkind" required>
            <el-select style="width: 100%;" v-model="editform.giftsecondkind">
              <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片：" required>
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
              :file-list="fileList"
              accept="image/jpeg,image/png">
              <el-button size="small" type="primary" class="btn-upload">选取文件</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>-->
            </el-upload>
          </el-form-item>          
          <el-form-item label="商品价格：" prop="giftprize" required>
            <el-input v-model="editform.giftprize"></el-input>
          </el-form-item>
          <el-form-item label="商品状态：" prop="giftstaus" required>
            <el-select style="width: 100%;" v-model="editform.giftstaus">
              <el-option label="正常商品" value="0"></el-option>
              <el-option label="热门奖品" value="1"></el-option>
              <el-option label="下架奖品" value="2"></el-option>
              <el-option label="待审核商品" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提供商：" prop="supplierid" required>
            <el-select style="width: 100%;" v-model="editform.supplierid">
              <el-option label="大家说" value="0"></el-option>
              <el-option label="一点通" value="1"></el-option>
              <el-option label="一点通录入" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('editform')">确 定</el-button>
      </span>
    </el-dialog>

    <div class="query-wrapper">
      <el-form label-width="120px" size="mini" :inline="true">
        <el-form-item label="商品ID：">
          <el-input style="width: 200px;" v-model="giftsId"></el-input>
        </el-form-item>
        <el-form-item label="系列：">
          <el-select style="width: 200px;" v-model="categoryName">
            <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑换人数：">
          <el-select style="width: 60px;" v-model="type">
            <el-option label=">=" value="0"></el-option>
            <el-option label="<=" value="1"></el-option>
          </el-select>
          <el-input style="width: 140px;" v-model="count"></el-input>
        </el-form-item>
        <br />
        <el-form-item style="padding-left: 50px;">
          <el-button type="primary" @click="getGiftsList(pageIndex,pageSize)">搜索</el-button>
          <el-button type="primary" @click="dialogAddVisible = true">增加</el-button>
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
        label="商品ID">
      </el-table-column>
      <el-table-column
        prop="giftstairkind"
        label="系列">
      </el-table-column>
      <el-table-column
        prop="giftname"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="giftstaus"
        label="商品状态">
      </el-table-column>
      <el-table-column
        prop="groundingtime"
        label="上架时间">
      </el-table-column>
      <el-table-column
        prop="convertcount"
        label="兑换人数">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="价格（积分）">
      </el-table-column>
      <el-table-column
        label="随略图">
        <template slot-scope="scope">
          <img :src="baseurl+scope.row.giftpicurl" alt="" width="100%"/>
        </template>
      </el-table-column> 
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="changeGrounding(scope.row)">上架/下架</el-button>
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
        baseurl: baseurl,
        dialogAddVisible:false,
        dialogEditVisible:false,
        tableData: [],
        multipleSelection: [],
        pageIndex: 1,
        pageSize: 6,
        pageTotal: null,      
        giftsId:null,
        categoryName: null,
        type: null,
        count:null,
        addform:{
          giftname:null,
          giftsecondkind:null,
          giftprize:null,
          giftdiscribe:null,
          giftsidcode:null,
          giftstaus:null,
          fileParam:null,
          giftsidcode:null,
          giftstaus:null,
        },
        fileList: [],
        editform:{
          giftname:null,
          giftsecondkind:null,
          giftprize:null,
          giftdiscribe:null,
          giftsidcode:null,
          giftstaus:null,
          fileParam:null,
          giftsidcode:null,
          giftstaus:null,
          id:null,
          fileList:[],
        },
        categoryList:[],
        rules: {
          giftname: [
            { required: true, message: '请填写商品名称', trigger: 'blur' },
          ],
          giftsecondkind: [
            { required: true, message: '请选择所属系列', trigger: 'change' }
          ],
          giftprize:[
            { required: true, message: '请填写商品价格', trigger: 'blur' }
          ],
          giftdiscribe:[
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ],
          supplierid:[
            { required: true, message: '请选择提供商', trigger: 'change' }
          ],
          giftstaus:[
            { required: true, message: '请选择商品状态', trigger: 'change' }
          ],
          giftsidcode:[
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getGiftsList(this.pageIndex,this.pageSize);
      this.getGiftCategoryList();
    },
    methods:{
      handleSelectionChange(){
        
      },
      resetForm(){
        this.giftsId = null;
        this.categoryName = null;
        this.type = null;
        this.count = null;
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload1(file){
        
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
        
      },
      newhandlesuccess2(file){
        console.log(file);
      },
      newhandleChange2(response,file,filelist){
        this.editform.fileParam = file;
        console.log(this.editform.fileParam);
      },       
      changeGrounding(row){
        console.log(row.giftstaus)
        var type = null;
        if(row.giftstaus == "待审核商品" || row.giftstaus == "下架奖品"){
          type = 1;
        }else if(row.giftstaus == "正常商品" || row.giftstaus == "热门奖品"){
          type = 0;
        }
        this.axios.post(this.common.getApi() + '/sys/api/gifts/changeGrounding',{
          params:{
            id: Number(row.id),
            type: type
          },
        }).then((res) => {
          if(res.data.success){
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getGiftsList(this.pageIndex,this.pageSize);
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      getGiftsList(pageIndex,pageSize){
        var countEntity = null;
        if(this.type && this.count){
         countEntity = {type:Number(this.type),count:Number(this.count)}
        }else{
          countEntity = null;
        }
        this.axios.get(this.common.getApi() + '/sys/api/gifts/getGiftsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              giftsId: this.giftsId,
              categoryName: this.categoryName,
              countEntity: countEntity
            }            
          }
          
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].giftstaus == 0){
              this.tableData[i].giftstaus = "正常商品"
            }else if(this.tableData[i].giftstaus == 1){
              this.tableData[i].giftstaus = "热门奖品"
            }else if(this.tableData[i].giftstaus == 2){
              this.tableData[i].giftstaus = "下架奖品"
            }else if(this.tableData[i].giftstaus == 5){
              this.tableData[i].giftstaus = "待审核商品"
            }
          }
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
        this.getGiftsList(currentPage,this.pageSize);
      },
      onSubmit(formName) {
        if(formName == 'addform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
  //          this.isload = true;
              if(this.addform.fileParam){
                var addform = new FormData();
                addform.append('giftname', this.addform.giftname);
                addform.append('giftstairkind', this.addform.giftsecondkind);
                addform.append('giftprize', Number(this.addform.giftprize));
                addform.append('giftdiscribe', this.addform.giftdiscribe);
                addform.append('file', this.addform.fileParam[0].raw);
                addform.append('giftsidcode', this.addform.giftsidcode);
                addform.append('giftstaus', this.addform.giftstaus);
                addform.append('supplierid', this.addform.supplierid);
                
                this.axios.post(this.common.getApi() + '/sys/api/gifts/addGifts',addform,{
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then((res) => {
  //              this.isload = false                
                  if(res.data.success){
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    })
                    this.getGiftsList(this.pageIndex,this.pageSize);
                    this.dialogAddVisible = false;
                  }else{
                    this.$message.error(res.data.msg);
                  }
                  
                })
              }else{
                this.$message.error("请上传图片");
              }
            }else {
              console.log('error submit!!');
              return false;
            }
          })
        }else if(formName == 'editform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
  //          this.isload = true;
              
              var editform = new FormData();
              editform.append('id', this.editform.id);
              editform.append('giftname', this.editform.giftname);
              editform.append('giftstairkind', this.editform.giftsecondkind);
              editform.append('giftprize', Number(this.editform.giftprize));
              editform.append('giftdiscribe', this.editform.giftdiscribe);
              if(this.editform.fileParam){
                editform.append('file', this.editform.fileParam[0].raw);                
              }else{
                console.log(this.editform.giftpicurl);
                editform.append('giftpicurl', this.editform.giftpicurl);
              }
              editform.append('giftsidcode', this.editform.giftsidcode);
              editform.append('giftstaus', this.editform.giftstaus);
              editform.append('supplierid', this.editform.supplierid);
              
              
              this.axios.post(this.common.getApi() + '/sys/api/gifts/editGifts',editform,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then((res) => {
//              this.isload = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                  this.getGiftsList(this.pageIndex,this.pageSize);
                  this.dialogEditVisible = false;
                }else{
                  this.$message.error(res.data.msg);
                }
                
              })
            }else {
              console.log('error submit!!');
              return false;
            }
          })          
        }

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
      editshow(row){
        this.axios.get(this.common.getApi() + '/sys/api/gifts/getGifts',{
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
            this.dialogEditVisible = true;
            this.editform.giftname = res.data.obj.giftname;
            this.editform.giftsidcode = res.data.obj.giftsidcode;
            this.editform.giftprize = res.data.obj.giftprize;
            this.editform.giftsecondkind = res.data.obj.giftstairkind;
            this.editform.giftstaus = res.data.obj.giftstaus.toString();
            this.editform.supplierid = res.data.obj.supplierid.toString();
            this.editform.giftdiscribe = res.data.obj.giftdiscribe;
            this.editform.id = res.data.obj.id;
            this.editform.giftpicurl = res.data.obj.giftpicurl;
            this.editform.fileList.push(res.data.obj.giftpicurl);
          }else{
            this.$message.error(res.data.msg);
          }
//        this.categoryList = res.data.obj.list;
//        this.pageTotal = res.data.obj.pager.total;
//        console.log(this.pageTotal);
        })        
//      this.dialogEditVisible = true;
      }
    }
  }  
</script>

<style>
  .goodAdmin-wrapper .query-wrapper {
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  
  .goodAdmin-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
</style>