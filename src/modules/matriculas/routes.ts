import {Router} from 'express';
import validacao from './validacao';
import controller from './controller';

const routerMatriculas = Router();

routerMatriculas.post("/", validacao.validacaoCadastroMatriculas, controller.createMatricula );

export default routerMatriculas;