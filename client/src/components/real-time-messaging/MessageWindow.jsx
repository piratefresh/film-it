import React, { Component } from "react";
import Moment from "react-moment";
// redux
import { connect } from "react-redux";
import { getMessageById } from "../../actions/messageActions";
// Styled Components
import styled from "styled-components";
import Spinner from "../common/Spinner";
import Link from "../common/Link";
// Socket.io
import { socket } from "../../store";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Window = styled.div`
  position: relative;
  z-index: 1;
  grid-area: messages;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;
  padding: 2% 2%;
  overflow-y: scroll;
  height: 55vh;
  p {
    font-size: 0.8rem;
  }
  img {
    height: 25px
    width: 25px;
    border-radius: 50%;
    object-fit:cover;
  }
  @media (max-width: 650px) {
    img {
    height: 20px
    width: 20px;
    border-radius: 50%;
    object-fit:cover;
    }
  }
`;
const MessageHeader = styled.div`
  display: flex;
  color: #fff;
  background: #7d48df;
  align-items: center;
  a {
    width: 60px;
  }
  @media (max-width: 650px) {
    margin-bottom: 5%;
  }
`;
const MessageHeaderDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  h4 {
    padding: 3% 0;
  }
  img {
    width: 30px;
    height: 30px;
    padding-right: 3%;
  }
`;
const ImgWrapper = styled.div`
  width: 30px;
  height: 30px;
  align-self: flex-end;
`;
const SenderMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(211, 211, 211);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 7px 13px;
  margin-bottom: 2px;
  min-width: 150px;
`;
const SenderContent = styled.div`
  display: flex;
  justify-content: space-around;
  clear: both;
  float: left;
`;
const RecieverMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #7d48df;
  color: #fff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 7px 13px;
  margin-bottom: 2px;
  min-width: 150px;
`;
const RecieverContent = styled.div`
  display: flex;
  justify-content: space-around;
  float: right;
  clear: both;
`;
const MessageDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  span {
    align-self: flex-end;
  }
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
                  <ImgWrapper>
                    <img
                      src={currentMessage.avatars[0]}
                      alt={mesg.sender}
                      style={{ marginRight: "25%" }}
                    />
                  </ImgWrapper>
                  <SenderMessageWrapper>
                    <MessageDetails>
                      <Moment
                        style={{ alignSelf: "flexStart" }}
                        fromNow
                        format="MMM-ddd H:mm"
                      >
                        {mesg.date}
                      </Moment>
                      <span>{mesg.sender}</span>
                    </MessageDetails>
                    <p>{mesg.message}</p>
                  </SenderMessageWrapper>
                </SenderContent>
              ) : (
                <RecieverContent>
                  <RecieverMessageWrapper>
                    <MessageDetails>
                      <Moment
                        style={{ alignSelf: "flexStart" }}
                        fromNow
                        format="MMM-ddd H:mm"
                      >
                        {mesg.date}
                      </Moment>
                      <span>{mesg.sender}</span>
                    </MessageDetails>
                    <p>{mesg.message}</p>
                  </RecieverMessageWrapper>
                  <ImgWrapper>
                    <img
                      src={currentMessage.avatars[1]}
                      alt={mesg.sender}
                      style={{ marginLeft: "25%" }}
                    />
                  </ImgWrapper>
                </RecieverContent>
              )}
            </div>
          );
        });
      }
    }
    return (
      <Window ref="chatWindow">
        {" "}
        <MessageHeader>
          <Link href="/inbox">
            <FontAwesomeIcon
              icon={faAngleLeft}
              size="2x"
              color="#fff"
              style={{ marginLeft: "19%" }}
            />
          </Link>
          <MessageHeaderDetails>
            <img src={currentMessage.avatars[0]} alt="" />
            <h4>{currentMessage.participants[0]}</h4>
          </MessageHeaderDetails>
        </MessageHeader>
        {content}
      </Window>
    );
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
