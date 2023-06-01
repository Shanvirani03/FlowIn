import React, { useContext, useRef, useEffect, useState } from 'react';
import '../Styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import M from 'materialize-css/dist/js/materialize.min.js';
import searchIcon from '../assets/loupe.png';
import { userContext } from '../App';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Navbar() {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    M.Modal.init(searchModal.current);
    initializeDropdown();
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  }, []);

      // <div>
    //   <div className="navbar-fixed">
    //     <nav>
    //       <div className="nav-wrapper">
    //         <a href="#!" className="brand-logo center" style={{ fontFamily: 'cursive', fontSize: '2.5em' }}>View Beats</a>
    //         <ul className="left">
    //           <li>
    //             <a href="#!">
    //               <i className="material-icons">search</i> Search
    //             </a>
    //           </li>
    //         </ul>
    //         <ul className="right">
    //           <li>
    //             <a href="#!">
    //               <i className="material-icons">cloud_upload</i> Upload Beat
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>
    //   </div>

  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <a>
            <i data-target="modal1" className="material-icons modal-trigger">search</i>
          </a>
        </li>,
        <li key="2"><a href="/Profile">Profile</a></li>,
        <li key="3"><a href="/Post">Lobbies</a></li>,
        <li key="4"><a href="#">My Beats</a></li>,
        <li key="5"><a href="/Beats">View Beats</a></li>,
        <li key="6"><a onClick={logout}>LOGOUT</a></li>
      ];
    } else {
      return [
        <li key="1"><a href="/Login">LOGIN</a></li>,
        <li key="2"><a href="/Registration">SIGN UP</a></li> 
      ];
    }
  };

  const logout = () => {
    window.localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate('/');
  };

  const initializeDropdown = () => {
    const dropdownOptions = {
      inDuration: 300,
      outDuration: 225,
      hover: true,
      coverTrigger: false,
      alignment: 'right',
      closeOnClick: false,
      constrainWidth: false,
      responsiveThreshold: 992 
    };
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), dropdownOptions);
  };

  const fetchUsers = (query) => {
    setSearch(query);
    axios.post("http://localhost:3001/users/searchUsers", { query }, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        setUserDetails(res.data.users);
        console.log("UserDetails:", userDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper">
        {/* <a href="/Test">Test</a> */}
        <a href={state ? "/Profile" : "/"} className="brand-logo" style={{ marginLeft: 20 }}>
          <span className='navbar-logo-letter1'>O</span>
          <span className='navbar-logo-letter2'>FF</span>
          <span className='navbar-logo-letter3'>TOP</span>
        </a>
        <a href="/" data-target="mobile-demo" className="sidenav-trigger right">
          <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" className={'hide-on-med-and-down nav-links right'} style={{ marginRight: 20 }}>
          {renderList()}
        </ul>
      </div>
      <ul className="sidenav right" id="mobile-demo">
        {renderList()}
      </ul>
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content" style={{ color: 'black' }}>
          <input type="text" placeholder='Search Users' value={search} onChange={(e) => fetchUsers(e.target.value)} />
          <ul className='collection'>
            {userDetails.map(item => (
              <Link
                to={`/Profile/${item._id}`}
                onClick={() => {
                  M.Modal.getInstance(searchModal.current).close();
                  setSearch('');
                  navigate(item._id !== state._id ? `/Profile/${item._id}` : '/Profile');
                  window.location.reload();
                }}
                className='collection-item'
              >
                {item.username}
              </Link>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Cancel</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
