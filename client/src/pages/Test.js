import React from 'react';
import { Link } from 'react-router-dom'
import '../Styles/test.css'

function Test() {
    return ( 
        <div className='landingPage' style={{backgroundColor:'transparent'}}>
            <div className='headerContainer'>
                {/* <h1 style={{ fontSize: "10em", marginBottom: 10, marginTop: -50 }}>
                    T<span>EST</span>ING
                </h1> */}

                <h1 class="drippy-text">Drippy Animation</h1>
                <h2 style={{ fontSize: "2em", marginTop: -10, marginBottom: 65  }}>coming soon</h2>
                <Link to='/Login'>
                <button className='btn waves-effect waves-light btn-large' style={{ backgroundColor: 'gold', color: 'black', borderRadius: '25px', padding: '0 2rem' }}> Start Rapping </button>
                </Link>
            </div>
        </div>
     );
}
 
export default Test;