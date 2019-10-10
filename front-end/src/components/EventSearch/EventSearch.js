import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';

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

    render() {
        console.log(this.state.events)




        const events = this.state.events.map((event, i) => {
            console.log(event)
            return (
                <EventCard key={i} event={event} event_id={event.id} />
            )
        })
        return (
            <section className="container dash-container green lighten-3">
                <div className='row'>
                    <section className='col s8 offset-s2'>
                        <h1>EventSearch</h1>
                        {/* <p className="flow-text">SearchBar</p> */}
                        <SearchBar />
                        <p className="dash-buttons">
                            {/* <a className="btn " href="/update-profile" role="button">Update Profile</a> */}
                            <a className="btn" href="/host" role="button">Search</a>
                        </p>

                        <div className="divider"></div>
                        <div className="section">
                            <h2>Attending Events</h2>
                            {events}
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
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