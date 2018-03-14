<template>
  <div style="margin-left:270px;">
    <div class="modifyInfo">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <section class="panel">
            <div class="bio-graph-heading">
              <font style="vertical-align: inherit;">Aliquam ac magna metus。Nam sed arcu non tellus fringilla fringilla ut vel ispum。Aliquam ac magna metus。</font></div>
            <div class="panel-body bio-graph-info">
              <h1><font style="vertical-align: inherit;">{{$t('modifyInfo.details')}}</font></h1>
              <div class="row" style="margin-left: 0;">
                <div class="bio-row">
                  <span><font style="text-align: left;margin-left:-12px;font-weight: bold; ">{{$t('modifyInfo.icon')}}</font></span>
                  <div class="img_pro">
                    <img class="avatar" v-if="avatarUrl1" :src="avatarUrl1" v-show="true" >
                  </div>
                  <div class="item">
                    <Upload :url="url" img-format="png"
                            @crop-success="cropSuccess"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            field="avatar1"
                            ki="0"
                            v-model="show1"
                            :headers="headers"
                            :params="otherParams"></Upload>
                  </div>
                </div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline :label-width="100">
                  <FormItem :label="this.$t('modifyInfo.remarks')" style="width: 90%;" prop='remarks'>
                    <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                  </FormItem>
                  <FormItem :label="this.$t('profile.name')" style="width: 90%;" prop='loginName'>
                    <Input v-model="formValidate.loginName"  readonly  ></Input>
                  </FormItem>
                  <FormItem :label="this.$t('profile.nickName')" style="width: 90%;" prop='nickName'>
                    <Input v-model="formValidate.nickName" ></Input>
                  </FormItem>
                  <FormItem :label="this.$t('profile.mobile')" style="width: 90%;" prop='mobile'>
                    <Input v-model="formValidate.mobile" ></Input>
                  </FormItem>
                  <FormItem :label="this.$t('profile.email')" style="width: 90%;" prop='email'>
                    <Input v-model="formValidate.email" ></Input>
                  </FormItem>
                  <FormItem  :label="this.$t('profile.deptId')" prop="deptId" style="width: 90%;">
                    <Input v-model="formValidate.deptId"  readonly  ></Input>
                  </FormItem>
                </Form>
                <Button style="margin-left: 50%;margin-bottom:24px; " type="success" @click="handleSubmit('formValidate')">{{$t('passwordSettings.submit')}}</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Upload from './Upload'
  export default {
    data () {
      return {
        url:'',
        letparentName:'',
        letname:'',
        menuList:{},
        stationlist:[],
        companylist:{},
        userList:{},
        formValidate: {
          loginName: '',
          companyCode:'',
          Code:[],
          deptId:'',
          email:'',
          mobile:'',
          nickName:'',
          remarks:'',
          stationCode:'',
          photo:'',
        },
        ruleValidate: {
          loginName: [
            { required: true, message: this.$t('modifyInfo.messagename'), trigger: 'blur' },
          ],
          deptId: [
            { required: true, message: this.$t('modifyInfo.messagedeptId'), }
          ],
          email: [
            { required: true, message: this.$t('modifyInfo.messageemail'), trigger: 'blur' },
            { type: 'email', message: this.$t('modifyInfo.messageemail1'), trigger: 'blur' }
          ],
          mobile: [
            {required: true, message: this.$t('modifyInfo.messagemobile'), trigger: 'blur'},
          ],
          nickName: [
            { required: true, message: this.$t('modifyInfo.messagenickName'), trigger: 'blur' },
          ],
          remarks: [
            { required: true, message: this.$t('modifyInfo.messageremarks'), trigger: 'blur' },
          ],
        },
        show1: false,
        avatarUrl1: '',
        data:[],
        data1:[],
        otherParams: {
          token: '123456798',
          name: 'img'
        },
        headers: {
          smail: '*_~'
        }
      }
    },
    methods:{
      getLoginUser (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/getLoginUser.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          })
        }).then((response) => {
          if (response.body.errors){
          } else {
            if (response.body.code == 0){
              vm.userList = response.body.user;
              this.formValidate.loginName=vm.userList.loginName
              this.formValidate.companyCode=vm.userList.companyCode
              this.formValidate.stationCode=vm.userList.stationCode
              this.formValidate.email=vm.userList.email
              this.formValidate.mobile=vm.userList.mobile
              this.formValidate.nickName=vm.userList.nickName
              this.formValidate.remarks=vm.userList.remarks
              this.formValidate.deptId=vm.userList.dept.name
              this.avatarUrl1='http://192.168.0.172:8888/'+this.userList.photo
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      handleSubmit (name) {
        let vm=this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/updateUser.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                id:vm.userList.id,
                loginName:vm.formValidate.loginName,
                companyCode:vm.formValidate.Code[vm.formValidate.Code.length-1],
                email:vm.formValidate.email,
                mobile:vm.formValidate.mobile,
                nickName:vm.formValidate.nickName,
                remarks:vm.formValidate.remarks,
              })
            }).then((response) => {
              if(response.body.code==0){
              }else{
                alert(response.body.errors)
              }
            })
              .catch(function (response) {
                console.log(response)
              })
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      toggleShow1() {
        let {show1} = this;
        this.show1 = !show1;
      },
      cropSuccess(data, field, key) {
        if (field == 'avatar1') {
          this.avatarUrl1 = data;
        }
      },
      cropUploadSuccess(data, field, key) {
        console.log('-------- 上传成功 --------');
        console.log(data);
        console.log('field: ' + field);
        console.log('key: ' + key);
      },
      cropUploadFail(status, field, key) {
        console.log('-------- 上传失败 --------');
        console.log(status);
        console.log('field: ' + field);
        console.log('key: ' + key);
      },
    },
    created: function(){
      this.getLoginUser();
    },
    components : {
      'Upload':Upload,
    },
  }
</script>
<style>
  .modifyInfo .ivu-form .ivu-form-item-label{
    color: #89817e;
    font-size: 14px;
    text-align: left;
  }
  .vicp-step1{
    width: 100px;
  }
  .bio-row{
    width: 100%!important;
  }
  .item{
    margin-left: 30%!important;
  }
  .img_pro{
    margin-left: 10%!important;
  }
  .item,.img_pro{
    display: inline-block!important;
  }
  .wrap {
    margin-bottom: 5px;
  }
  .img_pro{
    margin-top: 20px;
  }
  .img_pro img{
    border-radius:100%;
    border: 1px solid red;
  }
  body{
    background-color: #e5e6e6!important;
  }
  .modifyInfo .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border:none!important;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  }
  .modifyInfo .panel panel-body .row{
    margin-left: 0px!important;
  }
  .modifyInfo>.row{
    width: 100%;
    margin-top: 20px;
  }

  .modifyInfo{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
  }
  .modifyInfo .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .modifyInfo .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .modifyInfo .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .modifyInfo .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .modifyInfo .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
