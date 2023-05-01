import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import "../Styles/registration.css"
import Login from "./Login";
import { useNavigate } from "react-router-dom";


export const Registration = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
                email
            });
            alert("Registration Completed! Now Login.")
            navigate('/Login')
        } catch (err) {
            console.error(err);
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
          <p>Registration</p>
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
}

export default Registration;