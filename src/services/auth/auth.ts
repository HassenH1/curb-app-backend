import { Request, Response, NextFunction } from "express";
import User from "../../models/user/user.model";
import { comparePasswords, hashPassword } from "../bcrypt/bcrypt.service";
import { generateAccessToken } from "../jwt/jwt.service";

class Authentication {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const userData = await User.findOne({ "profile.username": username });

      if (!userData) return res.status(401).send({ error: "cannot login" });

      const passwordsMatch = await comparePasswords(
        password,
        userData?.profile?.password as string
      );

      if (!passwordsMatch)
        return res.status(401).send({ error: "cannot login" });

      const token = generateAccessToken({ username, password });

      if (!token) return res.status(400).send({ error: "cannot login" });

      return res
        .cookie("token", token, {
          // httpOnly: true,
          // secure: true,
          // sameSite: true
        })
        .status(201)
        .send({ userData });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  signup = (req: Request, res: Response, next: NextFunction) => {
    const hash = hashPassword(req.body.password);

    const userProfile = new User({
      profile: {
        ...req.body,
        password: hash,
      },
    });

    userProfile.save((saveErr, savedUser) => {
      if (saveErr) {
        res.status(500).send({ error: saveErr });
      } else {
        const username = req.body.username;
        const password = req.body.password;
        const token = generateAccessToken({ username, password });

        if (!token) return res.status(400).send({ error: "cannot login" });

        return res
          .cookie("token", token, {
            // httpOnly: true,
            // secure: true,
            // sameSite: true
          })
          .status(201)
          .send({ savedUser });
      }
    });
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", undefined, {
      expires: new Date(Date.now() + 10 * 1000),
      // httpOnly: true,
      // secure: true,
      // sameSite: true
    });
    return res.status(200).send({ message: "user is logged out", status: 200 });
  };
}

const AuthService = new Authentication();
export default AuthService;
