import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios'
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
        })
    }

    makePayment = () => {
        const pKey = "pk_test_zJ0gtox1Nw0DYJKIoBJgX7KU00Kn0LhNV5";
        const numServings = this.state.servings;
        const amount = numServings * this.state.payment;
        var handler = window.StripeCheckout.configure({
            key: pKey,
            locale: "auto",
            token: token => {
                console.log(token);
                console.log(this.props.auth.token);
                var theData = {
                    amount: Math.floor(amount * 100),
                    stripeToken: token.id,
                    token: this.props.auth.token,
                    email: this.props.auth.email,
                    abodeId: this.props.match.params.abodeId
                };
            axios({
                method: "POST",
                url: `${window.apiHost}/payment/stripe`,
                data: theData
            }).then(response => {
                console.log(response.data);
                if (response.data.msg === "paymentSuccess") {
                    this.props.history.push("/thankyou");
                } else if (response.data.msg === "badToken") {
                    this.props.history.push("/login");
                } else if (response.data.msg === "paymentFailed") {
                    this.setState({
                        msg: `Payment was unsuccessful. Please email this to support: ${response.data.stripeError}`
                    });
                console.log(response.data.stripeError);
                }
            });
        }
    });
    handler.open({
        name: "Pay Now",
        description: "AirBnB Payment",
        amount: amount * 100 //the total is in pennies
    });
  };

  showModal = (e) => {
      e.preventDefault()
      if(this.state.modal === 0){
          this.setState({
              modal: 1
})
      }else{
          this.setState({
              modal: 0
          })
      }

  }

  render() {
      let modalShow = "none"
      if(this.state.modal === 1){
          modalShow = "block"
      }
      console.log(this.props.event.event_price)
    return (
        <div>
            <div>            
                <button onClick={this.showModal} data-target="modal1" className="btn modal-trigger" >Join for ${this.props.event.event_price}</button>
                        <div id="modal1" style={{display: `${modalShow}`}} className="modal">
                            <div className="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                            </div>
                            <div className="modal-footer">
                            <Link to="#!" className="modal-close waves-effect waves-green btn-flat">Agree</Link>
                            </div>
                        </div>
                    <div className="modal-footer">
                </div>
            </div>
        </div>
    );
  }
}



export default EventPayment;
