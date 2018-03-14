<template>
  <div style="margin-left:270px;">
    <div class="profile">
      <div class="row">
        <div class="col-lg-4 col-md-5">
          <div class="card card-user">
            <div class="image">
              <img src="../../assets/img/admin/background.jpg" alt="..."/>
            </div>
            <div class="content">
              <div class="author">
                <!--<img class="avatar border-white" src="../../assets/img/admin/face-2.jpg" alt="..."/>-->
                <img class="avatar border-white" :src="avatarUrl1" alt="..."/>
                <div>
                  <Icon type="camera"></Icon>
                </div>
                <h4 class="title">{{userList.loginName}}<br />
                  <a href="#"><small>@{{userList.loginName}}</small></a>
                </h4>
              </div>
              <p class="description text-center">
                "{{userList.remarks}}"
              </p>
            </div>
            <hr>
            <div class="text-center">
              <div class="row">
                <div class="nav-profile">
                  <ul>
                    <li>
                      <Icon type="ios-home"></Icon>  <span>{{companyName}}{{stationName}}</span>
                    </li>
                    <li>
                      <Icon type="android-person"></Icon>  <span> {{userList.loginName}}</span>
                    </li>
                    <li>
                      <Icon type="android-list"></Icon>&nbsp;    <span>{{userList.userType}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-7">
          <section class="panel">
            <div class="bio-graph-heading">
              <font style="vertical-align: inherit;">Aliquam ac magna metus。Nam sed arcu non tellus fringilla fringilla ut vel ispum。Aliquam ac magna metus。</font></div>
            <div class="panel-body bio-graph-info">
              <h1><font style="vertical-align: inherit;">{{$t('profile.details')}}</font></h1>
              <div class="row">
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.name')}}：</font></span>
                    <font style="vertical-align: inherit;">{{userList.loginName}}</font>
                  </p>
                </div>
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.nickName')}}：</font></span>
                    <font style="vertical-align: inherit;">{{userList.nickName}}</font>
                  </p>
                </div>
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.userType')}}：</font></span>
                    <font style="vertical-align: inherit;">{{userList.userType}}</font>
                  </p>
                </div>
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.deptId')}}：</font></span>
                    <font style="vertical-align: inherit;">{{companyName}}</font>
                  </p>
                </div>
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.mobile')}}：</font></span>
                    <font style="vertical-align: inherit;">{{userList.mobile}}</font>
                  </p>
                </div>
                <div class="bio-row">
                  <p><span><font style="vertical-align: inherit;">{{$t('profile.email')}}:</font></span>
                    <font style="vertical-align: inherit;">{{userList.email}}</font>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div class="row">
            <div class="col-lg-12">
              <Tabs style="color: blue;" type="card">
                <TabPane icon="home" >
                  <div class="tab-pane fade active in" id="panel-home">
                    <h4 class="small-heading more-margin-bottom">
                      {{$t('profile.new')}}
                    </h4>
                    <ul class="media-list media-xs">
                      <li class="media">
                        <a class="pull-left" >
                          <img class="media-object img-square" src="../../assets/img/admin/chat-avatar.jpg" alt="">
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">
                            <a >

                            </a>
                          </h4>
                          <p class="small">
                            Sometimes you just need to distance yourself from people.
                          </p>
                          <p class="date">
                            <small>
                              2 days ago
                            </small>
                          </p>
                        </div>
                      </li>
                      <li class="media">
                        <a class="pull-left" >
                          <img class="media-object img-square" src="../../assets/img/admin/chat-avatar2.jpg" alt="">
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">
                            <a >

                            </a>
                          </h4>

                          <p>
                            <strong>
                              <a >

                              </a>
                            </strong>
                          </p>
                          <p class="small">
                            “Sometimes I feel as though there are two me's, one coasting directly on top of the other:  second.”
                          </p>

                          <p class="date">
                            <small>
                              5 hours ago
                            </small>
                          </p>
                        </div>
                      </li>
                      <li class="media">
                        <a class="pull-left" >
                          <img class="media-object img-square" src="../../assets/img/admin/chat-avatar.jpg" alt="">
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">
                            <a >

                            </a>
                          </h4>

                          <blockquote>
                            “I am the perfect version of me.”
                            <small>
                              at
                              <a href="#fakelink">
                                Surat,Gujarat
                              </a>
                            </small>
                          </blockquote>
                          <p class="date">
                            <small>
                              Yesterday
                            </small>
                          </p>
                        </div>
                      </li>
                      <li class="media">
                        <a class="pull-left" >
                          <img class="media-object img-square" src="../../assets/img/admin/chat-avatar2.jpg" alt="">
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">
                            <a >

                            </a>
                          </h4>

                          <div class="row">
                            <div class="col-sm-6">

                            </div>
                            <!-- /.col-sm-6 -->
                          </div>
                          <!-- /.row -->
                          <p class="small">
                            Amazing Quotes..!
                          </p>
                          <p class="date">
                            <small>
                              2 hours ago
                            </small>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </TabPane>
                <TabPane icon="person-stalker">
                  <div class="tab-pane fade active in" id="panel-friend">
                    <h4 class="small-heading more-margin-bottom">
                      {{$t('profile.users')}}
                    </h4>
                    <div class="row">
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-1.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Ottaviano Bucci
                              </h4>
                              <p class="text-success">
                                @ottavianobucci
                              </p>
                            </div>
                            <!-- /.right-button -->
                          </div>
                        </div>
                        <!-- /.the-box .no-border -->
                        <!-- BEGIN USER CARD LONG -->
                      </div>
                      <!-- /.col-sm-6 -->
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-2.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Pavlos Caruana
                              </h4>
                              <p class="text-success">
                                @pavloscaruana
                              </p>
                            </div>

                            <!-- /.right-button -->
                          </div>
                        </div>
                        <!-- /.the-box .no-border -->
                        <!-- BEGIN USER CARD LONG -->
                      </div>
                      <!-- /.col-sm-6 -->
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-3.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Innocenzo Martinelli
                              </h4>
                              <p class="text-success">
                                @innocenzomartinelli
                              </p>
                            </div>

                            <!-- /.right-button -->
                          </div>
                        </div>
                        <!-- /.the-box .no-border -->
                        <!-- BEGIN USER CARD LONG -->
                      </div>
                      <!-- /.col-sm-6 -->
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-4.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Kiyomasu Chew
                              </h4>
                              <p class="text-success">
                                @kiyomasuchew
                              </p>
                            </div>
                            <!-- /.right-button -->
                          </div>
                        </div>
                        <!-- /.the-box .no-border -->
                        <!-- BEGIN USER CARD LONG -->
                      </div>
                      <!-- /.col-sm-6 -->
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-1.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Sanjiro Miyasato
                              </h4>
                              <p class="text-success">
                                @sanjiromiyasato
                              </p>
                            </div>

                            <!-- /.right-button -->
                          </div>
                        </div>
                        <!-- /.the-box .no-border -->
                        <!-- BEGIN USER CARD LONG -->
                      </div>
                      <!-- /.col-sm-6 -->
                      <div class="col-sm-6">
                        <!-- BEGIN USER CARD LONG -->
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-2.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Prisko Bero
                              </h4>
                              <p class="text-success">
                                @priskobero
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-3.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Mandel Ashlin
                              </h4>
                              <p class="text-success">
                                @mandelashlin
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="the-box bg-blue no-border">
                          <div class="media user-card-sm">
                            <a class="pull-left" >
                              <img class="media-object img-square" src="../../assets/img/admin/avatar-4.jpg" alt="">
                            </a>
                            <div class="media-body">
                              <h4 class="media-heading">
                                Esra Pettway
                              </h4>
                              <p class="text-success">
                                @esrapettway
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        avatarUrl1: '',
        letparentName:'',
        letname:'',
        menuList:{},
        userList:{},
        stationName:'',
        companyName:''
      }
    },
    methods:{
      getLoginUser (event) {
        let vm=this;
        $.ajax({
          type : "POST",
          xhrFields : {
            withCredentials : true
          },
          crossDomain : true,
          url : baseURL+"/getLoginUser.do",
          headers:{"Content-type":"application/json"},
          dataType : "json",
          data : "",
          success : function(r) {
            if(r.code == 0){//获取成功
              vm.userList = r.user;
              if(vm.userList.userType==1){
                vm.userList.userType='管理员'
              }else if(vm.userList.userType==2){
                vm.userList.userType='业务员'
              }
              vm.avatarUrl1='http://192.168.0.172:8888/'+vm.userList.photo
            }else{
              parent.location.href ='./#/admin/index';
              vm.error = true;
              vm.errorMsg = r.errors;
              vm.refreshCode();
            }
          }
        });
      },
      findCompany (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/company/findCompany.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({})
        }).then((response) => {
          if (response.body.errors){
          } else {
            if (response.body.code == 0){
              vm.companylist=response.body.companys
              vm.companylist.forEach(function (val,index) {
                if(val.companyCode==vm.userList.companyCode){
                  vm.companyName=val.companyName
                }
                let station=val.stations;
                station.forEach(function (val1,index) {
                  if(val1.stationCode==vm.userList.stationCode){
                    vm.stationName=val1.stationName
                  }
                })
              })
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
    },
    created: function(){
      this.getLoginUser();
      this.findCompany()
    },
  }
</script>
<style>
  .profile  .bio-row{
    width: 50% !important;
    float: left;
    margin-bottom: 10px;
    padding: 0 15px;
  }
  body{
    background-color: #e5e6e6!important;
  }
  .profile h4,p{
    color: #424242!important;
  }
  .profile .btn{
    color: #FFFFFF;
    background-color: #59ace2;
  }
  .profile .ivu-tabs-nav .ivu-tabs-tab{
    color: #FFFFFF;
  }
  .profile .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    color: #939393;
  }
  .profile .bottom_btn{
    margin: 10px 60%;
  }
  .profile .content{
    margin: 50px 80px;
  }
  .profile .ivu-tabs .ivu-tabs-tabpane{
    background-color: #ffffff;
  }
  .profile .fade{
    margin-left: 30px;
  }
  .profile .ivu-tabs {
    border: 1px solid #e5e6e6;
    border-top: none;
  }
  .profile .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    background-color: #FFFFFF!important;
  }
  .profile .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    background-color: #4ca7c1;
    border: none;
  }
  .profile .ivu-tabs-bar{
    background-color: #4ca7c1;
    padding-top:20px ;
    padding-left: 20px;
    margin: 0!important;
  }
  .profile .author div{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;
    margin:-30px  auto ;
  }
  .profile .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border:none!important;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  }
  .profile .nav-profile ul li i{
    font-size: 16px;
    padding-right: 10px;
    color: #bcb3aa;
    margin-left: 50px;
  }
  .profile .nav-profile ul li{
    margin-top: 0;
    line-height: 30px;
    padding-top: 10px;
    text-align: left;
  }
  .profile .nav-profile{
    width: 70%;
    background-color:#e8e8e8 ;
    margin: 0px auto;
  }
  .profile .text-center .row{
    margin: 0;
  }
  .profile p {
    font-size: 16px;
    line-height: 1.4em;
    margin: 0 0 10px;
  }
  .profile .card-user .description {
    margin-top: 10px;
  }
  .profile .card .description {
    font-size: 16px;
    color: #66615b;
  }
  .profile .text-center {
    text-align: center;
  }
  .card-user .author .title {
    color: #403D39;
  }
  .profile .card-user .title {
    margin-top: 30px;
    font-weight: 600;
    line-height: 24px;
  }
  .profile .card-user .avatar.border-white {
    border: 5px solid #FFFFFF;
  }
  .profile .card-user .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    margin-bottom: 15px;
    vertical-align: middle;
  }
  .profile .card-user .author {
    text-align: center;
    text-transform: none;
    margin-top: -65px;
  }
  .profile .card .author {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .profile .card-user .content {
    min-height: 200px;
  }
  .profile .card .content {
    padding: 15px 15px 10px 15px;
  }
  .profile .card-user .image img {
    width: 100%;
    vertical-align: middle;
    border: 0;
  }
  .profile .card-user .image {
    width: 100%;
    transform-style: preserve-3d;
    border-radius: 8px 8px 0 0;
    height: 150px;
    position: relative;
    overflow: hidden;
  }
  .profile .card {
    border-radius: 6px;
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
    background-color: #FFFFFF;
    color: #252422;
    margin-bottom: 20px;
    position: relative;
  }
  .profile>.row{
    width: 100%;
    margin-top: 20px;
  }
  .profile{
    min-width:920px;
    width: 98%;
    margin-bottom: 60px;
  }
  .profile .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .profile .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .profile .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .profile .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .profile .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
