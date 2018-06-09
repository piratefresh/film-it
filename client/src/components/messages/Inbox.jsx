import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
// Component
import InboxChat from "../real-time-messaging/InboxChat";
import MessageWindow from "../real-time-messaging/MessageWindow";
// React
import {
  getMessages,
  sendMessage,
  getMessageById
} from "../../actions/messageActions";
import { getProfiles } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import Link from "../common/Link";
// AutoComplete
import Select from "react-select";

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
const ActionsArea = styled.div`
  margin-left: auto;
  padding-top: 2%;
`;

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeNewMessage: false,
      subject: "",
      senderHandle: "",
      recieverHandle: "",
      senderAvatar: "",
      message: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    // Select react
  }
  componentDidMount() {
    this.props.getMessages();
    this.props.getProfiles();
  }

  static getDerivedStateFromProps(props, state) {
    const { currentMessage } = props.conversations;
    if (props.conversations.currentMessage === null) {
      return null;
    }
    return {
      currentMessage
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { profile } = this.props.profile;
    const { recepientHandle, subject, message } = this.state;

    const newMesg = {
      subject: subject,
      senderHandle: profile.handle,
      recieverHandle: recepientHandle.value,
      senderAvatar: profile.avatar,
      message: message
    };
    this.props.sendMessage(newMesg);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(id, e) {
    e.preventDefault();

    this.props.getMessageById(id);
  }

  toggleMakeMessage = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleChange = recepientHandle => {
    this.setState({ recepientHandle });
    // selectedOption can be null when the `x` (close) button is clicked
    if (recepientHandle) {
      console.log(`Selected: ${recepientHandle.label}`);
    }
  };

  render() {
    const { errors, makeNewMessage, recepientHandle } = this.state;
    const { profiles, profile } = this.props.profile;
    const { conversations, loading, currentMessage } = this.props.conversations;

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
      makeNewMessageInputs = (
        <div>
          <InboxTypeContainer>
            <Select
              id="recepientHandle"
              className="basic-single"
              classNamePrefix="select"
              name="recepientHandle"
              value={recepientHandle}
              options={userHandles}
              onChange={this.handleChange}
              placeholder="Send to"
            />
            <textarea
              id="message"
              placeholder="Type Message here"
              name="message"
              onChange={this.onChange}
            />
            <ActionsArea>
              <Button style={{ width: "50px" }}>Send</Button>
            </ActionsArea>
          </InboxTypeContainer>
        </div>
      );
    } else {
      makeNewMessageInputs = (
        <div>
          <InboxTypeContainer>
            <textarea
              id="message"
              placeholder="Type message here"
              name="message"
              onChange={this.onChange}
            />
            <ActionsArea>
              {" "}
              <Button style={{ width: "50px" }}>Send</Button>
            </ActionsArea>
          </InboxTypeContainer>
        </div>
      );
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
        <MessageWindow currentMessage={currentMessage} />
        <form onSubmit={this.onSubmit}>{makeNewMessageInputs}</form>
      </InboxContainer>
    );
  }
}

Inbox.propTypes = {
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getMessageById: PropTypes.func.isRequired,
  conversations: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  conversations: state.conversations,
  currentMessage: state.currentMessage,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getMessages,
    sendMessage,
    getMessageById,
    getProfiles
  }
)(Inbox);
