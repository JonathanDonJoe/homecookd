import React, { Component } from 'react'
import './EventInfo.css'

export class EventInfo extends Component {
    render() {
        let answer = ''
        if(this.props.event.event.event_dine_in){
            answer = 'YES'
        }else{answer='NO'}
        return (
            <div className='col s12 m4'>
                <h5>Information</h5>
                <h6>Hosted By:</h6>
                <h6>{this.props.event.event.users_name}</h6>
                <img className='host-image' src={this.props.event.event.users_picture}/>
                <h6>{this.props.event.stars} ★</h6>
                <ul>
                    <li>Start Time: {this.props.event.event.event_time}</li>
                    <li>Dine-In? {answer}</li>
                    <li>{this.props.event.event.event_portions} Portions Remaining</li>
                </ul>
                
            </div>
        )
    }
}

export default EventInfo
