import express from "express";
import helmet from "helmet";
import cors from "cors"; // 1. Importa o cors
import router from "./routes/index";

const app = express();

app.use(cors()); // 2. Libera o acesso para outras origens/frontends
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
