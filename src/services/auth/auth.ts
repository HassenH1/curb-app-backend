import { Request, Response, NextFunction } from "express";
import User from "../../models/user/user.model";
import { comparePasswords, hashPassword } from "../bcrypt/bcrypt.service";
import { generateAccessToken } from "../jwt/jwt.service";

/**
 * @todo - remove token thats being passed 
 */
class Authentication {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({ "profile.email": email });

      if (!data) return res.status(401).send({ error: "email/password does not match" });

      const passwordsMatch = await comparePasswords(
        password,
        data?.profile?.password as string
      );

      if (!passwordsMatch)
        return res.status(401).send({ error: "email/password does not match" });

      const token = generateAccessToken({ email, password });

      if (!token)
        return res.status(400).send({ error: "cannot generate token" });

      return res
        .cookie("token", token, {
          // httpOnly: true,
          // secure: true,
          // sameSite: true
        })
        .status(201)
        .send({ data, token });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const hash = hashPassword(req.body.password);

    const userProfile = new User({
      profile: {
        ...req.body,
        password: hash,
      },
    });

    userProfile.save(function (err, data) {
      if (err) return res.status(500).json({ err });
      const username = req.body.username;
      const password = req.body.password;
      const token = generateAccessToken({ username, password });
      if (!token) return res.status(400).send({ error: "cannot generate token" });
      return res
        .cookie("token", token, {
          // httpOnly: true,
          // secure: true,
          // sameSite: true
        })
        .status(201)
        .json({ data, token });
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
