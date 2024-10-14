

// import { Request, Response } from 'express';
// import User from '../models/userModel.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { IUser } from '../types/user.js';
// import Classroom from '../models/classroomModel.js';
// import { IClassroom } from '../types/classroom.js';

// export const login = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
    
//     const user: IUser | null = await User.findOne({ email });
//     if (!user) {
//        res.status(400).json({ message: 'Invalid email' });
//     }

//     const isMatchPassword: boolean = await bcrypt.compare(password, user.password);
//     if (!isMatchPassword) {
//        res.status(400).json({ message: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!);
//     res.cookie('token', token, { httpOnly: true });
//     res.status(200).json({ user, token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const register = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, email, password, isAdmin, classroom } = req.body;

//     const existingUser: IUser | null = await User.findOne({ email });
//     if (existingUser) {
//        res.status(400).json({ message: 'User already exists', success: false });
//     }

//     const hashedPassword: string = await bcrypt.hash(password, 10);
//     const user: IUser = new User({ name, email, password: hashedPassword, isAdmin });
//     await user.save();  

//     if (isAdmin) {
//       const newClassroom: IClassroom = new Classroom({
//         name: classroom,
//         admin: user._id,
//       });
//       await newClassroom.save();
//     }

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!);
//     res.cookie('token', token, { httpOnly: true });
//     res.status(201).json({ user, token, });

//   } catch (error) {
//     console.error('Error during user registration:', error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };




import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Classroom from '../models/classroomModel';

const addGrade = async (req: Request, res: Response) => {
  // try {
  //   const { comment, points } = req.body;
  //   const student = await Student.findById(req.params.id);
  //   if (!student) return res.status(404).json({ message: 'Student not found' });

  //   const classroom = await Classroom.findOne({ students: student._id, admin: req.user.id });
  //   if (!classroom) return res.status(403).json({ message: 'Access denied' });

  //   student.grades.push({ comment, points });
  //   await student.save();
  //   res.status(201).json({ student });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
};

// const updateGrade = async (req: Request, res: Response) => {
//   try {
//     const { points, comment } = req.body.newGrade;
//     const student = await Student.findOne({ 'grades._id': req.params.grade_id });

//     if (!student) return res.status(404).json({ message: 'Grade not found' });

//     const classroom = await Classroom.findOne({ students: student._id, admin: req.user.id });
//     if (!classroom) return res.status(403).json({ message: 'Access denied' });

//     const grade = student.grades.id(req.params.grade_id);
//     grade.comment = comment;
//     grade.points = points;
//     await student.save();
//     res.status(200).json({ student });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getAverageGrade = async (req: Request, res: Response) => {
//   try {
//     let totalPoints = 0;
//     let totalGrades = 0;

//     const students = req.user.isAdmin
//       ? await Student.find({ classroom: req.user.classroom })
//       : [await Student.findOne({ user: req.user.id })];

//     students.forEach((student) => {
//       student.grades.forEach((grade) => {
//         totalPoints += grade.points;
//         totalGrades++;
//       });
//     });

//     const average = totalPoints / totalGrades;
//     res.status(200).json({ average });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export { addGrade, updateGrade, getAverageGrade };
