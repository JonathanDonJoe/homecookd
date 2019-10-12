import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react'

import './MessageList.css';
export class MessageList extends Component {

    renderMessages = () => {
      let messages = this.props.messenger.messages.filter((message) =>{
        return message.event_id == this.props.conversation.conversationId
      })

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
  render() {
    console.log(this.props);
    return (
      <div className="message-list">
         <Toolbar
          title="Conversation Title"
        />
        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose data={this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
      auth: state.auth,
      conversation: state.conversation

  })
}
export default connect(mapStateToProps)(MessageList);


// const MY_USER_ID = 'apple';

// export default function MessageList(props) {
//   const [messages, setMessages] = useState([])

//   useEffect(() => {
//     getMessages();
//   },[])

  
//   const getMessages = () => {
//      var tempMessages = [
//         {
//           id: 1,
//           author: 'apple',
//           message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 2,
//           author: 'orange',
//           message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 3,
//           author: 'orange',
//           message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 4,
//           author: 'apple',
//           message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 5,
//           author: 'apple',
//           message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 6,
//           author: 'apple',
//           message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 7,
//           author: 'orange',
//           message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 8,
//           author: 'orange',
//           message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 9,
//           author: 'apple',
//           message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
//           timestamp: new Date().getTime()
//         },
//         {
//           id: 10,
//           author: 'orange',
//           message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
//           timestamp: new Date().getTime()
//         },
//       ]
//       setMessages([...messages, ...tempMessages])
//   }

//   const renderMessages = () => {
//     let i = 0;
//     let messageCount = messages.length;
//     let tempMessages = [];

//     while (i < messageCount) {
//       let previous = messages[i - 1];
//       let current = messages[i];
//       let next = messages[i + 1];
//       let isMine = current.author === MY_USER_ID;
//       let currentMoment = moment(current.timestamp);
//       let prevBySameAuthor = false;
//       let nextBySameAuthor = false;
//       let startsSequence = true;
//       let endsSequence = true;
//       let showTimestamp = true;

//       if (previous) {
//         let previousMoment = moment(previous.timestamp);
//         let previousDuration = moment.duration(currentMoment.diff(previousMoment));
//         prevBySameAuthor = previous.author === current.author;
        
//         if (prevBySameAuthor && previousDuration.as('hours') < 1) {
//           startsSequence = false;
//         }

//         if (previousDuration.as('hours') < 1) {
//           showTimestamp = false;
//         }
//       }

//       if (next) {
//         let nextMoment = moment(next.timestamp);
//         let nextDuration = moment.duration(nextMoment.diff(currentMoment));
//         nextBySameAuthor = next.author === current.author;

//         if (nextBySameAuthor && nextDuration.as('hours') < 1) {
//           endsSequence = false;
//         }
//       }

//       tempMessages.push(
//         <Message
//           key={i}
//           isMine={isMine}
//           startsSequence={startsSequence}
//           endsSequence={endsSequence}
//           showTimestamp={showTimestamp}
//           data={current}
//         />
//       );

//       // Proceed to the next message.
//       i += 1;
//     }

//     return tempMessages;
//   }

//     return(
//       <div className="message-list">
//         <Toolbar
//           title="Conversation Title"
//         />

//         <div className="message-list-container">{renderMessages()}</div>

//         <Compose rightItems={[
//           <ToolbarButton key="photo" icon="ion-ios-camera" />,
//           <ToolbarButton key="image" icon="ion-ios-image" />,
//           <ToolbarButton key="audio" icon="ion-ios-mic" />,
//           <ToolbarButton key="money" icon="ion-ios-card" />,
//           <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
//           <ToolbarButton key="emoji" icon="ion-ios-happy" />
//         ]}/>
//       </div>
//     );
// }