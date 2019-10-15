import React, { Component } from 'react'
import EventReview from './EventReview/EventReview'
import './EventReviews.css'

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
            <div className='event-reviews blue-grey lighten-3 col  s12 m9'>
                <h3 >Reviews for This Host</h3>
                <div id="review-title-style" className="col s12">{selectedReviews}</div>
            </div>
        )
    }
}

export default EventReviews
