/ *

 * 系统主界面——立方体

* 就一个展示的页面

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <!-- <el-container class="body"> -->
  <el-row>
    <el-row  type="flex" class="row-bg" justify="center">
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <div>
              <h3 style="color: #3685de; text-align:center">
                多样的图谱可视化展示
              </h3>
            </div>
            <p style=" text-indent:2em;text-align: left;line-height: 30px; text-align:center">
              服务平台提供多样的视图多维度全方位的展示医学知识图谱的schema以及实例数据，
              并提供可视化搜索引擎，使医学知识可以更直观的展示。
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="height: 535px;border-style:solid;border-width:1px;background-color: #FFFFFF">
            <el-tree
              :data="data"
              default-expand-all:true
              highlight-current
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="10" :push="2">
                Label: {{ search_nodelabel }}
              </el-col>
              <el-col :span="10" :push="2">
                Name: {{ search_nodename }}
              </el-col></el-row>
            <el-row id="mychart" style="height: 497px;border-style:solid;border-width:1px;background-color: #FFFFFF" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
  <!-- </el-container> -->
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
  props: {
    dataHeight: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null,
      data: [{
        label: '药品化学名',
        children: [{
          label: '氯吡格雷',
          id: '383437495502635008',
          name: '药品化学名'
        }, {
          label: '维生素D2',
          id: '383440934471204864',
          name: '药品化学名'
        }]
      }, {
        label: '药品商品名',
        children: [{
          label: '卡托普利-曙光药业',
          id: '352457585380556800',
          name: '药品商品名'
        }, {
          label: '格平',
          id: '352457585099538432',
          name: '药品商品名'
        }]
      }, {
        label: '疾病三级分类',
        children: [{
          label: '老年人原发性高血压',
          id: '394181735442546688',
          name: '疾病三级分类'
        }, {
          label: '高血压合并肾病',
          id: '394181688613142528',
          name: '疾病三级分类'
        }]
      }, {
        label: '人群',
        children: [{
          label: '老年人',
          id: '352445739932057600',
          name: '人群'
        }, {
          label: '孕妇',
          id: '359014636109955072',
          name: '人群'
        }]
      }, {
        label: '药品分类',
        children: [{
          label: '调脂药物 [Dyslipidaemic Agents]',
          id: '352448039983513601',
          name: '药品分类'
        }, {
          label: '周围血管扩张药和脑激活剂 [Peripheral Vasodilato]',
          id: '352448039979319296',
          name: '药品分类'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      graph_categories: [],
      graph_nodes: [],
      graph_links: [],
      graph_length: 0,
      temp_option: [],
      search_nodeid: '',
      search_nodename: '',
      search_nodelabel: ''
    }
  },
  created() {
    // this.load()
  },
  mounted() {
    this.$nextTick(() => {
      this.load()
    })
    this.load()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    // this.chart = null
  },
  methods: {
    handleNodeClick(data) {
      console.log(data.label + ' ' + data.id + ' ' + data.name + ' ')
      this.search_nodeid = data.id
      this.search_nodename = data.name
      this.search_nodelabel = data.label
      if (data.id !== '' && data.name !== '' && data.label !== '' && data.id !== undefined && data.name !== undefined && data.label !== undefined) {
        this.loadData()
      }
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
    loadData() {
      console.log('wolaiguo' + this.search_nodeid)
      const url = this.$api + '/hugegraph/IdfindEdge'
      var params =
        {
          'category': '',
          'content': ''
        }
      params['content'] = this.search_nodeid
      this.startLoading()
      axios.post(url, params).then((response) => {
        this.endLoading()
        var receive = response.data
        console.log('jinlaile: ' + response.data)
        // this.temp_option = []
        this.graph_nodes = []
        this.graph_categories = []
        this.graph_links = []
        this.graph_length = 0
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
          node1['symbolSize'] = 30
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
          }
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
            // console.log("x",x)
            // var keydes = ''
            var keydes = '<div style="height:300px;width:300px;overflow-y:auto;overflow-x:auto;"">'
            keydes = keydes + x.data.des + '</div>'
            return keydes
          }
        },
        legend: [{
          show: true
        }],
        animation: false,
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.graph_nodes,
            links: this.graph_links,
            categories: this.graph_categories,
            roam: true,
            label: {
              position: 'bottom',
              formatter: '{b}',
              show: true
            },
            draggable: true,
            force: {
              repulsion: 300, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.01, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 350, // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            edgeSymbol: ['circle', 'arrow'], // -----
            edgeLabel: {
              normal: {
                show: true,
                formatter: function(x) { return x.data.label }
              }
            }}
        ] }
      this.chart.on(
        'click',
        (param) => {
          // 可以使用下面的方式进行路由的切换
          // alert(param.data.id)
          this.search_nodeid = param.data.id
          this.search_nodelabel = param.data.label
          this.search_nodename = param.data.name
          this.loadData()
        }
      )
      this.chart.setOption(option)
    },
    pathdirect() {
      this.$router.push({ name: 'MainPage', params: { userId: 1 }})
    },
    relationdirect() {
      this.$router.push({ name: 'MainPage', params: { userId: 2 }})
    },
    searchdirect() {
      this.$router.push({ name: 'MainPage', params: { userId: 3 }})
    },
    edgedirect() {
      this.$router.push({ name: 'MainPage', params: { userId: 4 }})
    },
    load() {
      var cube = document.querySelector('.cube')
      var imageButtons = document.querySelector('.image-buttons')
      var cubeImageClass = cube.classList[1]
      // Add click event listener to image buttons container
      imageButtons.addEventListener('click', function(e) {
        // Get node type and class value of clicked element
        var targetNode = e.target.nodeName
        var targetClass = e.target.className
        // Check if image input has been clicked and isn't the currently shown image
        if (targetNode === 'BUTTON' && targetClass !== cubeImageClass) {
          console.log('Show Image: ' + targetClass.charAt(11))

          // Replace previous cube image class with new class
          cube.classList.replace(cubeImageClass, targetClass)

          // Update cube image class variable with new class
          cubeImageClass = targetClass
        }
      })
    }

  }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:500);
