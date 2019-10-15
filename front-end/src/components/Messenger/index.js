import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import axios from 'axios'

export class Messenger extends Component{
  state = {
    conversations: [],
    messages: []
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      const messagesUrl = `${window.apiHost}/Messages`
      const eventsUrl = `${window.apiHost}/MessageEvents`
      const messages = await axios.post(messagesUrl, this.props.auth)
      const messageEvents = await axios.post(eventsUrl, this.props.auth)
      this.setState({
          conversations: messageEvents.data,
          messages: messages.data
      })
    }
    if (prevProps.refresh !== this.props.refresh) {
      const messagesUrl = `${window.apiHost}/Messages`
      const eventsUrl = `${window.apiHost}/MessageEvents`
      const messages = await axios.post(messagesUrl, this.props.auth)
      const messageEvents = await axios.post(eventsUrl, this.props.auth)
      this.setState({
          conversations: messageEvents.data,
          messages: messages.data
      })
    }
}
  async componentDidMount(){
    const messagesUrl = `${window.apiHost}/Messages`
    const eventsUrl = `${window.apiHost}/MessageEvents`
    const messages = await axios.post(messagesUrl, this.props.auth)
    const messageEvents = await axios.post(eventsUrl, this.props.auth)
    this.setState({
        conversations: messageEvents.data,
        messages: messages.data
    })
}
    render(){
      return (
        <div className="messenger row">
          <div className="scrollable sidebar col m4 s12">
            <ConversationList info={this.state}/>
          </div>

          <div className="scrollable content col m8 s12">
            <MessageList messenger={this.state}
            />
          </div>
        </div>
      )
    }
}
function mapStateToProps(state) {
    return ({
        auth: state.auth,
        conversation: state.conversation,
        refresh: state.refresh

    })
}
export default connect(mapStateToProps)(Messenger);
