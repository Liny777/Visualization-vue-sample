/ *

 * 知识图谱总览功能的主界面

* 父组件

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <el-container class="body">
    <el-header>
      <!-- // ---------------------------------- 实体查询 下 -->
      <el-row v-if="show1" type="flex">
        <el-col :span="7">
          <span class="text">知识图谱总览</span>
        </el-col>
        <el-col :span="14" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">知识图谱总览</el-dropdown-item>
              <el-dropdown-item command="2">疾病可视化</el-dropdown-item>
              <el-dropdown-item command="3">药品可视化</el-dropdown-item>
              <el-dropdown-item command="4">疾病治疗方案查询</el-dropdown-item>
              <el-dropdown-item command="5">药品相互作用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 实体查询2 下 -->
      <el-row v-if="show2" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="11" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">知识图谱总览</el-dropdown-item>
              <el-dropdown-item command="2">疾病可视化</el-dropdown-item>
              <el-dropdown-item command="3">药品可视化</el-dropdown-item>
              <el-dropdown-item command="4">疾病治疗方案查询</el-dropdown-item>
              <el-dropdown-item command="5">药品相互作用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 实体查询3 下 -->
      <el-row v-if="show2" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="11" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">知识图谱总览</el-dropdown-item>
              <el-dropdown-item command="2">疾病可视化</el-dropdown-item>
              <el-dropdown-item command="3">药品可视化</el-dropdown-item>
              <el-dropdown-item command="4">疾病治疗方案查询</el-dropdown-item>
              <el-dropdown-item command="5">药品相互作用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <!-- // -------------------------------------- 主体-->
    <el-row style="height:20px" />
    <el-container>
      <el-aside width="400px" class="mainpage-aside">
        <div class="headerup">
          <div v-if="show1">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect1"
            >
              <el-row :gutter="24">
                <el-col :span="6" :offset="4">
                  <el-menu-item class="elmenu1" index="1">实体</el-menu-item>
                </el-col>
                <el-col :span="6" :offset="3">
                  <el-menu-item class="elmenu1" index="2">关系</el-menu-item>
                </el-col>
              </el-row>
            </el-menu>
          </div>
        </div>
        <div class="footerdown">
          <!-- // -------------------------------------- 路径-->
          <div v-if="show1">
            <!-- <div v-show="small_show1" class="item1"> -->
              <div v-show="overview_small_show1" class="item1">
              <search-node-component :catedata="category" />
            </div>
            <!-- <div v-show="small_show2" class="item2"> -->
              <div v-show="overview_small_show2" class="item2">
              <search-relation-component />
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div v-if="show1">
          <!-- <div v-show="small_show1"> -->
            <div v-show="overview_small_show1">
            <el-row>
              <el-col :span="24">
                <node-chart-Component :catedata="category" />
              </el-col>
            </el-row>
          </div>
          <!-- <div v-show="small_show2"> -->
            <div v-show="overview_small_show2">
            <el-row>
              <el-col :span="24">
                <relation-chart-Component />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
