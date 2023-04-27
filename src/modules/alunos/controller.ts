import { Request, Response } from "express";

export default async function Teste (request: Request, response: Response) {
    const { body } = request ;

    response.status(200)
        .json(body);
};