async function teste (request, response, next) {
    const { body } = request;

    response.status(200)
        .json(body);
}

export default {
    teste
}