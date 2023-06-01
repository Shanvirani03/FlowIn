import React, { useState } from 'react';
import { useEffect } from 'react';
import '../Styles/registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import M from "materialize-css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


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

  useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword)
  };

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
  
  <div className='registraion-container'>
    <div className="row">

      <div className="col s12 m6 offset-m3 center-align">
        <div className="reg-head-container" style={{ backgroundColor: "transparent" }}>
          <h1 style={{ fontSize: "10em", marginBottom: 40 }}>O<span>FF</span>TOP</h1>
          <h2 style={{ fontSize: "2em", marginBottom: 30, marginTop: -30 }}>Registeration</h2>
        </div>
      </div>
          
      <form className="col s12 m6 offset-m3" onSubmit={onSubmit}>
        <div className="row">

          <div className="input-field col s12">
            <i className="material-icons prefix"
              onClick={() =>
                M.toast({
                  html: "Username must contain at least 3 characters.",
                })
                }>account_circle</i>
            <input
              id="icon_username"
              type="text"
              className="validate"
              value={username}
              style={{ color: "white" }}
              title="Username must be at least 3 characters long"
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="new-username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <label htmlFor="icon_username" style={{ color: "white" }}>
              Username
            </label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix" 
            onClick={() =>
              M.toast({
                html: "Email must be valid.",
              })
              }>email</i>
            <input
              id="icon_email"
              type="email"
              className="text-input"
              value={email}
              style={{ color: "white" }}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="new-email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <label htmlFor="icon_email" style={{ color: "white" }}>
              Email
            </label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix" 
              onClick={() =>
                M.toast({
                  html: "Password must contain at least 8 characters, including lowercase, uppercase, numeric, and special character(s).",
                  displayLength: 6000
                })
              }>lock</i>
            <input
              id="icon_password"
              className="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ color: "white" }}
              autoComplete="new-password"
            />
            <span
              style={{margin: 10}}
              className={`toggle-password ${showPassword ? 'visible' : ''}`}
              onClick={togglePasswordVisibility}>
              {showPassword ? 
                (<FaEyeSlash style={{ color: 'gray' }} />) : (<FaEye style={{ color: 'gray' }} />)
              }
            </span>

            <label htmlFor="icon_password" style={{ color: "white" }}>
              Password
            </label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix"
              onClick={() =>
                M.toast({
                  html: "Passwords must match.",
                })
              }
            >lock</i>
            <input
              id="icon_confirm_password"
              className="password-input"
              type={showConfirmPassword ? 'text' : 'password'} 
              title="Passwords must match"
              value={confirmPassword}
              style={{ color: "white" }}
              onChange={(event) => setConfirmPassword(event.target.value)} 
              autoComplete="new-confirm-password"
            />
            <span
              style={{margin: 10}}
              className={`toggle-confirm-password ${showConfirmPassword ? 'visible' : ''}`}
              onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? 
                (<FaEyeSlash style={{ color: 'gray' }} />) : (<FaEye style={{ color: 'gray' }} />)
              }
            </span>

            <label htmlFor="icon_confirm_password" 
              style={{ color: "white" }}>Confirm Password
            </label> 
          </div>
        </div>

        <div className="submission center-align">
          <button className="btn waves-effect waves-light btn-large" type="submit" name="action" 
            style={{backgroundColor: 'gold', color: 'black'}}>
              SIGN UP <i className="material-icons right">send</i>
          </button>
          <p style={{ margin: "25px", color: "white" }}>Already have an account?
            <Link to="/Login"> 
              <button className='login-btn' style={{color: 'gold'}}>Login here</button>
            </Link>
          </p>
        </div>
            

      </form>
    </div>
  </div>

);

}

export default Registration;