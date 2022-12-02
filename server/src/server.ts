import cors from "cors";
import express from "express";
import { router } from "./routes/Routes";

require('dotenv').config()

export const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

app.listen(3333);