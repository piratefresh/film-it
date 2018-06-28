import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMessages, getMessageById } from "../../actions/messageActions";
// Components
import MessageWindow from "./MessageWindow";
import InboxChat from "./InboxChat";
// styled components
import styled from "styled-components";
import Button from "../common/Button";
import Link from "../common/Link";
import Spinner from "../common/Spinner";
// Socket.io
import { socket } from "../../store";
// responsiveness
import MediaQuery from "react-responsive";

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
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
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
const TextContentArea = styled.textarea`
  resize: none;
  overflow: hidden;
  min-height: 100px;
  max-height: 250px;
  width: 100%;
  overflow-y: scroll;
`;

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxListShow: true,
      isMobile: false,
      makeNewMessage: true,
      sender: "",
      recieverHandle: "",
      message: "",
      username: ""
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

    this.setState({
      message: ""
    });
  }

  onClick(id, e, sender) {
    e.preventDefault();
    e.stopPropagation();

    this.props.getMessageById(id);

    // user selected chat, set reciever handle in state
    this.setState(prevState => ({
      recieverHandle: sender[0],
      makeNewMessage: true,
      inboxListShow: !prevState.inboxListShow
    }));

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
    // Check mobile or not
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.props.getMessages();
    console.log(conversations);

    // Check if user came from profile page
    if (this.props.match.params.handle) {
      // user selected chat, set reciever handle in state
      this.setState(prevState => ({
        recieverHandle: this.props.match.params.handle,
        makeNewMessage: true
      }));
    }
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

  resize() {
    this.setState({ isMobile: window.innerWidth <= 650 });
  }

  render() {
    const {
      errors,
      makeNewMessage,
      recepientHandle,
      inboxListShow,
      isMobile
    } = this.state;
    const { conversations, loading, currentMessage } = this.props.conversations;
    const { profile, profiles } = this.props.profile;

    let userHandles = [];
    if (profiles) {
      profiles.map(profile => {
        userHandles.push({ value: profile.handle, label: profile.handle });
      });
    }
    // Sidebar inbox content
    let inboxListContent;
    // Check if conversations are loaded
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
                this.onClick(convo._id, e, sender);
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
    let inputReciever;
    if (!makeNewMessage) {
    } else {
      if (recepientHandle === undefined && inboxListShow) {
        inputReciever = (
          <div>
            <input
              id="recieverHandle"
              type="text"
              placeholder="Username"
              name="recieverHandle"
              value={this.state.recieverHandle}
              onChange={this.onChange}
            />
          </div>
        );
      }
      makeNewMessageInputs = (
        <InboxTypeContainer>
          {inputReciever}
          <TextContentArea
            id="textContent"
            type="text"
            placeholder={`Sending message to ${this.state.recieverHandle}`}
            name="message"
            value={this.state.message}
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

    let inboxContent;
    if (inboxListShow || !isMobile) {
      inboxContent = (
        <InboxList>
          <Button
            onClick={e => {
              e.preventDefault();
              this.setState(prevState => ({
                makeNewMessage: !prevState.makeNewMessage
              }));
            }}
          >
            <i className="fas fa-envelope-open" />{" "}
            {!makeNewMessage ? "New Message" : "Close Input"}
          </Button>
          <h4>Inbox</h4>
          {inboxListContent}
        </InboxList>
      );
    }

    return (
      <InboxContainer>
        {inboxContent}
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
