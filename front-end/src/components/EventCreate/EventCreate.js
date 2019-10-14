import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { DatePicker, TimePicker } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddressAutocomplete from './AddressAutocomplete'
import { googleApiKey } from '../../config'
import axios from 'axios'

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
        //    var chip = {
        //        tag: e.target.value
        //    }
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
        console.log(geocodeData[0]);
        let address = geocodeData[0].formatted_address
        let lat = geocodeData[0].geometry.location.lat()
        let lng = geocodeData[0].geometry.location.lng()
        console.log(`address is ${address}
        lat is ${lat}
        lng is ${lng}`)
        const timepickerEl = document.querySelector('.timepicker').value
        // console.log(timepickerEl.value)
        this.setState({
            time: timepickerEl
        }, () => {
            const data = new FormData()
            data.append('locationImage', file);
            // data.append('coordinates', coordinates)
            // eslint-disable-next-line no-unused-vars
            for (let key in this.state) {
                data.append(key, this.state[key])
            }
            console.log(address);
            data.append('realAddress', address);
            data.append('lat', lat);
            data.append('lng', lng);
            data.append('user_id', this.props.auth.user_id);
            data.append('token', this.props.auth.loggedIn);
            // console.log(this.props.auth.token);
            // console.log(data);
            this.props.hostMeal(data, this.props.auth.token)
            // console.log('should be pushing');
            this.props.history.push('/dashboard')

        })

        // if (status == google.maps.GeocoderStatus.OK) {
        //   loc[0]=results[0].geometry.location.lat();
        //   loc[1]=results[0].geometry.location.lng();

        //   alert( loc ); // the place where loc contains geocoded coordinates

        // } else {
        //   alert("Geocode was not successful for the following reason: " + status);
        // }



        // let urlAddress = address.replace(/\s/g, '+');
        // console.log(urlAddress);
        // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${googleApiKey}`
        // const axiosResponse = await axios.get(url)
        // console.log(axiosResponse);

    }



    render() {
        // console.log(this.state);
        // console.log(this.state.time);
        // console.log(this.state.date);
        // console.log(this.state.portions);
        console.log(this.props.history);

        return (
            <div id="host-form" className="row">
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s3">
                            <input value={this.state.title} onChange={this.changeTitle} maxLength={100} id="input_text" type="text" className="validate" />
                            <label htmlFor="input_text">Give your dish or party a name!</label>
                        </div>

                        <div className="input-field col s6 offset-s3">
                            <textarea id="textarea1" value={this.state.description} onChange={this.changeDescription} maxLength={300} className="materialize-textarea"></textarea>
                            <label htmlFor="textarea1">Describe your party, food, or atmosphere.</label>
                        </div>
                        <div className="input-field col s6 offset-s3">
                            <AddressAutocomplete changeAddress={this.changeAddress} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s2 offset-s3">
                            <select className="browser-default" value={this.state.portions} onChange={this.changePortions}>
                                <option value="">How many servings?</option>
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
                        <div className="input-field col s2">
                            <select className="browser-default" value={this.state.price} onChange={this.changePrice}>
                                <option value="">Price per plate?</option>
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
                        <p className='col s1'>
                            <label>
                                <input value={this.state.dineIn} onChange={this.changeDineIn} type="checkbox" />
                                <span>Dine In</span>
                            </label>
                        </p>
                        <p className='col s1'>
                            <label>
                                <input value={this.state.pickUp} onChange={this.changePickUp} type="checkbox" />
                                <span>Pick-up</span>
                            </label>
                        </p>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s3 offset-s3">
                            <TimePicker type="text" className="timepicker" placeholder="What time?" />
                        </div>
                        <div className="file-field input-field col s3">
                            <label htmlFor='date' ></label>
                            <DatePicker type='text' id='date' placeholder='Date' className='datepicker' onChange={this.changeDate} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s6 offset-s3">
                            <div className="btn">
                                <span>File</span>
                                <input id='picture-location' type="file" value={this.state.picture} onChange={this.changePicture} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload some food pics!!" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s6 offset-s5">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
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
