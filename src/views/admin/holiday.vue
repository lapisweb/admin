<template>
  <div style="margin-left:270px;">
    <div class="holiday">
      <header class="panel-heading">
        <Button type="primary" @click="modal1 = true"  size="small">{{$t('common.add')}}</Button>
        <span class="tools pull-right">
        <a href="javascript:;" class="fa fa-chevron-down"></a>
        </span>
      </header>
      <Table stripe  :columns="columns7" :data="data4"></Table>
      <div class="tfooter">
        <Modal
          v-model="modal1"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="holiday1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('holiday.add')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem :label="this.$t('common.SchemeName')" prop="holidaySchemeName">
                <Input v-model="formValidate.holidaySchemeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem  >
              <FormItem prop="yearOfDate" class="date">
                <table class="time" >
                  <thead>
                  <tr >
                    <th style="text-align: center">{{$t('holiday.date')}}</th>
                    <th style="text-align: center">{{$t('holiday.state')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color:#eeeeee; text-align: center">
                      <button style="border: none;background-color:#eeeeee;" v-model="formValidate.holidayDetails.yearOfDate"   @click="adddate2017">{{date}}</button>
                    <td ref="shezhi2017">{{$t('holiday.state2')}}</td>

                  </tr>
                  <br>
                  <tr style="background-color:#eeeeee;margin: 10px 0;text-align: center " >
                    <button  style="border: none;background-color:#eeeeee;" value="2/16/2012" v-model="formValidate.holidayDetails.yearOfDate"  @click="adddate2018">{{date+1}}</button>
                    <td ref="shezhi2018">{{$t('holiday.state2')}}</td>
                  </tr>
                  </tbody>
                </table>
              </FormItem>
              <FormItem style="margin-left: 75px;margin-top: 20px;">
                <div ref="adddate7">
                </div>
                <Button type="text" @click="ok2017" v-show="isShow7"   size="small" style="margin-left:50%;background-color: #2fb8f8;color: #fff;">{{$t('common.ok')}}</Button>
                <div ref="adddate8">
                </div>
                <Button type="text"  @click="ok2018" v-show="isShow8"  size="small" style="margin-left:50%;background-color: #2fb8f8;color: #fff;">{{$t('common.ok')}}</Button>
              </FormItem>
            </Form>
          </div>
          <div slot="footer" style="padding-top: 25px;padding-right: 20px;">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="handleSubmit('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
          </div>
        </Modal>
        <Modal
          v-model="modal2"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="holiday1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('holiday.show')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem :label="this.$t('common.SchemeName')" prop="holidaySchemeName">
                <Input v-model="formValidate.holidaySchemeName" disabled :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" disabled >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem  >
              <FormItem prop="yearOfDate" class="date">
                <table class="time" >
                  <thead>
                  <tr>
                    <th style="text-align: center">{{$t('holiday.date')}}</th>
                    <th style="text-align: center">{{$t('holiday.state')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color:#eeeeee; text-align: center">
                    <td>
                      <button style="border: none;background-color:#eeeeee;" v-model="formValidate.holidayDetails.yearOfDate"   @click="show2017">{{date}}</button>
                    </td>
                    <td>{{$t('holiday.state1')}}</td>
                  </tr>
                  <br>
                  <tr style="background-color:#eeeeee;margin: 10px 0; text-align: center">
                    <button style="border: none;background-color:#eeeeee;" v-model="formValidate.holidayDetails.yearOfDate"  @click="show2018">{{date+1}}</button>
                    <td>{{$t('holiday.state1')}} </td>
                  </tr>
                  </tbody>
                </table>
              </FormItem>
              <FormItem style="margin-left: 75px;margin-top: 20px;">
                <div class="screen" v-show="isShow77"></div>
                <div class="screen" v-show="isShow88"></div>
                <div ref="showdate7"></div>
                <div ref="showdate8"></div>
              </FormItem>
            </Form>
          </div>
          <div slot="footer" style="padding-top: 25px;padding-right: 20px">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="ok()" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
          </div>
        </Modal>
        <Modal
          v-model="modal3"
          width="600"
          :loading="loading"
          :mask-closable="false"
          class-name="holiday1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('holiday.edit')}}</p>
          <div >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  inline>
              <FormItem :label="this.$t('common.SchemeName')" prop="holidaySchemeName">
                <Input v-model="formValidate.holidaySchemeName" :placeholder="this.$t('common.placeholderName')"></Input>
              </FormItem>
              <FormItem :label="this.$t('common.state')" prop="state">
                <Select v-model="formValidate.state" >
                  <Option value="1">{{$t('common.enabled')}}</Option>
                  <Option value="0">{{$t('common.forbidden')}}</Option>
                </Select>
              </FormItem  >
              <FormItem prop="yearOfDate" class="date">
                <table class="time" >
                  <thead>
                  <tr>
                    <th style="text-align: center">{{$t('holiday.date')}}</th>
                    <th  style="text-align: center">{{$t('holiday.state')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color:#eeeeee;text-align: center ">
                    <td>
                      <button style="border: none;background-color:#eeeeee;" v-model="formValidate.holidayDetails.yearOfDate7"   @click="editdate2017">{{date}}</button>
                    </td>
                    <td ref="shezhiedit2017">{{$t('holiday.state1')}}</td>
                  </tr>
                  <br>
                  <tr style="background-color:#eeeeee;margin: 10px 0;text-align: center ">
                    <button style="border: none;background-color:#eeeeee;" v-model="formValidate.holidayDetails.yearOfDate8"  @click="editdate2018">{{date+1}}</button>
                    <td ref="shezhiedit2018">{{$t('holiday.state1')}}</td>
                  </tr>
                  </tbody>
                </table>
              </FormItem>
              <FormItem style="margin-left: 75px;margin-top: 20px;">
                <div ref="editdate7"></div>
                <Button type="text" @click="edit2017" v-show="editShow7"   size="small" style="margin-left:50%;background-color: #2fb8f8;color: #fff;">{{$t('common.ok')}}</Button>
                <div ref="editdate8"></div>
                <Button type="text" @click="edit2018" v-show="editShow8"  size="small" style="margin-left:50%;background-color: #2fb8f8;color: #fff;">{{$t('common.ok')}}</Button>
              </FormItem>
            </Form>
          </div>
          <div slot="footer" style="padding-top: 25px;padding-right: 20px">
                  <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
                    <span style="color: #fff">{{$t('common.cancel')}}</span>
                  </button>
                  <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="update('formValidate')" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span>{{$t('common.ok')}}</span>
                  </button>
          </div>
        </Modal>
        <Modal
          v-model="modal4"
          width="400"
          :loading="loading"
          :mask-closable="false"
          class-name="holiday1">
          <p slot="header" style="color:#fff;background-color: #54b6d1">{{$t('holiday.del')}}</p>
          <div style="margin-top:5%;text-align: center;">
            <Icon type="information-circled" color="red" size="30" ></Icon>
            &nbsp;&nbsp;&nbsp;
            <span style="font-size: 20px">{{$t('common.del')}}?</span>
          </div>
          <div slot="footer" style="padding-top: 25px;padding-right: 20px">
            <button @click="cancel()" type="error" :loading="modal_loading"  style="margin-left: 8px;background-color: #8175c7;border-color: #8175c7" class="ivu-btn ivu-btn-text ivu-btn-large">
              <span style="color: #fff">{{$t('common.cancel')}}</span>
            </button>
            <button style="background-color: #59ace2;border-color:  #59ace2" type="success" @click="okdel()" class="ivu-btn ivu-btn-primary ivu-btn-large">
              <span>{{$t('common.ok')}}</span>
            </button>
          </div>
        </Modal>
        <Page :total="holidayCount" :page-size="holidaypageSize" size="small" show-total  @on-change="changepage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import   '../../assets/js/admin/kalendae.standalone'
  export default {
    data () {
      return {
        letparentName:'',
        letname:'',
        menuList:{},
        kal:'',
        kal1:'',
        date:new Date().getFullYear(),
        holidayTypeList:[],
        // 初始化信息总条数
        holidayCount:0,
        // 每页显示多少条
        holidaypageSize:10,
        editShow7:false,
        editShow8:false,
        isShow7:false,
        isShow8:false,
        isShow77:false,
        isShow88:false,
        c:'',
        b:'',
        a:'',
        a7:{},
        a8:{},
        value1:1,
        loading: true,
        formValidate: {
          holidaySchemeCode: '',
          holidaySchemeName: '',
          state: '',
          holidayDetails: {
            holidayHexString7:'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            holidayHexString8:'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            holidaySchemeCode:'',
            holidayVersion:'',
            yearOfDate7:'2018',
            yearOfDate8:'2019',
          },
        },
        ruleValidate: {
          holidaySchemeName: [
            { required: true, message: this.$t('holiday.messageholidaySchemeName'), trigger: 'blur' },
          ],
          state: [
            { required: true, message: this.$t('common.messageState'), trigger: 'change' }
          ],
        },
        value:'',
        modal_loading: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        columns7: [
          {
            title: this.$t('common.SchemeCode'),
            key: 'holidaySchemeCode',
          },
          {
            title: this.$t('common.SchemeName'),
            key: 'holidaySchemeName'
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
        data4: [],
        data41:[]
      }
    },
    methods: {
      type(index){
        if(this.data4[index].state == 1){
          return 'success'
        }
        else if(this.data4[index].state== 0){
          return 'error'
        }
      },
      status(index){
        if(this.data4[index].state == 1){
          return this.$t('common.enabled')
        }
        else if(this.data4[index].state== 0){
          return this.$t('common.forbidden')
        }
      },
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
              this.holidayTypeList = response.body.list
              this.holidayCount = response.body.list.length;
              // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
              if(response.body.list.length < this.holidaypageSize){
                this.data4 = this.holidayTypeList;
              }else{
                this.data4 = this.holidayTypeList.slice(0,this.holidaypageSize);
              }
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      changepage(index){
        var _start = ( index - 1 ) * this.holidaypageSize;
        var _end = index * this.holidaypageSize;
        this.data4 = this.holidayTypeList.slice(_start,_end);
      },
      adddate2017(event){
        event.preventDefault();
        this.formValidate.holidayDetails.yearOfDate7=new Date().getFullYear()
        if(this.$refs.adddate7.innerHTML=='' && this.$refs.adddate8.innerHTML ==''){
          new Kalendae(this.$refs.adddate7, {
            months:0,
            mode:'multiple',
          })
          let month1=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+new Date().getFullYear() ){
            month1[0].style.display="none"
          }else{
            month1[0].style.display=""
          }
          let month2=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+new Date().getFullYear() ){
            month2[0].style.display="none"
          }else{
            month2[0].style.display=""
          }
          this.isShow7 = true;
        }else{
          this.$refs.adddate7.innerHTML='';
          this.isShow7 = false;
        }
        let sring7=this.formValidate.holidayDetails.holidayHexString7.split('')
        sring7.forEach(function (item,index) {
          if(sring7[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              let ri=ri
            }
            let dd=new Date().getFullYear()+'-'+yue+'-'+ri
            let span=document.getElementsByTagName('span')
            for(let i=0;i<span.length;i++){
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
          }
        })
      },
      ok2017(){
        let vm=this
        vm.a7=document.getElementsByClassName('k-selected k-in-month k-active')
        let a7='000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        var dataDate=[]
        for(let i=0;i<this.a7.length;i++){
          let b=vm.a7[i].getAttribute('data-date')
          dataDate.push(b)
        }
        dataDate.forEach(function (item,index) {
          let stepIndex=(item[8]+item[9]-1)+(item[5]+item[6]-1)*32
          a7=a7.split('')
          a7.splice(stepIndex,1,'1')
          a7=a7.join('')
        })
        vm.formValidate.holidayDetails.holidayHexString7=a7
        this.$refs.shezhi2017.innerHTML=this.$t('holiday.state1')
        this.isShow7 = false
        this.$refs.adddate7.innerHTML=''
      },
      adddate2018(event){
        event.preventDefault();
        this.formValidate.holidayDetails.yearOfDate8=new Date().getFullYear()+1
        if(this.$refs.adddate8.innerHTML=='' && this.$refs.adddate7.innerHTML==''){
          new Kalendae(this.$refs.adddate8, {
            months:0,
            mode:'multiple',
            viewStartDate:"1/1/"+(new Date().getFullYear()+1),
          })
          this.isShow8 = true;
          let month3=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+(new Date().getFullYear()+1) ){
            month3[0].style.display="none"
          }else{
            month3[0].style.display=""
          }
          let month4=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+(new Date().getFullYear()+1) ){
            month4[0].style.display="none"
          }else{
            month4[0].style.display=""
          }
        }else{
          this.$refs.adddate8.innerHTML='';
          this.isShow8 = false
        }
        let sring7=this.formValidate.holidayDetails.holidayHexString8.split('')
        sring7.forEach(function (item,index) {
          if(sring7[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              let ri=ri
            }
            let dd=(new Date().getFullYear()+1)+'-'+yue+'-'+ri
            let span=document.getElementsByTagName('span')
            for(let i=0;i<span.length;i++){
              console.log(dd,'sddddddd')
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
          }
        })
      },
      ok2018(){
        let vm=this
        vm.a8=document.getElementsByClassName('k-selected k-in-month k-active')
        let a8='000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        var dataDate=[]
        for(let i=0;i<this.a8.length;i++){
          let b=vm.a8[i].getAttribute('data-date')
          dataDate.push(b)
        }
        dataDate.forEach(function (item,index) {
          let stepIndex=(item[8]+item[9]-1)+(item[5]+item[6]-1)*32
          a8=a8.split('')
          a8.splice(stepIndex,1,'1')
          a8=a8.join('')
        })
        vm.formValidate.holidayDetails.holidayHexString8=a8
        this.$refs.shezhi2018.innerHTML=this.$t('holiday.state1')
        this.isShow8 = false;
        this.$refs.adddate8.innerHTML='';
      },
      date2017(){
        if(this.$refs.date.innerHTML==''){
          new Kalendae(this.$refs.date, {
            months:0,
            mode:'multiple',
            selected:[Kalendae.moment().subtract({y:0})]
          })
        }else{
          this.$refs.date.innerHTML='';
        }
      },
      date2018(){
        this.formValidate.holidayDetails.yearOfDate=2018
        if(this.$refs.date.innerHTML!=''){
          this.$refs.date.innerHTML='';
        }else{
          new Kalendae(this.$refs.date, {
            months:0,
            mode:'multiple',
            selected:[Kalendae.moment().subtract({y:-1})]
          })
        }
      },
      getAll(){
        let span=this.kal.calendars[0].days
        let sring77=this.data4[this.b].holidayDetails[0].holidayHexString.split('')
        sring77.forEach(function (item,index) {
          if(sring77[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              ri=ri
            }
            let dd=new Date().getFullYear()+'-'+yue+'-'+ri
            for(let i=0;i<span.length;i++){
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
          }
        })
      },
      getAll1(){
        let span=this.kal1.calendars[0].days
        let sring8=this.data4[this.b].holidayDetails[1].holidayHexString.split('')
        sring8.forEach(function (item,index) {
          if(sring8[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              ri=ri
            }
            let dd=(new Date().getFullYear()+1)+'-'+yue+'-'+ri
            for(let i=0;i<span.length;i++){
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
          }
        })
      },
      editdate2017(event){
        event.preventDefault();
        this.formValidate.holidayDetails.yearOfDate7=new Date().getFullYear()
        if(this.$refs.editdate7.innerHTML==''&& this.$refs.editdate8.innerHTML==''){
           this.kal=new Kalendae(this.$refs.editdate7, {
            months:0,
            mode:'multiple',
          })
          this.editShow7 = true;
          let month1=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+new Date().getFullYear() ){
            month1[0].style.display="none"
          }else{
            month1[0].style.display=""
          }
          let month2=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+new Date().getFullYear() ){
            month2[0].style.display="none"
          }else{
            month2[0].style.display=""
          }
        }else{
          this.$refs.editdate7.innerHTML='';
          this.editShow7 = false
        }
        let aaaa=new Kalendae
        let asd=self
        this.getAll()
      },
      edit2017(){
        let vm=this
        vm.a7=vm.kal.getSelected().split(',')
        vm.data4[vm.b].holidayDetails[0].holidayHexString='000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        vm.a7.forEach(function (item,index) {
          let stepIndex=(item[8]+item[9]-1)+(item[5]+item[6]-1)*32
          vm.data4[vm.b].holidayDetails[0].holidayHexString=vm.data4[vm.b].holidayDetails[0].holidayHexString.split('')
          if(vm.data4[vm.b].holidayDetails[0].holidayHexString[stepIndex]==0){
            vm.data4[vm.b].holidayDetails[0].holidayHexString.splice(stepIndex,1,'1')
          }
          vm.data4[vm.b].holidayDetails[0].holidayHexString=vm.data4[vm.b].holidayDetails[0].holidayHexString.join('')
        })
        if(vm.data4[vm.b].holidayDetails[0].holidayHexString.indexOf("1") != -1){
          vm.$refs.shezhiedit2017.innerHTML=this.$t('holiday.state1')
        }else{
          vm.$refs.shezhiedit2017.innerHTML=this.$t('holiday.state2')
        }
        this.editShow7 = false;
        this.$refs.editdate7.innerHTML='';
      },
      edit2018(){
        let vm=this
        vm.a8=vm.kal1.getSelected().split(',')
        vm.data4[vm.b].holidayDetails[1].holidayHexString='000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        var dataDate=[]
        vm.a8.forEach(function (item,index) {
          let stepIndex=(item[8]+item[9]-1)+(item[5]+item[6]-1)*32
          vm.data4[vm.b].holidayDetails[1].holidayHexString=vm.data4[vm.b].holidayDetails[1].holidayHexString.split('')
          if(vm.data4[vm.b].holidayDetails[1].holidayHexString[stepIndex]==0){
            vm.data4[vm.b].holidayDetails[1].holidayHexString.splice(stepIndex,1,'1')
          }
          vm.data4[vm.b].holidayDetails[1].holidayHexString=vm.data4[vm.b].holidayDetails[1].holidayHexString.join('')
        })
        if(vm.data4[vm.b].holidayDetails[1].holidayHexString.indexOf("1") != -1){
          vm.$refs.shezhiedit2018.innerHTML=this.$t('holiday.state1')
        }else{
          vm.$refs.shezhiedit2018.innerHTML=this.$t('holiday.state2')
        }
        this.editShow8 = false;
        this.$refs.editdate8.innerHTML='';
      },
      editdate2018(event){
        event.preventDefault();
        this.formValidate.holidayDetails.yearOfDate8=new Date().getFullYear()+1
        if(this.$refs.editdate8.innerHTML=='' && this.$refs.editdate7.innerHTML==''){
          this.kal1=new Kalendae(this.$refs.editdate8, {
            months:0,
            mode:'multiple',
            viewStartDate:"1/1/"+(new Date().getFullYear()+1),
          })
          this.editShow8 = true
          let month3=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+(new Date().getFullYear()+1) ){
            month3[0].style.display="none"
          }else{
            month3[0].style.display=""
          }
          let month4=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+(new Date().getFullYear()+1) ){
            month4[0].style.display="none"
          }else{
            month4[0].style.display=""
          }
        }else{
          this.$refs.editdate8.innerHTML='';
          this.editShow8 = false
        }
        this.getAll1()
      },
      handleSubmit (name) {
        let vm=this
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/holiday/add.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                holidaySchemeName:vm.formValidate.holidaySchemeName,
                holidayDetails:[
                  {
                    holidayHexString:vm.formValidate.holidayDetails.holidayHexString7,
                    yearOfDate:vm.formValidate.holidayDetails.yearOfDate7
                  },
                  {
                    holidayHexString:vm.formValidate.holidayDetails.holidayHexString8,
                    yearOfDate:vm.formValidate.holidayDetails.yearOfDate8
                  }
                ],
                state:vm.formValidate.state
              })
            }).then((response) => {
              vm.data41=response.body.holidayScheme
              if(response.body.code==0){
                vm.data4.unshift({
                  holidaySchemeCode:vm.data41.holidaySchemeCode,
                  holidaySchemeName:vm.data41.holidaySchemeName,
                  holidayDetails:vm.data41.holidayDetails,
                  state:vm.data41.state
                });
                vm.modal_loading = false;
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
        this.formValidate.holidaySchemeName=this.data4[index].holidaySchemeName
        this.formValidate.state=this.data4[index].state
        this.c=index
      },
      edit( index){
        this.modal3 = true;
        this.formValidate.holidaySchemeName=this.data4[index].holidaySchemeName
        this.formValidate.state=this.data4[index].state
        this.formValidate.holidaySchemeCode=this.data4[index].holidaySchemeCode
        this.b=index
      },
      show2017(event){
        event.preventDefault();
        if(this.$refs.showdate7.innerHTML==''&& this.$refs.showdate8.innerHTML==''){
          new Kalendae(this.$refs.showdate7, {
            months:0,
            mode:'multiple',
          })
          let month1=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+new Date().getFullYear() ){
            month1[0].style.display="none"
          }else{
            month1[0].style.display=""
          }
          let month2=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+new Date().getFullYear() ){
            month2[0].style.display="none"
          }else{
            month2[0].style.display=""
          }
        }else{
          this.$refs.showdate7.innerHTML='';
        }
        let sring7=this.data4[this.c].holidayDetails[0].holidayHexString.split('')
        sring7.forEach(function (item,index) {
          if(sring7[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              let ri=ri
            }
            let dd=new Date().getFullYear()+'-'+yue+'-'+ri
            let span=document.getElementsByTagName('span')
            for(let i=0;i<span.length;i++){
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
          }
        })
        this.isShow77 = !this.isShow77;
      },
      show2018(event){
        event.preventDefault();
        if(this.$refs.showdate7.innerHTML==''&& this.$refs.showdate8.innerHTML==''){
          new Kalendae(this.$refs.showdate8, {
            months:0,
            mode:'multiple',
            viewStartDate:"1/1/"+(new Date().getFullYear()+1),
          })
          let month3=document.getElementsByClassName('k-btn-previous-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="January, "+(new Date().getFullYear()+1) ){
            month3[0].style.display="none"
          }else{
            month3[0].style.display=""
          }
          let month4=document.getElementsByClassName('k-btn-next-month')
          if(document.getElementsByClassName('k-caption')[0].innerHTML=="December, "+(new Date().getFullYear()+1) ){
            month4[0].style.display="none"
          }else{
            month4[0].style.display=""
          }
        }else{
          this.$refs.showdate8.innerHTML='';
        }
        let string8=this.data4[this.c].holidayDetails[1].holidayHexString.split('')
        string8.forEach(function (item,index) {
          if(string8[index]=='1'){
            let yue=parseInt(index/32)+1
            if(yue<10){
              yue='0'+yue
            }else {
              yue=yue
            }
            let ri=index-(yue-1)*32+1
            if(ri<10){
              ri='0'+ri
            }else{
              let ri=ri
            }
            let dd=(new Date().getFullYear()+1)+'-'+yue+'-'+ri
            let span=document.getElementsByTagName('span')
            for(let i=0;i<span.length;i++){
              if(span[i].getAttribute('data-date')==dd){
                span[i].setAttribute('class','k-selected k-in-month k-active')
              }
            }
            console.log(span,'cccccccc')
          }
        })
        this.isShow88 = !this.isShow88;
      },
      update(name){
        let vm = this
        let holidaySchemeCode=vm.formValidate.holidaySchemeCode
        let holidaySchemeName=vm.formValidate.holidaySchemeName
        let state=vm.formValidate.state
        vm.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url:baseURL+'/sys/holiday/updateOne.do',
              credentials: true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                enableHolidaySchemeFlag:true,
                holidaySchemeCode:vm.formValidate.holidaySchemeCode,
                holidaySchemeName:vm.formValidate.holidaySchemeName,
                holidayDetails:[
                  {
                    holidayHexString:vm.data4[vm.b].holidayDetails[0].holidayHexString,
                    yearOfDate:vm.formValidate.holidayDetails.yearOfDate7
                  },
                  {
                    holidayHexString:vm.data4[vm.b].holidayDetails[1].holidayHexString,
                    yearOfDate:vm.formValidate.holidayDetails.yearOfDate8
                  }
                ],
                state:vm.formValidate.state
              })
            }).then((response) => {
              vm.data41=response.body.holidayScheme
              if(response.body.code==0){
                vm.data4.splice(this.b,1,{
                  holidaySchemeCode:vm.data41.holidaySchemeCode,
                  holidaySchemeName:vm.data41.holidaySchemeName,
                  holidayDetails:vm.data41.holidayDetails,
                  state:vm.data41.state
                });
                vm.modal_loading = false;
                vm.modal3 = false;
                vm.$Message.success(this.$t('common.messageSuccess'));
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
        this.a=index
      },
      okdel(){
        let vm=this
        this.$http({
          url:baseURL+'/sys/holiday/del.do',
          credentials: true,
          method: 'POST',
          async: false,
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            holidaySchemeCode:vm.data4[vm.a].holidaySchemeCode
          })
        }).then((response) => {
          if (response.body.errors){
            alert(response.body.errors)
          } else {
            vm.data4.splice(vm.a, 1);
            vm.modal4 = false;
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
          this.modal2 = false;
          this.$Message.info(this.$t('common.messageOk'))
        }, 500);
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
      this.getHoliday();
    },
    watch:{
      'modal1':function (val) {
        if(val==false){
          this.formValidate.holidaySchemeName=''
          this.formValidate.state=''
        }
      },
      'modal2':function (val) {
        if(val==false){
          this.formValidate.holidaySchemeName=''
          this.formValidate.state=''
        }
      },
      'modal3':function (val) {
        if(val==false){
          this.formValidate.holidaySchemeName=''
          this.formValidate.state=''
        }
      }
    },
  }
