import React from 'react';
import Login from './NavBar/Login';
import './NavBar/NavBar.css'

function LoginPage(props){
    const loginStyles = {
        "display": "block",
        "border": "1px solid black",
        "marginTop": "100px"
    }
    const preLoginPage = localStorage.getItem('preLoginPage')
    const pushUrl = preLoginPage ? preLoginPage : "/"

    return(
        <div className="login-modal" style={loginStyles}>
            <Login closeModal={()=>{props.history.push(pushUrl)}} />
        </div>
    )
}

export default LoginPage;