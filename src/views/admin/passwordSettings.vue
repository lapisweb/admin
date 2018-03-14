<template>
  <div style="margin-left: 270px">
    <div class="passwordSettings">
      <div class="password">
        <div class="password-header">
          <p>{{$t('passwordSettings.header')}}</p>
        </div>
        <div class="password-content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline :label-width="200">
            <FormItem :label="this.$t('passwordSettings.oldpass')">
              <Input  type="password" v-model="formValidate.oldpass" :placeholder="this.$t('passwordSettings.placeholderoldpass')"></Input>
            </FormItem>
            <FormItem :label="this.$t('passwordSettings.newpass')" prop="newpass">
              <Input  type="password" v-model="formValidate.newpass" :placeholder="this.$t('passwordSettings.placeholdernewpass')"></Input>
            </FormItem>
            <FormItem :label="this.$t('passwordSettings.passwdCheck')" prop="passwdCheck">
              <Input  type="password" v-model="formValidate.passwdCheck" :placeholder="this.$t('passwordSettings.placeholderpasswdCheck')"></Input>
            </FormItem>
          </Form>
          <Button style="margin-left: 50%;margin-bottom:24px; " type="success" @click="handleSubmit('formValidate')">{{$t('passwordSettings.submit')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('passwordSettings.placeholdernewpass')));
        } else {
          if (this.formValidate.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('passwordSettings.placeholderpasswdCheck')));
        } else if (value !== this.formValidate.newpass) {
          callback(new Error(this.$t('passwordSettings.messagepasswdCheck')));
        } else {
          callback();
        }
      };
      return {
        letparentName:'',
        letname:'',
        menuList:{},
        userList:{},
        formValidate: {
          oldpass: '',
          newpass:'',
          passwdCheck:'',
        },
        ruleValidate: {
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      getMenuList (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/getMyManageMenu.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          })
        }).then((response) => {
          if (response.body.errors){
            parent.location.href ='./#/';
          } else {
            if (response.body.code == 0){
              vm.menuList=response.body.menu.childMenus
              vm.menuList.forEach(function (val,index) {
                if(val.id=='19'){
                  vm.letname=val.name
                }
                val.childMenus.forEach(function (val1,index1) {
                  if(val1.id=='19'){
                    vm.letname=val1.name
                    vm.letparentName=val1.parentName
                  }
                })
              })
              let by = function(name){
                return function(o, p){
                  var a, b;
                  if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                      return 0;
                    }
                    if (typeof a === typeof b) {
                      return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                  }
                  else {
                    throw ("error");
                  }
                }
              }
              vm.menuList.sort(by("orderNum"));
              vm.menuList.forEach(function (val,index) {
                val.childMenus.sort(by("orderNum"))
              })
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let vm=this
            this.$http({
              url:baseURL+'/changePass.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                oldpass:vm.formValidate.oldpass,
                newpass:vm.formValidate.newpass
              })
            }).then((response) => {
              if(response.body.code==0){
                this.$Message.success('Success!');
              }else{
                alert(response.body.errors)
              }
            })
              .catch(function (response) {
                console.log(response)
              })

          } else {
            this.$Message.error('Fail!');
          }
        })
      },
    },
    created: function(){
      this.getMenuList();
    },
  }
</script>
<style>
  .passwordSettings .ivu-form .ivu-form-item-label{
    color: #89817e;
    font-size: 14px;
    text-align: left;
  }
  .passwordSettings .ivu-form-item {
    width: 70%!important;
    display: inline-block;
    margin-left: 10%;
  }
  .passwordSettings .password-header p{
    padding: 25px 20px;
  }
  .passwordSettings .password-header{
    width: 100%;
    height: 60px;
    background-color: #54b6d1;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .passwordSettings .password{
    width: 98%;
    display: flex;
    min-height: 75vh;
    flex-direction: column;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 4px;
  }
  body{
    background-color: #e5e6e6!important;
  }
  .passwordSettings{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
  }
  .passwordSettings .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .passwordSettings .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .passwordSettings .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .passwordSettings .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .passwordSettings .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
