import express from 'express';
import controller from './controller';

const router = express.Router();


router.post('/', controller.teste);

export default router;
