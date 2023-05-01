import React from 'react';
import "../Styles/navbar.css"
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          O<span>FF</span>TOP
        </Link>
        <div className='navbar-menu'>
              <Link to='/Login' className='navbar-link'>LOGIN</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;