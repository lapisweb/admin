<template>
  <div>
    <admin-header></admin-header>
    <admin-nav></admin-nav>
    <div class="prepaid">
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/admin/index"><i class="layui-icon">&#xe612;</i>  后台管理系统</BreadcrumbItem>
        <BreadcrumbItem href="/admin/prepaid">方案管理</BreadcrumbItem>
        <BreadcrumbItem>预付费方案</BreadcrumbItem>
      </Breadcrumb>
      <header class="panel-heading">
        <span class="label label-primary"> Table</span>
        <span class="tools pull-right">
        <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns7" :data="data6"></Table>
      <div class="tfooter">
        <Button type="success" @click="modal1 = true" size="small">添加</Button>
        <Modal
          v-model="modal1"
          width="500"
          :loading="loading">
          <p slot="header" style="color:#fff;background-color: #54b6d1">新增预付费方案</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem label="方案名称" prop="schemeName">
                <Input v-model="formValidate.schemeName" placeholder="请输入名称"></Input>
              </FormItem>
              <FormItem label="类型状态" prop="typeStatus">
                <Select v-model="formValidate.typeStatus" >
                  <Option value="Enable">启用</Option>
                  <Option value="Disable">禁用</Option>
                </Select>
              </FormItem>
              <FormItem label="报警量"  prop="alarmValue">
                <Switch size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" v-model="value1" :step="0.5" style="width: 90%;"></InputNumber>
                  m³
                </div>
              </FormItem>
              <FormItem label="最大囤积量"  prop="rechargeLimitatin">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" v-model="value2" :step="0.5" style="width: 90%;"></InputNumber>
                  m³
                </div>
              </FormItem>
              <FormItem label="月使用限量"  prop="consumptionLimitation">
                <Switch size="small" style="float: right;margin-right: 12%;margin-top: 4%"></Switch>
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" v-model="value3" :step="0.5" style="width: 90%;"></InputNumber>
                  m³
                </div>
              </FormItem>
              <FormItem label="透支"  prop="overDraft">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" v-model="value3" :step="0.5" style="width: 90%;"></InputNumber>
                  m³
                </div>
              </FormItem>
              <FormItem label="友好时段方案" prop="friendly">
                <Select size="large" v-model="formValidate.friendly">
                  <Option v-for="item in friendly" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="月免费使用量"  prop="freeConsumption">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :max="10" :min="1" v-model="value1" :step="0.5" style="width: 90%;"></InputNumber>
                  m³
                </div>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
            <Form>
              <FormItem style="padding-right: 20px;">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">取消</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="handleSubmit('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>确定</span>
                  </button>
                </div>
              </FormItem>
            </Form>
          </div>
        </Modal>
        <Page :total="100" size="small"></Page>
      </div>
    </div>
    <admin-footer></admin-footer>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value1:1,
        value2:655350,
        value3:0,
        loading: true,
        formValidate: {
          communicationMode: '',
          typeName: '',
          type: '',
          measureAccuracy: '',
          currencyAccuracy: '',
          measureMode: '',
          LCTType: '',
          typeStatus:''
        },
        friendly: [
          {
            value: 'test',
            label: 'test'
          },
          {
            value: 'price',
            label: 'price'
          },
          {
            value: 'domestic',
            label: 'domestic'
          },
          {
            value: 'commecial',
            label: 'commecial'
          },
          {
            value: 'institution',
            label: 'institution'
          },
        ],
        ruleValidate: {
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
        value:'',
        modal_loading: false,
        modal1: false,
        columns7: [
          {
            title: '类型代码',
            key: 'typeCode',
          },
          {
            title: '方案名称',
            key: 'typeName'
          },
          {
            title: '启用状态',
            key: 'typeStatus',
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
            title: '操作',
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
        data6: [
          {
            typeCode: 1,
            typeName: 'test',
            typeStatus:'启用'

          },
          {
            typeName: '张小刚',
            typeCode: 25,
            typeStatus:'启用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '张小刚',
            typeCode: 25,
            typeStatus:'启用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },
          {
            typeName: '李小红',
            typeCode: 30,
            typeStatus:'禁用'
          },

        ]
      }
    },
    methods: {
//      getPtrpaid (event) {
//        let vm=this;
//        this.$http({
//          url:'http://api.laison.com:8080/sys/meterType/findAll.do',
//          credentials: true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body:JSON.stringify({
//          })
//        }).then((response) => {
////          console.log(response,'qqqqqqqqq')
//          if (response.body.errors){
//            alert(response.body.errors,'1111')
//          } else {
////            alert(response.body.msg,'2222')
//            if (response.body.code == 0){
//              vm.data6=response.body.list
//            }
//          }
//        })
//          .catch(function (response) {
//            console.log(response)
//          })
//      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            setTimeout(() => {
              this.modal_loading = false;
              this.modal1 = false;
              this.$Message.success('提交成功');
            }, 500);
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
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
      type(index){
        if(this.data6[index].typeStatus=='启用'){
          return 'success'
        }
        else if(this.data6[index].typeStatus=='禁用'){
          return 'error'
        }
        else{
          return text
        }
      },
      status(index){
        if(this.data6[index].typeStatus=='启用'){
          return '启用'
        }
        else if(this.data6[index].typeStatus=='禁用'){
          return '禁用'
        }
      },
      ok () {
        this.$Message.info('点击了确定')
      },
      cancel () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal1 = false;
          this.$Message.success('点击了取消');
        }, 500);
      }
    },
//    created: function(){
//      this.getPtrpaid();
//    },
  }
</script>
<style>
  .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .ivu-modal-footer {
    padding: 0px 0 0 0;
    height: 50px!important;
    border-top: none;
  }
  .ivu-form-item:before {
    content: none!important;
  }
  .ivu-select,.ivu-input-wrapper{
    width: 90%;
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
  .prepaid{
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
