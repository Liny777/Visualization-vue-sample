/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 搜索查询功能，从节点详细页面查看每一条边详细信息，右半部分，绘图部分。

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
        Query relation
      </el-col>
    </el-row>
    <el-row>
      <el-col />
    </el-row>
    <el-row :gutter="24" class="item1-1">
      <el-col :span="4" :push="1" class="prefix-select">Relation</el-col>
      <el-col :span="15" :push="4" class="postfix-select">
        <el-select v-model="start_cate" clearable filterable placeholder="请选择" class="selection" @change="select_start_cate">
          <el-option
            v-for="item in edgedata"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-footer class="footer">
      <el-row style="padding-top:9px;">
        <el-col :span="1">
          <el-button type="primary" class="button-button1" @click="TransferBack">RESET</el-button>
        </el-col>
        <el-col :span="1" :offset="12">
          <el-button type="primary" class="button-button" @click="TransferId">GENERATE</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    edgedata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      start_cate: '',
      choose_cate: ''
    }
  },
  created() {
  },
  methods: {
    select_start_cate(value) {
      this.choose_cate = value
    },
    TransferId() {
      this.$store.dispatch('edge/setEdgeLabel', this.choose_cate)
    },
    TransferBack() {
      this.$store.dispatch('edge/setEdgeLabel', '')
    }
  }
}
</script>

<style scoped>
 .item1-1 {
     margin-top: 20px;
   padding-top: 20px;
  padding-bottom: 40px;
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
.button-button {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    background-color: white;
    font-weight: bold;
    border-radius: 5px;
    border: 3px solid #000000;
  }
  .el-icon-thumb {
    font-size: 18px;
    /* color: white; */
    color: #000000;
    font-weight: bold;
  }
  .button-button1 {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    background-color: white;
    font-weight: bold;
    border-radius: 5px;
    border: 3px solid #000000;
  }
  .start {
    font-family: 'Futura-CondensedExtraBold',sans-serif;
    font-size: 18px;
    color: #000000;
    font-weight: bold;
  }
</style>
