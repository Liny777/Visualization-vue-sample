/ *

 * 主界面 —— 我毕设的主页面，开发的功能与实验室所需功能无关。可以删除

* 父组件

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <el-container class="body">
    <el-header>
      <el-row v-if="big_show1" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="8" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="3">
          <span class="el-dropdown-link" @click="drawer11 = true">
            过滤工具
          </span>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer11"
            :with-header="false"
            :modal-append-to-body="false"
            :modal="false"
            size="20%"
          >
            <path-filter-component />
          </el-drawer>
        </el-col>
        <el-col :span="4">
          <span class="el-dropdown-link" @click="drawer12 = true">
            历史记录
          </span>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer12"
            :with-header="false"
            :modal-append-to-body="false"
            :modal="false"
            size="30%"
          >
            <path-history-component />
          </el-drawer>
        </el-col>
        <el-col :span="3">
          <el-switch
            v-model="value3"
            @change="change_radio"
          />
        </el-col>
      </el-row>
      <!-- // ------------------------------ 关联功能下 -->
      <el-row v-if="big_show2" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="8" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="3">
          <span class="el-dropdown-link" @click="drawer21 = true">
            过滤工具
          </span>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer21"
            :with-header="false"
            :modal-append-to-body="false"
            :modal="false"
            size="20%"
          >
            <relation-filter-component />
          </el-drawer>
        </el-col>
        <el-col :span="4">
          <span class="el-dropdown-link" @click="drawer22 = true">
            历史记录
          </span>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer22"
            :with-header="false"
            :modal-append-to-body="false"
            :modal="false"
            size="30%"
          >
            <relation-history-component />
          </el-drawer>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 实体查询 下 -->
      <el-row v-if="big_show4" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="14" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 实体查询2 下 -->
      <el-row v-if="big_show3" type="flex">
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
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col v-if="small_show31" :span="3">
          <span class="el-dropdown-link" @click="Back1">
            返回
          </span>
        </el-col>
        <el-col v-if="small_show32" :span="3">
          <span class="el-dropdown-link" @click="Back2">
            返回
          </span>
        </el-col>
        <el-col v-if="small_show33" :span="3">
          <span class="el-dropdown-link" @click="Back3">
            返回
          </span>
        </el-col>
        <el-col v-if="small_show34" :span="3">
          <span class="el-dropdown-link" @click="Back4">
            返回
          </span>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 实体查询3 下 -->
      <el-row v-if="big_show5" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="13" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- // ---------------------------------- 关系查询 下 -->
      <el-row v-if="big_show6" type="flex">
        <el-col :span="7">
          <span class="text">专业医学知识图谱平台</span>
        </el-col>
        <el-col :span="13" />
        <el-col :span="3">
          <el-dropdown @command="changefunction">
            <span class="el-dropdown-link">
              菜单
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Path Search</el-dropdown-item>
              <el-dropdown-item command="2">Correlation Search</el-dropdown-item>
              <el-dropdown-item command="3">Entity Query</el-dropdown-item>
              <el-dropdown-item command="4">Relational Query</el-dropdown-item>
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
          <!-- // -------------------------------------- 路径-->
          <div v-if="big_show1">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect1"
            >
              <el-row :gutter="24">
                <el-col :span="6" :offset="1">
                  <el-menu-item class="elmenu1" index="1">选项</el-menu-item>
                </el-col>
                <el-col :span="6" :offset="1">
                  <el-menu-item class="elmenu1" index="2">节点</el-menu-item>
                </el-col>
                <el-col :span="6" :offset="1">
                  <el-menu-item class="elmenu1" index="3">边</el-menu-item>
                </el-col>
              </el-row>
            </el-menu>
          </div>
          <!-- // -------------------------------------- 关联-->
          <div v-if="big_show2">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect2"
            >
              <el-row :gutter="24">
                <el-col :span="6" :offset="2">
                  <el-menu-item class="elmenu1" index="1">选择</el-menu-item>
                </el-col>
                <el-col :span="6" :offset="1">
                  <el-menu-item class="elmenu1" index="2">节点</el-menu-item>
                </el-col>
                <el-col :span="6" :offset="1">
                  <el-menu-item class="elmenu1" index="3">边</el-menu-item>
                </el-col>
              </el-row>
            </el-menu>
          </div>
        </div>
        <div class="footerdown">
          <!-- // -------------------------------------- 路径-->
          <div v-if="big_show1">
            <div v-show="small_show11" class="item1">
              <path-search-component :catedata="category" />
            </div>
            <div v-show="small_show12" class="item2">
              <path-image-read />
            </div>
            <div v-show="small_show13" class="item3">
              <path-image-analyze />
            </div>
          </div>
          <!-- // -------------------------------------- 关联-->
          <div v-if="big_show2">
            <div v-show="small_show21" class="item1">
              <relation-search-component :catedata="category" />
            </div>
            <div v-show="small_show22" class="item2">
              <relation-image-read />
            </div>
            <div v-show="small_show23" class="item3">
              <relation-image-analyze />
            </div>
          </div>
          <!-- // -------------------------------------- 实体-->
          <div v-if="big_show3">
            <div>
              <search-search-component />
            </div>
          </div>
          <!-- // -------------------------------------- 类别-->
          <div v-if="big_show4">
            <category-left-component />
          </div>
          <div v-if="big_show5">
            <entity-left-component />
          </div>
          <!-- // -------------------------------------- 关系-->
          <div v-if="big_show6">
            <edge-left-component :edgedata="edge" />
          </div>
        </div>
      </el-aside>
      <el-main>
        <div v-if="big_show1">
          <el-row>
            <el-col :span="24">
              <path-force-chart />
            </el-col>
          </el-row>
        </div>
        <div v-if="big_show2">
          <el-row>
            <el-col :span="24">
              <relation-force-chart />
            </el-col>
          </el-row>
        </div>
        <div v-if="big_show3">
          <el-row>
            <el-col :span="24">
              <search-chart-Component />
            </el-col>
          </el-row>
        </div>
        <div v-if="big_show4">
          <category-chart-component />
        </div>
        <div v-if="big_show5">
          <entity-right-component />
        </div>
        <div v-if="big_show6">
          <edge-right-chart />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
