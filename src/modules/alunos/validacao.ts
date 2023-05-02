
import { NextFunction, Response, Request } from "express";
import Joi from "joi";

export function validacaoCadastroAlunos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    const schema = Joi.object({
        nome: Joi.string().min(1).max(100).required(),
        cpf: Joi.string().length(11).required(),
        email: Joi.string().min(1).max(100).required(),
    });

    const resultado = schema.validate(body);

    if (resultado.error) {
        return response.status(400).json(resultado.error);
    }

    next();
}

export function validacaoAlteracaoAlunos(request: Request, response: Response, next: NextFunction){
    const { body } = request;
    
    const schema = Joi.object({
        nome: Joi.string().min(1).max(100).required(),
        cpf: Joi.string().length(11).required(),
        email: Joi.string().min(1).max(100).required(),
    });
    
    const resultado = schema.validate(body);
    
    if (resultado.error) {
      return response.status(400).json(resultado.error);
    } 
    
      next();
  }