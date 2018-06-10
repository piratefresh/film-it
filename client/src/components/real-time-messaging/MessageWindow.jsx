import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { getMessageById } from "../../actions/messageActions";
// Styled Components
import styled from "styled-components";
import Spinner from "../common/Spinner";
// Socket.io
import { socket } from "../../store";

const Window = styled.div`
  grid-area: messages;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;
  padding: 2% 2%;
  overflow: auto;
  overflow-y: scroll;

  height: 600px;
  p {
    font-size: 0.8rem;
  }
`;
const SenderContent = styled.div`
  display: flex;
  background: rgb(211, 211, 211);
  border-radius: 15px;
  clear: both;
  float: left;
  padding: 7px 13px;
  margin-bottom: 2px;
`;
const RecieverContent = styled.div`
  display: flex;
  background: #7d48df;
  color: #fff;
  border-radius: 15px;
  float: right;
  clear: both;
  padding: 7px 13px;
  margin-bottom: 2px;
`;

class MessageWindow extends Component {
  render() {
    const { currentMessage } = this.props;
    const { profile } = this.props.profile;

    console.log(currentMessage);
    let content;
    if (currentMessage === null) {
      return null;
    } else {
      if (profile === null) {
        content = <Spinner />;
      } else {
        content = currentMessage.messages.map(mesg => {
          if (mesg.sender !== profile.handle) {
            console.log(profile.handle + " read " + mesg.message);
            socket.emit("readMessage", { id: mesg._id });
          }
          return (
            <div key={mesg._id}>
              {mesg.sender !== profile.handle ? (
                <SenderContent>
                  <p>{mesg.message}</p>
                </SenderContent>
              ) : (
                <RecieverContent>
                  <p>{mesg.message}</p>
                </RecieverContent>
              )}
            </div>
          );
        });
      }
    }
    return <Window ref="chatWindow">{content} </Window>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  conversations: state.conversations
});

export default connect(
  mapStateToProps,
  { getMessageById }
)(MessageWindow);
