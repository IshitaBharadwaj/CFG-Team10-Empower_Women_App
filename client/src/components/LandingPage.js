import React from 'react';
import { Link } from 'react-router-dom';
// import BackgroundImage from './assets/wallpaperflare.jpg';
import BackgroundImage from '../assets/Corporate-Governance.jpg';


function LandingPage() {

    const HeaderStyle = {
        width: "100%",
        height: "100vh",
        background: `url(${BackgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: "3rem"
    }

    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">Welcome!</h1>
            <p className="main-para text-center">Join us now and Explore!</p>


            <div className='container my-5'>
            <div className="buttons text-center">
                <Link to="/login">
                    <button type="button" className="btn btn-primary">Log In</button>
                </Link>
                <span style={{ margin: '10px' }}></span> {/* Add spacing */}
                <Link to="/register">
                    <button type="button" class="btn btn-primary" id="reg_btn"><span>Register </span></button>
                </Link>
            </div>
            </div>

            
            
        </header>
    )
}


export default LandingPage;