<template>
    <div>
        <div class="login_wraper">
            <div class="box">
                <span>用户名</span><input type="text" v-model="account">
            </div>
            <div class="box">
                <span>密码</span><input type="text" v-model="password">
            </div>
            <div class="box">
              <span>验证码</span><input type="text" v-model="pin">
            </div>
            <div class="pin">
              <img alt="" src="http://api.laison.com:8080/validateCodeServlet" id="authImg" align="absmiddle">
            </div>
            <input type="submit" value="提交" @click="send" id="send">
        </div>
    </div>
</template>
<script>
    import router from '@/router';
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
                        console.log(response.body)
                    })
                    .catch(function (response) {
                        console.log(response)
                    })
            }
//          send: function () {
//            let vm=this;
//            fetch('http://api.laison.com:8080/login.do', {
//
//              credentials:true,
//              method: 'POST',
//              headers: {
//                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//              },
//              body: "username="+vm.account+"&password="+vm.password+"&validate="+vm.pin,
//            }).then(res=>res.text())
//              .then(function (data) {
//                if (data) {
//                  console.log(data)
//                }
//              })
//          }
        }
    }
</script>
<style>
    .login_wraper{
        width:500px;
        height:300px;
        border:1px solid #d2d2d2;
        margin: 100px auto;
        background: #c1c2ff;
        padding:50px;
        box-sizing: border-box;
    }
    .box{
        height:50px;
    }
    span{
        display: block;
        width:100px;
        height:30px;
        line-height: 30px;
        float: left;
        text-align: center;
        color: #f2f2f2;
    }
    input{
        display:block;
        width:260px;
        height:30px;
        border-radius: 5px;
        float: left;
        border:1px solid #dddddd;
        color:#5e5e5e;
    }
    #send{
        width:335px;
        height:40px;
        margin-left: 28px;
        color:#fff;
        background: #4080ff;
        border:0;
        font-size: 16px;
    }
    .register{
        width:70px;
        height:40px;
        margin-top: 50px;
        margin-left: 280px;

    }
    a{
        text-decoration: none;
        color:#fff;
    }
</style>
