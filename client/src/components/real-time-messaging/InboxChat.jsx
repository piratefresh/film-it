import React, { Component } from "react";
import styled from "styled-components";

const ChatItem = styled.div`
  display: flex;
`;
const LastMessage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5%;
  p {
    font-size: 0.8rem;
  }
`;

String.prototype.trunc =
  String.prototype.trunc ||
  function(n) {
    return this.length > n ? this.substr(0, n - 1) : this;
  };

class InboxChat extends Component {
  render() {
    const { messages } = this.props.convo;
    const lastMessage = messages[messages.length - 1];

    return (
      <div>
        <ChatItem>
          <div className="sender-image">
            <img src={this.props.avatar} alt={messages.sender} srcset="" />
          </div>
          <LastMessage>
            <h4>{this.props.sender}</h4>
            <p>{lastMessage.message.trunc(50)}</p>
          </LastMessage>
        </ChatItem>
        <p />
      </div>
    );
  }
}

export default InboxChat;
