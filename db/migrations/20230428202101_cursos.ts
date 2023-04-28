import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cursos", fields => {
        fields.bigIncrements("id")
            .primary();
        
        fields.string("curso", 100)
            .notNullable();

        fields.string("descricao", 500)

        fields.string("turno", 50)
            .notNullable();
        
        fields.integer("vagas", 100)
            .notNullable();

        
        fields.unique(["curso"])

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("cursos");
}

