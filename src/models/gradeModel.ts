import { Schema, model, Document, Types } from "mongoose";
import { IGrade } from "../types/grade";
import { kMaxLength } from "buffer";

   
const GradeSchema = new Schema({
    points: { type: Number, required: true },
    comment: { type: String, required: false }
  
});

const Grade = model<IGrade>('Grade', GradeSchema);
export default Grade;