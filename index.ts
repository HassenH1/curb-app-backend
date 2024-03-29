import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './src/routes/auth.route';
import userRoute from './src/routes/user.route';
import carRoute from './src/routes/car.route';
import errorHandler from './src/middlewares/errorhandler.middleware';
import { authenticateJWT } from './src/middlewares/authorize.middleware';
dotenv.config();
import './src/db/connection';

const app: Express = express();
const port = process.env.PORT;
const url = '/api/v1';

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
app.use(`${url}/user`, userRoute);
app.use(`${url}/auth`, authRoute);
app.use(`${url}/car`, carRoute);
app.use(errorHandler);

// app.get('/email-test', (req, res) => {
//   const mail = new MailService(
//     new Schema.Types.ObjectId('640d2e0129b35264a8d561e5'),
//     'Hassen Hassen',
//     'hassen@mailinator.com',
//     true
//   );
//   mail.sendMail();

//   res.send('Email is sent!!');
// });

/**
 * @todo - remove this, its only a test
 */
app.get('/test', authenticateJWT, (req, res, next) => {
  res.send('you can access protected route! Success!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
