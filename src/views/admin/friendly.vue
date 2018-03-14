<template>
  <div style="margin-left: 270px">
    <div class="friendly">
      <header class="panel-heading">
        <Button type="primary" @click="modal1 = true" size="small">{{$t('common.add')}}</Button>
        <span class="tools pull-right">
        <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns7" :data="data3"></Table>
      <div class="tfooter">
        <Modal
          v-model="modal1"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="friendly1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('friendly.add')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem v-show="friendlyCode" :label="this.$t('common.SchemeCode')" prop="friendlyPeriodSchemeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="1000000" :min="1" v-model="formValidate.friendlyPeriodSchemeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('common.SchemeName')" prop="friendlyPeriodSchemeName">
                <Input v-model="formValidate.friendlyPeriodSchemeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.friendlyPeriodUseCount')"  prop="friendlyPeriodUseCount">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="255" :min="0" v-model="formValidate.friendlyPeriodUseCount" :step="1" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem v-show="enableHoliday" :label="this.$t('friendly.holiday')" prop="holiday">
                <Switch v-model="formValidate.enableHolidayFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select :disabled="!formValidate.enableHolidayFlag" size="large" v-model="formValidate.holidaySchemeCode">
                  <Option v-for="item in holidaylist" :value="item.holidaySchemeCode" :key="item.holidaySchemeCode">{{ item.holidaySchemeName }}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.date')" prop="">
                <Switch v-model="formValidate.enableOffdutyTimeFlag"  size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <div class="ivu-input-wrapper ivu-input-type">
                  <TimePicker format="HH:mm" :disabled="!formValidate.enableOffdutyTimeFlag" type="time" v-model="formValidate.offdutyTimeStart" :placeholder="this.$t('common.startTime')" style="width: 45%"></TimePicker>
                  &nbsp;&nbsp;&nbsp;
                  <TimePicker format="HH:mm" :disabled="!formValidate.enableOffdutyTimeFlag" type="time"  v-model="formValidate.offdutyTimeEnd" :placeholder="this.$t('common.endTime')" style="width:45%"></TimePicker>
                </div>
              </FormItem>
              <FormItem  :label="this.$t('friendly.weekendDayString')" prop="weekendDayString">
                <Switch v-model="formValidate.enableWeekendFlag"  size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select   :disabled="!formValidate.enableWeekendFlag" multiple size="large" v-model="formValidate.weekendDayString">
                  <Option v-for="item in weekend" :value="item.weekendDayString" :key="item.weekendDayString">{{ item.label }}</Option>
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
          v-model="modal3"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="friendly1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('friendly.edit')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem v-show="friendlyCode" :label="this.$t('common.SchemeCode')" prop="friendlyPeriodSchemeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="1000000" :min="1" v-model="formValidate.friendlyPeriodSchemeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('common.SchemeName')" prop="friendlyPeriodSchemeName">
                <Input v-model="formValidate.friendlyPeriodSchemeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.friendlyPeriodUseCount')"  prop="friendlyPeriodUseCount">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="255" :min="0" v-model="formValidate.friendlyPeriodUseCount" :step="1" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem v-show="enableHoliday" :label="this.$t('friendly.holiday')" prop="holiday">
                <Switch v-model="formValidate.enableHolidayFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select :disabled="!formValidate.enableHolidayFlag" size="large" v-model="formValidate.holidaySchemeCode">
                  <Option v-for="item in holidaylist" :value="item.holidaySchemeCode" :key="item.holidaySchemeCode">{{ item.holidaySchemeName }}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.date')" prop="">
                <Switch v-model="formValidate.enableOffdutyTimeFlag"  size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <div class="ivu-input-wrapper ivu-input-type">
                  <TimePicker format="HH:mm" :disabled="!formValidate.enableOffdutyTimeFlag" type="time" v-model="formValidate.offdutyTimeStart" :placeholder="this.$t('common.startTime')" style="width: 45%"></TimePicker>
                  &nbsp;&nbsp;&nbsp;
                  <TimePicker format="HH:mm" :disabled="!formValidate.enableOffdutyTimeFlag" type="time"  v-model="formValidate.offdutyTimeEnd" :placeholder="this.$t('common.endTime')" style="width:45%"></TimePicker>
                </div>
              </FormItem>
              <FormItem  :label="this.$t('friendly.weekendDayString')" prop="weekendDayString">
                <Switch v-model="formValidate.enableWeekendFlag"  size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select :disabled="!formValidate.enableWeekendFlag" multiple size="large" v-model="formValidate.weekendDayString">
                  <Option v-for="item in weekend" :value="item.weekendDayString" :key="item.weekendDayString">{{ item.label }}</Option>
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
          v-model="modal2"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="friendly1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('friendly.show')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem v-show="friendlyCode" :label="this.$t('common.SchemeCode')" prop="friendlyPeriodSchemeCode">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber disabled :max="1000000" :min="1" v-model="formValidate.friendlyPeriodSchemeCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('common.SchemeName')" prop="friendlyPeriodSchemeName">
                <Input v-model="formValidate.friendlyPeriodSchemeName" disabled :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select disabled v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.friendlyPeriodUseCount')"  prop="friendlyPeriodUseCount">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" disabled v-model="formValidate.friendlyPeriodUseCount" :step="1" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem v-show="enableHoliday" :label="this.$t('friendly.holiday')" prop="holiday">
                <Switch v-model="formValidate.enableHolidayFlag" disabled size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select  size="large" disabled v-model="formValidate.holidaySchemeCode">
                  <Option v-for="item in holidaylist"   :value="item.holidaySchemeCode" :key="item.holidaySchemeCode">{{ item.holidaySchemeName }}</Option>
                </Select>
              </FormItem>
              <FormItem :label="this.$t('friendly.date')" prop="">
                <Switch disabled v-model="formValidate.enableOffdutyTimeFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <div class="ivu-input-wrapper ivu-input-type">
                  <TimePicker  format="HH:mm" disabled v-model="formValidate.offdutyTimeStart" :placeholder="this.$t('common.startTime')" style="width: 45%"></TimePicker>
                  &nbsp;&nbsp;&nbsp;
                  <TimePicker   format="HH:mm" disabled v-model="formValidate.offdutyTimeEnd" :placeholder="this.$t('common.endTime')" style="width:45%"></TimePicker>
                </div>
              </FormItem>
              <FormItem  :label="this.$t('friendly.weekendDayString')" prop="weekendDayString">
                <Switch disabled v-model="formValidate.enableWeekendFlag"  size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <Select  size="large" disabled  multiple v-model="formValidate.weekendDayString">
                  <Option v-for="item in weekend"  :value="item.weekendDayString" :key="item.weekendDayString">{{ item.label }}</Option>
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
          class-name="friendly1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('friendly.del')}}</p>
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
        <Page :total="friendlyCount" :page-size="friendlypageSize" size="small" show-total  @on-change="changepage"></Page>
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
        friendlyTypeList:[],
        // 初始化信息总条数
        friendlyCount:0,
        // 每页显示多少条
        friendlypageSize:10,
        b:'',
        c:'',
        value1:1,
        holidaylist:{},
        sysConfig:{},
        friendlyCode:false,
        enableHoliday:false,
        loading: true,
        formValidate: {
          createDate:new Date(),
          friendlyPeriodSchemeCode: 0,
          friendlyPeriodSchemeName:'',
          enableHolidayFlag:false,
          enableOffdutyTimeFlag:false,
          enableWeekendFlag:false,
          friendlyPeriodUseCount:1,
          holidaySchemeCode:'0',
          offdutyTimeEnd:'0',
          offdutyTimeStart:'0',
          weekendDayString:[],
          holiday: '',
          weekend:'',
          state:''
        },
        weekend: [
          {
            weekendDayString: '1',
            label: this.$t('friendly.weekend.Monday')
          },
          {
            weekendDayString: '2',
            label: this.$t('friendly.weekend.Tuesday')
          },
          {
            weekendDayString: '3',
            label: this.$t('friendly.weekend.Wednesday')
          },
          {
            weekendDayString: '4',
            label: this.$t('friendly.weekend.Thursday')
          },
          {
            weekendDayString: '5',
            label: this.$t('friendly.weekend.Friday')
          },
          {
            weekendDayString: '6',
            label: this.$t('friendly.weekend.Saturday')
          },
          {
            weekendDayString: '7',
            label: this.$t('friendly.weekend.Sunday')
          },
        ],
        ruleValidate: {
          friendlyPeriodSchemeName: [
            { required: true, message: this.$t('price.addprice.messagepriceSchemeName'), trigger: 'blur' },
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ]
        },
        value:'',
        modal_loading: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        columns7: [
          {
            title:  this.$t('common.SchemeCode'),
            key: 'friendlyPeriodSchemeCode',
          },
          {
            title: this.$t('common.SchemeName'),
            key: 'friendlyPeriodSchemeName'
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
        data3: []
      }
    },
    methods: {
      getHoliday (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/holiday/findAll.do',
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
              vm.holidaylist=response.body.list
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
              vm.sysConfig.forEach(function (val,index) {
                if(val.id==3){
                  if(val.state==1){
                    vm.friendlyCode=false
                  }else if(val.state==0){
                    vm.friendlyCode=true
                  }
                }
                if(val.id==10){
                  if(val.state==1){
                    vm.enableHoliday=true
                  }else if(val==0){
                    vm.enableHoliday=false
                  }
                }
              })
//              if(vm.sysConfig[2].state==1){
//                vm.friendlyCode=false
//              }else if(vm.sysConfig[2].state==0){
//                vm.friendlyCode=true
//              }
//              if(vm.sysConfig[9].state==1){
//                vm.enableHoliday=true
//              }else if(vm.sysConfig[9].state==0){
//                vm.enableHoliday=false
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      type(index){
        if(this.data3[index].state == 1){
          return 'success'
        }
        else if(this.data3[index].state== 0){
          return 'error'
        }
      },
      status(index){
        if(this.data3[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data3[index].state== 0){
          return this.$t('common.forbidden')
        }
      },
      getFriendly (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/friendlyPeriod/findAll.do',
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
              this.friendlyTypeList = response.body.list
              this.friendlyCount = response.body.list.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(response.body.list.length < this.friendlypageSize){
                this.data3 = this.friendlyTypeList;
              }else{
                this.data3 = this.friendlyTypeList.slice(0,this.friendlypageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.friendlypageSize;
        var _end = index * this.friendlypageSize;
        this.data3 = this.friendlyTypeList.slice(_start,_end);
      },
      handleSubmit (name) {
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let date = new Date();
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            let hStart
            let mStart
            let hEnd
            let mEnd
            if(vm.formValidate.enableOffdutyTimeFlag==true){
              hStart=vm.formValidate.offdutyTimeStart.getHours() + ':'
              mStart=vm.formValidate.offdutyTimeStart.getMinutes()
              hEnd=vm.formValidate.offdutyTimeEnd.getHours() + ':'
              mEnd=vm.formValidate.offdutyTimeEnd.getMinutes()
            }else{
              hStart='00:'
              mStart='00'
              hEnd='00:'
              mEnd='00'
            }
            let week='0000000'
            vm.formValidate.weekendDayString.forEach(function (val,index) {
              if(val==1){
                week=week.split('')
                week.splice(0,1,'1')
                week=week.join('')
              }else if(val==2){
                week=week.split('')
                week.splice(1,1,'1')
                week=week.join('')
              }else if(val==3){
                week=week.split('')
                week.splice(2,1,'1')
                week=week.join('')
              }else if(val==4){
                week=week.split('')
                week.splice(3,1,'1')
                week=week.join('')
              }else if(val==5){
                week=week.split('')
                week.splice(4,1,'1')
                week=week.join('')
              }else if(val==6){
                week=week.split('')
                week.splice(5,1,'1')
                week=week.join('')
              }else if(val==7){
                week=week.split('')
                week.splice(6,1,'1')
                week=week.join('')
              }
            })
            let friendlyPeriodSchemeName=vm.formValidate.friendlyPeriodSchemeName
            let state=vm.formValidate.state
            this.$http({
              url:baseURL+'/sys/friendlyPeriod/add.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                friendlyPeriodSchemeCode:vm.formValidate.friendlyPeriodSchemeCode.toString(),
                createDate:Y+M+D+h+m+s,
                friendlyPeriodSchemeName:vm.formValidate.friendlyPeriodSchemeName,
                friendlyPeriodUseCount:vm.formValidate.friendlyPeriodUseCount.toString(),
                holidaySchemeCode:vm.formValidate.holidaySchemeCode||'0',
                weekendDayString:week,
                enableHolidayFlag:vm.formValidate.enableHolidayFlag,
                enableOffdutyTimeFlag:vm.formValidate.enableOffdutyTimeFlag,
                enableWeekendFlag:vm.formValidate.enableWeekendFlag,
                offdutyTimeEnd:hEnd+mEnd,
                offdutyTimeStart:hStart+mStart,
                state:vm.formValidate.state
              })
            }).then((response) => {
              if(response.body.code== 0){
                vm.data3.unshift({
                  friendlyPeriodSchemeCode:response.body.friendlyPeriodSchemeCode,
                  friendlyPeriodSchemeName:friendlyPeriodSchemeName,
                  friendlyPeriodUseCount:vm.formValidate.friendlyPeriodUseCount.toString(),
                  holidaySchemeCode:vm.formValidate.holidaySchemeCode||'0',
                  weekendDayString:week,
                  enableHolidayFlag:vm.formValidate.enableHolidayFlag,
                  enableOffdutyTimeFlag:vm.formValidate.enableOffdutyTimeFlag,
                  enableWeekendFlag:vm.formValidate.enableWeekendFlag,
                  offdutyTimeEnd:hEnd+mEnd,
                  offdutyTimeStart:hStart+mStart,
                  state:state
                });
                  vm.modal1 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
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
      show (index) {
        this.modal2 = true;
        this.formValidate.friendlyPeriodSchemeCode=this.data3[index].friendlyPeriodSchemeCode
        this.formValidate.friendlyPeriodSchemeName=this.data3[index].friendlyPeriodSchemeName
        this.formValidate.state=this.data3[index].state.toString()
        this.formValidate.friendlyPeriodUseCount=this.data3[index].friendlyPeriodUseCount
        this.formValidate.holidaySchemeCode=this.data3[index].holidaySchemeCode.toString()
        this.formValidate.offdutyTimeEnd=this.data3[index].offdutyTimeEnd
        this.formValidate.offdutyTimeStart=this.data3[index].offdutyTimeStart
        this.formValidate.weekendDayString=[]
        if(this.data3[index].weekendDayString[0]==1){
          this.formValidate.weekendDayString.push('1')
        }
        if(this.data3[index].weekendDayString[1]==1){
          this.formValidate.weekendDayString.push('2')
        }
        if(this.data3[index].weekendDayString[2]==1){
          this.formValidate.weekendDayString.push('3')
        }
        if(this.data3[index].weekendDayString[3]==1){
          this.formValidate.weekendDayString.push('4')
        }
        if(this.data3[index].weekendDayString[4]==1){
          this.formValidate.weekendDayString.push('5')
        }
        if(this.data3[index].weekendDayString[5]==1){
          this.formValidate.weekendDayString.push('6')
        }
        if(this.data3[index].weekendDayString[6]==1){
          this.formValidate.weekendDayString.push('7')
        }
        this.formValidate.enableHolidayFlag=this.data3[index].enableHolidayFlag
        this.formValidate.enableOffdutyTimeFlag=this.data3[index].enableOffdutyTimeFlag
        this.formValidate.enableWeekendFlag=this.data3[index].enableWeekendFlag
      },
      edit(index){
        this.modal3 = true;
        this.formValidate.friendlyPeriodSchemeCode=this.data3[index].friendlyPeriodSchemeCode
        this.formValidate.friendlyPeriodSchemeName=this.data3[index].friendlyPeriodSchemeName
        this.formValidate.state=this.data3[index].state.toString()
        this.formValidate.friendlyPeriodUseCount=this.data3[index].friendlyPeriodUseCount
        this.formValidate.holidaySchemeCode=this.data3[index].holidaySchemeCode.toString()
        this.formValidate.offdutyTimeEnd=this.data3[index].offdutyTimeEnd
        this.formValidate.offdutyTimeStart=this.data3[index].offdutyTimeStart
        this.formValidate.weekendDayString=[]
          if(this.data3[index].weekendDayString[0]==1){
            this.formValidate.weekendDayString.push('1')
          }
          if(this.data3[index].weekendDayString[1]==1){
            this.formValidate.weekendDayString.push('2')
          }
          if(this.data3[index].weekendDayString[2]==1){
            this.formValidate.weekendDayString.push('3')
          }
          if(this.data3[index].weekendDayString[3]==1){
            this.formValidate.weekendDayString.push('4')
          }
          if(this.data3[index].weekendDayString[4]==1){
            this.formValidate.weekendDayString.push('5')
          }
          if(this.data3[index].weekendDayString[5]==1){
            this.formValidate.weekendDayString.push('6')
          }
          if(this.data3[index].weekendDayString[6]==1){
            this.formValidate.weekendDayString.push('7')
          }
        this.formValidate.enableHolidayFlag=this.data3[index].enableHolidayFlag
        this.formValidate.enableOffdutyTimeFlag=this.data3[index].enableOffdutyTimeFlag
        this.formValidate.enableWeekendFlag=this.data3[index].enableWeekendFlag
        this.b=index
      },
      update(name){
        let vm = this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let date = new Date();
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
            let D = date.getDate() + ' '
            let h = date.getHours() + ':'
            let m = date.getMinutes() + ':'
            let s = date.getSeconds()
            let hStart
            let mStart
            let hEnd
            let mEnd
            if(vm.formValidate.enableOffdutyTimeFlag==true){
              hStart=vm.formValidate.offdutyTimeStart.getHours() + ':'
              mStart=vm.formValidate.offdutyTimeStart.getMinutes()
              hEnd=vm.formValidate.offdutyTimeEnd.getHours() + ':'
              mEnd=vm.formValidate.offdutyTimeEnd.getMinutes()
            }else{
              hStart='00:'
              mStart='00'
              hEnd='00:'
              mEnd='00'
            }
            let week='0000000'
            vm.formValidate.weekendDayString.forEach(function (val,index) {
              if(val==1){
                week=week.split('')
                week.splice(0,1,'1')
                week=week.join('')
              }else if(val==2){
                week=week.split('')
                week.splice(1,1,'1')
                week=week.join('')
              }else if(val==3){
                week=week.split('')
                week.splice(2,1,'1')
                week=week.join('')
              }else if(val==4){
                week=week.split('')
                week.splice(3,1,'1')
                week=week.join('')
              }else if(val==5){
                week=week.split('')
                week.splice(4,1,'1')
                week=week.join('')
              }else if(val==6){
                week=week.split('')
                week.splice(5,1,'1')
                week=week.join('')
              }else if(val==7){
                week=week.split('')
                week.splice(6,1,'1')
                week=week.join('')
              }


            })
            this.$http({
              url:baseURL+'/sys/friendlyPeriod/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                friendlyPeriodSchemeCode:vm.formValidate.friendlyPeriodSchemeCode,
                createDate:Y+M+D+h+m+s,
                friendlyPeriodSchemeName:vm.formValidate.friendlyPeriodSchemeName,
                friendlyPeriodUseCount:vm.formValidate.friendlyPeriodUseCount.toString(),
                holidaySchemeCode:vm.formValidate.holidaySchemeCode,
                weekendDayString:week,
                enableHolidayFlag:vm.formValidate.enableHolidayFlag,
                enableOffdutyTimeFlag:vm.formValidate.enableOffdutyTimeFlag,
                enableWeekendFlag:vm.formValidate.enableWeekendFlag,
                offdutyTimeEnd:hEnd+mEnd,
                offdutyTimeStart:hStart+mStart,
                state:vm.formValidate.state
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.data3.splice(this.b,1,{
                  friendlyPeriodSchemeCode:vm.formValidate.friendlyPeriodSchemeCode,
                  friendlyPeriodSchemeName:vm.formValidate.friendlyPeriodSchemeName,
                  friendlyPeriodUseCount:vm.formValidate.friendlyPeriodUseCount.toString(),
                  holidaySchemeCode:vm.formValidate.holidaySchemeCode,
                  weekendDayString:week,
                  enableHolidayFlag:vm.formValidate.enableHolidayFlag,
                  enableOffdutyTimeFlag:vm.formValidate.enableOffdutyTimeFlag,
                  enableWeekendFlag:vm.formValidate.enableWeekendFlag,
                  offdutyTimeEnd:hEnd+mEnd,
                  offdutyTimeStart:hStart+mStart,
                  state:vm.formValidate.state
                });
                setTimeout(() => {
                  vm.modal_loading = false;
                  vm.modal3 = false;
                  vm.$Message.success(this.$t('common.messageSuccess'));
                }, 500);
              }else{
                alert(response.body.errors)
                vm.modal3 = true
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
          url:baseURL+'/sys/friendlyPeriod/del.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            friendlyPeriodSchemeCode:vm.data3[vm.c].friendlyPeriodSchemeCode
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data3.splice(vm.c, 1);
            vm.modal4 = false;
            vm.$Message.success(this.$t('common.messagedel'));
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      ok () {
        this.modal2 = false;
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
          this.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      }
    },
    created: function(){
      this.getFriendly();
      this.getSysConfig();
      this.getHoliday();
    },
    watch:{
      'formValidate.enableOffdutyTimeFlag':function (val) {
        if(val==false){
          this.formValidate.offdutyTimeStart=''
          this.formValidate.offdutyTimeEnd=''
        }
      },
      'formValidate.enableWeekendFlag':function (val) {
        if (val == false) {
          this.formValidate.weekendDayString= []
        }
      },
      'formValidate.enableHolidayFlag':function (val) {
        if (val == false) {
          this.formValidate.holidaySchemeCode= ''
        }
      },
      'modal1':function (val) {
        if(val==false){
          this.formValidate.friendlyPeriodSchemeCode=0
          this.formValidate.friendlyPeriodSchemeName=''
          this.formValidate.friendlyPeriodUseCount=1
          this.formValidate.holidaySchemeCode=''
          this.formValidate.weekendDayString=[]
          this.formValidate.enableHolidayFlag=false
          this.formValidate.enableOffdutyTimeFlag=false
          this.formValidate.enableWeekendFlag=false
          this.formValidate.offdutyTimeEnd=''
          this.formValidate.offdutyTimeStart=''
          this.formValidate.state=''
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.friendlyPeriodSchemeCode=0
          this.formValidate.friendlyPeriodSchemeName=''
          this.formValidate.friendlyPeriodUseCount=1
          this.formValidate.holidaySchemeCode=''
          this.formValidate.weekendDayString=[]
          this.formValidate.enableHolidayFlag=false
          this.formValidate.enableOffdutyTimeFlag=false
          this.formValidate.enableWeekendFlag=false
          this.formValidate.offdutyTimeEnd=''
          this.formValidate.offdutyTimeStart=''
          this.formValidate.state=''

        }

      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.friendlyPeriodSchemeCode=0
          this.formValidate.friendlyPeriodSchemeName=''
          this.formValidate.friendlyPeriodUseCount=1
          this.formValidate.holidaySchemeCode=''
          this.formValidate.weekendDayString=[]
          this.formValidate.enableHolidayFlag=false
          this.formValidate.enableOffdutyTimeFlag=false
          this.formValidate.enableWeekendFlag=false
          this.formValidate.offdutyTimeEnd=''
          this.formValidate.offdutyTimeStart=''
          this.formValidate.state=''
        }
      }
    }
  }
</script>
<style>
  .friendly1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
    height: 120px;
  }
  .friendly .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .friendly1 .ivu-form-item:before {
    content: none!important;
  }
  .friendly1 .ivu-select,.friendly1 .ivu-input-wrapper{
    width: 90%;
  }
  .friendly1 .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: none;
  }
  .friendly1 .ivu-checkbox-group{
    width: 104px;
  }
  .friendly1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .friendly1 .input-group{
    width: 80%;
  }
  .friendly1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .friendly .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .friendly{
    min-width:700px;
    width:98%;
    margin-bottom: 60px;
  }
  .friendly .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .friendly .tfooter>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .friendly .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .friendly .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .friendly .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .friendly .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .friendly .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .friendly .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .friendly .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .friendly .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .friendly .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
