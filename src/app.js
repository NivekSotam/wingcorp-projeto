const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
app.use('/cursos', indexRouter);

app.listen(3001, ()=>{
    console.log('servidor rodando na porta 3001');
});

