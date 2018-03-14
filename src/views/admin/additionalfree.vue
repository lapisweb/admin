<template>
  <div style="margin-left: 270px">
    <div class="additionalfree">
      <header class="panel-heading">
        <a  href="#/admin/addAdditionalfree" ><Button type="primary" size="small">{{$t('common.add')}}</Button></a>
        <span class="tools pull-right">
           <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns7" :data="data6"></Table>
      <div class="tfooter">
        <Page :total="additionalfreeCount" :page-size="additionalfreepageSize" size="small" show-total  @on-change="changepage"></Page>
      </div>
      <Modal
        v-model="modal1"
        width="900"
        class-name="additionalfree1"
        :loading="loading"
        :mask-closable="false">
        <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.show')}}</p>
        <div >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
            <FormItem :label="this.$t('common.SchemeName')"  class="schemeName" prop="additionalFeeSchemeName">
              <Input v-model="formValidate.additionalFeeSchemeName" disabled :placeholder="this.$t('common.placeholderName')"></Input></FormItem>
            <FormItem  class="schemeName"  :label="this.$t('common.state')" prop="state">
              <Select v-model="formValidate.state" disabled >
                <Option value="1">{{$t('common.enabled')}}</Option>
                <Option value="0">{{$t('common.forbidden')}}</Option>
              </Select>
            </FormItem>
            <FormItem style="width: 100%;"  class="schemeName" >

            </FormItem>
            <Table stripe :columns="columns1" :data="data61"></Table>
          </Form>
        </div>
        <div slot="footer" style="height: 60px;">
              <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                <button  type="error" @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                  <span style="color: #fff">{{$t('common.cancel')}}</span>
                </button>
                <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="ok()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                  <span>{{$t('common.ok')}}</span>
                </button>
              </div>
        </div>
      </Modal>
      <Modal
        v-model="modal2"
        width="600"
        class-name="additionalfree1"
        :loading="loading"
        :mask-closable="false">
        <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('additionalfree.del')}}</p>
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
        a:1,
        c:'',
        additionalfreeTypeList:[],
        // 初始化信息总条数
        additionalfreeCount:0,
        // 每页显示多少条
        additionalfreepageSize:10,
        value1:1,
        loading: true,
        formValidate: {
          additionalFeeDetails:{
            additionalFeeDeductionAmount:0,
            additionalFeeDeductionMode:0,
            additionalFeeDeductionMode:0,
            additionalFeeDeductionTimes:0,
            additionalFeeDeductionUnitPrice:0,
            additionalFeeIndex:'',
            additionalFeeName:'',
            additionalFeeSchemeCode:'',
            additionalFeeStartDate:'',
            additionalFeeType:0,
            additionalFeeVat:0
          },
          additionalFeeSchemeCode: '',
          additionalFeeSchemeName: '',
          createDate: '',
          state: '',
        },
        ruleValidate: {
          typeName: [
            { required: true, message: this.$t('additionalfree.addprice.messageadditionalFeeSchemeName'), trigger: 'blur' },
          ],
          typeStatus: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ]
        },
        value:'',
        modal_loading: false,
        modal1: false,
        modal2: false,
        columns7: [
          {
            title: this.$t('common.SchemeCode'),
            key: 'additionalFeeSchemeCode',
          },
          {
            title: this.$t('common.SchemeName'),
            key: 'additionalFeeSchemeName'
          },
          {
            title: this.$t('common.createDate'),
            key: 'createDate',
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
                      location.href = "#/admin/editAddtional/"+((this.a-1)*10+params.index)
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
        columns1: [
          {
            title: this.$t('additionalfree.additionalFeeIndex'),
            key: 'additionalFeeIndex',
            className: 'indexstep',
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
            title: this.$t('additionalfree.additionalFeeDeductionTimes'),
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
        ],
        data6: [],
        data61:[]
      }
    },
    methods: {
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
              this.additionalfreeTypeList = response.body.list
              this.additionalfreeCount = response.body.list.length;
              if(response.body.list.length < this.additionalfreepageSize){
                this.data6 = this.additionalfreeTypeList;
              }else{
                this.data6 = this.additionalfreeTypeList.slice(0,this.additionalfreepageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.additionalfreepageSize;
        var _end = index * this.additionalfreepageSize;
        this.data6 = this.additionalfreeTypeList.slice(_start,_end);
        this.a=index
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
      del () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.$Message.success(this.$t('common.messagedel'));
        }, 500);
      },
      show (index) {
        this.modal1 = true;
        this.data61=this.data6[index].additionalFeeDetails
        this.formValidate.additionalFeeSchemeName=this.data6[index].additionalFeeSchemeName
        this.formValidate.state=this.data6[index].state
        this.formValidate.additionalFeeDetails=this.data61
      },
      remove (index) {
        this.modal2 = true;
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/additionalFeeScheme/delScheme.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            additionalFeeSchemeCode:vm.data6[vm.c].additionalFeeSchemeCode,
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data6.splice(vm.c, 1);
            vm.modal2=false
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
          this.$Message.info(this.$t('common.messageOk'))
        }, 500);
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.modal2 = false;
          this.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      }
    },
    created: function(){
      this.getAdditional();
    },
  }
</script>
<style>
  .additionalfree1 .ivu-table-cell{
    padding:0
  }
  .additionalfree1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .additionalfree1 .ivu-table td, .ivu-table th,td{
    text-align: center!important;
  }
  .additionalfree1{
    z-index: 9999;
  }
  .additionalfree1 .ivu-table-wrapper{
    border-left:none;
    border-right: none;
  }
  .additionalfree1 .ivu-table .appliedDate{
  width: 10%;
}
  .additionalfree1 .ivu-table .unitPrice{
  width: 4%;
}
  .additionalfree1 .ivu-table .vat{
  width: 6%;
}
  .additionalfree1 .ivu-table .deductionAmount{
  width: 8%;
}
  .additionalfree1 .ivu-table .deductionPercentage{
  width: 6%;
}
  .additionalfree1 .ivu-table .deductionType{
  width: 10%;
}
  .additionalfree1 .ivu-table .deductionTime{
  width: 10%;
  text-align: center;
}
  .additionalfree1 .ivu-table th{
    overflow: visible;
  }
  .additionalfree1 .ivu-table .indexstep{
  width: 4%;
}
  .additionalfree1 .ivu-table .itemName{
  width: 14%;
  text-align: center;
}
  .additionalfree1 .ivu-table .feeType{
  width: 8%;
}
  .additionalfree1 .ivu-modal-footer {
    border-top: none;
  }
  .additionalfree1 .ivu-form-item:before {
    content: none!important;
  }
  .additionalfree1 .ivu-select,.additionalfree1 .ivu-input-wrapper{
    width: 90%;
  }
  .additionalfree1 .ivu-checkbox-group{
    width: 104px;
  }
  .additionalfree1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .additionalfree1 .input-group{
    width: 80%;
  }
  .additionalfree1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .additionalfree .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .additionalfree{
    min-width:700px;
    width: 98%;
    margin-bottom: 60px;
  }
  .additionalfree .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .additionalfree .ivu-btn-success{
  background-color: #78CD51;
  border-color: #78CD51;
  color: #FFFFFF;
}
  .additionalfree .tfooter>a>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }

  .additionalfree .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }

  .additionalfree .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .additionalfree .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .additionalfree .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .additionalfree .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .additionalfree .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .additionalfree .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .additionalfree .ivu-table-wrapper{
    width: 98%;
    position: static!important;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .additionalfree .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
