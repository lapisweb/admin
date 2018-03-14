<template>
  <div style="margin-left: 270px">
    <div class="editvudk">
      <!--<header class="panel-heading">-->
      <!--<Button type="primary" @click="modal1=true" size="small">{{$t('common.add')}}</Button>-->
      <!--<span class="tools pull-right">-->
      <!--<a href="javascript:;" class="fa fa-chevron-down"></a>-->
      <!--</span>-->
      <!--</header>-->
      <!--&lt;!&ndash;<Table stripe  :columns="columns8" :data="datac"></Table>&ndash;&gt;-->
      <!--<div class="tfooter">-->
      <!--&lt;!&ndash;<Page :total="customerCount" :page-size="customerpageSize" size="small" show-total  @on-change="changepage"></Page>&ndash;&gt;-->
      <!--</div>-->
      <div style="margin: 2% auto;width: 98%;"    >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline >
          <FormItem  :label="this.$t('vudk.edit.companyName')" prop="deptId" style="width: 80%;">
            <Select size="large" v-model="formValidate.roleid" style="width: 100%;">
              <Option v-for="item in deptId" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem  :label="this.$t('vudk.edit.oldVUDK')" prop="deptId" style="width: 80%;">
            <Input v-model="formValidate.deptId"  readonly ></Input>
          </FormItem>
          <FormItem  :label="this.$t('vudk.edit.newVUDK')" prop="deptId" style="width:80%;">
            <Select size="large" v-model="formValidate.newVUDK" style="width: 100%;">
              <Option v-for="item in newVUDK" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <!--<Cascader :data="data" change-on-select  v-model="formValidate.deptId"></Cascader>-->
          </FormItem>
        </Form>
        <div class="ivu-modal-footer" style="height: 60px;">
          <!--<button  type="error" :loading="modal_loading" @click="off()"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">-->
          <!--<span style="color: #fff">{{$t('vudk.up')}}</span>-->
          <!--</button>-->
          <button style="background-color: #59ace2;border-color:  #59ace2;float: left;margin-left: 40%;" type="success" @click="addPrice('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
            <span>{{$t('vudk.edit.replace')}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        letparentName:'',
        letname:'',
        deptId:[],
        menuList:{},
        customerTypeList:[],
        // 初始化信息总条数
        customerCount:0,
        // 每页显示多少条
        customerpageSize:10,
        b:'',
        c:'',
        CustomerCode:false,
        pay:false,
        sysConfig:{},
        meterlist:{},
        pricelist:{},
        friendlylist:{},
        indeterminate: true,
        checkAll: false,
        price:false,
        checkAllGroup: ['开盖', '磁干扰'],
        date: [
          {
            value: 1,
            label: 1
          },
          {
            value: 2,
            label: 2
          },
          {
            value: 3,
            label: 3
          },
          {
            value: 4,
            label: 4
          },
          {
            value: 5,
            label: 5
          },
          {
            value: 6,
            label: 6
          },
          {
            value: 7,
            label: 7
          },
          {
            value: 8,
            label: 8
          },
          {
            value: 9,
            label: 9
          },
          {
            value: 10,
            label: 10
          },
          {
            value: 11,
            label: 11
          },
          {
            value: 12,
            label: 12
          },
          {
            value: 13,
            label: 13
          },
          {
            value: 14,
            label: 14
          },
          {
            value: 15,
            label: 15
          },
          {
            value: 16,
            label: 16
          },
          {
            value: 17,
            label: 17
          },
          {
            value: 18,
            label: 18
          },
          {
            value: 19,
            label: 19
          },
          {
            value: 20,
            label: 20
          },
          {
            value: 21,
            label: 21
          },
          {
            value: 22,
            label: 22
          },
          {
            value: 23,
            label: 23
          },
          {
            value: 24,
            label: 24
          },
          {
            value: 25,
            label: 25
          },
          {
            value: 26,
            label: 26
          },
          {
            value: 27,
            label: 27
          },
          {
            value: 28,
            label: 28
          },
        ],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        loading: true,
        baojing: false,
        yuyue:false,
        yuyue1:false,
        yuyue2:false,
        yueshiyongliang:false,
        formValidate: {
          customerTypeCode: 0,
          customerTypeName:'',
          payType:'',
          state:'',
          meterTypeCode:'',
          priceSchemeCode:'',
          reservePriceSchemeStartTime:'2001-01-01 00:00:00',
          reezeDay:1,
          openAccountFee:10.00,
          cancelPurchaseFee:1.00,
          replaceMeterFee:10.00,
          maxNormalWaterUsage:99999999,
          minNormalWaterUsage:0,
          reservePriceSchemeCode:'01',
          reserveFlag:false,
          eventFuncFlag:'00000000000000000000000000000000',
          prepaymentCustomerParm:{
            alarmCloseValveFlag:false,
            alarmValue:5.00,
            purchaseMax:9999999.00,
            monthMaxConsumeLimit:99999999,
            overdraftMax:9999999.00,
            friendlyPeriodSchemeCode:'',
            monthLimitFlag:this.yueshiyongliang
          }
        },
        ruleValidate: {
          customerTypeName: [
            { required: true, message: this.$t('customer. messagecustomerTypeName'), trigger: 'blur' },
          ],
          payType: [
            { required: true, message: this.$t('customer. messagemeter'), trigger: 'change' }
          ],
          state: [
            { required: true, message:this.$t('common.messageState'), trigger: 'change' }
          ],
          meterTypeCode: [
            { required: true, message: this.$t('customer. messagemetercode'), trigger: 'change' }
          ],
          priceSchemeCode: [
            { required: true, message: this.$t('customer. messageprice'), trigger: 'change' }
          ],
          reezeDay: [
            { required: true, message: this.$t('customer. messagereezeDay'),type: 'number', trigger: 'change' },

          ],
        },
        modal_loading: false,
        columns8: [
          {
            title:this.$t('common.SchemeCode'),
            key: 'customerTypeCode',
          },
          {
            title: this.$t('common.SchemeName'),
            key: 'customerTypeName'
          },
          {
            title: this.$t('customer.meter'),
            key: 'meterTypeCode',
            render: (h, params)=>{
              return this.meterTypeCode(params.index)
            }
          },
          {
            title: this.$t('customer.price'),
            key: 'priceSchemeCode',
            render: (h, params)=>{
              return this.priceSchemeCode(params.index)
            }
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
                    icon: 'icon iconfont icon-chakan',
                    type: 'success',
                    size: 'small'
                  }),
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
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
        ],
        datac: [],
        data:[],
      }
    },
    methods: {
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
              if(vm.sysConfig[3].state==1){
                vm.CustomerCode=false
              }else if(vm.sysConfig[3].state==0){
                vm.CustomerCode=true
              }
              if(vm.sysConfig[14].state==1){
                vm.pay=true
                vm.formValidate.payType='0'
              }else if(vm.sysConfig[14].state==0){
                vm.pay=true
                vm.formValidate.payType='1'
              }else if(vm.sysConfig[14].state==2){
                vm.pay=false
              }
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
              vm.deptId=response.body.dept.childDepts
              console.log(vm.deptId)

//              vm.data.forEach(function (val,index) {
//                val.value=val.id
//                val.label=val.name
//                val.children=val.childDepts
//                val.children.forEach(function (val1,index1) {
//                  val1.value=val1.id
//                  val1.label=val1.name
//                  val1.children=val1.childDepts
//                  val1.children.forEach(function (val2,index2) {
//                    val2.value=val2.id
//                    val2.label=val2.name
//                    val2.children=val2.childDepts
//                    val2.children.forEach(function (val3,index3) {
//                      val3.value=val3.id
//                      val3.label=val3.name
//                      val3.children=val3.childDepts
//                      val3.children.forEach(function (val4,index4) {
//                        val4.value=val4.id
//                        val4.label=val4.name
//                        val4.children=val4.childDepts
//                        val4.children.forEach(function (val5,index5) {
//                          val5.value=val5.id
//                          val5.label=val5.name
//                          val5.children=val5.childDepts
//                        })
//                      })
//                    })
//                  })
//                })
//              })
            }
          }
        }).catch(function (response) {
          console.log(response)
        })
      },
