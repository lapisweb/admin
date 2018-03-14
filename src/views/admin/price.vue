<template>
  <div style="margin-left: 270px">
    <div class="price">
      <header class="panel-heading">
        <a  href="#/admin/addPrice" ><Button type="primary" size="small">{{$t('common.add')}}</Button></a>
        <span class="tools pull-right">
        <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns5" :data="data5"></Table>
      <div class="tfooter">
        <Page :total="priceCount" :page-size="pricepageSize" size="small" show-total  @on-change="changepage"></Page>
      </div>
      <Modal
        v-model="modal3"
        width="500"
        :loading="loading"
        :mask-closable="false"
        class-name="price1">
        <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('price.show')}}</p>
        <div >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
            <FormItem :label="this.$t('common.SchemeName')" prop="priceSchemeName" class="schemeName">
              <Input v-model="formValidate.priceSchemeName" disabled :placeholder="this.$t('common.placeholderName')"></Input>
            </FormItem>
            <FormItem :label="this.$t('common.state')" class="schemeName" prop="state">
              <Select v-model="formValidate.state" disabled>
                <Option value="1">{{$t('common.enabled')}}</Option>
                <Option value="0">{{$t('common.forbidden')}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="this.$t('price.enableMinConsumedFlag')"  class="schemeName enable" prop="enableMinConsumedFlag">
              <Switch size="small" disabled style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
              <div class="ivu-input-wrapper ivu-input-type">
                <Input :max="99999999" :min="1" v-model="formValidate.mouthMinConsumedQuantity" disabled style="width: 36%;"></Input>
                m³&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input :max="99999999" :min="1"  v-model="formValidate.mouthMinConsumedAmount" disabled style="width: 36%;"></Input>
                $
              </div>
            </FormItem>
            <FormItem label="VAT" prop="vat" class="schemeName">
              <div class="ivu-input-wrapper ivu-input-type">
                <Input :max="100" :min="1"  v-model="formValidate.vat" disabled  style="width: 100%;"></Input>
              </div>
            </FormItem>
            <FormItem style="width: 100%;"  class="schemeName" >

            </FormItem>
            <Table stripe :columns="columns8" :data="data51"></Table>
          </Form>
        </div>
        <div slot="footer" style="height: 60px;">
              <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
                <button  type="error"  @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
        width="500"
        :loading="loading"
        :mask-closable="false"
        class-name="price1">
        <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('price.del')}}</p>
        <div style="margin-top:5%;text-align: center;">
          <Icon type="information-circled" color="red" size="30" ></Icon>
          &nbsp;&nbsp;&nbsp;
          <span style="font-size: 20px">  {{$t('common.del')}}?</span>
        </div>
        <div slot="footer" style="height: 60px;">
          <div class="ivu-modal-footer" style="height: 60px;padding-right: 20px;">
            <button  type="error"  @click="cancel()" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
        priceTypeList:[],
        // 初始化信息总条数
        priceCount:0,
        // 每页显示多少条
        pricepageSize:10,
        loading: true,
        formValidate: {
          priceSchemeCode: '',
          priceSchemeName: '',
          createDate: '',
          state: '',
          mouthMinConsumedAmount: 0,
          mouthMinConsumedQuantity: 0,
          vat:0,
          priceSchemeDetails:{
            stepIndex:1,
            endValue:0,
            startValue:0,
            price:0
          }
        },
        ruleValidate: {
          typeName: [
            { required: true, message: this.$t('price.addprice.messagepriceSchemeName'), trigger: 'blur' },
          ],
          typeStatus: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ]
        },
        modal_loading: false,
        modal1: false,
        modal3: false,
        modal4: false,
        columns5: [
          {
            title: this.$t('common.SchemeCode'),
            key: 'priceSchemeCode',
          },
          {
            title: this.$t('common.SchemeName'),
            key: 'priceSchemeName'
          },
          {
            title: this.$t('common.createDate'),
            key: 'createDate'
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
                }, this.statusPrice(params.index)),
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
                      location.href = "#/admin/editPrice/"+((this.a-1)*10+params.index)
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
            title:this.$t('price.price')+ '($)',
            key: 'price'
          },
        ],
        data5: [],
        data51: [],
      }
    },
    methods: {
      type(index){
        if(this.data5[index].state == 1){
          return 'success'
        }
        else if(this.data5[index].state== 0){
          return 'error'
        }
      },
      statusPrice(index){
        if(this.data5[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data5[index].state== 0){
          return this.$t('common.forbidden')
        }
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
              this.priceTypeList = response.body.list
              this.priceCount = response.body.list.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(response.body.list.length < this.pricepageSize){
                this.data5 = this.priceTypeList;
              }else{
                this.data5 = this.priceTypeList.slice(0,this.pricepageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.pricepageSize;
        var _end = index * this.pricepageSize;
        this.data5 = this.priceTypeList.slice(_start,_end);
        this.a=index
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
        this.modal3 = true;
        this.data51=this.data5[index].priceSchemeDetails
        this.formValidate.priceSchemeName=this.data5[index].priceSchemeName
        this.formValidate.state=this.data5[index].state
        this.formValidate.mouthMinConsumedAmount=this.data5[index].mouthMinConsumedAmount
        this.formValidate.mouthMinConsumedQuantity=this.data5[index].mouthMinConsumedQuantity
        this.formValidate.vat=this.data5[index].vat
        this.formValidate.priceSchemeDetails=this.data51
      },
      edit(index){},
      remove (index) {
        this.modal4 = true;
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/priceScheme/del.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            priceSchemeCode:vm.data5[vm.c].priceSchemeCode
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data5.splice(vm.c, 1);
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
          this.modal3 = false;
        }, 500);
        this.$Message.info(this.$t('common.messageOk'))
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal3 = false;
          this.modal4= false;
          this.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      }
    },
    created: function(){
      this.getPrice();
    },
  }
</script>
<style>
  .price1 .ivu-table-cell{
    text-align: center;
  }
  .price1 .enable label{
    margin: 0;
    padding-bottom:5px;
  }
  .price1 .ivu-form-item-label{
    width: 160px;
  }
  .price1 .ivu-form .ivu-form-item-label{
    text-align: left;
  }
  .price1 .schemeName .ivu-form-item-content{
    width: 100% !important;
  }
  .price1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .price1 .ivu-modal-footer{
    border-top: none;
  }
  .price .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .price .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .price1 .ivu-form-item:before {
    content: none!important;
  }
  .price1 .ivu-select,.price1 .ivu-input-wrapper{
    width: 90%;
  }
  .price1 .ivu-checkbox-group{
    width: 104px;
  }
  .price1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .price1 .input-group{
    width: 80%;
  }
  .price1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .price .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .price{
    min-width:700px;
    width: 98%;
    margin-bottom: 60px;
  }
  .price .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .price .tfooter>a>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .price .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .price .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .price .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .price .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .price .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .price .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .price .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .price .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .price .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
