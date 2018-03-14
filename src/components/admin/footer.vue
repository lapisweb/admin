<template>
  <div class="footer">
    <footer class="site-footer">
      <div class="text-center">
        {{date}} &copy; LAISONTECH.
        <a href="#" class="go-top">
          <i class="fa fa-angle-up"></i>
        </a>
      </div>
    </footer>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {
        date: new Date().getFullYear()
      }
    },
  }
</script>
<style>
  @import "../../assets/css/admin/style.css";
  .footer{
    width: calc(100% - 240px);
    position: fixed;
    margin-left: 240px;
    bottom: -20px;
    padding: 0;

  }
  .site-footer {
    background: #5b6e84;
    color: #fff;
    padding: 10px 0;
  }

  .site-footer a {
    color: #72d0eb;
  }

  .site-footer a:hover {
    color: #4dadc8;
  }

  .go-top {
    margin-right: 1%;
    float: right;
    background: rgba(127,221,248,.5);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  .go-top i {
    color: #2A3542;
  }

  .site-min-height {
    min-height: 900px;
  }
</style>
