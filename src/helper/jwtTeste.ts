import Aluno from "../modules/alunos/module";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { Request, Response, NextFunction, } from "express";

async function token(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { aluno_id, senha } = body;

    const aluno = await Aluno.query()
        .findById(aluno_id)

    if (!aluno) {
        return new Error("Aluno não existe!");
    }

    const senhaValida = await bcrypt.compare(senha, aluno.senha);

    if (!senhaValida) {
        return new Error("Senha ou Usuario Invalidos!");
    }

    const token = jwt.sign({ aluno_id }, 'teste', { expiresIn: '1d' })

    return response.json(token);
}

export default {
    token
}