import express from "express";
import router from "./modules/alunos/routes";

const app = express();

app.use(express.json());

app.use("/alunos", router);

app.listen(3000, () => {
    console.info("server is running on port 3000")
})
