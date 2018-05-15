import sqlite3 from 'sqlite3';
const { dialog } = require('electron').remote;
let db;


const state = {
  path: '',
  conversations: [],
  convo: null,
};

const mutations = {
  SET_DATABASE_FILE(state, db) {
    state.path = db;
  },

  GET_CONVERSATIONS(state, convos) {
    state.conversations = convos;
  },

  OPEN_CONVO(state, convo) {
    state.convo = convo;
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

      // open connection to database
      db = new sqlite3.Database(file[0], (err) => {
        if (err) {
          throw console.error(err);
        }
        // go ahead and commit the mutation with the file
        commit('SET_DATABASE_FILE', file[0]);
      });
    });
  },

  getConversations({ commit }) {
    db.all(`SELECT c.id, c.displayname, c.identity AS username, t.avatar_url, COUNT(*) AS msg_count
            FROM Conversations AS c 
            INNER JOIN Messages ON c.id = Messages.convo_id
            LEFT JOIN Contacts AS t ON username = t.skypename
            WHERE c.displayname <> '' 
            GROUP BY c.id 
            HAVING msg_count > 1 
            ORDER BY c.displayname COLLATE NOCASE`, (err, rows) => {
      if (err) {
        throw err;
      }
      commit('GET_CONVERSATIONS', rows);
    });
  },

  openConvo({ commit }, id) {
    db.all(`SELECT from_dispname AS displayname, body_xml AS body, timestamp__ms AS timestamp 
            FROM Messages 
            WHERE convo_id = ? AND body_xml <> '' LIMIT 1000`, [id], (err, convo) => {
      if (err) {
        throw err;
      }
      if (convo) {
        commit('OPEN_CONVO', convo);
      }
    });
  },
};

const getters = {
  getConversations: state => state.conversations,
  getMessages: state => state.convo,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
