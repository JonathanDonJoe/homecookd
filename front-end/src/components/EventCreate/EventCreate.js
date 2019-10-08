import React, { Component } from 'react';
import { DatePicker, TimePicker } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../../../../Library/Caches/typescript/3.6/node_modules/redux';

import './EventCreate.css';
import hostMealAction from '../../actions/hostMealAction';


export class EventCreate extends Component {
    state={
        time: {
            hour: null,
            minute: null
        },
        date: null,
        address: "",
        zipcode: "",
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

    changeTime = (number1, number2) => {
        console.log(number1);
        console.log(number2)
        this.setState({
            time: {
                hour: number1,
                minute: number2
            }
        })
    }

    changeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    changeZipcode = (code) => {
        console.log(code);
        this.setState({
            zipcode: code.target.value
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

    onSubmit = (e) => {
        e.preventDefault();
        console.log('hi')
        const file = document.getElementById('picture-location').files[0];
        console.log(file)

        const data = new FormData()
        data.append('locationImage', file);
        // eslint-disable-next-line no-unused-vars
        for (let key in this.state) {
            data.append(key, this.state[key])
        }
        data.append('user_id', this.props.auth.user_id);
        data.append('token', this.props.auth.token);
        console.log(this.props.auth.token);
        console.log(data);
        this.props.hostMeal(data, this.props.auth.token)

    }

    render() {
        console.log(this.state);
        // console.log(this.props.auth);
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
    </div>
    <div className="row">
        <div className="input-field col s2 offset-s3">
          <input id="text" value={this.state.address} onChange={this.changeAddress} type="text" className="validate" />
          <label htmlFor="text">Address</label>
        </div>
        <div className="input-field col s2">
            <input id="zipcode" placeholder="Zipcode" value={this.state.zipcode} onChange={this.changeZipcode} type="number" maxLength={5} className="validate" />
        </div>        
    </div>
    <div className="row">        
        <div className="input-field col s2 offset-s3">
        <select className="browser-default">
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
        <select className="browser-default">
            <option value="">Price per plate?</option>
            <option value="1">1</option>
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
                <TimePicker type="text" className="timepicker" placeholder="What time?" onChange={this.changeTime}/>
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
