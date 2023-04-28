import { Request, Response, NextFunction, } from "express";
import Joi from "joi";
import Aluno from "./module";

export function validacaoCadastroAlunos(request: Request, response: Response, next: NextFunction) {
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

export default async function cadastroAlunos(request: Request, response: Response): Promise<void> {
    const AlunoExistente = await Aluno
        .where('email', '=', request.body.email)
        .fetch();
    if (AlunoExistente) {
        response.status(400).json({
            mensagem: 'O endereço de e-mail já está cadastrado'
        });
        return;
    };

    const novoAluno = new Aluno(
        nome: request.body.nome ,
        cpf: request.body.cpf,
        email: request.body.email,
    );

    const retorno = await novoAluno.save();
    request.status(201).json(retorno);
};