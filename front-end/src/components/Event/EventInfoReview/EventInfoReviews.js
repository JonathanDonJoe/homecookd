import React, { Component } from 'react'
import EventReviews from './EventReviews/EventReviews'
import EventInfo from './EventInfo/EventInfo'

export class EventInfoReviews extends Component {
    render() {
        return (
            <div className='event-info-reviews row'>
                <EventInfo />
                <EventReviews />         
            </div>
        )
    }
}

export default EventInfoReviews
