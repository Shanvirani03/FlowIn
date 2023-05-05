import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const PostsSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String}
});

export const UserModel = mongoose.model('users', PostsSchema);