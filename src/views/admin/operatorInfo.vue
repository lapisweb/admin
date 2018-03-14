<template>
  <div style="margin-left: 270px">
    <div class="operatorInfo">
      <header class="panel-heading" >
        <Tree :data="data5" :render="renderContent"></Tree>
        <Modal
          v-model="modal1"
          :mask-closable="false"
          class-name="operatorInfo1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operatorinfo.add')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValida"  style="width: 80%;margin: 0 auto" inline>
              <FormItem  :label="this.$t('operatorinfo.id')"  :prop="codenum" style="width: 100%;">
                  <InputNumber type="text" :disabled="!CompanyCode" :max="99"  :min="0" v-model="formValidate.id" style="width: 100%;"></InputNumber>
              </FormItem>
              <FormItem :label="this.$t('operatorinfo.name')" prop="name" style="width: 100%;">
                <Input v-model="formValidate.name" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem :label="this.$t('operatorinfo.address')" prop="address" style="width: 100%;">
                <Input v-model="formValidate.address" :placeholder="this.$t('common.placeholderAddress')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('common.remarks')" prop="remarks" style="width: 100%;">
                <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="this.$t('common.remarks')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state" style="width: 100%;">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okCompany('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal3"
          :mask-closable="false"
          class-name="operatorInfo1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operatorinfo.edit')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValida"  style="width: 80%;margin: 0 auto" inline>
              <FormItem  :label="this.$t('operatorinfo.id')" :prop="codenum" style="width: 100%;">
                  <InputNumber :disabled="!CompanyCode" :max="99" readonly  :min="0" v-model="formValidate.id" style="width: 100%;"></InputNumber>
              </FormItem>
              <FormItem :label="this.$t('operatorinfo.name')" prop="name" style="width: 100%;">
                <Input v-model="formValidate.name" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem :label="this.$t('operatorinfo.address')" prop="address" style="width: 100%;">
                <Input v-model="formValidate.address" :placeholder="this.$t('common.placeholderAddress')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('common.remarks')" prop="remarks" style="width: 100%;">
                <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="this.$t('common.remarks')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state" style="width: 100%;">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="updateCompany('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal5"
          :mask-closable="false"
          class-name="operatorInfo1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('operatorinfo.del')}}</p>
          <div style="margin-top:5%;text-align: center;">
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
      </header>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      const validateid = (rule, value, callback) => {
        let vm=this;
        if (value === '') {
          callback(new Error('请输入代码'));
        } else {
            vm.$http({
              url:baseURL+'/sys/dept/exist.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:{
                'conditions':{
                  id:vm.formValidate.id
                },
              }
            }).then((response) => {
              if (response.body.errors){
            alert(response.body.errors)
              } else {
                if (response.body.code == 0){
                  if(response.body.isExist==true){
                    callback(new Error(this.$t('operatorinfo.messageid')));
                  }else{
                    callback()
                  }
                }
              }
            })
              .catch(function (response) {
                console.log(response)
              })
        }
      }
      const validatename = (rule, value, callback) => {
        let vm=this;
        if (value === '') {
          callback(new Error(this.$t('operatorinfo.messageName')));
        } else {
            vm.$http({
              url:baseURL+'/sys/dept/exist.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:{
                'conditions':{
                  name:vm.formValidate.name
                },
              }
            }).then((response) => {
              if (response.body.errors){
            alert(response.body.errors)
              } else {
                if (response.body.code == 0){
                  if(response.body.isExist==true){
                    callback(new Error(this.$t('operatorinfo.messageName0')));
                  }else{
                    callback()
                  }
                }
              }
            })
              .catch(function (response) {
                console.log(response)
              })
        }
      }
      return {
        codenum:'id',
        code:'',
        letparentName:'',
        letname:'',
        menuList:{},
        a:{},
        b:{},
        c:'',
        d:'',
        e:'',

        CompanyCode:false,
        StationCode:false,
        companylist:{},
        data1:'',
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal_loading:true,
        value1: 1,
        value2: 1,
        ruleValidat: {
          companyName: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' },
            { type: 'string', min: 1, message: '公司名称不能少于1字', trigger: 'blur' }
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ],
        },
        ruleValida: {
          id:[
            {validator: validateid, trigger: 'change'},
          ],
          name: [
            {required: true,validator: validatename,  trigger: 'blur' },
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ],
          currencyUnit:[
            { required: true, message: '货币单位不能为空', trigger: 'blur' },
            { type: 'string',pattern:/^(NIS)$|^[$]$/, message: '请输入正确的货币单位', trigger: 'blur' }
          ],
          quantityUnit:[
            { required: true, message: '容量单位不能为空', trigger: 'blur' },
            { type: 'string',pattern:/^(m³)$|^(cm³)$|^(mm³)$/, message: '请输入正确的容量单位', trigger: 'blur' }
          ],
        },
        formValidate: {
          id:1,
          name:'',
          Code:[],
          address:'',
          remarks:'',
          state:'1'
        },
        data: [],
        data5: []
      }
    },
    methods: {
      format (labels, selectedData) {
        const index = labels.length - 1;
        console.log(selectedData[index],'selectedData')
        const data = selectedData[index] || false;
        this.formValidate.regionCode=data.regionCode
        this.c=data.regionCode
        return labels[index];
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
              vm.sysConfig.forEach(function (val,index) {
                if(val.id==19){
                  if(val.state===1){
                    vm.codenum='code'
                    vm.CompanyCode=false
                  }else if(val.state===0){
                    vm.codenum='id'
                    vm.CompanyCode=true
                  }
                }
              })
//              if(vm.sysConfig[18].state===1){
//                vm.codenum='code'
//                vm.CompanyCode=false
//              }else if(vm.sysConfig[18].state===0){
//                vm.codenum='id'
//                vm.CompanyCode=true
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      findCompany (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/getMyDept.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            id:'0'
          })
        }).then((response) => {
          if (response.body.errors){
          } else {
            if (response.body.code == 0){
              vm.data5=new Array(response.body.dept)
              vm.data5.forEach(function (val,index) {
                vm.$set(val, 'title', val.name)
                vm.$set(val, 'children', val.childDepts)
                val.children.forEach(function (val1,index1) {
                  vm.$set(val1, 'title', val1.name)
                  vm.$set(val1, 'children', val1.childDepts)
                  val1.children.forEach(function (val2,index2) {
                    vm.$set(val2, 'title', val2.name)
                    vm.$set(val2, 'children', val2.childDepts)
                    val2.children.forEach(function (val3,index3) {
                      vm.$set(val3, 'title', val3.name)
                      vm.$set(val3, 'children', val3.childDepts)
                      val3.children.forEach(function (val4,index4) {
                        vm.$set(val4, 'title', val4.name)
                        vm.$set(val4, 'children', val4.childDepts)
                        val4.children.forEach(function (val5,index5) {
                          vm.$set(val5, 'title', val5.name)
                          vm.$set(val5, 'children', val5.childDepts)
                        })
                      })
                    })
                  })
                })
              })
            }
          }
        }).catch(function (response) {
            console.log(response)
          })
      },
      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '90%',
            height:'45px',
            paddingBottom:'10px',
            lineHeight:'45px',
          }
        }, [
          h('span', [
            h('Icon', {
              props: {

              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty',
                type:'text'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.data1=data;
                  this.addCompany()
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-compose-outline',
                type:'text'
              }),
              on: {
                click: () => {
                  this.data1=data;
                  this.editCompany(data)
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-trash-outline',
                type:'text'
              }),
              on: {
                click: () => {
                  this.data1=data;
                  this.removeCompany(root, node, data)
                }
              }
            })
          ])
        ]);
      },
      addCompany() {
        this.modal1 = true;
      },
      okCompany(name) {
        let vm = this
        let companyName=vm.formValidate.name
        let address=vm.formValidate.address
        let  remarks=vm.formValidate.remarks
        let  state=vm.formValidate.state
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/dept/add.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                id:vm.formValidate.id.toString(),
                parentId:vm.data1.id,
                name:vm.formValidate.name,
                address:vm.formValidate.address,
                remarks:vm.formValidate.remarks,
                state:vm.formValidate.state
              })
            }).then((response) => {
              if(response.body.code==0){
                const children = vm.data1.children || [];
                children.push({
                  title: companyName,
                  name:companyName,
                  id:response.body.deptId,
                  parentId:vm.data1.id,
                  address:address,
                  remarks:remarks,
                  state:state,
                  expand: true
                });
                vm.$set(vm.data1, 'children', children);
                vm.$set(vm.data1, 'expand', true);
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal1 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
              }else{
                alert(response.body.errors)
                vm.modal1 = false;
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
      editCompany( data){
        this.modal3 = true;
        this.formValidate.id=data.id
        this.formValidate.name=data.name
        this.formValidate.address=data.address
        this.formValidate.remarks=data.remarks
        this.formValidate.state=data.state
        this.a=data
      },
      updateCompany(name){
        let vm = this
        let companyName=vm.formValidate.name
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/dept/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                id:vm.formValidate.id.toString(),
                parentId:vm.a.parentId,
                name:vm.formValidate.name,
                address:vm.formValidate.address,
                remarks:vm.formValidate.remarks,
                state:vm.formValidate.state
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.$set(vm.a, 'title', companyName);
                vm.a.name= companyName
                vm.a.id=vm.formValidate.id
                vm.a.address=vm.formValidate.address
                vm.a.remarks=vm.formValidate.remarks
                vm.a.state=vm.formValidate.state
                vm.modal3 = false;
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
                vm.modal3 = true;
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
      removeCompany(root, node, data) {
        this.modal5=true
        this.c=node
        this.d=root
        this.e=data
      },
      okdel(){
        let node=this.c
        let root=this.d
        let data=this.e
        let vm=this
        this.$http({
          url:baseURL+'/sys/dept/del.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            id:data.id,
          })
        }).then((response) => {
          if (response.body.code==0){
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            vm.modal5=false
            vm.$Message.success(this.$t('common.messagedel'));
          } else {
            alert(response.body.errors)
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      cancel() {
        this.modal1 = false;
        this.modal3 = false;
        this.modal5 = false;
        this.$Message.info(this.$t('common.messageCancel'));
      },
    },
    created: function(){
      this.findCompany();
      this.getSysConfig();
    },
    watch:{
      'modal1':function (val) {
        if(val == false){
          let vm=this
          vm.formValidate.id=0
          vm.formValidate.name=''
          vm.formValidate.remarks=''
          vm.formValidate.address=''
          vm.formValidate.state='1'
        }
      },
      'modal3':function (val) {
        if(val==false){
          let vm=this
          vm.formValidate.id=0
          vm.formValidate.name=''
          vm.formValidate.remarks=''
          vm.formValidate.address=''
          vm.formValidate.state='1'
        }
      },
    }
  }
</script>
<style>
  .operatorInfo1 .ivu-modal-footer{
    padding:0  10px 0 0;
    height: 90px;
    border-top: none;
  }
  .operatorInfo1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .ivu-cascader .ivu-select-dropdown{
    position: absolute!important;
  }
  .operatorInfo1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
    color: #ffffff!important;
  }
  .operatorInfo .ivu-icon-arrow-right-b{
    position: relative;
    top: 8px;
  }

  .operatorInfo .ivu-icon + span{
    position: relative;
  }
  .operatorInfo .ivu-btn-icon-only{
    display: none;
  }
  .operatorInfo .ivu-tree-children li span:nth-child(2):hover {
    background-color: #f1f2f7;
    display: inline-block;
  }
  .operatorInfo .ivu-tree-children li span:nth-child(2):hover .ivu-btn-icon-only{
    display: inline-block;
  }

  .operatorInfo .ivu-tree-title-selected,.operatorInfo  .ivu-tree-title-selected:hover{
    padding: 5px 5px;
    width: 100%;
    background-color: #f1f2f7;
    margin-top: -15px;
    margin-left: 5px;
  }
  .operatorInfo .panel-heading .ivu-icon:before{
    font-size: 25px;
  }
  .operatorInfo .ivu-tree ul li:before{
    display: inline-block;
    content: "";
    margin-left: -16px;
    margin-right: 5px;
    width: 34px;
    /*border-top: 2px solid #666;*/
  }
  .operatorInfo .ivu-tree-children{
    margin-left: 18px!important;
    margin-top: -8px!important;
  }
  .operatorInfo .ivu-tree ul:before{
    display: inline-block;
    content: "";
    width: 2px;
  }
  .operatorInfo .ivu-tree ul li:last-child {
    position: relative;
    /*top: 14px;*/
  }
  .operatorInfo .ivu-tree ul{
    /*margin-left: 25px!important;*/
    /*padding-left: 14px;*/
    /*border-left: 2px solid #999;*/
  }
  .operatorInfo .ivu-tree>ul{
    padding-left: 17px;
  }
  .operatorInfo>.panel-heading {
    width: 98%;
    height: 100%;
    display: flex;
    min-height: 78vh;
    flex-direction: column;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 10%;
    border-color: #FFFFFF;
    font-size: 16px;
    font-weight: 300;
    background-color: #fff;
  }
  .operatorInfo{
    min-width:700px;
    width: 98%;
    height: 100%;
    margin-bottom: 60px;
  }
  .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .ivu-form-item{
    width: 70%;
    display: inline-block;
  }
  body{
    background: #e5e6e6!important;
  }
</style>
