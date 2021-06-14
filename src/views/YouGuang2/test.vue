/ *

 * 测试

* 测试后端返回数据

* @author Lin Youguang

* @version 1.1

* @deprecated

*/
<template>
  <div class="overall">
    <meta http-equiv="Access-Control-Allow-Origin" content="http://114.67.200.39">
    <el-button class="download_button" size="normal" type="primary" @click="getContent()">展示所有顶点</el-button>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
import axios from 'axios'
export default {
  name: 'Overall',
  component: {
  },
  data() {
    return {
      length: 10
    }
  },
  methods: {
    getContent() {
      // console.log('begin')
      // setTimeout(() => {
      //   console.log('setTimeout1')
      //   Promise.resolve().then(() => {
      //     console.log('promise 1')
      //     setTimeout(() => {
      //       console.log('setTimeout2 between promise1&2')
      //     })
      //   }).then(() => { console.log('promise 2') })
      // }, 0)
      // console.log('end')

      // console.log('6666')
      // const url = 'http://localhost:10088/FindOutV'
      // const url1 = 'http://114.67.200.39:44640/graphs/hugegraph/traversers/kout?source="383434623822069760"&max_depth=2'
      // const url1 = 'api/graphs/hugegraph/traversers/kout?source=383434623822069760&max_depth=1'
      // const url1 = 'http://localhost:10088/StartEndFindEdgeLabel'
      // const url1 = 'http://localhost:10088/IdfindName'
      // const url1 = 'http://localhost:10088/getAlledgelabel'
      // const url1 = 'api/graphs/hugegraph/schema/edgelabels'
      // const url = 'http://localhost:10088/getEdgeVertical'
      // const url = this.$api + '/hugegraph1/getEntityNeighbor'
      const url = this.$api + '/restfulController/getAllEdgelabel'
      //   const data = {
      //     'category': 'disease',
      //     'content': '高'
      //   }
      // this.$ajax({
      //   url: url1,
      //   dataType: 'jsonp',
      //   processData: false,
      //   type: 'get',
      //   success: function(data) {
      //     alert(data.name)
      //   },
      //   error: function(XMLHttpRequest, textStatus, errorThrown) {
      //     alert(XMLHttpRequest.status)
      //     alert(XMLHttpRequest.readyState)
      //     alert(textStatus)
      //   } })
      const data = {
        'category': '疾病一级分类',
        'content': '疾病一级分类'
      }
      // const data = {
      //   'source': '383437495502635008',
      //   'max_depth': '1'
      // }
      // const url = 'http://localhost:10088//transver/neighbour'
      // const url1 = 'http://localhost:10088/StartEndFindEdgeProperty'
      // const data = {
      //   'SId': '383437495502635008',
      //   'EId': '383438441418850304'
      // }
      // var id = '6666'
      // axios.post(url, data)
      axios.get(url)
        .then((response) => {
          console.log('666')
          console.log(response.data)
          //     // console.log(response.data[0].link.length)
          //     // console.log(response.data['edgelabels'][0]['name'])
          //     // for (var i = 0; i < response.data['edgelabels'].length; i++) {
          //     //   console.log('-----------------------------------------')
          //     //   console.log('i:' + i + ' source: ' + response.data['edgelabels'][i]['source_label'] + ' link: ' + response.data['edgelabels'][i]['name'] + '-' + response.data['edgelabels'][i]['target_label'])
          //     // }
          //     // console.log('888')
          //     // console.log(response.data[0]['description'])
          //     //   this.guideContent = null;
          //     //   this.guideContent = response.data;
          //     // this.disease = response.data;
        })
    }
  }

}
</script>
