import { Request, Response, NextFunction, } from "express";
import Aluno from "./module";
import routerAluno from "./routes";
import { transaction } from "objection";

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
        next(error);
        response.status(400)
            .json({ message: "Falha ao listar os Alunos" });
    }
}

async function listrarUmAluno(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    try {
        const aluno = await Aluno.query()
            .findById(id)

        response.status(200)
            .json(aluno);

    } catch (error) {
        next(error);
        response.status(404)
            .json({ message: "Aluno não existe" });
    }
}

async function AlterarAluno(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params
    const { body } = request;

    try {
        const aluno = await Aluno.transaction(async transacting =>{
            return Aluno.query(transacting)
                .updateAndFetchById(id, body)
        });

        response.status(200)
        .json(aluno)
    } catch (error) {
        next(error);
        response.status(404)
            .json({ message: "Falha ao atualizar as informações" });
    }
}



export default {
    cadastroAlunos,
    listrarAlunos,
    listrarUmAluno,
    AlterarAluno
}
