<template>
  <div style="margin-left: 270px">
    <div class="district">

      <header class="panel-heading" >
        <Tree :data="data5" ></Tree>
        <Modal
          v-model="modal1"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.add')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')"  prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode" :max="99" :min="1" v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okProvince('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal5"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.edit')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode" :max="10" :min="1" v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.add')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber  :disabled="!regioncode" v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading" style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okCity('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal6"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.edit')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode"  v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.add')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode" v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okTown('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal7"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.edit')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode"  v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
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
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.add')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode"  v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okVillage('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal8"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.edit')}}</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 80%;margin: 0 auto" inline>
              <FormItem :label="this.$t('district.regionCode')" prop="regionCode" style="width: 100%;">
                <div class="ivu-input-wrapper ivu-input-type">
                  <InputNumber :disabled="!regioncode" v-model="formValidate.regionCode" style="width: 100%;"></InputNumber>
                </div>
              </FormItem>
              <FormItem :label="this.$t('district.regionName')" prop="regionName" style="width: 100%;">
                <Input v-model="formValidate.regionName" :placeholder="this.$t('common.placeholderName')" style="width: 100%;margin-bottom: 5%"></Input>
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <div class="ivu-modal-footer">
                  <button @click="cancel()" type="error" :loading="loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="update('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
                </div>
          </div>
        </Modal>
        <Modal
          v-model="modal9"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="district1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('district.del')}}</p>
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
      </header>
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
        regioncode:false,
        regionCode:0,
        b:'',
        c:'',
        d:'',
        e:'',
        data1:'',
        regionlist:{},
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6: false,
        modal7: false,
        modal8: false,
        modal9: false,
        loading: true,
        value1:1,
        ruleValidate: {
          regionName: [
            { required: true, message: this.$t('district.message'), trigger: 'blur' },
          ],
        },
        formValidate: {
          regionCode: 0,
          regionName: '',
          parentRegionId: 0,
          paths: '',
          childRegions: {},
        },
        data3:[],
        data5: [
          {
            title: this.$t('district.title'),
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '90%',
                  height:'40px',
                  lineHeight:'40px'
                },
              },
                [
                  h('span', [
                    h('Icon', {
                      props: {

                      },
                      style: {
                        marginRight: '8px',
                      },
                    }),
                    h('span', data.title)
                  ]),
                  h('span', {
                      style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px',
                      }
                    },
                    [
                      h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                          icon: 'ios-plus-empty',
                          type: 'text'
                        }),
                        style: {},
                        on: {
                          click: () => {
                            this.data1=data;
                            this.addProvince()
                          }
                        }
                      }),
                      h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                          icon: 'ios-trash-outline',
                          type: 'text'
                        }),
                        style: {
                          width: '52px',
                        },
                        on: {
                          click: () => {
                            this.data1=data;
                            this.removeCompany(root, node, data)
                          }
                        }
                      })
                    ]
                  )
                ]
              );
            },
            children: []
          }
        ],
        buttonProps: {
          type: 'ghost',
          size: 'small',
        },
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
                if(val.id==2){
                  if(val===1){
                    vm.regioncode=false
                  }else if(val.state===0){
                    vm.regioncode=true
                  }
                }
              })
