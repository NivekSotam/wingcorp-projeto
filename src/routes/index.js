const express = require('express');
const model = require('../modules/cursos/model')
const router = express.Router();
module.exports = router;

router.get('/', async function(req, res, next) {
    try {
        const todosOSCursos = await model.Cursos
        console.log(model.Cursos);
        return res.status(200).json({ todosOSCursos })
    } catch (error) {
        return res.status(500).json(error.message)
    }
});