import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { getMessageById } from "../../actions/messageActions";
import styled from "styled-components";

const Window = styled.div`
  grid-area: messages;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;
  padding: 2% 2%;
  p {
    font-size: 0.8rem;
  }
`;

class MessageWindow extends Component {
  render() {
    const { currentMessage } = this.props;
    console.log(currentMessage);
    let content;
    if (currentMessage === null) {
      return null;
    } else {
      content = currentMessage.messages.map(mesg => {
        return (
          <div>
            <h4>{mesg.sender}</h4>
            <p>{mesg.message}</p>
          </div>
        );
      });
    }
    return <Window>{content} </Window>;
  }
}

export default connect(
  null,
  { getMessageById }
)(MessageWindow);
