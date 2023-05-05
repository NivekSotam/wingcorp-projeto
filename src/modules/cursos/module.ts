import { Model } from "objection";
class Curso extends Model {
    
    static get tableName() {
        return "cursos";
    }

    static get idColumn(){
        return "id";
    }

    id!: number;

    curso!: string;

    descricao!: string;
    
    turno!: string;

    vagas!: number;

};

export default Curso