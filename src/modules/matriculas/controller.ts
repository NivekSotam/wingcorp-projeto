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
        .withGraphFetched({ aluno: true });

    response.status(200)
        .json(matriculas);
  } catch (error) {
    next(error);
    response.status(400)
        .json({ message: "Falha ao listar as matrículas" });
  }
}
