import {Router} from 'express';
import controller from './controller';
import validacao from './validacao';

const routerCursos = Router();

routerCursos.post("/",validacao.validacaoCadastroCursos, controller.cadastroCursos);

routerCursos.get("/", controller.listrarCursos);
routerCursos.get("/:id", controller.listrarUmCurso);

routerCursos.put("/:id", validacao.validacaoAlteracaoCurso, controller.alterarCurso)



export default routerCursos;