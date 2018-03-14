<template>
  <div style="margin-left: 270px">
    <div class="addPrice">
      <div style="margin: 2% auto;width: 98%;"    >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem :label="this.$t('common.SchemeName')" prop="priceSchemeName" class="schemeName" style="width: 47%;">
            <Input v-model="formValidate.priceSchemeName" :placeholder="this.$t('common.placeholderName')" ></Input>
          </FormItem>
          <FormItem :label="this.$t('common.state')" class="schemeName" prop="state" style="width: 47%;">
            <Select v-model="formValidate.state" >
              <Option value="1">{{$t('common.enabled')}}</Option>
              <Option value="0">{{$t('common.forbidden')}}</Option>
            </Select>
          </FormItem>
          <FormItem v-show="enableMinConsumed" :label="this.$t('price.enableMinConsumedFlag')" style="width: 47%;" class="schemeName" prop="enableMinConsumedFlag">
            <Switch v-model="formValidate.enableMinConsumedFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :disabled="!formValidate.enableMinConsumedFlag"   v-model="formValidate.mouthMinConsumedQuantity" style="width: 40%;"></InputNumber>
              m³&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber :disabled="!formValidate.enableMinConsumedFlag"   v-model="formValidate.mouthMinConsumedAmount" style="width: 40%;"></InputNumber>
              $
            </div>
          </FormItem>
          <FormItem v-show="VATMode" label="VAT" prop="vat" class="schemeName" style="width: 47%;">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="100" :min="0"  v-model="formValidate.vat"  style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem style="width: 100%;"  class="schemeName" >
            <Modal
              v-model="modal1"
              width="500"
              :loading="loading"
              :mask-closable="false"
              class-name="addPrice1">
              <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('price.addprice.add')}}</p>
              <div >
                <Form ref="formValidatee" :model="formValidatee" :rules="ruleValidate"  inline>
                  <FormItem :label="this.$t('price.startValue')" prop="startValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :min="startValue" :readonly="start"  disabled v-model="formValidatee.priceSchemeDetails.startValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem   :label="this.$t('price.endValue')" prop="endValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :min="endValue"  :max="999999999"  :disabled="lastStep"  v-model="formValidatee.priceSchemeDetails.endValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('price.price')" prop="unitPrice">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  v-model="formValidatee.priceSchemeDetails.price" style="width: 80%;"></InputNumber>
                      $
                    </div>
                  </FormItem>
                  <FormItem  :label="this.$t('price.lastStep')" prop="lastStep">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <Switch v-model="lastStep" ></Switch>
                    </div>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer" style="height: 60px;">
                    <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                      <button  type="error" :loading="modal_loading"  @click="cancel()" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span style="color: #fff">{{$t('common.cancel')}}</span>
                      </button>
                      <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okStep('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                        <span>{{$t('common.ok')}}</span>
                      </button>
                    </div>
              </div>
            </Modal>
            <Modal
              v-model="modal2"
              width="500"
              :loading="loading"
              :mask-closable="false"
              class-name="addPrice1">
              <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('price.addprice.edit')}}</p>
              <div >
                <Form ref="formValidat" :model="formValidatee" :rules="ruleValidate"  inline>
                  <FormItem :label="this.$t('price.startValue')" prop="startValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  :readonly="start"  disabled v-model="formValidatee.priceSchemeDetails.startValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem  :label="this.$t('price.endValue')" prop="endValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber :min="endValue"  :max="999999999"  :disabled="lastStep" v-model="formValidatee.priceSchemeDetails.endValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem :label="this.$t('price.price')" prop="unitPrice">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  v-model="formValidatee.priceSchemeDetails.price" style="width: 80%;"></InputNumber>
                      $
                    </div>
                  </FormItem>
                  <FormItem v-show="last" :label="this.$t('price.lastStep')" prop="lastStep">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <Switch v-model="lastStep" ></Switch>
                    </div>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer" style="height: 60px;">
                    <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                      <button  type="error"  @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span style="color: #fff">{{$t('common.cancel')}}</span>
                      </button>
                      <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="updateStep('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                        <span>{{$t('common.ok')}}</span>
                      </button>
                    </div>
              </div>
            </Modal>
            <Modal
              v-model="modal3"
              width="500"
              :loading="loading"
              :mask-closable="false"
              class-name="addPrice1">
              <p slot="header" style="color:#fff;background-color: #54b6d1"> {{$t('price.addprice.del')}}</p>
              <div style="margin-top:5%;text-align: center;">
                <Icon type="information-circled" color="red" size="30" ></Icon>
                &nbsp;&nbsp;&nbsp;
                <span style="font-size: 20px"> {{$t('common.del')}}?</span>
              </div>
              <div slot="footer" style="height: 60px;">
                <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                  <button  type="error" :loading="modal_loading" @click="cancel()" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
            <Button type="success" @click="addStep()" size="large">
              <i class="layui-icon">&#xe615;</i>
              {{$t('common.add')}}</Button>
            <span class="tools pull-right">
              <a href="javascript:;" class="fa fa-chevron-down"></a>
            </span>
          </header>
          <Table stripe :columns="columns8" :data="data51"></Table>
        </Form>
        <div class="ivu-modal-footer" style="height: 60px;">
          <button  type="error" :loading="modal_loading" @click="off()" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
            <span style="color: #fff">{{$t('common.cancel')}}</span>
          </button>
          <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="editPrice('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
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
        last:false,
        lastStep:false,
        letparentName:'',
        letname:'',
        menuList:{},
        start:false,
        a:'',
        c:'',
        data5:[],
        data51: [],
        data52:[],
        startValue:0,
        endValue:0,
        enableMinConsumed:false,
        VATMode:false,
        SingletonMode:false,
        disabled: true,
        loading: true,
        formValidatee: {
          priceSchemeDetails:{
            stepIndex:1,
            endValue:0,
            startValue:0,
            price:1
          }
        },
        formValidate: {
          priceSchemeCode: '',
          priceSchemeName: '',
          createDate: '',
          state: '',
          mouthMinConsumedAmount: 0,
          mouthMinConsumedQuantity: 0,
          vat:0,
          enableMinConsumedFlag:false,
          enableVatFlag:false,
          priceSchemeDetails:{
            stepIndex:1,
            endValue:0,
            startValue:0,
            price:1
          }
        },
        ruleValidate: {
          priceSchemeName: [
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
        columns8: [
          {
            title: this.$t('price.stepIndex'),
            key: 'stepIndex',
          },
          {
            title: this.$t('price.startValue')+'(m³)',
            key: 'startValue'
          },
          {
            title:this.$t('price.endValue')+'(m³)',
            key:'endValue'
          },
          {
            title: this.$t('price.price')+ '($)',
            key: 'price'
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
          },
        ],
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
                if(val.id==11){
                  if(val.state==1){
                    vm.enableMinConsumed=true
                  }else{
                    vm.enableMinConsumed=false
                  }
                }
                if(val.id==13){
                  if(val.state==0){
                    vm.VATMode=false
                  }else{
                    vm.VATMode=true
                  }
                }
                if(val.id==12){
                  if(val.state==1){
                    vm.SingletonMode=true
                  }else {
                    vm.SingletonMode=false
                  }
                }
              })
