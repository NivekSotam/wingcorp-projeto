import {Router} from 'express';
import Teste from './controller';

const router = Router();

router.get("/", () => Teste );

export default router;