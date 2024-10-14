import { Document, ObjectId } from 'mongoose';
import { IGrade } from './grade';

export interface IStudent extends Document {
    _id : string,
    name :string,
    grades: IGrade[],
    classroom: string,
}