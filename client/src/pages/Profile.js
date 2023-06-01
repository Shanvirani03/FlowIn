import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "../Styles/profile.css"
import axios from "axios";
import M from "materialize-css";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";


export const Profile = () => {

    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [showUserPosts, setShowUserPosts] = useState(false);
    const [body, setBody] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [bio, setBio] = useState(''); 
    const [username, setUsername] = useState('');
    const [tempUserName, setTempUserName] = useState('');
    const [tempBio, setTempBio] = useState('');

    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(userContext)
    const [data, setData] = useState([])
    const [myData, setMyData] = useState([])
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    const handleEditClick = () => {
      setTempUserName(username);
      setTempBio(bio)
      setEditMode(true);
    };
  
    const handleSaveClick = () => {
      setUsername(tempUserName);
      setBio(tempBio)
      setEditMode(false);
      // Perform save operation or update the data in some way
    };

    const handleCancelClick = () => {
      setEditMode(false);
    };

    const handleUserNameChange = (e) => {
      setTempUserName(e);
    };

    const handleBioChange = (e) => {
      setTempBio(e);
    }

    
    const changeBio = (bio) => {
      axios
        .put(
          "http://localhost:3001/users/changeBio",
          {
            bio,
          },
          {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          }
        )
        .then((response) => {
          fetchUserProfile()
        })
        .catch((err) => {
          console.log(err);
        });
    }


    const fetchPosts = () => {
      axios
        .get("http://localhost:3001/posts/getFollowing", {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        })
        .then((response) => {
          setData(response.data.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function getPost(postId) {

    }

    useEffect(() => {
      fetchPosts();
    }, []);


    const fetchMyPosts = () => {
      axios
        .get("http://localhost:3001/posts/myPosts", {
          headers: {"Authorization" : localStorage.getItem('jwt')}
        })
        .then((response) => {
          setMyData(response.data.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchMyPosts();
    }, []);

    const handleShowAllPosts = () => {
      setShowUserPosts(false);
    };
    
    const handleShowUserPosts = () => {
      setShowUserPosts(true);
    };

    const fetchUserProfile = () => {
      axios
        .get("http://localhost:3001/users/user", {
          headers: {"Authorization" : localStorage.getItem('jwt')}
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchUserProfile();
    }, []);

    
    const likePost = (id) => {
      try {
        axios.put(
          "http://localhost:3001/posts/like",
          { postId: id },
          { headers: { "Authorization": localStorage.getItem('jwt') } }
        )
        .then(response => {
          fetchPosts();
          fetchMyPosts();
        });
      } catch (err) {
        console.log(err);
      }
    };
    
    const unlikePost = (id) => {
      try {
        axios.put(
          "http://localhost:3001/posts/unlike",
          { postId: id },
          { headers: { "Authorization": localStorage.getItem('jwt') } }
        )
        .then(response => {
          fetchPosts();
          fetchMyPosts();
        });
      } catch (err) {
        console.log(err);
      }
    };

     
    const createPost = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3001/posts/createPost",
          { body: body },
          { headers: { "Authorization": localStorage.getItem('jwt') } }
        );
        M.toast({html: "Post Sucessfully Created", classes:"#4Ja047 blue darker-1"})
        setShowCreatePostForm(false);
        setBody("");
        fetchPosts();
        fetchMyPosts();
        fetchUserProfile();
      } catch (err) {
        M.toast({html: "You can not make a blank post", classes:"#4Ja047 blue darker-1"})
      }
    };

  
    const deletePost = (postId) => {
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (confirmed) {
        axios
          .delete(`http://localhost:3001/posts/deletePost/${postId}`, {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          })
          .then((response) => {
            const newData = data.filter((item) => item._id !== postId);
            setData(newData);
            M.toast({
              html: "Post Successfully Deleted",
              classes: "#4Ja047 blue darker-1",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
      setShowForm(true);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Extract the bio value from the form and call changeBio function
      const newBio = event.target.elements.bio.value;
      changeBio(newBio);
      setShowForm(false); // Hide the form after submitting
    };
    
    const viewPost = (postId) => {
      navigate(`/Post/${postId}`)
    }
    
    useEffect(() => {
      const handleCancel = () => {
        setShowCreatePostForm(false);
      };
    
      if (showCreatePostForm) {
        document.body.style.overflow = "hidden";
        window.addEventListener("scroll", handleCancel);
      } else {
        document.body.style.overflow = "visible";
      }
    
      return () => {
        window.removeEventListener("scroll", handleCancel);
      };
    }, [showCreatePostForm]);

    const [editingBio, setEditingBio] = useState(false)

    const showBioForm = () => {
      editingBio(true)
    }

    const saveBioForm = () => {
      editingBio(false)
    }

    const handleCancel  = () => {
      setShowForm(false)
    }
    
    useEffect(() => {
      if(image) {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Offtop")
        data.append("cloud_name", "dsqcsq0oh")
        fetch("https://api.cloudinary.com/v1_1/dsqcsq0oh/image/upload", {
          method: "post",
          body: data
        })
        .then(res=>res.json())
        .then(data=>{
          localStorage.setItem("user", JSON.stringify({...state, profilePic : data.url}))
          dispatch({type: "UPDATEPIC", payload: data.url})
          
          
          axios.put('http://localhost:3001/users/updatePic', {
            profilePic: data.url
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("jwt")
            }
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.error(error);
            });

          fetchUserProfile()
          window.location.reload()
        })
        .catch(err => {})
      }
    }, [image])



    const uploadPhoto = (file) => {
      setImage(file)
    }


    return (
      <div class="row">

        <div class="col s10 push-s1"   style={{backgroundColor: "black", borderBottom: "1px solid grey", padding: '20px' }}>

          <div className="col s4" style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <label htmlFor="profile-pic-input">
              <img
                className="responsive-img circle"
                style={{
                  width: '210px',
                  height: '210px',
                  borderRadius: '80px',
                  marginTop: 40,
                  marginBottom: 20,
                  cursor: 'pointer'
                }}
                src={userProfile && userProfile.user.profilePic}
                alt="Profile Picture"
              />
              <input
                id="profile-pic-input"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => uploadPhoto(e.target.files[0])}
              />
            </label>
            
            <div style={{ marginTop: 'auto' }}>
              {
                editMode? (
                  <>
                    <button className="edit-btn"
                      style={{ backgroundColor: "gold", color: 'black', margin: 10 }} onClick={handleSaveClick}>
                      Save
                    </button>
                    <button className="edit-btn"
                      style={{ backgroundColor: "gold", color: 'black', margin: 10 }} onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </>
                ) : 
                (<button className="edit-btn" 
                  style={{ backgroundColor: "gold", color: 'black', margin: 10 }} onClick={handleEditClick}> 
                  Edit Profile 
                </button>)
              }
            </div>

          </div>


          <div class='col s8 white-text' style={{ marginTop: 20, background:"trasparent"}}>
            <div>
            {editMode ? (
              <input
                type="text"
                className="username-input"
                placeholder={(userProfile && userProfile.user.username)}
                // value={(userProfile && userProfile.user.username) || ''}
                style={{ color: "black", paddingRight: '25px', paddingLeft: '25px', backgroundColor: 'white'}}
                onChange={(event) => handleUserNameChange(event.target.value)} />) : 
                ( <h4 style={{ paddingRight: '25px', paddingLeft: '25px' }}>{userProfile && userProfile.user.username}</h4> )
              }
            </div>
            <div style={{ display:'flex', paddingTop: 3 }}>
              <h5 className="followers-text-header" style={{ paddingRight: '25px', paddingLeft: '25px'}}> 
                <span style={{fontFamily: '"Segoe UI", Arial, sans-serif', fontSize: '30px'}}>{userProfile && userProfile.user.followers.length} </span>
                <span className="followers-text-span">Followers</span> 
              </h5>
              <h5 className="following-text-header" style={{ paddingRight: '25px', paddingLeft: '25px'}}>
                <span style={{fontFamily: '"Segoe UI", Arial, sans-serif', fontSize: '30px'}}>{userProfile && userProfile.user.following.length} </span>
                <span className="following-text-span">Following</span> 
              </h5>
              <h5 className="posts-text-header" style={{paddingRight: '25px', paddingLeft: '25px'}}>
                <span style={{fontFamily: '"Segoe UI", Arial, sans-serif', fontSize: '30px'}}>{myData.length} </span>
                <span className="posts-text-span">Posts</span>
              </h5>
            </div>
          </div>

          <div class='col s8 white-text'>

            {editMode? (
              <input
              type="text"
              className="bio-input"
              placeholder="Bio"
              // placeholder={(userProfile && userProfile.user.username)}
              // value={(userProfile && userProfile.user.username) || ''}
              style={{ color: "black", paddingRight: '25px', paddingLeft: '25px', backgroundColor: 'white', textAlign: 'left', verticalAlign: 'top'}}
              onChange={(event) => handleBioChange(event.target.value)} />
            ) :
              (<p style={{paddingRight: '25px', paddingLeft: '25px'}}> Bio </p>)
            }
            
          </div>

{/* 
          <div>
            {showForm ? (
              <form onSubmit={handleSubmit}>
                <input type="text" name="bio" placeholder="Enter your new bio"  style={{ color: "white"}}/>
                <button className="btn" type="submit">Save</button>
                <button className="btn" type="cancel" onClick={handleCancel}>Cancel</button>
              </form>
            ) : (
              <button className="col s6" onClick={handleButtonClick} style={{ backgroundColor: "black", border: "none", cursor: "pointer", transition: "opacity 0.3s"}}>
                <div className="col s12 black white-text" style={{ marginTop: 10}}>
                  <h6 className="left-align">{userProfile && userProfile.user.bio}</h6>
                </div>
              </button>
            )}
          </div> */}

        </div>

        <div class="col s10 push-s1" style={{ backgroundColor: "black", display:'flex', justifyContent: 'center' }}>
          <ul style={{ display:'flex' }}>
          <button onClick={handleShowAllPosts} className="btn" type="Register" name="action" style={{backgroundColor:"gold", color:'black', margin: 10}}>My Page</button>
          <button onClick={handleShowUserPosts} className="btn" type="Register" name="action" style={{backgroundColor:"gold", color:'black', margin: 10}}>My Posts</button>
          <button onClick={setShowCreatePostForm} className="btn" type="Register" name="action" style={{backgroundColor:"gold", color:'black', margin: 10}}><i className="material-icons">create</i></button>
          </ul>
        </div>
        
        {showCreatePostForm && (
          <div className="fixed-overlay">
            <form onSubmit={createPost} className="createPostForm">
              <div className="input-field">
                <textarea
                  id="body"
                  placeholder="What's on your mind?"
                  style={{ backgroundColor: "white", color: 'black', height: '150px' }}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                ></textarea>
              </div>
              <div className="formActions">
                <button type="submit" className="btn waves-effect waves-light" style={{ borderRadius: 100 }}>Submit</button>
                <button type="button" onClick={() => setShowCreatePostForm(false)} className="btn waves-effect waves-light" style={{ borderRadius: 100 }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div class="col s6 push-s3" style={{ backgroundColor: "black", color:'white', borderLeft: "1px solid grey",  borderRight: "1px solid grey" }} > 
          <div className="tweet" >
            {showUserPosts ? (
              myData && myData.map(post => (
                <div key={post._id} className="tweet" style={{  marginTop: 10, borderBottom: "1px solid grey"}}>
                  <h6 style={{display:'flex'}}><img src={userProfile && userProfile.user.profilePic} style={{width: '60px', height: '60px' }}/> <div style={{marginLeft: "20px"}}>{post.postedBy?.username} ~ {" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    </div>
                  </h6>
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
                  <button onClick={() => deletePost(post._id)} style={{ backgroundColor: "black", color: "white", border: "none", transition: "transform 0.3s" }}>
                      <div style={{ marginLeft: "auto" }}>
                        <i className="material-icons" style={{ marginBottom: 20 }}>delete</i>
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              data && data.map(post => (
                <div key={post._id} className="tweet" style={{ marginTop: 10, borderBottom: "1px solid grey"}}>
                  <h6 style={{display:'flex'}}><img src={userProfile && userProfile.user.profilePic} style={{width: '60px', height: '60px' }}/> <div style={{marginLeft: "20px"}}>{post.postedBy?.username} ~ {" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    </div>
                  </h6>
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
                  <div style={{ marginLeft: -80, marginTop: 4, display:"flex" }} onClick={() => viewPost(post._id)}>
                    <i className="material-icons" style={{ marginBottom: 20 }}>comment</i>
                  <p style={{marginLeft: 10}}>{post.comments.length}</p>
                  </div>
                  <div style={{ marginLeft: -50, marginTop: 2 }}><i className="material-icons" style={{ marginBottom: 20 }}>repeat</i></div>
                  <button onClick={() => deletePost(post._id)} style={{ backgroundColor: "black", color: "white", border: "none", transition: "transform 0.3s" }}>
                      <div style={{ marginLeft: "auto" }}> {post.postedBy._id == state._id?  <i className="material-icons" style={{ marginBottom: 20 }}>delete</i> : <i className="material-icons" style={{ marginBottom: 20 }}>grain</i>}
                      </div>
                    </button>
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