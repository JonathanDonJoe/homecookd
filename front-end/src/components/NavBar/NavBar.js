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
        document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line no-unused-vars
        var instances = window.M.Sidenav.init(elems);
        });
    }

    render() {
        // console.log('this.props.auth:')
        // console.log(this.props.auth)
        // console.log(auth0Client.getIdToken())
        // console.log(auth0Client.getProfile())
        let hostEl;
        if ((auth0Client.isAuthenticated() || this.props.auth.loggedIn) ){
            hostEl = <li><Link to='/host'>Host a Meal</Link></li>
        }
        let messengerEl;
        if ((auth0Client.isAuthenticated() || this.props.auth.loggedIn) ){
            messengerEl = <li><Link to='/Messenger'>Messenger</Link></li>
        }
        let dashboardEl;
        if ((auth0Client.isAuthenticated() || this.props.auth.loggedIn) ){
            dashboardEl = <li><Link to='/dashboard'>Dashboard</Link></li>
        }
        let logoutEl;
        if ((auth0Client.isAuthenticated() || this.props.auth.loggedIn) ){
            logoutEl = <li className='nav-non-link' onClick={this.signOut}>Log Out</li>
        }
        let loginEl;
        if (!(auth0Client.isAuthenticated() || this.props.auth.loggedIn) ){
            loginEl = <li className='nav-non-link' onClick={auth0Client.signIn}>Log In</li>
        }

        return (
            <div className='container-fluid nav'>
                <div className='row nav-row'>
                    <nav className='green lighten-2 col s12 menu-hover-lines'>
                        <div className='nav-wrapper'>
                            <Link to='/' ><img className="col s1" id="icon-style" src={icon} alt='site_home' ></img></Link>
                            <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>
                            <ul id='nav-mobile' className='right hide-on-med-and-down'>                    
                            <li><Link to='/events/search'>Events</Link></li>
                        {hostEl}
                        {messengerEl}
                        {dashboardEl}
                        {loginEl}
                        {logoutEl}
                            </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-demo">
                        <li><Link to='/events/search'>Events</Link></li>
                        {hostEl}
                        {messengerEl}
                        {dashboardEl}
                        {loginEl}
                        {logoutEl}
                    </ul>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));