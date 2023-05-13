import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String},
    followers: [{type: String}],
    following: [{type: String}],
    emailToken: {type: String},
    isVerified: {type: Boolean},
    date: {type: Date, default: Date.now()}
});

export const UserModel = mongoose.model('users', UserSchema);
