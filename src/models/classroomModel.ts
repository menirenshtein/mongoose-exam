import { Schema, model, Document, Types } from "mongoose";
import { IClassroom } from "../types/classroom";

const classroomSchema: Schema = new Schema({
    student: {
        type: [Schema.Types.ObjectId],
    },
    user_id:{
        type: Types.ObjectId,
        required:[ true, 'a class without teacher? come on?']
    },
    name:{
        type: String,
        required: [true, 'even Lord Voldemort has a name'],
        max: [15, 'enough with jocks']
    }
});

const Classroom = model<IClassroom>('Classroom', classroomSchema);
export default Classroom;