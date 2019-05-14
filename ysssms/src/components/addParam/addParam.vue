<template>
  <div class="addParam-wrapper">
    <el-dialog
      title="增加条件"
      :visible.sync="addDialogVisible"
      width="800px"
      center>
      <div style="height: 560px;overflow-y: auto;">
        <el-form :model="addForm" ref="addForm" :rules="add_rules" label-width="150px" size="medium" >
          <el-form-item label="会员账户(手机号)：" prop="vip_phone">
            <el-input type="textarea" v-model="addForm.vip_phone" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="会员账户(数字ID)：" prop="vip_id">
            <el-input type="textarea" v-model="addForm.vip_id" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="addForm.sex" class="selectlength">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称：">
            <el-select v-model="addForm.zc_1" class="selectlength" @change = "getStationTechnicalTitle(addForm.zc_1)">
              <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
            </el-select>
            <el-select v-model="addForm.zc_2" class="selectlength" style='margin-left: 8px;'>
              <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在省份：" prop="province">
            <el-select v-model="addForm.province" class="selectlength" @change = "getCityByProvince(addForm.province)">
              <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在城市：" prop="city">
            <el-select v-model="addForm.city" class="selectlength" @change = "getDistrictByCity(addForm.province,addForm.city)">
              <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区：" prop="region">
            <el-select v-model="addForm.region" class="selectlength">
              <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院名称：" prop="hospital">
            <el-select v-model="addForm.hospital" class="selectlength">
              <el-option v-for="item in hospital_options" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政职位：" prop="hospital_xzzw">
            <el-select v-model="addForm.hospital_xzzw" class="selectlength">
              <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院级别：" prop="level">
            <el-select v-model="addForm.level" class="selectlength">
              <el-option v-for="item in level_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-select v-model="addForm.date_size" style="width: 100px;">
              <el-option value=1 label=">="></el-option>
              <el-option value=2 label="<="></el-option>
            </el-select>
            <el-date-picker
              v-model="addForm.register_date"
              type="date"
              placeholder=""
              style="width: 250px;"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="医院性质：">
            <el-select v-model="addForm.hospital_xz" class="selectlength">
              <el-option :value="item.id" :label="item.sysname" v-for="item in xz_options" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室：">
            <el-select v-model="addForm.hospital_room_1" class="selectlength" @change="getSonOffice(addForm.hospital_room_1)">
              <el-option v-for="item in hospital_1_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
            </el-select>
            <el-select v-model="addForm.hospital_room_2" class="selectlength" style='margin-left: 8px;'>
              <el-option v-for="item in hospital_2_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生年份">
            <el-date-picker
              v-model="addForm.start_date"
              type="year"
              placeholder=""
              class="selectlength"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <span style="width: 10px;text-align: center;">-</span>
            <el-date-picker
              v-model="addForm.end_date"
              type="year"
              placeholder=""
              class="selectlength"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="教育程度：" prop="education">
            <el-select v-model="addForm.education" class="selectlength">
              <el-option v-for="item in education_options" :value="item.id" :label="item.sysname" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院等级：" prop="hospital_grade">
            <el-select v-model="addForm.hospital_grade" class="selectlength">
              <el-option v-for="item in hospital_grade_options" :value="item.id" :label="item.sysname" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="从医领域：">
            <el-select v-model="addForm.fields_1" class="selectlength" @change="getSonFields(addForm.fields_1)">
              <el-option v-for="item in fields_1_options" :value="item.id" :key="item.id" :label="item.fieldname"></el-option>
            </el-select>
            <el-select v-model="addForm.fields_2" class="selectlength" style='margin-left: 8px;'>
              <el-option v-for="item in fields_2_options" :value="item.id" :key="item.id" :label="item.fieldname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院类型：" prop="hospital_type">
            <el-select v-model="addForm.hospital_type" class="selectlength">
              <el-option v-for="item in hospital_type_options" :value="item.id" :key="item.id" :label="item.sysname"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="增加排他条件"
      :visible.sync="removeDialogVisible"
      width="800px"
      center>
      <div style="height: 450px;overflow-y: auto;">
        <el-form :model="removeForm" ref="removeForm" :rules="remove_rules" label-width="150px" size="medium" >
          <el-form-item label="会员账户(手机号)：" prop="vip_phone">
            <el-input type="textarea" v-model="removeForm.vip_phone" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="会员账户(数字ID)：" prop="vip_id">
            <el-input type="textarea" v-model="removeForm.vip_id" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="职称：">
            <el-select v-model="removeForm.zc_1" class="selectlength" @change = "getStationTechnicalTitle(removeForm.zc_1)">
              <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
            </el-select>
            <el-select v-model="removeForm.zc_2" class="selectlength" style='margin-left: 8px;'>
              <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在省份：" prop="province">
            <el-select v-model="removeForm.province" class="selectlength" @change = "getCityByProvince(removeForm.province)">
              <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在城市：" prop="city">
            <el-select v-model="removeForm.city" class="selectlength" @change = "getDistrictByCity(removeForm.province,removeForm.city)">
              <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区：" prop="region">
            <el-select v-model="removeForm.region" class="selectlength">
              <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitremoveForm('removeForm')">保存</el-button>
        <el-button @click="resetForm('removeForm')">重置</el-button>
      </span>
    </el-dialog>
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="抽样条件名称" prop="sample_name">
        <el-input v-model="ruleForm.sample_name" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="增加条件">
        <div class="add-wrapper">
          <i class="el-icon-circle-plus-outline btn-big" @click="openaddDialogVisible" 
            v-if="isNoData">
          </i>
          <div class="tag-wrapper" v-else>
            <!--手机号-->
            <div class="">
              <span style="margin-left: 10px;">会员账户(手机号)：</span>
              <el-tag v-for="(tag,index) in phone_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,phone_tags,memberHandphoneIn)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--id-->
            <div class="">
              <span style="margin-left: 10px;">会员账户(数字ID)：</span>
              <el-tag v-for="(tag,index) in id_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,id_tags,memberIdIn)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--性别-->
            <div class="">
              <span style="margin-left: 10px;">性别：</span>
              <el-tag v-for="(tag,index) in sex_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,sex_tags,sexIn)">
                {{tag.name}}
              </el-tag>              
            </div>
            <!--职称-->
            <div class="">
              <span style="margin-left: 10px;">职称：</span>
              <el-tag v-for="(tag,index) in zc_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,zc_tags,memberstationIn)">
                {{tag.name}}
              </el-tag>              
            </div>
            <!--省份-->
            <div class="">
              <span style="margin-left: 10px;">所在省份：</span>
              <el-tag v-for="(tag,index) in province_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,province_tags,memberProvinceIn)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--城市-->
            <div class="">
              <span style="margin-left: 10px;">所在城市：</span>
              <el-tag v-for="(tag,index) in city_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,city_tags,memberCityIn)">
                {{tag.name}}
              </el-tag>
            </div>       
            <!--地区-->
            <div class="">
              <span style="margin-left: 10px;">所在地区：</span>
              <el-tag v-for="(tag,index) in region_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,region_tags,memberDistrictIn)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--医院-->
            <div class="">
              <span style="margin-left: 10px;">医院名称：</span>
              <el-tag v-for="(tag,index) in hospital_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,hospital_tags,memberhospital)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--行政职位-->
            <div class="">
              <span style="margin-left: 10px;">行政职位：</span>
              <el-tag v-for="(tag,index) in xzzw_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,xzzw_tags,administrativeposition)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--医院级别-->
            <div class="">
              <span style="margin-left: 10px;">医院级别：</span>
              <el-tag v-for="(tag,index) in level_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,level_tags,memberhospitallevel)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--注册时间-->
            <div class="">
              <span style="margin-left: 10px;">注册时间：</span>
              <el-tag class="registertime-tag" closable v-if="registertime_txt!=''">{{registertime_txt}}</el-tag>
            </div>
            <!--医院性质-->
            <div class="">
              <span style="margin-left: 10px;">医院性质：</span>
              <el-tag v-for="(tag,index) in xz_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,xz_tags,nature)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--科室-->
            <div class="">
              <span style="margin-left: 10px;">科室：</span>
              <el-tag v-for="(tag,index) in room_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,room_tags,membersectionoffice)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--出生年份-->
            <div class="datetag">
              <span style="margin-left: 10px;">出生年份：</span>
              <el-tag v-for="(tag,index) in date_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,date_tags,memberBirYear)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--教育程度-->
            <div class="">
              <span style="margin-left: 10px;">教育程度：</span>
              <el-tag v-for="(tag,index) in education_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,education_tags,memberEducation)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--医院等级-->
            <div class="">
              <span style="margin-left: 10px;">医院等级：</span>
              <el-tag v-for="(tag,index) in grade_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,grade_tags,hospitalGrade)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--从医领域-->
            <div class="">
              <span style="margin-left: 10px;">从医领域：</span>
              <el-tag v-for="(tag,index) in fields_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,fields_tags,membertechnical)">
                {{tag.name}}
              </el-tag>
            </div>
            <!--医院类型-->
            <div class="">
              <span style="margin-left: 10px;">医院类型：</span>
              <el-tag v-for="(tag,index) in type_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,type_tags,fkPolyclinicId)">
                {{tag.name}}
              </el-tag>
            </div>
            <div class="btn-content" @click="addDialogVisible = true">
              <i class="el-icon-circle-plus-outline"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="排他条件">
        <div class="remove-wrapper">
          <i class="el-icon-circle-plus-outline btn-big" @click="openremoveDialogVisible" v-if="isNotFlagData"></i>
          <div class="tag-wrapper" v-else>
            <!--手机号-->
            <div class="">
              <span style="margin-left: 10px;">会员账户(手机号)：</span>
              <el-tag v-for="(tag,index) in phoneNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,phoneNot_tags,memberHandphoneNot)">
                {{tag.name}}
              </el-tag>
            </div>

            <div class="">
              <span style="margin-left: 10px;">会员账户(数字ID)：</span>
              <el-tag v-for="(tag,index) in idNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,idNot_tags,memberIdNot)">
                {{tag.name}}
              </el-tag>
            </div>

            <div class="">
              <span style="margin-left: 10px;">职称：</span>
              <el-tag v-for="(tag,index) in zcNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,zcNot_tags,memberstationNot)">
                {{tag.name}}
              </el-tag>              
            </div>

            <div class="">
              <span style="margin-left: 10px;">所在省份：</span>
              <el-tag v-for="(tag,index) in provinceNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,provinceNot_tags,memberProvinceNot)">
                {{tag.name}}
              </el-tag>
            </div>

            <div class="">
              <span style="margin-left: 10px;">所在城市：</span>
              <el-tag v-for="(tag,index) in cityNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,cityNot_tags,memberCityNot)">
                {{tag.name}}
              </el-tag>
            </div>

            <div class="">
              <span style="margin-left: 10px;">所在地区：</span>
              <el-tag v-for="(tag,index) in regionNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,regionNot_tags,memberDistrictNot)">
                {{tag.name}}
              </el-tag>
            </div>
            <div class="btn-content" @click="removeDialogVisible = true">
              <i class="el-icon-circle-plus-outline"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('ruleForm')" :loading="isload">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var checkVipphone = (rule, value, callback) => {
        var result=value.split(",");
        var regu =/^1[34578]\d{9}$/;
        var flag = true;
        var s = result.join(",")+",";
        var r = this.memberHandphoneIn;
        for(var i = 0; i < result.length; i ++){
          if(!regu.test(Number(result[i])) || s.replace(result[i]+",","").indexOf(result[i]+",")>-1 || r.indexOf(result[i])>-1){
            flag = false;
          }
        }
        if(!flag && value != ""){
          callback(new Error('手机号码格式不正确或手机号有重复'));
        }else{
          callback();
        }
      };
      var checkVipid = (rule, value, callback) => {
        var result=value.split(",");
        var regu =/^[0-9]*$/;
        var flag = true;
        var s = result.join(",")+",";
        var r = this.memberIdIn.join(",")+",";
        for(var i = 0; i < result.length; i ++){
          if(!regu.test(Number(result[i])) || s.replace(result[i]+",","").indexOf(result[i]+",")>-1 || r.indexOf(result[i])>-1){
            flag = false;
          }
        }
        if(!flag && value != ""){
          callback(new Error('id格式不正确或id有重复'));
        }else{
          callback();
        }
      };
      return {
        isload: false,
        isNoData: true,
        isNotFlagData:true,
        zc_1_options:[],//职称一级
        zc_2_options:[],//职称二级
        province_options: [],
        city_options:[],
        region_options:[],
        hospital_options:[],
        xzzw_options:[],
        level_options:[],
        xz_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        education_options:[],
        hospital_grade_options:[],
        fields_1_options:[],
        fields_2_options:[],
        hospital_type_options:[],
        datesize_options: [{
          value: '0',
          label: ''
        },{
          value: '1',
          label: '>='
        }, {
          value: '2',
          label: '<='
        }],
        ruleForm: {
          sample_name: '',
        },
        rules: {
          sample_name: [
            { required: true, message: '请输入抽样条件名称', trigger: 'blur' }
          ],
        },
        add_rules:{
          vip_phone:[
            { validator: checkVipphone, trigger: 'blur' }
          ],
          vip_id:[
            { validator: checkVipid, trigger: 'blur' }
          ],
        },
        addForm: {
          vip_phone:'',
          vip_id:'',
          sex:'',
          zc_1:'',
          zc_2:'',
          province:'',
          city:'',
          region:'',
          hospital:'',
          provincelist:[],
          citylist:[],
          regionlist:[],
          hospitallist:[],
          hospital_xzzw:'',//行政职位
          xzzwlist:[],
          level:'',//医院级别
          hospitaltypelist:[],
          register_date:'',
          date_size:'',
          hospital_xz:'',//医院性质
          xzlist:[],
          start_date:'',
          end_date:'',
          datelist:[],
          hospital_room_1:'',
          hospital_room_2:'',
          education:'',
          hospital_grade:'',
          fields_1:'',  
          fields_2:'',
          hospital_type:'',
        },
        remove_rules:{
          vip_phone:[
            { validator: checkVipphone, trigger: 'blur' }
          ],
          vip_id:[
            { validator: checkVipid, trigger: 'blur' }
          ],
        },
        removeForm: {
          vip_phone:'',
          vip_id:'',
          sex:'',
          zc_1:'',
          zc_2:'',
          province:'',
          city:'',
          region:'',
        },        
        addDialogVisible: false,
        removeDialogVisible: false,
        //要显示的数据
        phone_tags: [],
        id_tags:[],
        sex_tags: [],//性别显示
        zc_tags: [],
        province_tags: [],
        city_tags: [],
        region_tags: [],
        hospital_tags:[],
        xzzw_tags:[],
        level_tags:[],
        xz_tags:[],
        room_tags:[],
        education_tags:[],
        grade_tags:[],
        fields_tags:[],
        type_tags:[],
        registertime_txt:'',//注册时间标签显示
        date_tags:[],
        
        phoneNot_tags:[],
        idNot_tags:[],
        zcNot_tags:[],
        provinceNot_tags:[],
        cityNot_tags:[],
        regionNot_tags:[],
        //要传的数组
        memberHandphoneIn:[],//手机号包含
        memberIdIn:[],//会员id包含
        sexIn:[],//性别包含
        memberstationIn:[],//职称包含
        memberProvinceIn:[],//省份包含
        memberCityIn:[],//城市包含
        memberDistrictIn:[],//地区包含
        memberhospital:[],//医院包含
        administrativeposition:[],//行政职位
        memberhospitallevel:[],//医院级别
        nature:[],//医院性质
        membersectionoffice:[],//科室
        memberEducation:[],//教育
        hospitalGrade:[],//医院等级
        membertechnical:[],//从医领域
        fkPolyclinicId:[],//医院类型
        memberBirYear:[],//出生年份
        registerTime:null,
        
        memberHandphoneNot:[],//手机号排他
        memberIdNot:[],//会员id排他
        memberstationNot:[],
        memberProvinceNot:[],
        memberCityNot:[],
        memberDistrictNot:[]
      };
    },
    mounted(){
      this.getStationDuties();
      this.getProvince();
      this.getAdminiStraion();
      this.getHospitalLevel();
      this.getHospitalNature();
      this.getParentOffice();
      this.getEducational();
      this.getHospitalGrade();
      this.getParentFields();
      this.getHospitalType();
    },
    methods: {
      closeTag(index,taglist,paramlist){
        taglist.splice(index,1);
        paramlist.splice(index,1);
        console.log(taglist);
        console.log(paramlist);
      },
      //提交
      submitremoveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.removeForm.vip_phone != ""){//如果添加了手机号
              var a = this.removeForm.vip_phone.split(",");
              for(var i = 0 ; i < a.length ; i ++){
                var obj = {
                  name: a[i],
                  type: ''
                }
                this.phoneNot_tags.push(obj);//标签数组
                this.memberHandphoneNot.push(a[i]);//参数数组
              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.vip_id != ""){//如果添加了会员id
              var b = this.removeForm.vip_id.split(",");
              for(var i = 0 ; i < b.length ; i ++){
                var obj = {
                  name: b[i],
                  type: ''
                }
                this.idNot_tags.push(obj);  
                this.memberIdNot.push(b[i]);
              }
              this.isNotFlagData = false;
            }

            if(this.removeForm.zc_2 != ""){
              var obj = {
                name: this.getLable(this.removeForm.zc_2,this.zc_2_options,'stationId','stationName'),
                type:''
              }
              if(this.memberstationNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.zc_2;
              }) == undefined){
                this.memberstationNot.push({id:this.removeForm.zc_2,value:this.getLable(this.removeForm.zc_2,this.zc_2_options,'stationId','stationName')});
                this.zcNot_tags.push(obj);       
              }else{
                
              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.province != ""){
              var obj = {
                name: this.getLable(this.removeForm.province,this.province_options,'provinceId','provinceName'),
                type:''
              }
              console.log(this.removeForm.province);
              if(this.memberProvinceNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.province;
              }) == undefined){
                this.memberProvinceNot.push({id:this.removeForm.province,value:this.getLable(this.removeForm.province,this.province_options,'provinceId','provinceName')});
                this.provinceNot_tags.push(obj);       
              }else{
                
              }              
              this.isNotFlagData = false;
            }
            if(this.removeForm.city != ""){
              var obj = {
                name: this.getLable(this.removeForm.city,this.city_options,'cityId','cityName'),
                type:''
              } 
              if(this.memberCityNot.find((x) => {
                return x.id == this.removeForm.city;
              }) == undefined){
                this.memberCityNot.push({id: this.removeForm.city,value: this.getLable(this.removeForm.city,this.city_options,'cityId','cityName')});
                this.cityNot_tags.push(obj);       
              }else{
                
              }                  
              this.isNotFlagData = false;
            }
            if(this.removeForm.region != ""){
              var obj = {
                name: this.getLable(this.removeForm.region,this.region_options,'id','name'),
                type:''
              }
              if(this.memberDistrictNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.region;
              }) == undefined){
                this.memberDistrictNot.push({id: this.removeForm.region,value: this.getLable(this.removeForm.region,this.region_options,'id','name')});
                this.regionNot_tags.push(obj);       
              }else{
                
              }   
              this.isNotFlagData = false;
            }
            this.$refs[formName].resetFields();
            this.removeDialogVisible = false;
            this.removeForm.zc_1 = '';
            this.removeForm.zc_2 = '';
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },      
      //提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addForm.vip_phone != ""){//如果添加了手机号
              var a = this.addForm.vip_phone.split(",");
              for(var i = 0 ; i < a.length ; i ++){
                var obj = {
                  name: a[i],
                  type: ''
                }
                this.phone_tags.push(obj);//标签数组
                this.memberHandphoneIn.push(a[i]);//参数数组
              }
              this.isNoData = false;
            }
            if(this.addForm.vip_id != ""){//如果添加了会员id
              var b = this.addForm.vip_id.split(",");
              for(var i = 0 ; i < b.length ; i ++){
                var obj = {
                  name: b[i],
                  type: ''
                }
                this.id_tags.push(obj);  
                this.memberIdIn.push(b[i]);
              }
              this.isNoData = false;
            }
            if(this.addForm.sex != ""){
              if(this.addForm.sex == 0){
                this.sex_tags = [{name:"男",type:''}];
                this.sexIn = [{id: 0,value: "男"}]
              }else{
                this.sex_tags = [{name:"女",type:''}];
                this.sexIn = [{id: 1,value: "女"}]
              }
              this.isNoData = false;
            }
            if(this.addForm.zc_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.zc_2,this.zc_2_options,'stationId','stationName'),
                type:''
              }
              if(this.memberstationIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.zc_2;
              }) == undefined){
                this.memberstationIn.push({id:this.addForm.zc_2,value:this.getLable(this.addForm.zc_2,this.zc_2_options,'stationId','stationName')});
                this.zc_tags.push(obj);       
              }else{
                
              }
              this.isNoData = false;
            }
            if(this.addForm.province != ""){
              var obj = {
                name: this.getLable(this.addForm.province,this.province_options,'provinceId','provinceName'),
                type:''
              }
              console.log(this.addForm.province);
              if(this.memberProvinceIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.province;
              }) == undefined){
                this.memberProvinceIn.push({id:this.addForm.province,value:this.getLable(this.addForm.province,this.province_options,'provinceId','provinceName')});
                this.province_tags.push(obj);       
              }else{
                
              }              
              this.isNoData = false;
            }
            if(this.addForm.city != ""){
              var obj = {
                name: this.getLable(this.addForm.city,this.city_options,'cityId','cityName'),
                type:''
              } 
              if(this.memberCityIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.city;
              }) == undefined){
                this.memberCityIn.push({id: this.addForm.city,value: this.getLable(this.addForm.city,this.city_options,'cityId','cityName')});
                this.city_tags.push(obj);       
              }else{
                
              }                  
              this.isNoData = false;
            }
            if(this.addForm.region != ""){
              var obj = {
                name: this.getLable(this.addForm.region,this.region_options,'id','name'),
                type:''
              }
              if(this.memberDistrictIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.region;
              }) == undefined){
                this.memberDistrictIn.push({id: this.addForm.region,value: this.getLable(this.addForm.region,this.region_options,'id','name')});
                this.region_tags.push(obj);       
              }else{
                
              }   
              this.isNoData = false;
            }
            if(this.addForm.hospital != ""){
              console.log(this.addForm.hospital);
              var obj = {
                name: this.getLable(this.addForm.hospital,this.hospital_options,'id','name'),
                type:''
              }
              if(this.memberhospital.indexOf(this.addForm.hospital) == -1){
                this.memberhospital.push(this.getLable(this.addForm.hospital,this.hospital_options,'id','name'));
                this.hospital_tags.push(obj);                
              }
              this.isNoData = false;
            }               
            if(this.addForm.hospital_xzzw != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_xzzw,this.xzzw_options,'id','sysname'),
                type:''
              }
              if(this.administrativeposition.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_xzzw;
              }) == undefined){
                this.administrativeposition.push({id: this.addForm.hospital_xzzw,value: this.getLable(this.addForm.hospital_xzzw,this.xzzw_options,'id','sysname')});
                this.xzzw_tags.push(obj);       
              }else{
                
              }
              this.isNoData = false;
            }
            if(this.addForm.level != ""){
              var obj = {
                name: this.getLable(this.addForm.level,this.level_options,'id','sysname'),
                type:''
              }
              if(this.memberhospitallevel.find((x) => {
                console.log(x);
                return x.id == this.addForm.level;
              }) == undefined){
                this.memberhospitallevel.push({id: this.addForm.level,value: this.getLable(this.addForm.level,this.level_options,'id','sysname')});
                this.level_tags.push(obj);       
              }else{
                
              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_xz != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_xz,this.xz_options,'id','sysname'),
                type:''
              }
              if(this.nature.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_xz;
              }) == undefined){
                this.nature.push({id: this.addForm.hospital_xz,value: this.getLable(this.addForm.hospital_xz,this.xz_options,'id','sysname')});
                this.xz_tags.push(obj);       
              }else{
                
              }              
              this.isNoData = false;
            }
            if(this.addForm.hospital_room_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_room_2,this.hospital_2_options,'sectionofficeid','sectionofficename'),
                type:''
              }
              if(this.membersectionoffice.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_room_2;
              }) == undefined){
                this.membersectionoffice.push({id: this.addForm.hospital_room_2,value:this.getLable(this.addForm.hospital_room_2,this.hospital_2_options,'sectionofficeid','sectionofficename')});
                this.room_tags.push(obj);       
              }else{
                
              }      
              this.isNoData = false;
            }
            if(this.addForm.education != ""){
              var obj = {
                name: this.getLable(this.addForm.education,this.education_options,'id','sysname'),
                type:''
              }
              if(this.memberEducation.find((x) => {
                console.log(x);
                return x.id == this.addForm.education;
              }) == undefined){
                this.memberEducation.push({id: this.addForm.education,value:this.getLable(this.addForm.education,this.education_options,'id','sysname')});
                this.education_tags.push(obj);       
              }else{
                
              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_grade != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_grade,this.hospital_grade_options,'id','sysname'),
                type:''
              }
              if(this.hospitalGrade.find((x) => {
                return x.id == this.addForm.hospital_grade;
              }) == undefined){
                this.hospitalGrade.push({id: this.addForm.hospital_grade,value:this.getLable(this.addForm.hospital_grade,this.hospital_grade_options,'id','sysname')});
                this.grade_tags.push(obj);       
              }else{
                
              }              
              this.isNoData = false;
            }

            if(this.addForm.fields_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.fields_2,this.fields_2_options,'id','fieldname'),
                type:''
              }
              if(this.membertechnical.find((x) => {
                return x.id == this.addForm.fields_2;
              }) == undefined){
                this.membertechnical.push({id: this.addForm.fields_2,value:this.getLable(this.addForm.fields_2,this.fields_2_options,'id','fieldname')});
                this.fields_tags.push(obj);       
              }else{
                
              }                           
              this.isNoData = false;
            }
            if(this.addForm.hospital_type != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_type,this.hospital_type_options,'id','sysname'),
                type:''
              }
              if(this.fkPolyclinicId.find((x) => {
                return x.id == this.addForm.hospital_type;
              }) == undefined){
                this.fkPolyclinicId.push({id: this.addForm.hospital_type,value: this.getLable(this.addForm.hospital_type,this.hospital_type_options,'id','sysname')});
                this.type_tags.push(obj);       
              }else{
                
              }                 
              this.isNoData = false;
            }
            if(this.addForm.start_date != "" || this.addForm.end_date != ""){
              if(this.addForm.start_date < this.addForm.end_date){
                var obj = {
                  name: this.addForm.start_date.slice(0,4) + "-" + this.addForm.end_date.slice(0,4),
                  type:''
                }
                if(this.memberBirYear.indexOf(this.addForm.start_date.slice(0,4)+"-"+this.addForm.end_date.slice(0,4)) == -1){
                  this.memberBirYear.push({
                    start: this.addForm.start_date.slice(0,4),
                    end: this.addForm.end_date.slice(0,4)
                  });
                  this.date_tags.push(obj);
                }
                this.isNoData = false;
              }
            }
            console.log(this.addForm.start_date);
            console.log(this.memberBirYear);
            console.log(this.date_tags);
            if(this.addForm.register_date != ""){
              if(this.addForm.date_size == "0"){
                this.registertime_txt = this.addForm.register_date;
              }else if(this.addForm.date_size == "1"){
                this.registertime_txt = ">=" + this.addForm.register_date;
              }else{
                this.registertime_txt = "<=" + this.addForm.register_date;
              }
              this.registerTime = {type: this.addForm.date_size,registerTime: this.addForm.register_date};
              this.isNoData = false;
            }
