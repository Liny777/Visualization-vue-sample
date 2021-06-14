/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 搜索查询功能 —— 第二页

* 查找想要寻找的实体数据

* @author Lin Youguang

* @version 2.1

* @deprecated

*/
<template>
  <div>
    <div style="padding-bottom:20px;">
      <el-autocomplete
        v-model="state2"
        class="input"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <el-button slot="append" icon="el-icon-search" />
        <el-button slot="append" type="primary" @click="onClick">重置</el-button>
      </el-autocomplete>
    </div>
    <div id="mychart" :class="className" :style="{height:height,width:width}" />
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { Loading } from 'element-ui'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '550px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: 'loading',
      color: '#c23531',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0,
      graph_categories: [],
      graph_nodes: [],
      graph_links: [],
      nodes: [],
      links: [],
      categories: [],
      graph_length: 0,
      graph: {},
      options: [
        {
          value: '选项1',
          label: 'name'
        }
      ],
      value1: [],
      value2: [],
      activeNames: ['1'],
      drawer: false,
      direction: 'btt',
      input: '',
      state2: '',
      timeout: null,
      example: [],
      chooseLabel: '',
      loading: null,
      chart: null
    }
  },
  computed: {
    ...mapGetters([
      'search_node_category'
    ])
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
    })
  },
  created() {
    this.search_setBigShow5(-1)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
  },
  methods: {
    ...mapActions(
      {
        setBigshow3: 'search/setBigshow3',
        set_Node_Id: 'search/setNodeId',
        set_Node_Label: 'search/setNodeLabel',
        set_Node_Name: 'search/setNodeName',
        search_setBigShow5: 'search/setBigShow5' }
    ),
    loadData() {
      const url = this.$api + '/hugegraph/LabeltoFindV'
      const category = this.search_node_category
      this.chooseLabel = category
      const data =
          {
            'category': category,
            'content': category
          }
      this.startLoading()
      axios.post(url, data).then((response) => {
        this.endLoading()
        this.graph_length = 0
        this.graph_length = response.data.length
        for (var i = 0; i < this.graph_length; i++) {
          var cate = {}
          cate['name'] = response.data[i]['propertie'].name
          var node = {}
          node['category'] = i
          node['des'] = response.data[i]['description']
          node['id'] = response.data[i]['id']
          node['symbolSize'] = 30
          node['label'] = this.chooseLabel
          node['name'] = response.data[i]['propertie'].name
          node['value'] = response.data[i]['propertie'].name
          this.graph_categories[i] = cate
          this.graph_nodes[i] = node
        }
        this.nodes = []
        this.categories = []
        this.links = []
        this.nodes = this.graph_nodes
        this.categories = this.graph_categories
        this.drawLine()
      })
      // }
    },
    startLoading() {
    // Loading.service(options); options 参数为 Loading 的配置项
    // 使用loading变量来接收Loading.service返回的实例
      this.loading = Loading.service({
        lock: true, // 是否锁定
        text: '拼命加载中...', // 显示在加载图标下方的加载文案
        background: 'rgba(0,0,0,.7)' // 遮罩背景色
      })
    },
    endLoading() {
      this.loading.close()
    },
    querySearch(queryString, cb) {
      var nodes = this.graph_nodes
      var results = queryString ? nodes.filter(this.createFilter(queryString)) : nodes
      // 调用 callback 返回建议列表的数据
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createFilter(queryString) {
      return (node) => {
        return (node.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    drawLine() {
      // 1、基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('mychart'), 'macarons')
      // 2、构造图表数据
      var options = {
        title: {
          top: 'bottom',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function(x) {
            var keydes = '<div style="height:300px;width:300px;overflow-y:auto;overflow-x:auto;"">'
            keydes = keydes + x.data.des + '</div>'
            return keydes
          }
        },
        legend: [{
          show: false
        }],
        animation: false,
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.nodes,
            links: this.links,
            categories: this.categories,
            roam: true,
            label: {
              position: 'bottom',
              formatter: '{b}',
              show: true
            },
            draggable: true,
            force: {
              repulsion: 250
            }
          }
        ] }
      // 3、绘制图表
      this.chart.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0
      })
      this.chart.on(
        'click',
        (param) => {
          this.setBigshow3(3)
          this.set_Node_Id(param.data.id)
          this.set_Node_Label(param.data.label)
          this.set_Node_Name(param.data.name)
          // 可以使用下面的方式进行路由的切换
        }
      )
      setTimeout(() => {
        // setOption前隐藏loading事件
        this.chart.hideLoading()
        this.chart.setOption(options)
      }, 1000)
    },
    onClick() {
      this.nodes = []
      this.categories = []
      this.links = []
      this.nodes = this.graph_nodes
      this.categories = this.graph_categories
      this.drawLine()
    },
    handleSelect(item) {
      var the_choose_node_category = {}
      the_choose_node_category['name'] = item.name
      var the_choose_node = {}
      the_choose_node['name'] = item.name
      the_choose_node['category'] = 0
      the_choose_node['label'] = this.search_node_category
      the_choose_node['id'] = item.id
      the_choose_node['symbolSize'] = 30
      the_choose_node['des'] = item.des
      this.nodes = []
      this.categories = []
      this.links = []
      this.nodes[0] = the_choose_node
      this.categories[0] = the_choose_node_category
      this.drawLine()
    }
  }
}
</script>
