export function up(knex) {
    return knex.schema.createTable("alunos", fields => {
        fields.bigIncrements("id")
            .primary();

        fields.string("nome", 100)
            .notNullable();

        fields.string("cpf", 11)
            .notNullable();

        fields.string("email", 100)
            .notNullable();

        fields.unique(["email"])
        fields.unique(["cpf"])
    })
}

export function down(knex) {
    return knex.schema.dropTableIfExists("alunos");
}
