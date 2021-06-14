const state = {
  edgelabel: '',
  nodeid: '',
  nodelabel: ''
}

const mutations = {
  SET_NODE_ID: (state, p) => {
    state.nodeid = p
  },
  SET_NODE_LABEL: (state, p) => {
    state.nodelabel = p
  },
  SET_EDGELABEL: (state, p) => {
    state.edgelabel = p
  }
}

const actions = {
  setNodeId({ commit }, p) {
    commit('SET_NODE_ID', p)
  },
  setNodeLabel({ commit }, p) {
    commit('SET_NODE_LABEL', p)
  },
  setEdgeLabel({ commit }, p) {
    commit('SET_EDGELABEL', p)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
