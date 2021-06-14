<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'

const animationDuration = 6000

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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getAllItem()
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
    getAllItem() {
      const url = this.$api + '/Item/getAll'
      axios.get(url).then((response) => {
        console.log('Item')
        console.log(response)
        let data = response.data
        console.log(data)
        let legend = []
        let data1 = []
        let data2 = []
        for(let i = 0; i < data.length; i++) {
          data1.push(data[i].sum_num - data[i].mark_num)
          data2.push(data[i].mark_num)
          legend.push(data[i].col_name)
        }
        this.initChart(data1, data2, legend)
      })
    },
    initChart(data1, data2, legend) {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: legend,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'Unmarked',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: data1,
          animationDuration
        }, {
          name: 'Marked',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: data2,
          animationDuration
        }]
      })
    }
  }
}
</script>
