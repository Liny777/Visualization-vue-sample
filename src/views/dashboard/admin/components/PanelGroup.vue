<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="international" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            实体类型
          </div>
          <!-- <count-to :start-val="0" :end-val="visit_data" :duration="2000" class="card-panel-num" /> -->
          <count-to :start-val="0" :end-val="entity_label_num" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="clipboard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            实体实例
          </div>
          <count-to :start-val="0" :end-val="entity_num" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="tree" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            关系类型
          </div>
          <count-to :start-val="0" :end-val="relation_label_num" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="example" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            关系实例
          </div>
          <count-to :start-val="0" :end-val="relation_num" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import axios from 'axios'

export default {
  components: {
    CountTo
  },
  
  data () {
    return {
      visit_data: null,
      time: '',
      sum: 0,
      marked_sum: 0,
      elecDocument: 0,
      entity_label_num: 0,
      entity_num: 0,
      relation_label_num: 0,
      relation_num: 0
    }
  },
  mounted() {
    //this.getVisitedPeople()
    
  },
  created() {
    // this.insertVisitedPeople()
    // this.getAllItem()
    // this.getPdfNum()
    this.getEntityNum()
    this.getRelationNum()
  },
  methods: {
    getEntityNum(){
      const url = this.$api + '/hugegraph/get/entity/num'
      axios.get(url).then((response) => {
        let list = response.data[0]
        let count = Object.keys(list).length
        console.log(response.data[0])
        this.entity_label_num = count
        for (let [key, value] of Object.entries(list)) {
          this.entity_num = this.entity_num + value
        }
      })
    },
    getRelationNum(){
      const url = this.$api + '/hugegraph/get/relation/num'
      axios.get(url).then((response) => {
        let list = response.data[0]
        let count = Object.keys(list).length
        console.log(response.data[0])
        this.relation_label_num = count
        for (let [key, value] of Object.entries(list)) {
          this.relation_num = this.relation_num + value
        }
      })
    },
    insertVisitedPeople() {
      const url = this.$api + '/Visit/insertPeople'
      let item = JSON.parse(localStorage.getItem("data_user"))
      this.getTime()
      console.log(this.time)
      item.Date = this.time
      axios.post(url, item).then((response) => {
        console.log(response)
      })
    },
    getVisitedPeople() {
      const url = this.$api + '/Visit/getPeople'
      axios.get(url).then((response) => {
        console.log(response)
        this.visit_data = response.data
      })
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
      })
    },
    getPdfNum() {
      const url = this.$api + '/Pdf/getNum'
      axios.get(url).then((response) => {
        console.log(response)
        this.elecDocument = response.data
      })
    },
    getTime() {
      /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
      Date.prototype.Format = function(fmt) {
        var o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'S': this.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      }
      this.time = new Date().Format('yyyy-MM-dd hh:mm:ss')
    },
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
  }
}
</script>

<style lang="scss" scoped>

.card-panel-col {
  margin-bottom: 32px;
}

.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 0, 0, .05);

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-people {
      background: #40c9c6;
    }

    .icon-message {
      background: #36a3f7;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-shopping {
      background: #34bfa3
    }
  }

  .icon-people {
    color: #40c9c6;
  }

  .icon-message {
    color: #36a3f7;
  }

  .icon-money {
    color: #f4516c;
  }

  .icon-shopping {
    color: #34bfa3
  }

  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
