import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    bio: {
        type: String,
        validate: {
          validator: function (bio) {
            if (bio) {
              const wordCount = bio.split(" ").length;
              return wordCount <= 200;
            }
            return true; // Allow empty bio
          },
          message: "Bio cannot exceed 200 words",
        },
      },
    password: {type: String, required: true},
    profilePic: {type: String, default: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" },
    followers: [{type: String}],
    following: [{type: String}],
    emailToken: {type: String},
    isVerified: {type: Boolean},
    date: {type: Date, default: Date.now()}
});

export const UserModel = mongoose.model('users', UserSchema);
