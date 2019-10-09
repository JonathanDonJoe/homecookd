import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import auth0Client from "../Auth/Auth";
import axios from "axios";
import "./EventPayment.css";

class EventPayment extends Component {
  state = {
    servings: 0,
    payment: 0,
    modal: 0
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
          event_id: this.props.event.event_id
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
    }
  };

//   componentDid(){
//       console.log(this.props.event)
//       this.setState({
//           payment: this.props.event.event_price
//       }, () => {
//           console.log(this.props.event.event_price)
//           console.log(this.state.payment)
//       })
//   }

  render() {
    let modalShow = "none";
    if (this.state.modal === 1) {
      modalShow = "block";
    }
    const event = this.props.event;
    let button;
    if (this.props.auth.token) {
      button = (
        <button onClick={this.makePayment} className="btn">
          Reserve 1 night
        </button>
      );
    } else {
      button = (
        <button
          onClick={async () => {
            const result = await auth0Client.signIn();
            // console.log(result);
          }}
          className="btn"
        >
          Please Log In
        </button>
      );
    }
    // console.log(this.state.servings)
    const howManyServings = []
    for(let i=1; i<=this.props.event.event_portions; i++){
        howManyServings.push(<option value={i}>{i}</option>)
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
            onClick={this.showModal}
            data-target="modal1"
            className="btn modal-trigger"
          >
            Join for ${this.props.event.event_price}
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
                        <img className="image" src={`${window.apiHost}${event.event_picture}`}></img>
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
                      $ {event.event_price} <span>per serving</span>
                    </div>
                    <div className="input-field col s12">
                      <select
                      className="browser-default"
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
