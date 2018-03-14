<template>
  <div id="app1" style="margin-left: 270px;">
    <div class="menumanagement">
        <header class="panel-heading" >
          <Button type="primary" @click="modal1 = true" size="small">{{$t('common.add')}}</Button>
          <span class="tools pull-right">
            <a href="javascript:;" class="fa fa-chevron-down"></a>
          </span>
        </header>
        <Table stripe  :columns="columns7" :data="data6"></Table>
        <div class="tfooter">
          <Modal
            v-model="modal1"
            width="500"
            :loading="modal_loading"
            :mask-closable="false"
            class-name="menu">
            <p v-drag slot="header" style="color:#fff;background-color: #54b6d1">{{$t('menumanagement.add')}}</p>
            <div >
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
                <FormItem  :label="this.$t('menumanagement.type')" prop="type" style="width: 100%;">
                  <RadioGroup v-model="formValidate.type" style="width: 100%;">
                    <Radio label=0>{{$t('menumanagement.type0')}}</Radio>
                    <Radio label=1>{{$t('menumanagement.type1')}}</Radio>
                    <Radio label=2>{{$t('menumanagement.type2')}}</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem v-show="name"  :label="this.$t('menumanagement.name')" prop="name" style="width: 100%;">
                  <Input v-model="formValidate.name" :placeholder="this.$t('menumanagement.placeholdername')" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="parentId" :label="this.$t('menumanagement.parentName')" prop="parentName" style="width: 100%;">
                  <Input v-model="formValidate.parentName"  @click.native="root()"  readonly placeholder="root" style="width: 100%;"></Input>
                  <!--<Cascader v-model="formValidate.parentId" :data="data3" :render-format="format"></Cascader>-->
                </FormItem>
                <FormItem v-show="url" :label="this.$t('menumanagement.url')" prop="url" style="width: 100%;">
                  <Input v-model="formValidate.url"  :placeholder="this.$t('menumanagement.placeholderurl')" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="perms" :label="this.$t('menumanagement.perms')" prop="perms" style="width: 100%;">
                  <Input v-model="formValidate.perms" placeholder="user：list.user:create" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="orderNum" :label="this.$t('menumanagement.orderNum')" prop="orderNum" style="width: 100%;">
                  <InputNumber :max="99999999" :min="0"  v-model="formValidate.orderNum" style="width: 100%;"></InputNumber>
                </FormItem>
                <FormItem v-show="icon" :label="this.$t('menumanagement.icon')" prop="icon" style="width: 100%;">
                  <Input v-model="formValidate.icon" :placeholder="this.$t('menumanagement.placeholdericon')" style="width: 100%;"></Input>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
                  <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                    <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                      <span style="color: #fff">{{$t('common.cancel')}}</span>
                    </button>
                    <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="handleSubmit('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                      <span>{{$t('common.ok')}}</span>
                    </button>
                  </div>
            </div>
          </Modal>
          <Modal
            v-model="modal2"
            width="500"
            :loading="modal_loading"
            :mask-closable="false"
            class-name="menu">
            <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('menumanagement.edit')}}</p>
            <div >
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
                <FormItem  :label="this.$t('menumanagement.type')" prop="type" style="width: 100%;">
                  <RadioGroup v-model="formValidate.type" style="width: 100%;">
                    <Radio label=0>{{$t('menumanagement.type0')}}</Radio>
                    <Radio label=1>{{$t('menumanagement.type1')}}</Radio>
                    <Radio label=2>{{$t('menumanagement.type2')}}</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem v-show="name"  :label="this.$t('menumanagement.name')" prop="name" style="width: 100%;">
                  <Input v-model="formValidate.name" :placeholder="this.$t('menumanagement.placeholdername')" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="parentId" :label="this.$t('menumanagement.parentName')" prop="parentName" style="width: 100%;">
                  <Input v-model="formValidate.parentName" @click.native="root()" placeholder="root" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="url" :label="this.$t('menumanagement.url')" prop="url" style="width: 100%;">
                  <Input v-model="formValidate.url" :placeholder="this.$t('menumanagement.placeholderurl')" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="perms" :label="this.$t('menumanagement.perms')" prop="perms" style="width: 100%;">
                  <Input v-model="formValidate.perms" placeholder="user：list.user:create" style="width: 100%;"></Input>
                </FormItem>
                <FormItem v-show="orderNum" :label="this.$t('menumanagement.orderNum')" prop="orderNum" style="width: 100%;">
                  <InputNumber :max="99999999" :min="1"  v-model="formValidate.orderNum" style="width: 100%;"></InputNumber>
                </FormItem>
                <FormItem v-show="icon" :label="this.$t('menumanagement.icon')" prop="icon" style="width: 100%;">
                  <Input v-model="formValidate.icon" :placeholder="this.$t('menumanagement.placeholdericon')" style="width: 100%;"></Input>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
                  <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                    <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                      <span style="color: #fff">{{$t('common.cancel')}}</span>
                    </button>
                    <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="update('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                      <span>{{$t('common.ok')}}</span>
                    </button>
                  </div>
            </div>
          </Modal>
          <Modal
            v-model="modal3"
            width="300"
            :loading="modal_loading"
            :mask-closable="false"
            class-name="menu"
            :styles="{left: '200px'}">
            <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('menumanagement.select')}}</p>
            <div >
              <Tree :data="data2"  ref="tree"></Tree>
            </div>
            <div slot="footer">
                  <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                    <button @click="cancel1()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                      <span style="color: #fff">{{$t('common.cancel')}}</span>
                    </button>
                    <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="addroot('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                      <span>{{$t('common.ok')}}</span>
                    </button>
                  </div>
            </div>
          </Modal>
          <Modal
            v-model="modal4"
            width="400"
            :loading="modal_loading"
            :mask-closable="false"
            class-name="menu">
            <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('menumanagement.del')}}</p>
            <div style="margin-top:5%;text-align: center;">
              <Icon type="information-circled" color="red" size="30" ></Icon>
              &nbsp;&nbsp;&nbsp;
              <span style="font-size: 20px"> {{$t('common.del')}}?</span>
            </div>
            <div slot="footer">
              <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                  <span style="color: #fff">{{$t('common.cancel')}}</span>
                </button>
                <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                  <span>{{$t('common.ok')}}</span>
                </button>
              </div>
            </div>
          </Modal>
          <Page :total="menumanagementCount" :page-size="menumanagementpageSize" size="small" show-total  @on-change="changepage"></Page>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        letparentName:'',
        letname:'',
        menuList:{},
        icon: true,
        name: true,
        orderNum: true,
        parentId:true,
        perms:true,
        type:true,
        url:true,
        menumanagementList:[],
        // 初始化信息总条数
        menumanagementCount:0,
        // 每页显示多少条
        menumanagementpageSize:10,
        b:'',
        c:'',
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal_loading: false,
        ruleValidate: {
          name: [
            { required: true, message: this.$t('menumanagement.messagename'), trigger: 'blur' },
          ],
        },
        formValidate: {
          id: '',
          icon: '',
          name: '',
          orderNum: 0,
          parentName:'',
          parentId:'',
          perms:'',
          type:1,
          url:''
        },
        data3:{},
        data2:[],
        data6: [],
        columns7: [
          {
            title: this.$t('menumanagement.name'),
            key: 'name'
          },
          {
            title: this.$t('menumanagement.parentName'),
            key: 'parentName'
          },
          {
            title: this.$t('menumanagement.icon'),
            key: 'icon'
          },
          {
            title:this.$t('menumanagement.orderNum'),
            key: 'orderNum'
          },
          {
            title: this.$t('menumanagement.url'),
            key: 'url',
          },
          {
            title: this.$t('menumanagement.perms'),
            key: 'perms',
          },
          {
            title: this.$t('menumanagement.type'),
            key: 'type',
            render: (h, params)=>{
              return h('div',[
                h('Button', {
                  props: {
                    type: this.types(params.index),
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                }, this.status(params.index)),
              ])
            }
          },
          {
            title: this.$t('common.action'),
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'icon iconfont icon-bi',
                    type: 'info',
                    size: 'small'
                  }),
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'icon iconfont icon-icon_delete',
                    type: 'error',
                    size: 'small'
                  }),
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                })
              ]);
            }
          },
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
                if(val.id=='40'){
                  vm.letname=val.name
                }
                val.childMenus.forEach(function (val1,index1) {
                  if(val1.id=='13'){
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
      getMenus(event){
        let vm=this;
        this.$http({
          url:baseURL+'/sys/menu/findAllMenus.do',
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
              vm.data3=response.body.menu
              vm.data3.title=vm.data3.name
              vm.data3.children=vm.data3.childMenus
              vm.data3.children.forEach(function (val,index) {
                val.title=val.name
                val.children=val.childMenus
                val.children.forEach(function (val1,index1) {
                  val1.title=val1.name
                  val1.children=val1.childMenus
                  val1.children.forEach(function (val2,index2) {
                    val2.title=val2.name
                    val2.children=val2.childMenus
                    val2.children.forEach(function (val3,index3) {
                      val3.title=val3.name
                      val3.children=val3.childMenus
                    })
                  })
                })
              })
              vm.data2.push(vm.data3)
              vm.menumanagementList = response.body.menu.childMenus
              response.body.menu.childMenus.forEach(function (val,index) {
                val.childMenus.forEach(function (val1,index) {
                  vm.menumanagementList=vm.menumanagementList.concat(val1)
                  val1.childMenus.forEach(function (val2,index) {
                    vm.menumanagementList=vm.menumanagementList.concat(val2)
                    val2.childMenus.forEach(function (val3,index) {
                      vm.menumanagementList=vm.menumanagementList.concat(val3)
                      return vm.menumanagementList
                    })
                    return vm.menumanagementList
                  })
                  return vm.menumanagementList
                })
                return vm.menumanagementList
              })
              var by = function(name){
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
              vm.menumanagementList.sort(by("orderNum"));
              vm.menumanagementCount = vm.menumanagementList.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(vm.menumanagementList.length < vm.menumanagementpageSize){
                vm.data6 = vm.menumanagementList;
              }else{
                vm.data6 = vm.menumanagementList.slice(0,vm.menumanagementpageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.menumanagementpageSize;
        var _end = index * this.menumanagementpageSize;
        this.data6 = this.menumanagementList.slice(_start,_end);
      },
      types(index){
        if(this.data6[index].type == 0){
          return 'success'
        }
        else if(this.data6[index].type== 1){
          return 'primary'
        }else if(this.data6[index].type== 2){
          return 'warning'
        }
      },
      status(index){
        if(this.data6[index].type == 0){
          return this.$t('menumanagement.type0')
        }
        else if(this.data6[index].type== 1){
          return this.$t('menumanagement.type1')
        }else if(this.data6[index].type== 2){
          return this.$t('menumanagement.type2')
        }

      },
      root(){
        this.modal3 = true;
      },
      addroot(){
        this.formValidate.parentId=this.$refs.tree.getSelectedNodes()[0].id
        this.formValidate.parentName=this.$refs.tree.getSelectedNodes()[0].name
        this.modal3 =false
      },
      handleSubmit(name){
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
              this.$http({
                url:baseURL+'/sys/menu/add.do',
                credentials: true,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  name:vm.formValidate.name,
                  orderNum:vm.formValidate.orderNum,
                  parentId:vm.formValidate.parentId,
                  type:vm.formValidate.type,
                  parentName:vm.formValidate.parentName,
                  url:vm.formValidate.url,
                  perms:vm.formValidate.perms,
                  icon:vm.formValidate.icon
                })
              }).then((response) => {
                if(response.body.code==0){
                  vm.data6.unshift({
                    id:response.body.menu.id,
                    name:vm.formValidate.name,
                    orderNum:vm.formValidate.orderNum,
                    parentId:vm.formValidate.parentId,
                    type:vm.formValidate.type,
                    parentName:vm.formValidate.parentName,
                    url:vm.formValidate.url,
                    perms:vm.formValidate.perms,
                    icon:vm.formValidate.icon
                  });
                  vm.modal1 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }else{
                  alert(response.body.errors)
                  vm.modal1 =true
                }
              })
                .catch(function (response) {
                  console.log(response)
                })
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      edit( index){
        this.modal2 = true;
        this.formValidate.name=this.data6[index].name
        this.formValidate.orderNum=this.data6[index].orderNum
        this.formValidate.type=this.data6[index].type
        this.formValidate.parentId=this.data6[index].parentId
        this.formValidate.parentName=this.data6[index].parentName
        this.formValidate.url=this.data6[index].url
        this.formValidate.perms=this.data6[index].perms
        this.formValidate.icon=this.data6[index].icon
        this.b=index
      },
      update(name){
        let vm = this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/menu/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:{
                id:vm.data6[vm.b].id,
                name:vm.formValidate.name,
                orderNum:vm.formValidate.orderNum,
                parentId:vm.formValidate.parentId,
                type:vm.formValidate.type,
                parentName:vm.formValidate.parentName,
                url:vm.formValidate.url,
                perms:vm.formValidate.perms,
                icon:vm.formValidate.icon
              }
            }).then((response) => {
              if(response.body.code==0){
                vm.data6.splice(vm.b,1,{
                  id:vm.data6[vm.b].id,
                  name:vm.formValidate.name,
                  orderNum:vm.formValidate.orderNum,
                  parentId:vm.formValidate.parentId,
                  type:vm.formValidate.type,
                  parentName:vm.formValidate.parentName,
                  url:vm.formValidate.url,
                  perms:vm.formValidate.perms,
                  icon:vm.formValidate.icon
                });
                vm.modal2 = false;
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
                vm.modal2 =true
              }
            })
              .catch(function (response) {
                console.log(response)
              })
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      remove (index) {
        this.modal4 = true
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/menu/delMenu.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            id:vm.data6[vm.c].id
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data6.splice(vm.c, 1);
            vm.modal4= false;
            vm.$Message.success(this.$t('common.messagedel'));
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      ok () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.modal2 = false;
          this.modal3 = false;
        }, 500);
        this.$Message.info(this.$t('common.messageOk'))
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.modal2 = false;
          this.modal4 = false;
        }, 500);
        this.$Message.success(this.$t('common.messageCancel'));
      },
      cancel1 () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal3 = false
        }, 500);
        this.$Message.success(this.$t('common.messageCancel'));
      }
    },
    created: function(){
      this.getMenus();
      this.getMenuList();
    },
    watch:{
      'formValidate.type':function (val) {
        if(val==0){
          this.icon= true
          this.name= true
          this.orderNum= true
          this.parentId=true
          this.perms=false
          this.url=false
        }else if(val==1){
          this.icon= true
          this.name= true
          this.orderNum= true
          this.parentId=true
          this.perms=true
          this.url=true
        }else if(val==2){
          this.icon= false
          this.name= true
          this.orderNum= false
          this.parentId=true
          this.perms=true
          this.url=false
        }
      },
      'modal1':function (val) {
        if(val==false){
          this.formValidate.name=''
          this.formValidate.orderNum=0
          this.formValidate.parentName=''
          this.formValidate.type=''
          this.formValidate.url=''
          this.formValidate.perms=''
          this.formValidate.icon=''
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.name=''
          this.formValidate.orderNum=0
          this.formValidate.parentName=''
          this.formValidate.type=''
          this.formValidate.url=''
          this.formValidate.perms=''
          this.formValidate.icon=''
        }
      },
    },
    directives:{
      drag(el,bindings){
        el.onmousedown = function(e){
          var disx = e.pageX - el.offsetLeft;
          var disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e){
            el.style.left = e.pageX - disx+'px';
            el.style.top = e.pageY - disx+'px';
          }
          document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
          }
        }
      }
    }
  }
