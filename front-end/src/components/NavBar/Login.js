import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BindActionCreators } from 'redux';


class Login extends Component {
    state={
        email: '',
        password: '',
        msg: ''
        }
    componentDidUpdate(prevProps, prevState){
       if(this.props.auth.msg !== prevProps.auth.msg){
            let msg = "";
            if(this.props.auth.msg === "badPass"){
                msg = "We do have a user with this password."
            }else if(this.props.auth.msg === "loggedIn"){
                this.props.closeModal();
            }else if(this.props.auth.msg === "noEmail"){
                msg = "This email is not registered. Please enter a different email or register."
            }
            this.setState({
                msg
            })
        }else{
            // Dont care
        }
    }

    changeEmail = (e)=>{this.setState({email: e.target.value})}
    changePass = (e)=>{this.setState({password: e.target.value})}

    submitLogin = (e)=>{
        e.preventDefault();
        // Validation for email and pass
        const formData = {...this.state}
        this.props.login(formData);
    }
    
    render(){
        return(
            <div className="login-form">
                <p className="red-text">{this.state.msg}</p>
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect with Google</button>
                    <span>or</span>
                    <input onChange={this.changeEmail} value={this.state.email} className="email-register" placeholder="Email address" />
                    <input type="password" onChange={this.changePass} value={this.state.password}  className="password-register" placeholder="Password" />
                    <button className="register-button">Log In</button>
                    <div className="border-rule"></div>
                    <div className="login-text align-left">Don't have an account? <span onClick={()=>{this.props.changeModalContent('register')}} >Register</span></div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

// function mapDispatchToProps(dispatch){
//     //bindActionCreators = make our otherwise 
//     // simple function an action creator!!!
//     return bindActionCreators({
//         login: loginAction
//     },dispatch);
// }

export default connect(mapStateToProps)(Login);