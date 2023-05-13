import React from "react";
import { useState, useEffect } from "react";
import "../Styles/profile.css"
import axios from "axios";


export const Profile = () => {

    const [profilePicture, setProfilePicture] = useState(null);
    const [backgroundPicture, setBackgroundPicture] = useState(null);
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [showUserPosts, setShowUserPosts] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
      axios.get("http://localhost:3001/posts/allPosts")
        .then(response => {
          setPosts(response.data.posts);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:3001/posts/myPosts", {
        headers: {"Authorization" : localStorage.getItem('jwt')}
      })
        .then(response => {
          setMyPosts(response.data.posts);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }, []);


    const myPageBtn = document.getElementById("my-page-btn");
    const myPostsBtn = document.getElementById("my-posts-btn");
    const tweetsDiv = document.getElementById("tweets");
    
    const handleShowAllPosts = () => {
      setShowUserPosts(false);
    }
    
    const handleShowUserPosts = () => {
      setShowUserPosts(true);
    }

    const createPost = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/posts/createPost", {
          title: title,
          body: body
        }, {
          headers: {
            "Authorization": localStorage.getItem('jwt')
          }
        });
        alert("Post Successfully created");    
        setShowCreatePostForm(false);
        setTitle("");
        setBody("");
      } catch (err) {
        console.log(err);
      }
    };

    const setBackground = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBackgroundPicture(reader.result);
      };
    };
  
    const handleUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
    };

    return ( 
        <div className="profilePage">
        <div className="profileHeader"></div>
        <div
          className="profilePicture"
          style={{ backgroundImage: `url(${profilePicture})` }}
          onMouseOver={() => { document.body.style.cursor = "pointer"; }}
          onMouseLeave={() => { document.body.style.cursor = "auto"; }}
          onClick={() => document.getElementById('profilePictureInput').click()}
        >
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </div>
        <div className="info">
          <div className="Feed">
            <h1>Posts</h1>
            <h2>0</h2>
          </div>
          <div className="Followers">
            <h1>Followers</h1>
            <h2>0</h2>
          </div>
          <div className="Following">
            <h1>Following</h1>
            <h2>0</h2>
          </div>
          <div className="wins">
            <h1>Wins</h1>
            <h2>0</h2>
          </div>
          <div className="editProfile">
            <button className='editProfileButton'>
              <h1> Edit Profile </h1>
            </button>
            </div>
        </div>
        <div className="myPosts">
          <div className="page">
            <button> 
              <h1 onClick={handleShowAllPosts}>My Page</h1>
            </button>
          </div>
          <div className="posts">
            <button onClick={handleShowUserPosts}>
              <h1>My Posts</h1>
            </button>
          </div>
          <div className="createPost">
            <button onClick={() => setShowCreatePostForm(true)}> Create Post </button>
          </div>
          {showCreatePostForm && (
              <form onSubmit={createPost}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <label>Body:</label>
                <textarea value={body} onChange={(event) => setBody(event.target.value)}></textarea>
                <button type="submit">Create Post</button>
                <button onClick={()=> setShowCreatePostForm(false)}> Cancel</button>
              </form>
            )}
        </div>
        <div className='personalInfo'>
          <h1>Shan Virani</h1>
          <div className='bio'>
            <p>Bol Player, Oob Toucher, AechQ Resident</p>
          </div>
          <div className='location'>
            Fremont, CA
          </div>
          <div className='dayJoined'>
            Joined June 2008
          </div>
        </div>
        <div className='tweets'>
        {showUserPosts ? (
          myPosts.map(post => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {/* <img src={post.photo} alt="Post" /> */}
              <p> Posted by {post.postedBy.username} on{" "} 
                {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              </p>
            </div>
          ))
        ) : (
          posts.map(post => (
            <div key={post._id} className="tweet">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {/* <img src={post.photo} alt="Post" /> */}
              <p> Posted by {post.postedBy.username} on{" "} 
                {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              </p>
            </div>
          ))
        )}
          <div className='allPosts'></div>
        </div>
        <div className='yourPosts'></div>
        <div className='Friends'>
        <h1>Friends</h1>
          <div className='friendsContainer'> 
            <div className='allFriends'>
              All Friends
            </div>
                <div className='activeNow'>
                Active Now
              </div>
          </div>
        </div>
      </div>
    );
}

export default Profile;