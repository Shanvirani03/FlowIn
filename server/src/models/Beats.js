import mongoose, { Schema } from "mongoose";
import { UserModel } from "./Users.js";

const BeatsSchema = new mongoose.Schema({
    name: {type : String, required : true},
    description: {type: String, required: true},
    duration: { type: Number, required: true },
    photo: {type: String, default: "no photo"},
    genre: {type: String},
    file: { type: String, required: true }, 
    tags: [{ type: String }],
    date: {type: Date, default: Date.now},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: UserModel}],
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: UserModel},
})

export const BeatsModel = mongoose.model('beats', BeatsSchema);