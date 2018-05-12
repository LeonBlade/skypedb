import Seqelize from 'sequelize';

export default new Seqelize(null, null, null, {
  dialect: 'sqlite',
  storage: 'database.sqlite',
});
