import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.json({message: "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, password: hashedPassword, email });
        await newUser.save()

        res.json({ message: "User Registered Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {

    const { usernameOrEmail, password } = req.body;
    
    var user;
    if (usernameOrEmail.includes("@")) {
        user = await UserModel.findOne({ email : usernameOrEmail });
    } else {
        user = await UserModel.findOne({ username : usernameOrEmail });
    }

    if (user) {

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("isPasswordValid: ", isPasswordValid);

        if (!isPasswordValid) {
            console.log("PASSWORD IS INCORRECT");
            return res.json({ message: "Username  or Password is Incorrect!"});
        }

        const token = jwt.sign({ id: user._id }, 'secret');
        console.log("token: ", token);
        console.log("user._id: ", user._id)
        res.json({ token, userID: user._id });

    } else {
        return res.json({ message: "User does not exist!" });
    }

})

export { router as userRouter};