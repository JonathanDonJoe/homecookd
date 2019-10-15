import Compose from '../Compose';
import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react'

import './MessageList.css';
export class MessageList extends Component {
    convoTitle = ()=> {
      if(this.props.conversation.conversation){
        return this.props.conversation.conversation.title
      }else{
        return 'Select a Conversation'
      }
    }
    renderMessages = () => {
      if(this.props.conversation.conversation){
      let messages = this.props.messenger.messages.filter((message) =>{
        return message.event_id === this.props.conversation.conversation.id
      })
      messages.sort( (a,b) => moment(a.sent_time).valueOf() - moment(b.sent_time).valueOf())


      let i = 0;
      let messageCount = messages.length;
      let tempMessages = [];

      while (i < messageCount) {
        let previous = messages[i - 1];
        let current = messages[i];
        let next = messages[i + 1];
        let isMine = current.sender_id === this.props.auth.user_id;
        let currentMoment = moment(current.sent_time);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = true;

        if (previous) {
          let previousMoment = moment(previous.sent_time);
          let previousDuration = moment.duration(currentMoment.diff(previousMoment));
          prevBySameAuthor = previous.sender_id === current.sender_id;
          
          if (prevBySameAuthor && previousDuration.as('hours') < 1) {
            startsSequence = false;
          }

          if (previousDuration.as('hours') < 1) {
            showTimestamp = false;
          }
        }

        if (next) {
          let nextMoment = moment(next.sent_time);
          let nextDuration = moment.duration(nextMoment.diff(currentMoment));
          nextBySameAuthor = next.sender_id === current.sender_id;

          if (nextBySameAuthor && nextDuration.as('hours') < 1) {
            endsSequence = false;
          }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }
  }
  render() {
    return (
      <>
      <div className="message-list row">
         <Toolbar
          title={
            this.convoTitle()
          }
        />
        <div className="message-list-container">{this.renderMessages()}</div>

      </div>
      <Compose data={this.props} />
    </>)
  }
}

function mapStateToProps(state) {
  return ({
      auth: state.auth,
      conversation: state.conversation

  })
}
export default connect(mapStateToProps)(MessageList);