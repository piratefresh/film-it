import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Styled Components
import styled from "styled-components";

const UserContactContainer = styled.div`
  &:after {
    content: "";
    display: block;
    margin: 3% 0;
    border-bottom: 3px solid #7d48df;
  }
`;

class UserContact extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;
    return (
      <UserContactContainer>
        <p>
          Email: <strong>{user.email}</strong>
        </p>
        <p>
          Location: <strong>{profile.city}</strong>,{" "}
          <strong>{profile.state}</strong>{" "}
        </p>
        <p>
          Website:{" "}
          <strong>
            {profile.website === null ? "None " : profile.website}
          </strong>
        </p>
      </UserContactContainer>
    );
  }
}

export default connect(null)(UserContact);
