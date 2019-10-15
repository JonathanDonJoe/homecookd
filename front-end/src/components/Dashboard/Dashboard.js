import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

import EventCard from '../EventCard/EventCard';
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        events: []
    }

    populateEvents = async () => {
        const url = `${window.apiHost}/events/getUserEvents`
        const axiosResponse = await axios.post(url, this.props.auth)
        this.setState({
            events: axiosResponse.data
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth !== this.props.auth) {
            this.populateEvents()
        }
    }
    async componentDidMount() {
        this.populateEvents()
    }

    render() {
        const hostingEvents = []
        const attendingEvents = []
        const eventsAttended = []
        this.state.events.forEach((event, i) => {
            if (event.host_id === this.props.auth.user_id) {
                hostingEvents.push(<EventCard key={i} event={event} event_id={event.event_id} />)

            } else if (moment(event.time) > moment()){
                attendingEvents.push(<EventCard key={i} event={event} event_id={event.event_id}  />)
            } else {
                eventsAttended.push(<EventCard key={i} event={event} event_id={event.event_id} />)
            }
        })

        return (                
            <div className='row col s12 green lighten-2'>
            <div className="container dash-container ">
                        <h1 className='dashboard-style col s12'>Dashboard</h1>
                        <p className="flow-text">Welcome {this.props.auth.first} to your dashboard!  Here, you can view all of your saved events.</p>
                        <p className="dash-buttons">
                            <Link id="dashboard-btn-style" className="btn" to="/host" role="button">Host a new Event</Link>
                        </p>
                        <div className="section row">
                            <h2 className='dashboard-style col s8 offset-s2'>Hosted Events</h2>
                            {hostingEvents}
                        </div>

                        <div className="section">
                            <h2 className='dashboard-style col s8 offset-s2'>Attending Events</h2>
                            {attendingEvents}
                        </div>
                        <div className="section row">
                            <h2 className='dashboard-style col s8 offset-s2'>Events Attended</h2>
                            {eventsAttended}
                        </div>
                    </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}


export default connect(mapStateToProps,null)(Dashboard);