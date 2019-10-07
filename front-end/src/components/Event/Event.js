import React, { Component } from 'react'
import './Event.css'
import EventImgTitle from './EventImgTitle/EventImgTitle'
import EventInfoReviews from './EventInfoReview/EventInfoReviews'
import EventMap from '../EventMap/EventMap'
import axios from 'axios'

export class Event extends Component {
    state = {
        event: {}
    }
    async componentDidMount(){
        const eventId = this.props.match.params.eventId;
        const url = `${window.apiHost}/events/${eventId}`
        const axiosResponse = await axios.get(url)
        this.setState({
            event: axiosResponse.data
        })
        console.log(axiosResponse)
    }
    render() {
        return (
            <div className='event-page container-fluid'>
                <EventImgTitle />
                <EventInfoReviews />
                <EventMap />            
            </div>
        )
    }
}

export default Event
