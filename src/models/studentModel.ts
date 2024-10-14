import { Schema, model, Document, Types } from "mongoose";
import { IStudent } from "../types/student";
import { IGrade } from "../types/grade";
import {GradeSchema} from "./gradeModel";
import Classroom from "./classroomModel";

   
const StudentSchema: Schema = new Schema({
    name: {
      type: String,
      required: true
    },
    classroom: {
      type: String
    },
    grades: [GradeSchema] 
        
});


const Student = model<IStudent>('Student', StudentSchema);
export default Student;