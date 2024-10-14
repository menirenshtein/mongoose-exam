import { Request, Response } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user.js';
import Classroom from '../models/classroomModel.js';
import { IClassroom } from '../types/classroom.js';
import Student from '../models/studentModel.js';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
       res.status(400).json({ message: 'Invalid email' });
    }

    const isMatchPassword: boolean = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
       res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!);
    res.cookie('token', token, { httpOnly: true});
    res.status(200).json({ user, token, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, email, password, isAdmin, classroom } = req.body;
    const existsClassRoom : IClassroom | null = await Classroom.findOne({ classroom })
    if (existsClassRoom) {
      res.status(400).json({ message: 'classroom already exists', success: false });
    }
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists', success: false });
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user: IUser = new User({ userName, email, password: hashedPassword, isAdmin });
    await user.save();  
    if (isAdmin) {
      const newClassroom = new Classroom({
        user_id: user._id,
        name: classroom,
      });
      await newClassroom.save();
    }
    else{
      const newStudent = new Student({
        name: userName,
        classroom
      })
      await newStudent.save()
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ user, token, success: true });

  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
}
