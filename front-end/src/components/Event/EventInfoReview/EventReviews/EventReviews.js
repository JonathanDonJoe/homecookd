import React, { Component } from 'react'
import EventReview from './EventReview/EventReview'

export class EventReviews extends Component {
    render() {
        const selectedReviews = []
        this.props.reviews.slice(0,3).forEach( (review, i) => {
            selectedReviews.push(
                <EventReview key={i} review={review}/>
            )
        })
        // const selectedReviews = this.props.reviews.map( (review,i) => {
        //     if(i < 3){
        //         return(
        //                 <EventReview key={i} review={review}/>
        //             )
        //     } 
        // })
        return (
            <div className='event-reviews col m8 s12'>
                <h3>Reviews for This Host</h3>
                {selectedReviews}
            </div>
        )
    }
}

export default EventReviews
