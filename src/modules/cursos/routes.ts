import {Router} from 'express';
import controller from './controller';
import validacao from './validacao';

const routerCursos = Router();

routerCursos.post("/",validacao.validacaoCadastroCursos, controller.cadastroCursos);

export default routerCursos;