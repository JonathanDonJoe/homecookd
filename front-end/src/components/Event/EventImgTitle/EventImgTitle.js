import React, { Component } from 'react';
// import { connect } from 'react-redux';
import EventPayment from '../../EventPayment/EventPayment';
import './EventImgTitle.css'

export class EventImgTitle extends Component {
    state ={
        imgLink: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.event.event_picture !== this.props.event.event_picture) {
            this.setState({
                imgLink: encodeURI(`${window.apiHost}${this.props.event.event_picture}`)
            })
        }
    }

    render() {
        return (
            <div id="event-title-style" className='row'>
                <div className='event-hero col s12 m4' 
                style={{backgroundImage: `url(${this.state.imgLink})`}}
                >

                </div>
                <div id="event-title-style" className='event-text blue-grey lighten-3 col s12 m8'>
                    <h3>{this.props.event.event_title}</h3>
                    <div className="divider"></div>
                    <p> 
                    {this.props.event.event_description}
                    </p>
                    <EventPayment className='event-payment' event={this.props.event} history={this.props.history}/>

                </div>
                
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return ({
//         auth: state.auth
//     })
// }

export default EventImgTitle
