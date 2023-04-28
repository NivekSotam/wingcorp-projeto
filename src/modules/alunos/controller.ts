import { Request, Response, NextFunction } from "express";
import Joi from "joi";


function validacaoCadastroAlunos(request: Request, response: Response, next: NextFunction) {
    const schema = Joi.object({
      nome: Joi.string().min(1).max(100).required(),
      cpf: Joi.string().min(11).max(11).required(),
      email: Joi.string().min(1).max(100).required(),
    });
    const resultado = schema.validate(request.body);
    if (resultado.error) {
      response.status(400).json(resultado.error);
    } else {
      next();
    }
}

export default async function teste (request: Request, response: Response): Promise<void> {
    const { body } = request ;

    response.status(200)
        .json(body);
};

