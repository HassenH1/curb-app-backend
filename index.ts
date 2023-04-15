import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './src/routes/auth.route';
import profileRoute from './src/routes/profile.route';
import carRoute from './src/routes/car.route';
import errorHandler from './src/middlewares/errorhandler.middleware';
import { authenticateJWT } from './src/middlewares/authorize.middleware';
dotenv.config();
import './src/db/connection';
import sendVerificationEmail from './src/utils/mailer/mailer.utils';

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
app.use(errorHandler);
app.use(`${url}/profile`, profileRoute);
app.use(`${url}/auth`, authRoute);
app.use(`${url}/car`, carRoute);

app.get('/', async (req, res) => {
  try {
    await sendVerificationEmail({
      id: Object('3'),
      email: 'hassen@mailinator.com',
    });
  } catch (error) {
    console.log(`${error} MAILER SERVICE IN GET ROUTE ERROR`);
  }
  res.json({ message: 'testing response' });
});

/**
 * @todo - remove this, its only a test
 */
app.get('/test', authenticateJWT, (req, res, next) => {
  res.send('you can access protected route! Success!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
