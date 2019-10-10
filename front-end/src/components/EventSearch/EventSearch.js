import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';

import './EventSearch.css'
import EventCard from '../EventCard/EventCard';
import SearchBar from '../SearchBar/SearchBar'

class EventSearch extends Component {
    state = {
        events: []
    }

    async componentDidMount() {
        const url = `${window.apiHost}/events/`
        const axiosResponse = await axios.get(url)
        this.setState({
            events: axiosResponse.data
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
            // console.log(event)
            // console.log(this.props.search.searching)
            // console.log(event.title.toLowerCase().includes(this.props.search.searching) || event.description.toLowerCase().includes(this.props.search.searching))
            return event.title.toLowerCase().includes(this.props.search.searching) || event.description.toLowerCase().includes(this.props.search.searching)
        })
        // console.log('filterCards')
        // return events
    }
    sortCards = (events) => {

        // Sort time ascending
        // events.sort( (a,b) => moment(a.time).valueOf() - moment(b.time).valueOf());

        // Sort time descending
        // events.sort( (a,b) => moment(b.time).valueOf() - moment(a.time).valueOf());

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


        // console.log('sortCards')
        return events
    }

    render() {

        // console.log(this.state.events)

        const filteredCards = this.filterCards(this.state.events);
        const sortedCards = this.sortCards(filteredCards);
        const eventCards = this.makeCards(sortedCards);

        return (
            <section className="container dash-container green lighten-3">
                <div className='row'>
                    <section className='col s8 offset-s2'>
                        <h3>Search for an event!</h3>
                        <SearchBar />
                        <h5>Filtering by: "{this.props.search.searching}"</h5>
                        {/* <p className="flow-text">SearchBar</p> */}

                        {/* <p className="dash-buttons">
                            <a className="btn " href="/update-profile" role="button">Update Profile</a>
                            <a className="btn" href="/host" role="button">Search</a>
                        </p> */}

                        <div className="divider"></div>
                        <div className="section">
                            {eventCards}
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        search: state.search
    })
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({

//     })
// }

export default connect(mapStateToProps,
    // mapDispatchToProps
    null
)(EventSearch);