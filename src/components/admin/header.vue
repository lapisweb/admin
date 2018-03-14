<template>
  <div class="adminhader">
    <header class="header white-bg">
      <a href="./#/admin/index" class="logo">
        {{ $t('header.header') }}
      </a>
      <div class="sidebar-toggle-box">
        <div  data-placement="right" class="fa fa-bars tooltips">
        </div>
      </div>
      <nav class="nav notify-row" id="top_menu">
        <ul class="nav top-menu">
          <li>
            <Row type="flex" justify="center" align="middle" class="switch-language-row1">
              <RadioGroup :value="lang" @on-change="handleSwitch" vertical>
                <Radio label="zh-CN">
                  <span>中文简体</span>
                </Radio>
                <Radio label="en-US">
                  <span>English</span>
                </Radio>
              </RadioGroup>
            </Row>
          </li>
          <!--<Badge count="2">-->
            <li id="header_notification_bar" class="dropdown">
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <i class="layui-icon">&#xe62b;</i>
                <span class="badge bg-warning">
                            <!--7-->
              </span>
              </a>
            </li>
          <!--</Badge>-->

        </ul>
      </nav>
      <div class="top-nav ">
        <ul class="nav pull-right top-menu">

          <li class="dropdown">
            <Dropdown trigger="click"  style="margin-left: 20px">
              <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle">
                <img alt="" src="../../assets/img/admin/touxiang.png">
                {{userList.loginName}}
                <Icon type="arrow-down-b"></Icon>
              </a>
                <DropdownMenu style="max-width: 300px;
    min-width: 160px;
  position: absolute;
  top:20px;
  left: -160px;
    width: 235px;
    padding: 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.176);
    border: none;
    border-radius: 4px;
    -webkit-border-radius: 4px;background-color: #fff" slot="list">
                  <DropdownItem><a href="#/admin/profile"><i class="layui-icon">&#xe88c;</i> &nbsp;    {{ $t('header.information') }}</a></DropdownItem>
                  <DropdownItem divided><a href="#/admin/modifyInfo"><i class="layui-icon">&#xe637;</i>&nbsp;   {{$t('header.setting')}}</a></DropdownItem>
                  <DropdownItem   divided  ><a class="lagout" @click="logout()" ><i  class="layui-icon">&#xe63f;</i>&nbsp;   {{$t('header.logout')}}</a></DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
//  import '../../assets/js/admin/jquery-1.8.3.min'
  export default{
    name: 'index',
    data: function(){
      return {
        lang: 'en-US',
        userList:{},
      }
    },
    methods: {
      handleSwitch (lang) {
        this.lang = lang;
        localStorage.lang = lang;
        let language
        if(lang=='zh-CN'){
          language='zh_CN'
        }else{
          language='en_US'
        }

        let vm=this;
        this.$http({
          url:baseURL+'/changeLanguage.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            language:language
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          }
        })
          .catch(function (response) {
            console.log(response)
          })
        window.location.reload();
      },
      submit: function () {
      },
      toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
          (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
          }
          else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          }
          else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();
          }
          else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
        }
        else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          }
          else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      },
      getLoginUser(event) {
        let vm = this;
        this.$http({
          url: baseURL+'/getLoginUser.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }).then((response) => {
          if (response.body.errors) {
          } else {
            if (response.body.code == 0) {
              vm.userList = response.body.user;
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      logout: function () {
        this.$http({
          url:baseURL+'/logout.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          })
        }).then((response) => {
          location.href = './#/';
        })
          .catch(function (response) {
            console.log(response)
          })
      },
    },
    computed: {
      placeholderText () {
        return this.$t('placeholderText');
      },
      placeholderDate () {
        return this.$t('placeholderDate');
      }
    },
    created: function(){
      this.lang = localStorage.lang || 'zh-CN';
      this.getLoginUser();
    },
    wacth:{
      '.lagout':function (val) {
      }
    }
  }
</script>
<style>
  @import "../../assets/css/admin/layui.css";
  @import "../../assets/css/admin/style.css";
  @import "../../assets/css/admin/style-responsive.css";
  @import "http://www.jq22.com/jquery/bootstrap-3.3.4.css";
  @import "../../assets/css/admin/morris.js-0.4.3/morris.css";
  @import "../../assets/css/admin/clndr.css";
  @import "http://www.jq22.com/jquery/font-awesome.4.6.0.css";

  .demo-badge{
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
  }
  .ivu-modal{
    margin: 0;
  }
  th,td{
    text-align: center;
  }
  .ivu-radio-group-vertical .ivu-radio-wrapper {
    display: inline;
  }
  .ivu-dropdown-item >a{
    color: #495060;
  }
  .ivu-dropdown-item:hover{
    background-color: #fff;
  }
  a:hover{
    text-decoration: none;
  }
  .ivu-dropdown-item:hover i {
    color: #72d0eb;
  }
</style>
