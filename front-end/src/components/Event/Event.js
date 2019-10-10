import React, { Component } from 'react'
import './Event.css'
import EventImgTitle from './EventImgTitle/EventImgTitle'
import EventInfoReviews from './EventInfoReview/EventInfoReviews'
import GoogleMap from '../GoogleMap/GoogleMap'
import axios from 'axios'

export class Event extends Component {
    state = {
        event: [],
        stars: 0,
        reviews: []
    }
    async componentDidMount(){
        const eventId = this.props.match.params.eventId;
        const url = `${window.apiHost}/events/${eventId}`
        const axiosResponse = await axios.get(url)
        // console.log(axiosResponse)
        let starCount = 0
        let reviews = []
        axiosResponse.data.forEach((arr,i)=>{
            starCount += arr.review_stars
            reviews.push([arr.review_title, arr.review_content, arr.review_stars])
        })
        starCount = starCount/axiosResponse.data.length
        var rounded = (Math.round( starCount * 10 ) / 10).toFixed(1)
        this.setState({
            event: axiosResponse.data[0],
            stars: rounded,
            reviews: reviews
        })
    }
    render() {
        return (
            <div className='event-page container-fluid'>
                <EventImgTitle event={this.state.event} history={this.props.history} />
                <EventInfoReviews event={this.state}/>
                {/* <GoogleMap />             */}            
            </div>
        )
    }
}

export default Event
