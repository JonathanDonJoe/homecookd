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
        // console.log('hi')
        // console.log(this.state)
        this.props.searchBarAction(this.state)
    }

    render() {
        // console.log(this.state.searching)
        return (
            // <div className="search-row">
            //     <form onSubmit={this.onSubmit}>
            //         <div className="inner-form">
            //             <div className="input-field first-wrap">
            //                 <input id="search" onChange={this.changeSearch} value={this.state.searching} type="text" placeholder="What are you looking for?" />
            //             </div>
            //             <div className="input-field second-wrap">
            //                 <input id="location" type="text" disabled value="Atlanta, GA" placeholder="Atlanta, GA" />
            //             </div>
            //             <div className="input-field third-wrap">
            //                 <button className="btn waves-effect waves-light" type="submit" name="action">Submit
            //                     <i className="material-icons right">send</i>
            //                 </button>
            //             </div>
            //         </div>
            //     </form>
            // </div>

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
