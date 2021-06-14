<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'
const animationDuration = 3000

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
      chart: null,
      sum: 0,
      marked_sum: 0,
      elecDocument: 0
    }
  },
  mounted() {
    
    this.$nextTick(() => {
      this.getAllItem()
      // this.getPdfNum()
      // this.initChart()
    })
  },
  created() {
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      
      console.log(this.sum)
      console.log(this.elecDocument)
      this.chart = echarts.init(this.$el, 'macarons')
      let option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // Use axis to trigger tooltip
                  type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
              }
          },
          legend: {
              data: ['电子文档/Electronic document', '文本数据/Text data']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: [ '占比']
          },
          series: [
              {
                  name: '电子文档/Electronic document',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [this.elecDocument]
              },
              {
                  name: '文本数据/Text data',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [this.sum]
              },
              
          ]
      };

      this.chart.setOption(option)
    },
    getAllItem() {
      const url = this.$api + '/Item/getAll'
      axios.get(url).then((response) => {
        console.log('Item')
        console.log(response)
        let data = response.data
        console.log(data)
        for(let i = 0; i < data.length; i++) {
          this.sum = data[i].sum_num + this.sum
          this.marked_sum = data[i].mark_num + this.marked_sum
        }
        this.getPdfNum()
      })
    },
    getPdfNum() {
      const url = this.$api + '/Pdf/getNum'
      axios.get(url).then((response) => {
        this.elecDocument = response.data
        this.initChart()
      })
    }
  }
}
</script>
