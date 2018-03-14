<template>
  <div style="margin-left: 270px">
    <div class="index">
      <!--<form action="<%=basePath%>UploadImage" method="post" id="uploadForm" enctype="multipart/form-data">-->
        <!--<input type="hidden" name="picture" value="uploadpic">-->
        <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">-->
          <!--<tr>-->
            <!--<td width="18%" background="<%=basePath%>tab/images/bg.gif" bgcolor="#FFFFFF"><div align="center"><span class="STYLE1">上传照片</span></div></td>-->
            <!--<td bgcolor="#FFFFFF">-->
              <!--<input type="file" id="pic" name="pic" />-->
              <!--<input type="button" value="上传" @click="doUpload()">-->
            <!--</td>-->
          <!--</tr>-->
        <!--</table>-->
      <!--</form>-->
      <div class="pull-left1">
        <h3><strong>{{userList.loginName}}</strong></h3>
        <p> {{ $t('index.header') }}!</p>
      </div>
      <!--<input type="file"  @change="Files"/>-->
      <!--<div class='finish_room'>-->
        <!--<div class='finish_room2'>-->
          <!--<div v-for='(item ,index ) in imgs' class='room_img'>-->
            <!--<img :src="item">-->
          <!--</div>-->
          <!--<div class='room_add_btn'>-->
            <!--<span>上传图片</span>-->
            <!--<input @change='add_img'  type="file">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="demo-upload-list" v-for="item in uploadList">-->
        <!--<template v-if="item.status === 'finished'">-->
          <!--<img :src="item.url">-->
          <!--<div class="demo-upload-list-cover">-->
            <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
            <!--<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>-->
          <!--</div>-->
        <!--</template>-->
        <!--<template v-else>-->
          <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
        <!--</template>-->
      <!--</div>-->
      <!--<Upload-->
        <!--ref="upload"-->
        <!--:show-upload-list="false"-->
        <!--:default-file-list="defaultList"-->
        <!--:on-success="handleSuccess"-->
        <!--:format="['jpg','jpeg','png']"-->
        <!--:max-size="2048"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:on-exceeded-size="handleMaxSize"-->
        <!--:before-upload="handleBeforeUpload"-->
        <!--multiple-->
        <!--type="drag"-->
        <!--action="http://api.laison.com:8080/fileUpload.do"-->
        <!--style="display: inline-block;width:58px;">-->
        <!--<div style="width: 58px;height:58px;line-height: 58px;">-->
          <!--<Icon type="camera" size="20"></Icon>-->
        <!--</div>-->
      <!--</Upload>-->
      <!--<Modal title="View Image" v-model="visible">-->
        <!--<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">-->
      <!--</Modal>-->
      <!--<div class="center">-->
        <!--<img class="pre-img" :src="src" alt="">-->
        <!--<vue-core-image-upload-->
          <!--class="btn btn-primary"-->
          <!--:crop="true"-->
          <!--@imagechanged="imagechanged"-->
          <!--@imageuploaded="imageuploaded"-->
          <!--:data="data"-->
          <!--:max-file-size="5242880"-->
          <!--url="http://api.laison.com:8080/fileUpload.do" >-->
        <!--</vue-core-image-upload>-->
      <!--</div>-->
      <div class="row">
        <div class="col-lg-12">
          <div class="panel">
            <div class="panel-body">
              <div class="media usr-info">
                <a href="#" class="pull-left">
                  <img class="thumb" src="../../assets/img/admin/face-2.jpg" alt="">
                </a>
                <div class="media-body">
                  <h4 class="media-heading"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  </font></font></h4>
                  <span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                       {{userList.loginName}}
                      </font></font></span>
                  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                    {{userList.remarks}}
                  </font></font></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import VueCoreImageUpload from 'vue-core-image-upload/src/vue-core-image-upload.vue'
//  function jsReadFiles(files) {
//    console.log(files,'files')
////        if (files.length) {
////          var file = files[0];
////          var reader = new FileReader();//new一个FileReader实例
////          console.log(reader,'files')
////          if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
////            reader.onload = function() {
////              $('body').append('<pre>' + this.result + '</pre>');
////            }
////            reader.readAsText(file,"UTF-8");
////          } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
////            reader.onload = function() {
////              $('body').append('<img src="' + this.result + '"/>');
////            }
////            reader.readAsDataURL(file);
////          }
////          console.log(reader,'files')
////        }
//  }
  export default {
//    components: {
//      VueCoreImageUpload
//    },
    data() {
      return {
        files:'',
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        defaultList: [],
        imgs:[],
        imgName: '',
        visible: false,
        uploadList: [],
        value1:1,
        value:1,
        letname:'',
        menuList:{},
        userList:{},
        model10: [],
        buttonProps: {
          type: 'ghost',
          size: 'small',
        }
      }
    },
    props:{},
    methods: {
      Files(e) {
        console.log(e.target.files,'files')
        const files=e.target.files
        if (files.length) {
          var file = files[0];
          var reader = new FileReader();//new一个FileReader实例
          console.log(reader,'files')
          if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function() {
              $('body').append('<pre>' + this.result + '</pre>');
            }
            reader.readAsText(file,"UTF-8");
          } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
            reader.onload = function() {
              $('body').append('<img src="' + this.result + '"/>');
            }
            reader.readAsDataURL(file);
          }
          console.log(reader,'files')
        }
      },
      imagechanged(data){
        console.log(data,'data')
      },
      imageuploaded(res) {
        console.log(res,'res')
        if (res.code == 0) {
//          this.src = res.data.src;
        }
      },
