import store from '@/store';

/* eslint-disable no-underscore-dangle */
const { SET_DATABASE_FILE } = store._mutations;

describe('mutations', () => {
  it('should set the database file', () => {
    // example state
    const state = { db: '' };
    // call the mutation
    SET_DATABASE_FILE(state, 'test.db');
    // expect the value to be set
    expect(state.db).to.equal('test.db');
  });
});
