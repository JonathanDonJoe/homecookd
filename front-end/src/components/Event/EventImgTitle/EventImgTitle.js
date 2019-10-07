import React, { Component } from 'react'
import './EventImgTitle.css'

export class EventImgTitle extends Component {
    render() {
        return (
            <div className='row'>
                <div className='event-hero col s12 m4' style={{backgroundImage: `url(../back-end${this.props.event.event_picture})`}}>

                </div>
                <div className='event-text col s12 m8'>
                    <h3>{this.props.event.event_title}</h3>
                    <p> 
                    {this.props.event.event_description}
                    </p>
                    <button className='btn btn-primary'>Join for ${this.props.event.event_price}</button>


                </div>
                
            </div>
        )
    }
}

export default EventImgTitle