// search
import SearchNodeComponent from './SearchNodeComponent'
import NodeChartComponent from './NodeChartComponent'
import RelationChartComponent from './RelationChartComponent'
import SearchRelationComponent from './SearchRelationComponent'
import { mapActions, mapGetters } from 'vuex'
// 非甾体类抗炎药
export default {
  components: {
    // search
    SearchNodeComponent,
    NodeChartComponent,
    RelationChartComponent,
    SearchRelationComponent
    // CategoryChartComponent,
    // CategoryLeftComponent,
    // EntityLeftComponent,
    // EntityRightComponent
  },
  data() {
    return {
      value3: '',
      ForceChartData: {
        id1: '',
        id2: ''
      },
      value1: '',
      startpoints: [],
      endpoints: [],
      state1: '',
      state2: '',
      size1: 0,
      drawer11: false,
      drawer12: false,
      drawer21: false,
      drawer22: false,
      isshow1: true,
      category: [],
      categories: [],
      graph_length: 0,
      graph_length_start_content: 0,
      graph_length_end_content: 0,
      activeIndex: '1',
      options: [],
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      small_show1: true,
      small_show2: false,
      NodeData: [{
        id: '',
        name: ''
      }],
      startName: '',
      endName: '',
      countnumber: 0,
      EntityOption: [],
      RelationOption: [],
      redpoint1: true,
      redpoint2: true,
      // filterinformation: {}
      EdgeOption: [],
      edge: [],
      edges: []
    }
  },
  computed: {
    ...mapGetters([
      'overview_small_show1',
      'overview_small_show2'
      // 'radio',
      // 'histories',
      // 'relation_histories',
      // 'search_bigshow3',
      // 'search_bigshow5'
    ])
  },
  watch: {
  },
  created() {
    if (this.$route.params.userId === 1) {
      this.show1 = true
      this.show2 = false
    }
    this.$nextTick(() => {
      this.loadData_entitytype()
    })
  },
  methods: {
    ...mapActions(
      {
        setSmallShow1: 'overview/setSmallShow1',
        setSmallShow2: 'overview/setSmallShow2'
        // search
        // setBigshow3: 'search/setBigshow3',
        // search_setBigShow5: 'search/setBigShow5'
      }
    ),
    load_edgelabel() {
    },
    loadData_entitytype() {
      const url = this.$api + '/restfulController/getAllvertexlabel'
      axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          var cate = {}
          cate['label'] = response.data[i][0]
          cate['children'] = []
          for (var j = 0; j < response.data[i].length; j++) {
            if (j !== 0) {
              var son_cate = {}
              son_cate['label'] = response.data[i][j]
              cate['children'][j - 1] = son_cate
            }
          }
          this.categories[i] = cate
        }
        this.category = []
        this.category = this.categories
        // console.log('hello' + this.categories[0]['children'][1]['label'])
      })
    },
    changefunction(command) {
      if (command === '1') {
        // this.big_show1 = true
        // this.big_show2 = false
        // this.big_show3 = false
      } else if (command === '2') {
        // this.big_show1 = false
        // this.big_show2 = true
        // this.big_show3 = false
        // this.big_show4 = false
      } else if (command === '3') {
        // this.big_show1 = false
        // this.big_show2 = false
        // this.big_show3 = false
      }
    },
    handleSelect1(key, keyPath) {
      if (key === '1') {
        // this.small_show2 = false
        // this.small_show1 = true
        this.setSmallShow1(true)
        this.setSmallShow2(false)
        
      }
      if (key === '2') {
        // this.small_show2 = true
        // this.small_show1 = false
        this.setSmallShow1(false)
        this.setSmallShow2(true)
      }
    }
  }
}
</script>

<style scoped>
 .el-header {
    background-color: white;
    /* color: #333; */
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #F0F0F0;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    margin-bottom: 0px;
    height: 650px;
  }

  .el-main {
    border-left: 1px solid #F0F0F0;;
    background-color:#fff;
     /* #E9EEF3; */
    color: #333;
    text-align: center;
  }
  .el-menu-demo{
      margin-top: 20px;
  }
  .elmenu1{
    width: 80px;
  }
  .headerup{
      height: 30px;
  }
  .footerdown{
       height: 450px;
        text-align: center;
  }
  .block{
    bottom: 0px;
    left: 0px;
  }
  .drawer{
    background-color: #B3C0D1;
  }
  .text {
    font-family: 'STKaiti';
    /* margin-left: -100px; */
    font-weight: bold;
    color: #66CCCC;
    /* text-align:center; */
    font-size: 24px;
    margin-top: 0px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #000000;
    font-family: 'STKaiti';
    font-size: 20px;
    font-weight: bold;
  }
  .aside-button {
    border:none;
     font-family: 'STKaiti';
    font-size: 20px;
    color: #000000;
    font-weight: bold;
    background-color:#99CC99;
  }
  .el-menu-demo {
    background-color:#C4E1E1;
    border-radius: 5px;
    border: none;
    padding-top: 10px;
  }
  .elmenu1 {
    font-family: 'STKaiti';
    font-size: 18px;
    color: #000000;
    font-weight: bold;
    border: none !important;
    width: 90px;
    text-align:justify;
  }
  .elmenu1:focus {
    background-color: #fff;
    border-top: 5px solid #009966 !important;
  }
  ::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px #C4E1E1 inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px #C4E1E1 inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
