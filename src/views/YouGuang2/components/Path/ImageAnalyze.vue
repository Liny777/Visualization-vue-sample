/ *
* 为我毕设开发的功能，开发的功能与实验室所需功能无关。可以删除

* 图分析 —— 路径分析功能的子组件

* 图分析是路径分析功能左侧三个功能的第二个功能，用于高亮实体节点。

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div>
    <ul v-for="(item, index) in graphedge" :key="index" class="live" @mouseover="getedge(item)" @mouseleave="resetedge()">
      <h4 class="title">{{ index }}.{{ startname }} ———— {{ endname }}</h4>
      <li v-for="(e, i) in item" :key="i" @click="open(e['description'])">
        {{ e['headName'] }}-{{ e['relation'] }}-{{ e['tailName'] }}
      </li>
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
      'graphedge',
      'startname',
      'endname'
    ])
  },
  watch: {
  },
  created() {
  },
  methods: {
    open(val) {
      if (val !== '[]') {
        var info = '<div style="height:300px;overflow-y:auto">'
        var i = 0
        while (i < val.length) {
          var p_key = val.indexOf('key=', i)
          var p_dou = val.indexOf(',', p_key)
          var keya = val.substring(p_key + 4, p_dou)
          var p_value = val.indexOf('value=', p_dou)
          var p_kuo = val.indexOf('}', p_value)
          var valuea = val.substring(p_value + 6, p_kuo)
          if (p_key === -1) {
            i = i + 1
          } else {
            i = p_kuo + 1
            info = info + '<strong>' + keya + ': ' + '</strong>' + '<p>' + valuea + '</p>' + '<hr />'
          }
        }
        info = info + '</div>'
        this.$alert(info, '描述', {
          dangerouslyUseHTMLString: true
        })
      }
    },
    getedge(val) {
      this.$store.dispatch('path/setChosenEdge', val)
    },
    resetedge() {
      this.$store.dispatch('path/setChosenEdge', 0)
    }
  }
}
</script>
<style scoped>
        .to_right {
            width: 0;
            height: 0;
            border-left: 10px solid greenyellow;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
        }
ul {
  width: 100%;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  background: #336699;
  /* background: rgba(0, 0, 0, 0.2); */
  /* color: rgba(255, 255, 255, 0.5); */
  color: #FFFFFF;
  border-radius: 5px;
  padding: 0.5em;
  /* margin: 2%; */
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); */
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
  /* list-style-type:none; */
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
