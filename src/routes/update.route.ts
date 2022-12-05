import express, { Router } from "express";
import { CallbackError } from "mongoose";
import validate from "../middlewares/validate.middleware";
import { IUser } from "../models/user/type";
import User from "../models/user/user.model";

const router: Router = express.Router();

/**
 * @todo - update status code
 * @todo - update types
 * @todo - move interface to another file
 * @todo - add validation
 */
router.patch("/profile", async (req, res) => {
  User.findById(req.body._id, (err: CallbackError, user: any) => {
    if (err) return res.send(err);
    user.profile?.set(req.body.update);

    user.save((saveErr: CallbackError, updatedUser: IUser) => {
      if (saveErr) return res.status(400).send(saveErr);
      res.send({ updatedUser });
    });
  });
});

export default router;
