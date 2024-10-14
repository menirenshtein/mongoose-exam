import { Schema } from 'inspector/promises';
import { Document} from 'mongoose';
import { IStudent } from './student';


export interface IClassroom extends Document {
    _id : string,
    students?: IStudent[],
    teacher_id: string,
    name : string
}