import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import LoginRoute from "./src/routes/login.route";
import errorHandler from "./src/middlewares/errorhandler.middleware";
dotenv.config();
import "./src/db/connection";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", LoginRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
