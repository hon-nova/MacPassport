import { Request, Response, NextFunction } from "express";
// import { User } from '../models/userModel'
import { User } from "../models/userModel";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};
export const forwardAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

export const isAdmin = (req: Request): boolean=> {
   if(req.user){
      const thisUser = req.user as User
      return thisUser.role === "admin";
   } 
   return false
};