// path
import PathForceChart from './components/Path/ForceChartComponent'
import PathImageAnalyze from './components/Path/ImageAnalyze'
import PathImageRead from './components/Path/ImageRead'
import PathHistoryComponent from './components/Path/HistoryComponent'
import PathFilterComponent from './components/Path/FilterComponent'
import PathSearchComponent from './components/Path/SearchComponent'
// relation
import RelationForceChart from './components/Relation/ForceChartComponent'
import RelationImageAnalyze from './components/Relation/ImageAnalyze'
import RelationImageRead from './components/Relation/ImageRead'
import RelationHistoryComponent from './components/Relation/HistoryComponent'
import RelationFilterComponent from './components/Relation/FilterComponent'
import RelationSearchComponent from './components/Relation/SearchComponent'
// search
import SearchSearchComponent from './components/Search/SearchComponent'
import CategoryChartComponent from './components/Search/CategoryChartComponent'
import SearchChartComponent from './components/Search/ForceChartComponent'
import CategoryLeftComponent from './components/Search/CategoryLeftComponent'
import EntityLeftComponent from './components/Search/EntityLeftComponent'
import EntityRightComponent from './components/Search/EntityRightComponent'
// edge
import EdgeLeftComponent from './components/Edge/EdgeLeftComponent'
import EdgeRightChart from './components/Edge/EdgeRightChart'

