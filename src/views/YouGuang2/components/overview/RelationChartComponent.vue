/ *


* 知识图谱总览关系界面的右部分，图形部分。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div id="mychart1" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
import echarts from 'echarts'
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
    props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1000px'
    },
    height: {
      type: String,
      default: '700px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      graph_category: [],
      graph_node: [],
      graph_link: [],
      temp_category: [],
      temp_node: [],
      temp_link: [],
       data1: 
       [
         {
           name: '医学知识图谱关系总览',
           children:
           [
             {
              name: '疾病 - 疾病',
              children: [
              {
              name: '疾病一级分类（一级疾病 - 二级疾病）',
                // children: [{
                // name: '(一级疾病 , 二级疾病)'
                // }]
              }, {
            name: '疾病二级分类（二级疾病 - 三级疾病）',
            // children: [{
            //   name: '(二级疾病 , 三级疾病)'
            // }]
          },{
             name: '并发症（二级疾病 - 三级疾病）',
          }]
        },
        {
        name: '药品 - 药品',
        children: [
          {
            name: '商品名（药品类型 - 药品商品名）',
            // children: [{
            //   name: '(药品类型 , 药品化学名)'
            // }]
          }, {
            name: '药品相互作用（药品化学名 - 药品化学名）',
            // children: [{
            //   name: '(药品化学名 , 药品商品名)'
            // }]
            }, {
            name: '药品化学名分类（药品化学名 - 药品化学名）',
            // children: [{
            //   name: '(药品化学名 , 药品化学名)'
            // }
            // ]
          }]
        },
        {
        name: '治疗方案 - 治疗方案',
        children: [
          {
            name: '给药方式（药物治疗方案 - 给药方式）',       
          }, {
            name: '药物治疗选择步骤（药物治疗选择层级 - 药物治疗选择层级）',          
            }, {
            name: '药物治疗层级（药物治疗方案 - 药物治疗选择层级）',         
          }]
        }, {
        name: '治疗方案 - 药品',
        children: [
          {
            name: '治疗药物（药物治疗方案 - 药品类型）',       
          }, {
            name: '治疗药物（药物治疗方案 - 联合用药）',          
            }, {
            name: '治疗药物（药物治疗选择层级 - 联合用药）',         
          },{
            name: '治疗药物（药物治疗选择层级 - 药品类型）',         
          }]
        },{
        name: '患者 - 治疗方案',
        children: [
          {
            name: '治疗目标（患者 - 治疗目标）',       
          }, {
            name: '药物治疗方案（患者 - 药物治疗方案）',          
            }, {
            name: '治疗效果（患者 - 治疗效果）',         
          }]
        },{
        name: '患者 - 患者',
        children: [
          {
            name: '所属人群（患者 - 人群）',       
          }, {
            name: '患有疾病（患者 - 二级疾病）',          
            }]
        },{
        name: '患者 - 疾病',
        children: [
          {
            name: '患有疾病（患者 - 三级疾病）',       
          }]
        }

           ]
         }
       ]
    }
  },
  computed: {
    ...mapGetters([
      'overview_relation_cate',
      'overview_relation_label'
    //   'histories'
    ])
  },
  watch: {
    overview_relation_cate: function(val,oldVal) {
      this.chart.dispose()
      console.log('overview_entity: ' + val)
      this.initChart()
    },
    overview_relation_label: function(val,oldVal) {
      this.chart.dispose()
      console.log('overview_relation_label: ' + val)
      this.loadData(val)
    }
  },
  created() {
   
  },
  mounted() {
     this.$nextTick(() => {
      this.initChart()
    })
  },
   beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
  },
  methods: {
    loadData(val){
      const url = this.$api + '/restfulController/getEdgeNoPage'
      const data = {
        'category': val,
        'content': val
      }
      axios.post(url, data).then((response) => {
        console.log(response.data)
        var count_node = 0
        var count_cate = 0
        var count_link = 0
        this.temp_category = []
        this.temp_node = []
        this.temp_link = []
         this.graph_link = []
        for(var i=0;i<response.data.length;i++)
        {
        var node= {}
        node['name'] = response.data[i]['inVName']
        node['label'] = response.data[i]['inVLabel']
        node['id'] = response.data[i]['inV']
        node['symbolSize'] = 50
        node['type'] = 'node'
        this.temp_node[count_node] = node
        count_node = count_node + 1
        // --------------------------第一个邻居
        var node2 = {}
        node2['name'] = response.data[i]['outVName']
        node2['label'] = response.data[i]['outVLabel']
        node2['id'] = response.data[i]['outV']
        node2['symbolSize'] = 50
        node2['type'] = 'node'
        this.temp_node[count_node] = node2
        count_node = count_node + 1
        // --------------------第一天边
        var link = {}
        link['source'] = response.data[i]['inV']
        link['target'] = response.data[i]['outV']
        link['label'] = response.data[i]['label']
        link['description'] = response.data[i]['proper']
        link['type'] = 'link'
        this.graph_link[count_link] = link
        count_link = count_link + 1
        }
        var len = this.temp_node.length
        this.graph_node = []
        // var newArr = []
        this.graph_category = []
        var count = 0
        for(var i = 0; i < len; i++){
          for(var j = i+1; j < len; j++){
            if(this.temp_node[i]['name'] === this.temp_node[j]['name']){
                ++i;
            }
        }
        var cate = {}
        cate['name'] = this.temp_node[i]['id']
        this.temp_node[i]['category'] = count
        this.graph_category[count] = cate
        this.graph_node[count] = this.temp_node[i]
        count++
    }
         console.log("category")
        for(var n=0;n<this.graph_category.length;n++){
          console.log(this.graph_category[n])
        }
        console.log("node")
        for(var n=0;n<this.graph_node.length;n++){
          console.log(this.graph_node[n])
        }
        console.log("link")
        for(var n=0;n<this.graph_link.length;n++){
          console.log(this.graph_link[n])
        }
        // this.graph_category = []
        // this.graph_node = []
        // this.graph_link = []
        // this.graph_category = this.temp_category
        // this.graph_node = this.newArr
        // this.graph_link = this.temp_link
        this.category_initChart()
      })
    },
    category_initChart(){
          console.log("hello")
      this.chart = echarts.init(document.getElementById('mychart1'), 'macarons')
      var option = {
        title: {
          top: 'bottom',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function(x) {
                  if (x.data.type === 'node') {
              return x.data.label
            }
            if (x.data.type === 'link') {
              var keydes = ''
              keydes = '<div style="height:100px;width:300px;overflow-y:scroll;overflow-x:scroll;"">'
              keydes = keydes + x.data.des + '</div>'
              return keydes
            }
          }
        },
        // legend: [{
        //   show: true
        // }],
        // toolbox: {
        //   x: 'left',
        //   y: 'bottom',
        //   padding: [0, 0, 0, 40],
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        animation: false,
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.graph_node.map(function(node) {
              return {
                id: node.id,
                name: node.name,
                label: node.label,
                category: node.category,
                type: node.type,
                symbolSize: node.symbolSize,
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
            links: this.graph_link.map(function(edge) {
              return {
                source: edge.source,
                label: edge.label,
                target: edge.target,
                des: edge.description,
                type: edge.type,
                lineStyle: {
                  normal: {
                  color: 'rgba(30,144,255,0.4)',
                    width: '3',
                    type: 'dotted', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                    curveness: 0, // 线条的曲线程度，从0到1
                    opacity: 1
                  },
                  emphasis: { // 高亮状态
                    color: '#FFCC33',
                    opacity: 1
                  }
                }
              }
            }),
            categories: this.graph_category,
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
            // symbolSize: 15,
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
       console.log("hello")
      this.chart.setOption(option)
      // this.chart.on(
      //   'click',
      //   (param) => {
      //      if (param.data.type === 'node') {
      //     this.setentityid(param.data.id)}
      //   }
      // )
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('mychart1'))
      var options = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',

            data: this.data1,

            top: '1%',
            left: '14%',
            bottom: '1%',
            right: '40%',
label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 12
                },
              initialTreeDepth:2,
                leaves: {
                    label: {
                        position: 'bottom',
                                // rotate: -90,
                                verticalAlign: 'left',
                                align: 'left',
                                fontSize: 12,//文字的字体大小
                    }
                },

                emphasis: {
                    focus: 'descendant'
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750

          }
        ]
      }
      this.chart.setOption(options)
    }
  //   ...mapActions(
  //     { clearhistory: 'path/clearHistoryRecord' })
  }
}
</script>

<style scoped>

</style>
