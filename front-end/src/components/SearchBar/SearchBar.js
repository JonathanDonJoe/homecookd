import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './SearchBar.css';
import searchBarAction from '../../actions/searchBarAction';


export class SearchBar extends Component {

    state = {
        searching: ''
    }

    changeSearch = (e) => {
        this.setState({
            searching: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.searchBarAction(this.state)
    }

    render() {
        return (
            <nav id="searchbar-style" className='green col s8 offset-s2'>
                <div className="nav-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <div className="input-field">
                        <input id="search" onChange={this.changeSearch} value={this.state.searching} type="search" />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
             
        )
    }
}

function mapStateToProps(state) {
    return ({
        search: state.search
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchBarAction: searchBarAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
