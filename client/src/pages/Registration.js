import React, { useState } from 'react';
import '../Styles/registration.css';
import { Link, useNavigate } from 'react-router-dom';
import showEyeIcon from '../assets/eye-open1.png';
import hideEyeIcon from '../assets/eye-closed1.png';
import axios from 'axios'
import M from "materialize-css";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

function setPasswordEyeIcons(showPassword, showConfirmPassword) {
  const eyeIcon1 = showPassword ? hideEyeIcon : showEyeIcon;
  const buttonStyle1 = getPasswordBtnStyle(eyeIcon1)  
  const eyeIcon2 = showConfirmPassword ? hideEyeIcon : showEyeIcon;
  const buttonStyle2 = getPasswordBtnStyle(eyeIcon2) 
  return [buttonStyle1, buttonStyle2]

}

function validateInput(username, email, password, confirmPassword) {
  const errors = {};

  if (!USER_REGEX.test(username)) {
    M.toast({html: "Invalid username format.", classes:"#4Ja047 blue darker-1"})
  }

  if (!email) {
    M.toast({html: "Email is required.", classes:"#4Ja047 blue darker-1"})
  }

  if (!PWD_REGEX.test(password)) {
    M.toast({html: "Invalid password formats.", classes:"#4Ja047 blue darker-1"})
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
    M.toast({html: "Passwords do not match.", classes:"#4Ja047 blue darker-1"})
  }

  return errors;
};

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword)
  }

  const buttonStyles = setPasswordEyeIcons(showPassword, showConfirmPassword); 
  const buttonStyle1 = buttonStyles[0];
  const buttonStyle2 = buttonStyles[1];

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validateInput(username, email, password, confirmPassword);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:3001/auth/Registration", {
          username,
          password,
          email
        });
        console.log('working')
        M.toast({ html: "Successfully Registered", classes: "#4Ja047 blue darker-1" })
        navigate('/Login')
      } catch (err) {
        M.toast({html : "Username or Email already in use", classes: '#4Ja047 blue darker-1'})
        console.log(err)
      }
    }
  };
  


return (
  <div className="row">
  <div className="col s12 m6 offset-m3 center-align">
    <div className="head-container" style={{ backgroundColor: "transparent" }}>
      <h1 style={{ fontSize: "10em", marginBottom: 40 }}>O<span>FF</span>TOP</h1>
      <h2 style={{ fontSize: "2em", marginBottom: 30, marginTop: -30 }}>Registration</h2>
    </div>
  </div>
    <form className="col s12" onSubmit={onSubmit}>
      <div className="row">
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" 
          type="text"
           className="validate"
           value={username} 
            title='Username must be atleast 3 characters long'
            style={{ color : "white" }}
            onChange={(event) => setUsername(event.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <label htmlFor="icon_prefix" style={{ color: "white" }}>Username</label>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">email</i>
          <input id="icon_email"             
            className="text-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ color: "white" }} />
          <label htmlFor="icon_email" style={{ color: "white" }}>Email</label>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">lock</i>
          <input id="icon_password" 
          type={showPassword ? 'text' : 'password'}
          className="password-input" 
          value={password}  
          title="Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters" 
          style={{ color : "white" }}
          onChange={(event) => setPassword(event.target.value)}/>
          <label htmlFor="icon_password" style={{ color: "white" }}>Password</label> 
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">lock</i>
          <input id="icon_confirm_password" type="password" className="password-input" value={confirmPassword} 
           title="Passwords must match"
           onChange={(event) => setConfirmPassword(event.target.value)} style={{ color: "white" }} />
          <label htmlFor="icon_confirm_password" style={{ color: "white" }}>Confirm Password</label> 
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
      </div>
      <div className="submission center-align">
        <button className="btn waves-effect waves-light btn-large" type="submit" name="action" style={{backgroundColor: 'gold', color: 'black'}}>Register
          <i className="material-icons right">send</i>
        </button>
        <p style={{ marginTop: "10px", color: "white" }}>Already have an account? <Link to="/Login" style={{color: 'gold'}}>Login here</Link>.</p>
      </div>
    </form>
  </div>
);

}

export default Registration;