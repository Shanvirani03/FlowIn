import mongoose, { Schema } from "mongoose";
import { UserModel } from "./Users.js";

const PostsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    photo: {type: String, default: "no photo"},
    date: {type: Date, default: Date.now},
    likes: {type: mongoose.Schema.Types.ObjectId, ref: UserModel},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: UserModel}
})

export const PostsModel = mongoose.model('posts', PostsSchema);
