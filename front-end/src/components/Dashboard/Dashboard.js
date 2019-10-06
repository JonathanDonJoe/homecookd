import React, { Component } from 'react';

import EventCard from '../EventCard/EventCard';
import './Dashboard.css'

class Dashboard extends Component {
    state = {

    }
    render() {
        return (
            <section className="container dash-container green lighten-3">
                <div className='row'>
                    <section className='col s8 offset-s2'>
                        <h1>Dashboard</h1>
                        <p className="flow-text">Welcome FIRST_NAME to your dashboard!  Here, you can view all of your saved events.</p>
                        <p className="dash-buttons">
                            {/* <a className="btn " href="/update-profile" role="button">Update Profile</a> */}
                            <a className="btn" href="/events" role="button">Create Event</a>
                        </p>
                        <div className="divider"></div>
                        <div className="section row">
                            <h2>Hosted Events</h2>
                            <EventCard />
                            <EventCard />
                            <EventCard />
                            <EventCard />
                            <EventCard />
                            <EventCard />
                        </div>

                        <div className="divider"></div>
                        <div className="section">
                            <h2>Attending Events</h2>
                            <EventCard />
                            <EventCard />
                            <EventCard />
                            <EventCard />
                            <EventCard />
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}

export default Dashboard;