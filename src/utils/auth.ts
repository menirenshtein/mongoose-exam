
import { IUser } from "../types/user";
import { Request,Response,NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import User from '../models/userModel'
import Classroom from "../models/classroomModel";
import Student from "../models/studentModel";
export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


export const AuthUserByToken = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    const  token  = req.cookies.token;
    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token", error });
      return
    }
};


export const GetStudentsByAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;
  
  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id)
    // (req as any).user = decoded;
    req.user = user    
    if (!user.isAdmin) {
      res.status(200).json({ data: req.user });
      return;
    }
    next();
  } catch (error) {
    console.error("Error in GetStudentsByAuth:", error);
    res.status(500).json({ message: "Server error" });
  }
};