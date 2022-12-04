import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route";
import errorHandler from "./src/middlewares/errorhandler.middleware";
dotenv.config();
import "./src/db/connection";
import { authenticateJWT } from "./src/middlewares/authorize.middleware";

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());

/**
 * @todo - update cors with options object
 */
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/auth", authRoute);

app.get("/test", authenticateJWT, (req, res, next) => {
  res.send("need authorization to access this: Success!");
});

/**
 * @todo - check if this ever hits
 */
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
