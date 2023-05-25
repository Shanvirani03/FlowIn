import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { UserModel } from "../models/Users.js";
import { PostsModel } from "../models/Posts.js";
import { verify } from "crypto";

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
      const user = await UserModel.findOne({ _id: req.user._id }).select("-password");
      const posts = await PostsModel.find({ postedBy: req.params.id })
        .select("-password")
        .populate("postedBy", "_id name ");
      res.json({ user });
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

  router.put('/unfollow', verifyToken, async (req, res) => {
    try {
      const followUser = await UserModel.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
  
      const currentUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true }
      ).select("-password");
  
      res.json(currentUser);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  });

  router.put("/changeBio", verifyToken, async (req, res) => {
    try {
      const userId = req.user._id;
    
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { bio: req.body.bio }, // Update the bio field with the new value
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

router.get("/getUserInfo", verifyToken, (req, res) => {
    try {
        const followers = req.user.followers;
        const following = req.user.following;
        return res.json({followers, following})
    } catch (err) {
        return res.status(404).json({ error: "User not found." });
    }
}, [])

router.post("/searchUsers", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query, "i");
  UserModel.find({ username: { $regex: userPattern } })
    .select("username _id email")
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



export { router as userRouter };