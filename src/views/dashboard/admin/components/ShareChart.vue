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
      elecDocument: 0,
      list_entity: [],
      list_relation: []
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
    getEntityRelation(source) {
      const url = this.$api + '/FileMarks/getFileMark'
      this.listLoading = true
      axios.get(url)
        .then((response) => {
          // console.log(response)
          const { data } = response
          console.log(data)
          let count = 0
          data.forEach((e) => {
            const document_id = e.document_id
            const document_type = e.document_type
            this.document_type = e.document_type
            e.object_marks.forEach((f) => {
              const object_type = f.object_type
              f.objects.forEach((g) => {
                const item = { document_id: document_id, document_type: document_type,
                  object_type: object_type, description: '', iCD_11: '', type: '', name: '', time: '' , is_checked: '', is_passed: ''}
                //const obj = {}
                item.name = g.name
                item.iCD_11 = g.iCD_11
                item.description = g.description
                item.time = g.mark_time
                item.is_checked = g.is_checked
                item.is_passed = g.is_passed
                this.list_entity.push(item)
              })
            })
            e.relation_marks.forEach((f) => {
                const start_type = f.start_type
                const relation_type = f.relation_type
                const end_type = f.end_type
                f.relations.forEach((g) => {
                  count = count + 1
                  const item = { document_id: document_id, document_type: document_type, id: count,
                    start_type: start_type, relation_type: relation_type, end_type: end_type,
                    start_object: g.start_object, end_object: g.end_object, advice: g.advice,
                    evi_level: g.evi_level, evi_describe: g.evi_describe, group: g.group, is_checked: g.is_checked, is_passed: g.is_passed}

                  this.list_relation.push(item)
                
                })
              })
          })
          let relation_ok = ["Relation qualified"]
          let relation_no = ["Relation unqualified"]
          let entity_ok = ["Entity qualified"]
          let entity_no = ["Entity unqualified"]
          for(let i = 0; i < source[0].length; i++) {
            let count1 = 0
            let count2 = 0
            let count3 = 0
            let count4 = 0
            for (let j = 0; j < this.list_entity.length; j++) {
              if (source[0][i] === this.list_entity[j].document_type) {
                if (this.list_entity[j].is_checked === true && this.list_entity[j].is_passed === true) {
                  count1 = count1 + 1
                }else if (this.list_entity[j].is_checked === true && this.list_entity[j].is_passed === false) {
                  count2 = count2 + 1
                }
              }
            }
            for (let k = 0; k < this.list_relation.length; k++) {
              if (source[0][i] === this.list_relation[k].document_type) {
                if (this.list_relation[k].is_checked === true && this.list_relation[k].is_passed === true) {
                  count3 = count3 + 1
                }else if (this.list_relation[k].is_checked === true && this.list_relation[k].is_passed === false) {
                  count4 = count4 + 1
                }
              }
            }  
            entity_ok.push(count1)
            entity_no.push(count2)
            relation_ok.push(count3)
            relation_no.push(count4)

          }
          source[0].unshift("product")
          source.push(entity_ok)
          source.push(entity_no)
          source.push(relation_ok)
          source.push(relation_no)
          console.log(source)
          this.initChart(source)
        })
    },
    getAllItem() {
      const url = this.$api + '/Item/getAll'
      axios.get(url).then((response) => {
        console.log('Item')
        console.log(response)
        let data = response.data
        console.log(data)
        let source = []
        let product = []
        
        for(let i = 0; i < data.length; i++) {
          product.push(data[i].col_name)
        }
        source.push(product)
        console.log(source)
        this.getEntityRelation(source)
      })
    },
    initChart(source) {
      console.log(source)
      this.chart = echarts.init(this.$el, 'macarons')
      let option = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: true
        },
        dataset: {
            source: source
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                emphasis: {focus: 'data'},
                label: {
                    formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                }
            }
        ]
    };
    let self = this
    this.chart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            self.chart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    })

    this.chart.setOption(option)
    }
    // getAllItem() {
    //   const url = 'http://localhost:10088/Item/getAll'
    //   axios.get(url).then((response) => {
    //     console.log('Item')
    //     console.log(response)
    //     let data = response.data
    //     console.log(data)
    //     for(let i = 0; i < data.length; i++) {
    //       this.sum = data[i].sum_num + this.sum
    //       this.marked_sum = data[i].mark_num + this.marked_sum
    //     }
    //     this.getPdfNum()
    //   })
    // },
    // getPdfNum() {
    //   const url = 'http://localhost:10088/Pdf/getNum'
    //   axios.get(url).then((response) => {
    //     this.elecDocument = response.data
    //     this.initChart()
    //   })
    // }
  }
}
</script>
