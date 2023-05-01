import React from 'react';
import "../Styles/navbar.css"
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

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
          <Link to='/Login' className='navbar-link'>LOGIN</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;