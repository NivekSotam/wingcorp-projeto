import {Router} from 'express';
import teste from './controller';

const router = Router();

router.get("/", () => teste );

export default router;