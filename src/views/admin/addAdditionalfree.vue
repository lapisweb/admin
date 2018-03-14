<template>
  <div style="margin-left:270px;">
    <div class="addAdditionalfree">
      <div style="margin: 2% auto;width: 98%;"      >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem :label="this.$t('common.SchemeName')" class="schemeName"  prop="additionalFeeSchemeName" style="width: 47%;">
            <Input v-model="formValidate.additionalFeeSchemeName" :placeholder="this.$t('common.placeholderName')"></Input>
          </FormItem>
          <FormItem class="schemeName"  :label="this.$t('common.state')" prop="state" style="width: 47%;">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
          </FormItem>
          <FormItem class="schemeName" style="width: 100%;"  >
          <Modal
            v-model="modal1"
            width="600"
            class-name="addAdditionalfree1"
            :loading="loading"
            :mask-closable="false">
            <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.addprice.add')}}</p>
            <div >
              <Form ref="formValidat" :model="formValidate.additionalFeeDetails" :rules="ruleValidate"  inline>
                <FormItem :label="this.$t('additionalfree.additionalFeeName')" prop="additionalFeeName">
                  <Input v-model="formValidate.additionalFeeDetails.additionalFeeName" :placeholder="this.$t('common.placeholderName')"></Input>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeType')" prop="additionalFeeType">
                  <Select v-model="formValidate.additionalFeeDetails.additionalFeeType" >
                    <Option value="0">{{$t('additionalfree.additionalFeeType0')}}</Option>
                    <Option v-show="type1"  value="1">{{$t('additionalfree.additionalFeeType1')}}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeDeductionMode')" prop="additionalFeeDeductionMode">
                  <Select size="large" v-model="formValidate.additionalFeeDetails.additionalFeeDeductionMode">
                    <Option value="0">{{$t('additionalfree.additionalFeeDeductionMode0')}}</Option>
                    <Option value="1">{{$t('additionalfree.additionalFeeDeductionMode1')}}</Option>
                    <Option value="2">{{$t('additionalfree.additionalFeeDeductionMode2')}}</Option>
                    <Option value="3">{{$t('additionalfree.additionalFeeDeductionMode3')}}</Option>
                    <Option value="4">{{$t('additionalfree.additionalFeeDeductionMode4')}}</Option>
                    <Option value="5">{{$t('additionalfree.additionalFeeDeductionMode5')}}</Option>
                    <Option value="6">{{$t('additionalfree.additionalFeeDeductionMode6')}}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeDeductionTimes')" prop="additionalFeeDeductionTimes">
                  <div class="ivu-input-wrapper ivu-input-type">
                    <InputNumber :disabled="times" :max="99999"  :min="0" v-model="formValidate.additionalFeeDetails.additionalFeeDeductionTimes" style="width: 100%;"></InputNumber>
                  </div>
                </FormItem>

                <FormItem :label="this.$t('additionalfree.additionalFeeDeductionRate')" prop="additionalFeeDeductionRate">
                  <div class="ivu-input-wrapper ivu-input-type">
                    <InputNumber :disabled="rate" :max="100" :min="0" v-model="formValidate.additionalFeeDetails.additionalFeeDeductionRate" style="width: 100%;"></InputNumber>
                  </div>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeStartDate')" prop="additionalFeeStartDate">
                  <DatePicker type="date" :placeholder="this.$t('additionalfree.addprice.messageadditionalFeeStartDat')" style="width: 100%" v-model="formValidate.additionalFeeDetails.additionalFeeStartDate"  >
                  </DatePicker>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeDeductionAmount')" prop="additionalFeeDeductionAmount">
                  <div class="ivu-input-wrapper ivu-input-type">
                    <InputNumber :disabled="amount"  v-model="formValidate.additionalFeeDetails.additionalFeeDeductionAmount" style="width: 100%;"></InputNumber>
                  </div>
                </FormItem>
                <FormItem :label="this.$t('additionalfree.additionalFeeVat')" prop="additionalFeeVat" >
                  <div class="ivu-input-wrapper ivu-input-type">
                    <InputNumber :disabled="vat" :max="100" :min="0" v-model="formValidate.additionalFeeDetails.additionalFeeVat" style="width: 100%;"></InputNumber>
                  </div>
                </FormItem>

                <FormItem :label="this.$t('additionalfree.additionalFeeDeductionUnitPrice')" prop="additionalFeeDeductionUnitPrice">
                  <div class="ivu-input-wrapper ivu-input-type">
                    <InputNumber :disabled="price" :min="1" v-model="formValidate.additionalFeeDetails.additionalFeeDeductionUnitPrice" style="width: 100%;"></InputNumber>
                  </div>
                </FormItem>

              </Form>
            </div>
            <div slot="footer" style="height: 60px;">
                  <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                    <button  type="error" @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                      <span style="color: #fff">{{$t('common.cancel')}}</span>
                    </button>
                    <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="addStep('formValidat')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                      <span>{{$t('common.ok')}}</span>
                    </button>
                  </div>
            </div>
          </Modal>
            <Modal
              v-model="modal2"
              width="600"
              class-name="addAdditionalfree1"
              :loading="loading"
              :mask-closable="false">
              <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.addprice.edit')}}</p>
              <div >
                <Form ref="formValidatee" :model="formValidatee.additionalFeeDetails" :rules="ruleValidate"  inline>
                  <FormItem :label="this.$t('additionalfree.additionalFeeName')" prop="additionalFeeName">
                    <Input v-model="formValidatee.additionalFeeDetails.additionalFeeName" :placeholder="this.$t('common.placeholderName')"></Input>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeType')" prop="additionalFeeType">
                    <Select v-model="formValidatee.additionalFeeDetails.additionalFeeType" >
                      <Option value="0">{{$t('additionalfree.additionalFeeType0')}}</Option>
                      <Option v-show="type1" value="1">{{$t('additionalfree.additionalFeeType1')}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionMode')" prop="additionalFeeDeductionMode">
                    <Select size="large" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionMode">
                      <Option value="0">{{$t('additionalfree.additionalFeeDeductionMode0')}}</Option>
                      <Option value="1">{{$t('additionalfree.additionalFeeDeductionMode1')}}</Option>
                      <Option value="2">{{$t('additionalfree.additionalFeeDeductionMode2')}}</Option>
                      <Option value="3">{{$t('additionalfree.additionalFeeDeductionMode3')}}</Option>
                      <Option value="4">{{$t('additionalfree.additionalFeeDeductionMode4')}}</Option>
                      <Option value="5">{{$t('additionalfree.additionalFeeDeductionMode5')}}</Option>
                      <Option value="6">{{$t('additionalfree.additionalFeeDeductionMode6')}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionTimes')" prop="additionalFeeDeductionTimes">

                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="times" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionTimes" style="width: 100%;"></InputNumber>
                    </div>

                  </FormItem>

                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionRate')" prop="additionalFeeDeductionRate">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="rate" :max="100" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionRate" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeStartDate')" prop="additionalFeeStartDate">
                    <DatePicker type="date" :placeholder="this.$t('additionalfree.addprice.messageadditionalFeeStartDat')" style="width: 100%" v-model="formValidatee.additionalFeeDetails.additionalFeeStartDate"  >
                    </DatePicker>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionAmount')" prop="additionalFeeDeductionAmount">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="amount" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionAmount" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeVat')" prop="additionalFeeVat" >
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="vat" :max="100" :min="0" v-model="formValidatee.additionalFeeDetails.additionalFeeVat" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionUnitPrice')" prop="additionalFeeDeductionUnitPrice">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="price" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer" style="height: 60px;">
                    <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                      <button  type="error" @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span style="color: #fff">{{$t('common.cancel')}}</span>
                      </button>
                      <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="updateStep('formValidatee')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                        <span>{{$t('common.ok')}}</span>
                      </button>
                    </div>
              </div>
            </Modal>
            <Modal
              v-model="modal4"
              width="600"
              class-name="addAdditionalfree1"
              :loading="loading"
              :mask-closable="false">
              <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.addprice.del')}}</p>
              <div style="margin-top:5%;text-align: center;">
                <Icon type="information-circled" color="red" size="30" ></Icon>
                &nbsp;&nbsp;&nbsp;
                <span style="font-size: 20px"> {{$t('common.del')}}?</span>
              </div>
              <div slot="footer" style="height: 60px;">
                <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                  <button  type="error" @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
              </div>
            </Modal>
          </FormItem>
          <header class="panel-heading">
            <Button type="success" @click="modal1 = true"  size="large">
              <i class="layui-icon">&#xe615;</i>
              {{$t('common.add')}}</Button>
            <span class="tools pull-right">
              <a href="javascript:;" class="fa fa-chevron-down"></a>
            </span>
          </header>
          <Table stripe :columns="columns1" :data="data61"></Table>
        </Form>
        <div class="ivu-modal-footer" style="height: 60px;">
          <button  type="error" :loading="modal_loading" @click="cancle()"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
            <span style="color: #fff">{{$t('common.cancel')}}</span>
          </button>
          <button style="background-color: #59ace2;border-color:  #59ace2"  type="success" @click="addadditional('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
            <span>{{$t('common.ok')}}</span>
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
        type1:false,
        letparentName:'',
        letname:'',
        menuList:{},
        a:'',
        c:'',
        sysConfig:{},
        value1:1,
        loading: true,
        vat:false,
        times:false,
        amount:false,
        rate:false,
        price:false,
        formValidatee: {
          additionalFeeDetails:{
            additionalFeeDeductionAmount:0,
            additionalFeeDeductionMode:0,
            additionalFeeDeductionTimes:0,
            additionalFeeDeductionUnitPrice:0,
            additionalFeeDeductionRate:10,
            additionalFeeIndex:0,
            additionalFeeName:'',
            additionalFeeSchemeCode:'',
            additionalFeeStartDate:0,
            additionalFeeType:0,
            additionalFeeVat:0
          },
        },
        formValidate: {
          additionalFeeDetails:{
            additionalFeeDeductionAmount:0,
            additionalFeeDeductionMode:0,
            additionalFeeDeductionTimes:0,
            additionalFeeDeductionUnitPrice:0,
            additionalFeeDeductionRate:0,
            additionalFeeIndex:1,
            additionalFeeName:'',
            additionalFeeSchemeCode:'',
            additionalFeeStartDate:0,
            additionalFeeType:0,
            additionalFeeVat:0
          },
          additionalFeeSchemeCode: '',
          additionalFeeSchemeName: '',
          createDate: '',
          state: '',
        },
        ruleValidate: {
          additionalFeeSchemeName: [
            { required: true, message: this.$t('additionalfree.addprice.messageadditionalFeeSchemeName'), trigger: 'blur' },
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ],
          additionalFeeName:[
            { required: true, message: this.$t('additionalfree.addprice.messageadditionalFeeName'), trigger: 'blur' },
          ],
          additionalFeeType: [
            { required: true, message: this.$t('additionalfree.addprice.messageadditionalFeeType'), trigger: 'change' }
          ],
          additionalFeeDeductionMode: [
            { required: true, message: this.$t('additionalfree.addprice.messageadditionalFeeDeductionMode'), trigger: 'change' }
          ],
          additionalFeeStartDate: [
            { required: true, type: 'date', message: this.$t('additionalfree.addprice.messageadditionalFeeStartDate'), trigger: 'change' }
          ],

        },
        value:'',
        modal_loading: false,
        modal1: false,
        modal2: false,
        modal4: false,
        columns1: [
          {
            title: this.$t('additionalfree.additionalFeeIndex'),
            type:'index',
            className: 'indexstep'
          },
          {
            title: this.$t('additionalfree.additionalFeeName'),
            key: 'additionalFeeName',
            className: 'itemName'
          },
          {
            title: this.$t('additionalfree.additionalFeeType'),
            key: 'additionalFeeType',
            className: 'feeType',
            render: (h, params)=>{
              return this.additionalFeeType(params.index)
            }
          },
          {
            title:  this.$t('additionalfree.additionalFeeDeductionTimes'),
            key: 'additionalFeeDeductionTimes',
            className: 'deductionTime'
          },
          {
            title: this.$t('additionalfree.additionalFeeDeductionMode'),
            key: 'additionalFeeDeductionMode',
            className: 'deductionType',
            render: (h, params)=>{
              return this.additionalFeeDeductionMode(params.index)
            }
          },
          {
            title: this.$t('additionalfree.additionalFeeDeductionRate'),
            key: 'additionalFeeDeductionRate',
            className: 'deductionPercentage'
          },
          {
            title: this.$t('additionalfree.additionalFeeDeductionAmount'),
            key: 'additionalFeeDeductionAmount',
            className: 'deductionAmount'
          },
          {
            title: this.$t('additionalfree.additionalFeeVat'),
            key: 'additionalFeeVat',
            className: 'vat'
          },
          {
            title: this.$t('additionalfree.additionalFeeDeductionUnitPrice'),
            key: 'additionalFeeDeductionUnitPrice',
            className: 'unitPrice'
          },
          {
            title: this.$t('additionalfree.additionalFeeStartDate'),
            key: 'additionalFeeStartDate',
            className: 'appliedDate'
          },
          {
            title:  this.$t('common.action'),
            key: 'action',
            width: 100,
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
                      this.editStep(params.index)
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
          }
        ],
        data6: [
        ],
        data61:[],
        data62:[]
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
              vm.sysConfig.forEach(function (val,index) {
                if(val.id==8){
                  if(val.state==0){
                    vm.type1=false
                  }else{
                    vm.type1=true
                  }
                }
              })
