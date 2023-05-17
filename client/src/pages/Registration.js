import React, { useState } from 'react';
import '../Styles/registration.css';
import { Link, useNavigate } from 'react-router-dom';
import showEyeIcon from '../assets/eye-open1.png';
import hideEyeIcon from '../assets/eye-closed1.png';
import axios from 'axios'


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
    errors.username = 'Invalid username format';
  }

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!PWD_REGEX.test(password)) {
    errors.password = 'Invalid password format';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
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

    try {
        await axios.post("http://localhost:3001/auth/Registration", {
        username,
        password,
        email
        });
        alert("Registration Completed! Now Login.")
        navigate('/Login')
    } catch (err) {
        const errors = validateInput(username, email, password, confirmPassword) 
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }
        alert("Registration Unsuccessful");
    }
};


  return (
    <div className="registration-container">
      <div className="header-container">
        <h1>
          O
          <span>FF</span>
          TOP
        </h1>
        <p>Join today and start rapping</p>
      </div>
      <div className="form-container">
        <form onSubmit={onSubmit}>
        <div className="input-container">
          <input
            className="text-input"
            type="text"
            placeholder="Username"
            value={username}
            title="Username must be atleast 3 characters long"
            onChange={(event) => setUsername(event.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="input-container">
          <input
            className="text-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
          <div className="input-container">
            <input
              className="password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              title="Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="password-btn" type="button" style={buttonStyle1} 
              onClick={toggleShowPassword} aria-label="Toggle password visibility" /> 
            {errors.password && <p className="error">{errors.password}</p>}
          </div>    
        <div className="input-container">
          <input
            className="password-input"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            title="Passwords must match"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button className="password-btn" type="button" style={buttonStyle2} 
            onClick={toggleShowConfirmPassword} aria-label="Toggle password visibility" /> 
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
          <button className="submit-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );

}

export default Registration;