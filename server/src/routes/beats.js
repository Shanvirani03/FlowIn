import express from 'express';
import { BeatsModel } from '../models/Beats.js';
import { verifyToken } from '../../middleware/auth.js';
import { verify } from 'crypto';
import { UserModel } from '../models/Users.js';

const router = express.router()


router.post('/uploadBeat', verifyToken, (req, res) => {
    
    const { name, description, file } = req.body;

    try {
        if (!name || !description || !file) {
            return res.status(422).json({ error: "Please complete all of the required fields." });
        }
        const beat = new BeatsModel({
            name,
            description,
            file,
            postedBy: req.user.id
        });
        beat.save()
            .then(result => {
                res.json({ beat: result });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "An error occurred while saving the beat." });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while uploading the beat." });
    }
});

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