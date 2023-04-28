const knex = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'cursoalunos'
    },
    migrations: {
      tableName: "knex_migrations",
    }
  },
};

export default knex ;
