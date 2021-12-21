import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { UserService } from "../services/UserService";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

dotenv.config();

const notAuthorizedJson = { status: 401, message: "Não autorizado!" };

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_PASS_TOKEN as string,
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    const user = await UserService.findOne({ id: payload.id });
    if (user) {
      return done(null, user);
    } else {
      return done(notAuthorizedJson, false);
    }
  })
);

export const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_PASS_TOKEN as string, {
    expiresIn: "2h",
  });
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", (err, user) => {
    req.user = user;
    return user ? next() : next(notAuthorizedJson);
  })(req, res, next);
};

export default passport;
