import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './NavBar.css';

class NavBar extends Component {
    // state = {  }

    login = (e) => {
        e.preventDefault();
        console.log('Login Placeholder')
    }
    register = (e) => {
        e.preventDefault();
        console.log('Register Placeholder')
    }

    render() {
        return (
            <div className='container-fluid nav'>
                <div className='row'>
                    <nav className='green'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>HomeMade</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'>Host a Meal</Link></li>
                                <li><Link to='/events'>Events</Link></li>
                                <li className='nav-non-link' onClick={this.login}>Log In</li>
                                <li className='nav-non-link' onClick={this.register}>Register</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default NavBar;