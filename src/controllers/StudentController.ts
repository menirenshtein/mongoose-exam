import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Classroom from '../models/classroomModel';
import Grade from '../models/gradeModel';
import { IGrade } from '../types/grade';
import { IStudent } from '../types/student';

export const AddGradeToStudentById = async(req:Request, res:Response):Promise<void>=>{
    try {
        console.log('first')
        const { points, comment } = req.body;
        const student: IStudent = await Student.findById(req.params.id);
        if (!student) 
            res.status(404).json({ message: 'Student not found' });
        const studentGrade: IGrade = new Grade({
            points,
            comment
        })
        student.grades.push(studentGrade);
        await student.save();
        res.status(201).json({ student });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
       
}
export const UpdateGradeByGradeId = async(req:Request,res:Response):Promise<void>=>//req.body: {content: newGrade:{points:Number,comment:String}}}
{
    try {
        const { points, comment } = req.body;
        const student = await Student.findOne({ 'grades._id': req.params.grade_id });
    
        if (!student) res.status(404).json({ message: 'Grade not found' }); return
    
        const classroom = await Classroom.findOne({ students: student._id, admin: req.user.id });
        if (!classroom) res.status(403).json({ message: 'Access denied' }); return
    
        // const grade = student.grades.id(req.params.grade_id);
        // grade.comment = comment;
        // grade.points = points;
        await student.save();
        res.status(200).json({ student });
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
