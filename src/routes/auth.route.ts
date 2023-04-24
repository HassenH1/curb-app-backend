import express, { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth/auth';
import {
  loginValidationRules,
  signupValidationRules,
} from '../middlewares/rules/validationRules.middleware';
import validate from '../middlewares/rules/validate.middleware';
import { verifyToken } from '../utils/jwt/jwt.utils';
import models from '../models/model';
import { JwtPayload } from 'jsonwebtoken';

const router: Router = express.Router();

/**
 * @todo - put route names in enum file
 */
router.post(
  '/login',
  loginValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    AuthService.login(req, res, next)
);

router.post(
  '/signup',
  signupValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    AuthService.signup(req, res, next)
);

/**
 * i dont think i need this either
 */
router.get('/logout', (req, res, next) => AuthService.logout(req, res, next));

/**
 * might remove this here, just using it for testing
 */
router.get('/:token', (req, res, next) =>
  AuthService.checkToken(req, res, next)
);

router.get('/verify/email/:token', async (req, res, next) => {
  const { token } = req.params;
  const response = await verifyToken(token);
  models.User.updateOne(
    { _id: (response as JwtPayload)._id },
    {
      $set: {
        profile: {
          emailVerified: true,
        },
      },
    }
  );
  res.sendFile('emailValidationSuccess.html', { root: '.' + '/public' });
});

export default router;
