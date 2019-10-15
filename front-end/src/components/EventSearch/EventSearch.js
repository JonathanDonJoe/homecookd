import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import './EventSearch.css'
import EventCard from '../EventCard/EventCard';
import SearchBar from '../SearchBar/SearchBar'

class EventSearch extends Component {
    state = {
        events: [],
        sortMethod: '',
    }

    async componentDidMount() {
        const url = `${window.apiHost}/events/`
        const axiosResponse = await axios.get(url)
        this.setState({
            events: axiosResponse.data
        })
    }

    changeSortMethod = (e) => {
        this.setState({
            sortMethod: e.target.value
        })
    }

    makeCards = (events) => {
        const cards = events.map((event, i) => {
            // console.log(event)
            return (
                <EventCard key={i} event={event} event_id={event.id} />
            )
        })
        return cards
    }

    filterCards = (events) => {

        return events.filter((event) => {
            return event.title.toLowerCase().includes(this.props.search.searching.toLowerCase()) || event.description.toLowerCase().includes(this.props.search.searching.toLowerCase())
        })
    }
    sortCards = (events) => {
        if (this.state.sortMethod === 'soonest' || this.state.sortMethod === '') {
            // Sort time ascending
            events.sort( (a,b) => moment(a.time).valueOf() - moment(b.time).valueOf());
        } else if (this.state.sortMethod === 'latest') {
            // Sort time descending
            events.sort( (a,b) => moment(b.time).valueOf() - moment(a.time).valueOf());
        } else if (this.state.sortMethod === 'newest') {
            // Sort newest created
            events.reverse();
        // } else if (this.state.sortMethod === 'oldest') {
        //     // Sort oldest created
        } else if (this.state.sortMethod === 'cheapest') {
            // Sort price ascending
            events.sort( (a,b) => a.price - b.price);
        } else if (this.state.sortMethod === 'priciest') {
            // Sort price descending
            events.sort( (a,b) => b.price - a.price);
        }

        // Sort name ascending
        // events.sort( (a,b) => {
        //     if(a.title < b.title) { return -1; }
        //     if(a.title > b.title) { return 1; }
        //     return 0;}
        // );

        // Sort name descending
        // events.sort( (a,b) => {
        //     if(a.title < b.title) { return 1; }
        //     if(a.title > b.title) { return -1; }
        //     return 0;}
        // );

        return events
    }

    render() {
        const filteredCards = this.filterCards(this.state.events);
        const sortedCards = this.sortCards(filteredCards);
        const eventCards = this.makeCards(sortedCards);

        return (
                <div className='row green lighten-2 search-page'>
                    <div className='col'>
                    <section>
                        <h3 className="move-content-down col s10 offset-s1">Search for an event!</h3> 
                        <SearchBar />
                        <div className="input-field col s4 offset-s4" >
                            <select className='browser-default grey lighten-3' value={this.state.sortMethod} onChange={this.changeSortMethod}>
                                    <option value="soonest">Date: Ending Soon</option>
                                    <option value="latest">Date: Farthest Away</option>
                                    <option value="newest">Newly Added</option>
                                    <option value="oldest">Oldest Added</option>
                                    <option value="cheapest">Price: Low to High</option>
                                    <option value="priciest">Price: High to Low</option>
                            </select>
                            <label className='active' id='event-search-label'></label>                        
                            <h5>Filtering by: "{this.props.search.searching}"</h5>
                        </div>
                        <div className="section col s12 m12">  
                            {eventCards}
                        </div>
                        </section>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        search: state.search
    })
}

export default connect(mapStateToProps, null)(EventSearch);