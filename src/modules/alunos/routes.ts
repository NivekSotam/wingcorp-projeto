import {Router} from 'express';
import cadastroAlunos, { validacaoCadastroAlunos } from './controller';

const router = Router();

router.get("/", validacaoCadastroAlunos,  cadastroAlunos );

export default router;