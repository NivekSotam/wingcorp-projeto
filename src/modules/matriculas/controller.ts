import { Request, Response, NextFunction, } from "express";
import Matricula from "./module";
import Curso from "../cursos/module";
import notFoundError from "../../helper/not-found-error";
import Aluno from "../alunos/module";

async function atulizaVagaMatricula(request: Request, response: Response, next: NextFunction) {
  const { body } = request;
  const { curso_id } = body;

  const vagaCurso = await Curso.query()
    .findById(curso_id);

  if (!vagaCurso) {
    return response.status(404).json({ message: "not found" });
  }

  const { vagas } = vagaCurso;

  if (vagas === 0) {
    return response.status(412).json({ message: "Não tem vagas disponiveis" });
  }

  const updateVagas = await Curso.transaction(async transacting => {
    const quantidadeInscricaoPadrao = 1;
    const novaQuantidadeVagas = vagas - quantidadeInscricaoPadrao;

    const valuesToUpdate = {
      ...vagaCurso,
      vagas: novaQuantidadeVagas
    }

    return vagaCurso.$query(transacting)
      .updateAndFetch(valuesToUpdate);
  })

}

async function createMatricula(request: Request, response: Response, next: NextFunction) {
  const { body } = request;
  const { curso_id, aluno_id } = body;

  try {
    const matriculaInsert = await Matricula.transaction(async transacting => {
      const alunoVerificacao = await Aluno.query()
        .findById(aluno_id);

      const cursoVerificacao = await Curso.query()
        .findById(curso_id);

      if (!alunoVerificacao) {
        return notFoundError("Aluno não encontrado", response);
      }

      if (!cursoVerificacao) {
        return notFoundError("Curso não encontrado", response);
      }

      return Matricula.query(transacting)
        .insertAndFetch(body);
    });

    response.status(200)
      .json(matriculaInsert)
  } catch (error) {
    response.status(404)
      .json({ message: "Falha ao atualizar as informações" });
    next(error);
  }
  next();
}

async function listarMatricula(request: Request, response: Response, next: NextFunction) {
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

async function listarUmaMatricula(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params

  try {
    const listarUmaMatricula = await Matricula.query()
      .findById(id)
      .withGraphFetched({ curso: true, aluno: true });

    if (!listarUmaMatricula) {
      return notFoundError("Matricula não encontrado", response);
    }

    response.status(200)
      .json(listarUmaMatricula);
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao listar as matrículas" });
    next(error);
  }
}

async function alterarMatricula(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params
  const { body } = request;
  const { aluno_id, curso_id } = body

  try {
    const matriculaAlteracao = await Matricula.transaction(async transacting => {
      const matriculaExistente = await Matricula.query()
        .findById(id)

      const alunoVerificacao = await Aluno.query()
        .findById(aluno_id)

      const cursoVerificacao = await Curso.query()
        .findById(curso_id)

      if (!alunoVerificacao) {
        return notFoundError("Aluno não encontrado", response)
      }

      if (!cursoVerificacao) {
        return notFoundError("Curso não encontrado", response)
      }

      if (!matriculaExistente) {
        return notFoundError("Matricula não encontrado", response)
      }

      return matriculaExistente.$query(transacting)
        .updateAndFetch(body)
        .withGraphFetched({ curso: true, aluno: true });
    });

    response.status(200)
      .json(matriculaAlteracao)
  } catch (error) {
    response.status(404)
      .json({ message: "Falha ao atualizar as informações" });
    next(error);
  }
}

async function deletarMatricula(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params

  const deletarMatricula = await Matricula.transaction(async transacting => {
    return Matricula.query(transacting)
      .where('id', '=', id)
      .delete()
  });

  if (!deletarMatricula) {
    return notFoundError("Matricula não encontrado", response)
  }

  response.status(204)
    .send();
}


export default {
  createMatricula,
  atulizaVagaMatricula,
  listarMatricula,
  listarUmaMatricula,
  alterarMatricula,
  deletarMatricula
}