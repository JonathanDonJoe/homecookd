import React, { Component } from 'react'
import './EventInfo.css'
import moment from 'moment'

export class EventInfo extends Component {
    render() {
        // let answer = ''
        // if(this.props.event.event.event_dine_in){
        //     answer = 'YES'
        // }else{answer='NO'}
        let answer = this.props.event.event.event_dine_in? 'YES' : 'NO'
        return (
            <div className='event-info col s12 m4'>
                <h5>Information</h5>
                <h6>Hosted By:</h6>
                <h6>{this.props.event.event.users_name}</h6>
                <img className='host-image' src={this.props.event.event.users_picture} alt='user_avatar' />
                <h6>{this.props.event.stars} ★ ({this.props.event.reviews.length})</h6>
                <ul>
                    <li>Start Time: {moment(this.props.event.event.event_time).format("MM-DD-YY h:mm a")}</li>
                    <li>Dine-In? {answer}</li>
                    <li>{this.props.event.event.event_portions} Portions Remaining</li>
                </ul>
                
            </div>
        )
    }
}

export default EventInfo
