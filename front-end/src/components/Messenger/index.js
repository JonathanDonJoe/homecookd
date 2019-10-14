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
      console.log('asking for response');
      const messages = await axios.post(messagesUrl, this.props.auth)
      const messageEvents = await axios.post(eventsUrl, this.props.auth)
      console.log(messages);
      this.setState({
          conversations: messageEvents.data,
          messages: messages.data
      })
    }
    if (prevProps.refresh !== this.props.refresh) {
      const messagesUrl = `${window.apiHost}/Messages`
      const eventsUrl = `${window.apiHost}/MessageEvents`
      console.log('asking for response');
      const messages = await axios.post(messagesUrl, this.props.auth)
      const messageEvents = await axios.post(eventsUrl, this.props.auth)
      console.log(messages);
      this.setState({
          conversations: messageEvents.data,
          messages: messages.data
      })
    }
}
  async componentDidMount(){
    // console.log(this.props.conversation);
    // console.log('mounted');
    const messagesUrl = `${window.apiHost}/Messages`
    const eventsUrl = `${window.apiHost}/MessageEvents`
    // console.log('asking for response');
    const messages = await axios.post(messagesUrl, this.props.auth)
    const messageEvents = await axios.post(eventsUrl, this.props.auth)
    // console.log(messages);
    this.setState({
        conversations: messageEvents.data,
        messages: messages.data
    })
    // console.log(this.state)
}
    render(){
      return (
        <div className="messenger row">
          <h1>{this.props.conversation.conversationId}</h1>
          <div className="scrollable sidebar">
            <ConversationList info={this.state}/>
          </div>

          <div className="scrollable content">
            <MessageList messenger={this.state}
            />
          </div>
        </div>
      )
    }
    /* <Toolbar
      title="Messenger"
      leftItems={[
        <ToolbarButton key="cog" icon="ion-ios-cog" />
      ]}
      rightItems={[
        <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
      ]}
    /> */

    /* <Toolbar
      title="Conversation Title"
      rightItems={[
        <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
        <ToolbarButton key="video" icon="ion-ios-videocam" />,
        <ToolbarButton key="phone" icon="ion-ios-call" />
      ]}
    /> */
}
function mapStateToProps(state) {
    return ({
        auth: state.auth,
        conversation: state.conversation,
        refresh: state.refresh

    })
}
export default connect(mapStateToProps)(Messenger);
