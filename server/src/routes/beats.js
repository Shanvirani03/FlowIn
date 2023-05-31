import express from 'express';
import { BeatsModel } from '../models/Beats.js';
import { verifyToken } from '../../middleware/auth.js';
import { verify } from 'crypto';
import { UserModel } from '../models/Users.js';

const router = express.router()


router.post('/uploadBeat', verifyToken, (req, res) => {
    try {

    } catch {

    }
})

router.delete('/deleteBeat', verifyToken, (req, res) => {
    try {

    } catch {
        
    }
})

router.post('/saveBeat', verifyToken, (req, res) => {
    try {

    } catch {

    }
})