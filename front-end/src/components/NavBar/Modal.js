import React from 'react';
import { Link } from 'react-router-dom';

function ModalSplash(props){
    return(
        <div>
            <button className="facebook-login">Connect With Facebook</button>
            <button className="google-login">Connect with Google</button>
            <span>or</span>
            <button onClick={()=>{props.changeModalContent('register')}} className="center email-login">Register with email</button>
            <div className="border-rule"></div>
            <div onClick={()=>{props.changeModalContent('login')}} className="login-text align-left">Already have an Airbnb account? <Link to="">Log in</Link></div>        
        </div>
    )
}

export default ModalSplash;