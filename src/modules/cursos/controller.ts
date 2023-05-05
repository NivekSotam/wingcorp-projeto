import { Request, Response, NextFunction, } from "express";
import Curso from "./module";
import notFoundError from "../../helper/not-found-error";

async function cadastroCursos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { curso } = body

    try {
        const cursoExistente = await Curso.query()
            .findOne({
                curso: curso
            });

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
        response.status(400)
            .json({ message: 'Falha ao realizar o cadastro' })
        next(error);
    }
};

async function listrarCursos(request: Request, response: Response, next: NextFunction) {
    try {
        const CursoListar = await Curso.query()

        response.status(200)
            .json(CursoListar);
    } catch (error) {
        response.status(400)
            .json({ message: "Falha ao listar os Cursos" });
        next(error);
    }
};

async function listarUmCurso(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    const listarUmCurso = await Curso.query()
        .findById(id)

    if (!listarUmCurso) {
        return notFoundError("curso não encontrado", response);
    }

    response.status(200)
        .json(listarUmCurso);
};


async function alterarCurso(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params
    const { body } = request;
    const { curso } = body

    try {
        const cursoAteracao = await Curso.transaction(async transacting => {
            const cursoExistente = await Curso.query()
                .findById(id)

            const cursoNomeExistente = await Curso.query().findOne({
                curso: curso
            })

            if (cursoNomeExistente) {
                return response.status(400).json({
                    mensagem: 'O nome do curso deve ser unico'
                });
            };

            if (!cursoExistente) {
                return notFoundError("Curso não encontrado", response)
            }

            return cursoExistente.$query(transacting)
                .updateAndFetch(body)
        });

        response.status(200)
            .json(cursoAteracao)
    } catch (error) {
        response.status(404)
            .json({ message: "Falha ao atualizar as informações" });
        next(error);
    }
}

async function deletarCurso(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    const deletarCurso = await Curso.transaction(async transacting => {
        return Curso.query(transacting)
            .where('id', '=', id)
            .delete()
    });

    if (!deletarCurso) {
        return notFoundError("Curso não encontrado", response)
    }

    response.status(204)
        .send();
}

export default {
    cadastroCursos,
    listrarCursos,
    listarUmCurso,
    alterarCurso,
    deletarCurso
}