//      add_img(event){
//        var reader =new FileReader();
//        var img1=event.target.files[0];
//        reader.readAsDataURL(img1);
//        var that=this;
//        reader.onloadend=function(){
//          that.imgs.push(reader.result)
//        }
//      },
//      doUpload() {
//        var formData = new FormData($( "#uploadForm" )[0])
//        $.ajax({
//          url: 'http://api.laison.com:8080/fileUpload.do' ,  /*这是处理文件上传的servlet*/
//          type: 'POST',
//          data: formData,
//          async: false,
//          cache: false,
//          contentType: false,
//          processData: false,
//          success: function (returndata) {
//            document.getElementById("showpic").src="<%=basePath%>UploadImage?picture=showpic";/*这是预览图片用的，自己在文件上传表单外添加*/
//          },
//          error: function (returndata) {
//            alert(returndata);
//          }
//        })
//      },
//
//      handleBeforeUpload(file) {
//        // 创建一个 FileReader 对象
//        let reader = new FileReader()
//        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
//        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
//        // 读取文件作为 URL 可访问地址
//        reader.readAsDataURL(file)
//
//        const _this = this
//        reader.onloadend = function (e) {
//          file.url = reader.result
//          _this.uploadList.push(file)
//        }
//      },
//      handleRemove(file) {
//        this.uploadList.splice(this.uploadList.indexOf(file), 1)
//      },
//      handleFormatError(file) {
//        this.$Notice.warning({
//          title: '文件格式不正确',
//          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
//        })
//      },
//      handleMaxSize(file) {
//        this.$Notice.warning({
//          title: '超出文件大小限制',
//          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
//        })
//      },
      getMenuList (event) {
        let vm=this;
        this.$http({
          url:baseURL+'/getMyManageMenu.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
          })
        }).then((response) => {
          if (response.body.errors){
            parent.location.href ='./#/';
          } else {
            if (response.body.code == 0){
              vm.menuList=response.body.menu.childMenus
              vm.menuList.forEach(function (val,index) {
                if(val.id=='0d716afe8e7045dfb0f0491fd2bd5340'){
                  vm.letname=val.name
                }
              })
              let by = function(name){
                return function(o, p){
                  var a, b;
                  if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                      return 0;
                    }
                    if (typeof a === typeof b) {
                      return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                  }
                  else {
                    throw ("error");
                  }
                }
              }
              vm.menuList.sort(by("orderNum"));
              vm.menuList.forEach(function (val,index) {
                val.childMenus.sort(by("orderNum"))
              })
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
      getLoginUser(event) {
        let vm = this;
        this.$http({
          url: baseURL+'/getLoginUser.do',
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }).then((response) => {
          if (response.body.errors) {
          } else {
            if (response.body.code == 0) {
              vm.userList = response.body.user;
            }
          }
        })
          .catch(function (response) {
            console.log(response)
          })
      },
//      format (labels, selectedData) {
//        const index = labels.length - 1
//        const data = selectedData[index] || false
//        return labels[index]
//      },
//      renderContent (h, { root, node, data }) {
//        return h('span', {
//          style: {
//            display: 'inline-block',
//            width: '100%'
//          }
//        }, [
//          h('span', [
//            h('Icon', {
//              props: {
//                type: 'ios-paper-outline'
//              },
//              style: {
//                marginRight: '8px'
//              }
//            }),
//            h('span', data.title)
//          ]),
//          h('span', {
//            style: {
//              display: 'inline-block',
//              float: 'right',
//              marginRight: '32px'
//            }
//          }, [
//            h('Button', {
//              props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
//              }),
//              style: {
//                marginRight: '8px'
//              },
//              on: {
//                click: () => {
//                  this.data1=data;
//                  this.update(data)
//                }
//              }
//            }),
//            h('Button', {
//              props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-minus-empty'
//              }),
//              on: {
//                click: () => { this.remove(root, node, data) }
//              }
//            })
//          ])
//        ]);
//      },
//      update(data){
//        this.$set(this.data1, 'title', 'aaaaa');
//      },
//      append (data) {
//        const children = data.children || [];
//        children.push({
//          title: 'appended node',
//          expand: true
//        });
//        this.$set(data, 'children', children);
//      },
//      remove (root, node, data) {
//        const parentKey = root.find(el => el === node).parent;
//        const parent = root.find(el => el.nodeKey === parentKey).node;
//        const index = parent.children.indexOf(data);
//        parent.children.splice(index, 1);
//      }
    },
    mounted () {
//      this.uploadList = this.$refs.upload.fileList
    },
    created: function(){
      this.getLoginUser();
      this.getMenuList();
    },
  }
</script>
<style>
  .index1 .ivu-modal .ivu-select-dropdown{
    position: fixed!important;
  }
  .index .row{
    width: 98%;
  }
  .index .pull-left1{
    width: 90%;
    margin-left:10%;
  }
  body{
    background: #e5e6e6!important;
  }
  .ivu-breadcrumb-item-separator{
    color: #87787e!important;
  }
  .index{
    width: 91%;
    margin-bottom: 60px;
  }
  .index .ivu-breadcrumb{
    width: 80%!important;
    padding: 8px 15px;
    margin-top: -38px!important;
    margin-left: 0px!important;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .index .ivu-table-wrapper{
    width: 98%;
    position: static;
    border-left:none;
    border-right: none;
    border-top:1px solid #dddee1 ;
  }
  .ivu-breadcrumb{
    width: 98%;
    min-width:700px!important;
    padding: 8px 15px;
    margin-top: 80px;
    background-color: #c9cccf;
    border-radius: 4px;
  }
  .index .wrap div{
    width: 300px;
    height: 300px;
    background-color: #0cc;
  }
  .index .ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
  }
</style>
