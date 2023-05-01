import express from "express";
import router from "./modules/alunos/routes";
import Model from "./objection"

const app = express();

Model; 

app.use(express.json());

app.use("/alunos", router);

app.listen(3000, () => {
    console.info("server is running on port 3000")
})
