import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
    render() {
        return (
                <div className="search-row">
                    <form>
                        <h3>Find some Fresh Grub</h3>
                        <div class="inner-form">
                            <div class="input-field first-wrap">
                                <input id="search" type="text" placeholder="What are you looking for?" />
                            </div>
                            <div class="input-field second-wrap">
                                <input id="location" type="text" placeholder="location" />
                            </div>
                            <div class="input-field third-wrap">
                                <button class="btn-search" type="button">Search</button>
                            </div>
                        </div>
                    </form>
                </div>            
        )
    }
}

export default SearchBar;
