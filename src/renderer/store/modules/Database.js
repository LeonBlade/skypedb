const state = {
  db: '',
};

const mutations = {
  SET_DATABASE_FILE(state, db) {
    state.db = db;
  },
};

const actions = {
  setDatabaseFile({ commit }, db) {
    commit('SET_DATABASE_FILE', db);
  },
};

export default {
  state,
  mutations,
  actions,
};
