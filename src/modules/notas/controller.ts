import { Request, Response, NextFunction, } from "express";
import Nota from "./module";
import notFoundError from "../../helper/not-found-error";
import Matricula from "../matriculas/module";


async function cadastrarNotas(request: Request, response: Response, next: NextFunction) {
  const { body } = request;
  const { matricula_id } = body;

  try {
    const notasCadastro = await Nota.transaction(async transacting => {
      const matriculaVerificaco = await Matricula.query()
        .findById(matricula_id);

      if (!matriculaVerificaco) {
        return notFoundError("matricula não encontrado", response);
      }

      return Nota.query(transacting)
        .insertAndFetch(body)
    });
    response.status(200)
      .json(notasCadastro)
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao cadastrar a nota" });
    next(error);
  }
}

async function listarNotas(request: Request, response: Response, next: NextFunction) {
  try {
    const notas = await Nota.query()
      .withGraphFetched({ matricula: true });

    response.status(200)
      .json(notas);
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao listar a notas" });
    next(error);
  }
}


async function listarUmaNota(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params

  try {
    const listarUmaNota = await Nota.query()
      .findById(id)
      .withGraphFetched({ matricula: true });

    if (!listarUmaNota) {
      return notFoundError("Matricula do aluno não encontrado", response);
    }

    response.status(200)
      .json(listarUmaNota);
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao listar a nota" });
    next(error);
  }
}

async function alterarNota(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params
  const { body }= request;
  const { matricula_id } = body;

  try {
    const notasAlteracao = await Nota.transaction(async transacting => {
      const notaExistente = await Nota.query()
        .findById(id)
      
      const matriculaVerificaco = await Matricula.query()
        .findById(matricula_id);

      if (!matriculaVerificaco) {
        return notFoundError("matricula não encontrado", response);
      }

      if (!notaExistente) {
        return notFoundError("Nota não encontrado", response);
      }

      return notaExistente.$query(transacting)
        .updateAndFetch(body)
        .withGraphFetched({ matricula: true });
        
    });
    response.status(200)
      .json(notasAlteracao)
  } catch (error) {
    response.status(400)
      .json({ message: "Falha ao Alterar a nota" });
    next(error);
  }
}

async function deletarNotas(request: Request, response: Response, next: NextFunction){
  const {id} = request.params;

  const deletarNota = await Nota.transaction( async transacting => {
    return Nota.query(transacting)
      .where('id', '=', id)
      .delete();
  });

  if(!deletarNota) {
    return notFoundError("Nota não encontada", response);
  }

  response.status(204)
    .send();
}


export default {
  cadastrarNotas,
  listarNotas,
  listarUmaNota,
  alterarNota,
  deletarNotas
}
