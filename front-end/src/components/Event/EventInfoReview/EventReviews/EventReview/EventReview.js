import React, { Component } from 'react'

export class EventReview extends Component {
    render() {
        return (
            <div className='col s12 m4'>
                <h5>{this.props.review[0]}</h5>
                <p>
                {this.props.review[1]}
                </p>
                <h6>Stars: {this.props.review[2]}/5</h6>  
            </div>
        )
    }
}
export default EventReview
