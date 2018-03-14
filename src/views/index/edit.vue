<template>
  <div>
    <my-header> </my-header>
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/open">open-accounts</BreadcrumbItem>
      <!--<BreadcrumbItem></BreadcrumbItem>-->
    </Breadcrumb>
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
