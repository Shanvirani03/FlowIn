import React from 'react';
import { Link } from 'react-router-dom'
import "../Styles/home.css"

export const Home = () => {
    return ( 
        <div className='homePage'>
            <div className='homePageContainer'>
                <h1>
                    O<span>FF</span>TOP
                </h1>
                    <p>coming soon</p>
                    <Link to='/Login'>
                    <button> Start Rapping </button>
                </Link>
            </div>
        </div>
     );
}

export default Home;