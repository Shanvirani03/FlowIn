import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserModel = mongoose.model('users');

export const login = async (req, res) => {
    const { username, password } = req.body

    var user;
    if (username.includes("@")) {
        user = await UserModel.findOne({ email : username })
    } else {
        user = await UserModel.findOne({ username : username})
    }

    if (!username || !password){
       return res.status(422).json({error:"please add email or password"})
    }

    UserModel.findOne({ username })
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},process.env.REACT_APP_JWT_SECRET)
               const {_id, name, email, followers, following, pic} = savedUser
               res.json({ token, user : {_id, name, email, followers, following, pic }})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password : passwordHashed
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}
