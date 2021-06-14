<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'
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
        let dataChart = []
        let legend = []
        for(let i = 0; i < data.length; i++) {
          let obj = {}
          obj.value = data[i].sum_num
          obj.name = data[i].col_name
          dataChart.push(obj)
          legend.push(data[i].col_name)
        }
        this.initChart(dataChart, legend)
      })
    },
    initChart(data, legend) {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: legend
        },
        series: [
          {
            name: 'data classification',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
