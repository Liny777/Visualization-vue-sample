const state = {
  startid: '',
  endid: '',
  startname: '',
  endname: '',
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
  graphdata: {},
  radio: false
  // redpoint: true
  // des: '',
}

const mutations = {
  // SET_REDPOINT: (state, red) => {
  //   state.redpoint = red
  // },
  SET_RADIO: (state, ra) => {
    state.radio = ra
  },
  ADD_HISTORY_RECORD: (state, history) => {
    state.histories.push(history)
  },
  CLEAR_HISTORY_RECORD: (state) => {
    state.histories.splice(0)
  },
  SET_STARTID: (state, sid) => {
    state.startid = sid
  },
  SET_ENDID: (state, eid) => {
    state.endid = eid
  },
  SET_STARTNAME: (state, sname) => {
    state.startname = sname
  },
  SET_ENDNAME: (state, ename) => {
    state.endname = ename
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
  SET_NODE_DATA: (state, node) => {
    state.graphnode = node
  },
  SET_EDGE_DATA: (state, edge) => {
    state.graphedge = edge
  },
  SET_GRAPH_DATA: (state, responseData) => {
    state.graphdata = responseData
  }
}

const actions = {
  // setRedPoint({ commit }, red) {
  //   commit('SET_REDPOINT', red)
  // },
  setRadio({ commit }, ra) {
    commit('SET_RADIO', ra)
  },
  addHistoryRecord({ commit }, history) {
    commit('ADD_HISTORY_RECORD', history)
  },
  clearHistoryRecord({ commit }) {
    commit('CLEAR_HISTORY_RECORD')
  },
  setStartId({ commit }, sid) {
    commit('SET_STARTID', sid)
  },
  setEndId({ commit }, eid) {
    commit('SET_ENDID', eid)
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
  setNodeData({ commit }, node) {
    commit('SET_NODE_DATA', node)
  },
  setEdgeData({ commit }, edge) {
    commit('SET_EDGE_DATA', edge)
  },
  setStartName({ commit }, sname) {
    commit('SET_STARTNAME', sname)
  },
  setEndName({ commit }, ename) {
    commit('SET_ENDNAME', ename)
  },
  setGraphData({ commit }, responseData) {
    commit('SET_GRAPH_DATA', responseData)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
