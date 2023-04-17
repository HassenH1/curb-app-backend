import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import models from '../../models/model';
import {
  comparePasswords,
  hashPassword,
} from '../../utils/bcrypt/bcrypt.utils';
import { generateAccessToken, verifyToken } from '../../utils/jwt/jwt.utils';
import MailService from '../../utils/mailer/mailer.utils';
import sendVerificationEmail from '../../utils/mailer/mailer.utils';

class Authentication {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ 'profile.email': email });

      if (!user)
        return res.status(401).send({ error: 'email/password does not match' });

      const passwordsMatch = await comparePasswords(
        password,
        user?.profile?.password as string
      );

      if (!passwordsMatch)
        return res.status(401).send({ error: 'email/password does not match' });

      const token = await generateAccessToken({ _id: user._id });
      if (!token)
        return res.status(400).send({ error: 'cannot generate token' });

      return res.status(201).json({ user, token });
      // .cookie("token", token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: true
      // })
    } catch (error: any) {
      throw new Error(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const hash = hashPassword(req.body.password);

    const userProfile = new models.User({
      profile: {
        ...req.body,
        password: hash,
      },
    });

    userProfile.save(async (err, data) => {
      if (err) return res.status(500).json({ err });
      const token = await generateAccessToken({ _id: data._id });
      if (!token)
        return res.status(400).send({ error: 'cannot generate token' });

      const mail = new MailService(
        data._id,
        ((data.profile?.firstName.charAt(0).toUpperCase() as string) +
          data.profile?.firstName.slice(1)) as string,
        data.profile?.email as string
      );
      mail.sendMail();
      return res.status(201).json({ data, token });
      // .cookie("token", token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: true
      // })
    });
  };

  /**
   *
   * @todo - might want to remove this
   */
  logout = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({ message: 'user is logged out' });
    // res.cookie("token", undefined, {
    // expires: new Date(Date.now() + 10 * 1000),
    // httpOnly: true,
    // secure: true,
    // sameSite: true
    // });
  };

  checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.params.token;
      if (!token)
        return res
          .status(401)
          .send({ message: 'Unauthorized: No token provided' });

      const verified = await verifyToken(token);
      if (!verified) return res.status(401).send({ message: 'not verified' });

      return res.status(200);
    } catch (error) {
      return res.status(403).send({ error });
    }
  };

  emailVerificationtokenCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.params.token;
      const userId = req.params._id;

      if (!token)
        return res
          .status(401)
          .send({ message: 'Unauthorized: No token provided' });

      const verified = await verifyToken(token);
      if (!verified) return res.status(401).send({ message: 'not verified' });

      models.User.findOneAndUpdate(
        { _id: userId },
        { $set: { profile: { emailVerified: true } } },
        (err: any) => {
          if (err) return res.status(500).json({ err });

          return res.status(201).send('Verified!');
        }
      );
    } catch (error) {
      return res.status(403).send({ error });
    }
  };
}

const AuthService = new Authentication();
export default AuthService;
