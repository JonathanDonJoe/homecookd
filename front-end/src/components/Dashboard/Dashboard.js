import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';

import EventCard from '../EventCard/EventCard';
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        events: []
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

        const hostingEvents = []
        const attendingEvents = []
        console.log(this.props.auth.user_id)
        this.state.events.forEach( (event, i) => {
            console.log(event.host_id)
            if (event.host_id === this.props.auth.user_id) {
                hostingEvents.push(<EventCard key={i} event={event} event_id={event.event_id} />)
            } else {
                attendingEvents.push(<EventCard key={i} event={event} event_id={event.event_id}  />)
            }
        })


        // const hostedEvents = this.state.events.map((event, i) => {
        //     return (
        //         <EventCard key={i} event={event} />
        //     )
        // })
        return (
            <section className="container dash-container green lighten-3">
                <div className='row'>
                    <section className='col s8 offset-s2'>
                        <h1>Dashboard</h1>
                        <p className="flow-text">Welcome {this.props.auth.first} to your dashboard!  Here, you can view all of your saved events.</p>
                        <p className="dash-buttons">
                            {/* <a className="btn " href="/update-profile" role="button">Update Profile</a> */}
                            <a className="btn" href="/host" role="button">Host a new Event</a>
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