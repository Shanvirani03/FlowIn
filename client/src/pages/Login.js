import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/login.css';
import showEyeIcon from '../assets/eye-open1.png';
import hideEyeIcon from '../assets/eye-closed1.png';
import axios from "axios";
import { useCookies } from 'react-cookie';


function getPasswordBtnStyle(icon) {
  return {
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  };
}

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const eyeIcon = showPassword ? hideEyeIcon : showEyeIcon;
  const buttonStyle = getPasswordBtnStyle(eyeIcon) 
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/auth/Login", {
            username,
            password
        });

        if (response.data.message) {
            alert(response.data.message)
        }
        else {
            setCookies("access_token", response.data.token);
            console.log(response.data.token)
            window.localStorage.setItem("userID", response.data.user._id);
            navigate("/Profile")
        }

    } catch (err) {
        alert("Username or Password is incorrect")
    }
  };

  return (
    <div className='login-container'>
      <div className='header-container'>
        <h1>
          O<span>FF</span>TOP
        </h1>
      </div>
      <div className='form-container'>
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <input className="text-input" type='text' placeholder='Username or Email' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <input className='password-input' type={showPassword ? 'text' : 'password'} placeholder='Password' 
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="password-btn" type="button" style={buttonStyle} 
                onClick={toggleShowPassword} aria-label="Toggle password visibility" />
          </div>
          <button type='submit'>Login</button>
          <Link to='/Registration'>
            <button type='button'>Sign Up</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;