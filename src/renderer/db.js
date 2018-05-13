const sqlite3 = require('sqlite3').verbose();

/** Class used to handle sqlite tasks */
export default class Db {
  constructor() {
    this.db = null;
  }

  /**
   * Opens a connection to a sqlite database
   * @param {String} path Path to the sqlite database
   */
  open(path) {
    try {
      // set our db variable to a new instance of sqlite database from our path
      this.db = new sqlite3.Database(path, (err) => {
        if (err) {
          console.error(err);
        }
      });
      /* eslint-disable no-underscore-dangle */
      if (!this._validate()) {
        throw new Error('Invalid sqlite file');
      }
    } catch (ex) {
      // TODO: handle this exception in a better way
      console.error(ex);
    }
  }

  /**
   * Validates the sqlite database against known tables in skype main.db
   * @returns bool|null
   */
  _validate() {
    // make sure we first actually have a db instance going
    if (this.db == null) {
      return null;
    }

    this.db.serialize(() => {
      const sql = "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('Accounts', 'Conversations', 'Messages')";
      this.db.all(sql, (err, rows) => {
        // we got an error :(
        if (err) {
          console.error(err);
          return false;
        }

        // make sure we got 3 tables back
        if (rows.length !== 3) {
          console.error('ya blew it kapeesh??');
          return false;
        }

        console.log('we did it!');

        return true;
      });
    });

    // all checks pass!
    return true;
  }

  /**
   * Find data from the database
   * @param {String} sql SQL statement to run
   * @param {Function} fn Callback for when the data is returned
   */
  /*
    find(data, fn) {
    try {
      this.db.serialize(() => {
        const { table, fields, where, order, limit } = data;
        // form the statement
        const sql = `
          SELECT ${fields.join(',')}
          FROM ${table}
          WHERE ?
          ${order ? `ORDER BY ${order}` : ''}
          ${limit ? `LIMIT ${limit}` : ''}`;
        const stmt = this.db.prepare(sql);
        Object.keys(where).forEach((key) => {
          stmt.run(key, where[key]);
        });
        stmt.all((err, rows) => fn(err, rows));
        stmt.finalize();
        // this.db.all(sql, [where], (err, rows) => fn(err, rows));
      });
    } catch (ex) {
      console.error(ex);
    }
  }
  */

  find(sql, params, fn) {
    try {
      this.db.serialize(() => {
        if (fn === undefined && typeof params === 'function') {
          fn = params;
          params = [];
        }
        this.db.all(sql, params, (err, rows) => fn(err, rows));
      });
    } catch (ex) {
      console.error(ex);
    }
  }
}
