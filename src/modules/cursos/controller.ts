import { Request, Response, NextFunction, } from "express";
import Curso from "./module";
import notFoundError from "../../helper/not-found-error";

async function cadastroCursos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { curso } = body

    try {
        const cursoExistente = await Curso.query().findOne({
            curso: curso
        })
        
        if (cursoExistente) {
            return response.status(400).json({
                mensagem: 'O nome do curso deve ser unico'
            });
        };

        const cursoInsert = await Curso.transaction(async transacting => {
            return Curso.query(transacting)
                .insertAndFetch(body)
        });

        response.status(200)
        .json(cursoInsert)
    }
    catch (error) {
        next(error);
        response.status(400)
            .json({ message: 'Falha ao realizar o cadastro' })
    }
}

export default {
    cadastroCursos
}