import { Document, ObjectId } from 'mongoose';
import { IStudent } from './student';

export interface IUser extends Document {
    _id : string,
    userName: string
    email :string,
    password : string,
    isAdmin : boolean
}