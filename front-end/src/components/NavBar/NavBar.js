import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import auth0Client from '../Auth/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './NavBar.css';
import tokenLoginAction from '../../actions/tokenLoginAction'
import logOutAction from '../../actions/logoutAction';
import icon from '../../icon.png';

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.logOut()
        this.props.history.replace('/');
    };

    componentDidMount = () => {
        // console.log('componentDidMount')
        if(localStorage['access_token']) {
            // console.log(localStorage['access_token'])
            // console.log('tokenLoginCheck')
            this.props.tokenLogin({token:localStorage['access_token']})
        }
    }

    render() {
        // console.log('this.props.auth:')
        console.log(this.props.auth)
        // console.log(auth0Client.getIdToken())
        // console.log(auth0Client.getProfile())
        return (
            <div className='container-fluid nav'>
                <div className='row nav-row'>
                    <nav className='green lighten-3 col s12'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'><img className="col s2" src={icon}></img></Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'>Host a Meal</Link></li>
                                <li><Link to='/events/search'>Events</Link></li>
                                <li><Link to='/Messenger'>Messenger</Link></li>
                                {
                                    (auth0Client.isAuthenticated() || this.props.auth.loggedIn) &&
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                }
                                {
                                    !(auth0Client.isAuthenticated() || this.props.auth.loggedIn) &&
                                    <li className='nav-non-link' onClick={auth0Client.signIn}>Log In</li>
                                }
                                {
                                    (auth0Client.isAuthenticated() || this.props.auth.loggedIn) &&
                                <li className='nav-non-link' onClick={this.signOut}>Log Out</li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        tokenLogin: tokenLoginAction,
        logOut: logOutAction
    }, dispatch)
}

// export default NavBar;
export default withRouter(connect(mapStateToProps, 
    // null
    mapDispatchToProps
    )(NavBar));