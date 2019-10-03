import React, { Component } from 'react'
import './EventCard.css'

export class EventCard extends Component {
    render() {
        return (
            <a className='event-card-link' href='#takeMeToThisEvent'>
                <div className='event-card col s6 m4 l3'>
                    <div className='event-card-content'>
                        <div className='food-hero col s12'>
                        </div>
                        <div className='event-card-title col s12'>
                            <strong>Burgers at the Bungalow</strong>
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
                        <div className='event-card-info'>
                            <div className='info-list s10 offset-1 row'>
                                <div className='info-list-item-container col s6 m4 l3'>
                                    <div className='info-list-item'>Time</div>
                                </div>
                                <div className='info-list-item-container col s6 m4 l3'>
                                    <div className='info-list-item'>Price</div>
                                </div>
                                <div className='info-list-item-container col s6 m4 l3'>
                                    <div className='info-list-item'>Spots</div>
                                </div>
                                <div className='info-list-item-container col s6 m4 l3'>
                                    <div className='info-list-item'>Price</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}

export default EventCard
