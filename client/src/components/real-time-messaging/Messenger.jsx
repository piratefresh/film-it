import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMessages } from "../../actions/messageActions";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import isEmpty from "../../validation/is-empty";
// Socket.io
import { socket } from "../../store";
import { runInNewContext } from "vm";

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currrentMessage: "",
      sender: "",
      recieverHandle: "",
      message: "",
      username: "magnus"
    };

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
      console.log("added message");
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getMessages();

    socket.on("addMessage", mesg => {
      this.props.getMessages();
      console.log("added message");
    });
  }

  componentDidUpdate(prevProps) {
    const {
      profile: { profile }
    } = this.props;
    if (profile !== prevProps.profile.profile) {
      socket.emit("addUser", { name: profile.handle });
    }
  }

  componentWillUpdate() {
    socket.on("addMessage", mesg => {
      this.props.getMessages();
      console.log("added message");
    });
  }

  componentWillUnmount() {
    socket.on("disconnect", () => {
      console.log("you have been disconnected");
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
    const { conversations, loading } = this.props.conversations;

    let messageContent;
    if (conversations === null || loading) {
      messageContent = <Spinner />;
    } else {
      messageContent = conversations.map(chat => {
        return chat.messages.map(mesg => {
          return (
            <div key={chat._id}>
              <h4>{chat.roomId}</h4>
              <h5>{mesg.sender}</h5>
              <p key={mesg._id}>{mesg.message}</p>
            </div>
          );
        });
      });
    }

    return (
      <div>
        <h4>Messenger</h4>
        <form onSubmit={this.onSubmit}>
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
        </form>
        {messageContent}
      </div>
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
  { getMessages }
)(Messenger);
