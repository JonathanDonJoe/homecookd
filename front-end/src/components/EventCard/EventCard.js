import React, { Component } from 'react'
import './EventCard.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import UserReview from '../UserReview/UserReview';


export class EventCard extends Component {

    render() {

        // console.log(this.props.event.time)
        // Split timestamp into [ Y, M, D, h, m, s ]

        // var t = this.props.event.time.split(/[- :]/);
        // t[2] = t[2].split('T')[0]
        // t[4] = t[4].split('.')[0]

        // Apply each element to the Date function
        // var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4]));
      
        // let answer = ''
        // if(this.props.event.dine_in === 1){
        //     answer='YES'
        // }else{answer='NO'}
        console.log(this.props.event);
        let answer = this.props.event.dine_in ? 'YES' : 'NO'

        // -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
        //2019-10-08T15:25:26.366Z

        // let date = `${t[5]}${t[6]}/${t[8]}${t[9]}/${t[2]}${t[3]}`

        // This URL path with be used to change where an event card redirects you. 
        // This will help enable a review feature that only attendees can see.
        // {`events/review/${eventId}`}


        // This will throw logic into the Join button... If user attended and the event is over Then add review.
        // const userReview = 
        // if(){
        //     <div>Your review component...import it and call it here!!!!!</div>
        // } else {
        //     <div> SIGN UP FOR MUY EVENT! <- call you register component here </div>
        // }

        return (
            <Link to={`/events/singleEvent/${this.props.event_id}`}>
                <div className='event-card col s6 m4 l4'>
                    <div className='event-card-content'>
                        <div className='food-hero col s12'
                        style={{backgroundImage: `url(${window.apiHost}${this.props.event.picture})`}}>
                        </div>
                        <div className='event-card-title col s12'>
                            <strong>{this.props.event.title}</strong>
                        </div>
                        <div className='tags-container col s12'>
                            <div className='tag-list row'>
                                <div className='tag-list-item-container col s6 m4'>
                                    <div className='tag-list-item'>Burgers</div>
                                </div>
                                <div className='tag-list-item-container col s6 m4'>
                                    <div className='tag-list-item'>Outdoors</div>
                                </div>
                                <div className='tag-list-item-container col s6 m4'>
                                    <div className='tag-list-item'></div>
                                </div>
                            </div>
                        </div>
                        <div className='event-card-info col s12'>
                            <div className='tag-list row'>
                                <div className='tag-list-item-container col s3 m3'>
                                    <div className='tag-list-item'>{this.props.event.time}</div>
                                </div>
                                <div className='tag-list-item-container col s3 m3'>
                                    <div className='tag-list-item'>{this.props.event.portions} Portions Remain</div>
                                </div>
                                <div className='tag-list-item-container col s3 m3'>
                                    <div className='tag-list-item'><NumberFormat value={this.props.event.price} displayType={'text'} fixedDecimalScale={true} decimalScale={'2'} prefix={'$'} /></div>
                                    
                                </div>
                                <div className='tag-list-item-container col s3 m3'>
                                    <div className='tag-list-item'>Dine-In? {answer}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}



export default EventCard;
