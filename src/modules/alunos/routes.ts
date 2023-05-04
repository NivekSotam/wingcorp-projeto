import { Router } from 'express';
import controller from './controller';
import validacao from './validacao';


const routerAluno = Router();

routerAluno.post("/", validacao.validacaoAlunos, controller.cadastroAlunos);

routerAluno.get("/", controller.listrarAlunos)
routerAluno.get("/:id", controller.listrarUmAluno )

routerAluno.put("/:id", validacao.validacaoAlunos, controller.alterarAluno)

routerAluno.delete("/:id", controller.deletarAluno)

export default routerAluno;