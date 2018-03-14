<template>
  <div style="margin-left:270px;">
    <div class="addAdditionalfree">
      <div style="margin: 2% auto;width: 98%;"      >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem :label="this.$t('common.SchemeName')"  class="schemeName" prop="additionalFeeSchemeName" style="width: 47%;">
            <Input v-model="formValidate.additionalFeeSchemeName" :placeholder="this.$t('common.placeholderName')"></Input></FormItem>
          <FormItem  class="schemeName"  :label="this.$t('common.state')" prop="state" style="width: 47%;">
            <Select v-model="formValidate.state" >
              <Option value="1">{{$t('common.enabled')}}</Option>
              <Option value="0">{{$t('common.forbidden')}}</Option>
            </Select>
          </FormItem>
          <FormItem style="width: 100%;"  class="schemeName" >
            <Modal
              v-model="modal1"
              width="600"
              class-name="addAdditionalfree1"
              :loading="loading"
              :mask-closable="false">
              <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.addprice.add')}}</p>
              <div >
                <Form ref="formValidat" :model="formValidatee.additionalFeeDetails" :rules="ruleValidate"  inline>
                  <FormItem :label="this.$t('additionalfree.additionalFeeName')" prop="additionalFeeName">
                    <Input v-model="formValidatee.additionalFeeDetails.additionalFeeName" :placeholder="this.$t('common.placeholderName')"></Input>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeType')" prop="additionalFeeType">
                    <Select v-model="formValidatee.additionalFeeDetails.additionalFeeType" >
                      <Option value="0">{{$t('additionalfree.additionalFeeType0')}}</Option>
                      <Option value="1">{{$t('additionalfree.additionalFeeType1')}}</Option>
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
                      <InputNumber :disabled="rate"  :max="100" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionRate" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeStartDate')" prop="additionalFeeStartDate">
                    <DatePicker type="date" :placeholder="this.$t('additionalfree.addprice.messageadditionalFeeStartDat')" style="width: 100%" v-model="formValidatee.additionalFeeDetails.additionalFeeStartDate"  >
                    </DatePicker>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeDeductionAmount')" prop="additionalFeeDeductionAmount">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="amount"  :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionAmount" style="width: 100%;"></InputNumber>
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('additionalfree.additionalFeeVat')" prop="additionalFeeVat" >
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :disabled="vat" :max="100" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeVat" style="width: 100%;"></InputNumber>
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
                      <Option value='0'>{{$t('additionalfree.additionalFeeType0')}}</Option>
                      <Option value='1'>{{$t('additionalfree.additionalFeeType1')}}</Option>
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
                      <InputNumber :disabled="times"  :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeDeductionTimes" style="width: 100%;"></InputNumber>
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
                      <InputNumber :disabled="vat" :max="100" :min="1" v-model="formValidatee.additionalFeeDetails.additionalFeeVat" style="width: 100%;"></InputNumber>
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
              添加</Button>
            <span class="tools pull-right">
              <a href="javascript:;" class="fa fa-chevron-down"></a>
            </span>
          </header>
          <Table stripe :columns="columns1" :data="data61"></Table>
        </Form>
        <div class="ivu-modal-footer" style="height: 60px;">
          <button  type="error" :loading="modal_loading" @click="cancle()" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
            <span style="color: #fff">{{$t('common.cancel')}}</span>
          </button>
          <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="editAddtional('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
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
        letparentName:'',
        letname:'',
        menuList:{},
        Index:0,
        sysConfig:{},
        a:'',
        c:'',
        disabled: true,
        loading: true,
        vat:false,
        times:false,
        amount:false,
        rate:false,
        price:false,
        formValidatee: {
          additionalFeeDetails: {
            additionalFeeDeductionAmount: 0,
            additionalFeeDeductionMode: '',
            additionalFeeDeductionTimes: 0,
            additionalFeeDeductionUnitPrice: 0,
            additionalFeeDeductionRate: 0,
            additionalFeeIndex: 0,
            additionalFeeName: '',
            additionalFeeSchemeCode: '',
            additionalFeeStartDate: '',
            additionalFeeType: '',
            additionalFeeVat: 0
          },
        },
        formValidate: {
          additionalFeeSchemeCode: '',
          additionalFeeSchemeName: '',
          createDate: '',
          state: '',
          additionalFeeDetails:{
            additionalFeeDeductionAmount:0,
            additionalFeeDeductionMode:0,
            additionalFeeDeductionTimes:0,
            additionalFeeDeductionUnitPrice:0,
            additionalFeeDeductionRate:0,
            additionalFeeIndex:this.Index,
            additionalFeeName:'',
            additionalFeeSchemeCode:'',
            additionalFeeStartDate:0,
            additionalFeeType:0,
            additionalFeeVat:0
          },

        },
        ruleValidate: {
          additionalFeeSchemeName: [
            { required: true, message:  this.$t('additionalfree.addprice.messageadditionalFeeSchemeName'), trigger: 'blur' },
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
            { required: true, type: 'date', message:this.$t('additionalfree.addprice.messageadditionalFeeStartDate'), trigger: 'change' }
          ],
        },
        modal_loading: false,
        modal1: false,
        modal2: false,
        modal4: false,
        columns1: [
          {
            type:'index',
            title: this.$t('additionalfree.additionalFeeIndex'),
            className: 'indexstep'
          },
          {
            title:  this.$t('additionalfree.additionalFeeName'),
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
            title:  this.$t('additionalfree.additionalFeeVat'),
            key: 'additionalFeeVat',
            className: 'vat'
          },
          {
            title: this.$t('additionalfree.additionalFeeDeductionUnitPrice'),
            key: 'additionalFeeDeductionUnitPrice',
            className: 'unitPrice'
          },
          {
            title:  this.$t('additionalfree.additionalFeeStartDate'),
            key: 'additionalFeeStartDate',
            className: 'appliedDate'
          },
          {
            title: this.$t('common.action'),
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
                      this.removeStep(params.index)
                    }
                  }
                })
              ]);
            }
          }
        ],
        data6: [],
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
              var index=this.$route.params.id;
              vm.data6=response.body.list
              vm.data61=vm.data6[index].additionalFeeDetails
              vm.Index=vm.data61.length+1
              vm.formValidatee.additionalFeeDetails.additionalFeeIndex=vm.data61.length+1
              vm.formValidate.additionalFeeSchemeCode=vm.data6[index].additionalFeeSchemeCode
              vm.formValidate.additionalFeeSchemeName=vm.data6[index].additionalFeeSchemeName
              vm.formValidate.state=vm.data6[index].state
              vm.formValidate.additionalFeeDetails=vm.data61
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addStep(name){
        let vm=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            let Y = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getFullYear() + '-';
            let M = (vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1 < 10 ? '0'+(vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) : vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) + '-';
            let D = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getDate() + ' ';
            let h = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getHours() + ':';
            let m = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMinutes() + ':';
            let s = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getSeconds();
            this.$http({
              url:baseURL+'/sys/additionalFeeScheme/insertDetailToScheme.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                additionalFeeIndex:vm.data61.length+1,
                additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType,
                additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes,
                additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode,
                additionalFeeDeductionRate:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionRate,
                additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount,
                additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat,
                additionalFeeDeductionUnitPrice:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice,
                additionalFeeStartDate:Y+M+D+h+m+s,
                additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.sysConfig.forEach(function (val,index) {
                  if(val.id==15){
                    if(val.state==0){
                      if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
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
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
                          additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                          additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                          additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                          additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                          additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                          additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                          additionalFeeStartDate:Y+M+D+h+m+s,
                          additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                          additionalFeeDeductionRate:'0',
                          additionalFeeDeductionUnitPrice:'0'
                        });
                      }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==5){
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
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
                        });
                      }else{
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
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
                        });
                      }
                    }else{
                      if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==0){
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
                          additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                          additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                          additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                          additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                          additionalFeeDeductionRate:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                          additionalFeeStartDate:Y+M+D+h+m+s,
                          additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                          additionalFeeDeductionTimes:'0',
                          additionalFeeDeductionAmount:'0',
                          additionalFeeDeductionUnitPrice:'0'
                        });
                      }else if(vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode==1){
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
                          additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                          additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                          additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                          additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                          additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                          additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                          additionalFeeStartDate:Y+M+D+h+m+s,
                          additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                          additionalFeeDeductionRate:'0',
                          additionalFeeDeductionUnitPrice:'0'
                        });
                      }else if(vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==2 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==3 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==4 || vm.formValidate.additionalFeeDetails.additionalFeeDeductionMode==5){
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
                          additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                          additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                          additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                          additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                          additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                          additionalFeeStartDate:Y+M+D+h+m+s,
                          additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                          additionalFeeDeductionRate:'0',
                          additionalFeeDeductionUnitPrice:'0',
                          additionalFeeDeductionTimes:"0"
                        });
                      }else{
                        vm.data61.push({
                          additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
                          additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex.toString(),
                          additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                          additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType.toString(),
                          additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode.toString(),
                          additionalFeeDeductionUnitPrice:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice.toString(),
                          additionalFeeStartDate:Y+M+D+h+m+s,
                          additionalFeeVat:this.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                          additionalFeeDeductionRate:'0',
                          additionalFeeDeductionAmount:'0',
                          additionalFeeDeductionTimes:"0"
                        });
                      }
                    }
                  }
                })

                vm.formValidatee.additionalFeeDetails.additionalFeeIndex=vm.formValidatee.additionalFeeDetails.additionalFeeIndex+1
              }else{
                alert(response.body.errors)
              }
            })
              .catch(function (response) {
                console.log(response)
              })
            setTimeout(() => {
              vm.modal_loading = false;
              vm.modal1 = false;
              vm.$Message.success(this.$t('common.messageSuccess'));
            },500);
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })

      },
      editStep(index){
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
      updateStep(name){
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let Y = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getFullYear() + '-';
            let M = (vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1 < 10 ? '0'+(vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) : vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMonth()+1) + '-';
            let D = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getDate() + ' ';
            let h = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getHours() + ':';
            let m = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getMinutes() + ':';
            let s = vm.formValidatee.additionalFeeDetails.additionalFeeStartDate.getSeconds();
            this.$http({
              url:baseURL+'/sys/additionalFeeScheme/updateDetail.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                additionalFeeIndex:vm.formValidatee.additionalFeeDetails.additionalFeeIndex,
                additionalFeeName:vm.formValidatee.additionalFeeDetails.additionalFeeName,
                additionalFeeType:vm.formValidatee.additionalFeeDetails.additionalFeeType,
                additionalFeeDeductionTimes:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes.toString(),
                additionalFeeDeductionMode:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionMode,
                additionalFeeDeductionRate:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionRate.toString(),
                additionalFeeDeductionAmount:vm.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount.toString(),
                additionalFeeVat:vm.formValidatee.additionalFeeDetails.additionalFeeVat.toString(),
                additionalFeeSchemeCode:vm.formValidatee.additionalFeeDetails.additionalFeeSchemeCode,
                additionalFeeStartDate:Y+M+D+h+m+s,
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.getAdditional();
              }else{
                alert(response.body.errors)
              }
            })
              .catch(function (response) {
                console.log(response)
              })
            setTimeout(() => {
              vm.modal_loading = false;
              vm.modal2 = false;
              vm.$Message.success(this.$t('common.messageSuccess'));
            },500);
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      removeStep(index){
        this.modal4=true
        this.c=index
      },
      editAddtional(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/additionalFeeScheme/updateScheme.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            additionalFeeSchemeCode:vm.formValidate.additionalFeeSchemeCode,
            additionalFeeSchemeName:vm.formValidate.additionalFeeSchemeName,
            state:vm.formValidate.state,
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
      },
      remove (index) {
        this.data1.splice(index, 1);
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/additionalFeeScheme/delDetailFromScheme.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            additionalFeeSchemeCode:vm.data61[vm.c].additionalFeeSchemeCode,
            additionalFeeIndex:vm.data61[vm.c].additionalFeeIndex
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data61.splice(vm.c, 1);
            vm.modal4=false
            vm.$Message.success(this.$t('common.messagedel'));
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },

      type(index){
        if(this.data6[index].state == 1){
          return 'success'
        }
        else if(this.data6[index].state== 0){
          return 'error'
        }
      },
      status(index){
        if(this.data6[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data6[index].state== 0){
          return this.$t('common.forbidden')
        }
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
      'formValidatee.additionalFeeDetails.additionalFeeType':function (val) {
        let vm=this;
        let val2=val;
        vm.sysConfig.forEach(function (val1,index) {
          if(val1.id==15){
            if(val1.state==0){
              if(val2==0){
                this.vat=false
              }else{
                this.vat=true
                this.formValidatee.additionalFeeDetails.additionalFeeVat=0
              }
            }else{
              this.vat=true
              this.formValidatee.additionalFeeDetails.additionalFeeVat=0
            }
          }

        })

      },
      'modal1':function (val) {
        if(val==false){
          this.formValidatee.additionalFeeDetails.additionalFeeIndex=this.Index
          this.formValidatee.additionalFeeDetails.additionalFeeName=''
          this.formValidatee.additionalFeeDetails.additionalFeeType=''
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode=''
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionRate=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount=0
          this.formValidatee.additionalFeeDetails.additionalFeeVat=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice=0
          this.formValidatee.additionalFeeDetails.additionalFeeStartDate=''
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidatee.additionalFeeDetails.additionalFeeIndex=this.Index
          this.formValidatee.additionalFeeDetails.additionalFeeName=''
          this.formValidatee.additionalFeeDetails.additionalFeeType=''
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionTimes=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionMode=''
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionRate=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionAmount=0
          this.formValidatee.additionalFeeDetails.additionalFeeVat=0
          this.formValidatee.additionalFeeDetails.additionalFeeDeductionUnitPrice=0
          this.formValidatee.additionalFeeDetails.additionalFeeStartDate=''
        }
      }
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
  .addAdditionalfree .ivu-btn-success{
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
  .addAdditionalfree .ivu-table .deductionTime{
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
  .addAdditionalfree .ivu-table th,.ivu-table td{
    text-align: center;
  }
  .addAdditionalfree1 .ivu-date-picker-cells{
    width: 256px;
  }
  .schemeName>.ivu-form-item-content,.schemeName>.ivu-form-item-content>.ivu-input-wrapper,.schemeName>.ivu-form-item-content>.ivu-input-wrapper>.ivu-input{
    position: static;
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
    background-color: #fff;
  }
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
