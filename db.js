import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : String,
    password : String
});
const workoutSchema = new mongoose.Schema({
    userName: String,
    exercise: String,
    sets: Number,
    reps: Number,
    weight: Number,
    date: {
        type: Date,
        default: Date.now
    }
});
const userModel = mongoose.model('user' , userSchema);
const workoutModel = mongoose.model('workout', workoutSchema);
export {userModel , workoutModel};
