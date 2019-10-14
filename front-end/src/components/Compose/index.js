import './Compose.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { bindActionCreators } from 'redux';
import refreshMessagesAction from '../../actions/refreshMessageAction'



export class Compose extends Component {

  state = {
    message: '',
  }

  refreshMessages = (e)=> {
    e.preventDefault()
    if(this.props.refresh == 0){
      this.props.refreshMessages(1)
    }else{this.props.refreshMessages(0)}
    console.log(this.props.refresh);
  }

  postMessage = async (e)=> {
    e.preventDefault()
    if(this.props.conversation.conversation){
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
      if(this.props.refresh){
        this.props.refreshMessages(1)
        console.log(this.props.refresh);
      }else{
        this.props.refreshMessages(0)
        console.log(this.props.refresh);
      }
    }
  }


  changeMessage = (e) => {
    this.setState({
        message: e.target.value
    })
}
  render() {
    console.log('gahjkhgfghjklhgfghjkgfcghjhgfghidfghjhgfghjhgchjhgckjhgfcjkjhcvhjkjvcvjkjhgvchjvcvbjhvcvbjvcvbnkjvcvbkjvcvbn')
    console.log(this.props);
    return (<>
      <form onSubmit={this.postMessage} className="col s12">
          <div className="input-field col s12">
              <textarea placeholder='Type your message' id="textarea1" value={this.state.message} onChange={this.changeMessage} maxLength={300} className="materialize-textarea"></textarea>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
              </button>
              <button className="btn waves-effect waves-light" type="submit"  onClick={this.refreshMessages}  name="action">Refresh
              <i className="material-icons right">refresh</i>
              </button>
          </div>
      </form>

    </>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      refreshMessages: refreshMessagesAction
  }, dispatch)
}

function mapStateToProps(state) {
  return ({
      auth: state.auth,
      conversation: state.conversation,
      refresh: state.refresh

  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Compose);
