<template>
  <div style="margin-left: 270px">
    <div class="operator">
      <header class="panel-heading" >
        <Button type="primary" @click="modal1 = true" size="small">{{$t('common.add')}}</Button>
        <span class="tools pull-right">
            <a href="javascript:;" class="fa fa-chevron-down"></a>
          </span>
      </header>
      <Table stripe ref="data6" :columns="columns7" :data="data6"></Table>
      <div class="tfooter">
        <Modal
          v-model="modal1"
          width="500"
          :loading="modal_loading"
          :mask-closable="false"
          class-name="operator1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operator.add')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
              <FormItem  :label="this.$t('operator.name')" prop="name" style="width: 100%;">
                <Input v-model="formValidate.name" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('common.remarks')" prop="remarks" style="width: 100%;">
                <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="this.$t('common.remarks')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('operator.accredit')" style="width: 100%;">
                <div id="checkTree" style="margin-left: 80px;margin-top: 10px">
                  <div class="tree-box">
                    <div class="zTreeDemoBackground left">
                      <ul id="treeDemo" ref="tree" class="ztree"></ul>
                    </div>
                  </div>
                </div>
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
          class-name="operator1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operator.edit')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
              <FormItem  :label="this.$t('operator.name')" prop="name" style="width: 100%;">
                <Input v-model="formValidate.name" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('common.remarks')" prop="remarks" style="width: 100%;">
                <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="this.$t('common.remarks')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('operator.accredit')"  style="width: 100%;">
                <div id="checkTree" style="margin-left: 80px;margin-top: 10px">
                  <div class="tree-box">
                    <div class="zTreeDemoBackground left">
                      <ul id="tree" ref="tre" class="ztree"></ul>
                    </div>
                  </div>
                </div>
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
          v-model="modal4"
          :mask-closable="false"
          class-name="operator1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operator.del')}}</p>
          <div style="margin-top:5%;text-align: center;" class="icon">
            <Icon type="information-circled" color="red" size="30" ></Icon>
            &nbsp;&nbsp;&nbsp;
            <span style="font-size: 20px"> {{$t('common.del')}}?</span>
          </div>
          <div slot="footer">
            <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
              <button @click="cancel()" type="error"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                <span style="color: #fff">{{$t('common.cancel')}}</span>
              </button>
              <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                <span>{{$t('common.ok')}}</span>
              </button>
            </div>
          </div>
        </Modal>
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
        setting:{
          check: {
            enable: true,
            autoCheckTrigger: true,
            nocheckInherit: false
          },
          data: {
            simpleData: {
              enable: true
            }
          }
        },
        zNodes:[],
        operatortypeList:[],
        // 初始化信息总条数
        operatortypeCount:0,
        // 每页显示多少条
        operatortypepageSize:10,
        b:'',
        c:'',
        modal1: false,
        modal2: false,
        modal4: false,
        modal_loading: false,
        ruleValidate: {
          name: [
            { required: true, message: this.$t('operator.messageName'), trigger: 'blur' },
          ],
          roleType:[
            { required: true, message: '请选择角色类型', trigger: 'change' }
          ],
        },
        formValidate: {
          name: '',
          remarks: '',
          createDate: '',
          roleType: '1',
          menuIdList:[]
        },
        data2:[],
        data6: [],
        columns7: [
          {
            title: this.$t('operator.name'),
            key: 'name'
          },
          {
            title: this.$t('common.remarks'),
            key: 'remarks'
          },
          {
            title: this.$t('operator.createDate'),
            key: 'createDate'
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
      getMenus(event){
        let vm=this;
        this.$http({
          url:baseURL+'/getMyAllMenu.do',
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
              let data3={}
              data3=response.body.menu
              data3.id=data3.id
              data3.nocheck=false
              data3.children=data3.childMenus
              data3.children.forEach(function (val,index) {
                val.id=val.id
                val.pid=val.parentId
                if(val.childMenus.length==0){
                  val.children=''
                }else{
                  val.children=val.childMenus
                  val.children.forEach(function (val1,index1) {
                    val1.id=val1.id
                    val1.pid=val1.parentId
                    if(val1.childMenus.length==0){
                      val1.children=''
                    }else{
                      val1.children=val1.childMenus
                      val1.children.forEach(function (val2,index2) {
                        val2.id=val2.id
                        val2.pid=val2.parentId
                        if(val2.childMenus.length==0){
                          val2.children=''
                        }else{
                          val2.children=val2.childMenus
                          val2.children.forEach(function (val3,index3) {
                            val3.id=val3.id
                            val3.pid=val3.parentId
                            if(val3.childMenus.length==0){
                              val3.children=''
                            }else{
                              val3.children=val3.childMenus
                            }
                          })
                        }
                      })
                    }

                  })
                }
                return vm.data3
              })
              vm.zNodes.push(data3)
              $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
              $.fn.zTree.init($("#tree"), this.setting, this.zNodes);
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getOperator(event){
        let vm=this;
        this.$http({
          url:baseURL+'/sys/role/listBypage.do',
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
              vm.data6= response.body.pageInfo.list
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      type(index){
        if(this.data6[index].roleType == '1'){
          return 'success'
        }
        else if(this.data6[index].roleType== '2'){
          return 'primary'
        }
      },
      status(index){
        if(this.data6[index].roleType == '1'){
          return this.$t('common.roleType1')
        }
        else if(this.data6[index].roleType== '2'){
          return this.$t('common.roleType')
        }
      },
      handleSubmit(name){
        let vm=this
        let id=[]
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.getCheckedNodes().forEach(function (val,index) {
          id.push(val.id)
        })
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/role/save.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                name:vm.formValidate.name,
                roleType:1,
                remarks:vm.formValidate.remarks,
                menuIdList:id
              })
            }).then((response) => {
              if(response.body.code==0){
                let date = new Date();
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                vm.getOperator();
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal1 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
              }else{
                alert(response.body.errors)
                vm.modal1 = true
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
        let vm=this
        let zTree = $.fn.zTree.getZTreeObj("tree")
        var node = zTree.getNodes();
        var nodes = zTree.transformToArray(node);
        nodes[0].checked=true
            vm.data6[index].menuIdList.forEach(function (val,index) {
              nodes.forEach(function (val1,index1) {
                if(val==val1.id){
                  val1.checked=true
                }
              })
            })
        vm.modal2 = true
        vm.formValidate.name=vm.data6[index].name
        vm.formValidate.roleType=vm.data6[index].roleType
        vm.formValidate.remarks=vm.data6[index].remarks
        vm.b=index
      },
      update(name){
        let vm = this
        let idd=[]
        var zTre = $.fn.zTree.getZTreeObj("tree");
        zTre.getCheckedNodes().forEach(function (val,index) {
          idd.push(val.id)
        })
        let date = new Date();
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        vm.$refs[name].validate((valid) => {
          if (valid) {
            vm.$http({
              url:baseURL+'/sys/role/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                id:vm.data6[vm.b].id,
                name:vm.formValidate.name,
                roleType:'1',
                remarks:vm.formValidate.remarks,
                menuIdList:idd,
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.data6.splice(vm.b,1,{
                  id:vm.data6[vm.b].id,
                  name:vm.formValidate.name,
                  roleType:vm.formValidate.roleType,
                  remarks:vm.formValidate.remarks,
                  createDate:Y+M+D+h+m+s,
                  menuIdList:idd,
                });
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal2 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
              }else{
                alert(response.body.errors)
                vm.modal2 = true;
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
        this.modal4=true
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/role/delete.do',
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
            vm.modal4=false
            vm.$Message.success(this.$t('common.messagedel'));
          }
        }).catch(function (response) {
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
          this.modal3 = false;
          this.modal4 = false;
        }, 500);
        this.$Message.success(this.$t('common.messageCancel'));
      },
    },
    created: function(){
      this.getOperator();
      this.getMenus()
    },
    watch:{
      'modal1':function (val) {
        if(val==false){
          this.formValidate.name=''
          this.formValidate.roleType=''
          this.formValidate.remarks=''
          $.fn.zTree.getZTreeObj("treeDemo").getCheckedNodes().forEach(function (val,index) {
            val.checked=false
          })
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.name=''
          this.formValidate.roleType=''
          this.formValidate.remarks=''
          $.fn.zTree.getZTreeObj("tree").getCheckedNodes().forEach(function (val,index) {
            val.checked=false
          })
        }
      },
    }
  }
</script>

<style>
  .operator1 .ivu-icon-arrow-right-b{
    position: relative;
    top:3px;
  }
  .operator1 .ivu-checkbox-input{
    margin-top: -6px;
  }
  .operator1 .icon >i:before {
    font-size: 30px;
  }
  .operator1 .ivu-icon:before {
    font-size: 20px;
  }
  .operator1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .operator .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .operator .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .operator1 .ivu-modal-confirm-body-render{
    margin: 5px 16px;
  }
  .operator1 .ivu-icon-help-circled:before{
    content: '';
  }
  .operator1 .ivu-modal-confirm{
    padding: 0;
    margin: -16px;
  }
  .operator1 .ivu-modal-confirm-head{
    color:#fff;
    background-color: #54b6d1;
    border-radius: 4px;
    padding: 14px 16px;

  }
  .operator .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .operator1 .ivu-select-dropdown{
    width: 47%;
  }
  .operator1 .ivu-form-item:before {
    content: none!important;
  }
  .operator1 .ivu-select,.operator1 .ivu-input-wrapper{
    width: 90%;
  }
  .operator1 .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: none;
  }
  .operator1 .ivu-checkbox-group{
    width: 104px;
  }
  .operator1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .operator1 .input-group{
    width: 80%;
  }
  .operator1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .operator .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .operator .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .operator{
    width: 98%;
    margin-bottom: 60px;
  }
  .operator .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .operator .tfooter>.ivu-btn-success{
    margin-top: 13px;
    margin-left: 18px;
  }
  .operator .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .operator .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .operator .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .operator .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .operator .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .operator .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .operator .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .operator .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .operator .ivu-page-item-active{
    background-color:  #2489a6;
  }
  @import '../../../pulgins/ztree/css/zTreeStyle.css'
</style>
