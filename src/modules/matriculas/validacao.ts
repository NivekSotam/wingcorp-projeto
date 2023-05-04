import { NextFunction, Response, Request } from "express";
import Joi from "joi";

async function validacaoMatriculas(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    const schema = Joi.object({
        curso_id: Joi.number().required(),
        aluno_id: Joi.number().required()
    });

    const resultado = schema.validate(body);

    if (resultado.error) {
        return response.status(400).json(resultado.error);
    }

    next();
}


export default { 
    validacaoMatriculas
}