</script>
<style>
  .menu .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .menu .ivu-modal-confirm-body-render{
    margin: 5px 16px;
  }
  .ivu-icon-help-circled:before{
    content: '';
  }
  .menu .ivu-modal-confirm{
    padding: 0;
    margin: -16px;
  }
  .menu  .ivu-modal-confirm-head{
    color:#fff;
    background-color: #54b6d1;
    border-radius: 4px;
    padding: 14px 16px;

  }
  .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .menu  .ivu-select-dropdown{
    width: 100%;
  }
  .menu .ivu-form-item:before {
    content: none!important;
  }
  .menu .ivu-select,.menu .ivu-input-wrapper{
    width: 90%;
  }
  .menu .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: none;
  }
  .menu .ivu-checkbox-group{
    width: 104px;
  }
  .menu  .ivu-form-item{
    width: 100%;
    display: inline-block;
  }
  .menu .input-group{
    width: 80%;
  }
  .menu  .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .menumanagement .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .menu  .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .menumanagement{
    min-width:1000px;
    width: 98%;
    margin-bottom: 60px;
  }
  .menumanagement .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .menumanagement .tfooter>.ivu-btn-success{
    margin-top: 13px;
    margin-left: 18px;
  }
  .menumanagement .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .menumanagement .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .menumanagement .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .menumanagement .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .menumanagement .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .menumanagement .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .menumanagement .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .menumanagement .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .menumanagement .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
