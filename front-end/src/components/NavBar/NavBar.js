import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';

class NavBar extends Component {
    state = { 
        showModal: false,
        modalContent: "" 
        }

    componentDidMount(){
        this.setState({
            modalContent: <Modal changeModalContent={this.changeModalContent}/>            
        })
    }

    changeModalContent = (newContent)=>{
        let modalContent = <Modal changeModalContent={this.changeModalContent}/>
        if(newContent === 'login'){
            modalContent = <Login  changeModalContent={this.changeModalContent} closeModal={this.closeModal}/>
        }else if(newContent === 'register'){
            modalContent = <Register  changeModalContent={this.changeModalContent} closeModal={this.closeModal} />
        }
        this.setState({
            modalContent
        })
    }

    register = (e)=>{        
        e.preventDefault();
        document.querySelector('body').className = 'body-modal-show';
        this.setState({
            showModal: true,
        })
    }

    closeModal = (e)=>{
        e.preventDefault();
        document.querySelector('body').className = '';
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div className='container-fluid nav'>
                <div className='row nav-row'>
                    <nav className='green'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>HomeCook'd</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'>Host a Meal</Link></li>
                                <li><Link to='/events'>Events</Link></li>
                                <li className='nav-non-link' onClick={this.login}>Log In</li>
                                <li className='nav-non-link' onClick={this.register}>Register</li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="login-modal" style={this.state.showModal ? {"display": "block"} : {}} >
                    <button id="close-modal" onClick={this.closeModal}>&Chi;</button>
                    <div className="modal-content">
                        {this.state.modalContent}
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
