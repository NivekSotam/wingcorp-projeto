import { Request, Response, NextFunction, } from "express";
import Matricula from "./module";

async function createMatricula(request: Request, response: Response, next: NextFunction) {
    try {

    } catch (error) {
        
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
