import { NextFunction, Response, Request } from "express";
import Joi from "joi";

async function validacaoNotas(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    const schema = Joi.object({
        matricula_id: Joi.number().required(),
        nota: Joi.number().required(),
    });

    const resultado = schema.validate(body);

    if (resultado.error) {
        return response.status(400).json(resultado.error);
    }

    next();
}

export default { 
    validacaoNotas
}