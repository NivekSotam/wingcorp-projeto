import {Router} from 'express';
import { validacaoCadastroAlunos } from './validacao';
import controller from './controller';

const routerAluno = Router();

routerAluno.post("/", validacaoCadastroAlunos, controller.cadastroAlunos);

export default routerAluno;