<template>
  <div style="margin-left: 270px">
    <div class="customer">
      <header class="panel-heading">
        <Button type="primary" @click="modal1=true" size="small">{{$t('common.add')}}</Button>
        <span class="tools pull-right">
        <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns8" :data="datac"></Table>
      <div class="tfooter">
        <Page :total="customerCount" :page-size="customerpageSize" size="small" show-total  @on-change="changepage"></Page>
      </div>
    </div>
    <Modal
      v-model="modal1"
      width="600"
      :loading="loading"
      :mask-closable="false"
      class-name="customer1">
      <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('customer.add')}}</p>
      <div >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem v-show="CustomerCode" :label="this.$t('common.SchemeCode')" prop="customerTypeCode">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber   v-model="formValidate.customerTypeCode" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('common.SchemeName')" prop="customerTypeName">
            <Input v-model="formValidate.customerTypeName" :placeholder="this.$t('common.placeholderName')"></Input>
          </FormItem>
          <FormItem  :label="this.$t('customer.payType')" prop="payType">
            <Select :disabled="pay" v-model="formValidate.payType" >
              <Option value=0>{{$t('customer.payType0')}}</Option>
              <Option value=1>{{$t('customer.payType1')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('common.state')" prop="state">
            <Select v-model="formValidate.state" >
              <Option value="1">{{$t('common.enabled')}}</Option>
              <Option value="0">{{$t('common.forbidden')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.meter')" prop="meterTypeCode">
            <Select size="large" v-model="formValidate.meterTypeCode" >
              <Option v-for="item in meterlist"  :value="item.meterTypeCode" :key="item.meterTypeCode">{{ item.meterTypeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.price')" prop="priceSchemeCode">
            <Select size="large" v-model="formValidate.priceSchemeCode">
              <Option v-for="item in pricelist" :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePrice')" prop="reservePriceSchemeCode">
            <Switch v-model="yuyue" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <Select :disabled="!yuyue" size="large" v-model="formValidate.reservePriceSchemeCode">
              <Option v-for="item in pricelist" :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePriceStartTime')" prop="reservePriceSchemeStartTime">
            <DatePicker :disabled="!yuyue" type="date"  style="width: 100%;position: relative" v-model="formValidate.reservePriceSchemeStartTime"  >
            </DatePicker>
          </FormItem>
          <FormItem :label="this.$t('customer.reezeDay')" prop="reezeDay" >
            <Select v-model="formValidate.reezeDay"  >
              <Option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.openAccountFee')" prop="openAccountFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.openAccountFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.replaceMeterFee')" prop="replaceMeterFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.replaceMeterFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.cancelPurchaseFee')" prop="cancelPurchaseFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.cancelPurchaseFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.NormalWaterUsage')" prop="">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.minNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="arrow-right-c"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.maxNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.alarmValue')"  prop="alarmValue">
            <!--<Switch  v-model="baojing" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>-->
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999"  :min="1" v-model="formValidate.prepaymentCustomerParm.alarmValue"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.purchaseMax')"   prop="purchaseMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.prepaymentCustomerParm.purchaseMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.monthMaxConsumeLimit')"   prop="monthMaxConsumeLimit">
            <Switch v-model="yueshiyongliang" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <div  class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :disabled="!yueshiyongliang" :min="1" v-model="formValidate.prepaymentCustomerParm.monthMaxConsumeLimit" style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.overdraftMax')"  prop="overdraftMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.prepaymentCustomerParm.overdraftMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.friendly')" prop="friendlyPeriodSchemeCode">
            <Select size="large" v-model="formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode">
              <Option v-for="item in friendlylist" :value="item.friendlyPeriodSchemeCode" :key="item.friendlyPeriodSchemeCode">{{ item.friendlyPeriodSchemeName }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="height: 60px;">
            <div class="ivu-modal-footer" style="height: 60px;margin-top:-29px;padding-right: 20px;">
              <button  type="error" :loading="modal_loading" @click="cancel"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
      class-name="customer1">
      <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('customer.show')}}</p>
      <div >
        <Form ref="formValidate"  :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem :label="this.$t('common.SchemeCode')" prop="customerTypeCode">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber  disabled  :min="0" v-model="formValidate.customerTypeCode" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('common.SchemeName')" prop="customerTypeName">
            <Input disabled v-model="formValidate.customerTypeName" :placeholder="this.$t('common.placeholderName')"></Input>
          </FormItem>
          <FormItem :label="this.$t('customer.payType')" prop="payType">
            <Select disabled v-model="formValidate.payType" >
              <Option value="0">{{$t('customer.payType0')}}</Option>
              <Option value="1">{{$t('customer.payType1')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('common.state')" prop="state">
            <Select disabled v-model="formValidate.state" >
              <Option value="1">{{$t('common.enabled')}}</Option>
              <Option value="0">{{$t('common.forbidden')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.meter')" prop="meterTypeCode">
            <Select disabled size="large" v-model="formValidate.meterTypeCode">
              <Option  v-for="item in meterlist" :value="item.meterTypeCode" :key="item.meterTypeCode">{{ item.meterTypeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.price')" prop="priceSchemeCode">
            <Select disabled size="large" v-model="formValidate.priceSchemeCode">
              <Option v-for="item in pricelist"  :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePrice')" prop="reservePriceSchemeCode">
            <Switch disabled v-model="yuyue1" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <Select disabled size="large" v-model="formValidate.reservePriceSchemeCode">
              <Option v-for="item in pricelist" :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePriceStartTime')" prop="reservePriceSchemeStartTime">
            <DatePicker disabled type="date" style="width: 100%;position: relative" v-model="formValidate.reservePriceSchemeStartTime"  >
            </DatePicker>
          </FormItem>
          <FormItem :label="this.$t('customer.reezeDay')" prop="reezeDay" >
            <Select disabled v-model="formValidate.reezeDay"  >
              <Option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.openAccountFee')" prop="openAccountFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" disabled :min="1"  v-model="formValidate.openAccountFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.replaceMeterFee')" prop="replaceMeterFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber disabled :max="9999999" :min="1"  v-model="formValidate.replaceMeterFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.cancelPurchaseFee')" prop="cancelPurchaseFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber disabled :max="9999999" :min="1"  v-model="formValidate.cancelPurchaseFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.NormalWaterUsage')" prop="">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber disabled :max="9999999" :min="1" v-model="formValidate.minNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="arrow-right-c"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber disabled :max="9999999" :min="1"  v-model="formValidate.maxNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2"  :label="this.$t('customer.alarmValue')"  prop="alarmValue">
            <!--<Switch  disabled v-model="formValidate.prepaymentCustomerParm.alarmCloseValveFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>-->
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" disabled :min="1" v-model="formValidate.prepaymentCustomerParm.alarmValue"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2"  :label="this.$t('customer.purchaseMax')"   prop="purchaseMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber disabled :max="9999999" :min="1" v-model="formValidate.prepaymentCustomerParm.purchaseMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.monthMaxConsumeLimit')"  prop="monthMaxConsumeLimit">
            <Switch disabled v-model="formValidate.prepaymentCustomerParm.monthLimitFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <div  class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" disabled :min="1" v-model="formValidate.prepaymentCustomerParm.monthMaxConsumeLimit"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2"  :label="this.$t('customer.overdraftMax')"  prop="overdraftMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" disabled :min="1" v-model="formValidate.prepaymentCustomerParm.overdraftMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2"  :label="this.$t('customer.friendly')" prop="friendlyPeriodSchemeCode">
            <Select size="large" disabled v-model="formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode">
              <Option v-for="item in friendlylist"  :value="item.friendlyPeriodSchemeCode" :key="item.friendlyPeriodSchemeCode">{{ item.friendlyPeriodSchemeName }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="height: 60px;">
            <div class="ivu-modal-footer" style="height: 60px;margin-top:-29px;padding-right: 20px;">
              <button  type="error" :loading="modal_loading" @click="cancel" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                <span style="color: #fff">{{$t('common.cancel')}}</span>
              </button>
              <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="ok()" class="ivu-btn ivu-btn-primary ivu-btn-large">
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
      class-name="customer1">
      <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('customer.edit')}}</p>
      <div >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem v-show="CustomerCode" :label="this.$t('common.SchemeCode')" prop="customerTypeCode">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber  :min="0" v-model="formValidate.customerTypeCode" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('common.SchemeName')" prop="customerTypeName">
            <Input v-model="formValidate.customerTypeName" :placeholder="this.$t('common.placeholderName')"></Input>
          </FormItem>
          <FormItem  :label="this.$t('customer.payType')" prop="payType">
            <Select :disabled="pay" v-model="formValidate.payType" >
              <Option value= 0>{{$t('customer.payType0')}}</Option>
              <Option value= 1>{{$t('customer.payType1')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('common.state')" prop="state">
            <Select v-model="formValidate.state" >
              <Option value="1">{{$t('common.enabled')}}</Option>
              <Option value="0">{{$t('common.forbidden')}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.meter')" prop="meterTypeCode">
            <Select size="large" v-model="formValidate.meterTypeCode">
              <Option v-for="item in meterlist" :value="item.meterTypeCode" :key="item.meterTypeCode">{{ item.meterTypeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.price')" prop="priceSchemeCode">
            <Select size="large" v-model="formValidate.priceSchemeCode">
              <Option v-for="item in pricelist" :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePrice')" prop="reservePriceSchemeCode">
            <Switch v-model="yuyue1" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <Select :disabled="!yuyue1" size="large" v-model="formValidate.reservePriceSchemeCode">
              <Option v-for="item in pricelist" :value="item.priceSchemeCode" :key="item.priceSchemeCode">{{ item.priceSchemeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.reservePriceStartTime')" prop="reservePriceSchemeStartTime">
            <DatePicker :disabled="!yuyue1" type="date"  style="width: 100%;position: relative" v-model="formValidate.reservePriceSchemeStartTime"  >
            </DatePicker>
          </FormItem>
          <FormItem :label="this.$t('customer.reezeDay')" prop="reezeDay" >
            <Select v-model="formValidate.reezeDay" >
              <Option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="this.$t('customer.openAccountFee')" prop="openAccountFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.openAccountFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.replaceMeterFee')" prop="replaceMeterFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.replaceMeterFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.cancelPurchaseFee')" prop="cancelPurchaseFee">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.cancelPurchaseFee" style="width: 100%;"></InputNumber>
            </div>
          </FormItem>
          <FormItem :label="this.$t('customer.NormalWaterUsage')" prop="">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.minNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="arrow-right-c"></Icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber :max="9999999" :min="1"  v-model="formValidate.maxNormalWaterUsage" style="width: 30%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.alarmValue')" prop="alarmValue">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999"  :min="1" v-model="formValidate.prepaymentCustomerParm.alarmValue"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.purchaseMax')"  prop="purchaseMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.prepaymentCustomerParm.purchaseMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.monthMaxConsumeLimit')"  prop="monthMaxConsumeLimit">
            <Switch v-model="formValidate.prepaymentCustomerParm.monthLimitFlag" size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
            <div  class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :disabled="!formValidate.prepaymentCustomerParm.monthLimitFlag" :min="1" v-model="formValidate.prepaymentCustomerParm.monthMaxConsumeLimit"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.overdraftMax')"  prop="overdraftMax">
            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber :max="9999999" :min="1" v-model="formValidate.prepaymentCustomerParm.overdraftMax"  style="width: 90%;"></InputNumber>
              m³
            </div>
          </FormItem>
          <FormItem v-show="yuyue2" :label="this.$t('customer.friendly')" prop="friendlyPeriodSchemeCode">
            <Select size="large" v-model="formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode">
              <Option v-for="item in friendlylist" :value="item.friendlyPeriodSchemeCode" :key="item.friendlyPeriodSchemeCode">{{ item.friendlyPeriodSchemeName }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="height: 60px;">
            <div class="ivu-modal-footer" style="height: 60px;margin-top:-29px;padding-right: 20px;">
              <button  type="error" :loading="loading" @click="cancel" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
      width="600"
      :loading="loading"
      :mask-closable="false"
      class-name="customer1">
      <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('customer.del')}}</p>
      <div style="margin-top:5%;text-align: center;">
        <Icon type="information-circled" color="red" size="30" ></Icon>
        &nbsp;&nbsp;&nbsp;
        <span style="font-size: 20px"> {{$t('common.del')}}?</span>
      </div>
      <div slot="footer" style="height: 60px;">
        <div class="ivu-modal-footer" style="height: 60px;margin-top:-29px;padding-right: 20px;">
          <button  type="error" :loading="loading" @click="cancel" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
            <span style="color: #fff">{{$t('common.cancel')}}</span>
          </button>
          <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
            <span>{{$t('common.ok')}}</span>
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        letparentName:'',
        letname:'',
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
        datac: []
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
                if(val.id==4){
                  if(val.state==1){
                    vm.CustomerCode=false
                  }else if(val.state==0){
                    vm.CustomerCode=true
                  }
                }
                if(val.id==15){
                  if(val.state==1){
                    vm.pay=true
                    vm.formValidate.payType='0'
                  }else if(val.state==0){
                    vm.pay=true
                    vm.formValidate.payType='1'
                  }else if(val.state==2){
                    vm.pay=false
                  }
                }
              })
//              if(vm.sysConfig[3].state==1){
//                vm.CustomerCode=false
//              }else if(vm.sysConfig[3].state==0){
//                vm.CustomerCode=true
//              }
//              if(vm.sysConfig[14].state==1){
//                vm.pay=true
//                vm.formValidate.payType='0'
//              }else if(vm.sysConfig[14].state==0){
//                vm.pay=true
//                vm.formValidate.payType='1'
//              }else if(vm.sysConfig[14].state==2){
//                vm.pay=false
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      meterTypeCode(index){
        let vm=this
        let meterTypeName
        for(let i=0;i<vm.meterlist.length;i++){
          if(vm.meterlist[i].meterTypeCode==vm.datac[index].meterTypeCode){
            meterTypeName= vm.meterlist[i].meterTypeName
          }
        }
        return meterTypeName
      },
      priceSchemeCode(index){
        let vm=this
        let priceSchemeName
        for(var i=0;i<vm.pricelist.length;i++){
          if(vm.pricelist[i].priceSchemeCode==vm.datac[index].priceSchemeCode){
            priceSchemeName=vm.pricelist[i].priceSchemeName
          }
        }
        return priceSchemeName || vm.datac[index].priceSchemeCode
      },
      type(index){
        if(this.datac[index].state == 1){
          return 'success'
        }
        else if(this.datac[index].state== 0){
          return 'error'
        }
      },
      status(index){
        if(this.datac[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.datac[index].state== 0){
          return this.$t('common.forbidden')
        }
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
              vm.meterlist=response.body.list
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
              vm.pricelist=response.body.list
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
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
              vm.friendlylist = response.body.list
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getCustomer (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/customerType/findAll.do',
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
              vm.formValidate.customerTypeCode=Number(vm.formValidate.customerTypeCode)
              this.customerTypeList = response.body.list
              this.customerCount = response.body.list.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(response.body.list.length < this.customerpageSize){
                this.datac = this.customerTypeList;
              }else{
                this.datac = this.customerTypeList.slice(0,this.customerpageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.customerpageSize;
        var _end = index * this.customerpageSize;
        this.datac = this.customerTypeList.slice(_start,_end);
      },
      handleSubmit (name) {
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let date
            let Y
            let M
            let D
            let h
            let m
            let s
            if(vm.yuyue==true){
              let date = vm.formValidate.reservePriceSchemeStartTime;
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              let D = date.getDate() + ' ';
              let h = date.getHours() + ':';
              let m = date.getMinutes() + ':';
              let s = date.getSeconds();
            }
            if(date==null){
              date='2001-01-01 00:00:00'
            }else{
              date=Y+M+D+h+m+s
            }
            this.$http({
              url:baseURL+'/sys/customerType/addCustomerType.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                customerTypeCode:vm.formValidate.customerTypeCode,
                customerTypeName:vm.formValidate.customerTypeName,
                meterTypeCode:vm.formValidate.meterTypeCode.toString(),
                payType:vm.formValidate.payType.toString(),
                state:vm.formValidate.state.toString(),
                priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
                reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
                reservePriceSchemeStartTime:date,
                reezeDay:vm.formValidate.reezeDay,
                openAccountFee:vm.formValidate.openAccountFee,
                cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
                replaceMeterFee:vm.formValidate.replaceMeterFee,
                maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
                minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
                prepaymentCustomerParm:{
                  alarmCloseValveFlag:vm.baojing,
                  alarmValue:vm.formValidate.prepaymentCustomerParm.alarmValue,
                  purchaseMax:vm.formValidate.prepaymentCustomerParm.purchaseMax,
                  monthMaxConsumeLimit:vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
                  overdraftMax:vm.formValidate.prepaymentCustomerParm.overdraftMax,
                  friendlyPeriodSchemeCode:vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
                  monthLimitFlag:vm.yueshiyongliang
                }
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.datac.unshift({
                  customerTypeCode:response.body.customerTypeCode,
                  customerTypeName:vm.formValidate.customerTypeName,
                  meterTypeCode:vm.formValidate.meterTypeCode.toString(),
                  payType:vm.formValidate.payType.toString(),
                  state:vm.formValidate.state.toString(),
                  priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
                  reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
                  reservePriceSchemeStartTime:date,
                  reezeDay:vm.formValidate.reezeDay,
                  openAccountFee:vm.formValidate.openAccountFee,
                  cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
                  replaceMeterFee:vm.formValidate.replaceMeterFee,
                  maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
                  minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
                  prepaymentCustomerParm:{
                    alarmCloseValveFlag:vm.baojing,
                    alarmValue:vm.formValidate.prepaymentCustomerParm.alarmValue,
                    purchaseMax:vm.formValidate.prepaymentCustomerParm.purchaseMax,
                    monthMaxConsumeLimit:vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
                    overdraftMax:vm.formValidate.prepaymentCustomerParm.overdraftMax,
                    friendlyPeriodSchemeCode:vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
                    monthLimitFlag:vm.yueshiyongliang
                  }
                });
                vm.$Message.success(this.$t('common.messageSuccess'));
                vm.modal1 = false;
              }else{
                alert(response.body.errors)
                vm.modal1 = true;
              }
            }).catch(function (response) {
                console.log(response)
              })
          } else {
            vm.$Message.error(this.$t('common.messageError'));
          }
        })
      },
      show (index) {
        if(this.datac[index].reservePriceSchemeCode==0){
          this.yuyue1=false
        }else{
          this.yuyue1=true
        }
        this.modal2 = true;
        this.formValidate.payType=this.datac[index].payType.toString()
        this.formValidate.customerTypeCode=Number(this.datac[index].customerTypeCode)
        this.formValidate.customerTypeName=this.datac[index].customerTypeName
        this.formValidate.meterTypeCode=this.datac[index].meterTypeCode.toString()
        this.formValidate.state=this.datac[index].state.toString()
        this.formValidate.priceSchemeCode=this.datac[index].priceSchemeCode.toString()
        this.formValidate.reservePriceSchemeStartTime=this.datac[index].reservePriceSchemeStartTime.toString()
        this.formValidate.reservePriceSchemeCode=this.datac[index].reservePriceSchemeCode.toString()
        this.formValidate.reezeDay=this.datac[index].reezeDay
        this.formValidate.openAccountFee=this.datac[index].openAccountFee
        this.formValidate.cancelPurchaseFee=this.datac[index].cancelPurchaseFee
        this.formValidate.replaceMeterFee=this.datac[index].replaceMeterFee
        this.formValidate.maxNormalWaterUsage=this.datac[index].maxNormalWaterUsage
        this.formValidate.minNormalWaterUsage=this.datac[index].minNormalWaterUsage
        this.formValidate.prepaymentCustomerParm.alarmValue=this.datac[index].prepaymentCustomerParm.alarmValue
        this.formValidate.prepaymentCustomerParm.purchaseMax=this.datac[index].prepaymentCustomerParm.purchaseMax
        this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=this.datac[index].prepaymentCustomerParm.monthMaxConsumeLimit
        this.formValidate.prepaymentCustomerParm.overdraftMax=this.datac[index].prepaymentCustomerParm.overdraftMax
        this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=this.datac[index].prepaymentCustomerParm.friendlyPeriodSchemeCode.toString()
        this.formValidate.prepaymentCustomerParm.alarmCloseValveFlag=this.datac[index].prepaymentCustomerParm.alarmCloseValveFlag
        this.formValidate.prepaymentCustomerParm.monthLimitFlag=this.datac[index].prepaymentCustomerParm.monthLimitFlag
      },
      edit (index) {
        this.modal3 = true;
        if(this.datac[index].reservePriceSchemeCode==0){
          this.yuyue1=false
        }else{
          this.yuyue1=true
        }
        this.formValidate.payType=this.datac[index].payType.toString()
        this.formValidate.customerTypeCode=this.datac[index].customerTypeCode
        this.formValidate.customerTypeName=this.datac[index].customerTypeName
        this.formValidate.meterTypeCode=this.datac[index].meterTypeCode.toString()
        this.formValidate.state=this.datac[index].state.toString()
        this.formValidate.priceSchemeCode=this.datac[index].priceSchemeCode.toString()
        this.formValidate.reservePriceSchemeStartTime=this.datac[index].reservePriceSchemeStartTime
        this.formValidate.reservePriceSchemeCode=this.datac[index].reservePriceSchemeCode.toString()
        this.formValidate.reezeDay=this.datac[index].reezeDay
        this.formValidate.openAccountFee=this.datac[index].openAccountFee
        this.formValidate.cancelPurchaseFee=this.datac[index].cancelPurchaseFee
        this.formValidate.replaceMeterFee=this.datac[index].replaceMeterFee
        this.formValidate.maxNormalWaterUsage=this.datac[index].maxNormalWaterUsage
        this.formValidate.minNormalWaterUsage=this.datac[index].minNormalWaterUsage
        this.formValidate.prepaymentCustomerParm.alarmValue=this.datac[index].prepaymentCustomerParm.alarmValue
        this.formValidate.prepaymentCustomerParm.purchaseMax=this.datac[index].prepaymentCustomerParm.purchaseMax
        this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=this.datac[index].prepaymentCustomerParm.monthMaxConsumeLimit
        this.formValidate.prepaymentCustomerParm.overdraftMax=this.datac[index].prepaymentCustomerParm.overdraftMax
        this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=this.datac[index].prepaymentCustomerParm.friendlyPeriodSchemeCode.toString()
        this.formValidate.prepaymentCustomerParm.alarmCloseValveFlag=this.datac[index].prepaymentCustomerParm.alarmCloseValveFlag
        this.formValidate.prepaymentCustomerParm.monthLimitFlag=this.datac[index].prepaymentCustomerParm.monthLimitFlag
        this.b=index
      },
      update(name){
        let vm = this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            let date
            let Y
            let M
            let D
            let h
            let m
            let s
            if(vm.yuyue==true){
              let date = vm.formValidate.reservePriceSchemeStartTime;
              let Y = date.getFullYear() + '-';
              let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              let D = date.getDate() + ' ';
              let h = date.getHours() + ':';
              let m = date.getMinutes() + ':';
              let s = date.getSeconds();
            }
            if(date==null){
              date='2001-01-01 00:00:00'
            }else{
              date=Y+M+D+h+m+s
            }
            this.$http({
              url:baseURL+'/sys/customerType/update.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                customerTypeCode:vm.formValidate.customerTypeCode.toString(),
                customerTypeName:vm.formValidate.customerTypeName,
                meterTypeCode:vm.formValidate.meterTypeCode.toString(),
                payType:vm.formValidate.payType,
                state:vm.formValidate.state.toString(),
                priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
                reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
                reservePriceSchemeStartTime:date,
                reezeDay:vm.formValidate.reezeDay,
                openAccountFee:vm.formValidate.openAccountFee,
                cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
                replaceMeterFee:vm.formValidate.replaceMeterFee,
                maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
                minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
                prepaymentCustomerParm: {
                  alarmCloseValveFlag: vm.formValidate.prepaymentCustomerParm.alarmCloseValveFlag,
                  alarmValue: vm.formValidate.prepaymentCustomerParm.alarmValue,
                  purchaseMax: vm.formValidate.prepaymentCustomerParm.purchaseMax,
                  monthMaxConsumeLimit: vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
                  overdraftMax: vm.formValidate.prepaymentCustomerParm.overdraftMax,
                  friendlyPeriodSchemeCode: vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
                  monthLimitFlag: vm.formValidate.prepaymentCustomerParm.monthLimitFlag
                }
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.datac.splice(this.b,1,{
                  customerTypeCode:vm.formValidate.customerTypeCode.toString(),
                  customerTypeName:vm.formValidate.customerTypeName,
                  meterTypeCode:vm.formValidate.meterTypeCode.toString(),
                  payType:vm.formValidate.payType,
                  state:vm.formValidate.state.toString(),
                  priceSchemeCode:vm.formValidate.priceSchemeCode.toString(),
                  reservePriceSchemeCode:vm.formValidate.reservePriceSchemeCode.toString(),
                  reservePriceSchemeStartTime:date,
                  reezeDay:vm.formValidate.reezeDay,
                  openAccountFee:vm.formValidate.openAccountFee,
                  cancelPurchaseFee:vm.formValidate.cancelPurchaseFee,
                  replaceMeterFee:vm.formValidate.replaceMeterFee,
                  maxNormalWaterUsage:vm.formValidate.maxNormalWaterUsage,
                  minNormalWaterUsage:vm.formValidate.minNormalWaterUsage,
                  prepaymentCustomerParm: {
                    alarmCloseValveFlag: vm.formValidate.prepaymentCustomerParm.alarmCloseValveFlag,
                    alarmValue: vm.formValidate.prepaymentCustomerParm.alarmValue,
                    purchaseMax: vm.formValidate.prepaymentCustomerParm.purchaseMax,
                    monthMaxConsumeLimit: vm.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit,
                    overdraftMax: vm.formValidate.prepaymentCustomerParm.overdraftMax,
                    friendlyPeriodSchemeCode: vm.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode.toString(),
                    monthLimitFlag: vm.formValidate.prepaymentCustomerParm.monthLimitFlag
                  }
                });
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
      remove (index) {
        this.modal4 = true
        this.c=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/customerType/delCustomerType.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            customerTypeCode:vm.datac[vm.c].customerTypeCode
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.getCustomer();
            vm.modal4= false;
            vm.$Message.success(this.$t('common.messagedel'));
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      ok () {
        this.$Message.info(this.$t('common.messageOk'))
        this.modal2 = false;
      },
      cancel () {
        let vm=this
        vm.modal_loading = true;
        setTimeout(() => {
          vm.modal_loading = false;
          vm.modal1 = false;
          vm.modal2 = false;
          vm.modal3= false;
          vm.modal4= false;
          vm.$Message.success(this.$t('common.messageCancel'));
        }, 500);
      }
    },
    created: function(){
      this.getCustomer();
      this.getMeter()
      this.getPrice()
      this.getFriendly()
      this.getSysConfig();
    },
    watch:{
      'formValidate.payType':function (val) {
        if(val==0){
          this.yuyue2=true
        }else{
          this.yuyue2=false
        }
      },
      'yuyue':function (val) {
        if(val==false){
          this.formValidate.reservePriceSchemeStartTime=''
          this.formValidate.reservePriceSchemeCode=''
        }
      },
      'modal1':function (val) {
        if(val==false){
          this.formValidate.customerTypeCode=0
          this.formValidate.customerTypeName=''
          this.formValidate.meterTypeCode=''
          this.formValidate.payType=''
          this.formValidate.state=''
          this.formValidate.priceSchemeCode=''
          this.formValidate.reservePriceSchemeCod=''
          this.formValidate.reservePriceSchemeStartTime=''
          this.formValidate.reezeDay=1
          this.formValidate.openAccountFee=10.00
          this.formValidate.cancelPurchaseFee=1.00
          this.formValidate.replaceMeterFee=10.00
          this.formValidate.maxNormalWaterUsage=99999999
          this.formValidate.minNormalWaterUsage=0
          this.formValidate.alarmCloseValveFlag=false
          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.customerTypeCode=0
          this.formValidate.customerTypeName=''
          this.formValidate.meterTypeCode=''
          this.formValidate.payType=''
          this.formValidate.state=''
          this.formValidate.priceSchemeCode=''
          this.formValidate.reservePriceSchemeCod=''
          this.formValidate.reservePriceSchemeStartTime=''
          this.formValidate.reezeDay=1
          this.formValidate.openAccountFee=10.00
          this.formValidate.cancelPurchaseFee=1.00
          this.formValidate.replaceMeterFee=10.00
          this.formValidate.maxNormalWaterUsage=99999999
          this.formValidate.minNormalWaterUsage=0
          this.formValidate.alarmCloseValveFlag=false
          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
        }
      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.customerTypeCode=0
          this.formValidate.customerTypeName=''
          this.formValidate.meterTypeCode=''
          this.formValidate.payType=''
          this.formValidate.state=''
          this.formValidate.priceSchemeCode=''
          this.formValidate.reservePriceSchemeCod=''
          this.formValidate.reservePriceSchemeStartTime=''
          this.formValidate.reezeDay=1
          this.formValidate.openAccountFee=10.00
          this.formValidate.cancelPurchaseFee=1.00
          this.formValidate.replaceMeterFee=10.00
          this.formValidate.maxNormalWaterUsage=99999999
          this.formValidate.minNormalWaterUsage=0
          this.formValidate.alarmCloseValveFlag=false
          this.formValidate.prepaymentCustomerParm.alarmValue=5.00
          this.formValidate.prepaymentCustomerParm.purchaseMax=99999999
          this.formValidate.prepaymentCustomerParm.monthMaxConsumeLimit=99999999
          this.formValidate.prepaymentCustomerParm.overdraftMax=99999999
          this.formValidate.prepaymentCustomerParm.friendlyPeriodSchemeCode=''
          this.formValidate.prepaymentCustomerParm.monthLimitFlag=false
        }
      }
    }
  }
</script>
<style>
  th{
    text-align: center!important;
  }
  .ivu-table-cell{
    text-align: center!important;
  }
  .customer1 .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .customer1 .ivu-modal-footer {
    padding: 10px 0 0 0;
    height: 50px!important;
    border-top: none;
  }
  .customer1 .ivu-form-item:before {
    content: none!important;
  }
  .customer1 .ivu-select,.customer1 .ivu-input-wrapper{
    width: 90%;
  }
  .customer1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .customer1 .input-group{
    width: 80%;
  }
  .customer1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .customer .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .customer1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .customer1 .ivu-modal{
    z-index: auto;
  }
  .customer{
    min-width:900px;
    width: 98%;
    margin-bottom: 60px;
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


