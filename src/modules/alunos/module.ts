import { Model } from "objection";

class Aluno extends Model {
    static get tableName() {
        return "alunos";
    }
};

export default Aluno;