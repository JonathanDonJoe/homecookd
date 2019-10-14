import './Compose.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'


export class Compose extends Component {

  state = {
    message: ''
  }

  postMessage = async (e)=> {
    e.preventDefault()
    let message = this.state.message;
    let url = `${window.apiHost}/postMessage`
    const requestData = {
      message: message,
      auth: this.props.auth,
      eventId: this.props.conversation.conversation.id
    }
    const messageSent = await axios.post(url, requestData)
    console.log(`message sent`);
        this.setState({
          message: ''
        })
        this.render()


  }

  changeMessage = (e) => {
    this.setState({
        message: e.target.value
    })
}
  render() {
    // console.log(this.props);
    return (
      <form onSubmit={this.postMessage} className="col s12">
          <div className="input-field col s12">
              <textarea placeholder='Type your message' id="textarea1" value={this.state.message} onChange={this.changeMessage} maxLength={300} className="materialize-textarea"></textarea>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
              </button>
          </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return ({
      auth: state.auth,
      conversation: state.conversation

  })
}
export default connect(mapStateToProps)(Compose);
