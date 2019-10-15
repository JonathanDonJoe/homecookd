import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'
import logo from '../../LogoMakr.png';

import EventCard from '../EventCard/EventCard';

class Home extends Component {

    state = {
        events: []
    };

    async componentDidMount() {
        const url = `${window.apiHost}/events/`
        const axiosResponse = await axios.get(url)

        this.setState({
            events: axiosResponse.data
        })
    }

    render() {

        const events = this.state.events.map((event, i) => {
            return (
                <EventCard key={i} event={event} event_id={event.id} />
            )
        })
        return (<>
            <div className="container-fluid  green lighten-2">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold row  valign-wrapper" >
                            <img className="col s4 offset-s4" src={logo} alt='homecookd_logo' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="events col s12 ">
                        {events}
                    </div>
                </div>
            </div>
        </>
        )
    }
}



export default Home