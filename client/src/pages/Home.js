import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/home.css'

function Home () {
    return ( 
        <div className='landingPage'>
            <div className='headerContainer'>
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