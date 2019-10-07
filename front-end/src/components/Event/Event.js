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
    // async componentDidMount(){
    //     const eventId = this.props.match.params.eventId;
    //     // console.log(abodeId);
    //     const url = `${window.apiHost}/abode/${eventId}`
    //     const axiosResponse = await axios.get(url)
    //     // console.log(axiosResponse.data);
    //     this.setState({
    //         event: axiosResponse.data
    //     })
    // }
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
