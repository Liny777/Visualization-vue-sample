/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 搜索查询功能 —— 第一页

* 查找的医学数据类别

* @author Lin Youguang

* @version 2.1

* @deprecated

*/
<template>
  <div>
    <div>
      <el-row class="item-head">
        <el-col :span="6" class="function-title">
          实体查询功能
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" class="function-content">
          请先选择要查找的类别，然后在类别下查找要查找的实体。最后，您将看到实体的详细信息。
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
      graph_length: 0,
      graph: {},
      chart: null
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    search_bigshow5: function(val, oldVal) {
      if (val === 1) {
        this.loadData()
      }
    }
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
  created() {
  },
  methods: {
    ...mapActions(
      {
        // search
        search_setBigShow5: 'search/setBigShow5',
        search_setNodeCategory: 'search/setNodeCategory'
      }
    ),
    loadData() {
      axios.get(this.$api + '/MongoDB/getEntityType').then((response) => {
        this.graph_length = 0
        this.graph_length = response.data.length
        var num = 0

        for (var i = 0; i < this.graph_length; i++) {
        // 类别legend
          var cate = {}
          cate['name'] = response.data[i].name
          // 节点
          var node = {}
          node['name'] = response.data[i].name
          node['category'] = i
          node['symbolSize'] = 50
          this.graph_categories[i] = cate
          this.graph_nodes[i] = node
          for (var j = 0; j < response.data[i].link.length; j++) {
            var link = {}
            link['source'] = response.data[i].name
            link['target'] = response.data[i].link[j][0]
            this.graph_links[num] = link
            num++
          }
        }
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('mychart'), 'macarons')
      this.chart.setOption({
        backgroundColor: '#ffffff',
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
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
            data: this.graph_nodes,
            links: this.graph_links,
            categories: this.graph_categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}',
              show: true,
              textStyle: { fontSize: 16 }
            },
            lineStyle: {
              color: 'source',
              curveness: 0.6,
              width: 3
            }

          }
        ]
      })
      this.chart.on(
        'click',
        (param) => {
          this.search_setBigShow5(0)
          this.search_setNodeCategory(param.name)
        }
      )
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
    margin-left: 40px;
    font-size: 15px;
    color: #999;
    text-align:justify;
    word-break:break-all;
    line-height: 150%;
    font-family: 'STKaiti';
  }
</style>
