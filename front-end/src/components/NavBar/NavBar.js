import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import auth0Client from '../Auth/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './NavBar.css';
import tokenLoginAction from '../../actions/tokenLoginAction'

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

    componentDidMount = () => {
        console.log('componentDidMount')
        if(localStorage['access_token']) {
            console.log(localStorage['access_token'])
            this.props.tokenLogin({token:localStorage['access_token']})
        }
    }

    render() {
        // console.log(this.props.auth.modal)
        // console.log(this.state.showModal);
        // console.log(auth0Client.getIdToken())
        // console.log(auth0Client.getProfile())
        return (
            <div className='container-fluid nav'>
                <div className='row nav-row'>
                    <nav className='green'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>HomeCookd</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'>Host a Meal</Link></li>
                                <li><Link to='/events/search'>Events</Link></li>
                                {
                                    auth0Client.isAuthenticated() &&
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                }
                                {
                                    !auth0Client.isAuthenticated() &&
                                    <li className='nav-non-link' onClick={async ()=>{
                                        const result = await auth0Client.signIn()
                                        console.log(result)
                                    }}>Log In</li>
                                }
                                {
                                    !auth0Client.isAuthenticated() &&
                                <li className='nav-non-link' onClick={auth0Client.signIn}>Register</li>
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
        tokenLogin: tokenLoginAction
    }, dispatch)
}

// export default NavBar;
export default withRouter(connect(mapStateToProps, 
    // null
    mapDispatchToProps
    )(NavBar));