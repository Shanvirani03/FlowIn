import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import "../Styles/profile.css";
import pencilIcon from "../assets/icons8-pencil-50.png";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";

function Post() {
  const { postId } = useParams();
  const { state, dispatch } = useContext(userContext);
  const [postDetails, setPostDetails] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);


  const getPost = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/viewPost/${postId}`);
      setPostDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      getPost(postId);
      console.log("postDetails: ", postDetails)
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  console.log("post details: ", postDetails)

  const makeComment = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/posts/comment",
        {
          postId,
          text: commentText,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );
      getPost(postId);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  // const deletePost = async () => {
  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3001/posts/deleteComment",
  //       {
  //         commentId,
  //         text: commentText,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwt"),
  //         },
  //       }
  //     );
  //     getPost(postId);
  //     setCommentText("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const modal = document.getElementById("comment-modal");
    M.Modal.init(modal);
  }, []);

  const likePost = (id) => {
    try {
      axios.put(
        "http://localhost:3001/posts/like",
        { postId: id },
        { headers: { "Authorization": localStorage.getItem('jwt') } }
      )
      .then(response => {
        getPost(id)
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
        getPost(id)
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      console.log("State: ", state)
    } catch {
      console.log("State: ", state)
    }
  })
  
  

  return (
    <div className="row">
      <div className="col s12">
        <div
          className="col s12 m8 push-m2"
          style={{
            color: "white",
            borderLeft: "1px solid grey",
            borderRight: "1px solid grey",
            borderBottom: "1px solid grey",
            backgroundColor: "transparent",
            marginTop: 70,
            position: "relative",
          }}
        >
          <h5>{postDetails && postDetails.postedBy.username} ~ {" "}
                {new Date(postDetails && postDetails.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </h5>
          <p></p>
          <h6>{postDetails && postDetails.body}</h6>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {postDetails && postDetails.likes.includes(state._id)? 
                <i className="material-icons" style={{ marginBottom: 20, color: 'red'}} onClick={() => unlikePost(postDetails._id)} >favorite</i> 
                : 
                <i className="material-icons" style={{ marginBottom: 20, color: 'white' }} onClick={() => likePost(postDetails._id)}>favorite</i> }
              <p style={{ marginLeft: 5 }}>{postDetails && postDetails.likes.length} </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="material-icons" onClick={setShowCreatePostForm} style={{ marginBottom: 20 }}>comment</i>
              <p style={{ marginLeft: 5 }}>
                {postDetails && postDetails.comments.length}
              </p>
            </div>
            <div style={{ marginTop: 2 }}>
              <i className="material-icons" style={{ marginBottom: 20 }}>
                repeat
              </i>
            </div>
            {showCreatePostForm && (
              <div className="fixed-overlay">
                <form onSubmit={makeComment} className="createPostForm">
                  <div className="input-field">
                    <textarea
                      id="text"
                      placeholder="Add a comment"
                      style={{ backgroundColor: "white", color: 'black', height: '150px' }}
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="formActions">
                    <button type="submit" className="btn waves-effect waves-light" style={{ borderRadius: 100 }}>Submit</button>
                    <button type="button" onClick={() => setShowCreatePostForm(false)} className="btn waves-effect waves-light" style={{ borderRadius: 100 }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div
          className="col s6 push-s3"
          style={{
            color: "white",
            borderLeft: "1px solid grey",
            borderRight: "1px solid grey",
            borderBottom: "1px solid grey",
            backgroundColor: "transparent",
          }}
        >
          {postDetails &&
            postDetails.comments &&
            postDetails.comments.map((comment) => (
              <div key={comment._id}>
                <div style={{ display: "flex", alignItems: "center", borderBottom:"1px solid grey" }}>
                  <p>{comment.postedBy.username}</p>
                  <p style={{ marginLeft: 5 }}>{comment.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  
}  


export default Post;
