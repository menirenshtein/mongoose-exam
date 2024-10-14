import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';
import { IStudent } from '../types/student';
import Student from './studentModel';
import isEmail from 'validator/lib/isEmail';

// User Schema
const userSchema: Schema = new Schema({
    userName:{
        type : String,
        required: [true, "you must have name"],
        max : [35, 'name can contain only 30 chars']
    } as object,
    password:{
        type : String,
        required: [true, "you must have password"],
    },
    email:{
        type : String,
        required: [true, "you must have name"],
        max : [35, 'email can contain only 30 chars'],
        // validate:{
        //     validator:{
        //         isEmail: 'you must add valid email'
        //     }
        // }
    },
    isAdmin:{
        type: Boolean
    }
}, { timestamps: true });



// Create User model
export default mongoose.model<IUser>('User', userSchema);
