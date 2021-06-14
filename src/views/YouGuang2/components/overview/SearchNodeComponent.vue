/ *

* 知识图谱总览实体界面的左部分，树形目录部分。

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
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  props: {
    catedata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // data: [{
      //   label: '疾病',
      //   children: [
      //     {
      //       label: '疾病'
      //     }, {
      //       label: '疾病一级分类'
      //     },
      //     {
      //       label: '疾病二级分类'
      //     },
      //     {
      //       label: '疾病三级分类'
      //     }]
      // }, {
      //   label: '药品',
      //   children: [{
      //     label: '药品分类'
      //   }, {
      //     label: '药品化学名'
      //   }, {
      //     label: '药品商品名'
      //   }]
      // }],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf',
        id: 'id'
      },
      categories: []
      // orgParam: {
      //   orgCode: '000002000008000006000012000046000001',
      //   orgId: '166c937f-e27d-4450-a4e5-cb4cfc5122b8'
      // },

      // orgWidth: 0,
      // defaultProps: {
      //   label: 'orgName',
      //   isLeaf: 'isLeaf'
      // }
    }
  },
  created() {
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
        this.setcatelabel(data.label)
      }
      if (data.level === 1) {
        this.setcatename(data.label)
      }
      if (data.isLeaf === true) {
        // console.log('id: ' + data.label)
        this.setentityid(data.id)
      }
      console.log('level: ' + data.level)
    },
    // getIndex(node, resolve) {
    //   console.log('getIndex')
    //   const url = this.$api + '/restfulController/getAllvertexlabel'
    //   axios.get(url).then((response) => {
    //     for (var i = 0; i < response.data.length; i++) {
    //       var cate = {}
    //       cate['label'] = response.data[i][0]
    //       cate['children'] = []
    //       for (var j = 0; j < response.data[i].length; j++) {
    //         if (j !== 0) {
    //           var son_cate = {}
    //           son_cate['label'] = response.data[i][j]
    //           cate['children'][j - 1] = son_cate
    //         }
    //       }
    //       this.categories[i] = cate
    //     }
    //     const category = this.categories
    //     resolve(category)
    //     // console.log('hello' + this.categories[0]['children'][1]['label'])
    //   })
    // },
    // getentity(node, resolve) {
    //   const url1 = this.$api + '/hugegraph/LabeltoFindV'
    //   const entity_name = node.label
    //   const params = {
    //     'category': entity_name,
    //     'content': entity_name
    //   }
    //   const xxx = []
    //   axios.post(url1, params).then((response) => {
    //     // const xxx = []
    //     for (var i = 0; i < response.data.length; i++) {
    //       var cate = {}
    //       cate['label'] = response.data[i]['propertie'].name
    //       cate['isLeaf'] = false
    //       xxx[i] = cate
    //     }
    //   })
    //   resolve(xxx)
    // },
    loadNode(node, resolve) {
      console.log('node: ' + node.label)
      if (node.level === 0) {
        // this.getIndex(node, resolve)
        return resolve([{
          label: '疾病',
          isLeaf: false,
          level: 0
        }, {
          label: '药品',
          isLeaf: false,
          level: 0
        },{
          label: '患者',
          isLeaf: false,
          level: 0
        },{
          label: '治疗方案',
          isLeaf: false,
          level: 0
        }, {
          label: '其他',
          isLeaf: true,
          level: 0
        }])
      }
      if (node.level === 1 && node.label === '药品') {
        return resolve([{
          label: '药品类型',
          isLeaf: false,
          level: 1
        }, {
          label: '药品化学名',
          isLeaf: false,
          level: 1
        }, {
          label: '药品商品名',
          isLeaf: false,
          level: 1
        }, {
          label: '联合用药',
          isLeaf: false,
          level: 1
        }
        ])
      }
         if (node.level === 1 && node.label === '治疗方案') {
        return resolve([{
          label: '药物治疗选择层级',
          isLeaf: false,
          level: 1
        }, {
          label: '药物治疗方案',
          isLeaf: false,
          level: 1
        }, {
          label: '治疗效果',
          isLeaf: false,
          level: 1
        }, {
          label: '给药方式',
          isLeaf: false,
          level: 1
        },{
          label: '治疗目标',
          isLeaf: false,
          level: 1
        }
        ])
      }
      if (node.level === 1 && node.label === '患者') {
        return resolve([{
          label: '人群',
          isLeaf: false,
          level: 1
        },{
          label: '患者',
          isLeaf: false,
          level: 1
        }
        ])
      }
      if (node.level === 1 && node.label === '疾病') {
        return resolve([
          {
            label: '一级疾病',
            isLeaf: false,
            level: 1
          },
          {
            label: '二级疾病',
            isLeaf: false,
            level: 1
          },
          {
            label: '三级疾病',
            isLeaf: false,
            level: 1
          },
          {
            label: '其他疾病',
            isLeaf: false,
            level: 1
          }
        ])
      }
      if (node.level > 1) {
        // console.log('2 node: ' + node.label)
        const url1 = this.$api + '/hugegraph1/LabeltoFindV'
        const entity_name = node.label
        const params = {
          'category': entity_name,
          'content': entity_name
        }
        const xxx = []
        axios.post(url1, params).then((response) => {
          console.log('axios')
          console.log(response.data)
          for (var i = 0; i < response.data.length; i++) {
            var cate = {}
            cate['label'] = response.data[i]['propertie'].name
            cate['id'] = response.data[i]['id']
            cate['isLeaf'] = true
            cate['level'] = 2
            xxx[i] = cate
          }
          return resolve(xxx)
        }) 
        // return resolve(xxx)
        // const url1 = this.$api + '/hugegraph/LabeltoFindV'
        // const entity_name = node.label
        // const params = {
        //   'category': entity_name,
        //   'content': entity_name
        // }
        // axios.post(url1, params).then((response) => {
        //   const xxx = []
        //    for (var i = 0; i < response.data.length; i++) {
        //      var cate = {}
        //      cate['label'] = response.data[i]['propertie'].name
        //      xxx[i] = cate
        //    }
        // })
        // )
        // setTimeout(() => {
        //   const data = [{
        //     label: '感冒药'
        //   }, {
        //     label: 'hello'
        //   }]

      //   resolve(data)
      // }, 500)
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
/* .selection .el-input .el-input__inner {
   border-color:  white  !important;
} */
</style>
