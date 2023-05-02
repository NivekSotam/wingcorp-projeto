import { Request, Response, NextFunction, } from "express";
import Aluno from "./module";

async function cadastroAlunos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { email, cpf } = body;

    try {
        const AlunoEmailExistente = await Aluno.query().findOne({
            email: email
        })
        const AlunoCpfExistente = await Aluno.query().findOne({
            cpf: cpf
        })

        if (AlunoEmailExistente) {
            return response.status(400).json({
                mensagem: 'O endereço de e-mail já está cadastrado'
            });
        };

        if (AlunoCpfExistente) {
            return response.status(400).json({
                mensagem: 'Este CPF já está cadastrado'
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

async function ListrarAlunos(request: Request, response: Response, next: NextFunction) {
    try {
        const aluno = await Aluno.query()

        response.status(200)
            .json(aluno);
    } catch (error) {
        next(error);
        response.status(400)
            .json({ message: "Falha ao listar os Alunos" });
    }
}

export default {
    cadastroAlunos,
    ListrarAlunos
}
