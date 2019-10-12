import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';

import EventCard from '../EventCard/EventCard';
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        events: []
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth !== this.props.auth) {
            console.log(this.props.auth)
            const url = `${window.apiHost}/events/getUserEvents`
            const axiosResponse = await axios.post(url, this.props.auth)
            this.setState({
                events: axiosResponse.data
            })
        }
    }
    async componentDidMount() {
        console.log(this.props.auth)
        const url = `${window.apiHost}/events/getUserEvents`
        const axiosResponse = await axios.post(url, this.props.auth)
        this.setState({
            events: axiosResponse.data
        })

    }

    render() {
        console.log(this.state.events)
        const eventId = this.props.match.params.eventId;
        const hostingEvents = []
        const attendingEvents = []
        const eventsAttended = []
        console.log(this.props.auth.user_id)
        this.state.events.forEach((event, i) => {
            console.log(event.host_id)
            console.log(event.time)
            if (event.host_id === this.props.auth.user_id) {
                hostingEvents.push(<EventCard key={i} event={event} event_id={event.event_id} />)
            } else if (event.time > moment()) {
                attendingEvents.push(<EventCard key={i} event={event} event_id={event.event_id} />)
            } else {
                eventsAttended.push(<EventCard key={i} event={event} event_id={event.event_id} />)
            }
        })


        // const hostedEvents = this.state.events.map((event, i) => {
        //     return (
        //         <EventCard key={i} event={event} />
        //     )
        // })
        // This anchor tag is set aside to remove errors thrown. It belongs right after dash-button below. 
        // When added change to a Link tag for React.
        // {/* <a className="btn " href="/update-profile" role="button">Update Profile</a> */}

        return (
            <section className="container dash-container green lighten-3">
                <div className='row'>
                    <section className='col s8 offset-s2'>
                        <h1>Dashboard</h1>
                        <p className="flow-text">Welcome {this.props.auth.first} to your dashboard!  Here, you can view all of your saved events.</p>
                        <p className="dash-buttons">
                            <Link className="btn" to="/host" role="button">Host a new Event</Link>
                        </p>
                        <div className="divider"></div>
                        <div className="section row">
                            <h2>Hosted Events</h2>
                            {hostingEvents}
                        </div>

                        <div className="divider"></div>
                        <div className="section">
                            <h2>Attending Events</h2>
                            {attendingEvents}
                        </div>
                        <div className="divider"></div>
                        <div className="section row">
                            <h2>Events Attended</h2>
                            {eventsAttended}
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
)(Dashboard);