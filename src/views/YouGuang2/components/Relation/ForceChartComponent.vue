/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 力导图 —— 关联分析功能的子组件

* 关联分析页面中间的力导图

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <div>
      <el-row class="item-head">
        <el-col :span="11" class="function-title">
          Correlation Search Function
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" class="function-content">
          Please add any entity you want to explore. All the entities you add and their relationships are rendered in one diagram.
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
      graph_categories: [],
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
      timeout: null,
      loading: null
    }
  },
  computed: {
    ...mapGetters([
      'relation_chosennodelabel',
      'relation_chosenedgelabel',
      'relation_chosennode',
      'relation_chosenedge',
      'relation_searchid',
      'relation_graphdata',
      'relation_searchname',
      'relation_category'
    ])
  },
  watch: {
    relation_searchid: function(val, oldVal) {
      if (val.length === 0) {
        this.final_links_second = []
        this.final_nodes = []
        this.initChart()
      } else {
        this.loadData()
      }
    },
    relation_chosennode: function(val, oldVal) {
      if (val === 0) {
        this.initChart()
      } else {
        if (this.chart !== null) {
          this.handleNode()
        }
      }
    },
    relation_chosenedge: function(val, oldVal) {
      if (val === 0) {
        this.initChart()
      } else {
        if (this.chart !== null) {
          this.handleEdge()
        }
      }
    },
    relation_chosennodelabel: {
      immediate: false,
      deep: true,
      handler(val) {
        this.clearData()
      }
    },
    relation_chosenedgelabel: {
      immediate: false,
      deep: true,
      handler(val) {
        this.clearData()
      }
    }
  },
  created() {
    this.loadData_entitytype()
    this.loadData_edgelabel()
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
    // this.chart = null
  },
  methods: {
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
    ...mapActions(
      { setnodelabel: 'relation/setNodeLabel',
        setedgelabel: 'relation/setEdgeLabel',
        setChosenNodeLabel: 'relation/setChosenNodeLabel',
        setChosenEdgeLabel: 'relation/setChosenEdgeLabel',
        setBigshow3: 'search/setBigshow3',
        set_Node_Id: 'search/setNodeId',
        set_Node_Label: 'search/setNodeLabel',
        set_Node_Name: 'search/setNodeName',
        setCategory: 'relation/setCategory',
        addCategory: 'relation/addCategory' }
    ),
    loadData_entitytype() {
      axios.get(this.$api + '/MongoDB/getEntityType').then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.EntityOption[i] = response.data[i].name
        }
        this.setnodelabel(this.EntityOption)
        this.setChosenNodeLabel(this.EntityOption)
      })
    },
    loadData_edgelabel() {
      axios.get(this.$api + '/MongoDB/getEdgeLabel').then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.RelationOption[i] = response.data[i].name
        }
        this.setedgelabel(this.RelationOption)
        this.setChosenEdgeLabel(this.RelationOption)
      })
    },
    loadData() {
      // 保证每次申请都是最新的那个id
      if (this.relation_searchid.length >= 1) {
        var num = 0
        num = this.relation_searchid.length - 1
        const request = {
          'source': this.relation_searchid[num],
          'max_depth': 1
        }
        const url = this.$api + '/restfulController/transver/neighbour'
        // 这里是为了防止多次请求，保证一个id请求一次
        if (request.source !== null && request.source !== '' && request.source !== undefined && this.relation_searchid.length === (this.relation_graphdata.length + 1)) {
          this.startLoading()
          axios.post(url, request)
            .then((response) => {
              this.endLoading()
              this.$store.dispatch('relation/addGraphData', response.data)
              var ca = {}
              ca['name'] = this.relation_searchname[num]
              ca['index'] = num
              this.addCategory(ca)
              this.clearData()
            })
        }
      }
    },
    clearData() {
      this.graph_nodes = []
      for (var i = 0; i < this.relation_graphdata.length; i++) {
        for (var j = 0; j < this.relation_graphdata[i]['node'].length; j++) {
          var node = {}
          node['sname'] = this.relation_searchname[i]
          node['name'] = this.relation_graphdata[i]['node'][j]['name']
          node['category'] = i
          node['label'] = this.relation_graphdata[i]['node'][j]['label']
          node['id'] = this.relation_graphdata[i]['node'][j]['id']
          node['value'] = this.relation_graphdata[i]['node'][j]['name']
          node['type'] = 'node'
          this.graph_nodes.push(node)
        }
      }
      var hash = []
      for (var p = 0; p < this.graph_nodes.length; p++) {
        for (var q = p + 1; q < this.graph_nodes.length; q++) {
          if (this.graph_nodes[p]['id'] === this.graph_nodes[q]['id']) {
            ++p
          }
        }
        hash.push(this.graph_nodes[p])
      }
      this.graph_links = []
      for (var m = 0; m < this.relation_graphdata.length; m++) {
        for (var n = 0; n < this.relation_graphdata[m]['path'].length; n++) {
          var link = {}
          link['cate'] = m
          link['sourceLabel'] = this.relation_graphdata[m]['path'][n]['headLabel']
          link['targetLabel'] = this.relation_graphdata[m]['path'][n]['tailLabel']
          link['label'] = this.relation_graphdata[m]['path'][n]['relation']
          link['source'] = this.relation_graphdata[m]['path'][n]['headId']
          link['target'] = this.relation_graphdata[m]['path'][n]['tailId']
          link['des'] = this.relation_graphdata[m]['path'][n]['description']
          link['headName'] = this.relation_graphdata[m]['path'][n]['headName']
          link['tailName'] = this.relation_graphdata[m]['path'][n]['tailName']
          link['type'] = 'link'
          // link['description'] = this.relation_graphdata[m]['path'][n]['description']
          this.graph_links.push(link)
        }
      }

      // 根据实体标签筛选边
      this.final_links_first = []
      // final_links = this.graph_links
      for (var y = 0; y < this.graph_links.length; y++) {
        for (var g = 0; g < this.relation_chosennodelabel.length; g++) {
          if (this.graph_links[y]['sourceLabel'] === this.relation_chosennodelabel[g] || this.graph_links[y]['targetLabel'] === this.relation_chosennodelabel[g]) {
            this.final_links_first.push(this.graph_links[y])
          }
        }
      }
      // 根据边标签筛选边
      this.final_links_second = []
      for (var r = 0; r < this.final_links_first.length; r++) {
        for (var t = 0; t < this.relation_chosenedgelabel.length; t++) {
          if (this.final_links_first[r]['label'] === this.relation_chosenedgelabel[t]) {
            this.final_links_second.push(this.final_links_first[r])
          }
        }
      }
      // 根据实体标签筛选节点
      this.final_nodes = []
      for (var x = 0; x < hash.length; x++) {
        for (var h = 0; h < this.relation_chosennodelabel.length; h++) {
          if (hash[x]['label'] === this.relation_chosennodelabel[h]) {
            this.final_nodes.push(hash[x])
          }
        }
      }
      this.$store.dispatch('relation/setNodeData', hash)
      this.$store.dispatch('relation/setEdgeData', this.graph_links)
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
                des: node.label,
                category: node.category,
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
            categories: this.relation_category,
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
                  var keydes = x.data.label
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
                        keydes = keydes + ' ' + '临床建议: ' + valuea
                      }
                      if (keya === '证据级别' && x.data.label === '相互作用（化学名）' && valuea !== '') {
                        keydes = keydes + ' ' + '证据级别: ' + valuea
                      }
                      if (keya === '建议' && x.data.label === '适应证(药品分类,疾病)' && valuea !== '') {
                        keydes = keydes + ' ' + '建议: ' + valuea
                      }
                      if (keya === '建议' && x.data.label === '适应证(药品分类,疾病三级分类)' && valuea !== '') {
                        keydes = keydes + ' ' + '建议: ' + valuea
                      }
                      if (keya === '类型' && x.data.label === '禁忌证(药品分类,疾病)' && valuea !== '') {
                        keydes = keydes + ' ' + '类型: ' + valuea
                      }
                      if (keya === '类型' && x.data.label === '相互作用（化学名）' && valuea !== '') {
                        keydes = keydes + ' ' + '类型: ' + valuea
                      }
                      if (keya === '推荐优先级' && x.data.label === '联合用药方案' && valuea !== '') {
                        keydes = keydes + ' ' + '推荐优先级: ' + valuea
                      }
                      if (p_key === -1) {
                        i = i + 1
                      } else {
                        i = p_kuo + 1
                      }
                    }
                  }
                  return keydes
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
          if (param.data.type === 'node') {
          // 可以使用下面的方式进行路由的切换
          // alert(param.data.id)
            this.setBigshow3(5)
            this.set_Node_Id(param.data.id)
            this.set_Node_Label(param.data.label)
            this.set_Node_Name(param.data.name)
          }
        }
      )
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
      // this.chart.setOption(option)
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
      // for (const n in this.relation_chosenedge) {
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
      // for (const t in this.relation_chosenedge) {
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
