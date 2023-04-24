import express, { Router, Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';
import { authenticateJWT } from '../middlewares/authorize.middleware';
import { IUser } from '../models/type';
import models from '../models/model';
import { updateUserValidationRules } from '../middlewares/rules/userValidationRules.middleware';
import validate from '../middlewares/rules/validate.middleware';

const router: Router = express.Router();

router.get('/user/:id', async (req, res, next) => {
  try {
    const user = await models.User.find({ _id: req.params.id }).exec();
    if (!user) return res.status(401).json({ message: 'Unauthorized.' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @todo = this is not working right
 */
router.patch(
  '/user',
  authenticateJWT,
  updateUserValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await models.User.findById(req.body._id);
      console.log(user, '<==============WHAT IS USER NAME?');
      if (!user) return res.status(401).json({ message: 'Unauthorized.' });
      if (req.body.profile['password']) {
        //add hash logic
      }
      user.profile = req.body.profile;
      user.save((saveErr: CallbackError, updatedUser: IUser) => {
        if (saveErr) return res.status(400).send(saveErr);
        res.send({ updatedUser });
      });
    } catch (error) {
      next(error);
    }
    // console.log('INSIDE PATCH METHOD RIGHT?');
    // console.log(req.body, '<=======WHAT IS REQ BODY HERE?');
    // models.User.findById(req.body._id, (err: CallbackError, user: any) => {
    //   if (err) return res.status(404).send(err);
    //   if (req.body.profile['password']) {
    //     //add hash logic
    //   }
    //   user.profile?.set(req.body.profile);
    //   user.save((saveErr: CallbackError, updatedUser: IUser) => {
    //     if (saveErr) return res.status(400).send(saveErr);
    //     res.send({ updatedUser });
    //   });
    // }).catch((error) => next(error));
  }
);

export default router;
