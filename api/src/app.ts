import express, { Express } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";

import "dotenv/config";

import indexRouter from "./routes/index";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/v1", indexRouter);

app.use((req, res, next) => {
    next(new createError[404]());
    return;
});

app.use(errorHandler);

export default app;
