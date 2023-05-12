import express from "express";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import { UserModel } from '../models/Users.js';
import { login, register } from '../../controllers/auth.js';
import { PostsModel } from "../models/Posts.js";
import { verifyToken } from "../../middleware/auth.js";


const router = express.Router()

/* Routes */

router.get('/protected', verifyToken, (req, res) => {
    res.send("hello user")
})

router.post('/Login', login);

router.post("/Registration", register);

router.post('/createPost', (req,res) => {
    const {title, body} = req.body;
    if(!title || !body) {
        res.status(422).json({error: "Please complete all fields"})
    }
    const post = new PostsModel({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post : result });
    })
    .catch(err => {
        console.log(err);
    })
})

// router.get("/verify-email", async(req, res)=> {
//     try {
//         const token = req.query.emailToken
//         const user = await UserModel.findOne({ emailToken : token })

//         if (user) {
//             user.emailToken = null
//             user.isVerified = true
//             await user.save()
//             res.redirect("/Users/shan/Desktop/OffTopApp/client/src/pages/Login.js")
//         }
//         else {
//             res.redirect("/Users/shan/Desktop/OffTopApp/client/src/pages/Registration.js")
//             console.log("email is not verified!")
//         }
//     } catch(err) {
//         console.log(err)
//     }
// });


// router.get("/register", (req, res) => (
//     res.render()
// ))

// var transporter = nodemailer.createTransport({

//     service: "Gmail",

//     auth: {
//         user : "offtopresources@gmail.com",
//         pass : "iblpfqfkgrcfmyul"
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })


export { router as authRoutes };