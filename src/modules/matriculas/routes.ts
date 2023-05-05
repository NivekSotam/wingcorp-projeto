import {Router} from 'express';
import validacao from './validacao';
import controller from './controller';

const routerMatriculas = Router();

routerMatriculas.post("/", validacao.validacaoMatriculas, controller.createMatricula, controller.atulizaVagaMatricula );

routerMatriculas.get("/", controller.listarMatricula);
routerMatriculas.get("/:id", controller.listarUmaMatricula); 

routerMatriculas.put("/:id", validacao.validacaoMatriculas, controller.alterarMatricula)

routerMatriculas.delete("/:id", controller.deletarMatricula, )

export default routerMatriculas;