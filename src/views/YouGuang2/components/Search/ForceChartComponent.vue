/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 搜索查询功能 —— 第三页

* 查询单个节点信息

* @author Lin Youguang

* @version 2.1

* @deprecated

*/
<template>
  <div>
    <div>
      <el-row class="item-head">
        <el-col :span="2" class="function-title">
          信息
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="function-content">
          节点与其邻居之间关系的详细信息。
        </el-col>
      </el-row>
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
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      timeout: null,
      loading: null,
      graph_categories: [],
      graph_nodes: [],
      graph_links: [],
      graph_length: 0,
      temp_option: []
    }
  },
  computed: {
    ...mapGetters([
      'search_nodeid',
      'search_nodename',
      'search_nodelabel'
    ])
  },
  watch: {
  },
  created() {
    this.loadData()
  },
  mounted() {
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
        // search
        search_setOptions: 'search/setOptions'
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
    ...mapActions(
      { setnodelabel: 'relation/setNodeLabel',
        setedgelabel: 'relation/setEdgeLabel',
        setChosenNodeLabel: 'relation/setChosenNodeLabel',
        setChosenEdgeLabel: 'relation/setChosenEdgeLabel' }
    ),
    loadData() {
      const url = this.$api + '/hugegraph/IdfindEdge'
      const category = this.search_nodeid
      const data =
        {
          'category': category,
          'content': category
        }
      this.startLoading()
      axios.post(url, data).then((response) => {
        this.endLoading()
        var receive = response.data
        this.temp_option = []
        if (receive === null || receive === undefined || receive === '' || receive.length === 0) {
          var category_empty_response = {}
          category_empty_response['name'] = this.search_nodename
          var node_empty_response = {}
          node_empty_response['name'] = this.search_nodename
          node_empty_response['category'] = 0
          node_empty_response['label'] = this.search_nodelabel
          node_empty_response['id'] = this.search_nodeid
          node_empty_response['symbolSize'] = 30
          this.graph_nodes[0] = node_empty_response
          this.graph_categories[0] = category_empty_response
          this.search_setOptions([])
          this.drawLine()
          // })
        } else {
          this.graph_length = 0
          this.graph_length = response.data.length
          // 两个类别，出节点和入节点
          var cate1 = {}
          cate1['name'] = response.data[0]['inVName']
          this.graph_categories[0] = cate1
          var cate2 = {}
          cate2['name'] = response.data[0]['outVName']
          this.graph_categories[1] = cate2
          // 添加第一条边的起始节点，这个起始节点是原点
          var node1 = {}
          node1['category'] = 0
          node1['id'] = response.data[0]['inV']
          node1['symbolSize'] = 70
          node1['name'] = response.data[0]['inVName']
          node1['label'] = response.data[0]['inVLabel']
          this.graph_nodes[0] = node1
          // 添加第一条边的终止节点
          var node2 = {}
          node2['category'] = 1
          node2['id'] = response.data[0]['outV']
          node2['symbolSize'] = 30
          node2['name'] = response.data[0]['outVName']
          node2['label'] = response.data[0]['outVLabel']
          this.graph_nodes[1] = node2
          // 添加第一条边
          var link1 = {}
          link1['source'] = response.data[0]['inV']
          link1['target'] = response.data[0]['outV']
          link1['label'] = response.data[0]['label']
          link1['des'] = response.data[0]['description']
          this.graph_links[0] = link1
          // 添加第一个关系
          var re = { value: response.data[0]['label'], label: response.data[0]['label'], children: [] }
          re['children'].push({ value: response.data[0]['outVName'], label: response.data[0]['outVName'], description: response.data[0]['description'] })
          this.temp_option[0] = re
          var number = 0

          for (var i = 1; i < this.graph_length; i++) {
            // 类别
            var cate = {}
            cate['name'] = response.data[i]['outVName']
            this.graph_categories[i + 1] = cate
            // 节点
            var node = {}
            node['category'] = i + 1
            node['id'] = response.data[i]['outV']
            node['symbolSize'] = 30
            node['name'] = response.data[i]['outVName']
            node['label'] = response.data[i]['outVLabel']
            this.graph_nodes[i + 1] = node
          }
          for (var j = 1; j < this.graph_length; j++) {
          // 边
            var link = {}
            link['source'] = response.data[j]['inV']
            link['target'] = response.data[j]['outV']
            link['label'] = response.data[j]['label']
            link['des'] = response.data[j]['description']
            this.graph_links[j] = link
            // 这里假设返回的边是同个边的label都是一次性全过来，因此直接与上一条边比较是否相等来防止重复
            // 以后需要修改
            if (this.temp_option[number]['label'] === response.data[j]['label']) {
              this.temp_option[number].children.push({ value: response.data[j]['outVName'], label: response.data[j]['outVName'], description: response.data[j]['description'] })
            } else {
              number = number + 1
              var re1 = { value: response.data[j]['label'], label: response.data[j]['label'], children: [] }
              re1['children'].push({ value: response.data[j]['outVName'], label: response.data[j]['outVName'], description: response.data[j]['description'] })
              this.temp_option[number] = re1
            }
          }
          this.search_setOptions(this.temp_option)
          this.drawLine()
        }
      })
    },
    drawLine() {
      this.chart = echarts.init(document.getElementById('mychart'), 'macarons')
      var option = {
        title: {
          top: 'bottom',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function(x) {
            return x.data.label
          }
        },
        legend: [{
          show: true
        }],
        toolbox: {
          x: 'left',
          y: 'bottom',
          padding: [0, 0, 0, 40],
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        animation: false,
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.graph_nodes.map(function(node) {
              return {
                id: node.id,
                name: node.name,
                label: node.label,
                category: node.category,
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
            links: this.graph_links.map(function(edge) {
              return {
                source: edge.source,
                label: edge.label,
                target: edge.target,
                lineStyle: {
                  normal: {
                    color: '#C4E1E1',
                    width: '2',
                    type: 'dotted', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
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
            categories: this.graph_categories,
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            nodeScaleRatio: 0.6, // 鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
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
            draggable: true,
            symbolSize: 20,
            focusNodeAdjacency: true, // -----
            force: {
              repulsion: 300, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.01, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 350, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            edgeSymbol: ['circle', 'arrow'], // -----
            edgeSymbolSize: 10, // -----
            edgeLabel: {
              normal: {
                show: true,
                formatter: function(x) {
                  return x.data.label
                }
              }

            }
          }
        ]
      }
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
        this.chart.setOption(option)
      }, 1000)
    },
    handleNode() {
      const options = this.chart.getOption()
      const nodesOption = options.series[0].data
      for (const m in nodesOption) {
        nodesOption[m].itemStyle.opacity = 0.3
        if (nodesOption[m].id === this.relation_chosennode) { // 先比较节点是否在
          nodesOption[m].itemStyle.opacity = 1
          nodesOption[m].itemStyle.color = '#FFCC00'
        }
      }
      this.chart.setOption(options)
    },
    handleEdge() {
      const options = this.chart.getOption()
      const nodesOption = options.series[0].data
      const linksOption = options.series[0].links
      for (const l in linksOption) {
        linksOption[l].lineStyle.opacity = 0.1
      }
      for (const p in linksOption) {
        if (linksOption[p].source === this.relation_chosenedge['source'] && linksOption[p].target === this.relation_chosenedge['target']) {
          linksOption[p].lineStyle.opacity = 1
          linksOption[p].lineStyle.color = '#FFCC00'
        }
      }
      // }
      // //////////////////////////////////
      for (const s in nodesOption) {
        nodesOption[s].itemStyle.opacity = 0.1
      }
      for (const w in nodesOption) {
        if (nodesOption[w].id === this.relation_chosenedge['source'] || nodesOption[w].id === this.relation_chosenedge['target']) {
          nodesOption[w].itemStyle.opacity = 1
          nodesOption[w].itemStyle.color = '#FFCC00'
        }
      }
      // }
      this.chart.setOption(options)
    }
  }
}
</script>
<style scoped>
.function-title {
    font-family: 'STKaiti';
    font-size: 24px;
    color: #000000;
    font-weight: bold;
  }
  .function-content {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -1px;
    font-size: 15px;
    color: #999;
    text-align:justify;
    word-break:break-all;
    line-height: 150%;
    font-family: 'STKaiti';
  }
</style>
