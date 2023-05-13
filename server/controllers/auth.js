import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserModel = mongoose.model('users');

// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await UserModel.findOne({ username });
//         if (!user) return res.status(400).json({ msg: "User does not exist" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, process.env.REACT_APP_JWT_SECRET);
//         delete user.password;
//         res.status(200).json({ token, user });

//     } catch (err) {
//         res.status(500).json({ err: err.message });
//     }
// }

// router.post('/login', async (req, res) => {
//     const { usernameOrEmail, password } = req.body;

//     var user;
//     if (usernameOrEmail.includes("@")) {
//         user = await UserModel.findOne({ email : usernameOrEmail });
//     } else {
//         user = await UserModel.findOne({ username : usernameOrEmail });
//     }

//     if (user) {
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         console.log("isPasswordValid: ", isPasswordValid);
//         if (!isPasswordValid) {
//             return res.json({ message: "Password Is Incorrect"});
//         }
        
//         const token = jwt.sign({ id: user._id }, 'secret');
//         res.json({ token, userID: user._id });

//     } else {
//         return res.json({ message: "Username Or Password Is Incorrect!" });
//     }
// });

export const login = async (req, res) => {
    console.log(req.body)
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
               res.json({token,user:{_id,name,email,followers,following,pic}})
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

// router.post("/register", async (req, res) => {
//     try {
//         const { username, password, email } = req.body;
//         const user = await UserModel.findOne({ username });

//         if (user) {
//             return res.json({message: "User already exists!"})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new UserModel({ 
//             username, 
//             password: hashedPassword, 
//             email, 
//             emailToken : crypto.randomBytes(64).toString('hex'),
//             isVerified : false,
//         });

//         await newUser.save()
//         res.json({ message: "User Registered Successfully! Please verify your account in your email address." });

//         //send verification email to user
//         var mailOptions = {
//             from : ' "OffTop Email Verification"  <offtopresources@gmail.com>',
//             to : newUser.email,
//             subject: 'OffTop -verify your email',
//             html: `<h2> ${newUser.username}! Thanks for registering on our site </h2>
//                     <h4> Please verify your email to continue...</h4>
//                     <a href="http://${req.headers.host}/user/verify-email">Verify Your Email</a>`
//         }

//         //sending email
//         transporter.sendMail(mailOptions, function(error, info) {
//             if (error) {
//                 console.log(error)
//             }
//             else {
//                 console.log('Verification email is sent to your gmail account')
//             }
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });
