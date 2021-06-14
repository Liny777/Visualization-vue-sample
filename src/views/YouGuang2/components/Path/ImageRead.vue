/ *

* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

 * 图解读 —— 路径分析功能的子组件

* 图解读是路径分析功能左侧三个功能的第三个功能，用于高亮路径，并且显示路径的详细信息。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <ul v-for="(item, index) in graphnode" :key="index" class="live" @mouseover="getnode(item.id)" @mouseleave="resetnode()">
      <h4>{{ item.label }}</h4>
      <li>{{ index }}-{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'graphnode'
    ])
  },
  watch: {
  },
  created() {
  },
  methods: {
    getnode(val) {
      this.$store.dispatch('path/setChosenId', val)
    },
    resetnode() {
      this.$store.dispatch('path/setChosenId', 0)
    }
  }
}
</script>

<style scoped>
tr.current-row > td,
    .el-table__body tr:hover > td {
      background:#f19944;
    }
ul {
  width: 100%;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  background: #6699CC;
  color: #FFFFFF;
  border-radius: 5px;
  padding: 0.5em;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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
/* .live > */
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
</style>
