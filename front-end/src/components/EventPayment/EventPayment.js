import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import auth0Client from "../Auth/Auth";
import axios from "axios";
import moment from 'moment';
import EventCard from '../EventCard/EventCard';
import "./EventPayment.css";
import NumberFormat from 'react-number-format';
import UserReview from '../UserReview/UserReview';


class EventPayment extends Component {
  state = {
    events: [],
    servings: 0,
    payment: 0,
    modal: 0,
    dineIn: 1,
    pickUp: 1
  };

  changeServings = (e) => {
    this.setState({
      servings: e.target.value
    });
  };

  makePayment = () => {
    const pKey = "pk_test_zJ0gtox1Nw0DYJKIoBJgX7KU00Kn0LhNV5";
    const numServings = this.state.servings;
    const amount = numServings * this.state.payment;
    var handler = window.StripeCheckout.configure({
      key: pKey,
      locale: "auto",
      token: token => {
        // console.log(token);
        // console.log(this.props.auth.token);
        var theData = {
          amount: Math.floor(amount * 100),
          stripeToken: token.id,
          token: this.props.auth.token,
          email: this.props.auth.email,
          event_id: this.props.event.event_id,
          num_servings: numServings
        };
        axios({
          method: "POST",
          url: `${window.apiHost}/payment/stripe`,
          data: theData
        }).then(response => {
        //   console.log(response.data);
          if (response.data.msg === "paymentSuccess") {
            this.props.history.push("/");
          } else if (response.data.msg === "badToken") {
            this.props.history.push("/login");
          } else if (response.data.msg === "paymentFailed") {
            this.setState({
              msg: `Payment was unsuccessful. Please email this to support: ${response.data.stripeError}`
            });
            // console.log(response.data.stripeError);
          }
        });
      }
    });
    handler.open({
      name: "Pay Now",
      description: "HomeCookd Payment",
      amount: amount * 100 //the total is in pennies
    });
  };

  showModal = (e) => {
    e.preventDefault();
    if (this.state.modal === 0) {
      this.setState({
        modal: 1,
        payment: this.props.event.event_price
      });
    } else {
      this.setState({
        modal: 0,
        payment: this.props.event.event_price
      });
    }      console.log(this.props.event)

  };

  // changeDineIn = (e) => {
  //   e.preventDefault();
  //   if (this.props.){

  //   }
  // }

//   componentDid(){
//       this.setState({
//           payment: this.props.event.event_price
//       }, () => {
//           console.log(this.props.event.event_price)
//           console.log(this.state.payment)
//       })
//   }

  render() {    
    const event = this.props.event;

    this.state.events.forEach( ( event, i ) => {
      if ( event.time < moment() ) {
        return <UserReview key={i} event={event} event_id={event.event_id} />
      }
    })

    // this logic is what makes the modal appear and close.
    let modalShow = "none";
    if (this.state.modal === 1) {
      modalShow = "block";
    }

    // this logic determines whether the modal allows a payment or tells you to log in. 
    let button;
    if (this.props.auth.token) {
      button = (
        <button onClick={this.makePayment} className="btn">
          Reserve {this.state.servings} Servings
        </button>
      );
    } else {
      button = (
        <button
          onClick={async () => {
            // eslint-disable-next-line no-unused-vars
            const result = await auth0Client.signIn();
            // console.log(result);
          }}
          className="btn"
        >
          Please Log In
        </button>
      );
    }

    // this logic auto fills the servings option with only available servings amounts. 
    // console.log(this.state.servings)
    const howManyServings = []
    for(let i=1; i<=this.props.event.event_portions; i++){
        howManyServings.push(<option value={i} key={i} >{i}</option>)
    }
  let dineInOption = '';
  let pickUpOption = '';
  if (this.state.dineIn === 0){
    dineInOption = "disabled"
  }
  if(this.state.pickUp === 0){
    pickUpOption = "disabled"
  }
    // console.log(event);
    // console.log('servings')
    // console.log(this.state.servings)
    // console.log('payment')
    // console.log(this.state.payment)
    // console.log(this.props.event.event_price)

    return (
      <div>
        <div>
          <button
          disabled=""
            onClick={this.showModal}
            data-target="modal1"
            className="btn modal-trigger"
          >
            Join for <NumberFormat value={this.props.event.event_price} displayType={'text'} fixedDecimalScale={true} decimalScale={'2'} prefix={'$'} />
          </button>
          <div
            id="modal1"
            style={{ display: `${modalShow}` }}
            className="modal"
          >
        <button id="close-modal" className="col s1 right  " onClick={this.showModal}>&Chi;</button>
            <div className="modal-content">
              <div className="row fullEvent">
                <div className="col s12"></div>
                <div className="col s12 location-details">
                  <div className="row">
                    <div className="col s12 ">
                    <div className="modal-picture">                      
                        <img className="image" src={`${window.apiHost}${event.event_picture}`} alt='event_image'></img>
                    </div>
                    
                    <div className="title">{event.event_title}</div>                    
                    <div className="divider"></div>

                    <div className="description">{event.event_description}</div>
                    <br />
                    <div className="servings">
                      {event.event_portions} servings remaining
                    </div>
                    </div>
                  </div>
                  <div className="col s12 right-details">
                    <div className="price-per-serving">
                    <NumberFormat value={this.props.event.event_price} displayType={'text'} fixedDecimalScale={true} decimalScale={'2'} prefix={'$'} /> <span>per serving</span>
                    </div>                  
                    <div className="row">
                    <div className="input-field col s12">
                            <p className='col s6 m2'>
                              <label>
                                  <input value={this.state.dineIn} disabled={dineInOption} onChange={this.changeDineIn} type="checkbox" />
                                  <span>Dine In</span>
                              </label>
                          </p>
                          <p className='col s6 m2'>
                              <label>
                                  <input value={this.state.pickUp} disabled={pickUpOption} onChange={this.changePickUp} type="checkbox" />
                                  <span>Pick-up</span>
                              </label>
                          </p>
                      <select
                      className="browser-default col s12 m7"
                        value={this.state.servings}
                        onChange={this.changeServings}
                      >
                        <option value="" >
                          Select your servings
                        </option>
                        {howManyServings}
                      </select>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer col s12">
              <Link
                to="#!"
                className="modal-close waves-effect waves-orange btn-flat"
              >
            {button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(EventPayment);
