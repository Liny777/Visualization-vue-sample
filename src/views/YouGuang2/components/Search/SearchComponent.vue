* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

* 搜索查询功能 —— 实体详细页面

<template>
  <div class="searchcomponent">
    <el-row :gutter="24" class="item1-1">
      <el-col :span="22" class="label-title">
        <span style="padding-right:5px">类别 : </span>
        {{ search_nodelabel }}
      </el-col>
    </el-row>
    <el-row style="height:20px" class="cut-off" />
    <el-row :gutter="24" class="item1-2">
      <el-col :span="24" class="label-title">
        <span style="padding-right:5px">名字 : </span>
        {{ search_nodename }}
      </el-col>
    </el-row>
    <el-row style="height:20px" class="cut-off" />
    <el-row>
      <el-col>
        <el-cascader
          ref="refSubCat"
          v-model="value"
          class="choose"
          :options="search_options"
          :props="{ expandTrigger: 'hover'}"
          @change="handleChange"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ul v-for="(item, index) in graphdes" :key="index" class="live">
          <li>{{ item }}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      value: [],
      graphdes: []
    }
  },
  computed: {
    ...mapGetters([
      'search_nodeid',
      'search_nodename',
      'search_nodelabel',
      'search_options'
    ])
  },
  watch: {
  },
  created() {
  },
  methods: {
    handleChange(val) {
      var m = val.toString().split(',')
      var rela = m[0]
      var child = m[1]
      for (var n = 0; n < this.search_options.length; n++) {
        if (this.search_options[n].value === rela) {
          for (var l = 0; l < this.search_options[n].children.length; l++) {
            if (this.search_options[n]['children'][l].label === child) {
              var xx = this.search_options[n].children[l].description
              var ll = xx.split('<br/>')
              this.graphdes = []
              for (var j = 0; j < ll.length - 1; j++) {
                this.graphdes.push(ll[j])
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style scoped>
  ul {
  width: 100%;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  background: #336699;
  color: #FFFFFF;
  border-radius: 5px;
  padding: 0.5em;
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
}
ul:hover{
  background: #009966;
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}
.live {
  overflow: hidden;
}
.live > li {
  font-size: 15px;
  list-style: none;
  position: relative;
  padding: 0 0 0 2em;
  margin: 0 0 .5em 10px;
  -webkit-transition: .12s;
          transition: .12s;
}
.live > li::before {
  position: absolute;
  content: '\2022';
  font-family: Arial;
  color: #CCFFFF;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 2em;
  opacity: .5;
  line-height: .75;
  -webkit-transition: .5s;
          transition: .5s;
}
.live > li:hover {
  color: #CCFFFF;
}
.live > li:hover::before {
  -webkit-transform: scale(2);
      -ms-transform: scale(2);
          transform: scale(2);
  opacity: 1;
  text-shadow: 0 0 4px;
  -webkit-transition: .1s;
          transition: .1s;
}
.live > li::before {
  content: '';
  width: 10px;
  height: 10px;
  background: #FFF;
  border-radius: 3px;
  line-height: 0;
  top: .27em;
  left: 5px;
}
.live > li:hover::before {
  -webkit-transform: none;
      -ms-transform: none;
          transform: none;
  border-radius: 5px;
  width: 25px;
  left: -10px;
  background: #BA5353;
}
.title {
color: #FFCC33;
}
.el-scrollbar__wrap
{
  overflow-x: hidden;
}
.item1-1 {
  background-color: #000000;
  border-radius: 2px;
}
.label-title {
  font-family: 'STKaiti';
    font-size: 18px;
    color: white;
    font-weight: bold;
}
.item1-2 {
   background-color: #000000;
  border-radius: 2px;
}
.choose {
  width: 100%;
  border-radius: 10px;
}
</style>
