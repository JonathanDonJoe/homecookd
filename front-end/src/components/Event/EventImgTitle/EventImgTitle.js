import React, { Component } from 'react'
import './EventImgTitle.css'

export class EventImgTitle extends Component {
    render() {
        return (
            <div className='row'>
                <div className='event-hero col s12 m4'>

                </div>
                <div className='event-text col s12 m8'>
                    <h3>Your Event Title Goes Here</h3>
                    <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                    <button className='btn btn-primary'>Join</button>


                </div>
                
            </div>
        )
    }
}

export default EventImgTitle
