import { Document, ObjectId } from 'mongoose';

export interface IGrade extends Document {

    _ID : string,
    points: number,
    comment: string
}