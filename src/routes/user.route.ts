import express, { Router, Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';
import { authenticateJWT } from '../middlewares/authorize.middleware';
import { IUser } from '../models/type';
import models from '../models/model';
import { updateUserValidationRules } from '../middlewares/rules/userValidationRules.middleware';
import validate from '../middlewares/rules/validate.middleware';
import { IUserProfile } from '../models/type';

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
      if (!user) return res.status(401).json({ message: 'Unauthorized.' });
      if (req.body.profile['password']) {
        //add hash logic
      }
      const query: { $set: { profile: { [key: string]: any } } } = {
        $set: { profile: {} },
      };
      for (let key in req.body.profile) {
        if (
          user.profile &&
          user.profile[key as keyof IUserProfile] !== req.body.profile[key]
        ) {
          query.$set.profile[key] = req.body.profile[key];
        }
      }
      const updatedUser = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        query,
        { new: true }
      ).exec();
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
