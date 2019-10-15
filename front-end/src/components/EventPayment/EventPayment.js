import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import auth0Client from "../Auth/Auth";
import axios from "axios";
import moment from 'moment';
import BeautyStars from 'beauty-stars';
import EventCard from '../EventCard/EventCard';
import "./EventPayment.css";
import NumberFormat from 'react-number-format';
import paymentAndReviewAction from "../../actions/paymentAndReviewAction";


class EventPayment extends Component {
	state = {
		// events: [],
		servings: 0,
		payment: 0,
		joinModal: 0,
		reviewModal: 0,
		stars: 0,
		reviewText: "",
		dineIn: 1,
		pickUp: 1, 
		reviewTitle: ''
	};

	componentDidMount() {
		this.setState({
			dineIn: this.props.event.event_dine_in,
			pickUp: this.props.event.event_pick_up
		})
	}


	changeServings = (e) => {
		this.setState({
			servings: e.target.value
		});
	};

	changeReviewText = (e) => {
		e.preventDefault();
		this.setState({
			reviewText: e.target.value
		})
	}
	changeReviewTitle = (e) => {
		e.preventDefault();
		this.setState({
			reviewTitle: e.target.value
		})
	}

	changeStars = (rating) => {
		this.setState({
			stars: rating
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
					if (response.data.msg === "paymentSuccess") {
						this.props.history.push("/");
					} else if (response.data.msg === "badToken") {
						this.props.history.push("/login");
					} else if (response.data.msg === "paymentFailed") {
						this.setState({
							msg: `Payment was unsuccessful. Please email this to support: ${response.data.stripeError}`
						});
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

	onSubmit = (e) => {
		e.preventDefault();
		this.props.paymentAndReview(
			{	user_id: this.props.auth.user_id,
				host_id: this.props.event.host_id,
				event_id: this.props.event.event_id,
				stars: this.state.stars,
				reviewText: this.state.reviewText,
				reviewTitle: this.state.reviewTitle,
				token: this.props.auth.token
			}
		);
		this.setState({
			reviewModal: 0
		})
	}

	// getAttendance = async (e) => {
	// 	e.preventDefault();
	// 	const url = `${window.apiHost}/events/getAttendance`
	// 	const axiosResponse = await axios.post(url, this.props.auth)
	// 	this.setState({
	// 		events: axiosResponse.data
	// 	})

	// }

	showModal = () => {
		if (this.state.joinModal === 0 && moment(this.props.event.event_time) > moment()) {
			this.setState({
				joinModal: 1,
				reviewModal: 0,
				payment: this.props.event.event_price
			})
		} else if (this.state.joinModal === 0 && moment(this.props.event.event_time) < moment()) {
			this.setState({
				joinModal: 0,
				reviewModal: 1,
			})
		} else {
			this.setState({
				joinModal: 0,
				reviewModal: 0
			})
		}
	};


	render() {
		const event = this.props.event;

		let modalButton = ""
		if (moment(event.event_time) < moment()) {
			modalButton = <button
				disabled=""
				onClick={this.showModal}
				data-target="modal2"
				className="btn modal-trigger"
			>
				Leave a Review
        </button>
		} else if (moment(event.event_time) > moment()) {
			modalButton = <button
				disabled=""
				onClick={this.showModal}
				data-target="modal1"
				className="btn modal-trigger"
			>
				Join for <NumberFormat value={this.props.event.event_price} displayType={'text'} fixedDecimalScale={true} decimalScale={'2'} prefix={'$'} />
			</button>
		}

		// this logic is what makes the modal appear and close.
		let modalShowJoin = "none";
		if (this.state.joinModal === 1) {
			modalShowJoin = "block";
		}

		let modalShowReview = "none";
		if (this.state.reviewModal === 1) {
			modalShowReview = "block"
		}

		// this logic determines whether the modal allows a payment or tells you to log in. 
		let button;
		if (!this.props.auth.token) {
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
		} else if (event.attending && event.attending.includes(this.props.auth.user_id)) {
			button = (<button className="btn" onClick={this.showModal} >You're already attending</button>)
		} else {
			button = (
				<button onClick={this.makePayment} className="btn">
					Reserve {this.state.servings} Servings
        		</button>
			);
		}

		// this logic auto fills the servings option with only available servings amounts. 
		// console.log(this.state.servings)
		const howManyServings = []
		for (let i = 1; i <= this.props.event.event_portions; i++) {
			howManyServings.push(<option value={i} key={i} >{i}</option>)
		}
		let dineInOption = '';
		let pickUpOption = '';
		if (this.state.dineIn === 0) {
			dineInOption = "disabled"
		}
		if (this.state.pickUp === 0) {
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
					{modalButton}
					<div
						id="modal1"
						style={{ display: `${modalShowJoin}` }}
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
				<div
					id="modal1"
					className="modal modal-fixed-footer"
					style={{ display: `${modalShowReview}` }}
				>
					<button id="close-modal" className="col s1 right  " onClick={this.showModal}>&Chi;</button>
					<div className="modal-content">
						<div className="row">
							<form onSubmit={this.onSubmit} className="col s12">
								<div className="row">
								</div>
									<textarea value={this.state.reviewTitle} onChange={this.changeReviewTitle} id="textarea0" className="materialize-textarea"></textarea>
								<BeautyStars value={this.state.stars} onChange={this.changeStars} />
								<div className="input-field col s12">
									<textarea value={this.state.reviewText} onChange={this.changeReviewText} id="textarea1" className="materialize-textarea"></textarea>
									<label htmlFor="textarea1">Textarea</label>
								</div>
								<button className="btn submit-button waves-effect waves-light" type="submit" name="action">Submit
          							<i className="material-icons right">send</i>
								</button>
							</form>
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		paymentAndReview: paymentAndReviewAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPayment);
