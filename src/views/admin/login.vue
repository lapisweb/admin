<template>
  <div class="login">
    <div class="beg-login-bg">
      <div class="beg-login-box">
        <header>
          <h1>{{$t('login.header')}}</h1>
        </header>
        <div class="beg-login-main">
          <form  class="layui-form" method="post"><input name="__RequestVerificationToken" type="hidden" value="fkfh8D89BFqTdrE2iiSdG_L781RSRtdWOH411poVUWhxzA5MzI8es07g6KPYQh9Log-xf84pIR2RIAEkOokZL3Ee3UKmX0Jc8bW8jOdhqo81" />
            <div class="layui-form-item">
              <label class="beg-login-icon">
                <i class="layui-icon">&#xe609;</i>
              </label>
              <input type="text" name="username" lay-verify="userName" v-model="username" autocomplete="off" :placeholder="this.$t('login.userName')" class="layui-input">
            </div>
            <div class="layui-form-item">
              <label class="beg-login-icon">
                <i class="layui-icon">&#xe764;</i>
              </label>
              <input type="password" name="password" lay-verify="password" v-model="password" autocomplete="off" :placeholder="this.$t('login.password')" class="layui-input">
            </div>
            <div class="layui-form-item">
              <label class="beg-login-icon" >
                <i class="layui-icon">&#xe616;</i>
              </label>
              <input type="text" id="Txtidcode" :placeholder="this.$t('login.validateCode')" v-model="yanzheng" class="layui-input3 txtVerification" />
              <span id="idcode"></span>
              <div class="yanzheng">
                <img alt="" :src=img id="authImg" align="absmiddle">
                <a href="javascript:void(0);" @click="refresh"><span style="font-size: 12px" mce_style="font-size:12px">{{$t('login.refresh')}}</span></a>
              </div>
            </div>
            <div class="layui-form-item">
              <div class="beg-pull-right">
                <div id="btns"  @click='send' class="layui-btn layui-btn-primary" lay-submit lay-filter="login">
                  {{$t('login.login')}}
                </div>
              </div>
              <div class="beg-clear"></div>
            </div>
          </form>
        </div>
        <footer>
          <p><img src="../../assets/img/admin/laison.jpg" alt=""> © www.laisontech.com</p>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  import router from '@/router';
  export default{
    name: 'login',
    data: function () {
      return {
        img:baseURL+'/validateCodeServlet?t='+ Date.parse(new Date()) + "" + Math.random(),
        username: '',
        password: '',
        yanzheng: ''
      }
    },
    methods: {
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
              location.href ='./#/admin/index';
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      send() {
        let vm=this;
        this.$http.post(baseURL+'/login.do', "username=" + vm.username + "&password=" + vm.password + "&validate=" + vm.yanzheng +"&loginFor="+ vm.username , {
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            if (response.body.code == 0){
              location.href = "./#/admin/index"
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      refresh() {
        $("#authImg").attr(
          'src',
          baseURL+"/validateCodeServlet?t=" + Date.parse(new Date()) + "" + Math.random())
      },
    },
    created: function(){
      this.getMenuList();
    },
  }
</script>
<style>
  .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .login .layui-form-item{
    margin-bottom:15px;
    clear:both;
    *zoom:1;
  }
  .login .layui-form-item:after{
    content:'\20';
    clear:both;
    *zoom:1;
    display:block;
    height:0;
  }
  .login .layui-form-item .layui-inline{
    margin-bottom:5px;
    margin-right:10px;
  }

  .login .layui-input,.login .layui-select,.login .layui-textarea{
    height:38px;
    line-height:38px;
    line-height:36px\9;
    border:1px solid #e6e6e6;
    background-color:#fff;
    color: initial!important;
    font-size:12px;
    border-radius:2px;
  }
  .login .layui-input,.login .layui-textarea{
    display:block;
    width:100%;
    padding-left:10px
  }
  .login .layui-input3{
    width:200px;
    height: 38px;
    font-size:12px;
    color: initial!important;
  }
  .login .layui-btn .layui-icon{
    font-size:18px;
    vertical-align:bottom;
  }

  .login .layui-btn-primary:hover{
    border-color:#009688;
    color:#333;
  }
  .login .layui-btn{
    display:inline-block;
    height:38px;
    line-height:38px;
    padding:0 18px;
    background-color:#fff;
    color:#fff;
    white-space:nowrap;
    text-align:center;
    font-size:14px;
    border:none;
    border-radius:2px;
    cursor:pointer;
    opacity:.9;
    filter:alpha(opacity=90);
  }
  .login .layui-btn-primary{
    border:1px solid #C9C9C9;
    background-color:#fff;
    color:#555;
  }
  .login .yanzheng {
    display: inline-block;
    margin-left:2%;
  }
  .login .beg-login-bg {
    height: 100vh;
    min-height: 600px;
    width: 100%;
    padding-top: 20vh;
    background-color: #393D49;
  }
  .login .beg-login-box {
    width: 450px;
    height: 350px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.407843);
    border-radius: 10px;
    color: aliceblue;
  }
  .login .beg-login-box header {
    height: 39px;
    line-height: 39px;
    padding: 8%;
    border-bottom: 1px solid aliceblue;
  }
  .login .beg-login-box header h1 {
    height: 39px;
    text-align: center;
    font-size: 25px;
    line-height: 39px;
    margin-top: -6%;
  }
  .login .beg-login-box .beg-login-main {
    height: 185px;
    padding: 30px 60px 0;
    margin-top: 10px;
  }

  .login .beg-login-main .layui-form-item {
    position: relative;
  }

  .login .beg-login-main .layui-form-item .beg-login-icon {
    position: absolute;
    color: #cccccc;
    top: 10px;
    left: 10px;
  }

  .login .beg-login-main .layui-form-item input {
    padding-left: 34px;
  }

  .login .beg-login-box footer {
    height: 35px;
    padding: 10px 10px 0 10px;
    margin-top: 33px;

  }
  .login .beg-login-box footer p img{
    width: 50px;
    height: 15px;
  }
  .login .beg-login-box footer p {
    line-height: 35px;
    width: 380px;
    text-align: center;
  }

  .login .beg-pull-left {
    float: left !important;
  }

  .login .beg-pull-right {
    float: right !important;
  }

  .login .beg-clear {
    clear: both;
  }

  .login .beg-login-remember {
    line-height: 38px;
  }

  .login .beg-login-remember .layui-form-switch {
    margin-top: 0px;
  }

  .login .beg-login-code-box {
    position: relative;
    padding: 10px;
  }

  .login .beg-login-code-box input {
    position: absolute;
    width: 100px;
  }

  .login .beg-login-code-box img {
    cursor: pointer;
    position: absolute;
    left: 115px;
    height: 38px;
  }
</style>
