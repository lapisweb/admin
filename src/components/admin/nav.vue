<template>
  <div class="nav">
    <Row>
      <Col span="4">
        <Menu  :theme="theme2"   accordion @on-select="select" @on-open-change="submenu" >
          <Submenu   :name=item.name v-for="item in menuList" :key="item.orderNum">
            <template slot="title" >
              <i :class=item.icon ></i>
              <a v-if="item.type === 0" href="javascript:;">{{item.name}}</a>
              <a v-if="item.type === 1" :href="'#'+ item.url">{{item.name}}</a>
            </template>
            <router-link  :to=item2.url  v-for="item2 in item.childMenus"  :key="item2.orderNum">
              <MenuItem :name=item2.name  v-show="jiejia">{{item2.name}}</MenuItem>
            </router-link>
          </Submenu>
        </Menu>
      </Col>
    </Row>
    <div style="margin-left: 270px">
      <Breadcrumb separator=">">
        <BreadcrumbItem href="#"><i class="layui-icon">&#xe612;</i>   {{ $t('header.header') }} </BreadcrumbItem>
        <BreadcrumbItem href="#">{{letparentName}}</BreadcrumbItem>
        <BreadcrumbItem href="#">{{letname}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        letparentName:'',
        letname:'',
        jiejia:true,
        sysConfig:{},
        menuList:{},
        nav:{},
        theme2: 'dark',
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
              vm.$http({
                url:baseURL+'/sysConfig/findAll.do',
                credentials: true,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                })
              }).then((response) => {
                if (response.body.errors){
                  alert(response.body.errors)
                } else {
                  vm.sysConfig =response.body.list
                  if (response.body.code == 0){
                    if(vm.sysConfig[9].state==0 &&vm.sysConfig[7].state==0){
                      vm.menuList[2].childMenus.splice(2,2)
                    }else if(vm.sysConfig[9].state==0 && vm.sysConfig[7].state==1){
                      vm.menuList[2].childMenus.splice(3,1)
                    }else if(vm.sysConfig[9].state==1 && vm.sysConfig[7].state==0){
                      vm.menuList[2].childMenus.splice(2,1)
                    }else{
                      vm.menuList=vm.menuList
                    }
                  }
                }
              })
                .catch(function (response) {
                  console.log(response)
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
      logout(event) {
        this.menuList[3].childMenus[3].onclick(function (e) {
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
            location.href = '/#/';
          })
            .catch(function (response) {
              console.log(response)
            })
        })
      },
      select(name){
        this.letname=name
      },
      submenu(name){
        if(name.indexOf('首页')){
          this.letname=''
        }
        this.letparentName=name[0]
      }
    },
    created: function(){
      this.getMenuList();
    },
    watch:{
      'letparentName':function (val) {
        let vm=this
      }
    }
  }
</script>
<style>
  @import "../../assets/css/admin/icontFont.css";
  body {
    background-color: #e5e6e6!important;
  }
  .nav .ivu-breadcrumb-item-separator {
    color: #87787e!important;
  }
  .nav .ivu-breadcrumb{
    width: 98%;
    min-width: 700px;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .nav .ivu-menu{
    width: 250px!important;
  }
  .nav .ivu-menu-submenu-title>a{
    width: 200px;
    color: rgba(255,255,255,.7);
    text-decoration:none;
  }
 .ivu-col-span-4{
   height: 100%;
   width: 250px;
   position: fixed;
   background: #495060;
   margin-top: 60px;
   padding-bottom: 100px;
   z-index: 100;
   overflow-x: hidden;
   overflow-y: auto;
  }
 .ivu-menu-opened>.ivu-menu-submenu-title>.icon, .ivu-menu-submenu-title:hover>.icon{
   color: #72d0eb!important;
 }

</style>

