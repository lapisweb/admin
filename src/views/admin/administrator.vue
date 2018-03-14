<template>
  <div style="margin-left: 270px">
    <div class="administrstor">
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
          width="600"
          :loading="modal_loading"
          :mask-closable="false"
          class-name="administrstor1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('administrstor.add')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 70%;margin: 0 auto">
              <FormItem  :label="this.$t('administrstor.loginName')" prop="loginName" style="width: 100%;">
                <Input v-model="formValidate.loginName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.mobile')" prop="mobile" style="width: 100%;">
                <Input type="text" v-model="formValidate.mobile" :placeholder="this.$t('common.placeholderMobile')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.email')" prop="email" style="width: 100%;">
                <Input v-model="formValidate.email" :placeholder="this.$t('common.placeholderEmail')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.roleid')" prop="roleid" style="width: 100%;">
                <Select size="large" v-model="formValidate.roleid" style="width: 100%;">
                  <Option v-for="item in rolelist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.deptId')" prop="deptId" style="width: 100%;">
                <Cascader :data="data" change-on-select  v-model="formValidate.deptId"></Cascader>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state" style="width: 100%;">
                <Select v-model="formValidate.state" style="width: 100%;">
                  <Option value=1>{{$t('common.enabled')}}</Option>
                  <Option value=0>{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="addAdmin('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal2"
          :loading="modal_loading"
          :mask-closable="false"
          class-name="administrstor1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('administrstor.edit')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
              <FormItem  :label="this.$t('administrstor.loginName')" prop="loginName" style="width: 100%;">
                <Input disabled v-model="formValidate.loginName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.mobile')" prop="mobile" style="width: 100%;">
                <Input v-model="formValidate.mobile" :placeholder="this.$t('common.placeholderMobile')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.email')" prop="email" style="width: 100%;">
                <Input v-model="formValidate.email" :placeholder="this.$t('common.placeholderEmail')" style="width: 100%;"></Input>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.roleid')" prop="roleid" style="width: 100%;">
                <Select size="large" v-model="formValidate.roleid" style="width: 100%;">
                  <Option v-for="item in rolelist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem  :label="this.$t('administrstor.deptId')" prop="deptId" style="width: 100%;">
                <Cascader :data="data" change-on-select  v-model="formValidate.deptId"></Cascader>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state" style="width: 100%;">
                <Select v-model="formValidate.state" style="width: 100%;">
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
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
          :loading="modal_loading"
          :mask-closable="false"
          class-name="administrstor1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('administrstor.repassword')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline style="width: 80%;margin: 0 auto">
              <FormItem  label="密码" prop="password" style="width: 100%;">
              <Input type="password" v-model="formValidate.password" placeholder="请输入新密码" style="width: 100%;"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="updatereset('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal5"
          :loading="modal_loading"
          :mask-closable="false"
          class-name="administrstor1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('administrstor.del')}}</p>
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
        <Page :total="userCount" :page-size="userpageSize" size="small" show-total  @on-change="changepage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }
      return {
        letparentName:'',
        letname:'',
        menuList:{},
        userList:[],
        // 初始化信息总条数
        userCount:0,
        // 每页显示多少条
        userpageSize:10,
        b:'',
        c:'',
        rolelist:[],
        adminrolelist:[],
        operatorrolelist:[],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal_loading: false,
        ruleValidate: {
          loginName: [
            { required: true, message:  this.$t('administrstor.messageLoginName'), trigger: 'blur' },
          ],
          roleid:[
            { required: true, message: this.$t('administrstor.messageRoleid'), trigger: 'change' }
          ],
          deptId:[
            { required: true, message: this.$t('administrstor.messageDeptId')}
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ]
        },
        formValidate: {
          loginName: '',
          email: '',
          mobile: '',
          roleid:'',
          deptId:[],
          roleName:'',
          userType:'',
          state:''
        },
        data:[],
        data6: [],
        columns7: [
          {
            title: this.$t('administrstor.loginName'),
            key: 'loginName'
          },
          {
            title: this.$t('administrstor.deptId'),
            key: 'deptId',
            render: (h, params)=>{
              return this.deptId(params.index)
            }
          },
          {
            title: this.$t('administrstor.mobile'),
            key: 'mobile'
          },
          {
            title: this.$t('administrstor.email'),
            key: 'email'
          },
          {
            title: this.$t('administrstor.roleid'),
            key: 'roleName',
          },
          {
            title: this.$t('common.createDate'),
            key: 'createDate',
            sortable: true
          },
          {
            title: this.$t('common.title'),
            key: 'state',
            render: (h, params)=>{
              return h('div',[
                h('Button', {
                  props: {
                    type: this.type(params.index),
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
                    icon: 'icon iconfont icon-zhongzhimima2',
                    type: 'success',
                    size: 'small'
                  }),
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.reset(params.index)
                    }
                  }
                }),
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
        ]
      }
    },
    methods: {
      deptId(index){
        let c=this.data6[index].deptId
        let vm=this
        let name
        vm.data.forEach(function (val,index) {
          if(val.id==c){
            name=val.name
          }
          val.value=val.id
          val.label=val.name
          val.children=val.childDepts
          val.children.forEach(function (val1,index1) {
            if(val1.id==c){
              name=val1.name
            }
            val1.value=val1.id
            val1.label=val1.name
            val1.children=val1.childDepts
            val1.children.forEach(function (val2,index2) {
              if(val2.id==c){
                name=val2.name
              }
              val2.value=val2.id
              val2.label=val2.name
              val2.children=val2.childDepts
              val2.children.forEach(function (val3,index3) {
                if(val3.id==c){
                  name=val3.name
                }
                val3.value=val3.id
                val3.label=val3.name
                val3.children=val3.childDepts
                val3.children.forEach(function (val4,index4) {
                  if(val4.id==c){
                    name=val4.name
                  }
                  val4.value=val4.id
                  val4.label=val4.name
                  val4.children=val4.childDepts
                  val4.children.forEach(function (val5,index5) {
                    if(val5.id==c){
                      name=val5.name
                    }
                    val5.value=val5.id
                    val5.label=val5.name
                    val5.children=val5.childDepts
                  })
                })
              })
            })
          })
        })
        return name
      },
      getrole(event){
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
              vm.rolelist=response.body.pageInfo.list
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getUser(event){
        let vm=this;
        this.$http({
          url:baseURL+'/sys/user/listByPage.do',
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
              vm.data6 = response.body.pageInfo.list
              this.userCount = Number(response.body.pageInfo.total);
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

          })
        }).then((response) => {
          if (response.body.errors){
          } else {
            if (response.body.code == 0){
              vm.data=new Array(response.body.dept)
              vm.data.forEach(function (val,index) {
                val.value=val.id
                val.label=val.name
                val.children=val.childDepts
                val.children.forEach(function (val1,index1) {
                  val1.value=val1.id
                  val1.label=val1.name
                  val1.children=val1.childDepts
                  val1.children.forEach(function (val2,index2) {
                    val2.value=val2.id
                    val2.label=val2.name
                    val2.children=val2.childDepts
                    val2.children.forEach(function (val3,index3) {
                      val3.value=val3.id
                      val3.label=val3.name
                      val3.children=val3.childDepts
                      val3.children.forEach(function (val4,index4) {
                        val4.value=val4.id
                        val4.label=val4.name
                        val4.children=val4.childDepts
                        val4.children.forEach(function (val5,index5) {
                          val5.value=val5.id
                          val5.label=val5.name
                          val5.children=val5.childDepts
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
      changepage(index){
        var _start = ( index - 1 ) * this.userpageSize;
        var _end = index * this.userpageSize;
        let vm=this;
        this.$http({
          url:baseURL+'/sys/user/listByPage.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:{
            'conditions':{

            },
            'limit':10,
            'page':index,
          },
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            if (response.body.code == 0){
              vm.data6 = response.body.pageInfo.list
              this.userCount = response.body.pageInfo.total;
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      userType(index){
        if(this.data6[index].userType == '1'){
          return 'primary'
        }
        else if(this.data6[index].userType== '2'){
          return 'warning'
        }
      },
      userstatus(index){
        if(this.data6[index].userType == '1'){
          return '管理员'
        }
        else if(this.data6[index].userType== '2'){
          return '操作员'
        }
      },
      type(index){
        if(this.data6[index].state == 1){
          return 'success'
        }
        else if(this.data6[index].state== 0){
          return 'error'
        }
        else if(this.data6[index].state== 2){
          return 'info'
        }
      },
      status(index){
        if(this.data6[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data6[index].state== 0){
          return this.$t('common.forbidden')
        }
        else if(this.data6[index].state== 2){
          return this.$t('common.userType0')
        }
      },
      addAdmin(name){
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/user/addUser.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                loginName:vm.formValidate.loginName,
                mobile:vm.formValidate.mobile,
                email:vm.formValidate.email,
                state:vm.formValidate.state,
                deptId:vm.formValidate.deptId[vm.formValidate.deptId.length-1],
                role:{
                  id:vm.formValidate.roleid
                },
                userType:1
              })
            }).then((response) => {
              if(response.body.code==0){
                let id=response.body.userId
                let name
                for(let i=0;i<vm.rolelist.length;i++){
                  if(vm.rolelist[i].id==vm.formValidate.roleid){
                    name= vm.rolelist[i].name
                  }
                }
                let date = new Date();
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                vm.data6.unshift({
                  id:id,
                  loginName:vm.formValidate.loginName,
                  mobile:vm.formValidate.mobile,
                  email:vm.formValidate.email,
                  state:vm.formValidate.state,
                  roleName:name,
                  deptId:vm.formValidate.deptId[vm.formValidate.deptId.length-1],
                  role:{
                    id:vm.formValidate.roleid
                  },
                  createDate:Y+M+D+h+m+s,
                  userType:1
                });
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal1 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
              }else{
                alert(response.body.errors)
                vm.modal1 = true;
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
        let id
        for(let i=0;i<this.rolelist.length;i++){
          if(this.rolelist[i].name==this.data6[index].roleName){
            id= this.rolelist[i].id
          }
        }
        this.formValidate.loginName=this.data6[index].loginName
        this.formValidate.mobile=this.data6[index].mobile
        this.formValidate.email=this.data6[index].email
        this.formValidate.roleid=id
        this.formValidate.state=this.data6[index].state.toString()
        this.b=index
      },
      update(name){
        let vm = this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/user/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                id:vm.data6[vm.b].id,
                loginName:vm.formValidate.loginName,
                mobile:vm.formValidate.mobile,
                email:vm.formValidate.email,
                state:vm.formValidate.state,
                deptId:vm.formValidate.deptId[vm.formValidate.deptId.length-1],
                role:{
                  id:vm.formValidate.roleid
                },
                userType:1
              })
            }).then((response) => {
              if(response.body.code==0){
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal2 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
                let name
                for(let i=0;i<vm.rolelist.length;i++){
                  if(vm.rolelist[i].id==vm.formValidate.roleid){
                    name= vm.rolelist[i].name
                  }
                }
                let date = new Date();
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();
                vm.data6.splice(this.b,1,{
                  id:vm.data6[vm.b].id,
                  loginName:vm.formValidate.loginName,
                  mobile:vm.formValidate.mobile,
                  email:vm.formValidate.email,
                  state:vm.formValidate.state,
                  roleName:name,
                  deptId:vm.formValidate.deptId[vm.formValidate.deptId.length-1],
                  role:{
                    id:vm.formValidate.roleid
                  },
                  createDate:Y+M+D+h+m+s,
                  userType:vm.data6[vm.b].userType
                });
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
      reset(index){
        let vm = this
            this.$http({
              url:baseURL+'/sys/user/resetPassword.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },

              body:JSON.stringify({
                id:vm.data6[index].id,
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
              }
            })
              .catch(function (response) {
                console.log(response)
              })
      },
      remove (index) {
        this.modal5 = true
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/user/del.do',
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
            vm.modal5=false
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
          this.modal3 = false
          this.modal4 = false
          this.modal5 = false
        }, 500);
        this.$Message.success(this.$t('common.messageCancel'));
      }
    },
    created: function(){
      this.getUser();
      this.getrole();
      this.findCompany();
    },
    watch:{
      'modal1':function (val) {
        if(val==false){
          this.formValidate.loginName=''
          this.formValidate.password=''
          this.formValidate.mobile=''
          this.formValidate.email=''
          this.formValidate.roleid=''
          this.formValidate.state=''
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.loginName=''
          this.formValidate.password=''
          this.formValidate.mobile=''
          this.formValidate.email=''
          this.formValidate.roleid=''
          this.formValidate.state=''
        }
      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.loginName=''
          this.formValidate.mobile=''
          this.formValidate.email=''
          this.formValidate.roleid=''
          this.formValidate.state=''
        }
      },
      'modal4':function (val){
        this.formValidate.password=''
      }
    }
  }
</script>
<style>
  .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .ivu-cascader .ivu-select-dropdown{
    position: absolute!important
  }
  .administrstor .ivu-table,.administrstor1 table,.administrstor1 .ivu-table-body,.administrstor1 .ivu-table-header,table{
    width: 100%!important;
  }
  .administrstor .ivu-table td, .administrstor .ivu-table th{
    text-align: center!important;
  }
  .administrstor1 .ivu-modal-confirm-body-render{
    margin: 5px 16px;
  }
  .administrstor .ivu-icon-help-circled:before{
    content: '';
  }
  .administrstor1 .ivu-modal-confirm{
    padding: 0;
    margin: -16px;
  }
  .administrstor1 .ivu-modal-confirm-head{
    color:#fff;
    background-color: #54b6d1;
    border-radius: 4px;
    padding: 14px 16px;
  }
  .administrstor1 .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .administrstor1 .ivu-form-item:before {
    content: none!important;
  }
  .administrstor1 .ivu-select,.administrstor1 .ivu-input-wrapper{
    width: 100%;
  }
  .administrstor1 .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: none;
  }
  .administrstor1 .ivu-checkbox-group{
    width: 104px;
  }
  .administrstor1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .administrstor1.input-group{
    width: 80%;
  }
  .administrstor1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .administrstor .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .administrstor .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .administrstor{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
  }
  .administrstor .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .administrstor .tfooter>.ivu-btn-success{
    margin-top: 13px;
    margin-left: 18px;
    padding: 5px 7px;
  }
  .administrstor .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .administrstor .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .administrstor .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .administrstor .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .administrstor .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .administrstor .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .administrstor .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .administrstor .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .administrstor .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
