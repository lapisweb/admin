<template>

</template>

<script>
  export default {
    name: 'checkTree',
    components:{

    },
    data:function(){
      return{
        setting:{
          check: {
            enable: true,
            nocheckInherit: false
          },
          data: {
            simpleData: {
              enable: true
            }
          }
        },
        zNodes:[

//          { id:1,name:"大良造菜单",open:true,nocheck:false,
//            children: [
//              { id:11,pid:1,name:"当前项目"},
//              { id:12,pid:1,name:"工程管理",open:true,
//                children: [
//                  { id:121,pid:12,name:"我的工程"},
//                  { id:122,pid:12,name:"施工调度"},
//                  { id:1211,pid:12,name:"材料竞价"}
//                ]
//              },
//              { id:13,pid:1,name:"录入管理",open:true,
//                children: [
//                  { id:131,pid:13,name:"用工录入"},
//                  { id:132,pid:13,name:"商家录入"},
//                  { id:1314,pid:13,name:"机构列表"}
//                ]
//              },
//              { id:14,pid:1,name:"审核管理",open:true,
//                children: [
//                  { id:141,pid:14,name:"用工审核"},
//                  { id:142,pid:14,name:"商家审核"},
//                  { id:145,pid:14,name:"机构审核"}
//                ]
//              },
//              { id:15,pid:1,name:"公司管理",open:true,
//                children: [
//                  { id:1517,pid:15,name:"我的工程案例"},
//                  { id:1518,pid:15,name:"联系人设置"},
//                  { id:1519,pid:15,name:"广告设置"}
//                ]
//              },
//              { id:16,pid:1,name:"业务管理",open:true,
//                children: [
//                  { id:164,pid:16,name:"合同范本"},
//                  { id:165,pid:16,name:"合同列表"},
//                  { id:166,pid:16,name:"需求调度"}
//                ]
//              },
//              { id:17,pid:1,name:"订单管理",open:true,
//                children: [
//                  { id:171,pid:17,name:"商品订单"},
//                  { id:172,pid:17,name:"用工订单"},
//                  { id:175,pid:17,name:"供应菜单"}
//                ]
//              },
//              { id:18,pid:1,name:"我的功能",open:true,
//                children: [
//                  { id:181,pid:18,name:"免费设计"},
//                  { id:182,pid:18,name:"装修报价"},
//                  { id:1817,pid:18,name:"项目用工"}
//                ]
//              },
//              { id:19,pid:1,name:"分润管理",open:true,
//                children: [
//                  { id:191,pid:19,name:"分润列表"}
//                ]
//              },
//              { id:110,pid:1,name:"运营管理",open:true,
//                children: [
//                  { id:1101,pid:110,name:"代理列表"},
//                  { id:1102,pid:110,name:"代售商品"}
//                ]
//              },
//            ]
//          }
        ]
      }
    },
    methods:{
      getMenus(event){
//        console.log(this.zNodes,'vm.zNodes')
        let vm=this;
        this.$http({
          url:'http://api.laison.com:8080/getMyAllMenu.do',
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
            alert(response.body.errors)
          } else {
//            alert(response.body.msg,'2222')
            if (response.body.code == 0){
//              vm.data6=response.body.list
              console.log(response.body.menu,'response.body.list')
              let data3={}
              data3=response.body.menu
//              vm.data3.value=vm.data3.id
              data3.id=Number(data3.id)
              data3.nocheck=false
              data3.open=true
              data3.children=data3.childMenus
              data3.children.forEach(function (val,index) {
                val.id=Number(val.id)
                val.pid=Number(val.parentId)
//                val.title=val.name
                val.children=val.childMenus
                val.children.forEach(function (val1,index1) {
                  val1.id=Number(val1.id)
                  val1.pid=Number(val1.parentId)
//                  val1.title=val1.name
                  val1.children=val1.childMenus
                  val1.children.forEach(function (val2,index2) {
                    val2.id=Number(val2.id)
                    val2.pid=Number(val2.parentId)
//                    val2.title=val2.name
                    val2.children=val2.childMenus
                    val2.children.forEach(function (val3,index3) {
                      val3.id=Number(val3.id)
                      val3.pid=Number(val3.parentId)
//                      val3.title=val3.name
                      val3.children=val3.childMenus
                    })
                  })
                })
//                delete val.childMenus
//                delete val.orderNum
//                delete val.parentId
//                delete val.paths
//                delete val.perms
//                delete val.state
//                delete val.type
                return vm.data3
              })
//              delete data3.childMenus
//              delete data3.state

              console.log(data3,'data3')
              vm.zNodes.push(data3)
              $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);

//              console.log(vm.zNodes,'vm.zNodes')
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
    },

    mounted(){
      console.log(this.zNodes,'zNodes')
    },
    created: function(){
//      this.getOperator();
      this.getMenus()
    },
  }
</script>
<style>

</style>
