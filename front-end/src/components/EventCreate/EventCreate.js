import React, { Component } from 'react';
import M from 'materialize-css';
import './EventCreate.css';

export class EventCreate extends Component {
    state={
        time: "",
        address: "",
        city: "",
        state: "",
        title: "",
        description: "",
        portions: 0,
        price: 0,
        picture: "",
        dineIn: false,
        pickUp: false
    }   

    changeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

        changeState = (e) => {
        this.setState({
            state: e.target.value
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
           var chip = {
               tag: e.target.value
           }
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
            dineIn: e.target.value
        })
    }

           changePickUp = (e) => {
        this.setState({
            pickUp: e.target.value
        })
    }

    render() {
        return (
<div id="host-form" className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input value={this.state.title} onChange={this.changeTitle} dataLength="100" id="input_text" type="text" className="validate" />
          <label for="input_text">Give your dish or party a name!</label>
        </div>

        <div class="input-field col s6 offset-s3">
          <textarea id="textarea1" value={this.state.description} onChange={this.changeDescription} data-length="300" class="materialize-textarea"></textarea>
          <label for="textarea1">Describe your party, food, or atmosphere.</label>
        </div>
    </div>
    <div className="row">
        <div className="input-field col s2 offset-s3">
          <input id="text" value={this.state.address} onChange={this.changeAddress} type="text" className="validate" />
          <label for="text">Address</label>
        </div>
        <div className="input-field col s2">
          <input id="city" value={this.state.city} onChange={this.changeCity} type="text" className="validate" />
          <label for="text">City</label>
        </div>
        <div className="input-field col s2">
            <select className="browser-default">
                <option value="" disabled selected>Select a State</option>
                <option value="1">Alabama</option>
                <option value="2">Alaska</option>
                <option value="3">Arizona</option>
                <option value="4">Arkansas</option>
                <option value="5">California</option>
                <option value="6">Colorado</option>
                <option value="7">Connecticut</option>
                <option value="8">Delaware</option>
                <option value="9">Florida</option>
                <option value="10">Georgia</option>
                <option value="11">Hawaii</option>
                <option value="12">Idaho</option>
                <option value="13">Illinois</option>
                <option value="14">Indiana</option>
                <option value="15">Iowa</option>
                <option value="16">Kansas</option>
                <option value="17">Kentucky</option>
                <option value="18">Louisiana</option>
                <option value="19">Maine</option>
                <option value="20">Maryland</option>
                <option value="21">Massachusetts</option>
                <option value="22">Michigan</option>
                <option value="23">Minnesota</option>
                <option value="24">Mississippi</option>
                <option value="25">Missouri</option>
                <option value="26">Montana</option>
                <option value="27">Nebraska</option>
                <option value="28">Nevada</option>
                <option value="29">New Hampshire</option>
                <option value="30">New Jersey</option>
                <option value="31">New Mexico</option>
                <option value="32">New York</option>
                <option value="33">North Carolina</option>
                <option value="34">North Dakota</option>
                <option value="35">Ohio</option>
                <option value="36">Oklahoma</option>
                <option value="37">Oregon</option>
                <option value="38">Pennsylvania</option>
                <option value="39">Rhode Island</option>
                <option value="40">South Carolina</option>
                <option value="41">South Dakota</option>
                <option value="42">Tennessee</option>
                <option value="43">Texas</option>
                <option value="44">Utah</option>
                <option value="45">Vermont</option>
                <option value="46">Virginia</option>
                <option value="47">Washington</option>
                <option value="48">West Virginia</option>
                <option value="49">Wisconsin</option>
                <option value="50">Wyoming</option>
            </select>
        </div>        
    </div>
    <div className="row">        
        <div className="input-field col s2 offset-s3">
        <select className="browser-default">
            <option value="" disabled selected>How many servings?</option>
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
            <option value="" disabled selected>Price per plate?</option>
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
            <div className="file-field input-field col s6 offset-s3">
              <input type="text" className="datepicker" placeholder= "When will the food be ready?" />
            </div>
        </div>
    <div className="row">
        <div className="file-field input-field col s6 offset-s3">
            <div className="btn">
                <span>File</span>
                <input type="file" value={this.state.picture} onChange={this.changePicture} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload some food pics!!" />
            </div>
        </div>
    </div>
    </form>
  </div>
        )
    }
}

export default EventCreate
