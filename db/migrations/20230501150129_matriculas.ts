import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("matriculas", fields => {
        fields.bigIncrements("id")
            .primary();

        fields.bigInteger("curso_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("cursos");

        fields.bigInteger("aluno_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("alunos");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("matriculas");
}

