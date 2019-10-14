import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'
import logo from '../../LogoMakr.png';

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import EventCard from '../EventCard/EventCard';
// import SearchBar from '../SearchBar/SearchBar';

class Home extends Component {

    state = {
        imageLink: '',
        text: '',
        events: []
    };

    async componentDidMount() {
        const url = `${window.apiHost}/events/`
        const axiosResponse = await axios.get(url)
        let d = new Date()
        let time = d.getHours()
        let picLink = ''
        let text = ''
        switch (true) {
            case (time < 5 || time >= 22):
                picLink = 'https://marvel-cdn.bc0a.com/Campbellsoup/s3.amazonaws.com/origin.www.cscassets.com/recipes/wide_cknew/wide_61905.jpg'
                text = 'Looking for a late-night snack?'
                break;
            case (time >= 5 && time < 11):
                picLink = 'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg'
                text = 'Breakfast is the most important meal of the day!'
                break;
            case (time >= 11 && time < 16):
                picLink = 'https://prods3.imgix.net/images/articles/2014_08/Web-Article-NONOMBERS-BLT-Bacon-Lettuce-Tomato-Construction-Manual-Sandwich.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=750'
                text = `It's time for lunch!`
                break;
            case (time >= 16 && time < 22):
                picLink = 'https://images-gmi-pmc.edge-generalmills.com/8a61d4b7-8967-47f0-b486-71a0e86ca82a.jpg'
                text = 'Find homecooked dinners in your area!'
                break;
            default:
                picLink = 'https://images.immediate.co.uk/production/volatile/sites/4/2018/08/GettyImages-87987137-932ecf3.jpg?quality=90&resize=940,404'
                text = `Let's get some food!`
                break;
        }
        this.setState({
            imageLink: picLink,
            text: text,
            events: axiosResponse.data
        })
    }

    render() {
        
        const events = this.state.events.map((event, i) => {
            return (
                <EventCard key={i} event={event} event_id={event.id}/>
            )
        })
        return (<>
            <div className="container-fluid  green lighten-2">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold row  valign-wrapper" >
                        <img className="col s4 offset-s4"  src={logo} />
                            {/* <div className='upper-fold-content row'>
                                <div className='upper-fold-text s12'>
                                    <strong>{this.state.text}</strong>
                                </div>
                                <div className='upper-fold-search s12'>
                                    <SearchBar />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="events col s12 ">
                            {events}
                        </div>
                    </div>
                </div>
        </>
        )
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         modal: modalAction
//     }, dispatch)
// }

// export default NavBar;
export default connect(mapStateToProps,
    // mapDispatchToProps
    null
)(Home)