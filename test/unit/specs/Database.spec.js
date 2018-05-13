import modules from '@/store/modules';

/* eslint-disable no-underscore-dangle */
const { mutations } = modules.Database;

describe('mutations', () => {
  it('should set the database file', () => {
    // example state
    const state = { db: '' };
    // call the mutation
    mutations.SET_DATABASE_FILE(state, 'test.db');
    // expect the value to be set
    expect(state.db).to.equal('test.db');
  });
});
