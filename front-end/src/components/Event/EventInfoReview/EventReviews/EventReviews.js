import React, { Component } from 'react'
import EventReview from './EventReview/EventReview'

export class EventReviews extends Component {
    render() {
        return (
            <div className='event-reviews col m8 s12'>
                <h3>Reviews for this Host</h3>
                <div className='row'>
                    <EventReview />
                    <EventReview />
                    <EventReview />              
                </div>
            </div>
        )
    }
}

export default EventReviews
