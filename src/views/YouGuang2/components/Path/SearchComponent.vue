/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 定向分析功能 —— 路径分析功能的子组件

* 定向分析是路径分析功能左侧三个功能的第一个功能，用于选择所要查询路径的起始节点以及终止节点。
* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <el-row style="height:20px" class="cut-off" />
    <el-row class="item1">
      <el-col :span="1" :push="1">
        <i class="el-icon-star-on" />
      </el-col>
      <el-col :span="14" class="start">
        起始节点
      </el-col>
    </el-row>
    <el-row>
      <el-col />
    </el-row>
    <el-row :gutter="24" class="item1-1">
      <el-col :span="4" :push="1" class="prefix-select">类别</el-col>
      <el-col :span="15" :push="4" class="postfix-select">
        <el-select v-model="start_cate" clearable filterable placeholder="请选择" class="selection" @change="select_start_cate">
          <el-option
            v-for="item in catedata"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="item1-2">
      <el-col :span="4" :push="1" class="prefix-select">实体</el-col>
      <el-col :span="15" :push="4" class="postfix-select">
        <el-select v-model="start" clearable filterable placeholder="请选择" class="selection" @change="select_start_content">
          <el-option
            v-for="item in startContent"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="item2">
      <el-col :span="1" :push="1">
        <i class="el-icon-star-on" />
      </el-col>
      <el-col :span="14" class="end">
        终止节点
      </el-col>
    </el-row>
    <el-row :gutter="24" class="item2-1">
      <el-col :span="4" :push="1" class="prefix-select">类别</el-col>
      <el-col :span="15" :push="4" class="postfix-select">
        <el-select v-model="end_cate" clearable filterable placeholder="请选择" class="selection" @change="select_end_cate">
          <el-option
            v-for="item in catedata"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="item2-2">
      <el-col :span="4" :push="1" class="prefix-select">实体</el-col>
      <el-col :span="15" :push="4" class="postfix-select">
        <el-select v-model="end" clearable filterable placeholder="请选择" class="selection" @change="select_end_content">
          <el-option
            v-for="item in endContent"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <!-- <el-divider /> -->
    <el-footer class="footer">
      <el-row type="flex" style="padding-top:5px;">
        <el-col class="footer-button" :span="12" :push="10">
          <span class="button-text">生成</span>
          <el-button type="primary" class="button-button" @click="TransferId"><i class="el-icon-thumb" /></el-button>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    catedata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      start_cate: '',
      end_cate: '',
      category_start: [],
      categories_start: [],
      category_end: [],
      categories_end: [],
      start: '',
      end: '',
      startContent: [],
      endContent: [],
      startId: '',
      endId: ''

    }
  },
  created() {
  },
  methods: {
    select_start_cate(value) {
      if (value !== '') {
        const url = this.$api + '/hugegraph/LabeltoFindV'
        const category1 = value
        const data =
          {
            'category': category1,
            'content': category1
          }
        this.graph_length_start_content = 0
        axios.post(url, data).then((response) => {
          this.example = []
          // 获取数据
          // console.log('111')
          this.graph_length_start_content = response.data.length
          for (var i = 0; i < this.graph_length_start_content; i++) {
            var name = ''
            if (response.data[i]['propertie'].name.length >= 35) {
              name = response.data[i]['propertie'].name.substr(0, 35)
            } else {
              name = response.data[i]['propertie'].name
            }
            this.example.push({ label: name, value: response.data[i]['id'] })
          }
          this.startContent = []
          this.startContent = this.example
        })
      }
    },
    select_end_cate(value) {
      if (value !== '') {
        const url = this.$api + '/hugegraph/LabeltoFindV'
        const category2 = value
        const data =
          {
            'category': category2,
            'content': category2
          }
        this.graph_length_end_content = 0
        axios.post(url, data).then((response) => {
          this.example1 = []
          // 获取数据
          // console.log('222')
          this.graph_length_end_content = response.data.length
          for (var i = 0; i < this.graph_length_end_content; i++) {
            var name1 = ''
            if (response.data[i]['propertie'].name.length >= 35) {
              name1 = response.data[i]['propertie'].name.substr(0, 35)
            } else {
              name1 = response.data[i]['propertie'].name
            }
            this.example1.push({ label: name1, value: response.data[i]['id'] })
          }
          this.endContent = []
          this.endContent = this.example1
        })
      }
    },
    select_start_content(e) {
      this.startId = e
      this.startContent.map((item) => {
        //  this.unitList 是你 select option遍历的集合 e 是选中的id
        if (item.value === e) {
          this.startName = item.label
        }
      })
    },
    select_end_content(e) {
      this.endId = e
      this.endContent.map((item) => {
        //  this.unitList 是你 select option遍历的集合 e 是选中的id
        if (item.value === e) {
          this.endName = item.label
        }
      })
    },
    TransferId() {
      var transData = {}
      transData.id1 = this.startId
      transData.id2 = this.endId
      this.ForceChartData = transData
      // console.log(555)
      var nowTime = new Date()
      var month = nowTime.getMonth() + 1// 一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
      var date = nowTime.getDate()
      var seperator1 = '-'// 设置成自己想要的年月日格式：年-月-日
      var seperator2 = ':'// 设置成自己想要的时分秒格式：时:分:秒
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (date <= 9) {
        date = '0' + date
      }
      var currentDate = nowTime.getFullYear() + seperator1 + month + seperator1 + date + ' ' +
          nowTime.getHours() + seperator2 + nowTime.getMinutes() + seperator2 + nowTime.getSeconds()
      var record = {}
      record.start = this.startName
      record.end = this.endName
      record.time = currentDate

      if (this.startId !== this.endId) {
        this.$store.dispatch('path/addHistoryRecord', record)
        this.$store.dispatch('path/setStartId', this.startId)
        this.$store.dispatch('path/setEndId', this.endId)
      }
    }
  }
}
</script>

<style scoped>
  .item1{
     margin-top: 40px;
  }
  .function-title {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
  }
  .function-content {
    margin-top: 20px;
    font-size: 15px;
    color: #999;
    text-align:justify;
    word-break:break-all;
    line-height: 150%;
    font-family: 'Times New Roman', Times, serif;
  }
  .start {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
  }
  .item1-1 {
     margin-top: 20px;
    padding-top: 20px;
    /* border-top: 1px solid #F0F0F0; */
  }
  .prefix-select {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
  }
  .selection {
    border: 3px solid #000000;
    border-radius: 10px;
  }
  .selection /deep/ .el-input .el-input__inner {
   border-color: white  !important;
}
.item1-2 {
  padding-top: 20px;
}
.item2 {
  margin-top: 40px;
}
.end {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
  }
  .item2-2 {
padding-top: 20px;
padding-bottom: 40px;
/* border-bottom: 1px solid #F0F0F0; */
  }
  .item2-1 {
     margin-top: 20px;
    padding-top: 20px;
    /* border-top: 1px solid #F0F0F0; */
  }
  .footer {
    background-color: #C4E1E1;
    border-radius: 5px;
  }
  .footer-button {
    border: 3px solid #000000;
    background-color: white;
  }
  .button-text {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
    /* padding-left: 10px; */
    padding-right: 15px;
    /* background-color: white; */
  }
  .button-button {
    background-color: #C4E1E1;
    /* border: none; */
    border-radius: 0px;
    border: 4px solid #C4E1E1;
  }
  .el-icon-thumb {
    font-size: 18px;
    /* color: white; */
    color: #000000;
    font-weight: bold;
  }
/* .selection .el-input .el-input__inner {
   border-color:  white  !important;
} */
</style>
