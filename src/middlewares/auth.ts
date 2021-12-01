import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

declare module "http" {
  interface IncomingHttpHeaders {
    token: string;
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).send("Token not Provided");
    }
    const decoded = jwt.verify(token, config.secret);
    
    if (typeof decoded == 'object') {
      req.query.id_usuario = decoded.id_usuario;
      return next();
    } else {
      return res.status(401).send("Invalid Token");
    }
    return next();
  } catch (error) {
    return res.status(401).send("Error Validating Token");
  }
}
