import {Router} from 'express';
import cadastroAlunos, { validacaoCadastroAlunos } from './controller';

const router = Router();

router.post("/", validacaoCadastroAlunos,  cadastroAlunos );

export default router;