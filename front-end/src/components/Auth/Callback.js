import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import auth0Client from './Auth';
import loginAction from '../../actions/loginAction'

class Callback extends Component {
    async componentDidMount() {
        const resolvedPromise = await auth0Client.handleAuthentication();
        this.props.login(resolvedPromise)
        setTimeout(() => {
            this.props.history.replace('/');
        }, 500)
    }

    render() {
        return (
            <p>Loading profile...</p>
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
        login: loginAction
    }, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Callback));