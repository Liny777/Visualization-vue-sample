const state = {
  category: '',
  entity: '',
  label: '',
  relation_cate: '',
  relation_label: '',
  small_show1: true,
  small_show2: false,
}

const mutations = {
  SET_ENTITY_ID: (state, data) => {
    state.entity = data
  },
  SET_CATE_NAME: (state, data) => {
    state.category = data
  },
  SET_CATE_LABEL: (state, data) => {
    state.label = data
  },
  SET_RELATION_CATE: (state, data) => {
    state.relation_cate = data
  },
  SET_RELATION_LABEL: (state, data) => {
    state.relation_label = data
  },
  SET_SMALL_SHOW1: (state, data) => {
    state.small_show1 = data
  },
  SET_SMALL_SHOW2: (state, data) => {
    state.small_show2 = data
  },
}

const actions = {
  setSmallShow1({ commit }, data) {
    commit('SET_SMALL_SHOW1', data)
  },
  setSmallShow2({ commit }, data) {
    commit('SET_SMALL_SHOW2', data)
  },
  setEntityId({ commit }, data) {
    commit('SET_ENTITY_ID', data)
  },
  setCateName({ commit }, data) {
    commit('SET_CATE_NAME', data)
  },
  setCateLabel({ commit }, data) {
    commit('SET_CATE_LABEL', data)
  },
  setRelationCate({ commit }, data) {
    commit('SET_RELATION_CATE', data)
  },
  setRelationLabel({ commit }, data) {
    commit('SET_RELATION_LABEL', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
