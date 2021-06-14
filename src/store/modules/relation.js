const state = {
  searchid: [],
  searchname: [],
  histories: [],
  maxdegree: 3,
  chosennode: 0,
  chosenedge: 0,
  nodelabel: [],
  edgelabel: [],
  chosennodelabel: [],
  chosenedgelabel: [],
  graphnode: [],
  graphedge: [],
  graphdata: [],
  radio: false,
  category: []
  // deleteindex: [],
  // deletename: []
  // objectnum: 0
  // redpoint: true
  // des: '',
}

const mutations = {
  // CLEAR_OBJECTNUM: (state) => {
  //   state.objectnum = 0
  // },
  // ADD_OBJECT_NUM: (state) => {
  //   state.objectnum = state.objectnum + 1
  // },
  ADD_CATEGORY: (state, p) => {
    state.category.push(p)
  },
  SET_RADIO: (state, ra) => {
    state.radio = ra
  },
  SET_CATEGORY: (state, p) => {
    state.category = p
  },
  CLEAR_CATEGORY: (state) => {
    state.category.splice(0)
  },
  ADD_HISTORY_RECORD: (state, history) => {
    state.histories.push(history)
  },
  CLEAR_HISTORY_RECORD: (state) => {
    state.histories.splice(0)
  },
  ADD_SEARCHID: (state, sid) => {
    state.searchid.push(sid)
  },
  CLEAR_SEARCHID: (state) => {
    state.searchid.splice(0)
  },
  ADD_SEARCH_NAME: (state, sid) => {
    state.searchname.push(sid)
  },
  CLEAR_SEARCH_NAME: (state) => {
    state.searchname.splice(0)
  },
  SET_MAXDEGREE: (state, maxd) => {
    state.maxdegree = maxd
  },
  SET_CHOSENNODEID: (state, choseid) => {
    state.chosennode = choseid
  },
  SET_CHOSENEDGE: (state, chosedge) => {
    state.chosenedge = chosedge
  },
  SET_NODELABEL: (state, node) => {
    state.nodelabel = node
  },
  SET_EDGELABEL: (state, edge) => {
    state.edgelabel = edge
  },
  SET_CHOSENNODELABEL: (state, node1) => {
    state.chosennodelabel = node1
  },
  SET_CHOSENEDGELABEL: (state, edge1) => {
    state.chosenedgelabel = edge1
  },
  ADD_NODE_DATA: (state, n) => {
    state.graphnode.push(n)
  },
  CONCAT_NODE_DATA: (state, node) => {
    state.graphnode.concat(node)
  },
  CLEAR_NODE_DATA: (state) => {
    state.graphnode.splice(0)
  },
  ADD_EDGE_DATA: (state, edge) => {
    state.graphedge.push(edge)
  },
  CONCAT_EDGE_DATA: (state, edge) => {
    state.graphedge.concat(edge)
  },
  CLEAR_EDGE_DATA: (state) => {
    state.graphedge.splice(0)
  },
  ADD_GRAPH_DATA: (state, responseData) => {
    state.graphdata.push(responseData)
  },
  CLEAR_GRAPH_DATA: (state) => {
    state.graphdata.splice(0)
  },
  SET_EDGE_DATA: (state, edge) => {
    state.graphedge = edge
  },
  SET_GRAPH_DATA: (state, responseData) => {
    state.graphdata = responseData
  },
  SET_NODE_DATA: (state, node) => {
    state.graphnode = node
  }
  // DELETE_DATA: (state, i) => {
  //   state.graphdata.splice(i, 1)
  //   state.searchid.splice(i, 1)
  //   state.searchname.splice(i, 1)
  // },
  // SET_DELETE_INDEX: (state, i) => {
  //   state.deleteindex = i
  // },
  // SET_DELETE_NAME: (state, i) => {
  //   state.deletename = i
  // }
}
// 删除后，forcechart里的节点和边数据也要相应删除，只要把对应的cate的id删除就行，重置也差不多直接清空就行。
const actions = {
  // setDeleteName({ commit }, ra) {
  //   commit('SET_DELETE_NAME', ra)
  // },
  // setDeleteIndex({ commit }, ra) {
  //   commit('SET_DELETE_INDEX', ra)
  // },
  // deleteData({ commit }, i) {
  //   commit('DELETE_DATA', i)
  // },
  clearCategory({ commit }) {
    commit('CLEAR_CATEGORY')
  },
  addCategory({ commit }, name) {
    commit('ADD_CATEGORY', name)
  },
  setCategory({ commit }, name) {
    commit('SET_CATEGORY', name)
  },
  clearSearchName({ commit }) {
    commit('CLEAR_SEARCH_NAME')
  },
  addSearchName({ commit }, name) {
    commit('ADD_SEARCH_NAME', name)
  },
  setRadio({ commit }, ra) {
    commit('SET_RADIO', ra)
  },
  addHistoryRecord({ commit }, history) {
    commit('ADD_HISTORY_RECORD', history)
  },
  clearHistoryRecord({ commit }) {
    commit('CLEAR_HISTORY_RECORD')
  },
  addSearchId({ commit }, sid) {
    commit('ADD_SEARCHID', sid)
  },
  clearSearchId({ commit }) {
    commit('CLEAR_SEARCHID')
  },
  setMaxDegree({ commit }, maxd) {
    commit('SET_MAXDEGREE', maxd)
  },
  setChosenId({ commit }, choseid) {
    commit('SET_CHOSENNODEID', choseid)
  },
  setChosenEdge({ commit }, chosedge) {
    commit('SET_CHOSENEDGE', chosedge)
  },
  setNodeLabel({ commit }, node) {
    commit('SET_NODELABEL', node)
  },
  setEdgeLabel({ commit }, edge) {
    commit('SET_EDGELABEL', edge)
  },
  setChosenNodeLabel({ commit }, node1) {
    commit('SET_CHOSENNODELABEL', node1)
  },
  setChosenEdgeLabel({ commit }, edge1) {
    commit('SET_CHOSENEDGELABEL', edge1)
  },
  clearNodeData({ commit }) {
    commit('CLEAR_NODE_DATA')
  },
  clearEdgeData({ commit }) {
    commit('CLEAR_EDGE_DATA')
  },
  addNodeData({ commit }, node) {
    commit('ADD_NODE_DATA', node)
  },
  addEdgeData({ commit }, edge) {
    commit('ADD_EDGE_DATA', edge)
  },
  concatNodeData({ commit }, node) {
    commit('CONCAT_NODE_DATA', node)
  },
  concatEdgeData({ commit }, edge) {
    commit('CONCAT_EDGE_DATA', edge)
  },
  setNodeData({ commit }, node) {
    commit('SET_NODE_DATA', node)
  },
  setEdgeData({ commit }, edge) {
    commit('SET_EDGE_DATA', edge)
  },
  // setStartName({ commit }, sname) {
  //   commit('SET_STARTNAME', sname)
  // },
  addGraphData({ commit }, responseData) {
    commit('ADD_GRAPH_DATA', responseData)
  },
  clearGraphData({ commit }) {
    commit('CLEAR_GRAPH_DATA')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
