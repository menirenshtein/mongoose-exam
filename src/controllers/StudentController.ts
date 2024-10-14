import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Classroom from '../models/classroomModel';
import Grade from '../models/gradeModel';
import { IGrade } from '../types/grade';
import GradeSchema from '../models/gradeModel'
import { IStudent } from '../types/student';

export const AddGradeToStudentById = async(req:Request, res:Response):Promise<void>=>{
    try {
        const { points, comment } = req.body;
    
        const newGrade: IGrade = new Grade({
          points,
          comment
        });
    
        await newGrade.save();
    
        const student: IStudent | null = await Student.findByIdAndUpdate(
          req.params.id,
          { $push: { grades: newGrade._id } }, 
          { new: true }
        ).populate('grades'); 
        
        if (!student) {
          res.status(404).json({ message: 'Student not found' });
          return;
        }
    
        res.status(201).json({ student });
      } catch (error) {
        console.error('Error saving grade:', error); 
        res.status(500).json({ message: 'Server error', error });
      }
       
}
export const UpdateGradeByGradeId = async(req:Request,res:Response):Promise<void>=>//req.body: {content: newGrade:{points:Number,comment:String}}}
{
    try {
        const gradeId = req.params.gradeId;
        const { points, comment } = req.body;
        
        const grade: IGrade | null = await Grade.findByIdAndUpdate(
            gradeId, 
            { $set: { points, comment } }, 
            { new: true }
        );
        
        if (!grade) {
            res.status(404).json({ message: 'Grade not found' });
            return;
        }

        res.status(200).json({ grade });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
   
}
export const GetAllStudentsAndGrades = async(req:Request,res:Response):Promise<void>=>
{
    try {
        const students: IStudent[] = await Student.find({ user_id: req.user._id }).populate('grades');
    
        if (!students || students.length === 0) {
            res.status(404).json({ message: 'No students found' });
            return;
        }

        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    
}
export const GetAvarage = async(req:Request,res:Response):Promise<void>=>
{
    try {
        let totalPoints = 0;
        let totalGrades = 0;
        
        let students;

        if (req.user.isAdmin) {
            const classrooms = await Classroom.find({ user_id: req.user._id });
            
            students = await Student.find({ classroom: { $in: classrooms.map(classroom => classroom._id) }}).populate('grades');
        } else {
            students = await Student.find({ user_id: req.user._id }).populate('grades');
        }

        students.forEach((student) => {
            student.grades.forEach((grade) => {
                totalPoints += grade.points;
                totalGrades++;
            });
        });

        const average = totalGrades > 0 ? totalPoints / totalGrades : 0;
        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
