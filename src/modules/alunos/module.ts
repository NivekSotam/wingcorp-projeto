import { Model } from "objection";
class Aluno extends Model {

    static get tableName() {
        return "alunos";
    }

    static get idColumn(){
        return "id";
    }

    id!: number;

    nome!: string;

    cpf!: string;
    
    email!: string;

};


export default Aluno