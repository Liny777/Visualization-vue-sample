<template>
    <div class="container">
      <el-container>
        <el-header>
          <el-row type="flex" justify="space-around">
            <el-col :span="8">
              <el-row>
                <el-col :span="2">
                  <div class="el-icon-menu"></div>
                </el-col>
                <el-col :span="22">
                  <div class="system_name">
                    专业医学知识图谱服务平台
                  </div>
                  <div class="friends">
                    北京邮电大学PCN&CAD | 首都医科大学附属北京安贞医院
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <div>
                <el-menu router :default-active="$router.currentRoute.path" class="el-menu-demo" mode="horizontal"
                background-color=rgba(0,0,0,0) text-color="gray" active-text-color="#ffd04b"
                >
                  <el-menu-item index="/home/intro">首页</el-menu-item>
                  <el-menu-item index="/home/showgraph">示例图谱展示</el-menu-item>
                  <el-menu-item index="/home/statistic">数据统计</el-menu-item>
                  <el-menu-item index="/home/aboutus">关于我们</el-menu-item>
                </el-menu>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button @click="Login">登录/注册</el-button>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-carousel trigger="click" height="450px">
            <el-carousel-item>
              <el-image :fit="fit" class="photo" :src="homephoto"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image :fit="fit" class="photo" :src="homephoto"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image :fit="fit" class="photo" :src="homephoto"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image :fit="fit" class="photo" :src="homephoto"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-main>
        <!-- <el-button @click="checkUrl">默认按钮</el-button> -->
      </el-container>
    </div>
  </template>
  <script>
  import homephoto from '@/assets/Home/home.jpg'
  export default {
    name: 'HomeTopBar',
    data() {
      return {
        activeIndex: "/home/index",
        homephoto: homephoto + '?' + +new Date(),
      }
    },
    watch: {
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      // checkUrl(){
      //   let path = this.$router.path
      //   console.log(path)
      // }
      Login(){
        //点击跳转至上次浏览页面
        // this.$router.go(-1)

        //指定跳转地址
        this.$router.replace('/login')
      }
    }
  }
  </script>
  <style scoped>
  .el-container {
    height: min-content;
  }
  .el-header {
    /* background-color: #B3C0D1; */
    color: white;
    text-align: center;
    line-height: 60px;
    padding-left: 0%;
    padding-right: 0%;
    z-index: 2;
    border-bottom: gray 1px solid;
  }
  .el-main{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0%;
    /* position: relative;
    top:-60px; */
    transform:translate(0px,-60px);
    z-index: 1;
  }
  .photo{
    padding: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .grid-content{
    text-align: center;
  }
  .el-menu{
    display: inline-block;
    border-bottom: gray 0px solid;
  }
  .el-col{
    padding: 0%;
    margin: 0%;
  }
  .system_name{
    text-align: left;
    font-size: 20px;
    height: 40px;
    line-height:45px;
  }
  .friends{
    font-size: 8px;
    text-align: left;
    height: 20px;
    line-height:15px;
  }
  .el-menu-item:hover {
    background-color: rgb(3, 19, 33, 0.5) !important;
  }
  /* .el-image{
    height: 500px;
  } */
  </style>
