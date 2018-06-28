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
// lodash
import throttle from "lodash.throttle";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faUsers,
  faInbox,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";

const Nav = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 0px;
  background: #fff;
  @media (max-width: 650px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    z-index: 1000;
  }
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
  @media (max-width: 1000px) {
    margin: 0;
  }}
  @media (max-width: 600px) {
    height: 100%;
    font-size: 0.8rem;
    h2 {
      width: 60px;
    }
  }}
`;

const NavUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: space-evenly;
    width: 100%;
  }
`;

const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-transform: uppercase;
  text-decoration: none;
  color: #7d48df;
  position: relative;
  /* NavBar Icon */
  h2 {
    font-family: "Poppins";
  }
  @media (max-width: 600px) {
    padding: 5% 0;
    font-size: 0.6rem;
    /* NavBar Icon */
    h2 {
      padding-left: 5%;
    }
  }
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
  @media (max-width: 600px) {
    right: -10%;
  }
`;
const NavImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  height: 22px;
  width: 22px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  @media (max-width: 600px) {
    height: 20px;
    width: 20px;
    margin: 0;
  }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };

    socket.on("addMessage", mesg => {
      this.props.getMessages();
      this.props.getCurrentProfile();
      console.log("added message onSubmit");
    });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    // Check mobile or not
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize = throttle(() => {
    this.setState({
      isMobile: window.innerWidth <= 650
    });
  }, 1000);

  componentWillUnmount() {
    socket.emit("disconnect");
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
    const { isMobile } = this.state;

    let authLinks;
    if (profile === null || loading) {
    } else {
      if (Object.keys(profile).length === 0) {
        authLinks = (
          <NavUl>
            <NavLink href="/feed">
              <FontAwesomeIcon icon={faTasks} size="2x" /> Posts
            </NavLink>
            <NavLink href="/profiles">
              <i
                class={!isMobile ? "fas fa-users fa-lg" : "fas fa-users fa-2x"}
              />
              Profiles
            </NavLink>
            <NavLink href="/inbox">
              <i
                class={!isMobile ? "fas fa-inbox fa-lg" : "fas fa-inbox fa-2x"}
              />
              Inbox
            </NavLink>
            <NavLink href="/dashboard">
              <i
                className={
                  !isMobile
                    ? "fas fa-user-plus fa-lg"
                    : "fas fa-user-plus fa-2x"
                }
              />
              Dashboard
            </NavLink>
            <NavLink
              href="/auth/logout"
              onClick={this.onLogoutClick.bind(this)}
            >
              <i
                className={
                  !isMobile
                    ? "fas fa-sign-in-alt fa-lg"
                    : "fas fa-sign-in-alt fa-2x"
                }
              />Logout Logout
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
              <FontAwesomeIcon icon={faTasks} size={isMobile ? "2x" : "lg"} />
              Posts
            </NavLink>
            <NavLink href="/profiles">
              <FontAwesomeIcon icon={faUsers} size={isMobile ? "2x" : "lg"} />
              Profiles
            </NavLink>
            <NavLink href="/inbox">
              <MessageCount>{profile.unreadMessageCount}</MessageCount>
              <FontAwesomeIcon icon={faInbox} size={isMobile ? "2x" : "lg"} />
              Inbox
            </NavLink>
            <NavLink href="/dashboard">
              <NavImg src={profile.avatar} />
              Dashboard
            </NavLink>
            <NavLink
              href="/auth/logout"
              onClick={this.onLogoutClick.bind(this)}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
                size={isMobile ? "2x" : "lg"}
              />
              Logout
            </NavLink>
          </NavUl>
        );
      }
    }

    const guestLinks = (
      <NavUl>
        <NavLink href="/feed">
          <i
            className={!isMobile ? "fas fa-tasks fa-lg" : "fas fa-tasks fa-2x"}
          />Posts
        </NavLink>
        <NavLink href="/profiles">
          <i class={!isMobile ? "fas fa-users fa-lg" : "fas fa-users fa-2x"} />Profiles
        </NavLink>
        <NavLink href="/register">
          <i
            className={
              !isMobile ? "fas fa-user-plus fa-lg" : "fas fa-user-plus fa-2x"
            }
          />Sign Up
        </NavLink>
        <NavLink href="/login">
          <i
            className={
              !isMobile
                ? "fas fa-sign-in-alt fa-lg"
                : "fas fa-sign-in-alt fa-2x"
            }
          />Login
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
