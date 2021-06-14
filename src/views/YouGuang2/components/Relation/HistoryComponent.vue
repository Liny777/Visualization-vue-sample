/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 历史记录 —— 关联分析功能的子组件

* 关联分析页面右侧右上角的过滤筛选功能，用于保存搜索查询路径起点与终点实体的名字以及查询时间

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <el-table ref="singleTable" :data="relation_histories" highlight-current-row style="width: 100%;">
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        property="start"
        label="Start"
        width="300"
      />
      <el-table-column
        property="time"
        label="Time"
        width="300"
      />
    </el-table>
    <el-divider />
    <el-button @click="clearhistory">清空</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'relation_histories'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions(
      { clearhistory: 'relation/clearHistoryRecord' })
  }
}
</script>

<style scoped>
tr.current-row > td,
    .el-table__body tr:hover > td {
      background:#f19944;
    }
</style>
