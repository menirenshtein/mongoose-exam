import { Schema, model, Document, Types } from "mongoose";
import { IGrade } from "../types/grade";
import { kMaxLength } from "buffer";

export const GradeSchema: Schema = new Schema({
    points:{
        type: Number,
        required: [true, 'tou must enter the grade'],
        max: [100, 'grade can be only lower then 100'],
        min: [0, ' grade can be only grater then 0']
    },
    comment:{
        type: String,
        MaxLength: [500, 'no space left'],
        minLength: [15, 'write something come on']
    }
});

const Grade = model<IGrade>('Grade', GradeSchema);
export default Grade;