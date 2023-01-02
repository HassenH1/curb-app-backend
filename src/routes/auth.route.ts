import express, { Router, Request, Response, NextFunction } from "express";
import {
  loginValidationRules,
  signupValidationRules,
} from "../middlewares/validationRules.middleware";
import validate from "../middlewares/validate.middleware";
import AuthService from "../services/auth/auth";
import { authenticateJWT } from "../middlewares/authorize.middleware";

const router: Router = express.Router();

/**
 * @todo - put route names in enum file
 */
router.post(
  "/login",
  loginValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) => AuthService.login(req, res, next));

router.post(
  "/signup",
  signupValidationRules(),
  validate,
  (req: Request, res: Response, next: NextFunction) => AuthService.signup(req, res, next));

router.get("/logout", (req, res, next) => AuthService.logout(req, res, next));

router.get("/:token", (req, res, next) => AuthService.checkToken(req, res, next))

export default router;
