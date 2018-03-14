<template>
  <div style="margin-left: 270px;">
    <div class="parameters">
      <header class="panel-heading">
        <Tabs style="color: blue;" type="card">
          <TabPane  :label="this.$t('parameters.header')">
            <div class="content" v-cloak>
              <form>
                <div class="list" v-for="item in addList">
                  <h5 class="title">
                    <label ><input type='checkbox' style="width: 18px;height: 18px;margin-top:7px;" class='item-check-btn' v-model="item.checked1" @click="selectAll1(item)"></label>
                    {{item.name1}}
                  </h5>
                  <ul class="menu">
                    <li v-for="(s,index) in item.children" >
                      <label  >
                        <input type='checkbox' style="width: 18px;height: 18px;" :value="index" v-model="s.checked" class='item-check-btn' >
                      </label>
                      {{s.name}}
                    </li>
                  </ul>
                </div>
              </form>
              <div class="bottom_btn">
                <input @click="submit()" type="submit" :value="this.$t('parameters.submit')" class="btn">
              </div>
            </div>
          </TabPane>
          <TabPane :label="this.$t('parameters.label')">
            <div class="content" v-cloak>
              <form>
                <div class="list" v-for="item in addList">
                  <h5 class="title">
                    <label ><input type='checkbox' style="width: 18px;height: 18px;margin-top:7px;" class='item-check-btn' v-model="item.checked2" @click="selectAll2(item)"></label>
                    {{item.name2}}
                  </h5>
                  <ul class="menu">
                    <li v-for="(s,index) in item.children2">
                      <label  >
                        <input type='checkbox' style="width: 18px;height: 18px;" :value="index" v-model="s.checked" class='item-check-btn' >
                      </label>
                      {{s.name}}
                    </li>
                  </ul>
                </div>
              </form>
              <div class="bottom_btn">
                <input @click="submit()" type="submit" :value="this.$t('parameters.submit')" class="btn">
              </div>
            </div>
          </TabPane>
        </Tabs>
      </header>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        letparentName:'',
        letname:'',
        menuList:{},
        menuList:{},
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉', '西瓜'],
        sysConfig:{},
        addList: [
          {
            "name1":this.$t('parameters.check'),
            checked1:false,
            "children":[
              {"name":this.$t('parameters.addList.children.additionalfree'),"checked":false,"id":'8'},
              {"name":this.$t('parameters.addList.children.debt'),"checked":false,"id":'9'},
              {"name":this.$t('parameters.addList.children.holiday'),"checked":true,"id":'10'}
            ],
            "name2":this.$t('parameters.check'),
            checked2:false,
            "children2":[
              {"name":this.$t('parameters.addList.children2.loginname'),"checked":true,"id":'5'},
              {"name":this.$t('parameters.addList.children2.customer'),"checked":false,"id":'4'},
              {"name":this.$t('parameters.addList.children2.friendly'),"checked":false,"id":'3'},
              {"name":this.$t('parameters.addList.children2.Area'),"checked":true,"id":'2'},
              {"name":this.$t('parameters.addList.children2.deptId'),"checked":true,"id":'19'},
              {"name":this.$t('parameters.addList.children2.meter'),"checked":true,"id":'1'},

            ]
          }
        ],
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
            if (response.body.code == 0){
              vm.menuList=response.body.menu.childMenus
              vm.menuList.forEach(function (val,index) {
                if(val.id=='14'){
                  vm.letname=val.name
                }
                val.childMenus.forEach(function (val1,index1) {
                  if(val1.id=='14'){
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
      getSysConfig (event) {
        let vm=this;
        this.$http({
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
          } else {
            if (response.body.code == 0){
              vm.sysConfig =response.body.list
              vm.sysConfig.forEach(function (item,index) {
                if(vm.sysConfig[index].state==1){
                  vm.sysConfig[index].state=true
                }
                else if(vm.sysConfig[index].state==0){
                  vm.sysConfig[index].state=false
                }
              })
              vm.addList[0].children[0].checked=vm.sysConfig[8].state
              vm.addList[0].children[1].checked=vm.sysConfig[9].state
              vm.addList[0].children[2].checked=vm.sysConfig[10].state
              vm.addList[0].children2[0].checked=vm.sysConfig[5].state
              vm.addList[0].children2[1].checked=vm.sysConfig[4].state
              vm.addList[0].children2[2].checked=vm.sysConfig[3].state
              vm.addList[0].children2[3].checked=vm.sysConfig[2].state
              vm.addList[0].children2[4].checked=vm.sysConfig[19].state
              vm.addList[0].children2[5].checked=vm.sysConfig[1].state
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      selectAll1: function(item){
        if(item.checked1){
          item.children.forEach(function(item){
            item.checked=false;
          });
        }else{
          item.children.forEach(function(item){
            item.checked=true;
          });
        }
      },

      selectAll2: function(item) {
        if(item.checked2){
          item.children2.forEach(function(item){
            item.checked=false;
          });
        }else{
          //相反，如果没有被选中，子集应该全部checked=false
          item.children2.forEach(function(item){
            item.checked=true;
          });
        }
      },

      submit() {
        let vm = this
        vm.addList[0].children.forEach(function (item,index1) {
          if(item.checked==true){
            item.checked=1
          }
          else{
            item.checked=0
          }
        })
        vm.addList[0].children2.forEach(function (items,index1) {
          if(items.checked==true){
            items.checked=1
          }
          else{
            items.checked=0
          }
        })
        let  sysConfig=[
          {
            id:vm.addList[0].children[0].id,
            state:vm.addList[0].children[0].checked,
          },
          {
            id:vm.addList[0].children[1].id,
            state:vm.addList[0].children[1].checked,
          },
          {
            id:vm.addList[0].children[2].id,
            state:vm.addList[0].children[2].checked,
          },
          {
            id:vm.addList[0].children2[0].id,
            state:vm.addList[0].children2[0].checked,
          },{
            id:vm.addList[0].children2[1].id,
            state:vm.addList[0].children2[1].checked,
          },
          {
            id:vm.addList[0].children2[2].id,
            state:vm.addList[0].children2[2].checked,
          },{
            id:vm.addList[0].children2[3].id,
            state:vm.addList[0].children2[3].checked,
          },
          {
            id:vm.addList[0].children2[4].id,
            state:vm.addList[0].children2[4].checked,
          },
          {
            id:vm.addList[0].children2[5].id,
            state:vm.addList[0].children2[5].checked,
          },
        ]
        this.$http({
          url:baseURL+'/sysConfig/updateBatch.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify([
            {
              id:vm.addList[0].children[0].id,
              state:vm.addList[0].children[0].checked.toString(),
            },
            {
              id:vm.addList[0].children[1].id,
              state:vm.addList[0].children[1].checked.toString(),
            },
            {
              id:vm.addList[0].children[2].id,
              state:vm.addList[0].children[2].checked.toString(),
            },
            {
              id:vm.addList[0].children2[0].id,
              state:vm.addList[0].children2[0].checked.toString(),
            },{
              id:vm.addList[0].children2[1].id,
              state:vm.addList[0].children2[1].checked.toString(),
            },
            {
              id:vm.addList[0].children2[2].id,
              state:vm.addList[0].children2[2].checked.toString(),
            },{
              id:vm.addList[0].children2[3].id,
              state:vm.addList[0].children2[3].checked.toString(),
            },
            {
              id:vm.addList[0].children2[4].id,
              state:vm.addList[0].children2[4].checked.toString(),
            },
            {
              id:vm.addList[0].children2[5].id,
              state:vm.addList[0].children2[5].checked.toString(),
            },
          ])
        }).then((response) => {
          if(response.body.code==0){
            window.location.reload()
          }else{
          }


        })
          .catch(function (response) {
            console.log(response)
          })
      },
    },
    created: function(){
      this.getSysConfig();
      this.getMenuList();

    },
  }
</script>
<style>
  .parameters .btn{
    color: #FFFFFF;
    background-color: #59ace2;
  }
  .parameters .ivu-tabs-nav .ivu-tabs-tab{
    color: #FFFFFF;
  }
  .parameters .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    color: #939393;
  }
  .parameters .bottom_btn{
    margin: 10px 60%;
  }
  .parameters .menu{
    color: #939393;
    margin: 20px 30px;
  }
  .parameters .title{
    width: 90px;
    height: 35px;
    background-color: #59ace2;
    border-radius: 5px;
    text-align: center;
    color: #FFFFFF;
  }
  .parameters .content{
    margin: 50px 80px;
  }
  .parameters .ivu-tabs {
    border: 1px solid #e5e6e6;
    border-top: none;
  }
  .parameters .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    background-color: #FFFFFF!important;
  }
  .parameters .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    background-color: #4ca7c1;
    border: none;
  }
  .parameters .ivu-tabs-bar{
    background-color: #4ca7c1;
    padding-top:20px ;
    padding-left: 20px;
    margin: 0!important;
  }
  .parameters .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active{
    transform:none;
  }
  .parameters .ivu-tabs,.ivu-tabs-bar,.ivu-tabs-nav,.ivu-tabs-nav-container,.ivu-tabs-nav>.ivu-tabs-tab{
    position: static;
  }
  .parameters .panel-heading {
    width: 90%;
    margin:  40px auto;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    padding: 0!important;
    border-top: 5px solid #2a8ba7;
    background-color: #fff;
  }
  .parameters{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
  }
  .parameters .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .parameters .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .parameters .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  body{
    background: #e5e6e6!important;
  }
</style>