.el-row {
    margin-bottom: 20px;
  }
.text {
  text-align: center;
  /* margin-left: 80px; */
}
/* .right { */
  /* float: right; */
  /* margin-left: -300px; */
  /* position:relative; */
  /* overflow:hidden; */
/* } */
.cube-container {
	position: relative;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: 50px;
  margin-bottom: 100px;
	width: 300px;
	height: 300px;
	/* margin: 100px 150px 100px; */
	perspective: 100rem;
}

.cube {
	position: absolute;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: transform 1s cubic-bezier(0.32, 0.05, 0.35, 1.6);
}

.cube-face-image {
	display: block;
	position: absolute;
	opacity: 0.95;
	border: 0.2rem solid #3685de;
  box-shadow: rgb(11, 234, 235) 0px 0px 10px inset
	/* box-shadow: 0 0 100px #e70,
				0 0 300px var(--border-color),
				0 0 900px var(--border-color); */
}

.image-buttons {
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-gap: 1.5rem;
	justify-content: center;
}

/* Transform images to create cube */

.image-1 {
	transform: translateZ(190px);
}

.image-2 {
	transform: rotateX(-180deg) translateZ(190px);
}

.image-3 {
	transform: rotateY(90deg) translateZ(190px);
}

.image-4 {
	transform: rotateY(-90deg) translateZ(190px);
}

.image-5 {
	transform: rotateX(90deg) translateZ(190px);
}

.image-6 {
	transform: rotateX(-90deg) translateZ(190px);
}

/* Transform cube to show correct image */

.cube.initial-position {
	transform: translateZ(-190px) translateY(-100px) rotateX(-15deg) rotateY(18deg) rotateZ(2deg);
}

.cube.show-image-1 {
	transform: translateZ(-190px);
}

.cube.show-image-2 {
	transform: translateZ(-190px) rotateX(180deg);
}

.cube.show-image-3 {
	transform: translateZ(-190px) rotateY(-90deg);
}

.cube.show-image-4 {
	transform: translateZ(-190px) rotateY(90deg);
}

.cube.show-image-5 {
	transform: translateZ(-190px) rotateX(-90deg);
}

.cube.show-image-6 {
	transform: translateZ(-190px) rotateX(90deg);
}
.show-image-1 {
  /* visibility:hidden */
  /* color: #fff; */
  color: #3685de;
  cursor: pointer;
  font-size: 18px;
  /* font-weight: 400; */
  line-height: 45px;
  margin: 0 0 2em;
  max-width: 350px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  background: #FFFFFF;
  font-weight: bold;
}
.show-image-1:hover {
  text-decoration: none;
   background: rgba(225, 51, 45, 0);
  font-weight: 900;
  letter-spacing: 1px;
}
.show-image-1 svg {
  pointer-events:none;
  height: 45px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.show-image-1 rect {
  fill: none;
  stroke: #009966;
  stroke-width:0;
  stroke-dasharray: 422, 0;
  transition: all 0.35s linear;
}
.show-image-1:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.show-image-2 {
  /* visibility:hidden */
  color: #3685de;
  cursor: pointer;
  font-size: 18px;
  /* font-weight: 400; */
  line-height: 45px;
  margin: 0 0 2em;
  max-width: 350px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  background: #FFFFFF;
  font-weight: bold;
}
.show-image-2:hover {
  text-decoration: none;
   background: rgba(225, 51, 45, 0);
  font-weight: 900;
  letter-spacing: 1px;
}
.show-image-2 svg {
  pointer-events:none;
  height: 45px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.show-image-2 rect {
  fill: none;
  stroke: #009966;
  stroke-width: 0;
  stroke-dasharray: 422, 0;
  transition: all 0.35s linear;
}
.show-image-2:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.show-image-3 {
  /* visibility:hidden */
  color: #3685de;
  cursor: pointer;
  font-size: 18px;
  /* font-weight: 400; */
  line-height: 45px;
  margin: 0 0 2em;
  max-width: 350px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  background: #FFFFFF;
  font-weight: bold;
}
.show-image-3:hover {
  text-decoration: none;
   background: rgba(225, 51, 45, 0);
  font-weight: 900;
  letter-spacing: 1px;
}
.show-image-3 svg {
  pointer-events:none;
  height: 45px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.show-image-3 rect {
  fill: none;
  stroke: #009966;
  stroke-width: 0;
  stroke-dasharray: 422, 0;
  transition: all 0.35s linear;
}
.show-image-3:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.show-image-4 {
  /* visibility:hidden */
  color: #3685de;
  cursor: pointer;
  font-size: 18px;
  /* font-weight: 400; */
  line-height: 45px;
  margin: 0 0 2em;
  max-width: 350px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  background: #FFFFFF;
  font-weight: bold;
}
.show-image-4:hover {
  text-decoration: none;
   background: rgba(225, 51, 45, 0);
  font-weight: 900;
  letter-spacing: 1px;
}
.show-image-4 svg {
  pointer-events:none;
  height: 45px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.show-image-4 rect {
  fill: none;
  stroke: #009966;
  stroke-width: 0;
  stroke-dasharray: 422, 0;
  transition: all 0.35s linear;
}
.show-image-4:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
/* .show-image-4 {
  visibility:hidden
/* } */
.show-image-5 {
  visibility:hidden
}
.show-image-6 {
  visibility:hidden
}
/* html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0} */
</style>
