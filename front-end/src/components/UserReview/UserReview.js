import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import EventCard from '../EventCard/EventCard';




export class UserReview extends Component {

    // state = {
    //     event: [],

    // }

    // async componentDidMount() {
    //     console.log(this.props.auth)
    //     const url = `${window.apiHost}/events/${eventId}`
    //     const axiosResponse = await axios.post(url, this.props.auth)
    //     this.setState({
    //         events: axiosResponse.data
    //     })
    // }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}
export default connect(mapStateToProps)(UserReview);
