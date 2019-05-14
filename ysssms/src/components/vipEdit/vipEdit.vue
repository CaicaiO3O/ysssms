<template>
  <div class="vipEdit-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" size="mini" :inline-message='true'>
      <el-form-item label="推荐码" prop="memberHandphone" required>
        <el-input v-model="form.memberHandphone" disabled style="width: 200px;margin-right: 10px;"></el-input>{{form.smscode}}
      </el-form-item>
      <el-form-item label="手机号码" prop="memberHandphone" required>
        <el-input v-model="form.memberHandphone" disabled style="width: 200px;margin-right: 10px;"></el-input>我们将只会使用该手机号码，已短信的形式通知您参加调查
      </el-form-item>
      <el-form-item label="真实姓名" prop="memberRealname" >
        <el-input v-model="form.memberRealname" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="memberMail">
        <el-input v-model="form.memberMail" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="您的性别" prop="memberSex" required>
        <el-radio-group v-model="form.memberSex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年份" prop="memberBirYear">
        <el-date-picker
          style="width: 200px;"
          v-model="form.memberBirYear"
          type="year"
          placeholder="选择年份"
          value-format="yyyy">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="科室电话" prop="departmentstle">
        <el-input v-model="form.departmentstle" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker
          v-model="form.registerTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="从医年份" prop="workdate">
        <el-date-picker
          style="width: 200px;"
          v-model="form.workdate"
          type="year"
          placeholder="选择年份"
          value-format="yyyy">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="职称" prop="memberstation">
        <el-select v-model="form.zc_1" @change = "getStationTechnicalTitle(form.zc_1)" style="width: 98px;">
          <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
        </el-select>
        <el-select v-model="form.memberstation" style="width: 98px;">
          <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="证件号" prop="memberidcard">
        <el-input v-model="form.memberidcard" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      
      <el-form-item label="工作科室" prop="membersectionoffice">
        <el-select v-model="form.hospital_departments_1" style="width: 198px;" @change="getSonOffice(form.hospital_departments_1)">
          <el-option v-for="item in hospital_1_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
        </el-select>
        <el-select v-model="form.membersectionoffice" style="width: 198px;">
          <el-option v-for="item in hospital_2_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
        </el-select>
      </el-form-item>
        
      <el-form-item label="行政职位" prop="administrativeposition">
        <el-select v-model="form.administrativeposition" style="width: 200px;">
          <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="从医领域" prop="medical_field_2"> 
        <el-select v-model="form.medical_field_1" placeholder="请选择" multiple style="width:400px;margin-bottom: 10px;" @change="getSonFields2(form.medical_field_1)">
          <el-option v-for="item in field_1_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
        </el-select>
        <br />
        <el-select v-model="form.membertechnical" placeholder="请选择" multiple style="width: 400px;">
          <el-option v-for="item in field_2_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所在医院" prop="fkHospitalId">
        <el-select placeholder="请选择" v-model="form.memberProvince" style="width: 131px;" @change="getCityByProvince(form.memberProvince)">
          <el-option v-for="item in province_options" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="form.memberCity" style="width: 131px;" @change = "getDistrictByCity(form.memberProvince,form.memberCity)">
          <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="form.fkDistrictId" style="width: 130px;">
          <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <br>
        <el-select placeholder="请选择" style="width: 400px;margin-top: 10px;" v-model="form.fkHospitalId" @change="getHospitalById(form.fkHospitalId)">
          <el-option value="0" label="其他"></el-option>
          <el-option v-for="item in hospital_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <br />
        <el-input style="width: 400px;margin-top: 10px;" v-if="form.fkHospitalId == 0" v-model="form.inputhospital"></el-input>
      </el-form-item>
      <el-form-item label="医院信息:" v-if = "form.fkHospitalId != -1">
        <div>医院级别：{{level}}</div>
        <div>医院等级：{{grade}}</div>
        <div>医院性质：{{hospitalNature}}</div>
        <div>医院类型：{{hospitalType}}</div>
        <div>床位数：{{numberOfBeds}}</div>
      </el-form-item>
      
      <el-form-item label="加入的学会" prop="societyid">
        <el-select v-model="form.societyid" multiple placeholder="请填写您参加过的学会" class="meetingInput" style="width: 400px;">
          <el-option v-for="item in meeting_options" :label="item.societyname" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="最高学历" prop="memberEducation">
        <el-select v-model="form.memberEducation" style="width: 200px;">
          <el-option v-for="item in education_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="毕业时间" required prop="graduationTime">
        <el-date-picker v-model="form.graduationTime" type="year" placeholder="选择日期" value-format="yyyy" style="width: 200px;"></el-date-picker>
      </el-form-item>

      <el-form-item label="毕业院校" prop="graduationInstitutions">
        <el-select placeholder="请选择省份" v-model="form.province" @change="getGraduateList(form.province)">
          <el-option v-for="item in province_options" :label="item.provinceName" :key="item.provinceId" :value="item.provinceId"></el-option>
        </el-select>
        <el-select placeholder="请选择学校" v-model="form.graduationInstitutions">
          <el-option v-for="item in school_options" :label="item.graduatename" :key="item.graduateid" :value="item.graduateid"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="接听电话时间" prop="end_time" >
        <el-time-select
          placeholder="请选择起始时间"
          v-model="form.beginTime"
          style="width: 200px;"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '18:00',
          }">
        </el-time-select>
        <span style="margin: 0 12px;">到</span>
        <el-time-select
          placeholder="请选择结束时间"
          v-model="form.endTime"
          style="width: 200px;"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '18:00',
            minTime: form.beginTime
          }">
        </el-time-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="isload">保存</el-button>
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          memberHandphone: null,
          smscode: null,
          memberRealname:null,
          memberMail:null,
          memberSex: null,
          memberBirYear: null,
          departmentstle:null,
          workdate:null,
          zc_1:null,
          memberstation:null,
          memberidcard:null,
          administrativeposition:null,
          medical_field_1:null,
          membertechnical:null,
          hospital_departments_1:null,
          membersectionoffice:null,
          memberProvince:null,
          memberCity:null,
          fkDistrictId:null,
          fkHospitalId:null,
          societyid:null,
          memberEducation:null,
          graduationTime:null,
          endTime:null,
          beginTime:null,
          registerTime:null,
          memberhospital: null,
          inputhospital: null,
          province:null,
          graduationInstitutions:null,
        },
        rules: {
          memberHandphone: [
            { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
          memberRealname:[
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          memberMail:[
            { required: true, message: '请填写邮箱', trigger: 'blur' }
          ],
          memberSex:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          memberBirYear:[
            { required: true, message: '请选择出生年份', trigger: 'change' }
          ],
          departmentstle:[
            { required: true, message: '请填写科室电话', trigger: 'blur' }
          ],
          workdate:[
            { required: true, message: '请选择从医年份', trigger: 'change' }
          ],
          memberidcard:[
            { required: true, message: '请填写证件号', trigger: 'blur' }
          ],
          administrativeposition:[
            { required: true, message: '请选择行政职位', trigger: 'change' }
          ],
          memberstation:[
            { required: true, message: '请选择职称', trigger: 'change' }
          ],
          membertechnical:[
            { required: true, message: '请选择从医领域', trigger: 'change' }
          ],
        },
        zc_1_options:[],
        zc_2_options:[],
        xzzw_options:[],
        field_1_options:[],
        field_2_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        province_options:[],
        city_options:[],
        region_options:[],
        hospital_options:[],
        education_options:[],
        school_options:[],
        meeting_options:[],
        level:null,
        grade:null,
        hospitalNature:null,
        hospitalType:null,
        numberOfBeds:null,
        
        isload: false,
      };
    },
    mounted(){
      this.getStationDuties();
      this.getAdminiStraion();
      this.getParentFields();
      this.getParentOffice();
      this.getProvince();
      this.getMemberInfoForEdit();
      this.getEducational();
      this.getSociety();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isload = true;
//          console.log(this.form_1.inputhospital);
            var fkHospitalId = null;
            if(this.form.inputhospital == ""){
              fkHospitalId = Number(this.form.fkHospitalId);
              this.form.memberhospital = "";
            }else{
              this.form.memberhospital = this.form.inputhospital;
              this.form.fkHospitalId = "0";
              fkHospitalId = null;
            }
            var memberSex = null;
            if(this.form.memberSex == 0){
              memberSex = "男"
            }else{
              memberSex = "女"
            }
            this.axios.post(this.common.getApi() + '/sys/api/member/editMember',{
              params:{
                id: Number(sessionStorage.getItem("userid")),
                memberRealname: this.form.memberRealname,
                memberMail: this.form.memberMail,
                memberSex: memberSex,
                memberBirYear: Number(this.form.memberBirYear),
                departmentstle: this.form.departmentstle,
                registerTime: this.form.registerTime,
                workdate: Number(this.form.workdate),
                memberstation: Number(this.form.memberstation),
                memberidcard: this.form.memberidcard,
                membersectionoffice: Number(this.form.membersectionoffice),
                administrativeposition: Number(this.form.administrativeposition),
                membertechnical: this.form.membertechnical.join(','),
                memberProvince: Number(this.form.memberProvince),
                memberCity: Number(this.form.memberCity),
                fkDistrictId: Number(this.form.fkDistrictId),
                fkHospitalId: fkHospitalId,
                memberhospital: this.form.memberhospital,
                societyid: this.form.societyid.join(','),
                memberEducation: Number(this.form.memberEducation),
                graduationTime: this.form.graduationTime,
                graduationInstitutions: this.form.graduationInstitutions,
                beginTime: Number(this.form.beginTime.slice(0,2)),
                endTime: Number(this.form.endTime.slice(0,2)),
              },
            }).then((res) => {
              this.isload = false                
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      getMemberInfoForEdit(){
        var id = sessionStorage.getItem("userid");
        this.axios.get(this.common.getApi() + '/sys/api/member/getMemberInfoForEdit',{
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
            this.form.memberHandphone = res.data.obj.memberHandphone;
            this.form.smscode = res.data.obj.smscode;
            this.form.memberRealname = res.data.obj.memberRealname;
            this.form.memberMail = res.data.obj.memberMail;
            if(res.data.obj.memberSex == '男'){
              this.form.memberSex = 0;
            }else{
              this.form.memberSex = 1;
            }
            this.form.memberBirYear = res.data.obj.memberBirYear.toString();
            this.form.departmentstle = res.data.obj.departmentstle;
            this.form.workdate = res.data.obj.workdate.toString();
            this.form.memberstation = res.data.obj.memberstation;
            this.form.memberidcard = res.data.obj.memberidcard;
            this.form.administrativeposition = res.data.obj.administrativeposition;
            console.log(this.form.memberstation)
            this.getStationById();
            this.form.membertechnical = res.data.obj.membertechnical;
            if(this.form.membertechnical.length != 0){
              this.form.membertechnical = this.form.membertechnical.split(',');
              var a = [];
              for(var i = 0; i < this.form.membertechnical.length; i++){
                a.push(Number(this.form.membertechnical[i]));
              }
              this.form.membertechnical = a;
              console.log(this.form.membertechnical);
              this.getFieldsById();
            }
            this.form.membersectionoffice = res.data.obj.membersectionoffice;
            this.getSectionOfficeById();
            this.form.memberProvince = res.data.obj.memberProvince;
            this.getCityByProvince(this.form.memberProvince)
            this.form.memberCity = res.data.obj.memberCity;
            this.getDistrictByCity(this.form.memberProvince,this.form.memberCity);
            this.form.fkDistrictId = res.data.obj.fkDistrictId;
            if(res.data.obj.fkHospitalId != 0){
              this.form.fkHospitalId = res.data.obj.fkHospitalId;              
            }else{
              this.form.fkHospitalId = res.data.obj.fkHospitalId.toString();              
            }
            console.log(this.form.fkHospitalId);
            this.form.memberhospital = res.data.obj.memberhospital;
//          this.form.inputhospital = res.data.obj.memberhospital;
            this.form.memberEducation = res.data.obj.memberEducation;
            this.form.graduationTime = res.data.obj.graduationTime;
            if(res.data.obj.beginTime < 10){
              this.form.beginTime = "0"+ res.data.obj.beginTime + ":00"
            }else if(res.data.obj.beginTime >= 10){
              this.form.beginTime = res.data.obj.beginTime + ":00"
            }
            if(res.data.obj.endTime < 10){
              this.form.endTime = "0"+ res.data.obj.endTime + ":00"
            }else if(res.data.obj.endTime >= 10){
              this.form.endTime = res.data.obj.endTime + ":00"
            }
            
            this.getHospitalById(this.form.fkHospitalId);    
            
            this.form.registerTime = res.data.obj.registerTime;
            this.form.societyid = res.data.obj.societyid;
            if(this.form.societyid.length != 0){
              this.form.societyid = this.form.societyid.split(',');
              var b = [];
              for(var i = 0; i < this.form.societyid.length; i++){
                b.push(Number(this.form.societyid[i]));
              }
              this.form.societyid = b;
              console.log(this.form.societyid);
            }
            this.form.graduationInstitutions = res.data.obj.graduationInstitutions;
            this.getGraduateById(Number(this.form.graduationInstitutions));
          }
        })                 
      },
      getStationById(){
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationById',{
          params:{
            params:{
              id: this.form.memberstation
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.zc_1 = res.data.obj.parentid;
            this.getStationTechnicalTitle(this.form.zc_1)
          }
        })        
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
      //获取从医领域一级
      getParentFields(){
        this.axios.get(this.common.getApi() + '/sys/api/fields/getParentFields','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.field_1_options = res.data.obj;
          }
        })        
      },
      getSonFields1(parentId){
        console.log(parentId);
          this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
            params:{
              params:{
                parentId:parentId,
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.field_2_options = this.field_2_options.concat(res.data.obj);
            }
          })
        //}
        console.log(this.field_2_options);
      },
      getSonFields2(parentId){
        console.log(parentId);
        this.field_2_options = [];
        for(var i = 0; i < parentId.length; i++){
          this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
            params:{
              params:{
                parentId:parentId[i],
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.field_2_options = this.field_2_options.concat(res.data.obj);
            }
          })
        }
        console.log(this.field_2_options);
      },      
      getFieldsById(){
        console.log(this.form.membertechnical);
        this.form.medical_field_1 = [];
        for(var i = 0; i < this.form.membertechnical.length;i++){
          this.axios.get(this.common.getApi() + '/sys/api/fields/getFieldsById',{
            params:{
              params:{
                id: Number(this.form.membertechnical[i])
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              if(this.form.medical_field_1.indexOf(res.data.obj.parentid) == -1){
                this.form.medical_field_1.push(res.data.obj.parentid);
                this.getSonFields1(res.data.obj.parentid);
              }
            }
          })
        }
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
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSonOffice',{
          params:{
            params:{
              parentId:parentId,
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
      getSectionOfficeById(){
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSectionOfficeById',{
          params:{
            params:{
              id: this.form.membersectionoffice
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.hospital_departments_1 = res.data.obj.parentid;
            this.getSonOffice(this.form.hospital_departments_1)
          }
        })        
      },      
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
      getHospitalById(id){
        if(this.form.fkHospitalId != 0){
          this.form.inputhospital = ""
          this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospitalById',{
            params:{
              params:{
                id: id
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.level = res.data.obj.level;
              this.grade = res.data.obj.grade;
              this.hospitalNature = res.data.obj.hospitalNature;
              this.hospitalType = res.data.obj.hospitalType;
              this.numberOfBeds = res.data.obj.numberOfBeds;
            }
          })
        }
      },
      getSociety(){
        this.axios.get(this.common.getApi() + '/sys/api/society/getSociety','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res);
          if(res.data.code == '200'){
            this.meeting_options = res.data.obj
          }
        })             
      },
      getGraduateList(provinceId){
        this.school_options = null;
        this.form.school = null;
        this.axios.get(this.common.getApi() + '/sys/api/graduate/getGraduateList',{
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
            this.school_options = res.data.obj;
          }
        })        
      },
      getGraduateById(id){
        this.axios.get(this.common.getApi() + '/sys/api/graduate/getGraduateById',{
          params:{
            params:{
              id: id
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.province = res.data.obj.provinceid;
            this.getGraduateList(this.form.province);
          }
        })        
      }
    }
  }  
</script>

<style>
</style>