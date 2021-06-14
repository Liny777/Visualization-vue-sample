/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

* 搜索查询功能，从节点详细页面查看每一条边详细信息，左半部分，搜索框部分。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <div>
      <el-row class="item-head">
        <el-col :span="9" class="function-title">
          Relation Query Function
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" class="function-content">
          Please select the relationship you want to query. The entities under the relationship label are shown in the diagram.
        </el-col>
      </el-row>
      <el-row style="height:20px" class="cut-off" />
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
// import func from 'vue-editor-bridge'

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
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      graph_categories: [{
        'name': 'start'
      }, {
        'name': 'end'
      }, {
        'name': 'other'
      }],
      graph_nodes: [],
      graph_links: [],
      links: [],
      nodes: [],
      graph_length: 0,
      graph: {},
      categories: [],
      chart: null,
      EntityOption: [],
      RelationOption: [],
      state2: '',
      timeout: null
    }
  },
  computed: {
    ...mapGetters([
      'edge_label'
    ])
  },
  watch: {
    edge_label: function(val, oldVal) {
      if (val !== '') {
        this.loadData()
      }
      if (val === '') {
        this.nodes = []
        this.links = []
        this.categories = []
        this.initChart()
      }
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    ...mapActions(
      {
        setBigshow3: 'search/setBigshow3',
        set_Node_Id: 'search/setNodeId',
        set_Node_Label: 'search/setNodeLabel',
        set_Node_Name: 'search/setNodeName'
      }
    ),
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
    loadData() {
      // console.log('我来了！3')
      // const url = 'http://localhost:10088/getEdgeVertical'
      const url = this.$api + '/hugegraph/getEdgeVertical'
      const params = {
        'category': '',
        'content': ''
      }
      params['category'] = this.edge_label
      this.startLoading()
      axios.post(url, params)
        .then((response) => {
          this.endLoading()
          // this.graphdata = response.data
          this.graph_nodes = []
          this.graph_length = response.data.length
          var count_number = 0
          var repeatid = ''
          // 存储节点，起始边一起，然后先第一步去重
          for (var i = 0; i < this.graph_length; i++) {
            if (response.data[i]['inV'] !== repeatid) {
              repeatid = response.data[i]['inV']
              var node = {}
              node['id'] = response.data[i]['inV']
              node['label'] = response.data[i]['inVLabel']
              node['type'] = 'node'
              this.graph_nodes[count_number] = node
              count_number = count_number + 1
            }
            //
            var node1 = {}
            node1['id'] = response.data[i]['outV']
            node1['label'] = response.data[i]['outVLabel']
            node1['type'] = 'node'
            this.graph_nodes[count_number] = node1
            count_number = count_number + 1
          }
          var len = count_number
          var count = 0
          this.nodes = []
          this.categories = []
          // 第二步去重
          for (var m = 0; m < len; m++) {
            for (var n = m + 1; n < len; n++) {
              if (this.graph_nodes[m]['id'] === this.graph_nodes[n]['id']) {
                n = ++m
              }
            }
            // 存储类别，用节点id做类别的名字，用count指定节点的类别
            var cate = {}
            cate['name'] = this.graph_nodes[m]['id']
            this.graph_nodes[m]['category'] = count
            count++
            this.categories.push(cate)
            this.nodes.push(this.graph_nodes[m])
          }
          // 存储边
          for (var j = 0; j < this.graph_length; j++) {
            var link = {}
            link['sourceLabel'] = response.data[j]['inVLabel']
            link['targetLabel'] = response.data[j]['outVLabel']
            link['source'] = response.data[j]['inV']
            link['target'] = response.data[j]['outV']
            link['label'] = response.data[j]['label']
            link['des'] = response.data[j]['description']
            link['type'] = 'link'
            this.links[j] = link
          }

          this.initChart()
        })
    },
    initChart() {
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
          formatter: function(x) {
            // console.log("x",x)
            return x.data.des
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
            data: this.nodes.map(function(node) {
              return {
                id: node.id,
                label: node.label,
                category: node.category,
                des: node.label,
                type: node.type,
                itemStyle: { // ===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                  normal: { // 默认样式
                    label: {
                      show: true
                    },
                    borderType: 'solid', // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor: 'rgba(255,215,0,0.4)', // 设置图形边框为淡金色,透明度为0.4
                    borderWidth: 0, // 图形的描边线宽。为 0 时无描边。
                    opacity: 1
                  },
                  emphasis: { // 高亮状态
                    label: {
                      show: true
                    },
                    opacity: 1
                  }
                }
              }
            }),
            links: this.links.map(function(edge) {
              return {
                source: edge.source,
                label: edge.label,
                target: edge.target,
                des: edge.des,
                type: edge.type,
                lineStyle: {
                  normal: {
                    color: '#CCCCCC',
                    width: '1',
                    type: 'dashed', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                    // curveness: 0.3, // 线条的曲线程度，从0到1
                    opacity: 1
                    // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                  },
                  emphasis: { // 高亮状态
                    color: '#FFCC33',
                    opacity: 1
                  }
                }
              }
            }),
            categories: this.categories,
            nodeScaleRatio: 0.6,
            label: { // =============图形上的文本标签
              normal: {
                show: true, // 是否显示标签。
                position: 'bottom', // 标签的位置。['50%', '50%'] [x,y]
                textStyle: { // 标签的字体样式
                  color: '#000000', // 字体颜色
                  fontStyle: 'normal', // 文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                  // fontWeight: 'bolder', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                  fontFamily: 'sans-serif', // 文字的字体系列
                  fontSize: 15 // 字体大小
                }
              },
              emphasis: {// 高亮状态

              }
            },
            roam: true,
            draggable: true,
            focusNodeAdjacency: true, // -----
            force: {
              repulsion: 300, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.01, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 350, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            symbolSize: 35,
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            edgeSymbol: ['circle', 'arrow']
          }
        ] }
      const arrow = this.$api
      // console.log(arrow)
      this.chart.on(
        'click',
        (param) => {
          var url1 = arrow + '/hugegraph/IdfindName'
          var data1 = {
            'category': '',
            'content': ''
          }
          data1['content'] = param.data.id
          // console.log(param.data.id)
          if (param.data.type === 'node') {
            axios.post(url1, data1)
              .then((response) => {
                this.setBigshow3(7)
                this.set_Node_Id(param.data.id)
                this.set_Node_Label(param.data.label)
                this.set_Node_Name(response.data)
              })
          }
        }
      )
      // 3、绘制图表
      this.chart.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0
      })
      setTimeout(() => {
        // setOption前隐藏loading事件
        this.chart.hideLoading()
        this.chart.setOption(options)
      }, 1000)
    }
  }
}
</script>
<style scoped>
.function-title {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 24px;
    color: #000000;
    font-weight: bold;
  }
  .function-content {
    margin-top: 20px;
    margin-left: 40px;
    font-size: 15px;
    color: #999;
    text-align:justify;
    word-break:break-all;
    line-height: 150%;
    font-family: 'Times New Roman', Times, serif;
  }
</style>
