import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route";
import updateRoute from "./src/routes/update.route";
import errorHandler from "./src/middlewares/errorhandler.middleware";
dotenv.config();
import "./src/db/connection";
import { authenticateJWT } from "./src/middlewares/authorize.middleware";

const app: Express = express();
const port = process.env.PORT;
const url = "/api/v1";

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
app.use(errorHandler);
app.use(`${url}/update`, updateRoute);
app.use(`${url}/auth`, authRoute);

app.get("/", (req, res) => {
  res.json({ message: "testing response" })
})

/**
 * @todo - remove this, its only a test
 */
app.get("/test", authenticateJWT, (req, res, next) => {
  res.send("need authorization to access this: Success!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