</script>
<style>
  @import "../../assets/css/admin/kalendae.css";
  .holiday1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .screen{
    width:66%;
    height:80%;
    background:#8a8a8a;
    opacity:0.01;
    position:absolute;
    top:20%;
    z-index:999;
  }
  .k-caption {
    top: 3px;
  }
  .time,.time th,.time .demo-table-info-row td{
    border: none!important;
  }
  .holiday1 .date {
    width: 200px!important;
  }
  .holiday1 .ivu-table .demo-table-info-row td div.ivu-table-cell{
    background-color: #eeeeee;
    color: #6b6d6e;
  }
  .holiday .ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
  }
  .holiday1 .ivu-form-item:before {
    content: none!important;
  }
  .holiday1 .ivu-select,.holiday1 .ivu-input-wrapper{
    width: 90%;
  }
  .holiday1 .ivu-modal-footer{
    padding: 10px 0 0 0;
    height: 90px;
    border-top: 1px solid #e9eaec;
  }
  .holiday1 .ivu-checkbox-group{
    width: 104px;
  }
  .holiday1 .ivu-form-item{
    width: 47%;
    display: inline-block;
  }
  .holiday1 .input-group{
    width: 80%;
  }
  .holiday1 .ivu-modal-header{
    background-color: #54b6d1;
    border-radius: 4px;
  }
  .holiday .panel-heading {
    width: 98%;
    margin-top: 20px;
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    border-top: 2px solid #2a8ba7;
    background-color: #fff;
  }
  .holiday{
    min-width:700px;
    width: 98%;
    margin-bottom: 60px;
  }
  .holiday .ivu-page{
    float:right;
    margin-top: 10px;
  }
  .holiday .tfooter>.ivu-btn-success{
    background-color: #78CD51;
    border-color: #78CD51;
    color: #FFFFFF;
    margin-top: 13px;
    margin-left: 18px;
  }
  .holiday .tfooter{
    height: 48px;
    width: 98%;
    background-color: #fff;
    border-radius: 4px;
    border-bottom:1px solid #dddee1 ;
  }
  .holiday .ivu-table,table,.ivu-table-body,.ivu-table-header,table{
    width: 100%!important;
  }
  .holiday .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .holiday .ivu-breadcrumb>span:last-child{
    color: #777;
  }
  .holiday .ivu-table:before,.ivu-table:after{
    content: none;
  }
  .holiday .ivu-breadcrumb{
    width: 98%;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .holiday .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
  .holiday .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .holiday .ivu-page-item-active{
    background-color:  #2489a6;
  }
</style>
