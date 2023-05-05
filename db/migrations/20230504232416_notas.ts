import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("notas", fields => {
        fields.bigIncrements("id")
            .primary();

        fields.bigInteger("matricula_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("matriculas");

        fields.unique(["matricula_id"])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("notas");
}

