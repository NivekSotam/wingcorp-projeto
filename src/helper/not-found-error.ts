import { Response } from "express";

async function notFoundError(message: string | null, response: Response) {
    const errorMessage = message || "Not found error";

    response.status(404).send({ errorMessage })
}

export default notFoundError;