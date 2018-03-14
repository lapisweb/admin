<template>
  <div style="margin-left: 270px">
    <div class="meter">
      <header class="panel-heading">
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
          :loading="loading"
          :mask-closable="false"
          class-name="meter1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('meter.add')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem v-show="meterCode" :label="this.$t('meter.meterCode')" prop="meterTypeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber  :min="1" v-model="formValidate.meterTypeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('meter.communicationType')" prop="communicationType">
                <Select v-model="formValidate.communicationType">
                  <Option value="5">V5</Option>
                  <Option value="102">STSCard</Option>
                  <Option value="202">SoftwareSTSCard</Option>
                  <Option value="100">STS</Option>
                  <Option value="200">SoftwareSTS</Option>
                  <Option value="203">STS_AMI</Option>
                  <Option value="201">SoftwareSTS_AMI</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.meterTypeName')" prop="meterTypeName">
                <Input v-model="formValidate.meterTypeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('meter.mediumType')" prop="mediumType">
                <Select v-model="formValidate.mediumType" >
                  <Option value="0">{{$t('meter.mediumType0')}}</Option>
                  <Option value="1">{{$t('meter.mediumType1')}}</Option>
                  <Option value="2">{{$t('meter.mediumType2')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureDecimalPlaces')" prop="measureDecimalPlaces">
                <Select disabled v-model="formValidate.measureDecimalPlaces" placeholder="0.1" >
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.caliber')" prop="q3">
                <Select :disabled="caliber" v-model="formValidate.q3" >
                  <Option value="0"> DN15-DN25</Option>
                  <Option value="1">DN32以上</Option>
                  <Option v-show="gas" value="2">G1.6;G2.5</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.pulseDecimalPlaces')" prop="pulseDecimalPlaces">
                <Select :disabled="pulseDecimalPlaces" v-model="formValidate.pulseDecimalPlaces" >
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureMode')" prop=" measureMode" >
                <Select :disabled="measure" v-model="formValidate.measureMode" >
                  <Option value="0">{{$t('meter.measureMode0')}}</Option>
                  <Option value="1">{{$t('meter.measureMode1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.lcdType')" prop="lcdType">
                <Select v-model="formValidate.lcdType">
                  <Option value="0">{{$t('meter.lcdType0')}}</Option>
                  <Option value="1">{{$t('meter.lcdType1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
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
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="handleSubmit('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal2"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="meter1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('meter.edit')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem v-show="meterCode" :label="this.$t('meter.meterCode')" prop="meterTypeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :min="1" v-model="formValidate.meterTypeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('meter.communicationType')" prop="communicationType">
                <Select v-model="formValidate.communicationType">
                  <Option value="5">V5</Option>
                  <Option value="102">STSCard</Option>
                  <Option value="202">SoftwareSTSCard</Option>
                  <Option value="100">STS</Option>
                  <Option value="200">SoftwareSTS</Option>
                  <Option value="203">STS_AMI</Option>
                  <Option value="201">SoftwareSTS_AMI</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.meterTypeName')" prop="meterTypeName">
                <Input v-model="formValidate.meterTypeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('meter.mediumType')" prop="mediumType">
                <Select v-model="formValidate.mediumType" >
                  <Option value="0">{{$t('meter.mediumType0')}}</Option>
                  <Option value="1">{{$t('meter.mediumType1')}}</Option>
                  <Option value="2">{{$t('meter.mediumType2')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureDecimalPlaces')" prop="measureDecimalPlaces">
                <Select disabled v-model="formValidate.measureDecimalPlaces"  >
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.caliber')" prop="q3">
                <Select :disabled="caliber" v-model="formValidate.q3" >
                  <Option value="0"> DN15-DN25</Option>
                  <Option value="1">DN32以上</Option>
                  <Option v-show="gas" value="2">G1.6;G2.5</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.pulseDecimalPlaces')" prop="pulseDecimalPlaces">
                <Select :disabled="pulseDecimalPlaces"  v-model="formValidate.pulseDecimalPlaces" >
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureMode')" prop=" measureMode" >
                <Select :disabled="measuremode" v-model="formValidate.measureMode" >
                  <Option value="0">{{$t('meter.measureMode0')}}</Option>
                  <Option value="1">{{$t('meter.measureMode1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.lcdType')" prop="lcdType">
                <Select v-model="formValidate.lcdType">
                  <Option value="0">{{$t('meter.lcdType0')}}</Option>
                  <Option value="1">{{$t('meter.lcdType1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
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
          v-model="modal3"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="meter1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('meter.show')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate"   inline>
              <FormItem :label="this.$t('meter.meterCode')" prop="meterTypeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="99999999" :min="1" disabled v-model="formValidate.meterTypeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('meter.communicationType')" prop="communicationType">
                <Select v-model="formValidate.communicationType" disabled>
                  <Option value="2">V2</Option>
                  <Option value="3">V3</Option>
                  <Option value="4">V4</Option>
                  <Option value="5">V5</Option>
                  <Option value="100">STS</Option>
                  <Option value="101">STS_Lora</Option>
                  <Option value="121">STSCard_Lora</Option>
                  <Option value="130">STSCard_NBIot</Option>
                  <Option value="200">SoftwareSTS</Option>
                  <Option value="201">SoftwareSTS_AMI</Option>
                  <Option value="220">SoftwareSTS_STSCard</Option>
                  <Option value="221">SoftwareSTS_STSCard_AMI</Option>
                  <Option value="230">SoftwareSTS_NBIot</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.meterTypeName')" prop="meterTypeName">
                <Input v-model="formValidate.meterTypeName" :placeholder="this.$t('common.placeholderName')" disabled></Input>
              </FormItem>
              <FormItem :label="this.$t('meter.mediumType')" prop="mediumType">
                <Select v-model="formValidate.mediumType" disabled >
                  <Option value="0">{{$t('meter.mediumType0')}}</Option>
                  <Option value="1">{{$t('meter.mediumType1')}}</Option>
                  <Option value="2">{{$t('meter.mediumType2')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureDecimalPlaces')" prop="measureDecimalPlaces">
                <Select v-model="formValidate.measureDecimalPlaces" placeholder="0.1"  disabled>
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.caliber')" prop="q3">
                <Select disabled v-model="formValidate.q3" >
                  <Option value="0"> DN15-DN25</Option>
                  <Option value="1">DN32以上</Option>
                  <Option v-show="gas" value="2">G1.6;G2.5</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.pulseDecimalPlaces')" prop="pulseDecimalPlaces">
                <Select v-model="formValidate.pulseDecimalPlaces" disabled>
                  <Option value="0">0.001</Option>
                  <Option value="1">0.01</Option>
                  <Option value="2">0.1</Option>
                  <Option value="3">1</Option>
                  <Option value="4">10</Option>
                  <Option value="5">100</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.measureMode')" prop=" measureMode" >
                <Select v-model="formValidate.measureMode" disabled>
                  <Option value="0">{{$t('meter.measureMode0')}}</Option>
                  <Option value="1">{{$t('meter.measureMode1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('meter.lcdType')" prop="lcdType">
                <Select v-model="formValidate.lcdType" disabled>
                  <Option value="0">{{$t('meter.lcdType0')}}</Option>
                  <Option value="1">{{$t('meter.lcdType1')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" disabled >
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
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="ok()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal4"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="meter1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('meter.del')}}</p>
          <div style="margin-top:5%;text-align: center;">
            <Icon type="information-circled" color="red" size="30" ></Icon>
            &nbsp;&nbsp;&nbsp;
            <span style="font-size: 20px"> {{$t('common.del')}}?</span>
          </div>
          <div slot="footer">
            <div class="ivu-modal-footer" style="padding-top: 25px;padding-right: 20px">
              <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                <span style="color: #fff">{{$t('common.cancel')}}</span>
              </button>
              <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                <span>{{$t('common.ok')}}</span>
              </button>
            </div>
          </div>
        </Modal>
        <Page :total="meterCount" :page-size="meterpageSize" size="small" show-total  @on-change="changepage"></Page>
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
        meterTypeList:[],
        // 初始化信息总条数
        meterCount:0,
        // 每页显示多少条
        meterpageSize:10,
        b:'',
        c:'',
        sysConfig:{},
        gas:false,
        caliber:false,
        pulseDecimalPlaces:false,
        meterCode:false,
        currencySymbol:false,
        measure:false,
        measuremode:false,
        disabled:true,
        value1:1,
        value2:10,
        loading: true,
        formValidate: {
          meterTypeCode: 0,
          meterTypeName: '',
          communicationType: '',
          type:'',
          measureMode: '',
          measureDecimalPlaces: '1',
          currencySymbol: '1',
          currentDetectionFlag:false ,
          kFlag:false,
          lcdType:'',
          mediumType:'' ,
          priceDecimalPlaces:'2',
          pulseDecimalPlaces: '2',
          q3:'',
          state:'',
        },
        ruleValidate: {
          meterTypeName: [
            { required: true, message: this.$t('meter.messagemeterTypeName'), trigger: 'blur' },
          ],
          communicationType:[
            { required: true, message: this.$t('meter.messagecommunicationType'), trigger: 'change' },
          ],
          mediumType: [
            { required: true, message: this.$t('common.messageState'), trigger: 'blur'}
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ]
        },
        modal_loading: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        columns7: [
          {
            title:  this.$t('meter.meterCode'),
            key: 'meterTypeCode',
          },
          {
            title: this.$t('meter.meterTypeName'),
            key: 'meterTypeName'
          },
          {
            title: this.$t('meter.communicationType'),
            key: 'communicationType',
            render: (h, params)=>{
              return this.communicationType(params.index)
            }
          },
          {
            title: this.$t('meter.measureMode'),
            key: 'measureMode',
            render: (h, params)=>{
              return this.measureMode(params.index)
            }
          },
          {
            title: this.$t('meter.measureDecimalPlaces'),
            key: 'measureDecimalPlaces',
            render: (h, params)=>{
              return this.measureDecimalPlaces(params.index)
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
                },),
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
        data6: []
      }
    },
    methods: {
      type(index){
        if(this.data6[index].state==1){
          return 'success'
        }
        else if(this.data6[index].state==0){
          return 'error'
        }
      },
      communicationType(index){
        if(this.data6[index].communicationType == 2){
          return 'V2'
        }
        else if(this.data6[index].communicationType == 3){
          return 'V3'
        }else if(this.data6[index].communicationType == 4){
          return 'V4'
        }
        else if(this.data6[index].communicationType == 5){
          return 'V5'
        }else if(this.data6[index].communicationType == 100){
          return 'STS'
        }else if(this.data6[index].communicationType == 101){
          return 'STS_Lora'
        }
        else if(this.data6[index].communicationType == 121){
          return 'STSCard_Lora'
        }else if(this.data6[index].communicationType == 130){
          return 'STSCard_NBIot'
        }else if(this.data6[index].communicationType == 200){
          return 'SoftwareSTS'
        }
        else if(this.data6[index].communicationType ==201){
          return 'SoftwareSTS_AMI'
        }else if(this.data6[index].communicationType == 220){
          return 'SoftwareSTS_STSCard'
        }else if(this.data6[index].communicationType == 221){
          return 'SoftwareSTS_STSCard_AMI'
        }else if(this.data6[index].communicationType == 230){
          return 'SoftwareSTS_NBIot'
        }else if(this.data6[index].communicationType == 102){
          return 'STSCard'
        }else if(this.data6[index].communicationType == 202){
          return 'SoftwareSTSCard'
        }else if(this.data6[index].communicationType == 203){
          return 'STS_AMI'
        }
      },
      measureMode(index){
        if(this.data6[index].measureMode == 1){
          return this.$t('meter.measureMode1')
        }
        else if(this.data6[index].measureMode == 0){
          return this.$t('meter.measureMode0')
        }
      },
      measureDecimalPlaces(index){
        if(this.data6[index].measureDecimalPlaces == 0){
          return '0.001'
        }
        else if(this.data6[index].measureDecimalPlaces == 1){
          return '0.01'
        }else if(this.data6[index].measureDecimalPlaces == 2){
          return '0.1'
        }else if(this.data6[index].measureDecimalPlaces == 3){
          return '1'
        }else if(this.data6[index].measureDecimalPlaces == 4){
          return '10'
        }
        else if(this.data6[index].measureDecimalPlaces == 5){
          return '100'
        }
      },
      status(index){
        if(this.data6[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data6[index].state == 0){
          return this.$t('common.forbidden')
        }
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
              vm.sysConfig = response.body.list
              vm.sysConfig.forEach(function (val,index) {
                if(val.id==1){
                  if(val.state==1){
                    vm.meterCode=false
                  }else if(val.state==0){
                    vm.meterCode=true
                  }
                }
              })
//              if(vm.sysConfig[0].state==1){
//                vm.meterCode=false
//              }else if(vm.sysConfig[0].state==0){
//                vm.meterCode=true
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getMeter (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/meterType/findAll.do',
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
              this.meterTypeList = response.body.list
              this.meterCount = response.body.list.length
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(response.body.list.length < this.meterpageSize){
                this.data6 = this.meterTypeList
              }else{
                this.data6 = this.meterTypeList.slice(0,this.meterpageSize);
              }

            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.meterpageSize;
        var _end = index * this.meterpageSize;
        this.data6 = this.meterTypeList.slice(_start,_end);
      },
      handleSubmit (name) {
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/meterType/add.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                meterTypeCode:vm.formValidate.meterTypeCode.toString(),
                communicationType:vm.formValidate.communicationType,
                currencySymbol:vm.formValidate.currencySymbol,
                lcdType:vm.formValidate.lcdType,
                measureDecimalPlaces:vm.formValidate.measureDecimalPlaces,
                measureMode:vm.formValidate.measureMode,
                mediumType:vm.formValidate.mediumType,
                meterTypeName:vm.formValidate.meterTypeName,
                priceDecimalPlaces:vm.formValidate.priceDecimalPlaces,
                pulseDecimalPlaces:vm.formValidate.pulseDecimalPlaces,
                q3:vm.formValidate.q3.toString(),
                state:vm.formValidate.state,
                currentDetectionFlag:vm.formValidate.currentDetectionFlag,
                kFlag:vm.formValidate.kFlag
              })
            }).then((response) => {
              if(response.body.code==0){
//                alert(response.body.msg)
                vm.data6.unshift({
                  meterTypeCode:response.body.meterType.meterTypeCode,
                  communicationType:vm.formValidate.communicationType,
                  currencySymbol:vm.formValidate.currencySymbol,
                  lcdType:vm.formValidate.lcdType,
                  measureDecimalPlaces:vm.formValidate.measureDecimalPlaces,
                  measureMode:vm.formValidate.measureMode,
                  mediumType:vm.formValidate.mediumType,
                  meterTypeName:vm.formValidate.meterTypeName,
                  priceDecimalPlaces:vm.formValidate.priceDecimalPlaces,
                  pulseDecimalPlaces:vm.formValidate.pulseDecimalPlaces,
                  q3:vm.formValidate.q3.toString(),
                  state:vm.formValidate.state,
                  currentDetectionFlag:vm.formValidate.currentDetectionFlag,
                  kFlag:vm.formValidate.kFlag
                });
//                console.log(vm.formValidate.q3,'vm.formValidate.q3')
                vm.$Message.success(this.$t('common.messageSuccess'));
                vm.modal1 = false;
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
      update(name){
        let vm = this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/meterType/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                meterTypeCode:vm.formValidate.meterTypeCode,
                communicationType:vm.formValidate.communicationType,
                currencySymbol:vm.formValidate.currencySymbol,
                lcdType:vm.formValidate.lcdType,
                measureDecimalPlaces:vm.formValidate.measureDecimalPlaces,
                measureMode:vm.formValidate.measureMode,
                mediumType:vm.formValidate.mediumType,
                meterTypeName:vm.formValidate.meterTypeName,
                priceDecimalPlaces:vm.formValidate.priceDecimalPlaces,
                pulseDecimalPlaces:vm.formValidate.pulseDecimalPlaces,
                q3:vm.formValidate.q3,
                state:vm.formValidate.state,
                currentDetectionFlag:vm.formValidate.currentDetectionFlag,
                kFlag:vm.formValidate.kFlag
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.data6.splice(this.b,1,{
                  meterTypeCode:vm.formValidate.meterTypeCode,
                  communicationType:vm.formValidate.communicationType,
                  currencySymbol:vm.formValidate.currencySymbol,
                  lcdType:vm.formValidate.lcdType,
                  measureDecimalPlaces:vm.formValidate.measureDecimalPlaces,
                  measureMode:vm.formValidate.measureMode,
                  mediumType:vm.formValidate.mediumType,
                  meterTypeName:vm.formValidate.meterTypeName,
                  priceDecimalPlaces:vm.formValidate.priceDecimalPlaces,
                  pulseDecimalPlaces:vm.formValidate.pulseDecimalPlaces,
                  q3:vm.formValidate.q3,
                  state:vm.formValidate.state,
                  currentDetectionFlag:vm.formValidate.currentDetectionFlag,
                  kFlag:vm.formValidate.kFlag
                });
                vm.$Message.success(this.$t('common.messageSuccess'));
                vm.modal2 = false;
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
      edit( index){
        this.modal2 = true;
        this.formValidate.meterTypeCode=this.data6[index].meterTypeCode
        this.formValidate.communicationType=this.data6[index].communicationType.toString()
        this.formValidate.currencySymbol=this.data6[index].currencySymbol.toString()
        this.formValidate.lcdType=this.data6[index].lcdType.toString()
        this.formValidate.measureDecimalPlaces=this.data6[index].measureDecimalPlaces.toString()
        this.formValidate.measureMode=this.data6[index].measureMode.toString()
        this.formValidate.mediumType=this.data6[index].mediumType.toString()
        this.formValidate.meterTypeName=this.data6[index].meterTypeName
        this.formValidate.priceDecimalPlaces=this.data6[index].priceDecimalPlaces.toString()
        this.formValidate.pulseDecimalPlaces=this.data6[index].pulseDecimalPlaces.toString()
        this.formValidate.q3=this.data6[index].q3.toString()
        this.formValidate.state=this.data6[index].state.toString()
        this.formValidate.currentDetectionFlag=this.data6[index].currentDetectionFlag
        this.formValidate.kFlag=this.data6[index].kFlag
        this.b=index
      },
      show (index) {
        this.modal3 = true
        this.formValidate.meterTypeCode=this.data6[index].meterTypeCode
        this.formValidate.communicationType=this.data6[index].communicationType.toString()
        this.formValidate.currencySymbol=this.data6[index].currencySymbol.toString()
        this.formValidate.lcdType=this.data6[index].lcdType.toString()
        this.formValidate.measureDecimalPlaces=this.data6[index].measureDecimalPlaces.toString()
        this.formValidate.measureMode=this.data6[index].measureMode.toString()
        this.formValidate.mediumType=this.data6[index].mediumType.toString()
        this.formValidate.meterTypeName=this.data6[index].meterTypeName
        this.formValidate.priceDecimalPlaces=this.data6[index].priceDecimalPlaces.toString()
        this.formValidate.pulseDecimalPlaces=this.data6[index].pulseDecimalPlaces.toString()
        this.formValidate.q3=this.data6[index].q3
        this.formValidate.state=this.data6[index].state.toString()
        this.formValidate.currentDetectionFlag=this.data6[index].currentDetectionFlag
        this.formValidate.kFlag=this.data6[index].kFlag
      },
      remove (index) {
        this.modal4 = true;
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/meterType/del.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            meterTypeCode:vm.data6[vm.c].meterTypeCode
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data6.splice(vm.c, 1);
            vm.modal4=false
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
          this.modal3 = false;
          this.modal4=false
        }, 500);
        this.$Message.success(this.$t('common.messageCancel'));
      }
    },
    created: function(){
      this.getMeter();
      this.getSysConfig();
    },
    watch: {
      'formValidate.mediumType':function (val) {
        if(val==2) {
          this.pulseDecimalPlaces = true
          this.caliber=true
          this.gas=true
          this.formValidate.q3='2'
          this.formValidate.pulseDecimalPlaces = '1'
          this.formValidate.measureDecimalPlaces='1'
        }else if(val==0){
          this.formValidate.pulseDecimalPlaces = '1'
          this.formValidate.measureDecimalPlaces='2'
          this.formValidate.q3=''
          this.pulseDecimalPlaces = true
          this.caliber=true
          this.gas=false
        }else if(val==1){
          this.formValidate.measureDecimalPlaces='2'
//          this.formValidate.q3=''
          this.pulseDecimalPlaces = false
          this.caliber=false
          this.gas=false
        }
      },
      'formValidate.q3':function (val) {
        if(val==0 && this.formValidate.mediumType==1){
          this.pulseDecimalPlaces=true
          this.formValidate.pulseDecimalPlaces='2'
        }else if(val==1 && this.formValidate.mediumType==1){
          this.pulseDecimalPlaces=true
          this.formValidate.pulseDecimalPlaces='3'
        }
      },
      'formValidate.lcdType': function (val) {
        if (val == 0 &&  this.formValidate.measureMode == 1) {
          this.currencySymbol = false
        } else {
          this.currencySymbol = true
        }
      },
      'modal1': function (val) {
        let vm=this
        if (val == true) {
          vm.sysConfig.forEach(function (val1,index) {
            if(val1.id==14){
              if (val1.state == 0) {
                this.formValidate.measureMode = 0
                this.measure = true
              } else if (val1.state == 1) {
                this.formValidate.measureMode = '1'
                this.measure = true
              } else {
                this.measure = false
              }
            }

          })
//          if (this.sysConfig[13].state == 0) {
//            this.formValidate.measureMode = 0
//            this.measure = true
//          } else if (this.sysConfig[13].state == 1) {
//            this.formValidate.measureMode = '1'
//            this.measure = true
//          } else {
//            this.measure = false
//          }
        }else{
          this.formValidate.meterTypeCode=0
          this.formValidate.communicationType=''
          this.formValidate.currencySymbol='1'
          this.formValidate.lcdType=''
          this.formValidate.measureDecimalPlaces='1'
          this.formValidate.measureMode=''
          this.formValidate.mediumType=''
          this.formValidate.meterTypeName=''
          this.formValidate.priceDecimalPlaces='2'
          this.formValidate.pulseDecimalPlaces='2'
          this.formValidate.q3=0
          this.formValidate.state=''
          this.formValidate.currentDetectionFlag=false
          this.formValidate.kFlag=false
        }
      },
      'modal2': function (val) {
        let vm=this
        if (val == true) {
          vm.sysConfig.forEach(function (val1,index) {
            if(val1.id==14){
              if (val1.state == 0 || val1.state == 1) {
                this.measuremode = true
              }  else {
                this.measuremode = false
              }
            }
          })
//          if (this.sysConfig[13].state == 0 || this.sysConfig[13].state == 1) {
//            this.measuremode = true
//          }  else {
//            this.measuremode = false
//          }
        }else{
          this.formValidate.meterTypeCode=0
          this.formValidate.communicationType=''
          this.formValidate.currencySymbol='1'
          this.formValidate.lcdType=''
          this.formValidate.measureDecimalPlaces='1'
          this.formValidate.measureMode=''
          this.formValidate.mediumType=''
          this.formValidate.meterTypeName=''
          this.formValidate.priceDecimalPlaces='2'
          this.formValidate.pulseDecimalPlaces='2'
          this.formValidate.q3=0
          this.formValidate.state=''
          this.formValidate.currentDetectionFlag=false
          this.formValidate.kFlag=false
        }
      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.meterTypeCode=0
          this.formValidate.communicationType=''
          this.formValidate.currencySymbol='1'
          this.formValidate.lcdType=''
          this.formValidate.measureDecimalPlaces='1'
          this.formValidate.measureMode=''
          this.formValidate.mediumType=''
          this.formValidate.meterTypeName=''
          this.formValidate.priceDecimalPlaces='2'
          this.formValidate.pulseDecimalPlaces='2'
          this.formValidate.q3=0
          this.formValidate.state=''
          this.formValidate.currentDetectionFlag=false
          this.formValidate.kFlag=false
        }
      }
    }
  }
</script>
<style>
  .meter1 .layui-icon {
    font-size: 20px;
  }
  .meter1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .meter .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .meter1 .ivu-modal-confirm-body-render{
    margin: 5px 16px;
  }
  .meter1 .ivu-icon-help-circled:before{
    content: '';
  }
  .meter1 .ivu-modal-confirm{
    padding: 0;
    margin: -16px;
  }
  .meter1 .ivu-modal-confirm-head{
    color:#fff;
    background-color: #54b6d1;
    border-radius: 4px;
    padding: 14px 16px;

  }
  .meter .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .meter1 .ivu-select-dropdown{
    width: 47%;
  }
  .meter1 .ivu-form-item:before {
    content: none!important;
  }
  .meter1 .ivu-select,.meter1 .ivu-input-wrapper{
    width: 90%;
  }
  .meter1 .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: none;
  }
  .meter1 .ivu-checkbox-group{
    width: 104px;
  }
  .meter1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .meter1 .input-group{
    width: 80%;
  }
  .meter1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .meter .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .meter{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
  }
  .meter .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .meter .tfooter>.ivu-btn-success{
    margin-top: 13px;
    margin-left: 18px;
  }
  .meter .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .meter .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .meter .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .meter .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .meter .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .meter .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .meter .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .meter .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .meter .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
