import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/profile.css";
import pencilIcon from '../assets/icons8-pencil-50.png';
import { useParams } from "react-router-dom";

function Post() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    const getPost = async (postId) => {
      try {
        const response = await axios.get(`/viewPost/${postId}`);
        console.log(response.data);
        setPostDetails(response.data); // Set the retrieved post data
      } catch (error) {
        console.log(error);
      }
    };

    getPost(postId);
  }, [postId]);


  const makeComment = (text, postId) => {
    axios.put('/comment',
        {
          postId,
          text
        },
        {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  return (
    <div className="row">
      <div className="col s12">
        <div className="col s12 m8 push-m2 center-align" style={{ backgroundColor: "blue", marginTop: 70 }}>
          <h1 style={{ fontSize: "10em", marginBottom: 40 }}>Post</h1>
        </div>
        <div className="col s12 m4 push-m4">
          <div className="card red">
            <div className="card-content white-text">
              <span className="card-title">Create Comment</span>
              <p>Content</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light" type="button">Create Post</button>
            </div>
          </div>
        </div>
        <div className="col s12 m6 push-m3">
          <div className="card white">
            <div className="card-content">
              <span className="card-title">Comments</span>
              <p>Content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
