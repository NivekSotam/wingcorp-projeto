import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("alunos", fields => {
        fields.bigIncrements("id")
            .primary();

        fields.string("nome", 100)
            .notNullable();

        fields.string("cpf", 11)
            .notNullable();

        fields.string("email", 100)
            .notNullable();
        
        fields.string("senha", 255)
            .notNullable();

        fields.unique(["email"])
        fields.unique(["cpf"])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("alunos");
} 