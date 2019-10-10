import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {

    state = {
        searching: ''
    }

    changeSearch = (e) => {
        this.setState({
            searching: e.target.value
        })
    }

    render() {
        console.log(this.state.searching)
        return (
            <div className="search-row">
                <form>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input id="search" onChange={this.changeSearch} value={this.state.searching} type="text" placeholder="What are you looking for?" />
                        </div>
                        <div className="input-field second-wrap">
                            <input id="location" type="text" disabled value="Atlanta, GA" placeholder="Atlanta, GA" />
                        </div>
                        <div className="input-field third-wrap">
                            <button className="btn-search" type="button">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;
