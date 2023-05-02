import { Router } from 'express';
import controller from './controller';
import {
    validacaoCadastroAlunos,
    validacaoAlteracaoAlunos
} from './validacao';


const routerAluno = Router();

routerAluno.post("/", validacaoCadastroAlunos, controller.cadastroAlunos);
routerAluno.get("/", controller.ListrarAlunos)
routerAluno.put("/", validacaoAlteracaoAlunos)

export default routerAluno;