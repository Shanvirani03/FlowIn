import express from 'express';
import { PostsModel } from '../models/Posts.js';
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router()

router.get('/allPosts', (req, res) => {
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


router.get('/myPosts', verifyToken,(req, res) => {
    PostsModel.find({ postedBy : req.user.id })
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

router.post('/createPost', verifyToken, (req,res) => {
    const {title, body, _id} = req.body;
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

router.put('/like', verifyToken, (req, res) => {
    PostsModel.findByIdAndUpdate(req.body.postId, {
        $push : {likes : req.user._id}
    }, {
        new : true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error : err })
        } else {
            res.json(result)
        }
    })
})


router.put('/unlike', verifyToken, (req, res) => {
    PostsModel.findByIdAndUpdate(req.body.postId, {
        $push : {likes : req.user._id}
    }, {
        new : true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error : err })
        } else {
            res.json(result)
        }
    })
})
export { router as postsRouter };