//              if(vm.sysConfig[1].state===1){
//                vm.regioncode=false
//              }else if(vm.sysConfig[1].state===0){
//                vm.regioncode=true
//              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      findRegion (event,index) {
        let vm=this;
        this.$http({
          url:baseURL+'/sys/region/findRegion.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            id:'0'
          })
        }).then((response) => {
          if (response.body.errors){
          } else {
            if (response.body.code == 0){
              vm.data5[0].children=response.body.Region.childRegions
              vm.regionlist=response.body.Region
              vm.data5[0].children.forEach(function (val,index) {
                vm.$set(val, 'title', val.regionName)
                vm.$set(val, 'children', val.childRegions)
                val.render=(h, { root, node, data }) => {
                  return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '90%',
                        height:'40px',
                        lineHeight:'40px'
                      },
                    },
                    [
                      h('span', [
                        h('Icon', {
                          props: {

                          },
                          style: {
                            marginRight: '8px',
                          },
                        }),
                        h('span', data.title)
                      ]),
                      h('span', {
                          style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                          }
                        },
                        [
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-plus-empty',
                              type:'text'
                            }),
                            style: {
                              marginRight: '8px'
                            },
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.addCity()

                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({},vm.buttonProps, {
                              icon: 'ios-compose-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.edit(data)
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-trash-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.remove(root, node, data)
                              }
                            }
                          })
                        ]
                      )
                    ]
                  );
                },
                val.children.forEach(function (val1,index1) {
                  vm.$set(val1, 'title', val1.regionName)
                  vm.$set(val1, 'children', val1.childRegions)
                  val1.render=(h, {root, node, data}) => {
                      return h('span', {
                          style: {
                            display: 'inline-block',
                            width: '90%',
                            height:'40px',
                            lineHeight:'40px'
                          },
                        },
                        [
                          h('span', [
                            h('Icon', {
                              props: {

                              },
                              style: {
                                marginRight: '8px',
                              },
                            }),
                            h('span', data.title)
                          ]),
                          h('span', {
                              style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px',
                              }
                            },
                            [
                              h('Button', {
                                props: Object.assign({}, vm.buttonProps, {
                                  icon: 'ios-plus-empty',
                                  type: 'text'
                                }),
                                style: {},
                                on: {
                                  click: () => {
                                    vm.data1=data;
                                    vm.addTown(data)
                                  }
                                }
                              }),
                              h('Button', {
                                props: Object.assign({}, vm.buttonProps, {
                                  icon: 'ios-compose-outline',
                                  type:'text'
                                }),
                                on: {
                                  click: () => {
                                    vm.data1=data;
                                    vm.editCity(data)
                                  }
                                }
                              }),
                              h('Button', {
                                props: Object.assign({}, vm.buttonProps, {
                                  icon: 'ios-trash-outline',
                                  type: 'text'
                                }),
                                style: {
                                  width: '52px',
                                },
                                on: {
                                  click: () => {
                                    vm.data1=data;
                                    vm.remove(root, node, data)
                                  }
                                }
                              })
                            ]
                          )
                        ]
                      )
                  }
                  val1.children.forEach(function (val2,index2) {
                    vm.$set(val2, 'title', val2.regionName)
                    vm.$set(val2, 'children', val2.childRegions)
                    val2.render=(h, {root, node, data}) => {
                        return h('span', {
                            style: {
                              display: 'inline-block',
                              width: '90%',
                              height:'40px',
                              lineHeight:'40px'
                            },
                          },
                          [
                            h('span', [
                              h('Icon', {
                                props: {

                                },
                                style: {
                                  marginRight: '8px',
                                },
                              }),
                              h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                  display: 'inline-block',
                                  float: 'right',
                                  marginRight: '32px',
                                }
                              },
                              [
                                h('Button', {
                                  props: Object.assign({}, vm.buttonProps, {
                                    icon: 'ios-plus-empty',
                                    type: 'text'
                                  }),
                                  style: {},
                                  on: {
                                    click: () => {
                                      vm.data1=data;
                                      vm.addVillage()
                                    }
                                  }
                                }),
                                h('Button', {
                                  props: Object.assign({}, vm.buttonProps, {
                                    icon: 'ios-compose-outline',
                                    type:'text'
                                  }),
                                  on: {
                                    click: () => {
                                      vm.data1=data;
                                      vm.editTown(data)
                                    }
                                  }
                                }),
                                h('Button', {
                                  props: Object.assign({}, vm.buttonProps, {
                                    icon: 'ios-trash-outline',
                                    type: 'text'
                                  }),
                                  style: {
                                    width: '52px',
                                  },
                                  on: {
                                    click: () => {
                                      vm.data1=data;
                                      vm.remove(root, node, data)
                                    }
                                  }
                                })
                              ]
                            )
                          ]
                        );
                      }
                    val2.children.forEach(function (val3,index3) {
                      val3.children=val3.childRegions
                      vm.$set(val3, 'title', val3.regionName)
                      val3.render=(h, {root, node, data}) => {
                          return h('span', {
                              style: {
                                display: 'inline-block',
                                width: '90%',
                                height:'40px',
                                lineHeight:'40px'
                              },
                            },
                            [
                              h('span', [
                                h('Icon', {
                                  props: {

                                  },
                                  style: {
                                    marginRight: '8px',
                                  },
                                }),
                                h('span', data.title)
                              ]),
                              h('span', {
                                  style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px',
                                  }
                                },
                                [
                                  h('Button', {
                                    props: Object.assign({}, vm.buttonProps, {
                                      icon: 'ios-compose-outline',
                                      type:'text'
                                    }),
                                    on: {
                                      click: () => {
                                        vm.data1=data;
                                        vm.editVillage(data)
                                      }
                                    }
                                  }),
                                  h('Button', {
                                    props: Object.assign({}, vm.buttonProps, {
                                      icon: 'ios-trash-outline',
                                      type: 'text'
                                    }),
                                    style: {
                                      width: '52px',
                                    },
                                    on: {
                                      click: () => {
                                        vm.data1=data;
                                        vm.remove(root, node, data)
                                      }
                                    }
                                  })
                                ]
                              )
                            ]
                          );
                        }
                    })
                  })
                })
              })
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '90%',
            height:'45px',
            lineHeight:'45px',
          }
        }, [
          h('span', [
            h('Icon', {
              props: {

              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty',
                type:'text'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.data1=data;
                  this.addCity()
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-compose-outline',
                type:'text'
              }),
              on: {
                click: () => {
                  this.data1=data;
                  this.edit(data)
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-trash-outline',
                type:'text'
              }),
              on: {
                click: () => {
                  this.data1=data;
                  this.remove(root, node, data)
                }
              }
            })
          ])
        ]);
      },
      addProvince() {
        this.modal1 = true;
      },
      okProvince(name) {
        let vm = this
        let regionName=vm.formValidate.regionName
        let parentRegionId=vm.regionlist.parentRegionId
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/region/addRegion.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                parentRegionId:vm.regionlist.parentRegionId,
                regionName:vm.formValidate.regionName,
                regionCode:vm.formValidate.regionCode.toString(),
              })
            }).then((response) => {
              if(response.body.code==0){
                const children = vm.data1.children || [];
                children.push({
                  title: regionName,
                  expand: true,
                  regionCode:response.body.regionCode,
                  parentRegionId:parentRegionId,
                  render:(h, { root, node, data }) => {
                  return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '90%',
                        height:'40px',
                        lineHeight:'40px'
                      },
                    },
                    [
                      h('span', [
                        h('Icon', {
                          props: {

                          },
                          style: {
                            marginRight: '8px',
                          },
                        }),
                        h('span', data.title)
                      ]),
                      h('span', {
                          style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                          }
                        },
                        [
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-plus-empty',
                              type:'text'
                            }),
                            style: {
                              marginRight: '8px'
                            },
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.addCity()
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({},vm.buttonProps, {
                              icon: 'ios-compose-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.edit(data)
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-trash-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.remove(root, node, data)
                              }
                            }
                          })
                        ]
                      )
                    ]
                  );
                },
                });
                vm.$set(vm.data1, 'expand', true);
                vm.$set(vm.data1, 'children', children)
                vm.modal1 = false;
                vm.$Message.success(this.$t('common.messageSuccess') );
              }else{
                alert(response.body.errors)
                vm.modal1 = true;
              }
            })
              .catch(function (response) {
                console.log(response)
              })
          } else {
            vm.$Message.error(this.$t('common.messageError') );
          }
        })
      },
      edit(data){
        this.modal5 = true;
        this.formValidate.regionCode=data.regionCode
        this.formValidate.regionName=data.title
        this.b=data
      },
      update(name){
        let vm = this
        let children=this.b.children
        let regionName=vm.formValidate.regionName
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/region/updateRegion.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                parentRegionId:vm.b.parentRegionId,
                regionCode:vm.formValidate.regionCode,
                regionName:vm.formValidate.regionName,
              })
            }).then((response) => {
              if(response.body.code==0){
                vm.$set(vm.b, 'title', regionName)
                vm.modal5 = false;
                vm.modal6 = false;
                vm.modal7 = false;
                vm.modal8 = false;
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
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
      editCity(data){
        this.modal6 = true;
        this.formValidate.regionCode=data.regionCode
        this.formValidate.regionName=data.title
        this.b=data
      },
      editTown(data){
        this.modal7 = true;
        this.formValidate.regionCode=data.regionCode
        this.formValidate.regionName=data.title
        this.b=data
      },
      editVillage(data){
        this.modal8 = true;
        this.formValidate.regionCode=data.regionCode
        this.formValidate.regionName=data.title
        this.b=data
      },
      removeProvince(root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
        let vm=this
        this.$http({
          url:baseURL+'/sys/region/delRegion.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            regionCode:data.parentRegionId,
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {}
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addCity() {
        this.modal2 = true;
      },
      okCity(name){
        let vm = this
        let regionName = vm.formValidate.regionName
        let parentRegionId = vm.data1.regionCode
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/region/addRegion.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                parentRegionId:vm.data1.regionCode,
                regionName:vm.formValidate.regionName,
                regionCode:vm.formValidate.regionCode,
              })
            }).then((response) => {
              vm.regionCode=response.body.regionCode
              if(response.body.code==0){
                vm.data1.expand=true
                const children = vm.data1.children || [];
                children.push({
                  title: regionName,
                  expand: true,
                  regionCode:response.body.regionCode,
                  parentRegionId:parentRegionId,
                  render:(h, {root, node, data}) => {
                  return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '90%',
                        height:'40px',
                        lineHeight:'40px'
                      },
                    },
                    [
                      h('span', [
                        h('Icon', {
                          props: {

                          },
                          style: {
                            marginRight: '8px',
                          },
                        }),
                        h('span', data.title)
                      ]),
                      h('span', {
                          style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                          }
                        },
                        [
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-plus-empty',
                              type: 'text'
                            }),
                            style: {
//                          width: '52px',
                            },
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.addTown()
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-compose-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.editCity(data)
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-trash-outline',
                              type: 'text'
                            }),
                            style: {
                              width: '52px',
                            },
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.remove(root, node, data)
                              }
                            }
                          })
                        ]
                      )
                    ]
                  )
                }
                });
                vm.$set(vm.data1, 'expand', true);
                vm.$set(vm.data1, 'children', children);
                vm.modal2= false;
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
                vm.modal2= true
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
      addTown() {
        this.modal3 = true;
      },
      okTown(name){
        let vm = this
        let regionName = vm.formValidate.regionName
        let parentRegionId = vm.data1.regionCode
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/region/addRegion.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                parentRegionId:vm.data1.regionCode,
                regionName:vm.formValidate.regionName,
                regionCode:vm.formValidate.regionCode,
              })
            }).then((response) => {
              vm.regionCode=response.body.regionCode
              if(response.body.code==0){
                const children = vm.data1.children || []
                children.push({
                  title: regionName,
                  expand: true,
                  regionCode:response.body.regionCode,
                  parentRegionId:parentRegionId,
                  render:(h, {root, node, data}) => {
                  return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '90%',
                        height:'40px',
                        lineHeight:'40px'
                      },
                    },
                    [
                      h('span', [
                        h('Icon', {
                          props: {},
                          style: {
                            marginRight: '8px',
                          },
                        }),
                        h('span', data.title)
                      ]),
                      h('span', {
                          style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                          }
                        },
                        [
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-plus-empty',
                              type: 'text'
                            }),
                            style: {},
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.addVillage()
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-compose-outline',
                              type:'text'
                            }),
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.editTown(data)
                              }
                            }
                          }),
                          h('Button', {
                            props: Object.assign({}, vm.buttonProps, {
                              icon: 'ios-trash-outline',
                              type: 'text'
                            }),
                            style: {
                              width: '52px',
                            },
                            on: {
                              click: () => {
                                vm.data1=data;
                                vm.remove(root, node, data)
                              }
                            }
                          })
                        ]
                      )
                    ]
                  );
                }
                });
                vm.$set(vm.data1, 'expand', true);
                vm.$set(vm.data1, 'children', children);
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
      addVillage() {
        this.modal4 = true;
      },
      okVillage(name){
        let vm = this
        let regionName = vm.formValidate.regionName
        let parentRegionId = vm.data1.regionCode
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/region/addRegion.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                parentRegionId:vm.data1.regionCode,
                regionName:vm.formValidate.regionName,
                regionCode:vm.formValidate.regionCode,
              })
            }).then((response) => {
              vm.regionCode=response.body.regionCode
              if(response.body.code==0){
                const children = vm.data1.children || [];
                children.push({
                  title: regionName,
                  expand: true,
                  regionCode:response.body.regionCode,
                  parentRegionId:parentRegionId,
                  render:(h, {root, node, data}) => {
                    return h('span', {
                        style: {
                          display: 'inline-block',
                          width: '90%',
                          height:'40px',
                          lineHeight:'40px'
                        },
                      },
                      [
                        h('span', [
                          h('Icon', {
                            props: {},
                            style: {
                              marginRight: '8px',
                            },
                          }),
                          h('span', data.title)
                        ]),
                        h('span', {
                            style: {
                              display: 'inline-block',
                              float: 'right',
                              marginRight: '32px',
                            }
                          },
                          [
                            h('Button', {
                              props: Object.assign({}, vm.buttonProps, {
                                icon: 'ios-compose-outline',
                                type:'text'
                              }),
                              on: {
                                click: () => {
                                  vm.data1=data;
                                  vm.editVillage(data)
                                }
                              }
                            }),
                            h('Button', {
                              props: Object.assign({}, vm.buttonProps, {
                                icon: 'ios-trash-outline',
                                type: 'text'
                              }),
                              style: {
                                width: '52px',
                              },
                              on: {
                                click: () => {
                                  vm.data1=data;
                                  vm.remove(root, node, data)
                                }
                              }
                            })
                          ]
                        )
                      ]
                    );
                  }
                });
                vm.$set(vm.data1, 'expand', true);
                vm.$set(vm.data1, 'children', children);
                vm.modal4 = false;
                vm.$Message.success(this.$t('common.messageSuccess'));
              }else{
                alert(response.body.errors)
                vm.modal4 = true;
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
      remove(root, node, data) {
        this.modal9=true
        this.c=node
        this.d=root
        this.e=data
      },
      okdel(){
        let node=this.c
        let root=this.d
        let data=this.e
        let vm=this
        this.$http({
          url:baseURL+'/sys/region/delRegion.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            regionCode:data.regionCode,
          })
        }).then((response) => {
          if (response.body.code==0){
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
            vm.modal9=false
            vm.$Message.success(this.$t('common.messagedel'));
          } else {
            alert(response.body.errors)
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      addTown(){
        this.modal3 = true;
      },
      addVillage(){
        this.modal4 = true;
      },
      addjizhongqi(){

      },

      change (status) {
        this.$Message.info(`当前状态：${status}`);
      },
      ok () {
        this.$Message.info(this.$t('common.messageOk'));
      },
      cancel () {
        this.modal1=false
        this.modal2=false
        this.modal3=false
        this.modal4=false
        this.modal5=false
        this.modal6=false
        this.modal7=false
        this.modal8=false
        this.modal9=false
        this.$Message.info(this.$t('common.messageCancel'));
      }
    },
    created: function(){
      this.findRegion();
      this.getSysConfig();
    },
    watch:{
      'modal1':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal4':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal5':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal6':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal7':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
      'modal8':function (val) {
        if(val==false){
          this.formValidate.regionName=''
          this.formValidate.regionCode=0
        }
      },
    }
  }
</script>
<style>
  .district1 .ivu-modal-footer{
    padding:0  10px 0 0;
    height: 90px;
    border-top: none;
  }
  .district1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .district1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
    color: #ffffff!important;
  }
  .district .ivu-btn-icon-only{
    display: none;
  }
  .district .ivu-tree-children li span:nth-child(2):hover {
    background-color: #f1f2f7;
    display: inline-block;
  }
  .district .ivu-tree-children li span:nth-child(2):hover .ivu-btn-icon-only{
    display: inline-block;
  }
  .district .ivu-collapse{
    width: 100%;
    margin-left:40px;
    visibility: hidden;
  }
  .delvisi{
    visibility: visible;
  }
  .district .ivu-tree-title-selected, .ivu-tree-title-selected:hover{
    padding: 5px 5px;
    width: 100%;
    background-color: #f1f2f7;
    margin-top: 15px;
    margin-left: 5px;
  }
  .district .panel-heading .ivu-icon:before{
    font-size: x-large;

  }
  .district .ivu-tree-children{
    margin-left: 18px!important;
    margin-top: -8px!important;
  }
  .district .ivu-tree ul:before{
    display: inline-block;
    content: "";
    width: 2px;
  }
  .ivu-tree ul li:last-child {
    position: relative;
    top: 14px;
  }
  .district .ivu-tree>ul{
    padding-left: 17px;
  }
  .district .panel-heading {
    width: 98%;
    display: flex;
    min-height: 78vh;
    flex-direction: column;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 80px;
    border-color: #FFFFFF;
    font-size: 16px;
    font-weight: 300;
    background-color: #fff;
  }
  .district{
    min-width: 700px;
    width: 98%;
    height: 100%;
    margin-bottom: 60px;
  }
  body{
    background: #e5e6e6!important;
  }
  .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .ivu-form-item{
    width: 70%;
    display: inline-block;
  }
  .ivu-form-item {
    margin-bottom: 6px;
    vertical-align: top;
    zoom: 1;
  }
</style>
