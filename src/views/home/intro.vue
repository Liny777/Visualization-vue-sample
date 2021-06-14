<template>
    <div class="container">
        <div class="system_name">
            <h2>
                关于专业医学知识图谱服务平台
            </h2>
        </div>
        <div class="introduce">
            <p>
                专业医学知识图谱服务平台是围绕医学领域知识图谱而开展的多种类型的服务，
                旨在通过建立医学实体之间的关联关系，将文本中的知识系统地组织起来，
                让知识更加容易被机器理解和处理，并为数据搜索、挖掘、分析等提供便利，为人工智能的实现提供知识库基础。
            </p>  
        </div>
        <div class="graph">
            <el-row type="flex" class="sub_item" justify="center">
                <el-col :span="12">
                    <el-image :fit="fit" class="photo" :src="intro_graph"></el-image>
                </el-col>
                <el-col :span="6">
                    <div>
                        <h3>
                            多样的图谱可视化展示
                        </h3>
                    </div>
                    <p>
                        服务平台提供多样的视图多维度全方位的展示医学知识图谱的schema以及实例数据，
                        并提供可视化搜索引擎，使医学知识可以更直观的展示。
                    </p>
                </el-col>
            </el-row>
            <el-row type="flex" class="sub_item" justify="center">
                <el-col :span="6">
                    <div>
                        <h3>
                            文本采集及专家校验审核
                        </h3>
                    </div>
                    <p>
                        服务平台自动采集近期最新的医学研究相关文献、临床指南等文本信息，提供数据加工及专家审核功能，
                        将文本信息抽取为结构化三元组知识加入知识图谱中，保证专业医学知识图谱的准确性、专业性及时效性。
                    </p>
                </el-col>
                <el-col :span="12">
                    <el-image :fit="fit" class="photo" :src="intro_mark"></el-image>
                </el-col>
            </el-row>
            <el-row type="flex" class="sub_item" justify="center">
                <el-col :span="12">
                    <el-image :fit="fit" class="photo" :src="intro_robot"></el-image>
                </el-col>
                <el-col :span="6">
                    <div>
                        <h3>
                            知识图谱应用
                        </h3>
                    </div>
                    <p>
                        包括高血压知识百科、高血压预问诊助手、问答机器人等
                    </p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import intro_graph from '@/assets/Home/graph.jpg'
import intro_mark from '@/assets/Home/mark.png'
import intro_robot from '@/assets/Home/robot.png'
export default {
  name: 'Intro',
  data() {
    return {
    //   activeIndex: "/home/index",
      intro_graph: intro_graph + '?' + +new Date(),
      intro_mark: intro_mark + '?' + +new Date(),
      intro_robot: intro_robot + '?' + +new Date(),
    }
  },
}
</script>
<style scoped>
    .container{
        text-align:center
    }
    .introduce{
        width: 40%;
        margin: 0 auto;
        padding-bottom: 60px;
    }
    p{
        text-indent:2em;
        text-align: left;
        line-height: 30px;
    }
    h3 {
        color: #3685de;
    }
    h2 {
        border-bottom: 2px solid rgba(54,133,222,0.61);
        padding-bottom: 2px;
        width:auto; 
        display:inline-block;
    }
    .photo{
        width: 80%;
    }
    .sub_item {
        padding-bottom: 5%;
    }
</style>