//      meterTypeCode(index){
//        let vm=this
//        let meterTypeName
//        for(let i=0;i<vm.meterlist.length;i++){
//          if(vm.meterlist[i].meterTypeCode==vm.datac[index].meterTypeCode){
//            meterTypeName= vm.meterlist[i].meterTypeName
//          }
//        }
//        return meterTypeName
//      },
//      priceSchemeCode(index){
//        let vm=this
//        let priceSchemeName
//        for(var i=0;i<vm.pricelist.length;i++){
//          if(vm.pricelist[i].priceSchemeCode==vm.datac[index].priceSchemeCode){
//            priceSchemeName=vm.pricelist[i].priceSchemeName
//          }
//        }
//        return priceSchemeName || vm.datac[index].priceSchemeCode
//      },
//      type(index){
//        if(this.datac[index].state == 1){
//          return 'success'
//        }
//        else if(this.datac[index].state== 0){
//          return 'error'
//        }
//      },
//      status(index){
//        if(this.datac[index].state == 1){
//          return this.$t('common.enabled')
//        }
//        else if(this.datac[index].state== 0){
//          return this.$t('common.forbidden')
//        }
//      },
//      getMeter (event) {
//        let vm=this;
//        this.$http({
//          url:baseURL+'/sys/meterType/findAll.do',
//          credentials: true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//          })
//        }).then((response) => {
//          if (response.body.errors){
//          } else {
//            if (response.body.code == 0){
//              vm.meterlist=response.body.list
//            }
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
//      getPrice (event) {
//        let vm=this;
//        this.$http({
//          url:baseURL+'/sys/priceScheme/findAll.do',
//          credentials: true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//          })
//        }).then((response) => {
//          if (response.body.errors){
//          } else {
//            if (response.body.code == 0){
//              vm.pricelist=response.body.list
//            }
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
//      getFriendly (event) {
//        let vm=this;
//        this.$http({
//          url:baseURL+'/sys/friendlyPeriod/findAll.do',
//          credentials: true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//          })
//        }).then((response) => {
//          if (response.body.errors){
//          } else {
//            if (response.body.code == 0){
//              vm.friendlylist = response.body.list
//            }
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
//      getCustomer (event) {
//        let vm=this;
//        this.$http({
//          url:baseURL+'/sys/customerType/findAll.do',
//          credentials: true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//          })
//        }).then((response) => {
//          if (response.body.errors){
//          } else {
//            if (response.body.code == 0){
//              vm.formValidate.customerTypeCode=Number(vm.formValidate.customerTypeCode)
//              this.customerTypeList = response.body.list
//              this.customerCount = response.body.list.length;
//              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
//              if(response.body.list.length < this.customerpageSize){
//                this.datac = this.customerTypeList;
//              }else{
//                this.datac = this.customerTypeList.slice(0,this.customerpageSize);
//              }
//            }
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
//      changepage(index){
//        var _start = ( index - 1 ) * this.customerpageSize;
//        var _end = index * this.customerpageSize;
//        this.datac = this.customerTypeList.slice(_start,_end);
//      },
//      handleSubmit (name) {
//        let vm=this
//        vm.$refs[name].validate((valid) => {
//          if (valid) {
//            let date
//            let Y
//            let M
//            let D
//            let h
//            let m
//            let s
//            if(vm.yuyue==true){
//              let date = vm.formValidate.reservePriceSchemeStartTime;
//              let Y = date.getFullYear() + '-';
//              let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//              let D = date.getDate() + ' ';
//              let h = date.getHours() + ':';
//              let m = date.getMinutes() + ':';
//              let s = date.getSeconds();
//            }
//            if(date==null){
//              date='2001-01-01 00:00:00'
//            }else{
//              date=Y+M+D+h+m+s
//            }
//            this.$http({
//              url:baseURL+'/sys/customerType/addCustomerType.do',
//              credentials: true,
//              method: 'POST',
//              headers: {
//                'Content-Type': 'application/json'
//              },
//              body:JSON.stringify({
//                customerTypeCode:vm.formValidate.customerTypeCode,
//                customerTypeName:vm.formValidate.customerTypeName,
//                meterTypeCode:vm.formValidate.meterTypeCode.toString(),
//                payType:vm.formValidate.payType.toString(),
//                state:vm.formValidate.state.toString(),
//                priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
//                reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
//                reservePriceSchemeStartTime:date,
//                reezeDay:vm.formValidate.reezeDay,
//                openAccountFee:vm.formValidate.openAccountFee,
//                cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
//                replaceMeterFee:vm.formValidate.replaceMeterFee,
//                maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
//                minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
//                prepaymentCustomerParm:{
//                  alarmCloseValveFlag:vm.baojing,
//                  alarmValue:vm.formValidate.prepaymentCustomerParm.alarmValue,
//                  purchaseMax:vm.formValidate.prepaymentCustomerParm.purchaseMax,
//                  monthMaxConsumeLimit:vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
//                  overdraftMax:vm.formValidate.prepaymentCustomerParm.overdraftMax,
//                  friendlyPeriodSchemeCode:vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
//                  monthLimitFlag:vm.yueshiyongliang
//                }
//              })
//            }).then((response) => {
//              if(response.body.code==0){
//                vm.datac.unshift({
//                  customerTypeCode:response.body.customerTypeCode,
//                  customerTypeName:vm.formValidate.customerTypeName,
//                  meterTypeCode:vm.formValidate.meterTypeCode.toString(),
//                  payType:vm.formValidate.payType.toString(),
//                  state:vm.formValidate.state.toString(),
//                  priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
//                  reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
//                  reservePriceSchemeStartTime:date,
//                  reezeDay:vm.formValidate.reezeDay,
//                  openAccountFee:vm.formValidate.openAccountFee,
//                  cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
//                  replaceMeterFee:vm.formValidate.replaceMeterFee,
//                  maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
//                  minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
//                  prepaymentCustomerParm:{
//                    alarmCloseValveFlag:vm.baojing,
//                    alarmValue:vm.formValidate.prepaymentCustomerParm.alarmValue,
//                    purchaseMax:vm.formValidate.prepaymentCustomerParm.purchaseMax,
//                    monthMaxConsumeLimit:vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
//                    overdraftMax:vm.formValidate.prepaymentCustomerParm.overdraftMax,
//                    friendlyPeriodSchemeCode:vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
//                    monthLimitFlag:vm.yueshiyongliang
//                  }
//                });
//                vm.$Message.success(this.$t('common.messageSuccess'));
//                vm.modal1 = false;
//              }else{
//                alert(response.body.errors)
//                vm.modal1 = true;
//              }
//            }).catch(function (response) {
//              console.log(response)
//            })
//          } else {
//            vm.$Message.error(this.$t('common.messageError'));
//          }
//        })
//      },
//      show (index) {
//        if(this.datac[index].reservePriceSchemeCode==0){
//          this.yuyue1=false
//        }else{
//          this.yuyue1=true
//        }
//        this.modal2 = true;
//        this.formValidate.payType=this.datac[index].payType.toString()
//        this.formValidate.customerTypeCode=Number(this.datac[index].customerTypeCode)
//        this.formValidate.customerTypeName=this.datac[index].customerTypeName
//        this.formValidate.meterTypeCode=this.datac[index].meterTypeCode.toString()
//        this.formValidate.state=this.datac[index].state.toString()
//        this.formValidate.priceSchemeCode=this.datac[index].priceSchemeCode.toString()
//        this.formValidate.reservePriceSchemeStartTime=this.datac[index].reservePriceSchemeStartTime.toString()
//        this.formValidate.reservePriceSchemeCode=this.datac[index].reservePriceSchemeCode.toString()
//        this.formValidate.reezeDay=this.datac[index].reezeDay
//        this.formValidate.openAccountFee=this.datac[index].openAccountFee
//        this.formValidate.cancelPurchaseFee=this.datac[index].cancelPurchaseFee
//        this.formValidate.replaceMeterFee=this.datac[index].replaceMeterFee
//        this.formValidate.maxNormalWaterUsage=this.datac[index].maxNormalWaterUsage
//        this.formValidate.minNormalWaterUsage=this.datac[index].minNormalWaterUsage
//        this.formValidate.prepaymentCustomerParm.alarmValue=this.datac[index].prepaymentCustomerParm.alarmValue
//        this.formValidate.prepaymentCustomerParm.purchaseMax=this.datac[index].prepaymentCustomerParm.purchaseMax
//        this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=this.datac[index].prepaymentCustomerParm.monthMaxConsumeLimit
//        this.formValidate.prepaymentCustomerParm.overdraftMax=this.datac[index].prepaymentCustomerParm.overdraftMax
//        this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=this.datac[index].prepaymentCustomerParm.friendlyPeriodSchemeCode.toString()
//        this.formValidate.prepaymentCustomerParm.alarmCloseValveFlag=this.datac[index].prepaymentCustomerParm.alarmCloseValveFlag
//        this.formValidate.prepaymentCustomerParm.monthLimitFlag=this.datac[index].prepaymentCustomerParm.monthLimitFlag
//      },
//      edit (index) {
//        this.modal3 = true;
//        if(this.datac[index].reservePriceSchemeCode==0){
//          this.yuyue1=false
//        }else{
//          this.yuyue1=true
//        }
//        this.formValidate.payType=this.datac[index].payType.toString()
//        this.formValidate.customerTypeCode=this.datac[index].customerTypeCode
//        this.formValidate.customerTypeName=this.datac[index].customerTypeName
//        this.formValidate.meterTypeCode=this.datac[index].meterTypeCode.toString()
//        this.formValidate.state=this.datac[index].state.toString()
//        this.formValidate.priceSchemeCode=this.datac[index].priceSchemeCode.toString()
//        this.formValidate.reservePriceSchemeStartTime=this.datac[index].reservePriceSchemeStartTime
//        this.formValidate.reservePriceSchemeCode=this.datac[index].reservePriceSchemeCode.toString()
//        this.formValidate.reezeDay=this.datac[index].reezeDay
//        this.formValidate.openAccountFee=this.datac[index].openAccountFee
//        this.formValidate.cancelPurchaseFee=this.datac[index].cancelPurchaseFee
//        this.formValidate.replaceMeterFee=this.datac[index].replaceMeterFee
//        this.formValidate.maxNormalWaterUsage=this.datac[index].maxNormalWaterUsage
//        this.formValidate.minNormalWaterUsage=this.datac[index].minNormalWaterUsage
//        this.formValidate.prepaymentCustomerParm.alarmValue=this.datac[index].prepaymentCustomerParm.alarmValue
//        this.formValidate.prepaymentCustomerParm.purchaseMax=this.datac[index].prepaymentCustomerParm.purchaseMax
//        this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=this.datac[index].prepaymentCustomerParm.monthMaxConsumeLimit
//        this.formValidate.prepaymentCustomerParm.overdraftMax=this.datac[index].prepaymentCustomerParm.overdraftMax
//        this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=this.datac[index].prepaymentCustomerParm.friendlyPeriodSchemeCode.toString()
//        this.formValidate.prepaymentCustomerParm.alarmCloseValveFlag=this.datac[index].prepaymentCustomerParm.alarmCloseValveFlag
//        this.formValidate.prepaymentCustomerParm.monthLimitFlag=this.datac[index].prepaymentCustomerParm.monthLimitFlag
//        this.b=index
//      },
//      update(name){
//        let vm = this
//        vm.$refs[name].validate((valid) => {
//          if (valid) {
//            let date
//            let Y
//            let M
//            let D
//            let h
//            let m
//            let s
//            if(vm.yuyue==true){
//              let date = vm.formValidate.reservePriceSchemeStartTime;
//              let Y = date.getFullYear() + '-';
//              let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//              let D = date.getDate() + ' ';
//              let h = date.getHours() + ':';
//              let m = date.getMinutes() + ':';
//              let s = date.getSeconds();
//            }
//            if(date==null){
//              date='2001-01-01 00:00:00'
//            }else{
//              date=Y+M+D+h+m+s
//            }
//            this.$http({
//              url:baseURL+'/sys/customerType/update.do',
//              credentials: true,
//              method: 'POST',
//              headers: {
//                'Content-Type': 'application/json'
//              },
//              body:JSON.stringify({
//                customerTypeCode:vm.formValidate.customerTypeCode.toString(),
//                customerTypeName:vm.formValidate.customerTypeName,
//                meterTypeCode:vm.formValidate.meterTypeCode.toString(),
//                payType:vm.formValidate.payType,
//                state:vm.formValidate.state.toString(),
//                priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
//                reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
//                reservePriceSchemeStartTime:date,
//                reezeDay:vm.formValidate.reezeDay,
//                openAccountFee:vm.formValidate.openAccountFee,
//                cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
//                replaceMeterFee:vm.formValidate.replaceMeterFee,
//                maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
//                minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
//                prepaymentCustomerParm: {
//                  alarmCloseValveFlag: vm.formValidate.prepaymentCustomerParm.alarmCloseValveFlag,
//                  alarmValue: vm.formValidate.prepaymentCustomerParm.alarmValue,
//                  purchaseMax: vm.formValidate.prepaymentCustomerParm.purchaseMax,
//                  monthMaxConsumeLimit: vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
//                  overdraftMax: vm.formValidate.prepaymentCustomerParm.overdraftMax,
//                  friendlyPeriodSchemeCode: vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
//                  monthLimitFlag: vm.formValidate.prepaymentCustomerParm.monthLimitFlag
//                }
//              })
//            }).then((response) => {
//              if(response.body.code==0){
//                vm.datac.splice(this.b,1,{
//                  customerTypeCode:vm.formValidate.customerTypeCode.toString(),
//                  customerTypeName:vm.formValidate.customerTypeName,
//                  meterTypeCode:vm.formValidate.meterTypeCode.toString(),
//                  payType:vm.formValidate.payType,
//                  state:vm.formValidate.state.toString(),
//                  priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
//                  reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
//                  reservePriceSchemeStartTime:date,
//                  reezeDay:vm.formValidate.reezeDay,
//                  openAccountFee:vm.formValidate.openAccountFee,
//                  cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
//                  replaceMeterFee:vm.formValidate.replaceMeterFee,
//                  maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
//                  minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
//                  prepaymentCustomerParm: {
//                    alarmCloseValveFlag: vm.formValidate.prepaymentCustomerParm.alarmCloseValveFlag,
//                    alarmValue: vm.formValidate.prepaymentCustomerParm.alarmValue,
//                    purchaseMax: vm.formValidate.prepaymentCustomerParm.purchaseMax,
//                    monthMaxConsumeLimit: vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
//                    overdraftMax: vm.formValidate.prepaymentCustomerParm.overdraftMax,
//                    friendlyPeriodSchemeCode: vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
//                    monthLimitFlag: vm.formValidate.prepaymentCustomerParm.monthLimitFlag
//                  }
//                });
//                vm.modal3 = false;
//                vm.$Message.success(this.$t('common.messageSuccess'));
//              }else{
//                alert(response.body.errors)
//                vm.modal3 = true;
//              }
//            })
//              .catch(function (response) {
//                console.log(response)
//              })
//          } else {
//            vm.$Message.error(this.$t('common.messageError'));
//          }
//        })
//      },
//      remove (index) {
//        this.modal4 = true
//        this.c=index
//      },
//      okdel(){
//        let vm=this
//        this.$http({
//          url:baseURL+'/sys/customerType/delCustomerType.do',
//          credentials: true,
//          method: 'POST',
//          async: false,
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//            customerTypeCode:vm.datac[vm.c].customerTypeCode
//          })
//        }).then((response) => {
//          if (response.body.errors){
//            alert(response.body.errors)
//          } else {
//            vm.getCustomer();
//            vm.modal4= false;
//            vm.$Message.success(this.$t('common.messagedel'));
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
//      ok () {
//        this.$Message.info(this.$t('common.messageOk'))
//        this.modal2 = false;
//      },
//      cancel () {
//        let vm=this
//        vm.modal_loading = true;
//        setTimeout(() => {
//          vm.modal_loading = false;
//          vm.modal1 = false;
//          vm.modal2 = false;
//          vm.modal3= false;
//          vm.modal4= false;
//          vm.$Message.success(this.$t('common.messageCancel'));
//        }, 500);
//      }
    },
    created: function(){
//      this.getCustomer();
//      this.getMeter()
//      this.getPrice()
//      this.getFriendly()
      this.getSysConfig();
      this.findCompany();
    },
    watch:{
//      'formValidate.payType':function (val) {
//        if(val==0){
//          this.yuyue2=true
//        }else{
//          this.yuyue2=false
//        }
//      },
//      'yuyue':function (val) {
//        if(val==false){
//          this.formValidate.reservePriceSchemeStartTime=''
//          this.formValidate.reservePriceSchemeCode=''
//        }
//      },
//      'modal1':function (val) {
//        if(val==false){
//          this.formValidate.customerTypeCode=0
//          this.formValidate.customerTypeName=''
//          this.formValidate.meterTypeCode=''
//          this.formValidate.payType=''
//          this.formValidate.state=''
//          this.formValidate.priceSchemeCode=''
//          this.formValidate.reservePriceSchemeCod=''
//          this.formValidate.reservePriceSchemeStartTime=''
//          this.formValidate.reezeDay=1
//          this.formValidate.openAccountFee=10.00
//          this.formValidate.cancelPurchaseFee=1.00
//          this.formValidate.replaceMeterFee=10.00
//          this.formValidate.maxNormalWaterUsage=99999999
//          this.formValidate.minNormalWaterUsage=0
//          this.formValidate.alarmCloseValveFlag=false
//          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
//          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
//          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
//          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
//          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
//          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
//        }
//      },
//      'modal2':function (val) {
//        if(val==false){
//          this.formValidate.customerTypeCode=0
//          this.formValidate.customerTypeName=''
//          this.formValidate.meterTypeCode=''
//          this.formValidate.payType=''
//          this.formValidate.state=''
//          this.formValidate.priceSchemeCode=''
//          this.formValidate.reservePriceSchemeCod=''
//          this.formValidate.reservePriceSchemeStartTime=''
//          this.formValidate.reezeDay=1
//          this.formValidate.openAccountFee=10.00
//          this.formValidate.cancelPurchaseFee=1.00
//          this.formValidate.replaceMeterFee=10.00
//          this.formValidate.maxNormalWaterUsage=99999999
//          this.formValidate.minNormalWaterUsage=0
//          this.formValidate.alarmCloseValveFlag=false
//          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
//          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
//          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
//          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
//          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
//          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
//        }
//      },
//      'modal3':function (val) {
//        if(val==false){
//          this.formValidate.customerTypeCode=0
//          this.formValidate.customerTypeName=''
//          this.formValidate.meterTypeCode=''
//          this.formValidate.payType=''
//          this.formValidate.state=''
//          this.formValidate.priceSchemeCode=''
//          this.formValidate.reservePriceSchemeCod=''
//          this.formValidate.reservePriceSchemeStartTime=''
//          this.formValidate.reezeDay=1
//          this.formValidate.openAccountFee=10.00
//          this.formValidate.cancelPurchaseFee=1.00
//          this.formValidate.replaceMeterFee=10.00
//          this.formValidate.maxNormalWaterUsage=99999999
//          this.formValidate.minNormalWaterUsage=0
//          this.formValidate.alarmCloseValveFlag=false
//          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
//          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
//          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
//          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
//          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
//          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
//        }
//      }
    }
  }
</script>
<style>
  .editvudk .ivu-modal-footer{
    border: none;
  }
  th{
    text-align: center!important;
  }
  .editvudk .ivu-form{
    padding: 20px;
  }

  .editvudk .ivu-upload-drag{
    width: 100%;
    height: 100px;
    /*margin-top: 20px;*/
  }
  .editvudk .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .editvudk{
    min-width:700px;
    width: 98%;
    min-height: 75vh;
    margin-bottom: 60px;
    background-color: #fff;
    border-radius: 4px;
  }
  .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .tfooter>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .ivu-table:before,.ivu-table:after{
    content: none;
  }

  .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .ivu-page-item-active{
    background-color:  #2489a6;
  }

</style>


