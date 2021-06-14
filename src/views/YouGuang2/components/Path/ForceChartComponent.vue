/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 力导图 —— 路径分析功能的子组件

* 路径分析页面中间的力导图

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <div>
      <el-row class="item-head">
        <el-col :span="6" class="function-title">
          路径搜索功能
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" class="function-content">
          请选择路径的起始节点。例如，患者-治疗药物-药物，患者作为起始节点，药物作为终止节点。治疗药物被称为关系，也被称为路径或边缘。
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
require('echarts/theme/shine')
// shine roma vintage infographic
import resize from '../mixins/resize'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import yaopin from '@/assets/ForceChart_images/yaopin.png'
import yaowu from '@/assets/ForceChart_images/yaowu.png'
import { Loading } from 'element-ui'

export default {
  // components: { directive },
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
      final_links_second: [],
      final_links_first: [],
      final_nodes: [],
      graph_length: 0,
      graph: {},
      chart: null,
      EntityOption: [],
      RelationOption: [],
      state2: '',
      timeout: null
    }
  },
  computed: {
    ...mapGetters([
      'startid',
      'endid',
      'chosennodelabel',
      'chosenedgelabel',
      'maxdegree',
      'chosennode',
      'chosenedge',
      'graphdata',
      'graphnode',
      'radio'
    ])
  },
  watch: {
    startid: function(val, oldVal) {
      this.loadData()
    },
    maxdegree: function(val, oldVal) {
      this.loadData()
    },
    chosennodelabel: {
      immediate: false,
      deep: true,
      handler(val) {
        if (this.graphdata['pathNode'] !== undefined) {
          this.clearData()
        }
      }
    },
    chosenedgelabel: {
      immediate: false,
      deep: true,
      handler(val) {
        if (this.graphdata['pathNode'] !== undefined) {
          this.clearData()
        }
      }
    },
    chosennode: function(val, oldVal) {
      if (val === 0) {
        this.initChart()
      } else {
        if (this.chart !== null) {
          this.handleNode()
        }
      }
    },
    chosenedge: function(val, oldVal) {
      if (val === 0) {
        this.initChart()
      } else {
        if (this.chart !== null) {
          this.handleEdge()
        }
      }
    },
    radio: function(val, oldVal) {
      if (val === true) {
        this.handleradio()
      } else {
        this.initChart()
      }
    }
  },
  created() {
    this.loadData_entitytype()
    this.loadData_edgelabel()
    // })
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
    })
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
      { setnodelabel: 'path/setNodeLabel',
        setedgelabel: 'path/setEdgeLabel',
        setChosenNodeLabel: 'path/setChosenNodeLabel',
        setChosenEdgeLabel: 'path/setChosenEdgeLabel',
        setBigshow3: 'search/setBigshow3',
        set_Node_Id: 'search/setNodeId',
        set_Node_Label: 'search/setNodeLabel',
        set_Node_Name: 'search/setNodeName' }
    ),
    startLoading() {
    // Loading.service(options); options 参数为 Loading 的配置项
    // 使用loading变量来接收Loading.service返回的实例
      this.loading = Loading.service({
        lock: true, // 是否锁定
        text: 'Loading...', // 显示在加载图标下方的加载文案
        background: 'rgba(0,0,0,.7)' // 遮罩背景色
      })
    },
    endLoading() {
      this.loading.close()
    },
    loadData_entitytype() {
      const url = this.$api + '/MongoDB/getEntityType'
      axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.EntityOption[i] = response.data[i].name
        }
        this.setnodelabel(this.EntityOption)
        this.setChosenNodeLabel(this.EntityOption)
      })
    },
    loadData_edgelabel() {
      const url = this.$api + '/MongoDB/getEdgeLabel'
      axios.get(url).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.RelationOption[i] = response.data[i].name
        }
        this.setedgelabel(this.RelationOption)
        this.setChosenEdgeLabel(this.RelationOption)
      })
    },
    loadData() {
      const SE_Node = {
        'SId': this.startid,
        'EId': this.endid,
        'maxdepth': this.maxdegree
      }
      const url = this.$api + '/restfulController/transver/path'
      if (SE_Node.SId !== null && SE_Node.SId !== '' && SE_Node.SId !== undefined && SE_Node.EId !== null && SE_Node.EId !== '' && SE_Node.EId !== undefined) {
        this.startLoading()
        axios.post(url, SE_Node)
          .then((response) => {
            this.endLoading()
            this.$store.dispatch('path/setGraphData', response.data)
            this.clearData()
          })
      }
    },
    clearData() {
      this.graph_nodes = []
      var node_S = {}
      node_S['name'] = this.graphdata['sName']
      node_S['category'] = 0
      node_S['label'] = this.graphdata['sLabel']
      node_S['id'] = this.graphdata['sId']
      node_S['value'] = this.graphdata['sName']
      node_S['type'] = 'node'
      this.$store.dispatch('path/setStartName', node_S['name'])
      this.graph_nodes[0] = node_S
      var node_E = {}
      node_E['name'] = this.graphdata['eName']
      node_E['category'] = 1
      node_E['label'] = this.graphdata['eLabel']
      node_E['id'] = this.graphdata['eId']
      node_E['value'] = this.graphdata['eName']
      node_E['type'] = 'node'
      this.$store.dispatch('path/setEndName', node_E['name'])
      this.graph_nodes[1] = node_E
      this.graph_length = 0
      this.graph_length = this.graphdata['pathNode'].length
      // 0存起始节点，1存末尾节点
      var count_number = 2 // 所以这里从2开始存其他节点
      for (var i = 0; i < this.graph_length; i++) {
        for (var j = 1; j < this.graphdata['pathNode'][i].length; j++) {
          // j从1开始是因为第一个头节点是起始节点
          var node = {}
          // 这里只存关系边头部节点，最后单独存尾部节点
          // 类别初始化部分
          // 节点初始化部分
          var flag = 0
          for (var k = 0; k < this.graph_nodes.length; k++) {
            if (this.graphdata['pathNode'][i][j]['headId'] === this.graph_nodes[k]['id']) {
              flag = 1
            }
          }
          if (flag === 0) {
            node['category'] = 2
            node['id'] = this.graphdata['pathNode'][i][j]['headId']
            node['name'] = this.graphdata['pathNode'][i][j]['headName']
            node['label'] = this.graphdata['pathNode'][i][j]['headLabel']
            node['value'] = this.graphdata['pathNode'][i][j]['headName']
            node['type'] = 'node'
            this.graph_nodes[count_number] = node
            count_number++
          }
          // 每一个节点
        }
      }
      var linlk_number = 0
      for (var m = 0; m < this.graph_length; m++) {
        for (var n = 0; n < this.graphdata['pathNode'][m].length; n++) { // 边的初始化部分
          var link = {}
          link['sourceLabel'] = this.graphdata['pathNode'][m][n]['headLabel']
          link['targetLabel'] = this.graphdata['pathNode'][m][n]['tailLabel']
          link['source'] = this.graphdata['pathNode'][m][n]['headId']
          link['target'] = this.graphdata['pathNode'][m][n]['tailId']
          link['label'] = this.graphdata['pathNode'][m][n]['relation']
          link['des'] = this.graphdata['pathNode'][m][n]['description']
          link['type'] = 'link'
          this.graph_links[linlk_number] = link
          linlk_number++
        }
      }
      // 根据实体标签筛选边
      this.final_links_first = []
      for (var y = 0; y < this.graph_links.length; y++) {
        for (var g = 0; g < this.chosennodelabel.length; g++) {
          if (this.graph_links[y]['sourceLabel'] === this.chosennodelabel[g] || this.graph_links[y]['targetLabel'] === this.chosennodelabel[g]) {
            this.final_links_first.push(this.graph_links[y])
          }
        }
      }
      // 根据边标签筛选边
      this.final_links_second = []
      for (var r = 0; r < this.final_links_first.length; r++) {
        for (var t = 0; t < this.chosenedgelabel.length; t++) {
          if (this.final_links_first[r]['label'] === this.chosenedgelabel[t]) {
            this.final_links_second.push(this.final_links_first[r])
          }
        }
      }
      // 根据实体标签筛选节点
      this.final_nodes = []
      for (var x = 0; x < this.graph_nodes.length; x++) {
        for (var h = 0; h < this.chosennodelabel.length; h++) {
          if (this.graph_nodes[x]['label'] === this.chosennodelabel[h]) {
            this.final_nodes.push(this.graph_nodes[x])
          }
        }
      }
      this.$store.dispatch('path/setNodeData', this.graph_nodes)
      this.$store.dispatch('path/setEdgeData', this.graphdata['pathNode'])
      this.initChart()
    },
    initChart() {
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
            var keydes = ''
            if (x.data.type === 'node') {
              keydes = x.data.label
            } else if (x.data.type === 'link') {
              var val = x.data.des
              if (val !== '[]') {
                keydes = '<div style="height:300px;width:300px;overflow-y:auto;overflow-x:auto;"">'
                var i = 0
                while (i < x.data.des.length) {
                  var p_key = val.indexOf('key=', i)
                  var p_dou = val.indexOf(',', p_key)
                  var keya = val.substring(p_key + 4, p_dou)
                  var p_value = val.indexOf('value=', p_dou)
                  var p_kuo = val.indexOf('}', p_value)
                  var valuea = val.substring(p_value + 6, p_kuo)
                  if (p_key === -1) {
                    i = i + 1
                  } else {
                    i = p_kuo + 1
                    keydes = keydes + '<strong>' + keya + ': ' + '</strong>' + '<p>' + valuea + '</p>'
                  }
                }
                keydes = keydes + '</div>'
              }
            }
            return keydes
          }
        },
        legend: [{
          show: true,
          x: 'right', // 可设定图例在左、右、居中
          y: 'top',
          padding: [0, 100, 0, 0] // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
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
            data: this.final_nodes.map(function(node) {
              return {
                id: node.id,
                name: node.name,
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
            links: this.final_links_second.map(function(edge) {
              return {
                source: edge.source,
                label: edge.label,
                target: edge.target,
                des: edge.des,
                type: edge.type,
                lineStyle: {
                  normal: {
                    color: 'rgba(30,144,255,0.4)',
                    width: '3',
                    type: 'dotted', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
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
            symbolSize: (value, params) => { // 设置图像的大小
              if (params.data.category === 0) {
                return 70
              } else if (params.data.category === 1) {
                return 70
              } else {
                return 20
              }
            },
            focusNodeAdjacency: true, // -----
            force: {
              repulsion: 500, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.1, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 600, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            edgeSymbol: ['circle', 'arrow'], // -----
            edgeSymbolSize: 10, // -----
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  // fontSize: 20
                  color: '#003366'
                },
                formatter: function(x) {
                  var keydes = x.data.label + '\n'
                  var val = x.data.des
                  if (val !== '[]') {
                    var i = 0
                    while (i < x.data.des.length) {
                      var p_key = val.indexOf('key=', i)
                      var p_dou = val.indexOf(',', p_key)
                      var keya = val.substring(p_key + 4, p_dou)
                      var p_value = val.indexOf('value=', p_dou)
                      var p_kuo = val.indexOf('}', p_value)
                      var valuea = val.substring(p_value + 6, p_kuo)
                      if (keya === '临床建议' && x.data.label === '相互作用（化学名）' && valuea !== '') {
                        keydes = keydes + ' ' + '临床建议: ' + valuea + '\n'
                      }
                      if (keya === '证据级别' && x.data.label === '相互作用（化学名）' && valuea !== '') {
                        keydes = keydes + ' ' + '证据级别: ' + valuea + '\n'
                      }
                      if (keya === '建议' && x.data.label === '适应证(药品分类,疾病)' && valuea !== '') {
                        keydes = keydes + ' ' + '建议: ' + valuea + '\n'
                      }
                      if (keya === '建议' && x.data.label === '适应证(药品分类,疾病三级分类)' && valuea !== '') {
                        keydes = keydes + ' ' + '建议: ' + valuea + '\n'
                      }
                      if (keya === '类型' && x.data.label === '禁忌证(药品分类,疾病)' && valuea !== '') {
                        keydes = keydes + ' ' + '类型: ' + valuea + '\n'
                      }
                      if (keya === '类型' && x.data.label === '相互作用（化学名）' && valuea !== '') {
                        keydes = keydes + ' ' + '类型: ' + valuea + '\n'
                      }
                      if (keya === '推荐优先级' && x.data.label === '联合用药方案' && valuea !== '') {
                        keydes = keydes + ' ' + '推荐优先级: ' + valuea + '\n'
                      }
                      if (p_key === -1) {
                        i = i + 1
                      } else {
                        i = p_kuo + 1
                      }
                    }
                  }
                  return keydes
                  // return x.data.label
                },
                overflow: 'break',
                width: 20
              }

            }
          }
        ]
      }
      this.chart.on(
        'click',
        (param) => {
          // 可以使用下面的方式进行路由的切换
          if (param.data.type === 'node') {
            this.setBigshow3(0)
            this.set_Node_Id(param.data.id)
            this.set_Node_Label(param.data.label)
            this.set_Node_Name(param.data.name)
          }
        }
      )
      this.chart.setOption(option)
    },
    handleNode() {
      const options = this.chart.getOption()
      const nodesOption = options.series[0].data
      for (const m in nodesOption) {
        nodesOption[m].itemStyle.opacity = 0.3
        if (nodesOption[m].id === this.chosennode) { // 先比较节点是否在
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
      for (const n in this.chosenedge) {
        for (const p in linksOption) {
          if (linksOption[p].source === this.chosenedge[n]['headId'] && linksOption[p].target === this.chosenedge[n]['tailId']) {
            linksOption[p].lineStyle.opacity = 1
            linksOption[p].lineStyle.color = '#FFCC00'
          }
        }
      }
      // //////////////////////////////////
      for (const s in nodesOption) {
        nodesOption[s].itemStyle.opacity = 0.1
      }
      for (const t in this.chosenedge) {
        for (const w in nodesOption) {
          if (nodesOption[w].id === this.chosenedge[t]['headId'] || nodesOption[w].id === this.chosenedge[t]['tailId']) {
            nodesOption[w].itemStyle.opacity = 1
            nodesOption[w].itemStyle.color = '#FFCC00'
          }
        }
      }
      this.chart.setOption(options)
    },
    handleradio() {
      const options = this.chart.getOption()
      const nodesOption = options.series[0].data
      for (const k in nodesOption) {
        if (k === '0' || k === '1') {
          nodesOption[k].symbol = `image://${yaopin}`
          nodesOption[k].symbolSize = 70
        } else {
          nodesOption[k].symbol = `image://${yaowu}`
          nodesOption[k].symbolSize = 30
        }
      }
      this.chart.setOption(options)
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
