import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Styled Components
import styled from "styled-components";

const UserContactContainer = styled.div`
  margin: 10% 5%;
  width: 100%;
  p {
    margin: 5% 0;
  }
  @media (max-width: 650px) {
    margin: 0;
  }
`;
const ContactItem = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  @media (max-width: 650px) {
    justify-content: center;
  }
`;

class UserContact extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;
    return (
      <UserContactContainer>
        <ContactItem>
          <p>{user.email}</p>
        </ContactItem>
        <ContactItem>
          <p>
            {profile.city}, {profile.state}{" "}
          </p>
        </ContactItem>
        <ContactItem>
          <p>{profile.website === null ? "None " : profile.website}</p>
        </ContactItem>
      </UserContactContainer>
    );
  }
}

export default connect(null)(UserContact);
