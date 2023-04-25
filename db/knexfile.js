// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knex = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test'
    }
  },
};

Model.knex(knex);
