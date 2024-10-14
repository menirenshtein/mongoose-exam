import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Classroom from '../models/classroomModel';
import Grade from '../models/gradeModel';
import { IGrade } from '../types/grade';
import { IStudent } from '../types/student';

export const AddGradeToStudentById = async(req:Request, res:Response):Promise<void>=>{
    try {
        const { points, comment } = req.body;
        const studentGrade: IGrade = new Grade({
            points,
            comment
        })
        studentGrade.save()
        const student: IStudent = await Student.findByIdAndUpdate(req.params.id,{$set:{$grades:{ $push: studentGrade }}},{new:true});
        if (!student) {
            
            res.status(404).json({ message: 'Student not found' });
            return
        }
        
       
        res.status(201).json({ student });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
       
}
export const UpdateGradeByGradeId = async(req:Request,res:Response):Promise<void>=>//req.body: {content: newGrade:{points:Number,comment:String}}}
{
    try {
        const gradeId = req.params.gradeId;
        const { points, comment } = req.body;
        
        const grade: IGrade | null = await Grade.findOneAndUpdate(
            { 'grade._id': gradeId }, 
            { $set: { 'grades.$.points': points, 'grades.$.comment': comment } },
            { new: true }
        );
        
        console.log(grade);
        if (!grade) {
          res.status(404).json({ message: 'Grade not found' });
          return;
        }
    
        res.status(200).json({ grade });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
   
}
export const GetAllStudentsAndGrades = async(req:Request,res:Response):Promise<void>=>
{
   
}
export const GetAvarage = async(req:Request,res:Response):Promise<void>=>
{
   
}
