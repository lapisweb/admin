// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
// import store from './vuex/store'


import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
// import zhLocale from 'iview/dist/locale/zh-CN';
// import enLocale from 'iview/dist/locale/en-US';
// import './assets/theme/index.less';
import ggheader from './components/index/index.vue'
import header from './components/admin/header.vue'
import nav from './components/admin/nav.vue'
import footer from './components/admin/footer.vue'
import date from './components/admin/date.vue'
import ztree from './components/admin/zTree.vue'

import $ from 'jquery'
import '../pulgins/jquery-3.2.1'
import '../pulgins/ztree/js/jquery.ztree.core.min'
import '../pulgins/ztree/js/jquery.ztree.excheck.min'

Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(iView);
Vue.use(VueRouter);
Vue.http.options.xhr = { withCredentials: true }


const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';
Vue.config.lang = lang;
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//
//   if (to.meta.requireAuth) {
//
//     // console.log(respond,'res')
//     if(true) {
//       next();
//     }
//     else {
//       next({
//         path: './',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next();
//   }
// })
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
function deleteEmptyProp(json){
  for (var item in json) {
    if( typeof json[item] === "object"){
      console.log(typeof json[item],'1typeof json[item]')
      if(json[item]===null){
        delete json[item];
      }else{
        deleteEmptyProp(json[item])
      }

    }else{
      // console.log(typeof json[item],'3typeof json[item]')
      if(typeof json[item] === 'string'){
        // console.log(json[item],'3typeof json[item]')
        if(json[item]===''){

          delete json[item];
        }
      }
    }
  }
}

