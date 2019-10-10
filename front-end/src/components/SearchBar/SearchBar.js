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
        console.log('hi')
        console.log(this.state)
        this.props.searchBarAction(this.state)
    }

    render() {
        console.log(this.state.searching)
        return (
            <div className="search-row">
                <form onSubmit={this.onSubmit}>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input id="search" onChange={this.changeSearch} value={this.state.searching} type="text" placeholder="What are you looking for?" />
                        </div>
                        <div className="input-field second-wrap">
                            <input id="location" type="text" disabled value="Atlanta, GA" placeholder="Atlanta, GA" />
                        </div>
                        <div className="input-field third-wrap">
                            <button >Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return({
        search: state.search
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchBarAction: searchBarAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
