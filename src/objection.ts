import { Model } from "objection";
import  Knex from "knex";

const knex = Knex({
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'cursoalunos'
      },
});
  

Model.knex(knex);

export default Model;