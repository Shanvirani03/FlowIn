import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/login.css"
import axios from "axios";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const [usernameOrEmail, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                usernameOrEmail,
                password
            });
        
            console.log("response.data: ", response.data);
            console.log("usernameOrEmail: ", usernameOrEmail)
            console.log("password: ", password)
            
            if (response.data.message) {
                alert("Oob is alert.")
            }
            else {
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/Profile")
            }

        } catch (err) {
            console.log("oob has error");
            console.error(err);
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
          <form onSubmit={ onSubmit }>
            <input type='text' placeholder='Username' value={usernameOrEmail} onChange={(event) => setUsername(event.target.value) }/>
            <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
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