<template>
  <div>
    <admin-header></admin-header>
    <admin-nav></admin-nav>
    <div class="addPrice">
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/admin/index"><i class="layui-icon">&#xe612;</i>  后台管理系统</BreadcrumbItem>
        <BreadcrumbItem href="/admin/price">方案管理</BreadcrumbItem>
        <BreadcrumbItem href="/admin/price">价格方案</BreadcrumbItem>
        <BreadcrumbItem>添加价格方案</BreadcrumbItem>
      </Breadcrumb>
      <div style="margin: 2% auto;width: 98%;"    >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
          <FormItem label="方案名称" prop="priceSchemeName" class="schemeName">
            <Input v-model="formValidate.priceSchemeName" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="类型状态" class="schemeName" prop="state">
            <Select v-model="formValidate.state" >
              <Option value="0">启用</Option>
              <Option value="1">禁用</Option>
            </Select>
          </FormItem>
          <FormItem label="启用每月最低消费" class="schemeName" prop="">
            <Switch size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>

            <div class="ivu-input-wrapper ivu-input-type">
              <InputNumber v-model="formValidate.mouthMinConsumedAmount" style="width: 40%;"></InputNumber>
              m³&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <InputNumber  v-model="formValidate.mouthMinConsumedQuantity" style="width: 40%;"></InputNumber>
              $
            </div>
          </FormItem>
          <FormItem label="VAT" prop="vat" class="schemeName">
            <Input v-model="formValidate.vat"  placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem style="width: 100%;"  class="schemeName" >
            <Button type="success" @click="modal1 = true" size="small">添加</Button>
            <Modal
              v-model="modal1"
              width="500"
              :loading="loading">
              <p slot="header" style="color:#fff;background-color: #54b6d1">添加价格项目</p>
              <div >
                <Form :model="formValidate" :rules="ruleValidate"  inline>
                  <FormItem label="开始量" prop="startValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  :disabled="disabled" v-model="formValidate.priceSchemeDetails.startValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem label="结束量" prop="endValue">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  v-model="formValidate.priceSchemeDetails.endValue" style="width: 80%;"></InputNumber>
                      m³
                    </div>
                  </FormItem>
                  <FormItem label="单价" prop="unitPrice">
                    <div class="ivu-input-wrapper ivu-input-type">
                      <InputNumber  v-model="formValidate.priceSchemeDetails.price" style="width: 80%;"></InputNumber>
                      $
                    </div>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer" style="height: 60px;">
                <Form>
                  <FormItem style="padding-right: 20px;">
                    <div class="ivu-modal-footer" style="height: 60px;">
                      <button  type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                        <span style="color: #fff">取消</span>
                      </button>
                      <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="addStep()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                        <span>确定</span>
                      </button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </Modal>
          </FormItem>
          <Table stripe :columns="columns8" :data="data51"></Table>
          <div class="ivu-modal-footer" style="height: 60px;">
            <button  type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
              <span style="color: #fff">取消</span>
            </button>
            <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="addPrice('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
              <span>确定</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
    <admin-footer></admin-footer>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        disabled: true,
        loading: true,
        formValidate: {
          priceSchemeCode: '',
          priceSchemeName: '',
          createDate: '',
          state: '',
          mouthMinConsumedAmount: '',
          mouthMinConsumedQuantity: '',
          vat:'',
          priceSchemeDetails:{
            stepIndex:'1',
            endValue:'',
            startValue:'0',
            price:''
          }
        },
        ruleValidate: {
//          stepIndex: [
//            { type: 'number', required: true, message: '必须选择数字', trigger: 'blur' },
//
//          ],
//          endValue: [
//            { type: 'number', required: true, message: '必须选择数字', trigger: 'blur' },
//
//          ],
//          startValue: [
//            { type: 'number', required: true, message: '必须选择数字', trigger: 'blur' },
//
//          ],
//          price: [
//            { type: 'number', required: true, message: '必须选择数字', trigger: 'blur' },
//
//          ],
          typeName: [
            { required: true, message: '表型名称不能为空', trigger: 'blur' },
            { type: 'string', min: 5, message: '介绍不能少于20字', trigger: 'blur' }
          ],
          communicationMode:[
            { required: true, message: '请选择通信方式', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          measureAccuracy: [
            { required: true, message: '请选择计量精度', trigger: 'change' }
          ],
          currencyAccuracy: [
            { required: true, message: '请选择价格精度', trigger: 'change' }
          ],
          measureMode: [
            { required: true, message: '请选择计量方式', trigger: 'change' }
          ],
          LCTType: [
            { required: true, message: '请选择液晶类型', trigger: 'change' }
          ],
          typeStatus: [
            { required: true, message: '请选择类型状态', trigger: 'change' }
          ]
        },
        modal_loading: false,
        modal1: false,
        columns8: [
          {
            title: '阶梯序号',
            key: 'stepIndex',
          },
          {
            title: '开始量（m³）',
            key: 'startValue'
          },
          {
            title:'结束量（m³）',
            key:'endValue'
          },
          {
            title: '单价（$）',
            key: 'price'
          },
          {
            title: '操作',
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
                      this.show(params.index)
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
        data51: [

        ],
        data5:[

        ]
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
          return '启用'
        }
        else if(this.data5[index].state== 0){
          return '禁用'
        }

      },
      getPrice (event) {
        let vm=this;
        this.$http({
          url:'http://api.laison.com:8080/sys/priceScheme/findAll.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          })
        }).then((response) => {
//          console.log(response,'qqqqqqqqq')
          if (response.body.errors){
            alert(response.body.errors,'1111')
          } else {
//            alert(response.body.msg,'2222')
            if (response.body.code == 0){
              vm.data5=response.body.list.priceSchemeDetails
//              console.log(response.body.list.priceSchemeDetails,'11111111111111')
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addStep(){
        let vm=this
        vm.data51.push({
          stepIndex:vm.formValidate.priceSchemeDetails.stepIndex.toString(),
          startValue:vm.formValidate.priceSchemeDetails.startValue.toString(),
          endValue:vm.formValidate.priceSchemeDetails.endValue.toString(),
          price:vm.formValidate.priceSchemeDetails.price.toString(),
        });
        vm.modal_loading = false;
        vm.modal1 = false;
        vm.$Message.success('提交成功');
      },
      addPrice(){
        let vm=this
//        vm.data5.push({
//          priceSchemeDetails:vm.data51,
//          priceSchemeName:vm.formValidate.priceSchemeName,
//        });
        this.$http({
          url:'http://api.laison.com:8080/sys/meterType/add.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            mouthMinConsumedAmount:vm.formValidate.mouthMinConsumedAmount.toString(),
            mouthMinConsumedQuantity:vm.formValidate.mouthMinConsumedQuantity.toString(),
            priceSchemeDetails:vm.data51,
            priceSchemeName:vm.formValidate.priceSchemeName,
            vat:vm.formValidate.vat,
          })
        }).then((response) => {
          console.log(response,'qqqqqqq')

        })
          .catch(function (response) {
            console.log(response)
          })
      },
//      handleSubmit (name) {
//        this.$refs[name].validate((valid) => {
//          if (valid) {
//            setTimeout(() => {
//              this.modal_loading = false;
//              this.modal1 = false;
//              this.$Message.success('提交成功');
//            }, 500);
//          } else {
//            this.$Message.error('表单验证失败!');
//          }
//        })
//      },
      del () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.$Message.success('删除成功');
        }, 500);
      },
      show (index) {
        this.$Modal.confirm({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
//      ok () {
//        this.$Message.info('点击了确定')
//      },
//      cancel () {
//        this.modal_loading = true;
//        setTimeout(() => {
//          this.modal_loading = false;
//          this.modal1 = false;
//          this.$Message.success('点击了取消');
//        }, 500);
//      }
    },
    created: function(){
//      this.getPrice();
    },
  }
</script>
<style>
  .ivu-table td, .ivu-table th{
    text-align: center!important;
  }
  .schemeName>.ivu-form-item-content,.schemeName>.ivu-form-item-content>.ivu-input-wrapper,.schemeName>.ivu-form-item-content>.ivu-input-wrapper>.ivu-input{
    position: static;
  }
  .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .schemeName .ivu-form-item-content{
    width: 300px;
  }
  .ivu-form-item:before {
    content: none!important;
  }
  .ivu-select,.ivu-input-wrapper{
    width: 90%;
  }
  .ivu-modal-footer {
    padding: 5% 3% 0 0;
    height: 90px;
    border-top: none;
  }
  .ivu-checkbox-group{
    width: 104px;
  }
  .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .input-group{
    width: 80%;
  }
  .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .addPrice{
    min-width:700px;
    width: calc(100% - 250px);
    margin-left:250px;
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
  .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
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
