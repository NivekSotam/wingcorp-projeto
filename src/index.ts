import express from "express";
import routerAluno from "./modules/alunos/routes";
import routerMatriculas from "./modules/matriculas/routes";
import Model from "./objection"

const app = express();

Model; 

app.use(express.json());

app.use("/alunos", routerAluno);

app.use("/matriculas", routerMatriculas);

app.listen(3000, () => {
    console.info("server is running on port 3000")
})
