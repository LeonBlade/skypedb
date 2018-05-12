const { dialog } = require('electron').remote;

const state = {
  db: '',
};

export const mutations = {
  SET_DATABASE_FILE(state, db) {
    state.db = db;
  },
};

const actions = {
  openDatabaseFile({ commit }) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'SQLite', extensions: ['db'] }, // the main skype databases use .db extensions
        { name: 'All files', extensions: ['*'] }, // just in case allow for all files
      ],
    },
    // callback when the file returns
    /** @type {Array[String]} file */
    (file) => {
      // file will be an array with one file or undefined
      if (file === undefined) {
        return;
      }

      // go ahead and commit the mutation with the file
      commit('SET_DATABASE_FILE', file[0]);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
