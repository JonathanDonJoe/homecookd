import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventPayment from '../../EventPayment/EventPayment';
import './EventImgTitle.css'

export class EventImgTitle extends Component {
    render() {
        console.log(this.props.event.event_picture);
        return (
            <div className='row'>
                <div className='event-hero col s12 m4' 
                style={{backgroundImage: `url(${window.apiHost}${this.props.event.event_picture})`}}
                >

                </div>
                <div className='event-text col s12 m8'>
                    <h3>{this.props.event.event_title}</h3>
                    <p> 
                    {this.props.event.event_description}
                    </p>
                    <EventPayment event={this.props.event} history={this.props.history}/>

                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default EventImgTitle