import { mapActions, mapGetters } from 'vuex'
// 非甾体类抗炎药
export default {
  components: {
    // path
    PathForceChart,
    PathImageAnalyze,
    PathImageRead,
    PathHistoryComponent,
    PathFilterComponent,
    PathSearchComponent,
    // relation
    RelationForceChart,
    RelationImageAnalyze,
    RelationImageRead,
    RelationHistoryComponent,
    RelationFilterComponent,
    RelationSearchComponent,
    // search
    SearchSearchComponent,
    SearchChartComponent,
    CategoryChartComponent,
    CategoryLeftComponent,
    EntityLeftComponent,
    EntityRightComponent,
    // edge
    EdgeLeftComponent,
    EdgeRightChart
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
      big_show1: true,
      big_show2: false,
      big_show3: false,
      big_show4: false,
      big_show5: false,
      big_show6: false,
      small_show11: true,
      small_show12: false,
      small_show13: false,
      small_show21: true,
      small_show22: false,
      small_show23: false,
      small_show31: false,
      small_show32: false,
      small_show33: false,
      small_show34: false,
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
      'radio',
      'histories',
      'relation_histories',
      'search_bigshow3',
      'search_bigshow5'
    ])
  },
  watch: {
    search_bigshow5: function(val, oldVal) {
      if (val === 0) {
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = false
        this.big_show4 = false
        this.big_show5 = true
        this.big_show6 = false
      } else if (val === -1) {
        console.log('nothing')
      } else {
        this.big_show5 = false
      }
    },
    search_bigshow3: function(val, oldVal) {
      if (val === 0) {
        // path -> final
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = true //
        this.small_show31 = true //
        this.small_show33 = false
        this.small_show32 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 1) {
        // final -> path
        this.big_show1 = true //
        this.big_show2 = false
        this.big_show3 = false
        this.small_show31 = false
        this.small_show33 = false
        this.small_show32 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 2) {
        // final -> relation
        this.big_show1 = false
        this.big_show2 = true //
        this.big_show3 = false
        this.small_show31 = false
        this.small_show33 = false
        this.small_show32 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 3) {
        // search2 -> search3
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = true
        this.small_show31 = false
        this.small_show32 = true
        this.small_show33 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 4) {
        // search3 -> search1
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = false
        this.small_show31 = false
        this.small_show32 = false
        this.small_show33 = false
        this.big_show4 = true
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 5) {
        // relation -> final
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = true //
        this.small_show31 = false
        this.small_show32 = false
        this.small_show33 = true //
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
      if (val === 6) {
        // final -> edge
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = false
        this.small_show31 = false
        this.small_show32 = false
        this.small_show33 = false
        this.small_show34 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = true
      }
      if (val === 7) {
        // edge -> final
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = true
        this.small_show31 = false
        this.small_show32 = false
        this.small_show33 = false
        this.small_show34 = true
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      }
    },
    histories: function(val, oldVal) {
      if (val.length === 0) {
        this.redpoint1 = true
      } else {
        this.redpoint1 = false
      }
    },
    relation_histories: function(val, oldVal) {
      if (val.length === 0) {
        this.redpoint2 = true
      } else {
        this.redpoint2 = false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData_entitytype()
      this.load_edgelabel()
    })
  },
  created() {
    if (this.$route.params.userId === 6) {
      this.big_show1 = true
      this.big_show2 = false
      this.big_show3 = false
      this.big_show4 = false
      this.big_show5 = false
      this.big_show6 = false
    }
    if (this.$route.params.userId === 9) {
      this.big_show1 = false
      this.big_show2 = true
      this.big_show3 = false
      this.big_show4 = false
      this.big_show5 = false
      this.big_show6 = false
    }
    if (this.$route.params.userId === 8) {
      this.big_show1 = false
      this.big_show2 = false
      this.big_show3 = false
      this.big_show4 = true
      this.big_show5 = false
      this.big_show6 = false
    }
    if (this.$route.params.userId === 7) {
      this.big_show1 = false
      this.big_show2 = false
      this.big_show3 = false
      this.big_show4 = false
      this.big_show5 = false
      this.big_show6 = true
    }
    this.$nextTick(() => {
      this.loadData_entitytype()
      this.load_edgelabel()
    })
  },
  methods: {
    change_radio(data) {
      if (data === true) {
        this.$store.dispatch('path/setRadio', true)
      } else {
        this.$store.dispatch('path/setRadio', false)
      }
    },
    recover() {
      this.$store.dispatch('path/setChosenId', 0)
      this.$store.dispatch('path/setChosenEdge', 0)
      this.$store.dispatch('relation/setChosenId', 0)
      this.$store.dispatch('relation/setChosenEdge', 0)
    },
    ...mapActions(
      {
        // search
        setBigshow3: 'search/setBigshow3',
        search_setBigShow5: 'search/setBigShow5'
      }
    ),
    load_edgelabel() {
      const url = this.$api + '/MongoDB/getAllEdgeLabel'
      axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.EdgeOption[i] = response.data[i].label
          var edge1 = {}
          edge1['label'] = response.data[i].label
          edge1['value'] = response.data[i].label
          this.edges[i] = edge1
        }
        this.edge = []
        this.edge = this.edges
      })
    },
    loadData_entitytype() {
      const url = this.$api + '/MongoDB/getEntityType'
      axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.EntityOption[i] = response.data[i].name
          var cate = {}
          cate['label'] = response.data[i].name
          cate['value'] = response.data[i].name
          this.categories[i] = cate
        }
        this.category = []
        this.category = this.categories
      })
    },
    changefunction(command) {
      if (command === '1') {
        this.big_show1 = true
        this.big_show2 = false
        this.big_show3 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      } else if (command === '2') {
        this.big_show1 = false
        this.big_show2 = true
        this.big_show3 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = false
      } else if (command === '3') {
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = false
        this.big_show4 = true
        this.big_show5 = false
        this.big_show6 = false
      } else if (command === '4') {
        this.big_show1 = false
        this.big_show2 = false
        this.big_show3 = false
        this.big_show4 = false
        this.big_show5 = false
        this.big_show6 = true
      }
    },
    handleSelect1(key, keyPath) {
      if (key === '3') {
        this.small_show13 = true
        this.small_show12 = false
        this.small_show11 = false
      }
      if (key === '2') {
        this.small_show13 = false
        this.small_show12 = true
        this.small_show11 = false
      }
      if (key === '1') {
        this.small_show13 = false
        this.small_show12 = false
        this.small_show11 = true
      }
    },
    handleSelect2(key, keyPath) {
      if (key === '3') {
        this.small_show23 = true
        this.small_show22 = false
        this.small_show21 = false
      }
      if (key === '2') {
        this.small_show23 = false
        this.small_show22 = true
        this.small_show21 = false
      }
      if (key === '1') {
        this.small_show23 = false
        this.small_show22 = false
        this.small_show21 = true
      }
    },
    Back1() {
      this.setBigshow3(1)
    },
    Back2() {
      this.setBigshow3(4)
      this.search_setBigShow5(1)
    },
    Back3() {
      this.setBigshow3(2)
    },
    Back4() {
      this.setBigshow3(6)
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
