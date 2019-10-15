import React, { Component } from 'react'
import './EventCard.css'
import { Link } from 'react-router-dom';
import moment from 'moment';
import NumberFormat from 'react-number-format';


export class EventCard extends Component {

    render() {

        let answer = this.props.event.dine_in ? 'YES' : 'NO'


        // console.log(moment(this.props.event.time).format("dddd, MMMM Do YYYY, h:mm:ss a"))
        let imageLink = encodeURI(`${window.apiHost}${this.props.event.picture}`)
        return (
            <Link to={`/events/singleEvent/${this.props.event_id}`}>
                <div id="event-card-style" className='event-card card col s12 m5 l3 blue-grey lighten-5'>
                    <div className='event-card-content card-image'><br></br>
                        <img className='food-hero'
                        src={imageLink} alt='event_picture'>
                        </img>
                    </div><hr></hr>
                    <span className='card-title'>
                            {this.props.event.title}
                        </span><hr></hr>
                        <div className='event-card-info col s12'>
                            <div className='tag-list row'>
                                <div className='tag-list-item-container col s12'>
                                    <div className='tag-list-item'>{moment(this.props.event.time).format("MM-DD-YY | h:mm a")}</div>
                                </div>
                                </div>
                                <div className="row">
                                <div className='tag-list-item-container col s12'>
                                    <div className='tag-list-item'>{this.props.event.portions} Portions Remain</div>
                                </div>
                                </div>
                                <div className="row">
                                <div className='tag-list-item-container col s12'>
                                    <div className='tag-list-item'><NumberFormat value={this.props.event.price} displayType={'text'} fixedDecimalScale={true} decimalScale={'2'} prefix={'$'} /></div>
                                    
                                </div>
                                </div>
                                <div className="row">
                                <div className='tag-list-item-container  col s12'>
                                    <div className='tag-list-item'>Dine-In? {answer}</div>
                                </div>
                                </div>
                            
                        </div>
                </div>

            </Link>
        )
    }
}



export default EventCard;
