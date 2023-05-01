import express from "express";
import cors from 'cors' 
import mongoose from "mongoose";

import { userRouter } from './routes/users.js'


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect('mongodb+srv://Shanvirani6:1OqG4KN3sa044hhi1@offtop.oyvygrj.mongodb.net/offtop?retryWrites=true&w=majority').then(
  () => { 
     console.log("Connected to DB!");
 },
  err => { 
    console.log(err);
 }
);

app.listen(3001, () => console.log("SERVER STARTED!"))
