import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, logoutGoogleUser } from "../../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../../actions/profileActions";
import {
  getUnreadMessagesCount,
  getMessages
} from "../../../actions/messageActions";
// Socket.Io
import { socket } from "../../../store";

const Nav = styled.nav`
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #fff;
`;

const Navcontent = styled.div`
  margin: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  > h2 {
    padding: 0;
    margin: 0;
    color: #7d48df;
    font-family: "Poppins", sans-serif;
  }
`;

const NavUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.a`
  padding: 15px;
  text-transform: uppercase;
  text-decoration: none;
  color: #7d48df;
  vertical-align: middle;
  position: relative;
`;
const MessageCount = styled.span`
  background-color: #fa3e3e;
  border-radius: 2px;
  color: white;

  padding: 3px 5px;
  font-size: 10px;

  position: absolute; /* Position the badge within the relatively positioned button */
  top: 0;
  right: 0;
`;
const NavImg = styled.img`
  object-fit: cover;
  width: 25px;
  margin-right: 5px;
  vertical-align: middle;
  border-radius: 50%;
`;
const NotifyBubble = styled.div`
  background: red;
  height: 15px;
  width: 15px;
  border-radius: 15%;
  position: absolute;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);

    socket.on("addMessage", mesg => {
      this.props.getMessages();
      this.props.getCurrentProfile();
      console.log("added message onSubmit");
    });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillUnmount() {
    const { profile } = this.props.profile;
    socket.emit("disconnect", { handle: profile.handle });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.logoutGoogleUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let authLinks;
    if (profile === null || loading) {
    } else {
      if (Object.keys(profile).length === 0) {
        authLinks = (
          <NavUl>
            <NavLink href="/feed">
              <i className="fas fa-tasks" />View Posts
            </NavLink>
            <NavLink href="/profiles">
              <i class="fas fa-users" />Profiles
            </NavLink>
            <NavLink href="/inbox">
              <i class="fas fa-inbox" />Inbox
            </NavLink>
            <NavLink href="/dashboard">
              <i className="fas fa-user-plus" />Dashboard
            </NavLink>
            <NavLink
              href="/auth/logout"
              onClick={this.onLogoutClick.bind(this)}
            >
              <i className="fas fa-sign-in-alt" />Logout
            </NavLink>
          </NavUl>
        );
      } else {
        // Add user to socket list object
        socket.emit("addUser", { name: profile.handle });
        // Sends profile handle to server to check for unread messages
        socket.emit("checkUnreadMessages", { name: profile.handle });

        authLinks = (
          <NavUl>
            <NavLink href="/feed">
              <i className="fas fa-tasks" />View Posts
            </NavLink>
            <NavLink href="/profiles">
              <i class="fas fa-users" />Profiles
            </NavLink>
            <NavLink href="/inbox">
              <MessageCount>{profile.unreadMessageCount}</MessageCount>
              <i class="fas fa-inbox" />Inbox
            </NavLink>
            <NavLink href="/dashboard">
              <NavImg src={profile.avatar} />Dashboard
            </NavLink>
            <NavLink
              href="/auth/logout"
              onClick={this.onLogoutClick.bind(this)}
            >
              <i className="fas fa-sign-in-alt" />Logout
            </NavLink>
          </NavUl>
        );
      }
    }

    const guestLinks = (
      <NavUl>
        <NavLink href="/feed">
          <i className="fas fa-tasks" />View Posts
        </NavLink>
        <NavLink href="/profiles">
          <i class="fas fa-users" />Profiles
        </NavLink>
        <NavLink href="/register">
          <i className="fas fa-user-plus" />Sign Up
        </NavLink>
        <NavLink href="/login">
          <i className="fas fa-sign-in-alt" />Login
        </NavLink>
      </NavUl>
    );

    return (
      <Nav>
        <Navcontent>
          <NavLink href="/">
            <h2>Film-It</h2>
          </NavLink>
          {isAuthenticated ? authLinks : guestLinks}
        </Navcontent>
      </Nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  logoutGoogleUser: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  conversations: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  conversations: state.conversations
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    logoutGoogleUser,
    getCurrentProfile,
    getUnreadMessagesCount,
    getMessages,
    clearCurrentProfile
  }
)(Navbar);