//          console.log(this.registerTime);

            this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            this.addForm.zc_1 = '';
            this.addForm.zc_2 = '';
            this.removeForm.zc_1 = '';
            this.removeForm.zc_2 = '';
            this.addForm.date_size = '';
            this.addForm.hospital_xz = '';
            this.addForm.hospital_room_1 = '';
            this.addForm.hospital_room_2 = '';
            this.addForm.register_date = "";
            this.addForm.fields_1 = '';
            this.addForm.fields_2 = '';
            this.addForm.start_date = '';
            this.addForm.end_date = '';
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
      //获取选中的文本
      getLable(value,list,id,name){
        let obj = {};
        if(id == "stationId"){
          obj = list.find((item)=>{
            return item.stationId === value;
          });
          return obj.stationName;
        }else if(id == "provinceId"){
          obj = list.find((item)=>{
            return item.provinceId === value;
          });
          return obj.provinceName;
        }else if(id == "cityId"){
          obj = list.find((item)=>{
            return item.cityId === value;
          });
          return obj.cityName;
        }else if(id == "id" && name == "name"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.name;          
        }else if(id == "id" && name == "sysname"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.sysname; 
        }else if(id == "sectionofficeid" && name == "sectionofficename"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          console.log(obj)
          return obj.sectionofficename; 
        }else if(id == "id" && name == "fieldname"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.fieldname; 
        }
      },
      save(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isload = true;
            this.axios.post(this.common.getApi() + '/sys/api/projectQuestion/addSampleQuestion',{
              params:{
                projectId: Number(sessionStorage.getItem('id')),
                sampleName: this.ruleForm.sample_name,
                memberHandphoneIn: this.memberHandphoneIn,
                memberHandphoneNot: this.memberHandphoneNot,
                memberIdIn: this.memberIdIn,
                memberIdNot: this.memberIdNot,
                sexIn: this.sexIn,
                memberstationIn: this.memberstationIn,
                memberstationNot: this.memberstationNot,
                memberProvinceIn: this.memberProvinceIn,
                memberProvinceNot: this.memberProvinceNot,
                memberCityIn: this.memberCityIn,
                memberCityNot: this.memberCityNot,
                memberDistrictIn: this.memberDistrictIn,
                memberDistrictNot: this.memberDistrictNot,
                memberhospital: this.memberhospital,
                administrativeposition: this.administrativeposition,
                memberhospitallevel: this.memberhospitallevel,
                registerTime: this.registerTime,
                nature: this.nature,
                membersectionoffice: this.membersectionoffice,
                memberBirYear: this.memberBirYear,
                memberEducation: this.memberEducation,
                hospitalGrade: this.hospitalGrade,
                membertechnical: this.membertechnical,
                fkPolyclinicId: this.fkPolyclinicId,
                fkSpecialtyId: this.fkSpecialtyId
              }
            }).then((res) => {
              this.isload = false;
              if(res.data.success){
                this.$message({
                  message:'保存条件成功',
                  type: 'success'
                });
              }else{
                this.$message.error(res.data.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openaddDialogVisible(){
        this.addDialogVisible = true;
      },
      openremoveDialogVisible(){
        this.removeDialogVisible = true;
      },
      //获取职称一级
      getStationDuties(){
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationDuties','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zc_1_options = res.data.obj;
          }
        })   
      },
      //获取职称二级
      getStationTechnicalTitle(parentId){
        this.addForm.zc_2 = '';
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationTechnicalTitle',{
          params:{
            params:{
              parentId: parentId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zc_2_options = res.data.obj;
          }
        })   
      },
      //获取省
      getProvince(){
        this.axios.get(this.common.getApi() + '/sys/api/area/getProvince','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.province_options = res.data.obj;
          }
        })
      },
      //获取城市列表
      getCityByProvince(provinceId){
        this.addForm.city = "";
        this.addForm.region = "";
        this.addForm.hospital = "";
        this.axios.get(this.common.getApi() + '/sys/api/area/getCityByProvince',{
          params:{
            params:{
              provinceId: provinceId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.city_options = res.data.obj;
          }
        })           
      },
      //获取地区
      getDistrictByCity(provinceId,cityId){
        this.addForm.region = "";
        this.addForm.hospital = "";
        this.axios.get(this.common.getApi() + '/sys/api/area/getDistrictByCity',{
          params:{
            params:{
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.region_options = res.data.obj;
          }
        })
        //获取医院
        this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospital',{
          params:{
            params:{
              provinceId: provinceId,
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_options = res.data.obj;
          }
        })        
      },
      //获取行政职位
      getAdminiStraion(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getAdminiStraion','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.xzzw_options = res.data.obj;
          }
        })        
      },
      //获取医院级别
      getHospitalLevel(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalLevel','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.level_options = res.data.obj;
          }
        })            
      },
      //获取医院性质
      getHospitalNature(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalNature','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.xz_options = res.data.obj;
          }
        })            
      },
      //获取科室一级
      getParentOffice(){
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getParentOffice','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_1_options = res.data.obj;
          }
        })
      },
      //获取科室二级
      getSonOffice(parentId){
//      this.addForm.city = "";
//      this.addForm.region = "";
//      this.addForm.hospital = "";
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSonOffice',{
          params:{
            params:{
              parentId: parentId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_2_options = res.data.obj;
          }
        })           
      },
      //获取教育程度
      getEducational(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getEducational','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.education_options = res.data.obj;
          }
        })           
      },
      //获取医院等级
      getHospitalGrade(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalGrade','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_grade_options = res.data.obj;
          }
        })           
      },      
      //获取从医领域一级
      getParentFields(){
        this.axios.get(this.common.getApi() + '/sys/api/fields/getParentFields','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.fields_1_options = res.data.obj;
          }
        }) 
      },
      //获取从医领域二级
      getSonFields(parentId){
        this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
          params:{
            params:{
              parentId: parentId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.fields_2_options = res.data.obj;
          }
        })          
      },
      //医院类型 {
      getHospitalType(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalType','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_type_options = res.data.obj;
          }
        })       
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.addForm.zc_1 = '';
        this.addForm.zc_2 = '';
        this.removeForm.zc_1 = '';
        this.removeForm.zc_2 = '';
        this.addForm.date_size = '';
        this.addForm.hospital_xz = '';
        this.addForm.hospital_room_1 = '';
        this.addForm.hospital_room_2 = '';
        this.addForm.register_date = "";
        this.addForm.fields_1 = '';
        this.addForm.fields_2 = '';
        this.addForm.start_date = '';
        this.addForm.end_date = '';
      },
    }
  }
</script>

<style>
  .addParam-wrapper .inputlength{
    width: 350px;
  }
  
  .addParam-wrapper .selectlength{
    width: 170px;
  }
  
  .addParam-wrapper .add-wrapper,
  .addParam-wrapper .remove-wrapper{
    width: 350px;
    min-height: 200px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    position: relative;
    background: #fff;
  }
  
  .addParam-wrapper .btn-big{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 50px;
    cursor: pointer;
  }
  
  .addParam-wrapper .tags{
    background: transparent;
    border: none;
  }
  
  .addParam-wrapper .registertime-tag{
    width: 100%;
    background: transparent;
    border: none;
  }
  
  .addParam-wrapper .btn-content{
    text-align: center;
    border-top: 1px solid #DCDFE6;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }
  
  .addParam-wrapper .tag-wrapper{
    box-sizing: border-box;
    padding-bottom: 50px;

  }
  

</style>