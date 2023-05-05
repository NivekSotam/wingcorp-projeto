import { Model } from "objection";
import Matricula from "../matriculas/module";
class Notas extends Model {

    static get tableName() {
        return "notas";
    }

    static get idColumn(){
        return "id";
    }

    id!: number;

    matricula_id!: number;

    nota!: number;

    static get relationMappings() {
        return {
            matricula: {
                relation: Notas.HasOneRelation,
                modelClass: Matricula,
                join: {
                    from: "notas.matricula_id",
                    to: "matriculas.id",
                }
                
            }
  
        }
    }
};

export default Notas