//              if(vm.sysConfig[10].state==1){
//                vm.enableMinConsumed=true
//              }else{
//                vm.enableMinConsumed=false
//              }
//              if(vm.sysConfig[15].state==0){
//                vm.VATMode=false
//              }else{
//                vm.VATMode=true
//              }
//              if(vm.sysConfig[11].state==1){
//                vm.SingletonMode=true
//              }else {
//                vm.SingletonMode=false
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getPrice (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/priceScheme/findAll.do',
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
              vm.data5=response.body.list
              vm.data51=vm.data5[index].priceSchemeDetails
              vm.formValidate.priceSchemeCode=vm.data5[index].priceSchemeCode
              vm.formValidate.priceSchemeName=vm.data5[index].priceSchemeName
              vm.formValidate.state=vm.data5[index].state
              vm.formValidate.mouthMinConsumedAmount=vm.data5[index].mouthMinConsumedAmount
              vm.formValidate.mouthMinConsumedQuantity=vm.data5[index].mouthMinConsumedQuantity
              vm.formValidate.vat=vm.data5[index].vat
              vm.formValidate.priceSchemeDetails=vm.data51
              vm.startValue=vm.data51[vm.data51.length-1].startValue
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addStep(){
        this.modal1=true
        if(this.data51.length==0){
          this.formValidatee.priceSchemeDetails.stepIndex=1
          this.formValidatee.priceSchemeDetails.startValue=0
          this.formValidatee.priceSchemeDetails.endValue=1
          this.formValidatee.priceSchemeDetails.price=1
        }else if(this.data51[this.data51.length-1].endValue==999999999){
          this.modal1=false
        } else{
          this.formValidatee.priceSchemeDetails.stepIndex=this.data51[this.data51.length-1].stepIndex+1
          this.formValidatee.priceSchemeDetails.startValue=this.data51[this.data51.length-1].endValue
          this.formValidatee.priceSchemeDetails.endValue=this.data51[this.data51.length-1].endValue+1
          this.formValidatee.priceSchemeDetails.price=this.data51[this.data51.length-1].price
        }
      },
      okStep(name){
        let vm=this
        if(vm.SingletonMode==true){
          if(vm.data51[vm.data51.length-1].endValue<vm.formValidatee.priceSchemeDetails.endValue){
            vm.data51.push({
              stepIndex:vm.data51.length+1,
              startValue:vm.formValidatee.priceSchemeDetails.startValue,
              endValue:vm.formValidatee.priceSchemeDetails.endValue,
              price:vm.formValidatee.priceSchemeDetails.price,
            });
            vm.endValue=vm.formValidate.priceSchemeDetails.endValue+1
          }else{
            alert(this.$t('price.addprice.addalert'))
          }
        }else{
          if(vm.formValidatee.priceSchemeDetails.startValue==0){
            vm.data51.push({
              stepIndex:vm.formValidatee.priceSchemeDetails.stepIndex,
              startValue:vm.formValidatee.priceSchemeDetails.startValue,
              endValue:vm.formValidatee.priceSchemeDetails.endValue,
              price:vm.formValidatee.priceSchemeDetails.price,
            });
            vm.endValue=vm.formValidatee.priceSchemeDetails.endValue+1
            vm.data52.push({
              stepIndex:vm.formValidatee.priceSchemeDetails.stepIndex.toString(),
              startValue:vm.formValidatee.priceSchemeDetails.startValue.toString(),
              endValue:vm.formValidatee.priceSchemeDetails.endValue,
              price:vm.formValidatee.priceSchemeDetails.price.toString(),
            });
          }else{
            if(vm.formValidatee.priceSchemeDetails.startValue>vm.data51[vm.data51.length-1].startValue){
              vm.data51.push({
                stepIndex:vm.formValidatee.priceSchemeDetails.stepIndex,
                startValue:vm.formValidatee.priceSchemeDetails.startValue,
                endValue:vm.formValidatee.priceSchemeDetails.endValue,
                price:vm.formValidatee.priceSchemeDetails.price,
              });
              vm.endValue=vm.formValidatee.priceSchemeDetails.endValue+1
              vm.data52.push({
                stepIndex:vm.formValidatee.priceSchemeDetails.stepIndex.toString(),
                startValue:vm.formValidatee.priceSchemeDetails.startValue.toString(),
                endValue:vm.formValidatee.priceSchemeDetails.endValue,
                price:vm.formValidatee.priceSchemeDetails.price.toString(),
              });
            }else{
              vm.formValidatee.priceSchemeDetails.stepIndex=vm.formValidatee.priceSchemeDetails.stepIndex-1
              alert(this.$t('price.addprice.addalert'))
            }
          }
        }
        vm.modal_loading = false;
        vm.modal1 = false;
        vm.formValidatee.priceSchemeDetails.stepIndex=vm.formValidatee.priceSchemeDetails.stepIndex+1
      },
      editStep(index){
        if(this.data51[index].endValue==999999999){
          this.last=true
          this.lastStep=true
        }else{
          if(this.data51.length-1==index){
            this.last=true
          }else{
            this.last=false
          }
        }
          this.modal2 = true
        this.formValidatee.priceSchemeDetails.startValue=this.data51[index].startValue
        this.formValidatee.priceSchemeDetails.endValue=this.data51[index].endValue
        this.formValidatee.priceSchemeDetails.price=this.data51[index].price
        this.a=index
      },
      updateStep(name){
        if(this.SingletonMode==true){
          if(this.data51[this.a].startValue==0){
            this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
            this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
          }else if(this.data51[this.a].endValue==999999999){
            if(this.data51[this.a-1].endValue < this.formValidatee.priceSchemeDetails.endValue){
              this.data51[this.a].startValue=this.formValidatee.priceSchemeDetails.startValue
              this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
              this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
            }else{
              alert(this.$t('price.addprice.addalert'))
            }
          }else{
            if(this.data51[this.a-1].endValue < this.formValidatee.priceSchemeDetails.endValue && this.formValidatee.priceSchemeDetails.endValue<this.data51[this.a+1].endValue){
              this.data51[this.a].startValue=this.formValidatee.priceSchemeDetails.startValue
              this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
              this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
            }else{
              alert(this.$t('price.addprice.editalert'))
            }
          }
        }else{
          if(this.data51[this.a].startValue==0){
            this.data51[this.a].startValue=this.formValidatee.priceSchemeDetails.startValue
            this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
            this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
            if(this.data51.length>1){
              this.data51.splice(this.a+1,1,{
                stepIndex:this.data51[this.a+1].stepIndex,
                startValue:this.data51[this.a].endValue,
                endValue:this.data51[this.a+1].endValue,
                price:this.data51[this.a+1].price,
              })
            }

//            this.data52.splice(this.a,1,{
//              stepIndex:this.data51[this.a].stepIndex.toString(),
//              startValue:this.data51[this.a].startValue.toString(),
//              endValue:this.data51[this.a+1].startValue || 999999999,
//              price:this.formValidatee.priceSchemeDetails.price.toString(),
//            })

          }else if(this.data51[this.a].stepIndex==this.data51.length){
            this.data51[this.a].startValue=this.formValidatee.priceSchemeDetails.startValue
            this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
            this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
            this.data51.splice(this.a-1,1,{
              stepIndex:this.data51[this.a-1].stepIndex,
              startValue:this.data51[this.a-1].startValue,
              endValue:this.data51[this.a].startValue,
              price:this.data51[this.a-1].price,
            })
            this.data52.splice(this.a-1,1,{
              stepIndex:this.data51[this.a-1].stepIndex.toString(),
              startValue:this.data51[this.a-1].startValue.toString(),
              endValue:this.data51[this.a].startValue.toString(),
              price:this.data51[this.a-1].price.toString(),
            })
            this.data52.push({
              stepIndex:this.data51[this.a].stepIndex.toString(),
              startValue:this.formValidatee.priceSchemeDetails.startValue.toString(),
              endValue:this.data51[this.a].endValue,
              price:this.formValidatee.priceSchemeDetails.price.toString(),
            })

          }else{
            if(this.data51[this.a-1].startValue < this.formValidatee.priceSchemeDetails.endValue && this.formValidatee.priceSchemeDetails.startValue<this.data51[this.a+1].startValue){
              this.data51[this.a].startValue=this.formValidatee.priceSchemeDetails.startValue
              this.data51[this.a].endValue=this.formValidatee.priceSchemeDetails.endValue
              this.data51[this.a].price=this.formValidatee.priceSchemeDetails.price
              this.data51.splice(this.a+1,1,{
                stepIndex:this.data51[this.a+1].stepIndex,
                startValue:this.data51[this.a].endValue,
                endValue:this.data51[this.a+1].endValue,
                price:this.data51[this.a+1].price,
              })
              this.data52.splice(this.a-1,1,{
                stepIndex:(this.data51[this.a-1].stepIndex-1).toString(),
                startValue:this.data51[this.a-1].startValue.toString(),
                endValue:this.data51[this.a].startValue.toString(),
                price:this.data51[this.a-1].price.toString(),
              })
              this.data52.push({
                stepIndex:this.data51[this.a].stepIndex.toString(),
                startValue:this.formValidatee.priceSchemeDetails.startValue.toString(),
                endValue:this.data51[this.a].endValue.toString(),
                price:this.formValidatee.priceSchemeDetails.price.toString(),
              })
            }else{
              alert(this.$t('price.addprice.editalert'))
            }
          }
        }
        this.modal_loading = false;
        this.modal2 = false;
      },
      removeStep(index){
        this.modal3=true
        this.c=index
      },
      okdel(){
        this.data51.splice(this.c, 1);
        for(let i=0;i<this.data51.length;i++){
          if(i<this.c){
            this.data51[i].stepIndex=this.data51[i].stepIndex
          }else{
            this.data51[i].stepIndex=this.data51[i].stepIndex-1
          }
        }
        this.$Message.success(this.$t('common.messagedel'));
        this.modal3=false
      },
      editPrice(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/priceScheme/update.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            priceSchemeCode:vm.formValidate.priceSchemeCode,
            priceSchemeName:vm.formValidate.priceSchemeName,
            vat:vm.formValidate.vat.toString(),
            mouthMinConsumedQuantity:vm.formValidate.mouthMinConsumedQuantity.toString(),
            mouthMinConsumedAmount:vm.formValidate.mouthMinConsumedAmount.toString(),
            priceSchemeDetails:vm.data51
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            if (response.body.code == 0){
              location.href = "./#/admin/price"
            }else{
              alert(response.body.errors)
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      ok () {
        this.$Message.info(this.$t('common.messageOk'))
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.modal2 = false;
          this.modal3=false
          this.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      },
      off(){
        this.$router.push({path:'/admin/price'})
        this.$Message.success(this.$t('common.messageCancel'))
      }
    },
    created: function(){
      this.getPrice();
      this.getSysConfig();
    },
    watch:{
      'lastStep':function (val) {
        if(val==true){
          this.formValidate.priceSchemeDetails.endValue=999999999
          this.formValidatee.priceSchemeDetails.endValue=999999999
        }else{
          this.formValidate.priceSchemeDetails.endValue=this.endValue+1
          this.formValidatee.priceSchemeDetails.endValue=this.endValue+1
        }
      },
      'startValue':function (val) {
        if(this.data51.length==0){
          this.formValidatee.priceSchemeDetails.startValue=0
          this.startValue=0
        }else{
          this.startValue=this.startValue
        }
      },
      'modal1':function (val) {
        this.endValue=this.formValidatee.priceSchemeDetails.startValue
        if(this.data51.length==0){
          this.start=true
          this.startValue=0
        }else{
          this.start=false
        }
      },
      'modal2':function (val) {
        this.endValue=this.formValidatee.priceSchemeDetails.startValue
        if(this.data51[this.a].stepIndex==1){
          this.start=true
        }else{
          this.start=false
        }
      }
    }
  }
</script>
<style>
  .addPrice1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .addPrice .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .schemeName>.ivu-form-item-content,.schemeName>.ivu-form-item-content>.ivu-input-wrapper,.schemeName>.ivu-form-item-content>.ivu-input-wrapper>.ivu-input{
    position: static;
  }
  .addPrice .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .schemeName .ivu-form-item-content{
    width: 400px;
  }
  .addPrice1 .ivu-form-item:before {
    content: none!important;
  }
  .addPrice1 .ivu-modal-footer {
    padding: 5% 3% 0 0;
    height: 90px;
    border-top: none;
  }
  .addPrice1 .ivu-checkbox-group{
    width: 104px;
  }
  .addPrice1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .addPrice1 .input-group{
    width: 80%;
  }
  .addPrice1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .addPrice .ivu-input-wrapper{
    width: 100%;
  }
  .addPrice .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid  #e9eaec;
    background-color: #fdfdfc;
  }
  .addPrice{
    min-width:900px;
    height: 100%;
    width: 98%;
    margin-bottom: 60px;
    border-radius: 4px;
    background-color: #ffffff;
  }
  .addPrice .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .addPrice .tfooter>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .addPrice .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .addPrice .ivu-modal-footer {
    border-top: none;
    padding: 12px 18px 12px 18px;
    text-align: right;
  }
  .addPrice .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .addPrice .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .addPrice .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .addPrice .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .addPrice .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .addPrice .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .addPrice .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .addPrice .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