//              if(vm.sysConfig[8].state==0){
//                this.type1=false
//              }else{
//                this.type1=true
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      additionalFeeType(index){
        if(this.data61[index].additionalFeeType == 0){
          return this.$t('additionalfree.additionalFeeType0')
        }
        else if(this.data61[index].additionalFeeType == 1){
          return this.$t('additionalfree.additionalFeeType1')
        }
      },
      additionalFeeDeductionMode(index){
        if(this.data61[index].additionalFeeDeductionMode == 0){
          return this.$t('additionalfree.additionalFeeDeductionMode0')
        }
        else if(this.data61[index].additionalFeeDeductionMode == 1){
          return this.$t('additionalfree.additionalFeeDeductionMode1')
        }else if(this.data61[index].additionalFeeDeductionMode == 2){
          return this.$t('additionalfree.additionalFeeDeductionMode2')
        }
        else if(this.data61[index].additionalFeeDeductionMode == 3){
          return this.$t('additionalfree.additionalFeeDeductionMode3')
        }else if(this.data61[index].additionalFeeDeductionMode == 4){
          return this.$t('additionalfree.additionalFeeDeductionMode4')
        }else if(this.data61[index].additionalFeeDeductionMode == 5){
          return this.$t('additionalfree.additionalFeeDeductionMode5')
        }
        else if(this.data61[index].additionalFeeDeductionMode == 6){
          return this.$t('additionalfree.additionalFeeDeductionMode6')
        }
      },
      getAdditional (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/additionalFeeScheme/findAll.do',
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
              vm.data6=response.body.list
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addStep(name){
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let Y = vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getFullYear() + '-';
            let M = (vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getMonth()+1 < 10 ? '0'+(vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) : vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) + '-';
            let D = vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getDate() + ' ';
            let h = vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getHours() + ':';
            let m = vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getMinutes() + ':';
            let s = vm.formValidate.additionalFeeDetails.additionalFeeStartDate.getSeconds();
            vm.data61.push({
              additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex,
              additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName,
              additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType,
              additionalFeeDeductionTimes:vm.formValidate.additionalFeeDetails.additionalFeeDeductionTimes,
              additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode,
              additionalFeeDeductionRate:vm.formValidate.additionalFeeDetails.additionalFeeDeductionRate,
              additionalFeeDeductionAmount:vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount,
              additionalFeeVat:vm.formValidate.additionalFeeDetails.additionalFeeVat,
              additionalFeeDeductionUnitPrice:vm.formValidate.additionalFeeDetails.additionalFeeDeductionUnitPrice,
              additionalFeeStartDate:Y+M+D+h+m+s,
            });
            vm.sysConfig.forEach(function (val,index) {
              if(val.id==15){
                if(val.state==0){

                  if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==0){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionRate:vm.formValidate.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidate.additionalFeeDetails.additionalFeeVat.toString(),
                    });
                  }else if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==1){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionTimes:vm.formValidate.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidate.additionalFeeDetails.additionalFeeVat.toString(),
                    });
                  }else if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==5){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidate.additionalFeeDetails.additionalFeeVat.toString(),
                    });
                  }else{
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionUnitPrice:vm.formValidate.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidate.additionalFeeDetails.additionalFeeVat.toString(),
                    });
                  }
                }else{
                  if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==0){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionRate:vm.formValidate.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s
                    });
                  }else if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==1){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionTimes:vm.formValidate.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s
                    });
                  }else if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==5){
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s
                    });
                  }else{
                    vm.data62.push({
                      additionalFeeIndex:vm.formValidate.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidate.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidate.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionUnitPrice:vm.formValidate.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s
                    });
                  }
                }
              }
            })
            setTimeout(() => {
              vm.modal_loading = false;
              vm.modal1 = false;
              vm.$Message.success(this.$t('common.messageSuccess'));
              vm.formValidate.additionalFeeDetails.additionalFeeIndex=vm.formValidate.additionalFeeDetails.additionalFeeIndex+1
              vm.formValidate.additionalFeeDetails.additionalFeeName=''
              vm.formValidate.additionalFeeDetails.additionalFeeType=''
              vm.formValidate.additionalFeeDetails.additionalFeeDeductionTimes=0
              vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode=''
              vm.formValidate.additionalFeeDetails.additionalFeeDeductionRate=0
              vm.formValidate.additionalFeeDetails.additionalFeeDeductionAmount=0
              vm.formValidate.additionalFeeDetails.additionalFeeVat=0
              vm.formValidate.additionalFeeDetails.additionalFeeDeductionUnitPrice=0
              vm.formValidate.additionalFeeDetails.additionalFeeStartDate=''
            },500);
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      editStep (index) {
        this.modal2 = true;
        this.formValidatee.additionalFeeDetails.additionalFeeIndex=this.data61[index].additionalFeeIndex
        this.formValidatee.additionalFeeDetails.additionalFeeName=this.data61[index].additionalFeeName
        this.formValidatee.additionalFeeDetails.additionalFeeType=this.data61[index].additionalFeeType.toString()
        this.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes=this.data61[index].additionalFeeDeductionTimes
        this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode=this.data61[index].additionalFeeDeductionMode.toString()
        this.formValidatee.additionalFeeDetails.additionalFeeDeductionRate=this.data61[index].additionalFeeDeductionRate
        this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount=this.data61[index].additionalFeeDeductionAmount
        this.formValidatee.additionalFeeDetails.additionalFeeVat=this.data61[index].additionalFeeVat
        this.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice=this.data61[index].additionalFeeDeductionUnitPrice
        this.formValidatee.additionalFeeDetails.additionalFeeStartDate=this.data61[index].additionalFeeStartDate
        this.formValidatee.additionalFeeDetails.additionalFeeSchemeCode=this.data61[index].additionalFeeSchemeCode
        this.a=index
      },
      updateStep(name) {
        let vm=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            let Y = this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getFullYear() + '-';
            let M = (this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1 < 10 ? '0'+(this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) : this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) + '-';
            let D = this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getDate() + ' ';
            let h = this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getHours() + ':';
            let m = this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMinutes() + ':';
            let s = this.formValidatee.additionalFeeDetails.additionalFeeStartDate.getSeconds();
//            if(this.sysConfig[15].state==0){
//              if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName,
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionRate:this.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionTimes:'0',
//                  additionalFeeDeductionAmount:'0',
//                  additionalFeeDeductionUnitPrice:'0'
//                });
//              }else if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==1){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionTimes:this.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionAmount:this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionUnitPrice:'0'
//                })
//
//              }else if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==2 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==3 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==4 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==5){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionAmount:this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionUnitPrice:'0',
//                  additionalFeeDeductionTimes:"0"
//                })
//
//              }else{
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionUnitPrice:this.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionAmount:'0',
//                  additionalFeeDeductionTimes:"0"
//                })
//              }
//            }else{
//              if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName,
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionRate:this.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionTimes:'0',
//                  additionalFeeDeductionAmount:'0',
//                  additionalFeeDeductionUnitPrice:'0'
//                });
//              }else if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==1){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName,
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionTimes:this.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionAmount:this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionUnitPrice:'0'
//                })
//
//              }else if(this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==2 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==3 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==4 || this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==5){
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName,
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionAmount:this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionUnitPrice:'0',
//                  additionalFeeDeductionTimes:"0"
//                })
//
//              }else{
//                this.data61.splice(this.a,1,{
//                  additionalFeeIndex:this.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
//                  additionalFeeName:this.formValidatee.additionalFeeDetails.additionalFeeName,
//                  additionalFeeType:this.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
//                  additionalFeeDeductionMode:this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
//                  additionalFeeDeductionUnitPrice:this.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
//                  additionalFeeStartDate:Y+M+D+h+m+s,
//                  additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
//                  additionalFeeDeductionRate:'0',
//                  additionalFeeDeductionAmount:'0',
//                  additionalFeeDeductionTimes:"0"
//                })
//              }
//            }
            vm.sysConfig.forEach(function (val,index) {
              if(val.id==15){
                if(val.state==0){
                  if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
                    vm.data61.splice(this.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionRate:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionTimes:'0',
                      additionalFeeDeductionAmount:'0',
                      additionalFeeDeductionUnitPrice:'0'
                    });
                  }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==1){
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionUnitPrice:'0'
                    })

                  }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==5){
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionUnitPrice:'0',
                      additionalFeeDeductionTimes:"0"
                    })

                  }else{
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName.toString(),
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionUnitPrice:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionAmount:'0',
                      additionalFeeDeductionTimes:"0"
                    })
                  }
                }else{
                  if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionRate:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionTimes:'0',
                      additionalFeeDeductionAmount:'0',
                      additionalFeeDeductionUnitPrice:'0'
                    });
                  }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==1){
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.additionalFeeIndex.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionUnitPrice:'0'
                  })

                  }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==5){
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionUnitPrice:'0',
                      additionalFeeDeductionTimes:"0"
                    })

                  }else{
                    vm.data61.splice(vm.a,1,{
                      additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                      additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                      additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                      additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                      additionalFeeDeductionUnitPrice:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
                      additionalFeeStartDate:Y+M+D+h+m+s,
                      additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                      additionalFeeDeductionRate:'0',
                      additionalFeeDeductionAmount:'0',
                      additionalFeeDeductionTimes:"0"
                    })
                  }
                }
              }
            })
            setTimeout(() => {
              this.modal_loading = false;
              this.modal2 = false;
              this.$Message.success(this.$t('common.messageSuccess'));
            });
          } else {
            this.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      remove (index) {
        this.modal4=true
        this.c=index
      },
      okdel(){
        this.data61.splice(this.c, 1);
        this.formValidate.additionalFeeDetails.additionalFeeIndex=this.formValidate.additionalFeeDetails.additionalFeeIndex-1
        this.formValidatee.additionalFeeDetails.additionalFeeIndex=this.formValidatee.additionalFeeDetails.additionalFeeIndex-1
        for(let i=1;i<this.data61.length;i++) {
          if (i < this.c) {
            this.data61[i].additionalFeeIndex = this.data61[i].additionalFeeIndex
          } else {
            this.data61[i].additionalFeeIndex = this.data61[i].additionalFeeIndex - 1
          }
        }
        this.$Message.success(this.$t('common.messagedel'));
        this.modal4=false
      },
      addadditional(name){
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/additionalFeeScheme/add.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                additionalFeeSchemeName:vm.formValidate.additionalFeeSchemeName,
                state:vm.formValidate.state,
                additionalFeeDetails:vm.data61
              })
            }).then((response) => {
                if (response.body.code == 0){
                  location.href = "./#/admin/additionalfree"
                }else{
                  alert(response.body.errors)
                }
            })
              .catch(function (response) {
                console.log(response)
              })
          } else {
            vm.$Message.error('表单验证失败!');
          }
        })


      },
      cancle(){
        this.$Message.success(this.$t('common.messageCancel'));
        this.$router.push({path:'/admin/additionalfree'})
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.modal2 = false;
          this.modal4 = false;
          this.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      }
    },
    created: function(){
      this.getAdditional();
      this.getSysConfig();
    },
    watch:{
      // 监控a变量变化的时候，自动执行此函数
      'formValidate.additionalFeeDetails.additionalFeeDeductionMode':function (val) {
        if(val==0){
          this.rate=false
          this.times=true
          this.amount=true
          this.price=true
        }else if(val==1){
          this.times=false
          this.amount=false
          this.rate=true
          this.price=true
        }else if( val==6){
          this.price=false
          this.amount=true
          this.times=true
          this.rate=true
        }else if( val==2 || val==3 || val==4 || val==5){
          this.amount=false
          this.times=true
          this.rate=true
          this.price=true
        }
      },
      'formValidatee.additionalFeeDetails.additionalFeeDeductionMode':function (val) {
        if(val==0){
          this.rate=false
          this.times=true
          this.amount=true
          this.price=true
        }else if(val==1){
          this.times=false
          this.amount=false
          this.rate=true
          this.price=true
        }else if( val==6){
          this.price=false
          this.amount=true
          this.times=true
          this.rate=true
        }else if( val==2 || val==3 || val==4 || val==5){
          this.amount=false
          this.times=true
          this.rate=true
          this.price=true
        }
      },
      'formValidate.additionalFeeDetails.additionalFeeType':function (val) {
//        if(this.sysConfig[15].state==0){
//          if(val==0){
//            this.vat=false
//          }else{
//            this.vat=true
//            this.formValidate.additionalFeeDetails.additionalFeeVat=0
//          }
//        }else{
//          this.vat=true
//          this.formValidate.additionalFeeDetails.additionalFeeVat=0
//        }
        let vm=this;
        let val2=val;
        vm.sysConfig.forEach(function (val1,index) {
          if(val1.id==15){
            if(val1.state==0){
              if(val2==0){
                vm.vat=false
              }else{
                vm.vat=true
                vm.formValidate.additionalFeeDetails.additionalFeeVat=0
              }
            }else{
              vm.vat=true
              vm.formValidate.additionalFeeDetails.additionalFeeVat=0
            }
          }
        })
      },
      'formValidatee.additionalFeeDetails.additionalFeeType':function (val) {
//        if(this.sysConfig[15].state==0){
//          if(val==0){
//            this.vat=false
//          }else{
//            this.vat=true
//            this.formValidatee.additionalFeeDetails.additionalFeeVat=0
//          }
//        }else{
//          this.vat=true
//          this.formValidatee.additionalFeeDetails.additionalFeeVat=0
//        }
        let vm=this;
        let val2=val;
        vm.sysConfig.forEach(function (val1,index) {
          if(val1.id==15){
            if(val1.state==0){
              if(val2==0){
                vm.vat=false
              }else{
                vm.vat=true
                vm.formValidatee.additionalFeeDetails.additionalFeeVat=0
              }
            }else{
              vm.vat=true
              vm.formValidatee.additionalFeeDetails.additionalFeeVat=0
            }
          }
        })
      },
    }
  }
