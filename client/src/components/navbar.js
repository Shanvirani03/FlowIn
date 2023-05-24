import React, { useContext, useRef, useEffect, useState } from 'react';
import '../Styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import M from 'materialize-css/dist/js/materialize.min.js';
import searchIcon from '../assets/loupe.png';
import { userContext } from '../App';
import axios from 'axios';

function Navbar() {
  const searchModal = useRef(null)
  const [search, setSearch] = useState("")
  const [userDetails, setUserDetails] = useState([])
  const navigate = useNavigate();
  const {state, dispatch} = useContext(userContext)


  useEffect(() => {
    M.Modal.init(searchModal.current)
  },[])

  const renderList = () => {
    if (state) {
      return [
        <li key="1"><a><i data-target="modal1" className="material-icons modal-trigger">search</i></a></li>,
        <li key="2"><a href="/Profile">Profile</a></li>,
        <li key="3"><a href="#">Lobbies</a></li>,
        <li key="4"><a href="#">My Beats</a></li>,
        <li key="5"><a href="#">View Beats</a></li>,
        <li key="6"><a onClick={logout}>LOGOUT</a></li>
      ];
    } else {
      return [
        <li key="1"><a href="/Login">LOGIN</a></li>
      ];
    } 
  };

  const logout = () => {
    window.localStorage.clear()
    dispatch({type : "CLEAR"})
    navigate('/');
  };

  const initializeDropdown = () => {
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
  };


  // const fetchUserProfile = () => {
  //   axios
  //     .get(`http://localhost:3001/users/user/${userId}`, {
  //       headers: {"Authorization" : localStorage.getItem('jwt')}
  //     })
  //     .then((response) => {
  //       setUserDetails(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  
  const fetchUsers = (query) => {
    setSearch(query);
    axios.post("http://localhost:3001/users/searchUsers", { query }, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        setUserDetails(res.data.users)
        console.log('State',state)
        console.log("UserDetails:", userDetails)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("UserDetailsAgain:", userDetails);
  }, [userDetails]);


  return (
    <nav>
      <div className="nav-wrapper" style={{ backgroundColor: 'grey' }}>
        <a href={state?"/Profile" : "/"} className="brand-logo left" style={{ marginLeft: 20 }}>O<span>FF</span>TOP</a>
        <ul id="nav-mobile" className={'hide-on-med-and-down nav-links right'} style={{ marginRight:20 }}>
          {renderList()}
        </ul>
      </div>
      <div id="modal1" class="modal" ref={searchModal}>
        <div className="modal-content" style={{ color: 'black' }}>
          <input type="text" placeholder='Search Users' value={search} onChange={(e) => fetchUsers(e.target.value)}/>
          <ul className='collection'>
                {userDetails.map(item => (
                  <Link
                      to={`/Profile/${item._id}`}
                      onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch('');
                      navigate(`/Profile/${item._id}`);
                      }}
                      className='collection-item'
                    >
                      {item.username}
                </Link>
                ))}
              </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Cancel</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
