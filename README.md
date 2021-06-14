# Visualization-vue-sample
Design and Implementation of Visual Search System of Medical Knowledge  Graph Based on Hugegraph

# Run
npm run install 

# Demonstration
![MainPage](https://github.com/Liny777/Visualization-vue-sample/blob/master/images/%E9%A6%96%E9%A1%B5.png)
![Path Function](https://github.com/Liny777/Visualization-vue-sample/blob/master/images/path.png)
![Correlation Function](https://github.com/Liny777/Visualization-vue-sample/blob/master/images/Correlation.png)
![Relation Function](https://github.com/Liny777/Visualization-vue-sample/blob/master/images/Relation.png)
![Node Function](https://github.com/Liny777/Visualization-vue-sample/blob/master/images/Entity.png)

# 代码目录结构
前端代码在src文件夹中，
1、	src文件夹下的assets文件夹里存放图片。
2、	src文件夹下的router文件夹下的index.js存放页面跳转路由。
3、	src文件夹下的store文件夹存放全局变量，使用Vuex技术，getter.js用于方便直接调取全局变量，modules里将全局变量分类，然后分别进行申明以及对变量的操作。此处我写的主要有edge,js，overview.js，path.js，relation.js和search.js。其中，除了overview.js之外，都是我毕设的功能，与实验室所需功能无关。
4、	src文件夹下的views下的YouGuang2存放开发的组件，该文件夹下HomePage.vue为目前实验室可视化的首页，MainPage1为我毕设的主页，与实验室功能无关。Components文件下overview为知识图谱总览组件，interaction为未开放的药品相互作用，只写了页面结构。其余为我毕设开发的功能，与实验室功能无关，这里简略讲一下，search文件夹用于搜索节点，relation文件夹用于搜索关系，path文件夹用于搜索路径，edge文件夹为当search功能搜索节点后查看节点边是使用。Mixins文件夹存放用于页面自适应的文件。

# 代码详解
知识图谱总览：
知识图谱总览变量位置：src/store/modules/overview.js
知识图谱总览组件位置：src/views/YouGuang2/components/overview,里面有五个文件，分别是Mainpage.vue，为知识图谱总览的主界面（父组件），包括实体和关系的搜索。实体分为两个子组件实现，一个是NodeChartComponent，用于绘制实体图形，位于页面右边，另一个是SearchNodeComponent，为实体的树形目录结构，位于页面左边。关系与实体相同，分为两个子组件实现，一个是RelationChartComponent,用于绘制关系图形，位于页面右边，另一个是SearchRelationComponent, 为关系的树形目录结构，位于页面左边。

