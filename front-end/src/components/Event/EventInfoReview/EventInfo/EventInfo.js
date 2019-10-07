import React, { Component } from 'react'
import './EventInfo.css'

export class EventInfo extends Component {
    render() {
        return (
            <div className='col s12 m4'>
                <h5>Information</h5>
                <h6>Hosted By:</h6>
                <h6>Anthony</h6>
                <img className='host-image' src='http://genfkd.wpengine.netdna-cdn.com/wp-content/uploads/2018/05/shutterstock_793117360-503x518.jpg'/>
                <h6>4.7 ★</h6>
                <ul>
                    <li>Start Time: 8:00 PM</li>
                    <li>Dine-in Not Available X</li>
                    <li>4 Portions Remaining</li>
                </ul>
                
            </div>
        )
    }
}

export default EventInfo
