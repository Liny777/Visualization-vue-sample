/ *

* 知识图谱总览实体界面的右部分，图形部分。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div id="mychart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import axios from 'axios'
import { mapGetters,mapActions } from 'vuex'
require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'
import echarts from 'echarts'
import { Loading } from 'element-ui'
import { param } from '@/utils'
export default {
  // mixins: [resize],
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
      default: '700px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    catedata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timeout: null,
      loading: null,
      graph_category: [],
      graph_node: [],
      graph_link: [],
      temp_category: [],
      temp_node: [],
      temp_link: [],
      datas: [],
      chart: null
    }
  },
  computed: {
    ...mapGetters([
      'overview_entity_id',
      'overview_category_name',
      'overview_category_label'
    //   'histories'
    ])
  },
  watch: {
    overview_entity_id: function(val, oldVal) {
      console.log('overview_entity: ' + val)
      this.chart.dispose()
      this.loadEntityData(val)
    },
    overview_category_name: function(val, oldVal) {
      console.log('overview_entity: ' + val)
      this.chart.dispose()
      this.loadCateData(val)
    },
    overview_category_label: function(val,oldVal) {
      this.chart.dispose()
      this.loadData()
    }
  },
  created() {
    // this.datas = this.catedata
    // this.loadData()
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
  },
  methods: {
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
      {
        setentityid: 'overview/setEntityId',
        setcatename: 'overview/setCateName',
        setSmallShow1: 'overview/setSmallShow1',
        setSmallShow2: 'overview/setSmallShow2',
        setrelationlabel: 'overview/setRelationLabel',
        setrelationcate: 'overview/setRelationCate',
      }
    ),
    loadEntityData(val) {
      const url_en = this.$api + '/hugegraph1/IdfindEdge'
      console.log("11: " + val)
      const entity_id = {
        'category': val,
        'content': val
      }
      this.startLoading()
      axios.post(url_en, entity_id).then((response) => {
        this.endLoading()
        console.log(response.data)
        var count_node = 0
        var count_cate = 0
        var count_link = 0
        this.temp_category = []
        this.temp_node = []
        this.temp_link = []
        for(var i=0;i<response.data.length;i++){
          if(response.data[i]['ishave']==false) {
            var cate = {}
            cate['name'] = response.data[i]['inVName']
            this.temp_category[count_cate] = cate
            var node= {}
            node['name'] = response.data[i]['inVName']
            node['label'] = response.data[i]['inVLabel']
            node['id'] = response.data[i]['inV']
            node['category'] = count_cate
            node['symbolSize'] = 50
            node['type'] = 'node'
            node['description'] = response.data[i]['proper']
            this.temp_node[count_node] = node
          } else {
            if(i===0){
              // ------------------------中心节点
              var cate = {}
              cate['name'] = response.data[i]['inVName']
              this.temp_category[count_cate] = cate
              var node= {}
              node['name'] = response.data[i]['inVName']
              node['label'] = response.data[i]['inVLabel']
              node['id'] = response.data[i]['inV']
              node['category'] = count_cate
              node['symbolSize'] = 50
              node['type'] = 'node'
              node['description'] = response.data[i]['proper']
              this.temp_node[count_node] = node
              count_node = count_node + 1
              count_cate = count_cate + 1
              // --------------------------第一个邻居
              var cate2 = {}
              cate2['name'] = response.data[i]['outVName']
              this.temp_category[count_cate] = cate2
              var node2 = {}
              node2['name'] = response.data[i]['outVName']
              node2['label'] = response.data[i]['outVLabel']
              node2['id'] = response.data[i]['outV']
              node2['category'] = count_cate
              node2['symbolSize'] = 30
              node2['type'] = 'node'
              node2['description'] = response.data[i]['proper']
              this.temp_node[count_node] = node2
              count_cate = count_cate + 1
              count_node = count_node + 1
              // --------------------第一天边
              var link = {}
              link['source'] = response.data[i]['inV']
              link['target'] = response.data[i]['outV']
              link['label'] = response.data[i]['label']
              this.temp_link[count_link] = link
              count_link = count_link + 1
            } else {
              // --------------------------只需要存邻居就行了
              var cate2 = {}
              cate2['name'] = response.data[i]['outVName']
              this.temp_category[count_cate] = cate2
              var node2 = {}
              node2['name'] = response.data[i]['outVName']
              node2['label'] = response.data[i]['outVLabel']
              node2['id'] = response.data[i]['outV']
              node2['category'] = count_cate
              node2['symbolSize'] = 30
              node2['type'] = 'node'
              node2['description'] = response.data[i]['proper']
              this.temp_node[count_node] = node2
              count_cate = count_cate + 1
              count_node = count_node + 1
              // --------------------第一天边
              var link = {}
              link['source'] = response.data[i]['inV']
              link['target'] = response.data[i]['outV']
              link['label'] = response.data[i]['label']
              this.temp_link[count_link] = link
              count_link = count_link + 1
            }
            
          }
        }
        this.graph_category = []
        this.graph_node = []
        this.graph_link = []
        this.graph_category = this.temp_category
        this.graph_node = this.temp_node
        this.graph_link = this.temp_link
        this.entity_initChart()
      })
    },
    loadCateData(val) {
      const url_entity = this.$api + '/restfulController/getVerticesNoPage'
      const entity_category = {
        'category': val,
        'content': val
      }
      console.log('val: ' + val)
      this.startLoading()
      axios.post(url_entity, entity_category).then((response) => {
        this.endLoading()
        // console.log(response.data)
        // console.log(response.data.length)
        // console.log(response.data[2].length)
        var count_node = 0
        var count_cate = 0
        var count_link = 0
        this.temp_category = []
        this.temp_node = []
        this.temp_link = []
        // console.log("response1 : " + response.data)
        // console.log("response: " + response.data.length)
        // console.log("response: " + response.data[0].length)
        // console.log("response: " + response.data[1].length)
        for (var i = 0; i<response.data.length;i++) 
        {
          for (var j=0;j<response.data[i].length;j++) 
          {
            // 第一波，不管有没有邻居都要存中心节点
            if(j==0)
            {
              // 先存储中心节点
              // var cate = {}
              // console.log("1")
              // cate['name'] = response.data[i][j]['inVName']
              // this.temp_category[count_cate] = cate
              var node = {}
              // console.log("2")
              node['name'] = response.data[i][j]['inV']
              node['vlabel'] = response.data[i][j]['inVName']
              //  console.log("3")
              node['label'] = response.data[i][j]['inVLabel']
              //  console.log("4")
              node['id'] = response.data[i][j]['inV']
              node['category'] = count_cate
              node['symbolSize'] = 50
              node['type'] = 'node'
              // console.log("5")
              this.temp_node[count_node] = node
              count_node = count_node + 1
              
              // 如果有邻居，再存其邻居节点
              if( response.data[i][j]['ishave'] === true) 
              {
                // count_cate = count_cate + 1
                // var cate2 = {}
                // console.log("6")
                // cate2['name'] = response.data[i][j]['inVName'] + "'的邻居"
                // console.log("7")
                // this.temp_category[count_cate] = cate2
                var node2 = {}
                // console.log("8")
                node2['name'] = response.data[i][j]['outV']
                node2['vlabel'] = response.data[i][j]['outVName']
                // console.log("9")
                node2['label'] = response.data[i][j]['outVLabel']
                // console.log("10")
                node2['id'] = response.data[i][j]['outV']
                node2['category'] = count_cate
                node2['symbolSize'] = 30
                node2['type'] = 'node'
                // console.log("11")
                this.temp_node[count_node] = node2
                count_node = count_node + 1
                // count_cate = count_cate + 1
                // 存储第一条边
                var link = {}
                // console.log("12")
                link['source'] = response.data[i][j]['inV']
                // console.log("13")
                link['target'] = response.data[i][j]['outV']
                // console.log("14")
                link['label'] = response.data[i][j]['label']
                link['type'] = 'edge'
                // console.log("15")
                this.temp_link[count_link] = link
                count_link = count_link + 1
              }
            } 
            else // 必然有边，因为已经是第二个邻居了
            {
              // 只需要存储outNode就行了
              if( response.data[i][j]['ishave'] === true) {
                var node3 = {}
                // console.log("16")
                node3['name'] = response.data[i][j]['outV']
                node3['vlabel'] = response.data[i][j]['outVName']
                // console.log("17")
                node3['label'] = response.data[i][j]['outVLabel']
                // console.log("18")
                node3['id'] = response.data[i][j]['outV']
                node3['category'] = count_cate
                node3['symbolSize'] = 30
                node3['type'] = 'node'
                // console.log("19")
                this.temp_node[count_node] = node3
                count_node = count_node + 1
                var link = {}
                // console.log("20")
                link['source'] = response.data[i][j]['inV']
                // console.log("21")
                link['target'] = response.data[i][j]['outV']
                // console.log("22")
                link['label'] = response.data[i][j]['label']
                link['type'] = 'edge'
                // console.log("23")
                this.temp_link[count_link] = link
                count_link = count_link + 1
              }
            }
            // if(j==(response.data[i].length-1) && j!==0){
            //   count_cate = count_cate + 1
            // }
          }
          // count_cate = count_cate + 1
        }
        this.graph_category = []
        this.graph_node = []
        var count = 0
        var len = this.temp_node.length
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



        this.graph_link = []
        // this.graph_category = this.temp_category
        // this.graph_node = this.temp_node
        this.graph_link = this.temp_link
        // console.log("category")
        // for(var n=0;n<this.temp_category.length;n++){
        //   console.log(this.temp_category[n])
        // }
        // console.log("node")
        // for(var n=0;n<this.temp_node.length;n++){
        //   console.log(this.temp_node[n])
        // }
        // console.log("link")
        // for(var n=0;n<this.temp_link.length;n++){
        //   console.log(this.temp_link[n])
        // }
        this.category_initChart()
      })
    },
    loadData() {
      // console.log('hello')
      // console.log('nodechart0: ' + this.datas[0]['children'][0]['label'])
      const url = this.$api + '/restfulController/getAllvertexlabel'
      this.startLoading()
      axios.get(url).then((response) => {
        this.endLoading()
        var num = 0
        console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          for (var j = 0; j < response.data[i].length; j++) {
            // console.log('nodechart: ' + response.data[i]['children'][j]['label'])
            if (j !== 0) {
              var cate = {}
              cate['name'] = response.data[i][j]
              var node = {}
              node['name'] = response.data[i][j]
              node['category'] = num
              node['symbolSize'] = 50
              node['type'] = 'node'
              this.graph_category[num] = cate
              this.graph_node[num] = node
              num++
            }
          }
        }
        var num1 = 0
        // for (var m = 0; m < this.graph_node.length; m++) {
        //   for (var n = 0; n < this.graph_node.length; n++) {
        //     if (n !== m) {
        //       var link = {}
        //       link['source'] = this.graph_node[m].name
        //       link['target'] = this.graph_node[n].name
        //       this.graph_link[num1] = link
        //       num1++
        //     }
        //   }
        // }
        const url_edge = this.$api + '/restfulController/getAllEdgelabel'
        axios.get(url_edge).then((response1) => {
          console.log(response1.data)
          for(var e=0;e<response1.data.length;e++) {
             var link = {}
              link['source'] = response1.data[e]['inVLabel']
              link['target'] =  response1.data[e]['outVLabel']
              link['label'] =  response1.data[e]['label']
              link['type'] = 'edge'
              this.graph_link[e] = link
          }
          this.initChart()
        })
        // var link = {}
        // link['source'] = '一级疾病'
        // link['target'] = '二级疾病'
        // link['label'] = '疾病一级分类'
        // link['type'] = 'edge'
        // this.graph_link[0] = link
        // var link = {}
        // link['source'] = '二级疾病'
        // link['target'] = '三级疾病'
        // link['label'] = '疾病二级分类'
        // link['type'] = 'edge'
        // this.graph_link[1] = link
        // var link = {}
        // link['source'] = '药品类型'
        // link['target'] = '药品化学名'
        // link['label'] = '药品化学名分类'
        // link['type'] = 'edge'
        // this.graph_link[2] = link
        // var link = {}
        // link['source'] = '药品化学名'
        // link['target'] = '药品商品名'
        // link['label'] = '商品名'
        // link['type'] = 'edge'
        // this.graph_link[3] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '治疗目标'
        // link['label'] = '治疗目标'
        // link['type'] = 'edge'
        // this.graph_link[4] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '药物治疗方案'
        // link['label'] = '药物治疗方案'
        // link['type'] = 'edge'
        // this.graph_link[5] = link
        // var link = {}
        // link['source'] = '药物治疗方案'
        // link['target'] = '给药方式'
        // link['label'] = '给药方式'
        // link['type'] = 'edge'
        // this.graph_link[6] = link
        // var link = {}
        // link['source'] = '药品化学名'
        // link['target'] = '药品化学名'
        // link['label'] = '相互作用'
        // link['type'] = 'edge'
        // this.graph_link[7] = link
        // var link = {}
        // link['source'] = '药物治疗方案'
        // link['target'] = '药品类型'
        // link['label'] = '治疗药物'
        // link['type'] = 'edge'
        // this.graph_link[8] = link
        // var link = {}
        // link['source'] = '药物治疗方案'
        // link['target'] = '联合用药'
        // link['label'] = '治疗药物'
        // link['type'] = 'edge'
        // this.graph_link[9] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '人群'
        // link['label'] = '所属人群'
        // link['type'] = 'edge'
        // this.graph_link[10] = link
        // var link = {}
        // link['source'] = '药物治疗选择层级'
        // link['target'] = '联合用药'
        // link['label'] = '治疗药物'
        // link['type'] = 'edge'
        // this.graph_link[11] = link
        // var link = {}
        // link['source'] = '药物治疗选择层级'
        // link['target'] = '药品类型'
        // link['label'] = '治疗药物'
        // link['type'] = 'edge'
        // this.graph_link[12] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '治疗效果'
        // link['label'] = '治疗效果'
        // link['type'] = 'edge'
        // this.graph_link[13] = link
        // var link = {}
        // link['source'] = '药物治疗选择层级'
        // link['target'] = '药物治疗选择层级'
        // link['label'] = '药物治疗选择步骤'
        // link['type'] = 'edge'
        // this.graph_link[14] = link
        // var link = {}
        // link['source'] = '药物治疗方案'
        // link['target'] = '药物治疗选择层级'
        // link['label'] = '起始治疗层级'
        // link['type'] = 'edge'
        // this.graph_link[15] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '三级疾病'
        // link['label'] = '患有疾病'
        // link['type'] = 'edge'
        // this.graph_link[16] = link
        // var link = {}
        // link['source'] = '患者'
        // link['target'] = '二级疾病'
        // link['label'] = '患有疾病'
        // link['type'] = 'edge'
        // this.graph_link[17] = link
        // var link = {}
        // link['source'] = '二级疾病'
        // link['target'] = '三级疾病'
        // link['label'] = '并发症'
        // link['type'] = 'edge'
        // this.graph_link[18] = link
        // this.initChart()
      })
    },
      entity_initChart() {
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
            if(x.data.type === 'node') {  
              var val = x.data.des
              console.log("val: "+ val)
            var json1 = JSON.parse(x.data.des);
            var keydes = ''
            keydes = '<div style="height:300px;width:300px;overflow-y:scroll;overflow-x:scroll;"">'
            for(var i in json1)
            {
                keydes = keydes + '<p>' + i+" : "+json1[i] + '</p>'
                // console.log(i+":"+json1[i])
              
            }

            // var ind = 1
            // var val = x.data.des
            // console.log("val: "+ val)
            // while( ind< x.data.des.length && ind>0) {
              
              
            //   var p_key_left = val.indexOf('"',ind) 
            //   if(p_key_left > 0){
            //     ind = p_key_left + 1
            //     p_key_left = p_key_left + 1
            //   } else {
            //     break
            //   }
              
            //   var p_key_right = val.indexOf('"',ind)
            //   if(p_key_right > 0) {
            //     ind = p_key_right + 1
            //     p_key_right = p_key_right - 2
            //   } else {
            //     break
            //   }
            //   var key = val.substr(p_key_left,p_key_right)
            //   // ind = p_key_right + 1
            //   // var key = val.substr(p_key_left+1,p_key_left+1)
            //   // var p_key_right = val.indexOf('"',i+1)
            //   // var p_value_left = val.indexOf('"',p_key_right+1)
            //   // var p_value_right = val.indexOf('"',p_value_left+1)
            //   // var key = val.substring(p_key_left+1,p_key_right-1)
            //   // var value = val.substring(p_value_left+1,p_value_right-1)
            //   console.log("key: " + key)
            //   // i = i + 1
            //   // console.log("value: " + value)
              
            //   // ind = p_key_left + 1
            //   // console.log("i: " + p_key_left)
            //   // i = p_value_right + 1
            // }

            // var keydes = ''
            // keydes = '<div style="height:100px;width:300px;overflow-y:scroll;overflow-x:scroll;"">'
            keydes = keydes +  '</div>'
            return keydes
            } else {
              return x.data.label
            }
            
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
            data: this.graph_node.map(function(node) {
              return {
                id: node.id,
                name: node.name,
                label: node.label,
                category: node.category,
                type: node.type,
                symbolSize: node.symbolSize,
                des: node.description,
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
      // this.chart.showLoading({
      //   text: 'loading',
      //   color: '#c23531',
      //   textColor: '#000',
      //   maskColor: 'rgba(255, 255, 255, 0.2)',
      //   zlevel: 0
      // })
      // setTimeout(() => {
      //   // setOption前隐藏loading事件
      //   this.chart.hideLoading()
      //   this.chart.setOption(option)
      // }, 1000)
      this.chart.setOption(option)
      this.chart.on(
        'click',
        (param) => {
          if (param.data.type === 'node') {
            this.setentityid(param.data.id)
          }
        }
      )
    },
    category_initChart(){
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
        // legend: [{
        //   show: true
        // }],
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
            data: this.graph_node.map(function(node) {
              return {
                id: node.id,
                name: node.name,
                label: node.label,
                category: node.category,
                type: node.type,
                vlabel: node.vlabel,
                symbolSize: node.symbolSize,
                itemStyle: { // ===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                  normal: { // 默认样式
                    label: {
                      show: true,
                      // formatter:function(params){ //标签内容
                      //                  return  params.vlabel
                      //              },
                    },
                    borderType: 'solid', // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor: 'rgba(255,215,0,0.4)', // 设置图形边框为淡金色,透明度为0.4
                    borderWidth: 0, // 图形的描边线宽。为 0 时无描边。
                    opacity: 1
                  },
                  emphasis: { // 高亮状态
                    label: {
                      show: true,
                      // formatter:function(params){ //标签内容
                      //                  return  params.vlabel
                      //              },
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
                formatter:function(params){ //标签内容
                                       return  params.data.vlabel
                                   },
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
      // this.chart.showLoading({
      //   text: 'loading',
      //   color: '#c23531',
      //   textColor: '#000',
      //   maskColor: 'rgba(255, 255, 255, 0.2)',
      //   zlevel: 0
      // })
      // setTimeout(() => {
      //   // setOption前隐藏loading事件
      //   this.chart.hideLoading()
      //   this.chart.setOption(option)
      // }, 1000)
      this.chart.setOption(option)
      this.chart.on(
        'click',
        (param) => {
           if (param.data.type === 'node') {
          this.setentityid(param.data.id)
          }
        //    if(param.data.type === 'edge') {
        //   // this.setentityid(param.data.id)
        //   this.setrelationcate(param.data.label)
        //   this.setSmallShow1(false)
        // this.setSmallShow2(true)
        //   }
        } 
       
      )
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('mychart'), 'macarons')
      this.chart.setOption({
        backgroundColor: '#ffffff',
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
         tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function(x) {
            return x.data.label
          }
        },
        legend: [{
          show: true,
          padding: [0, 100, 0, 0]
        }],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true
            },
            data: this.graph_node,
            links: this.graph_link,
            categories: this.graph_category,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}',
              show: true,
              textStyle: { fontSize: 16 }
            },
            lineStyle: {
              color: 'source',
              curveness: 0.4,
              width: 3
            }
          }
        ]
      })
      this.chart.on(
        'click',
        (param) => {
            if (param.data.type === 'node') {
           this.setcatename(param.name)
        } if(param.data.type === 'edge') {
          // this.setentityid(param.data.id)
          this.setrelationcate(param.data.label)
          this.setSmallShow1(false)
        this.setSmallShow2(true)
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