Vue.http.interceptors.push((request, next) => {
  let _move=false;//移动标记
  let _x,_y;//鼠标离控件左上角的相对位置
  $(function(){
    $(".ivu-modal-header").mousedown(function(e){
      _move=true;
      _x=e.pageX-parseInt($(".ivu-modal").css("left"));
      // console.log($(".ivu-modal").css("left"),'_x');
      _y=e.pageY-parseInt($(".ivu-modal").css("top"));
      // $(".ivu-modal-header").fadeTo(20, 0.25);//点击后开始拖动并透明显示
    });
    $(document).mousemove(function(e){
      if(_move){
        let x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
        let y=e.pageY-_y;
        // console.log(x,'x')
        // console.log(y,'y')
        // 进行范围的判断
              if(x < 0){
                x = 0;
              }else if(x <= $(document).scrollLeft()){
                // console.log('1111111')
                x = $(document).scrollLeft();
              }
              else if(x > $(window).width() + $(document).scrollLeft() - parseInt($(".ivu-modal").css("width"))){
                console.log('2222')
                x = $(window).width() + $(document).scrollLeft() - parseInt($(".ivu-modal").css("width"));
              }
              // console.log(y,'top')
              // console.log($(document).scrollTop(),'$(document).scrollTop()')
              // console.log($(window).height(),'$(window).height()')
              // console.log($(".ivu-modal").clientWidth,'$(.ivu-modal).Height()')
              // console.log($('.ivu-modal'),'$(.ivu-modal)')
              if(y < 70){
                y = 70;
              }else if(y <= $(document).scrollTop()){
                // console.log('3333333')
                y = $(document).scrollTop();
              }
              // else if(y > $(window).height() +$(document).scrollTop()  - $('.ivu-modal').innerHeight()){
              //   console.log('444444444444')
              //   y = $(window).height() +$(document).scrollTop() - $('.ivu-modal').innerHeight();
              // }
// console.log($(".ivu-modal"),'$(".ivu-modal")')
        $(".ivu-modal").css({top:y,left:x});//控件新位置
      }
    }).mouseup(function(){
      _move=false;
      // $(".ivu-modal-header").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
  });
  // function center(){
  //   var width = ($(window).width() - $('.ivu-modal').width())/2 + $(document).scrollLeft();
  //   var height = ($(window).height() - $('.ivu-modal').height())/2 + $(document).scrollTop();
  //   $('.ivu-modal').css('left',width);
  //   $('.ivu-modal').css('top',height);
  // };
  // let top = 0
  // let left = 0
  // $(function () {
  //   $('.ivu-modal-header').mousedown(function(e){
  //     //alert($('#login h2').offset().left);
  //     //alert($('#login').offset().left);
  //     // let _this = $('.ivu-modal');//有时候使用文档对象，有时候使用#login，所以这时候将它统一了,都是#login。
  //     let diffx = e.clientX - $('.ivu-modal').offset().left;
  //     let diffy = e.clientY - $('.ivu-modal').offset().top;
  //     // console.log(diffx,'left')
  //     // console.log(e.clientX,'top')
  //     // console.log(diffx,'diffx')
  //     $(document).mousemove(function(e){
  //       //无论鼠标的位置在H2的哪个位置上，我们都获取到H2左上角到整个视图的偏移量
  //       let left = e.clientX - diffx;
  //       let top = e.clientY - diffy;
  //
  //       //进行范围的判断
  //       if(left < 0){
  //         left = 0;
  //       }else if(left <= $(document).scrollLeft()){
  //         console.log('1111111')
  //         left = $(document).scrollLeft();
  //       }else if(left > $(window).width() + $(document).scrollLeft() - $('.ivu-modal').innerWidth()){
  //         console.log('2222')
  //         left = $(window).width() + $(document).scrollLeft() - $('.ivu-modal').innerWidth();
  //       }
  //       console.log(top,'top')
  //       console.log($(document).scrollTop(),'$(document).scrollTop()')
  //       console.log($(window).height(),'$(window).height()')
  //       console.log($('.ivu-modal').height(),'$(.ivu-modal).Height()')
  //       console.log($('.ivu-modal'),'$(.ivu-modal)')
  //       if(top < 70){
  //         top = 70;
  //       }else if(top <= $(document).scrollTop()){
  //         console.log('3333333')
  //         top = $(document).scrollTop();
  //       }else if(top > $(window).height() +$(document).scrollTop()  - $('.ivu-modal').innerHeight()){
  //         console.log('444444444444')
  //         top = $(window).height() +$(document).scrollTop() - $('.ivu-modal').innerHeight();
  //       }
  //
  //       //鼠标开始移动的时候，我们的视图也开始移动
  //       $('.ivu-modal').css('left',left);
  //       $('.ivu-modal').css('top',top);
  //
  //     });
  //
  //
  //
  //
  //
  //   })
  //   $(document).mouseup(function(){
  //     $(document).unbind('mousemove');
  //   })
  // })


//   var _move=false;//移动标记
//   var _x,_y;//鼠标离控件左上角的相对位置
//   var top = 0;
//   var left = 0;
//   $(function(){
//     // console.log('qqqqqqqqqqqqq');
//     $(".ivu-modal-header").mousedown(function(e){
//       console.log(e,'aaaaaaaaaaa')
//       _move=true;
//       //  _x = e.clientX - $(".ivu-modal").offset().left;
//       //  _y = e.clientY - $(".ivu-modal").offset().top;
//       // console.log(_x,'ssss')
//       _x=e.pageX-$(".ivu-modal").css("left");
//       _y=e.pageY-$(".ivu-modal").css("top");
// //      $(".ivu-modal").fadeTo(20, 0.25);//点击后开始拖动并透明显示
// //      $("p").slideToggle();
//     });
//     $(".ivu-modal-header").mousemove(function(e){
// //      console.log('ssssssssssssssss')
//       if(_move){
//          left = e.pageX - _x
//          top = e.pageY - _y
//         // var x=e.clientX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
//         // var y=e.clientX-_y;
//         // var left = e.clientX - x;
//         // var top = e.clientY - y;
//         // console.log(e.pageX,'xxxxxxxxxxx');
//         console.log(left,'yyyyyyyyy');
//         // if(left < 0){
//         //   left = 0;
//         // }else if(left <= $(document).scrollLeft()){
//         //   left = $(document).scrollLeft();
//         // }else if(left > $(window).width() + $(document).scrollLeft() - _this.innerWidth()){
//         //   left = $(window).width() + $(document).scrollLeft() - _this.innerWidth();
//         // }
//         // if(top < 0){
//         //   top = 0;
//         // }else if(top <= $(document).scrollTop()){
//         //   top = $(document).scrollTop();
//         // }else if(top > $(window).height() + $(document).scrollTop() - _this.innerHeight()){
//         //   top = $(window).height() + $(document).scrollTop() - _this.innerHeight()
//         // }
//         $(".ivu-modal").css({top:top,left:left});//控件新位置
//       }
//     }).mouseup(function(){
//       _move=false;
// //      $(".ivu-modal").fadeTo("fast", 1)//松开鼠标后停止移动并恢复成不透明
//     });
//   });
  // modify request
  // console.log(request,'request')
  request.method = 'POST';//在请求之前可以进行一些预处理和配置
  deleteEmptyProp(request.body);
  next((response) => {
    // if(!response.body.user){
    //   console.log(response.body)
    //   // req.session.isLogin = true;
    //   // next()
    //   router.push({ path: '/admin'})
    // }else{
    //   return alert('已经登录')
    // }
    // console.log(response.body);
    // function checklogin(response) {
    //   if(response.body.user){
    //     // response.flash('error','已登录');
    //     router.push({ path: '/admin/management/index'})
    //   }
    // }

    let Token=response.body.code
    // let user=response.body.user
    // //在响应之后传给then之前对response进行修改和逻辑判断。
    // // 对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    if(Token==501){
      router.push({ name: 'login'})
    }
    return response
  });
});
// const router = {
//   mode: 'history',
//   base: __dirname ,
//   routes:routerfig,
//   scrollBehavior(to,from,savedPosition){
//     if(savedPosition){
//       return savedPosition;
//     }else{
//       return {x: 0,y: 0}
//     }
//   }
// }
//
// router.beforeEach((to,from,next) => {
//   if(to.matched.some( m => m.meta.auth)){
//     // 对路由进行验证
//     if(store.getters.authorizd) { // 已经登陆
//       next()
//     }else{
//       // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
//       next({path:'/login',query:{ referrer: to.fullPath} })
//     }
//   }else{
//     next()
//   }
// })

// function isEmptyObject(obj) {
//   for (var key in obj) {
//     return false;
//   }
//   return true;
// }

//
// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => !record.meta.auth)) {
//     // 这个路由需要auth,检验是否登录了.
//
//     let isLogin = auth.checkAuth()
//     // console.log('need login', isLogin);
//     if(!isLogin){
//
//       // 没有登录,重定向到登录页面
//
//       console.error('Place login!')
//       next({
//         path: '/admin',
//         query: { redirect: to.fullPath }
//       })
//     }else{
//       next()
//     }
//   }else{
//     next()
//   }
// })

// const messages = {
//   en: zhLocale,
//   ja: enLocale
// }
//
// const i18n = new VueI18n({
//   locale: 'en', // set locale
//   messages, // set locale messages
// })
Vue.component('my-header',ggheader);
Vue.component('admin-header',header);
Vue.component('admin-nav',nav);
Vue.component('admin-footer',footer)
Vue.component('admin-date',date)
Vue.component('admin-ztree',ztree)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
