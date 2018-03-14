<template>
  <div>
    <div>
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="loginbox">
        <div class="chang">
          <p>welcome</p>
          <p>login</p>
        </div>
        <div class="photo"></div>
        <div class="loginimg"></div>
        <form>
          <div class="heng">
            <div class="img">
              <img src="../../assets/img/icon1.png" alt="">
            </div>
            <p>User</p>
            <input type="text" id='username' name="username" v-model="account">
          </div>
          <div class="heng">
            <div class="img">
              <img src="../../assets/img/icon2.png" alt="">
            </div>
            <p>Password</p>
            <input type="text" id='password' name="password" v-model="password">
          </div>
          <div class="heng">
            <div class="img">
              <img src="../../assets/img/icon3.png" alt="">
            </div>
            <p>PIN</p>
            <input type="text" name="validate" size="10" v-model="pin">
            <div class="pin">
              <img alt="" src="http://api.laison.com:8080/validateCodeServlet" id="authImg" align="absmiddle">
            </div>
          </div>
          <div class="login" @click="send()">
            <p>sign in</p>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script>
  import router from '@/router';
//  import "../../assets/js/index.js";
  export default{
    name: 'login',
    data: function () {
      return {
        account: '',
        password: '',
        pin:'',
      }
    },
    methods: {
      send: function () {
        let vm=this;
        this.$http.post('http://api.laison.com:8080/login.do',"username="+vm.account+"&password="+vm.password+"&validate="+vm.pin,{
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },

        }).then((response) => {
          if(response.body.errors){
            alert(response.body.errors)
          }else{
            alert(response.body.msg)
            if(response.body.code==0){
              location.href="./#/index/index";
            }
          }

        })
          .catch(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>
<style>
  .loginbox{
    height:400px;
    width:530px;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    background:#fff;
    box-shadow: 0 0 8px 1px #888;
  }
  .chang{
    height:24px;
    width:60%;
    border:1px solid #666;
    position:absolute;
    left:50%;
    margin-left:-30%;
    background: #fff;
    top:-12px;
  }
  .chang p{
    line-height: 24px;
    padding:0 9%;
  }
  .chang p:first-child{
    float:left;
  }
  .chang p:nth-child(2){
    float:right;
    padding-right:10%;
  }
  .photo{
    height:70px;
    width:70px;
    background-image: url("../../assets/img/4.jpg");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    position: absolute;
    left:50%;
    margin-left:-35px;
    top:-37px;
  }
  .loginimg{
    height:110px;
    width:100%;
    background-image: url("../../assets/img/login2.png");
    background-position: center -140px;
  }
  .logo{
    width:190px;
    height:40px;
    margin-top:20px;
    margin-left:20px;
  }
  .logo img{
    width:100%;
  }
  .heng{
    height:45px;
    width:65%;
    margin:15px auto;
    background: rgba(255,255,255,0.2);
  }
  .heng:first-child{
    margin-top:30px;
  }
  .heng .img{
    height:100%;
    width:10%;
    float:left;
    margin-right: 10px;
  }
  .heng .img img{
    margin-top: 20%;
    width:100%;
  }
  .heng p{
    width:20%;
    line-height: 50px;
    float:left;
    font-size:12px;
    font-weight: bold;
  }
  .heng input{
    height:36px;
    width:63%;
    float:left;
    margin-top: 4px;
    border-radius: 4px;
    border:1px solid #ccc;
  }
  .heng:nth-child(3) input{
    width:35%;
  }
  .heng .pin{
    width:20%;
    height:50px;
    margin-top: 9px;
    margin-left: 10px;
    float: left;
  }
  .heng .pin img{
    width:100%;
  }
  .login{
    height:35px;
    width:65%;
    margin:15px auto;
    border-radius: 4px;
    line-height: 35px;
    text-align: center;
    /*border:1px solid #ccc;*/
    background: linear-gradient(to top,#B6B6B7,#F0F0F0);
  }
  .login p{
    font-size: 14px;
    color: #000;
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    text-align: center;
  }
  @media (max-width:768px) {
    .heng{
      width:80%;
    }
    .loginbox{
      height:400px;
      width:300px;
    }
    .heng .img img{
      margin-top: 40%;
    }
    .heng p{
      width:25%;
    }
    .heng input{
      width:60%;
      height:30px;
      margin-top: 10px;
    }
    .logo{
      display:none;

    }
    footer p{
      display: none;
    }
  }
</style>
