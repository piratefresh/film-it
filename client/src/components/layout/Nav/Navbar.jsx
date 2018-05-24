import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, logoutGoogleUser } from "../../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../../actions/profileActions";
//frontend
import Spinner from "../../common/Spinner";

const Nav = styled.nav`
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #fff;
`;

const Navcontent = styled.div`
  margin: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
`;
const NavImg = styled.img`
  object-fit: cover;
  width: 25px;
  margin-right: 5px;
  vertical-align: middle;
  border-radius: 50%;
`;

class Navbar extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
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
            <NavLink href="/posts">
              <i className="fas fa-tasks" />View Listings
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
        authLinks = (
          <NavUl>
            <NavLink href="/posts">
              <i className="fas fa-tasks" />View Listings
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

    /*     const authLinks = (
      <NavUl>
        <NavLink href="/posts">
          <i className="fas fa-tasks" />View Listings
        </NavLink>
        <NavLink href="/dashboard">
          <i className="fas fa-user-plus" />Dashboard
        </NavLink>
        <NavLink href="/auth/logout" onClick={this.onLogoutClick.bind(this)}>
          <i className="fas fa-sign-in-alt" />Logout
        </NavLink>
      </NavUl>
    ); */

    const guestLinks = (
      <NavUl>
        <NavLink href="/posts">
          <i className="fas fa-tasks" />View Listings
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  logoutUser,
  logoutGoogleUser,
  getCurrentProfile,
  clearCurrentProfile
})(Navbar);
