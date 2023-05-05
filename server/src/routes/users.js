import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { UserModel } from '../models/Users.js';
import { error } from 'console';
import { userInfo } from 'os';

const router = express.Router()


router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.json({message: "User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ 
            username, 
            password: hashedPassword, 
            email, 
            emailToken : crypto.randomBytes(64).toString('hex'),
            isVerified : false,
        });

        await newUser.save()
        res.json({ message: "User Registered Successfully! Please verify your account in your email address." });

        //send verification email to user
        var mailOptions = {
            from : ' "OffTop Email Verification"  <offtopresources@gmail.com>',
            to : newUser.email,
            subject: 'OffTop -verify your email',
            html: `<h2> ${newUser.username}! Thanks for registering on our site </h2>
                    <h4> Please verify your email to continue...</h4>
                    <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">Verify Your Email</a>`
        }

        //sending email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log('Verification email is sent to your gmail account')
            }
        })

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
            return res.json({ message: "Password Is Incorrect"});
        }
        
        const token = jwt.sign({ id: user._id }, 'secret');
        res.json({ token, userID: user._id });

    } else {
        return res.json({ message: "Username Or Password Is Incorrect!" });
    }
});

router.get("/verify-email", async(req, res)=> {
    try {
        const token = req.query.emailToken
        const user = await UserModel.findOne({ emailToken : token })

        if (user) {
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.redirect("/Users/shan/Desktop/OffTopApp/client/src/pages/Login.js")
        }
        else {
            res.redirect("/Users/shan/Desktop/OffTopApp/client/src/pages/Registration.js")
            console.log("email is not verified!")
        }
    } catch(err) {
        console.log(err)
    }
});


router.get("/register", (req, res) => (
    res.render()
))

var transporter = nodemailer.createTransport({

    service: "Gmail",

    auth: {
        user : "offtopresources@gmail.com",
        pass : "iblpfqfkgrcfmyul"
    },
    tls: {
        rejectUnauthorized: false
    }
})


export { router as userRouter};