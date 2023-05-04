import { Request, Response, NextFunction, } from "express";
import Matricula from "./module";
import Curso from "../cursos/module";
import notFoundError from "../../helper/not-found-error";
import Aluno from "../alunos/module";

async function createMatricula(request: Request, response: Response, next: NextFunction) {
  const { body } = request;
  const { curso_id, aluno_id } = body

  try {
    const matriculaInsert = await Matricula.transaction(async transacting => {
      const AlunoVerificacao = await Aluno.query()
        .findById(aluno_id)
      
      const CursoVerificacao = await Curso.query()
        .findById(curso_id)
      
      if (!AlunoVerificacao) {
        return notFoundError("Aluno não encontrado", response)
      }

      if(!CursoVerificacao) {
        return notFoundError("Curso não encontrado", response)
      }

      return Matricula.query(transacting)
        .insertAndFetch(body)
    });

    response.status(200)
      .json(matriculaInsert)
  } catch (error) {
    response.status(404)
      .json({ message: "Falha ao atualizar as informações" });
    next(error);
  }
}

async function getMatricula(request: Request, response: Response, next: NextFunction) {
  try {
    const matriculas = await Matricula.query()
      .withGraphFetched({ curso: true, aluno: true });

    response.status(200)
      .json(matriculas);
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao listar as matrículas" });
    next(error);
  }
}

export default {
  createMatricula
}