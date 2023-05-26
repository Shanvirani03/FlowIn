import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "../Styles/profile.css"
import axios from "axios";
import pencilIcon from '../assets/icons8-pencil-50.png';
import { useParams } from "react-router-dom";
import { userContext } from "../App";


export const Profile = () => {

    const [profilePicture, setProfilePicture] = useState(null);
    const [backgroundPicture, setBackgroundPicture] = useState(null);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [showUserPosts, setShowUserPosts] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(userContext)
    const {userId} = useParams()
    const [showFollow, setshowFollow] = useState(true)
    const [currentUserId, setcurrentUserId] = useState("")

    const fetchUserProfile = () => {
      axios
        .get(`http://localhost:3001/users/user/${userId}`, {
          headers: {"Authorization" : localStorage.getItem('jwt')}
        })
        .then((response) => {
          console.log("USER PROFILE: ", userProfile)
          setProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchUserProfile();
    }, []);



    useEffect(() => {
      axios
        .get("http://localhost:3001/users/user", {
          headers: { Authorization: localStorage.getItem('jwt') },
        })
        .then((response) => {
          setcurrentUserId(response.data.user._id)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);


    useEffect(() => {
      console.log("Profile: ", userProfile)
    }, [userProfile])

    
    useEffect(() => {
        axios.get("http://localhost:3001/posts/getFollowing")
          .then(response => {
            setProfile(response.data.posts);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
  
      const likePost = (id) => {
        try {
          axios.put("http://localhost:3001/posts/like",
            {
              postId: id
            },
            {
              headers: {
                "Authorization": localStorage.getItem('jwt')
              }
            }
          )
          .then(response => {
            fetchUserProfile()
            console.log(response.data);
          });
        } catch (err) {
          console.log(err);
        }
      }
  
      const unlikePost = (id) => {
        try {
          axios.put("http://localhost:3001/posts/unlike",
            { postId: id },
            { headers: { "Authorization": localStorage.getItem('jwt')}}
          )
          .then(response => {
            fetchUserProfile();
            console.log(response.data);
          });
        } catch (err) {
          console.log(err);
        }
      }
      
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


      const followUser = async (event) => {
        try {
          const response = await axios.put("http://localhost:3001/users/follow",
            { followId: userId },
            { headers: { "Authorization": localStorage.getItem("jwt") } }
          );

          console.log("response.data:", response.data);
          console.log("response.data._id:", response.data._id);

          dispatch({type: "UPDATE", payload: {following: response.data.following, followers: response.data.followers}})
          localStorage.setItem("user", JSON.stringify(response.data))
          setshowFollow(false)
          console.log(showFollow)
          setProfile((prevState) => {
            
            return {
              ...prevState,
              user: {
                ...prevState.user, 
                followers:[...prevState.user.followers, response.data.currentUser._id]
              }
            }
          })
        } catch (err) {
          console.log(err);
        }
      };

      const unFollowUser = async (event) => {
        try {
          const response = await axios.put(
            "http://localhost:3001/users/unfollow",
            { unfollowId: userId },
            { headers: { "Authorization": localStorage.getItem("jwt") } }
          );
      
          dispatch({ type: "UPDATE", payload: { following: response.data.following, followers: response.data.followers } });
          localStorage.setItem("user", JSON.stringify(response.data));
          setshowFollow(true);
          setProfile((prevState) => {
            return {
              ...prevState,
              user: {
                ...prevState.user,
                followers: prevState.user.followers.filter((followerId) => followerId !== response.data._id)
              }
            };
          });
        } catch (err) {
          console.log(err);
        }
      };

      
      return (
        <div class="row">
        <div class="col s10 push-s1" style={{ backgroundColor: "transparent",  borderBottom: "1px solid grey" }}>
          <div class="col s4" style={{color:'white'}}>
            <img class="responsive-img circle" 
              style={{ width: "160px", height:"180px", borderRadius:"80px", marginTop: 40, marginBottom: 20}} 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"/>
          </div>
          <div class='col s8 black white-text' style={{ marginTop: 20 }}>
            <div>
              <h4>{userProfile && userProfile.user.username}</h4>
            </div>
            <div style={{ display:'flex', marginTop: 3 }}>
              <h5 style={{ paddingRight: '20px' }}>{userProfile && userProfile.user.followers.length} Followers</h5>
              <h5 style={{ paddingRight: '20px' }}>{userProfile && userProfile.user.following.length} Following</h5>
              <h5>{userProfile && userProfile.posts.length} Posts</h5>
            </div>
          </div>
          <div class="col s8 black white-text" style={{ marginTop: 10}}> 
              <p>{userProfile && userProfile.user.bio}</p>
          </div>
        </div>
        <div class="col s10 push-s1" style={{ backgroundColor: "transparent", display:'flex' }}>
          <div class="col s4 push-s2" style={{backgroundColor:'transparent'}}>
              <ul style={{ display:'flex' }}>
              <button onClick={handleShowAllPosts} className="btn" type="Register" name="action">{userProfile && userProfile.user.username}`s Page</button>
              <button onClick={handleShowUserPosts} className="btn" type="Register" name="action">{userProfile && userProfile.user.username}'s Page</button>
            </ul>
          </div>
          <div class="col s2" style={{ backgroundColor:"black", marginTop:10}}>
            <button 
              onClick={userProfile && userProfile.user.followers.includes(currentUserId)? unFollowUser : followUser} 
              className="btn" type="Register" 
              name="action">{userProfile && userProfile.user.followers.includes(currentUserId)? "Following" : "Follow"}
            </button>
          </div>
        </div>
        {showCreatePostForm && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
                <form onSubmit={createPost} className="createPostForm" style={{ width: 600 }}>
                <div className="formGroup">
                  <label htmlFor="title">Title:</label>
                  <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className="formGroup">
                  <label htmlFor="body"> <textarea
                   style={{ backgroundColor: "white", color: 'black', height: '150px',}}
                   id="body" placeholder="What's on your mind?" 
                   value={body} onChange={(event) => setBody(event.target.value)}>
                  </textarea></label>
                </div>
                <div className="formActions">
                  <button type="submit" className="submitButton" style={{borderRadius:100, backgroundColor:"aqua"}}>Submit</button>
                  <button type="button" onClick={()=> setShowCreatePostForm(false)} style={{borderRadius:100, backgroundColor:"aqua"}} className="cancelButton"> Cancel</button>
                </div>
              </form>
          </div>
            )}
      <div class="col s6 push-s3" style={{ backgroundColor: "transparent", color:'white', borderLeft: "1px solid grey",  borderRight: "1px solid grey" }} > 
      <div className="tweet">
        {showUserPosts ? (
          userProfile && userProfile.posts.map(post => (
            
            <div key={post._id} className="tweet" style={{ marginTop: 10, borderBottom: "1px solid grey"}}>
              <h6>{userProfile && userProfile.user.username} ~ {" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</h6>
              <p style={{ marginBottom: 20 }}>{post.body}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
              {post.likes.includes(state._id)? 
                  <button onClick={()=>{unlikePost(post._id)}} style={{ backgroundColor: "transparent", color: "red", border: "none", transition: "transform 0.3s" }}> <i className="material-icons" style={{ marginBottom: 20, marginRight: 0 }}>favorite</i></button>
                    :
                  <button onClick={()=>{likePost(post._id)}} style={{ backgroundColor: "transparent", color: "white", border: "none", transition: "transform 0.3s" }}> <i className="material-icons" style={{ marginBottom: 20, marginRight: 0 }}>favorite</i></button>
              }                
              <p>{post.likes.length}</p>
              </div>
              <button>
              <div style={{ marginLeft: -80, marginTop: 4 }}><i className="material-icons" style={{ color:"white", marginBottom: 20 }}>comment</i></div>
              </button>
              <div style={{ marginLeft: -50, marginTop: 2 }}><i className="material-icons" style={{ marginBottom: 20, marginRight: 20 }}>repeat</i></div>
              </div>
              {/* <img src={post.photo} alt="Post" /> */}
            </div>
           
          ))
        ) : (
          userProfile && userProfile.posts.map(post => (
            <div key={post._id} className="tweet" style={{ marginTop: 10, borderBottom: "1px solid grey"}}>
              <h6>{userProfile && userProfile.user.username} ~ {" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</h6>
              <p style={{ marginBottom: 20 }}>{post.body}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
                {post.likes.includes(state._id)? 
                  <button onClick={()=>{unlikePost(post._id)}} style={{ backgroundColor: "transparent", color: "red", border: "none", transition: "transform 0.3s" }}> <i className="material-icons" style={{ marginBottom: 20, marginRight: 0 }}>favorite</i></button>
                    :
                  <button onClick={()=>{likePost(post._id)}} style={{ backgroundColor: "transparent", color: "white", border: "none", transition: "transform 0.3s" }}> <i className="material-icons" style={{ marginBottom: 20, marginRight: 0 }}>favorite</i></button>
                }            
                <p>{post.likes.length}</p>
              </div>
              <div style={{ marginLeft: -80, marginTop: 4 }}><i className="material-icons" style={{ marginBottom: 20 }}>comment</i></div>
              <div style={{ marginLeft: -50, marginTop: 2 }}><i className="material-icons" style={{ marginBottom: 20 }}>repeat</i></div>
              </div>
              {/* <img src={post.photo} alt="Post" /> */}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

}
    

export default Profile;