import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// React
import { getMessages, sendMessage } from "../../actions/messageActions";
import { getProfiles } from "../../actions/profileActions";
// Styled Components
import styled from "styled-components";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
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
`;
const InboxListMesg = styled.div`
  display: flex;
  font-size: 0.8rem;
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const InboxMessageWindow = styled.div`
  grid-area: messages;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5%;
  padding: 2% 2%;
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
      message: "",
      avatar: "",
      name: "",
      senderHandle: "",
      recepientHandle: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Select react
  }
  componentDidMount() {
    this.props.getMessages();
    this.props.getProfiles();
  }
  onSubmit(e) {
    e.preventDefault();

    const { profile } = this.props.profile;
    const { recepientHandle, subject } = this.state;

    const newMesg = {
      subject: subject,
      message: this.state.message,
      avatar: profile.avatar,
      name: profile.user.name,
      senderHandle: profile.handle
    };
    console.log(subject, recepientHandle.value);
    this.props.sendMessage(newMesg, recepientHandle.value, subject);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    const { profiles } = this.props.profile;
    const { messages, loading } = this.props.message;

    let userHandles = [];
    if (profiles) {
      profiles.map(profile => {
        userHandles.push({ value: profile.handle, label: profile.handle });
      });
    }
    let inboxListContent;
    if (messages === null || loading) {
      inboxListContent = <Spinner />;
    } else {
      if (Object.keys(messages).length > 0) {
        inboxListContent = messages.map(mesg => {
          <InboxListMesg key={mesg._id}>
            <img src={mesg.sender.avatar} alt="" srcset="" />
            <p>{mesg.messages}</p>
          </InboxListMesg>;
        });
      } else {
        inboxListContent = <p>No Messages yet</p>;
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
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={this.onChange}
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
              placeholder="Type Message here"
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
        <InboxMessageWindow>
          <h4>Message Window</h4>
        </InboxMessageWindow>
        <form onSubmit={this.onSubmit}>{makeNewMessageInputs}</form>
      </InboxContainer>
    );
  }
}

Inbox.propTypes = {
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getMessages,
  sendMessage,
  getProfiles
})(Inbox);
