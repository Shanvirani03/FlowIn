import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/home.css'

function Home () {
    return ( 
        <div className='landingPage' style={{backgroundColor:'transparent'}}>
            <div className='headerContainer'>
                <h1 class="app-name" style={{ fontSize: "10em", marginBottom: 10, marginTop: -50 }}>
                    O<span>FF</span>TOP
                </h1>
                <h2 style={{ fontSize: "2em", marginTop: -10, marginBottom: 65  }}>coming soon</h2>
                <Link to='/Login'>
                <button className='btn waves-effect waves-light btn-large' style={{ backgroundColor: 'gold', color: 'black', borderRadius: '25px', padding: '0 2rem' }}> Start Rapping </button>
                </Link>
            </div>
        </div>
     );
}
 
export default Home;