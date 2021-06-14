const state = {
  bigshow3: -1, // 0:search 1:path 2:relation
  node_id: '',
  node_label: '',
  node_name: '',
  options: [{
    value: 'None',
    label: 'None',
    children: [{
      value: 'None',
      label: 'None'
    }]
  }],
  graphdata: {},
  bigshow4: -1,
  node_category: '',
  bigshow5: -1
}

const mutations = {
  SET_BIGSHOW5: (state, p) => {
    state.bigshow5 = p
  },
  SET_NODE_CATEGORY: (state, p) => {
    state.node_category = p
  },
  SET_BIGSHOW4: (state, p) => {
    state.bigshow4 = p
  },
  SET_GRAPHDATA: (state, p) => {
    state.graphdata = p
  },
  SET_BIGSHOW3: (state, p) => {
    state.bigshow3 = p
  },
  SET_NODE_ID: (state, p) => {
    state.node_id = p
  },
  SET_NODE_LABEL: (state, p) => {
    state.node_label = p
  },
  SET_NODE_NAME: (state, p) => {
    state.node_name = p
  },
  SET_OPTIONS: (state, p) => {
    state.options = p
  }
}

const actions = {
  setBigShow5({ commit }, p) {
    commit('SET_BIGSHOW5', p)
  },
  setNodeCategory({ commit }, p) {
    commit('SET_NODE_CATEGORY', p)
  },
  setBigShow4({ commit }, p) {
    commit('SET_BIGSHOW4', p)
  },
  setGraphData({ commit }, p) {
    commit('SET_GRAPHDATA', p)
  },
  setOptions({ commit }, p) {
    commit('SET_OPTIONS', p)
  },
  setBigshow3({ commit }, p) {
    commit('SET_BIGSHOW3', p)
  },
  setNodeId({ commit }, p) {
    commit('SET_NODE_ID', p)
  },
  setNodeLabel({ commit }, p) {
    commit('SET_NODE_LABEL', p)
  },
  setNodeName({ commit }, p) {
    commit('SET_NODE_NAME', p)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
