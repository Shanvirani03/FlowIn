import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { UserModel } from "../models/Users.js";
import { PostsModel } from "../models/Posts.js";

const router = express.Router();

/* READ */

router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).select("-password");
    const posts = await PostsModel.find({ postedBy: req.params.id })
      .select("-password")
      .populate("postedBy", "_id name");
    res.json({ user, posts });
  } catch (err) {
    return res.status(404).json({ error: "User not found." });
  }
});

router.get('/user', verifyToken, async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.params.id }).select("-password");
      const posts = await PostsModel.find({ postedBy: req.params.id })
        .select("-password")
        .populate("postedBy", "_id name");
      res.json({ user, posts });
    } catch (err) {
      return res.status(404).json({ error: "User not found." });
    }
  });

/* UPDATE */
router.put("/follow", verifyToken, async (req, res) => {
    const followId = req.body.followId;
    const currentUserId = req.user._id;
  
    try {
      const followUser = await UserModel.findByIdAndUpdate(
        followId,
        { $push: { followers: currentUserId } },
        { new: true }
      );
  
      const currentUser = await UserModel.findByIdAndUpdate(
        currentUserId,
        { $push: { following: followId } },
        { new: true }
      );
  
      res.json({ followUser, currentUser });
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  });

router.put("/unfollow", verifyToken, (req, res) => {
    UserModel.findByIdAndUpdate(req.body.unfollowId, {
        $pull : { followers : req.user._id }
    }, 
    { 
        new : true 
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error : err })
        }
        UserModel.findByIdAndUpdate(req.user_id, {
            $push : { following : req.user.unfollowId }
        }, { new : true }).then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error : err })
        })
    } 
    )
}) 

router.get("/getUserInfo", verifyToken, (req, res) => {
    try {
        const followers = req.user.followers;
        const following = req.user.following;
        return res.json({followers, following})
    } catch (err) {
        return res.status(404).json({ error: "User not found." });
    }
}, [])
// export const getUserInfo = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         console.log(req.params)
//         // const post = await Post.find({ userId });
//         // res.status(200).json(post);
//     } catch (err) {
//         // res.status(404).json({ message: err.message })
//     }
// }


export { router as userRouter };