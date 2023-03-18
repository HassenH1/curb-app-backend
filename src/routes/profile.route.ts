import express, { Router } from 'express';
import { CallbackError } from 'mongoose';
import { authenticateJWT } from '../middlewares/authorize.middleware';
import { IUser } from '../models/type';
import models from '../models/model';

const router: Router = express.Router();

/**
 * @todo - update status code
 * @todo - update types
 * @todo - move interface to another file
 * @todo - add validation
 */
router.patch(
  '/profile',
  authenticateJWT,
  // updateProfileValidationRules,
  // validate,
  async (req, res) => {
    models.User.findById(req.body._id, (err: CallbackError, user: any) => {
      if (err) return res.send(err);
      if (req.body.profile['password']) {
        //add hash logic here
      }
      user.profile?.set(req.body.profile);

      user.save((saveErr: CallbackError, updatedUser: IUser) => {
        if (saveErr) return res.status(400).send(saveErr);
        res.send({ updatedUser });
      });
    });
  }
);

export default router;