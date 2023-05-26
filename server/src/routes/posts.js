import express from 'express';
import { PostsModel } from '../models/Posts.js';
import { verifyToken } from '../../middleware/auth.js';
import { verify } from 'crypto';
import { UserModel } from '../models/Users.js';

const router = express.Router()

router.get('/allPosts', (req, res) => {
    PostsModel.find()
        .sort({ date: -1})
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



router.get('/getFollowing', verifyToken, (req, res) => {
  const userId = req.user._id;

  PostsModel.find({
    $or: [
      { postedBy: { $in: req.user.following } }, // Posts from users being followed
      { postedBy: userId }, // Posts created by the authenticated user
    ]
  })
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .sort( {date: -1} )
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    });
});



router.get('/myPosts', verifyToken,(req, res) => {
    PostsModel.find({ postedBy : req.user.id })
        .sort({ date: -1})
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
    const { body} = req.body;
    if(!body) {
        res.status(422).json({error: "Please complete all fields"})
    } 
    const post = new PostsModel({
        body,
        postedBy: req.user.id
    })
    post.save().then(result => {
        res.json({ post : result });
    })
    .catch(err => {
        console.log("Please complete all fields");
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

  router.get('/viewPost/:id', async (req, res) => {
    try {
      const post = await PostsModel.findById(req.params.id).populate("postedBy", "_id username");
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.put('/comment', verifyToken, (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id
    };

    PostsModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment }
      },
      {
        new: true
      }
    )
      .populate('comments.postedBy', '_id username')
      .populate("postedBy","_id username")
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      });
  });

  


export { router as postsRouter };

