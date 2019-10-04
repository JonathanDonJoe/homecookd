import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import auth0Client from '../Auth/Auth';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import './NavBar.css';

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };


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
                            <Link to='/' className='left site-title'><h3>HomeCook'd</h3></Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'><h5>Host a Meal</h5></Link></li>
                                <li><Link to='/events'><h5>Events</h5></Link></li>
                                {
                                    !auth0Client.isAuthenticated() &&
                                    <li className='nav-non-link' onClick={auth0Client.signIn}><h5>Log In</h5></li>
                                }
                                {
                                    !auth0Client.isAuthenticated() &&
                                <li className='nav-non-link' onClick={auth0Client.signIn}><h5>Register</h5></li>
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

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         modal: modalAction
//     }, dispatch)
// }

// export default NavBar;
export default withRouter(connect(mapStateToProps, 
    null
    // mapDispatchToProps
    )(NavBar));