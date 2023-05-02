import { Router } from 'express';
import controller from './controller';
import {
    validacaoCadastroAlunos,
    validacaoAlteracaoAlunos
} from './validacao';


const routerAluno = Router();

routerAluno.post("/", validacaoCadastroAlunos, controller.cadastroAlunos);

routerAluno.get("/", controller.listrarAlunos)
routerAluno.get("/:id", controller.listrarUmAluno )

routerAluno.put("/:id", validacaoAlteracaoAlunos)

export default routerAluno;