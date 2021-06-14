/ *

 * 首页 —— 知识图谱可视化的首页

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <h3 class="main-title">
            图谱挖掘
            <!-- 多样的图谱可视化展示 -->
          </h3>
        </div>
        <p class="main-content" style=" text-indent:2em;text-align: left;line-height: 30px; text-align:center">
          <!-- The service platform provides a variety of views, multidimensional and comprehensive display of medical knowledge graph schema and instance data, and provides a visual search engine, so that medical knowledge can be more intuitive display. -->
          服务平台提供多样的视图多维度全方位的展示医学知识图谱的schema以及实例数据，
          并提供可视化搜索引擎，使医学知识可以更直观的展示。
        </p>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col v-for="item in imgList" :key="item.name" :span="6">
        <el-card class="box-card">
          <div style="padding: 14px;">
            <span class="box-title">{{ item.name }}</span>
            <el-divider />
            <div class="bottom clearfix">
              <p class="time">{{ item.content }}</p>
            </div>
          </div>
          <!-- <el-divider /> -->
          <img :src="item.src" style="width: 100%;display: block;" alt="图片丢失了">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="enterFunction(item.index)">了解详情</el-button>
          </div>
        </el-card></el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col v-for="item in imgList1" :key="item.name" :span="6" :push="item.step">
        <el-card class="box-card">
          <div style="padding: 14px;">
            <span class="box-title">{{ item.name }}</span>
            <el-divider />
            <div class="bottom clearfix">
              <p class="time">{{ item.content }}</p>
            </div>
          </div>
          <!-- <el-divider /> -->
          <img :src="item.src" style="width: 100%;display: block;" alt="图片丢失了">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="enterFunction(item.index)">了解详情</el-button>
          </div>
        </el-card></el-col>
    </el-row>
    <!-- <el-row type="flex" class="row-bg" justify="space-around">
      <el-col v-for="item in imgList2" :key="item.name" :span="6">
        <el-card class="box-card">
          <div style="padding: 14px;">
            <span class="box-title">{{ item.name }}</span>
            <el-divider />
            <div class="bottom clearfix">
              <p class="time">{{ item.content }}</p>
            </div>
          </div>
          <img :src="item.src" style="width: 100%;display: block;" alt="图片丢失了">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="enterFunction(item.index)">了解详情</el-button>
          </div>
        </el-card></el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        {
          index: '1',
          name: '知识图谱总览',
          src: require('@/assets/Home2/Entity.png'),
          content: '该功能中直观的展示了医学知识图谱的本体结构设计及图谱中的实例数据，通过实体类型表示各类医学术语，包括：一级疾病、二级疾病、药品类型、药品化学名、患者、人群等，通过不同类型的边连接实体表示关联关系，例如：患有疾病、药品分类、疾病一级分类、药物治疗方案等。点击图中的圆形节点或从左侧功能栏中查询搜索即可查看具体图谱中的实例数据及关联关系。'
        },
        {
          index: '2',
          name: '疾病可视化',
          src: require('@/assets/Home2/Relation.png'),
          content: '该功能能够查询疾病数据，左侧功能栏中实体栏列出了与疾病相关的实体类型及具体数据，包括：一级疾病、二级疾病、三级疾病等；关系栏列出了与疾病相关的关系及具体数据，包括：疾病一级分类、疾病二级分类、适应证、禁忌证等。通过搜索框可以对具体疾病进行检索，也可点击查看功能栏中列出的疾病数据。'
        },
        {
          index: '3',
          name: '药品可视化',
          src: require('@/assets/Home2/path.png'),
          content: '该功能能够查询药品数据，左侧功能栏中实体栏列出了与药品相关的实体类型及具体数据，包括：药品分类、药品化学名、药品商品名、用药目的等；关系栏列出了与药品相关的关系及具体数据，包括：药品类型分类、化学名分类、商品名、适应证、禁忌证等。通过搜索框可以对具体药品进行检索，也可点击查看功能栏中列出的药品数据。'
        }
      ],
      imgList1: [
        {
          index: '4',
          step: 1,
          name: '疾病治疗方案查询',
          src: require('@/assets/Home2/Correlation.png'),
          content: '该功能中通过检索疾病名称，查看包含该种疾病的治疗方案。治疗方案包括药物治疗方案和非药物治疗方案，图形展示界面中将以治疗方案节点为中心，通过关联关系表示该治疗方案对应的患者画像、疾病的适用药物及其推荐程度、证据级别等数据。'
        },
        {
          index: '5',
          step: 3,
          name: '药品相互作用查询',
          src: require('@/assets/Home2/Correlation.png'),
          content: '该功能中，通过左侧功能栏向图谱中自由添加多个药品数据，图形展示界面中将以边的形式展示两两药物之间是否存在相互作用，并且展示具体的作用机制、是否推荐联合使用、证据级别、参考文献等信息。'
        }
        // {
        //   index: '6',
        //   name: '路径搜索功能',
        //   src: '',
        //   content: '路径搜索功能模块用于帮助医生查询医疗网络图中任意两个主体之间的关系。医生通过选择要搜索的路径的起始节点和结束节点，获得两点之间的所有路径'
        // }
      ],
      imgList2: [
        {
          index: '7',
          name: '关系查询功能',
          src: require('@/assets/Home2/Relation.png'),
          content: '关系查询模块用于帮助医生根据关系标签查找关系下的三重信息。'
        },
        {
          index: '8',
          name: '实体查询功能',
          src: require('@/assets/Home2/Entity.png'),
          content: '1、用于查询任何医疗实体。例如：冠心病下的疾病，疾病是冠心病的范畴，冠心病是医学实体。2、用于查询任何医疗关系。例如：疾病-适应症-药物，用于搜索疾病以查看药物的适应症。病是头实体，药是尾实体，适应症是二者的关系。'
        },
        {
          index: '9',
          name: '关联搜索功能',
          src: require('@/assets/Home2/Correlation.png'),
          content: '相关搜索功能模块用于帮助医生查询医疗关系形成的网络图中任意数量的主体关系，从而更好地探索不同主体之间的关系'
        }
      ]

    }
  },
  methods: {
    enterFunction(value) {
      console.log('value' + value)
      if (value === '1') {
        this.$router.push({ name: '知识图谱总览', params: { userId: 1 }})
      }
      if (value === '2') {
        this.$router.push({ name: '疾病查询', params: { userId: 1 }})
      }
      if (value === '3') {
        this.$router.push({ name: '药品查询', params: { userId: 1 }})
      }
      if (value === '6') {
        this.$router.push({ name: '疾病治疗方案查询', params: { userId: 1 }})
      }
      if (value === '7') {
        this.$router.push({ name: '药品相互作用查询', params: { userId: 1 }})
      }
      if (value === '8') {
        this.$router.push({ name: 'MainPage1', params: { userId: 8 }})
      }
      if (value === '9') {
        this.$router.push({ name: 'MainPage1', params: { userId: 9 }})
      }
    }
  }
}
</script>

<style scoped>
.el-row {
    margin-top: 20px;
  }
.bg-purple {
    background: #666666;
  }
  .box-card {
    border-top: 10px solid #003366;
    height: 520px;
  }
  .main-title {
    font-family: 'STKaiti';
    font-weight: bold;
    color: black;
    /* color: #009966; */
    word-spacing: 5px;
    text-align:center;
    font-size: 30px;
  }
  .main-content {
    font-family: 'STKaiti';
    font-size: 17px;
    font-weight: bold;
    color:#666666;
  }
  .box-title {
    font-family: 'STKaiti';
    font-weight: bold;
  }
  .time {
    height: 150px;
    font-size: 13px;
    color: #999;
    text-align:justify;
    word-break:break-all;
    line-height: 150%;
    font-family: 'STKaiti';
  }
  .bottom {
    margin-top: 20px;
    line-height: 12px;
  }
  .button {
    padding: 5px 20px 5px;
    float: right;
    background-color: #009966;
    font-weight: bold;
    font-family: 'STKaiti';
    color: aliceblue;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
