<template>
  <div>
    <my-header> </my-header>
    <!--<p>{{ $t("i.datepicker.month6") }}</p>-->
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem href="#">首页</BreadcrumbItem>
        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
        <BreadcrumbItem>某应用</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Steps :current="0">
      <Step title="已完成" content="选择用户类型"></Step>
      <Step title="进行中" content="填写基本信息"></Step>
      <Step title="待进行" content="附加费信息"></Step>
      <Step title="待进行" content="债务信息"></Step>
      <Step title="待进行" content="表号"></Step>
    </Steps>
  </div>
</template>
<script>
  export default {

  }
</script>
<style>
  .layout-breadcrumb{
    padding: 10px 15px 0;
    margin: -15px 0 10px;
  }
</style>
