/ *

* 知识图谱总览关系界面的左部分，树形目录部分。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <!-- <el-row style="height:20px" class="cut-off" /> -->
    <el-row class="item1">
      <el-tree
        ref="orgTree"
        highlight-current
        accordion
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
      />
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf',
        id: 'id'
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'histories'
    // ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
       ...mapActions(
      {
        setentityid: 'overview/setEntityId',
        setcatename: 'overview/setCateName',
        setcatelabel: 'overview/setCateLabel',
        setrelationcate: 'overview/setRelationCate',
        setrelationlabel: 'overview/setRelationLabel',
      }
    ),
    handleNodeClick(data) {
      if(data.level === 0) {
        console.log("hello1")
         this.setrelationcate(data.label)
      }
      if (data.isLeaf === true) { 
      console.log("hello2")
        this.setrelationlabel(data.id)
      }
      console.log(data)
    },
    loadNode(node, resolve) {
      console.log('node: ' + node.label)
      if (node.level === 0) {
        // this.getIndex(node, resolve)
        return resolve([{
          label: '疾病 - 疾病',
          isLeaf: false,
          level: 0
        }, {
          label: '药品 - 药品',
          isLeaf: false,
          level: 0
        }, {
          label: '患者 - 治疗方案',
          isLeaf: false,
          level: 0
        }, {
          label: '患者 - 患者',
          isLeaf: false,
          level: 0
        }, {
          label: '治疗方案 - 治疗方案',
          isLeaf: false,
          level: 0
        }, {
          label: '治疗方案 - 药品',
          isLeaf: false,
          level: 0
        }, {
          label: '患者 - 疾病',
          isLeaf: false,
          level: 0
        }])
      }
      if (node.level === 1 && node.label === '药品 - 药品') {
        return resolve([{
          label: '商品名（药品类型 - 药品商品名）',
          isLeaf: true,
          level: 1,
          id: '商品名'
        }, {
          label: '药品相互作用（药品化学名 - 药品化学名）',
          isLeaf: true,
          level: 1,
          id: '药品相互作用'
        },{
          label: '药品化学名分类（药品化学名 - 药品化学名）',
          isLeaf: true,
          level: 1,
          id: '药品化学名分类'
        }
        ])
      }
      if (node.level === 1 && node.label === '治疗方案 - 治疗方案') {
        return resolve([
          {
          label: '给药方式（药物治疗方案 - 给药方式）',
          isLeaf: true,
          level: 1,
          id: '给药方式'
        }, {
          label: '药物治疗选择步骤（药物治疗选择层级 - 药物治疗选择层级）',
          isLeaf: true,
          level: 1,
          id: '药物治疗选择步骤'
        },{
          label: '药物治疗层级（药物治疗方案 - 药物治疗选择层级）',
          isLeaf: true,
          level: 1,
          id: '药物治疗层级'
        },
        ])
      }
      if (node.level === 1 && node.label === '治疗方案 - 药品') {
        return resolve([
          {
          label: '治疗药物（药物治疗方案 - 药品类型）',
          isLeaf: true,
          level: 1,
          id: '治疗药物（药物治疗方案-药品类型）'
        },{
          label: '治疗药物（药物治疗方案 - 联合用药）',
          isLeaf: true,
          level: 1,
          id: '治疗药物（药物治疗方案-联合用药）'
        },{
          label: '治疗药物（药物治疗选择层级 - 联合用药）',
          isLeaf: true,
          level: 1,
          id: '治疗药物（药物治疗选择层级-联合用药）'
        },{
          label: '治疗药物（药物治疗选择层级 - 药品类型）',
          isLeaf: true,
          level: 1,
          id: '治疗药物（药物治疗选择层级-药品类型）'
        },
        ])
      }
      if (node.level === 1 && node.label === '患者 - 治疗方案') {
        return resolve([
          {
          label: '治疗目标（患者 - 治疗目标）',
          isLeaf: true,
          level: 1,
          id: '治疗目标'
        }, {
          label: '药物治疗方案（患者 - 药物治疗方案）',
          isLeaf: true,
          level: 1,
          id: '药物治疗方案'
        }, {
          label: '治疗效果（患者 - 治疗效果）',
          isLeaf: true,
          level: 1,
          id: '治疗效果'
        },
        ])
      }
      if (node.level === 1 && node.label === '患者 - 患者') {
        return resolve([
          {
          label: '所属人群（患者 - 人群）',
          isLeaf: true,
          level: 1,
          id: '所属人群'
        }, {
          label: '患有疾病（患者 - 二级疾病）',
          isLeaf: true,
          level: 1,
          id: '患有疾病（患者-二级疾病）'
        },
        ])
      }
      if (node.level === 1 && node.label === '患者 - 疾病') {
        return resolve([
          {
          label: '患有疾病（患者 - 三级疾病）',
          isLeaf: true,
          level: 1,
          id: '患有疾病（患者-三级疾病）'
        },
        ])
      }
      if (node.level === 1 && node.label === '疾病 - 疾病') {
        return resolve([
          {
            label: '疾病一级分类（一级疾病 - 二级疾病）',
            isLeaf: true,
            level: 1,
            id: '疾病一级分类'
          },
          {
            label: '疾病二级分类（二级疾病 - 三级疾病）',
            isLeaf: true,
            level: 1,
            id: '疾病二级分类'
          },{
            label: '并发症（二级疾病 - 三级疾病）',
            isLeaf: true,
            level: 1,
            id: '并发症（二级疾病-三级疾病）'
          }
        ])
      }
    }
  }
}
</script>

<style scoped>
 .item1{
     margin-top: 60px;
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
</style>
