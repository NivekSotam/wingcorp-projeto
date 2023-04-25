const { Model } = require('objection');
const Knex = require('knex');


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knex = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'localhost',
      password: '',
      database: 'cursoalunos'
    }
  },
};

Model.knex(knex);
