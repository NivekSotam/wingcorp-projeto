import {Router} from 'express';
import validacao from './validacao';
import controller from './controller';

const routerNotas = Router();

routerNotas.post("/", validacao.validacaoNotas, controller.cadastrarNotas);

routerNotas.get("/", controller.listarNotas);
routerNotas.get("/:id", controller.listarUmaNota);

routerNotas.put("/:id", validacao.validacaoNotas, controller.alterarNota );

routerNotas.delete("/:id",  controller.deletarNotas);

export default routerNotas;