import { Model } from "objection";
import Aluno from "../alunos/module";
import Curso from "../cursos/module";

class Matricula extends Model {

    static get tableName() {
        return "matriculas";
    }

    static get idColumn(){
        return "id";
    }

    id!: number;

    curso_id!: number;

    aluno_id!: number;

    static get relationMappings() {
        return {
            curso: {
                relation: Matricula.HasOneRelation,
                modelClass: Curso,
                join: {
                    from: "curso._id",
                    to: "curso.id"
                }
            },
            aluno: {
                relation: Matricula.HasOneRelation,
                modelClass: Aluno,
                join: {
                    from: "matriculas.aluno_id",
                    to: "alunos.id"
                }
            }  
        }
    }

};


export default Matricula