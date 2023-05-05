import {Router} from 'express';
import validacao from './validacao';

const routerNotas = Router();

routerNotas.post("/", validacao.validacaoNotas );

export default routerNotas;