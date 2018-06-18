import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMessages, getMessageById } from "../../actions/messageActions";
import Spinner from "../common/Spinner";
// Components
import MessageWindow from "./MessageWindow";
import InboxChat from "./InboxChat";
// styled components
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";
// Socket.io
import { socket } from "../../store";

const InboxContainer = styled.div`
  background: #fff;
  height: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: minmax(50px, 1fr) minmax(200px, 3fr);
  grid-template-rows: 3fr minmax(50px, auto);
  grid-gap: 5%;
  grid-template-areas:
    "list messages"
    "list textarea";
  padding: 5%;
`;
const InboxList = styled.div`
  grid-area: list;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 2% 2%;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;
const InboxTypeContainer = styled.div`
  grid-area: textarea;
  height: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    border: none;
    padding: 2% 2%;
  }
  textarea {
    width: 96%;
    height: 100%;
    border: none;
    padding: 2% 2%;
    resize: vertical;
  }
`;

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeNewMessage: false,
      currrentMessage: "",
      sender: "",
      recieverHandle: "",
      message: "",
      username: "magnus"
    };

    socket.on("addMessage", () => {
      this.props.getMessages();
      console.log("added message onSubmit");
    });

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { profile } = this.props.profile;
    const recieverHandle = this.state.recieverHandle;
    const message = this.state.message;

    console.log(profile.avatar);
    const newMesg = {
      sender: profile.handle,
      recieverHandle: recieverHandle,
      senderAvatar: profile.avatar,
      message: message,
      senderHandle: profile.handle
    };
    console.log(newMesg);
    socket.emit("privateMessage", newMesg);

    socket.on("addMessage", mesg => {
      this.props.getMessages();
      console.log("added message onSubmit");
    });
  }

  onClick(id, e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(id);
    this.props.getMessageById(id);

    socket.on("addMessage", mesg => {
      this.props.getMessageById(id);
      console.log("added message onSubmit");
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const { conversations, loading } = this.props.conversations;

    this.props.getMessages();
    console.log(conversations);
  }

  componentDidUpdate(prevProps) {
    const {
      profile: { profile }
    } = this.props;
    if (profile !== prevProps.profile.profile) {
      socket.emit("addUser", { name: profile.handle });
    }
  }

  componentWillUnmount() {
    socket.on("disconnect", function() {
      socket.disconnect();
      console.log("client disconnected");
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { conversations } = props.conversations;

    if (conversations === null) {
      return null;
    }
    return conversations.messages;
  }

  render() {
    const { errors, makeNewMessage, recepientHandle } = this.state;
    const { conversations, loading, currentMessage } = this.props.conversations;
    const { profile, profiles } = this.props.profile;

    let userHandles = [];
    if (profiles) {
      profiles.map(profile => {
        userHandles.push({ value: profile.handle, label: profile.handle });
      });
    }
    let inboxListContent;
    if (conversations === null || loading) {
      inboxListContent = <Spinner />;
    } else {
      if (profile !== null) {
        inboxListContent = conversations.map(convo => {
          const avatar = convo.avatars.filter(
            avatar => !profile.avatar.includes(avatar)
          );
          avatar.toString();
          const sender = convo.participants.filter(
            sender => !profile.handle.includes(sender)
          );
          return (
            <Link
              onClick={e => {
                this.onClick(convo._id, e);
              }}
              href={`/inbox/${convo._id}`}
            >
              <InboxChat
                key={convo._id}
                convo={convo}
                profile={profile}
                avatar={avatar}
                sender={sender}
              />
            </Link>
          );
        });
      }
    }

    let makeNewMessageInputs;
    if (!makeNewMessage) {
    } else {
      makeNewMessageInputs = (
        <InboxTypeContainer>
          <label htmlFor="Sender">Reciever</label>
          <input
            id="recieverHandle"
            type="text"
            placeholder="recieverHandle"
            name="recieverHandle"
            onChange={this.onChange}
          />
          <label htmlFor="Sender">message</label>
          <input
            id="message"
            type="text"
            placeholder="message"
            name="message"
            onChange={this.onChange}
          />
          <Button style={{ width: "50px" }}>Send</Button>
        </InboxTypeContainer>
      );
    }

    let messageWindowContent;
    if (currentMessage !== null) {
      messageWindowContent = <MessageWindow currentMessage={currentMessage} />;
    }

    return (
      <InboxContainer>
        <InboxList>
          <Button
            onClick={e => {
              e.preventDefault();
              this.setState(prevState => ({
                makeNewMessage: !prevState.makeNewMessage
              }));
            }}
          >
            <i className="fas fa-envelope-open" /> New Message
          </Button>
          <h4>Inbox</h4>
          {inboxListContent}
        </InboxList>

        {messageWindowContent}
        <form onSubmit={this.onSubmit}>{makeNewMessageInputs}</form>
      </InboxContainer>
    );
  }
}

Messenger.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  conversations: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  conversations: state.conversations
});

export default connect(
  mapStateToProps,
  { getMessages, getMessageById }
)(Messenger);
