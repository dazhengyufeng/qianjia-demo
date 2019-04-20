<template>
  <div class="header">
  <el-container>
    <el-header>
      <div class="header-main">
        <div class="header-main-left">
          <img src="../assets/logo.jpg" alt="">
          <span>千家MIS |</span>
          <span>至哲篇</span>
        </div>
        <div class="header-main-right">
          <div class="messageLogo">
            <img src="../assets/messageLogo.png" alt="">
            <div class="message-number">99</div>
          </div>
          <div class="documentLogo">
            <img src="../assets/documentLogo.png" alt="">
            <div class="document-number">99</div>
          </div>
          <img src="../assets/userLogo.png" alt="">
          <div class="line"></div>
        </div>
      </div>
      <div class="clone">
        <img src="../assets/clone.png" alt="">
      </div>
    </el-header>
  </el-container>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    background-color: white
  }
  .el-header{
    padding: 0;
    height: 55px!important;
    display: flex;
    margin: auto;
  }
  .header-main{
    display: flex;
    justify-content: space-between;
    width: 1840px;
    height: 100%;
  }
  .header-main-left{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header-main-left img{
    display: block;
    width: 25px;
    height:25px;
  }
  .header-main-right{
    width: 240px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header-main-right img{
    display: block;
    width:22px;
    height: 23px;
  }
  .messageLogo{
    position: relative;
    margin-right: 25px;
  }
  .message-number{
    position: absolute;
    width: 25px;
    height: 15px;
    top: -6px;
    font-size: 5px;
    right: -14px;
    background-color: red;
    color: white;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
  }
  .documentLogo{
    position: relative;
    margin-right: 25px;
  }
  .document-number{
    position: absolute;
    width: 25px;
    height: 15px;
    top: -6px;
    font-size: 5px;
    right: -14px;
    background-color:orange;
    color: white;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
  }
  .line{
    width: 18px;
    height: 2px;
    background-color: darkgray;
    margin-left: 58px;
  }
  .clone{
    display: flex;
    align-items: center
  }
  .clone img{
    display: block;
    width: 15px;
    height: 15px;
  }
</style>
