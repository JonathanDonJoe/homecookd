import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import auth0Client from '../Auth/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './NavBar.css';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import modalAction from '../../actions/modalAction';

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth.modal !== this.props.auth.modal) {
            if (this.props.auth.modal === 'close') {
                this.setState({
                    showModal: false
                })
            } else if (this.props.auth.modal === 'open') {
                this.setState({
                    showModal: true
                })
            } 
        }
    }

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

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

    login = (e) => {
        e.preventDefault();
        document.querySelector('body').classList = 'body-modal-show';
        this.setState({
            showModal: true
        })
        this.changeModalContent('login');
    }

    closeModal = (e)=>{
        e.preventDefault();
        document.querySelector('body').className = '';
        this.setState({
            showModal: false
        })
    }

    render() {
        console.log(this.state.showModal);
        return (
            <div className='container-fluid nav'>
                <div className='row nav-row'>
                    <nav className='green'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>HomeCook'd</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host'>Host a Meal</Link></li>
                                <li><Link to='/events'>Events</Link></li>
                                {
                                    !auth0Client.isAuthenticated() &&
                                    <li className='nav-non-link' onClick={auth0Client.signIn}>Log In</li>
                                }
                                {
                                    !auth0Client.isAuthenticated() &&
                                <li className='nav-non-link' onClick={auth0Client.signIn}>Register</li>
                                }
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

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        modal: modalAction
    }, dispatch)
}

// export default NavBar;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));