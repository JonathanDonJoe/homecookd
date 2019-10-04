import React, { Component } from 'react'
import './ChatBar.css'

export class ChatBar extends Component {
    render() {
        return (
            <div className='container-fluid chat-bar'>
                <div className='row chat-bar-row green'>
                    Hello I'm the bloody chat bar
                </div>   
            </div>
        )
    }
}
export default ChatBar