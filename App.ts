import express from "express"
import cors from "cors";

require('dotenv').config()

import { router } from "./api.routes";
const app = express();

app.use(cors())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(router)

// process.env.PORT || 5000
// 4000

// Caso 'cê esteja rodando o servidor localmente (pelo PC), troca a porta pra 4000
app.listen(process.env.PORT, () => { console.log(`🚀 O servidor está rodando na porta ${process.env.PORT}`) })