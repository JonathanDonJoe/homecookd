import moment from 'moment';
import './Message.css';
import React, { Component } from 'react'

export class Message extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Message


// export default function Message(props) {
//     const {
//       data,
//       isMine,
//       startsSequence,
//       endsSequence,
//       showTimestamp
//     } = props;

//     const friendlyTimestamp = moment(data.timestamp).format('LLLL');
//     return (
//       <div className={[
//         'message',
//         `${isMine ? 'mine' : ''}`,
//         `${startsSequence ? 'start' : ''}`,
//         `${endsSequence ? 'end' : ''}`
//       ].join(' ')}>
//         {
//           showTimestamp &&
//             <div className="timestamp">
//               { friendlyTimestamp }
//             </div>
//         }

//         <div className="bubble-container">
//           <div className="bubble" title={friendlyTimestamp}>
//             { data.message }
//           </div>
//         </div>
//       </div>
//     );
// }