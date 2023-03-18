import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import models from '../../models/model';
import { comparePasswords, hashPassword } from '../bcrypt/bcrypt.service';
import { generateAccessToken, verifyToken } from '../jwt/jwt.service';

class Authentication {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const data = await models.User.findOne({ 'profile.email': email });

      if (!data)
        return res.status(401).send({ error: 'email/password does not match' });

      const passwordsMatch = await comparePasswords(
        password,
        data?.profile?.password as string
      );

      if (!passwordsMatch)
        return res.status(401).send({ error: 'email/password does not match' });

      const token = await generateAccessToken({ _id: data._id });
      if (!token)
        return res.status(400).send({ error: 'cannot generate token' });

      return res.status(201).json({ data, token });
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

      const data = await models.User.findOne({
        _id: (verified as JwtPayload)._id,
      });
      return res.status(201).json({ data });
    } catch (error) {
      return res.status(403).send({ error });
    }
  };
}

const AuthService = new Authentication();
export default AuthService;
