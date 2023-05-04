import {Router} from 'express';
import validacao from './validacao';
import controller from './controller';

const routerMatriculas = Router();

routerMatriculas.post("/", validacao.validacaoCadastroMatriculas, controller.createMatricula );

routerMatriculas.get("/", controller.listarMatricula);
routerMatriculas.get("/:id", controller.listarUmaMatricula); 

routerMatriculas.delete("/:id", controller.deletarMatricula)

export default routerMatriculas;