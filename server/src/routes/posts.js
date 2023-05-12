import express from 'express';
import { PostsModel } from '../models/Posts.js';
import { verifyToken } from '../../middleware/auth.js';
import { verify } from 'crypto';


const router = express.Router()

router.get('/allPosts', verifyToken, (req, res) => {
    PostsModel.find()
        .then(posts => {
            if (!posts) {
                return res.status(404).json({ error: 'No posts found' });
            }
            PostsModel.populate(posts, { path: 'postedBy', select: 'username email date' })
                .then(posts => {
                    res.json({ posts });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Server error' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Server error' });
        });
});


router.get('/myPosts', verifyToken, (req, res) => {
    PostsModel.find({ postedBy: req.user.id })
    .populate("postedBy", "username")
    .then(posts => {
        res.json({ myPosts : posts })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createPost', verifyToken, (req,res) => {
    const {title, body} = req.body;
    if(!title || !body) {
        res.status(422).json({error: "Please complete all fields"})
    }
    
    const post = new PostsModel({
        title,
        body,
        postedBy: req.user.id
    })
    post.save().then(result => {
        res.json({ post : result });
    })
    .catch(err => {
        console.log(err);
    })
})

export { router as postsRouter };

