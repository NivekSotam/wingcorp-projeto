import { Request, Response, NextFunction, } from "express";
import Aluno from "./module";
import notFoundError from "../../helper/not-found-error";

async function cadastroAlunos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { email, cpf } = body;

    try {
        const AlunoExistente = await Aluno.query().findOne({
            email: email,
            cpf: cpf
        })

        if (AlunoExistente) {
            return response.status(400).json({
                mensagem: 'O endereço de e-mail e cpf devem ser unicos'
            });
        };

        const aluno = await Aluno.transaction(async transacting => {
            return Aluno.query(transacting)
                .insertAndFetch(body)
        });

        response.status(200)
            .json(aluno)
    } catch (error) {
        next(error);
        response.status(400)
            .json({ message: 'Falha ao realizar o cadastro' })
    }
};

async function listrarAlunos(request: Request, response: Response, next: NextFunction) {
    try {
        const aluno = await Aluno.query()

        response.status(200)
            .json(aluno);
    } catch (error) {
        response.status(400)
            .json({ message: "Falha ao listar os Alunos" });
        next(error);
    }
};

async function listrarUmAluno(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    const aluno = await Aluno.query()
        .findById(id)

    if (!aluno) {
        return notFoundError("Aluno não encontrado", response);
    }

    response.status(200)
        .json(aluno);
};

async function alterarAluno(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params
    const { body } = request;

    try {
        const aluno = await Aluno.transaction(async transacting => {
            const alunoExistente = await Aluno.query()
                .findById(id)

            if (!alunoExistente) {
                return notFoundError("Aluno não encontrado", response)
            }

            return alunoExistente.$query(transacting)
                .updateAndFetch(body)
        });

        response.status(200)
            .json(aluno)
    } catch (error) {
        response.status(404)
            .json({ message: "Falha ao atualizar as informações" });
        next(error);
    }
}

async function deletarAluno(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    const aluno = await Aluno.transaction(async transacting => {
        return Aluno.query(transacting)
            .where('id', '=', id)
            .delete()
    });

    if (!aluno) {
        return notFoundError("Aluno não encontrado", response)
    }

    response.status(204)
        .send();
}

export default {
    cadastroAlunos,
    listrarAlunos,
    listrarUmAluno,
    alterarAluno,
    deletarAluno
}
