<template>
  <div>
    <div>
      <div class="layout-ceiling">
        <div class="layout-logo"></div>
        <div class="layout-ceiling-main">
          <a href="javascript:;">
            <Icon type="android-notifications-none"></Icon>
          </a> |
          <a href="javascript:;" style="position: relative;padding-left: 30px;">
            <div style="width:25px;height:25px;border-radius: 50%; position: absolute;left:0;top:10px;background-image:url('../static/img/4.jpg');background-size: cover"></div>
            <span>欢迎，约翰</span>
            <Icon type="ios-arrow-down"></Icon>
          </a> |
          <a href="javascript:;">
            <Icon type="android-globe"></Icon>
            <span>选择语言</span>
          </a> |
          <a href="javascript:;" @mouseenter="enter()" @mouseleave="leave()">
            <Icon type="ios-gear"></Icon>
            <section class="disview" v-show="isShow">
              <p>切换主题</p>
              <RadioGroup v-model="theme1">
                <Radio label="light"></Radio>
                <Radio label="dark"></Radio>
                <Radio label="primary"></Radio>
              </RadioGroup>
            </section>
          </a>
        </div>
      </div>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <Submenu :name=item.id v-for="item in nav" :key="item.id">
          <template slot="title">
            <Icon :type=item.icon></Icon>
            {{item.title}}
          </template>
          <router-link :to=nav2.url v-for="nav2 in item.second" :key="nav2.id2">
            <MenuItem :name=nav2.id2 >{{nav2.title}}</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        nav:
          [
            {id:1,title:"业务操作",icon:"ios-paper",second:[{id2:"1-1",title:"开户",url:"/open"}, {id2:"1-2",title:"购买(STS)",url:"/purchase"}]},
            {id:2,title:"用户管理",icon:"ios-people",second:[{id2:"2-1",title:"修改用户信息",url:"/open"}, {id2:"2-2",title:"债务管理",url:"/open"}]},
            {id:3,title:"统计分析",icon:"stats-bars",second:[{id2:"3-1",title:"交易记录",url:"/open"}, {id2:"3-2",title:"销售小计",url:"/open"}, {id2:"3-3",title:"操作日志",url:"/open"}, {id2:"3-4",title:"报警记录",url:"/open"}, {id2:"3-5",title:"统计报表",url:"/open"}]},
            {id:4,title:"表计管理",icon:"settings",second:[{id2:"4-1",title:"表计入库",url:"/meter"}, {id2:"4-2",title:"实时通信任务",url:"/open"}, {id2:"4-3",title:"工业表管理",url:"/open"}]}
          ],
        isShow:false,
        theme1:'primary',
      }
    },
    methods:{
      enter:function () {
        this.isShow = !this.isShow;
      },
      leave:function () {
        this.isShow = !this.isShow;
      }
    }
  }

</script>
<style scoped>
  .disview{
    /*height:100px;*/
    width:200px;
    background: #fff;
    border-radius: 10px 0 0 10px;
    position: absolute;
    right:0;
    top:46px;
    z-index: 200;
    padding: 12px;
    box-shadow: 0 0 1px 1px #ccc;
  }
  .layout-logo{
    width: 100px;
    height: 35px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 4px;
    left: 40px;
    background-image:url('../../assets/img/logo.png');
    background-size: cover;
  }
  .layout-ceiling{
    overflow: hidden;
    line-height: 46px;
    background: #f5f7f9;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
    font-size: 18px;
  }
  .layout-ceiling-main > a{
    color: #9ba7b5;
    display: inline-block;
    width:auto;
    padding:0 5px;
    height:46px;
  }
  .layout-ceiling-main > a span{
    font-size: 12px;
  }
  .ivu-menu-primary{
    padding:0 35px;
  }
</style>
