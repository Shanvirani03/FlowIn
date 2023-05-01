import React from "react";
import { useState } from "react";
import "../Styles/profile.css"

export const Profile = () => {

    const [profilePicture, setProfilePicture] = useState(null);
    const [backgroundPicture, setBackgroundPicture] = useState(null);
  
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
              <h1>My Page</h1>
            </button>
          </div>
          <div className="posts">
            <button>
              <h1>My Posts</h1>
            </button>
          </div>
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
          Sorry No Posts Currently...Would you like to make one?
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