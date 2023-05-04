import {Router} from 'express';
import controller from './controller';
import validacao from './validacao';

const routerCursos = Router();

routerCursos.post("/",validacao.validacaoCursos, controller.cadastroCursos);

routerCursos.get("/", controller.listrarCursos);
routerCursos.get("/:id", controller.listarUmCurso);

routerCursos.put("/:id", validacao.validacaoCursos, controller.alterarCurso);

routerCursos.delete("/:id", controller.deletarCurso);

export default routerCursos;