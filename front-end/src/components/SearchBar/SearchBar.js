import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
    render() {
        return (
                <div className="search-row">
                    <form>
                        <div className="inner-form">
                            <div className="input-field first-wrap">
                                <input id="search" type="text" placeholder="What are you looking for?" />
                            </div>
                            <div className="input-field second-wrap">
                                <input id="location" type="text" placeholder="location" />
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
