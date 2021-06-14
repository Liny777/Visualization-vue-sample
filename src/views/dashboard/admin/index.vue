<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <div class="schema">
      <h2>医学知识图谱本体设计介绍</h2>
      <p>
        本团队以疾病、患者、药品为概念分类，构建了一套由实体、关系及其属性构成的医学知识图谱本体，
        其中实体类型按概念分类包括：在疾病分类下有，一级疾病、二级疾病、
        三级疾病、症状等；在患者分类下有，患者、基本情况、用药记录、风险评估、血压监测、
        病历、体格检查、主诉、高血压起因及症状、生活习惯、代谢综合征及心血管疾病、家族史、
        靶器官及心血管病评估、人群等；在药品分类下有，药品分类、药品化学名、药品商品名、用药目的等。
        通过对三种概念分类的相互关系进行总结，构建类内、类间关系及其属性。
        类内关系包括：疾病一级分类、疾病二级分类、疾病三级分类、药品类型分类、是药品分类的化学名子类、成份、用药目的、药品相互作用、所属人群等。
        类间关系包括：适应证、禁忌证、所患疾病、治疗药物、适用人群、临床表现等。
      </p>
      <!-- <el-image :fit="fit" class="photo" :src="home_schema"></el-image> -->
      <el-image class="photo" :src="home_schema"></el-image>
    </div>


    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <share-chart />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import ShareChart from './components/ShareChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import axios from 'axios'
import home_schema from '@/assets/Home/schema.png'
// import language from '@/components/ImageCropper/utils/language'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    BoxCard,
    // ShareChart
  },
  data() {
    return {
      home_schema: home_schema + '?' + +new Date(),
      lineChartData: lineChartData.newVisitis,
      key_input: '',
      fileName_input: '',
      pageTo_input: '',
      fileList: [],
      targetText: '',
      value: '',
      options: [
        {
          value: 'English',
          label: 'English'
        },
        {
          value: 'Chinese',
          label: 'Chinese'
        }
      ],
      Ocr: {
        language: ''
      }
    }
  },
  methods: {
    startSelenium() {
      let obj = {}
      const url = this.$api + '/selenium/startSelenium'
      obj.keyword = this.key_input
      obj.pageTo = this.pageTo_input
      obj.fileName = this.fileName_input
      axios.post(url, obj).then((response) => {
        console.log(response)
      })
    },
    handleSetLineChartData(type) {
      //this.lineChartData = lineChartData[type]

    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(res, file) {
      console.log(res)
      this.targetText = res
    },
    // 调整语言
    handleChange(e) {
      this.Ocr.language = e
      console.log(this.Ocr)
      const url = this.$api + '/Upload/setLanguage'
      axios.post(url, this.Ocr).then((response) => {
        console.log(response)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background: whitesmoke;
  /* background-color: rgb(240, 242, 245); */
  position: relative;

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    height: 600px;
  }

  .box-card1 {
    width: 100%;
    height: 600px;
  }

  .box-upload {
    height: 350px;
  }
  .content-container {
    position: relative;
    height: 50em;
    overflow-y: auto;
  }
}
.schema{
  text-align: center;
  background-color: white;
  /* background:rgb(255,255,255); */
  
}
h2{
  margin-top: 0px;
  color: #3685de;
  padding-top: 30px;
}
p{
  text-indent:2em;
  text-align: left;
  line-height: 30px;
  font-family: "PingFang SC";
  padding-left: 10%;
  padding-right: 10%;
  color: #606266;
}
.photo{
  background: #FFFFFF;
}

/* @media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
} */
</style>
