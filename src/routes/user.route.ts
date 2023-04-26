import express, { Router, Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';
import { authenticateJWT } from '../middlewares/authorize.middleware';
import models from '../models/model';
import { updateUserValidationRules } from '../middlewares/rules/userValidationRules.middleware';
import validate from '../middlewares/rules/validate.middleware';
import { IUserProfile } from '../models/type';
import { hashPassword } from '../utils/bcrypt/bcrypt.utils';

const router: Router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await models.User.find({ _id: req.params.id }).exec();
    if (!user) return res.status(401).json({ message: 'Unauthorized.' });
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * @todo = this is not working right
 */
router.patch(
  '/profile/:id',
  authenticateJWT,
  updateUserValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await models.User.findOne({ _id: req.params.id });
      if (!doc) return res.status(400).json({ message: 'cannot find user' });

      if (req.body['password']) {
        const hash = hashPassword(req.body['password']);
        req.body['password'] = hash;
      }
      for (const key in req.body) {
        if (doc && doc.profile) {
          doc.profile[key] = req.body[key];
        }
      }
      await doc?.save();
      res.status(201).json({ data: doc });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
