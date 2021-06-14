/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 搜索查询功能 —— 第一页

* 查找的医学数据类别

* @author Lin Youguang

* @version 2.1

* @deprecated

*/
<template>
  <div class="left">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="data1"
      :props="defaultProps"
      :filter-node-method="filterNode"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
require('echarts/theme/macarons') // echarts theme
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      data1: [
        {
          id: 1,
          label: 'J',
          children: [{
            id: 4,
            label: '疾病',
            children: [
              {
                label: '疾病别名-疾病'
              }, {
                label: '是疾病类型的子类-疾病类型'
              }, {
                label: '并发症-疾病'
              }
            ]
          }, {
            id: 5,
            label: '疾病二级分类',
            children: [
              {
                label: '疾病二级分类-疾病三级分类'
              }
            ]
          },
          {
            id: 6,
            label: '疾病三级分类',
            children: [
              {
                label: '疾病分类-疾病'
              }, {
                label: '疾病三级分类-疾病三级分类'
              }
            ]
          }, {
            id: 7,
            label: '疾病一级分类',
            children: [
              {
                label: '疾病一级分类-疾病二级分类'
              }
            ]
          }]
        }, {
          id: 2,
          label: 'R',
          children: [{
            id: 8,
            label: '人群'
          }]
        }, {
          id: 3,
          label: 'Y',
          children: [{
            id: 9,
            label: '药品分类',
            children: [
              {
                label: '适应证-疾病'
              }, {
                label: '适应证-疾病类型'
              }, {
                label: '用药目的（药品分类）-用药目的'
              }, {
                label: '药品类型分类-药品分类'
              }, {
                label: '适用人群（药品分类）-人群'
              }, {
                label: '药品分类别名-药品分类'
              }, {
                label: '相互作用（药品分类）-药品分类'
              }, {
                label: '禁忌证-疾病类型'
              }, {
                label: '禁忌人群（药品分类）-人群'
              }, {
                label: '相互作用-药品商品名'
              }, {
                label: '相互作用-药品化学名'
              }
            ]
          }, {
            id: 10,
            label: '药品化学名',
            children: [
              {
                label: '适应证-疾病'
              }, {
                label: '用药目的（化学名）-用药目的'
              }, {
                label: '是药品分类的化学名子类-药品分类'
              }, {
                label: '化学名别名-药品化学名'
              }, {
                label: '相互作用（化学名）-药品化学名'
              }, {
                label: '成份-药品商品名'
              }, {
                label: '禁忌证-疾病'
              }, {
                label: '禁忌证-疾病类型'
              }, {
                label: '适用人群（化学名）-人群'
              }, {
                label: '禁忌人群（化学名）-人群'
              }, {
                label: '相互作用-药品化学名'
              }, {
                label: '相互作用-药品商品名'
              }
            ]
          }, {
            id: 11,
            label: '药品商品名',
            children: [
              {
                label: '商品名别名-药品商品名'
              }, {
                label: '相互作用（商品名）-药品商品名'
              }, {
                label: '用药目的（商品名）-用药目的'
              }, {
                label: '适应证-疾病'
              }, {
                label: '是药品分类的商品名子类-药品分类'
              }, {
                label: '适应证-疾病类型'
              }, {
                label: '禁忌证-疾病类型'
              }, {
                label: '禁忌证-疾病'
              }, {
                label: '禁忌人群（商品名）-人群'
              }, {
                label: '适用人群（商品名）-人群'
              }
            ]
          }, {
            id: 12,
            label: '用药目的'
          }
          ]
        }]
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
  },
  methods: {
    ...mapActions(
      {
      }
    ),
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
    }
  }
}
</script>

<style scoped>
</style>
