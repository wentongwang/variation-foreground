const getDefaultState = () => {
  return {
    gene: [],
    position: [],
    variation: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_GENE: (state, gene) => {
    state.gene = gene
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_VARIATION: (state, variation) => {
    state.variation = variation
  }
}

const actions = {
  geneSearch({ commit }, gene) {
    commit('SET_GENE', gene)
  },
  positionSearch({ commit }, position) {
    commit('SET_POSITION', position)
  },
  variationSearch({ commit }, variation) {
    commit('SET_VARIATION', variation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
