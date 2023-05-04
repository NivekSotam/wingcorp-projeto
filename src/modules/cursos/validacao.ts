import { NextFunction, Response, Request } from "express";
import Joi from "joi";

async function validacaoCursos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    const schema = Joi.object({
        curso: Joi.string().min(1).max(100).required(),
        descricao: Joi.string().min(1).max(500),
        turno: Joi.string().min(1).max(100).required(),
        vagas: Joi.number().min(1).max(100).required()
    });

    const resultado = schema.validate(body);

    if (resultado.error) {
        return response.status(400).json(resultado.error);
    }

    next();
}

export default {
    validacaoCursos
}