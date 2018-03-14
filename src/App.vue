<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  html,body{
    border-right: none;
  }
  body{
    height: 100%!important;

  }
  th{
    text-align: center!important
  }
  .ivu-table-cell{
    padding: 0;
    word-break: normal;
    text-align: center;
    /*word-wrap:break-word*/
  }
  .ivu-modal{
    left:500px;
    top: 200px;
    margin: 0;
  }
  @font-face{
    font-family:layui-icon;
    src:url(assets/fonts/font/iconfont.eot?v=1.0.9);
    src:url(assets/fonts/font/iconfont.eot?v=1.0.9#iefix) format('embedded-opentype'),
    url(assets/fonts/font/iconfont.svg?v=1.0.9#iconfont) format('svg'),
    url(assets/fonts/font/iconfont.woff?v=1.0.9) format('woff'),
    url(assets/fonts/font/iconfont.ttf?v=1.0.9) format('truetype')
  }
  .layui-icon{
    font-family:layui-icon!important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale
  }

</style>
