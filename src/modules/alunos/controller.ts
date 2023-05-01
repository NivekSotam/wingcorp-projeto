import { Request, Response, NextFunction, } from "express";
import Aluno from "./module";

async function cadastroAlunos(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { email } = body;
    
    try {
        const AlunoExistente = await Aluno.query().findOne({
            email: email
        })
        
        if (AlunoExistente) {
            return response.status(400).json({
                mensagem: 'O endereço de e-mail já está cadastrado'
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

export default {
    cadastroAlunos,
}
