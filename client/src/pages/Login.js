import React, { useState, useContext, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/login.css';
import showEyeIcon from '../assets/eye-open1.png';
import hideEyeIcon from '../assets/eye-closed1.png';
import axios from "axios";
import { useCookies } from 'react-cookie';
import M from "materialize-css";
import { userContext } from '../App';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login(props) {

  const {state, dispatch} = useContext(userContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/auth/Login", {
            username,
            password,
        });

        if (response.data.message) {
            alert(response.data.message)
        }
        else {
            setCookies("access_token", response.data.token);
            console.log(response.data.token)
            window.localStorage.setItem("user", JSON.stringify(response.data.user));
            window.localStorage.setItem("jwt", response.data.token);
            dispatch({ type: "USER", payload: response.data.user });
            M.toast({html: "Sucessfully Signed In", classes:"#4Ja047 blue darker-1"})
            navigate("/Profile")
        }

    } catch (err) {
        M.toast({html: "Username or Password Incorrect", classes:"#4Ja047 blue darker-1"})
    }
  };

  return (
    <div className="row">
        <div className="col s12 m6 offset-m3 center-align">
          <div className="head-container" style={{ backgroundColor: "transparent" }}>
            <h1 style={{ fontSize: "10em", marginBottom: 40 }}>O<span>FF</span>TOP</h1>
            <h2 style={{ fontSize: "2em", marginBottom: 30, marginTop: -40 }}>Login</h2>
          </div>
        </div>
        
      <form className="col s12 m6 offset-m3" onSubmit={onSubmit}>

        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="icon_username"
              type="text"
              className="validate"
              value={username}
              style={{ color: "white" }}
              title="Username must be at least 3 characters long"
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="icon_username" style={{ color: "white" }}>
              Username
            </label>
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="icon_password"
              className="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ color: "white" }}
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

        </div>

        <div className="submission center-align">
          <button className="btn waves-effect waves-light btn-large" type="submit" name="action" style={{backgroundColor: 'gold', color: 'black'}}>
            Sign In
            <i className="material-icons right">send</i>
          </button>
          <p style={{ margin: "25px", color: "white" }}>
            Don't have an account? 
            <Link to="/Registration"> 
              <button className='signup-btn' style={{color: 'gold'}}>Sign up here</button>
            </Link>
          </p>
        </div>

      </form>

    </div>
  );
}

export default Login;