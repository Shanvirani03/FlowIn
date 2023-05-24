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

router.delete("/deletePost/:postId", verifyToken, (req, res) => {
  PostsModel.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .then(post => {
      if (!post) {
        return res.status(422).json({ error: "Post not found" });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
          return post.deleteOne()
      } else {
        return res.status(401).json({ error: "Unauthorized access" });
      }
    })
    .then(() => {
      res.json({ message: "Successfully deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});


router.put('/like', verifyToken, (req, res) => {
    PostsModel.findByIdAndUpdate(req.body.postId, {
      $addToSet: { likes : req.user._id }
    }, {
      new: true
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
  });


  router.put('/unlike', verifyToken, (req, res) => {
    PostsModel.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
  });

export { router as postsRouter };

