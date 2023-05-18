import React from 'react';
import "../Styles/navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import  { useCookies } from 'react-cookie'

function Navbar() {

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem('jwt')
    navigate("/");
  };

  return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
          <span className='navbar-logo-letter1'>O</span>
          <span className='navbar-logo-letter2'>FF</span>
          <span className='navbar-logo-letter3'>TOP</span>
          {/* O<span>FF</span>TOP */}
        </Link>
          <div className='navbar-menu'>
            {cookies.access_token ? (
              <>
                <button> Search </button>
                <Link to='/Profile' className='navbar-link'>Profile</Link>
                <Link to='/JoinAMatch' className='navbar-link'>Lobbies</Link>
                <Link to='/CollaborativeMode' className='navbar-link'>Collaborative Mode</Link>
                <Link to='/ViewBeats' className='navbar-link'>View Beats</Link>
                <button onClick={logout} className='navbar-button'>Log Out</button>
              </>
            ) : (
              <>
                <Link to='/Login' className='navbar-link'>LOGIN</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

export default Navbar;