</script>
<style>
  .addAdditionalfree .ivu-table-cell{
    padding:0;
  }
  .addAdditionalfree1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .addAdditionalfree1{
    z-index: 9999;
  }
  .addAdditionalfree1 .ivu-btn-success{
     background-color: #78CD51;
     border-color: #78CD51;
     color: #FFFFFF;
   }
  .schemeName .ivu-form-item-content{
    width: 300px;
  }
  .addAdditionalfree .ivu-table .appliedDate{
    width: 10%;
  }
  .addAdditionalfree .ivu-table .unitPrice{
    width: 4%;
  }
  .addAdditionalfree .ivu-table .vat{
    width: 6%;
  }
  .addAdditionalfree .ivu-table .deductionAmount{
    width: 8%;
  }
  .addAdditionalfree .ivu-table .deductionPercentage{
    width: 6%;
  }
  .addAdditionalfree .ivu-table .deductionType{
    width: 10%;
  }
  .ivu-table td.deductionTime{
    width: 10%;
    text-align: center;
  }
  .addAdditionalfree .ivu-table .indexstep{
    width: 4%;
  }
  .addAdditionalfree .ivu-table .itemName{
    width: 14%;
  }
  .addAdditionalfree .ivu-table .feeType{
    width: 8%;
  }
  .ivu-table th,.ivu-table td{
    text-align: center;
  }
  .addAdditionalfree1 .ivu-date-picker-cells{
    width: 256px;
  }
  .addAdditionalfree1 .ivu-table-cell{
    padding-left: 5px;
    padding-right: 5px;
  }
  .addAdditionalfree1 .ivu-form-item:before {
    content: none!important;
  }
  .addAdditionalfree1 .ivu-select,.addAdditionalfree1 .ivu-input-wrapper{
    width: 90%;
  }
  .addAdditionalfree1 .ivu-modal-footer{
    padding:3% 0 0 0;
    height: 90px;
    border-top: none;

  }
  .addAdditionalfree1 .ivu-checkbox-group{
    width: 104px;
  }
  .addAdditionalfree1 .ivu-form-item{
    width: 47%;
    display: inline-block;
    vertical-align:none;
    margin-bottom: 10px!important;
  }
  .addAdditionalfree1 .input-group{
    width: 80%;
  }
  .addAdditionalfree1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .addAdditionalfree .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid  #e9eaec;
    background-color: #fdfdfc;
  }
  .addAdditionalfree{
    min-width:900px;
    width: 98%;
    height: 100%;
    margin-bottom: 60px;
    border-radius: 4px;
    background-color: #ffffff;
  }
  /*.ivu-breadcrumb{*/
    /*width: 98%;*/
    /*min-width: 900px!important;*/
    /*padding: 8px 15px;*/
    /*margin-top: 80px;*/
    /*background-color: #c9cccf;*/
    /*border-radius: 4px;*/
  /*}*/
  .addAdditionalfree .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .addAdditionalfree .tfooter>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .addAdditionalfree .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .addAdditionalfree .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .addAdditionalfree .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .addAdditionalfree .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .addAdditionalfree .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .addAdditionalfree .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .addAdditionalfree .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .addAdditionalfree .ivu-table-wrapper{
    width: 98%;
    position: static!important;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .addAdditionalfree .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
