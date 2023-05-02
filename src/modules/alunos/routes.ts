import { Router } from 'express';
import controller from './controller';
import {
    validacaoCadastroAlunos,
    validacaoAlteracaoAlunos
} from './validacao';


const routerAluno = Router();

routerAluno.post("/", validacaoCadastroAlunos, controller.cadastroAlunos);

routerAluno.get("/", controller.ListrarAlunos)
routerAluno.get("/:id", controller.ListrarUmAluno )

routerAluno.put("/:id", validacaoAlteracaoAlunos)

export default routerAluno;