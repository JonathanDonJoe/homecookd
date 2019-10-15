import React, { Component } from 'react';
import { DatePicker, TimePicker } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddressAutocomplete from './AddressAutocomplete'
import './EventCreate.css';
import hostMealAction from '../../actions/hostMealAction';


export class EventCreate extends Component {
    state = {
        time: "",
        date: null,
        address: "",
        title: "",
        description: "",
        portions: 0,
        price: 0,
        picture: "",
        dineIn: false,
        pickUp: false
    }

    changeDate = (date) => {
        this.setState({
            date
        })
    }

    // changeTime = (number1, number2) => {
    //     // console.log(number1);
    //     // console.log(number2)
    //     // this.setState({
    //     //     time: {
    //     //         hour: number1,
    //     //         minute: number2
    //     //     }
    //     // })

    //     const timepickerEl = document.querySelector('.timepicker')
    //     console.log(timepickerEl.value)
    //     this.setState({
    //         time: timepickerEl.value
    //     })

    // }

    changeAddress = (address) => {
        this.setState({
            address: address
        })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    changeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    changePortions = (e) => {
        this.setState({
            portions: e.target.value
        })
    }

    changePrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    changeTags = (e) => {
        this.setState({
            tags: e.target.value
        })
    }

    changePicture = (e) => {
        this.setState({
            picture: e.target.value
        })
    }

    changeDineIn = (e) => {
        this.setState({
            dineIn: e.target.checked
        })
    }

    changePickUp = (e) => {
        this.setState({
            pickUp: e.target.checked
        })
    }
    getGeocode = () => {
        const geocoder = new window.google.maps.Geocoder();
        let address = document.getElementById('autocomplete').value
        return new Promise((resolve, reject) => {
            geocoder.geocode(
                {
                    address: address
                },
                (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        let response = results
                        resolve(response);
                    } else {
                        reject(new Error(status));
                    }
                }
            );
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const file = document.getElementById('picture-location').files[0];
        let geocodeData = await this.getGeocode()
        let address = geocodeData[0].formatted_address
        let lat = geocodeData[0].geometry.location.lat()
        let lng = geocodeData[0].geometry.location.lng()
        const timepickerEl = document.querySelector('.timepicker').value
        this.setState({
            time: timepickerEl
        }, () => {
            const data = new FormData()
            data.append('locationImage', file);
            // eslint-disable-next-line no-unused-vars
            for (let key in this.state) {
                data.append(key, this.state[key])
            }
            data.append('realAddress', address);
            data.append('lat', lat);
            data.append('lng', lng);
            data.append('user_id', this.props.auth.user_id);
            data.append('token', this.props.auth.loggedIn);
            this.props.hostMeal(data, this.props.auth.token)
            this.props.history.push('/dashboard')

        })
    }



    render() {
        return (
            <div id="host-body-style" className="row green lighten-2">
                <form id="host-form" onSubmit={this.onSubmit} className="col blue-grey lighten-3 s10 offset-s1">
                    <div className="row">
                        <div  className="input-field col s8 offset-s2">
                            <input  id="host-form-style" value={this.state.title} onChange={this.changeTitle} maxLength={100} type="text" className="validate white" required placeholder="Name of dish/party" />
                            <label htmlFor="input_text"></label>
                        </div>

                        <div className="input-field col s8 offset-s2">
                            <textarea id="host-form-style" value={this.state.description} onChange={this.changeDescription} maxLength={300} required className="materialize-textarea white" placeholder="Event Description"></textarea>
                            <label htmlFor="textarea1"></label>
                        </div>
                        <div id="host-form-style" className="input-field col s8 offset-s2 white">
                            <AddressAutocomplete changeAddress={this.changeAddress} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4 offset-s2">
                            <select id="host-form-style" className="browser-default" required value={this.state.portions} onChange={this.changePortions}>
                                <option value="">Servings</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>

                            </select>
                        </div>
                        <div className="input-field col s4">
                            <select id="host-form-style" required className="browser-default" value={this.state.price} onChange={this.changePrice}>
                                <option value="">Price</option>
                                <option value="1">$1.00</option>
                                <option value="1.50">$1.50</option>
                                <option value="2">$2.00</option>
                                <option value="2.50">$2.50</option>
                                <option value="3">$3.00</option>
                                <option value="3.50">$3.50</option>
                                <option value="4">$4.00</option>
                                <option value="4.50">$4.50</option>
                                <option value="5">$5.00</option>
                                <option value="5.50">$5.50</option>
                                <option value="6">$6.00</option>
                                <option value="6.50">$6.50</option>
                                <option value="7">$7.00</option>
                                <option value="7.50">$7.50</option>
                                <option value="8">$8.00</option>
                                <option value="8.50">$8.50</option>
                                <option value="9">$9.00</option>
                                <option value="9.50">$9.50</option>
                                <option value="10">$10.00</option>
                                <option value="10.50">$10.50</option>
                                <option value="11">$11.00</option>
                                <option value="11.50">$11.50</option>
                                <option value="12">$12.00</option>
                                <option value="12.50">$12.50</option>
                                <option value="13">$13.00</option>
                                <option value="13.50">$13.50</option>
                                <option value="14">$14.00</option>
                                <option value="14.50">$14.50</option>
                                <option value="15">$15.00</option>

                            </select>
                        </div>
                        <div className="row">
                        <div className="col s12">
                        <p className='col s4 offset-s2'>
                            <label>
                                <input value={this.state.dineIn} onChange={this.changeDineIn} type="checkbox" />
                                <span>Dine In</span>
                            </label>
                        </p>
                        <p className='col s4'>
                            <label>
                                <input value={this.state.pickUp} onChange={this.changePickUp} type="checkbox" />
                                <span>Pick-up</span>
                            </label>
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s4 offset-s2">
                            <TimePicker  type="text" className="timepicker white" required placeholder="Time" id="time"/>
                        </div>
                        <div className="file-field input-field col s4 offset-s1">
                            <label htmlFor='date' ></label>
                            <DatePicker id="date" type='text' placeholder='Date' required className='datepicker white' onChange={this.changeDate} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s8 offset-s2">
                            <div id="host-form-style" className="btn">
                                <span>File</span>
                                <input id='picture-location' required type="file" value={this.state.picture} onChange={this.changePicture} />
                            </div>
                            <div className="file-path-wrapper">
                                <input id="host-form-style" className="file-path validate white" type="text" placeholder="Upload a food pic" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s6 offset-s5">
                            <button id="host-form-style" className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hostMeal: hostMealAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
